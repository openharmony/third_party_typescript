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
| `getSdkPath()` | 按 `etsLoaderPath` 推导 SDK 根 | 只适配一种 SDK 目录布局 |
| `isMixedCompilerSDKPath()` | 判断是否为 1.2 SDK（`dynamic/` 布局） | 用前缀/子串猜测而不是按 `etsLoaderPath` 后缀判定 |

## SDK 路径布局（硬编码场景）

`getKitJsonObject()` / `getSdkPath()` 中硬编码了 SDK 目录布局，必须**同时适配 HarmonyOS 与 OpenHarmony 两套 SDK**，且每套都有普通与 1.2（mixed compiler）两种布局：

| 路径常量 | 前缀 | 布局 |
|---|---|---|
| `./openharmony/ets/build-tools/ets-loader/kit_configs` | OpenHarmony | 普通 |
| `./openharmony/ets/dynamic/build-tools/ets-loader/kit_configs` | OpenHarmony | 1.2 SDK |
| `./hms/ets/build-tools/ets-loader/kit_configs` | OpenHarmony | 普通 |
| `./hms/ets/dynamic/build-tools/ets-loader/kit_configs` | OpenHarmony | 1.2 SDK |

- `isMixedCompilerSDKPath()`（`src/compiler/ohApi.ts:1294`）按 `etsLoaderPath` 是否以 `dynamic/build-tools/ets-loader` 结尾判定 1.2 SDK。
- `getSdkPath()` 的向上回退层数也因此不同：普通为 `resolvePath(etsLoaderPath, '../../../..')`，1.2 为 `resolvePath(etsLoaderPath, '../../../../..')`。
- 判定与回退深度都依赖字符串后缀/相对层数，任何新增硬编码 SDK 路径场景（含 linter 侧 `LinterRunner.ts`、`InteropTypescriptLinter.ts` 对 `etsLoaderPath` 的解析）**必须**为两套 SDK 的两种布局都补测试。

## 约束

- **必须**同时处理 `node_modules` 与 `oh_modules`；新增模块解析分支不能只认 ohpm。
- **不要**把 `@kit.*` 当普通说明符解析；必须走 `processKit()`。
- kit 配置变更**必须**确认 `kitJsonCache` 失效策略，否则用旧配置。
- **不要**手改 `processKit()` 产出的虚拟节点；改 source 配置后重新变换。
- 新增 kit 类型（OHOS/HMS）**先问人**，涉及 SDK 契约。
- **必须**同时适配 HarmonyOS 与 OpenHarmony 两套 SDK 路径；新增/改动硬编码 SDK 路径常量时，OHOS/HMS × 普通/1.2（`dynamic/`）四类组合都覆盖，且配套测试用例。

## 修改前检查

- [ ] 新分支是否同时覆盖 node_modules 与 oh_modules？
- [ ] 是否走了 `processKit()` 而非自行解析 `@kit.*`？
- [ ] 缓存 key 是否考虑了 SDK 路径与 kit 配置版本？
- [ ] 硬编码 SDK 路径是否同时适配了 HarmonyOS 与 OpenHarmony 两套 SDK？
- [ ] 普通与 1.2 SDK（`dynamic/build-tools/ets-loader`）两种布局是否都验证？
- [ ] 新增 SDK 路径场景是否补了对应测试用例？

## 代码和测试

- 代码入口：`src/compiler/ohApi.ts`（`processKit`、`isOHModules`、`isOhpm`、`getModuleByPMType`、`getSdkPath`、`isMixedCompilerSDKPath`、`getKitJsonObject`、`kitJsonCache`、`whiteListForErrorSymbol`、`whiteListForTsFile`、`isLazy`）
- 模块解析：`src/compiler/moduleNameResolver.ts`、`src/compiler/resolutionCache.ts`、`src/compiler/moduleSpecifiers.ts`
- SDK 路径消费：`src/linter/ArkTSLinter_1_1/LinterRunner.ts`、`src/linter/ArkTSLinter_1_1/InteropTypescriptLinter.ts`
- 测试：`tests/system_api_test/`、`tests/arkTSTest/`；SDK 路径适配**必须**覆盖 HarmonyOS（通过DevEco界面setting下的OpenHarmony SDK将sdk目录下载到本地，通过工程目录下的local.properties配置sdk路径）与 OpenHarmony（DevEco安装文件中自带的sdk）两类 SDK 的测试场景
