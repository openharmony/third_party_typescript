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

## 约束

- **必须**通过 `apiAvailableGetTypeOfNode` / `getTypeOfNode` 取类型，不要在可用性路径里另造取类型逻辑，否则口径分裂。
- **不要**为消除告警而删除 `@throws` 注解或弱化版本判定。
- `@throws` 校验对 `/node_modules/`、`/oh_modules/`、`/js_util_module/` 路径有跳过逻辑，改跳过条件**必须**评估 SDK 路径覆盖。
- `WithEnv` 适配的改动**必须**覆盖不同环境上下文，不能只在单一环境验证。
- 新增 API 可用性告警**必须**配错误码（见 `error-codes.md`）并执行 `tests/system_api_test/`。

## 修改前检查

- [ ] 取类型是否走 `getTypeOfNode` / `apiAvailableGetTypeOfNode`？
- [ ] 是否删除或弱化了 `@throws` 注解或版本判定？（否）
- [ ] 不同 `WithEnv` 上下文是否都验证？
- [ ] 新告警是否配了 OH 错误码并加了 system_api_test 用例？

## 代码和测试

- 代码入口：`src/compiler/checker.ts`（`getTypeOfNode`、`apiAvailableGetTypeOfNode`、`checkApiAvailableVersion`、`isApiAvailableVersionSpecifications`、@throws 校验）、`src/compiler/parser.ts`（`WithEnv`）
- JSDoc 标签读取：`src/compiler/utilities.ts`（`getJSDocTags` 系列）
- 错误码映射：`src/compiler/ohApi.ts`（`getErrorCode`/`ErrorInfo`，见 `error-codes.md`）
- 测试：`tests/system_api_test/`（`npm run test:system-api`）、`tests/arkTSTest/`
