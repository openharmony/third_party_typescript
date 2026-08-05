# API 可用性检查知识

本文只记录 OH 应用 API 可用性检查（apiAvailable）与 @throws 校验。类型检查器见 `type-checker-and-compat.md`，错误码见 `error-codes.md`。

## 核心模型

编译期对声明做 API 可用性检查，判断当前编译目标能否使用某 API，并按版本/能力给出告警或错误。可用性判定由 host 提供的 `isApiAvailableVersionSpecifications` 驱动，节点类型经 `apiAvailableGetTypeOfNode` 取得，声明上的版本/能力信息通过 JSDoc 标签（`getJSDocTags` 系列）读取。

| 能力 | 入口 |
|---|---|
| 取节点类型（通用） | `getTypeOfNode` |
| 取节点类型（apiAvailable 口径） | `apiAvailableGetTypeOfNode` |
| API 版本可用性判定 | `checkApiAvailableVersion` |
| 可用性版本规格判定（host 提供） | `isApiAvailableVersionSpecifications` |
| @throws 注解校验 | throws 检查逻辑 |

## 边界：相关概念

| 概念 | 含义 | 常见误用 |
|---|---|---|
| `apiAvailable` | 应用侧 API 可用性检查 | 与接口级口径混用 |
| `getTypeOfNode` | 取节点类型，供 linter/可用性复用 | 绕过它自行取类型，导致口径不一致 |
| `apiAvailableGetTypeOfNode` | 可用性专用取类型口径 | 与通用 `getTypeOfNode` 混用 |
| `WithEnv` | 带环境上下文的执行适配 | 忽略环境差异导致版本判定错 |
| `@throws` | 函数声明上的异常注解，编译期校验 | 为消告警删注解 |
| `@Available` | SDK 声明上的 SourceRetention 兼容注解，触发兼容告警 | 只验证正常声明顺序，漏掉「调用先于声明」场景 |
| `annotationDeclaration` | Decorator 上绑定的注解声明引用 | 依赖声明顺序而非先绑定再判告警 |

## @Available 兼容告警

`@Available` 与 `@SuppressWarnings` 同属 SourceRetention 注解（见 `isSourceRetentionAnnotationDeclaration`）。SDK 声明上的版本/兼容信息经 host 的 `isApiAvailableVersionSpecifications` 判定，满足条件时在调用侧报兼容告警（`checkApiAvailableVersion`，Diagnostics `This_API_has_been_Special_Markings_...`）。

**已知缺陷场景**：当调用发生在声明注解方法**之前**（文件内该 API 的声明顺序靠后）时，满足兼容告警条件但无告警提示。修复方案对**所有可能携带 Decorator / illegalDecorator 的节点**建立 NodeLinks（`setAnnotationsOfNode`，`src/compiler/checker.ts:40426`），确保 sdk api check（`expressionCheckByJsDoc` → `forEachAncestor(declaration, setAnnotationsOfNode)`，`checker.ts:34468`）前 `annotationDeclaration` 已绑定。

**性能/内存风险（必须看护）**：该方案在 300 万行鸿蒙应用工程全量编译场景下引入约 50 万量级的 NodeLinks。按每个 NodeLinks 对象 64-128 字节估算，50 万个节点约占 30-61 MB 内存。`getNodeLinks`（`checker.ts:2696`）虽按 nodeId 惰性创建，但一旦创建即常驻；新增 NodeLinks 分配点**必须**评估内存增量，避免在无注解/装饰器节点上误分配，并优先复用已有 links。

## 约束

- **必须**通过 `apiAvailableGetTypeOfNode` / `getTypeOfNode` 取类型，不要在可用性路径里另造取类型逻辑，否则口径分裂。
- **不要**为消除告警而删除 `@throws` 注解或弱化版本判定。
- `@throws` 校验对 `/node_modules/`、`/oh_modules/`、`/js_util_module/` 路径有跳过逻辑，改跳过条件**必须**评估 SDK 路径覆盖。
- `WithEnv` 适配的改动**必须**覆盖不同环境上下文，不能只在单一环境验证。
- 新增 API 可用性告警**必须**配错误码（见 `error-codes.md`）并执行 `tests/system_api_test/`。
- 涉及 Decorator / illegalDecorator 的 NodeLinks 新增路径**必须**评估内存增量（参考量级：300 万行工程 ≈ 50 万 NodeLinks ≈ 30-61 MB）。
- 兼容告警判定口径来自 host（`isApiAvailableVersionSpecifications`），tsc 侧只负责提供 `apiAvailableGetTypeOfNode` 与注解绑定，**不要**绕过 host 口径。

## 修改前检查

- [ ] 取类型是否走 `getTypeOfNode` / `apiAvailableGetTypeOfNode`？
- [ ] 是否删除或弱化了 `@throws` 注解或版本判定？（否）
- [ ] 不同 `WithEnv` 上下文是否都验证？
- [ ] 新告警是否配了 OH 错误码并加了 system_api_test 用例？
- [ ] `@Available` 兼容告警是否覆盖「调用先于注解声明方法」的声明顺序场景？
- [ ] 新增 NodeLinks 分配路径是否评估了内存增量（含无注解/装饰器节点是否误分配）？

## 代码和测试

- 代码入口：`src/compiler/checker.ts`（`getTypeOfNode`、`apiAvailableGetTypeOfNode`、`checkApiAvailableVersion`、`isApiAvailableVersionSpecifications`、`getNodeLinks`、`setAnnotationsOfNode`、`isSourceRetentionAnnotationDeclaration`、`expressionCheckByJsDoc`、@throws 校验）、`src/compiler/parser.ts`（`WithEnv`）
- JSDoc 标签读取：`src/compiler/utilities.ts`（`getJSDocTags` 系列）
- 错误码映射：`src/compiler/ohApi.ts`（`getErrorCode`/`ErrorInfo`，见 `error-codes.md`）
- 测试：`tests/system_api_test/`（`npm run test:system-api`）、`tests/arkTSTest/`；兼容告警声明顺序与 NodeLinks 内存场景需在板侧大工程补用例
