# OH 模块系统知识

本文只记录 OpenHarmony 模块解析与 kit 导入。ETS 语言扩展见 `ets-language-extensions.md`。

## 核心模型

本仓必须同时支持两套模块系统，代码路径不能只认一套。

| 维度 | 标准 TS | OpenHarmony ETS |
|---|---|---|
| 依赖目录 | `node_modules` | `oh_modules` |
| 包描述 | `package.json` | `oh-package.json5` |
| 包管理器 | npm | ohpm |
| 导入前缀 | 普通说明符 | `@kit.*`（kit 聚合导入） |

## kit 导入主链路

`@kit.*`（如 `@kit.ArkUI`、`@kit.NetworkKit`）不是普通模块说明符，由 `processKit()` 在编译期变换为虚拟节点：

1. `getSdkPath()` 定位 SDK
2. 读 `build-tools/ets-loader/kit_configs/` 下的 JSON 配置
3. 配置缓存在 `kitJsonCache`
4. 白名单控制特殊处理：`whiteListForErrorSymbol`、`whiteListForTsFile`
5. 区分 OHOS 与 HMS kit 配置
6. `isLazy` 标志走 lazy import 路径
7. 产出带 `NodeFlags.KitImportFlags` 的虚拟节点

## 边界

| 概念 | 说明 | 常见误用 |
|---|---|---|
| `isOHModules()` | 是否走 oh_modules 目录 | 与 `isOhpm` 混用 |
| `isOhpm()` | 包管理器类型判断 | 假设只有 ohpm——漏掉 node_modules |
| `getModuleByPMType()` | 按包管理器取目录名 | 硬编码 `"oh_modules"` |
| `processKit()` | kit 导入变换入口 | 当成普通模块解析 |
| `kitJsonCache` | kit 配置缓存 | 改配置不失效缓存 |

## 约束

- **必须**同时处理 `node_modules` 与 `oh_modules`；新增模块解析分支不能只认 ohpm。
- **不要**把 `@kit.*` 当普通说明符解析；必须走 `processKit()`。
- kit 配置变更**必须**确认 `kitJsonCache` 失效策略，否则用旧配置。
- **不要**手改 `processKit()` 产出的虚拟节点；改 source 配置后重新变换。
- 新增 kit 类型（OHOS/HMS）**先问人**，涉及 SDK 契约。

## 修改前检查

- [ ] 新分支是否同时覆盖 node_modules 与 oh_modules？
- [ ] 是否走了 `processKit()` 而非自行解析 `@kit.*`？
- [ ] 缓存 key 是否考虑了 SDK 路径与 kit 配置版本？

## 代码和测试

- 代码入口：`src/compiler/ohApi.ts`（`processKit`、`isOHModules`、`isOhpm`、`getModuleByPMType`、`getSdkPath`、`kitJsonCache`、`whiteListForErrorSymbol`、`whiteListForTsFile`、`isLazy`）
- 模块解析：`src/compiler/moduleNameResolver.ts`、`src/compiler/resolutionCache.ts`、`src/compiler/moduleSpecifiers.ts`
- 测试：`tests/system_api_test/`、`tests/arkTSTest/`
