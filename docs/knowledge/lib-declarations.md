# lib 声明文件知识

本文只记录 `lib/` 下内置 `.d.ts` 声明与构建产物的边界。

## 核心模型

`lib/` 承载标准 TypeScript 内置库声明（`lib.*.d.ts`，多为生成）与编译器构建产物（`*.js`，如 `tsc.js`/`typescript.js`/`tsserverlibrary.js`）。**OH SDK 声明（含 ArkUI 枚举等）由 SDK 在编译期提供，不在本仓 `lib/`**——`ohApi.ts` 的 kit 路径解析到 `./openharmony/ets/.../build-tools/ets-loader/kit_configs` 等 SDK 目录。

| 类别 | 说明 | 风险 |
|---|---|---|
| `lib.*.d.ts` | 标准 TS 内置库声明，多为生成 | 手改会被重新生成覆盖 |
| 构建产物 `*.js` | compiler/services 等打包输出 | 手改无效，改 `src/` 后重建 |

## 约束

- **不要**手改 `lib/` 下生成 `.d.ts` 与 `*.js`；改 source of truth 后用 `scripts/dtsBundler.mjs` 等脚本重新生成。
- **不要**把 SDK 侧声明当作本仓 `lib/` 内容直接改；ArkUI 枚举等由 SDK 提供。
- **必须**保持 `lib` 声明与 ECMA 规范一致，差异点需核对规范后再改。
- 新增 `lib.*.d.ts`**必须**确认 `tsconfig` lib 引用与 dtsBundler 打包范围。

## 修改前检查

- [ ] 目标文件是否为生成物？（是→改 source 后重生）
- [ ] 是否误把 SDK 侧声明当本仓 lib 改？
- [ ] 新增 `.d.ts` 是否进了 lib 引用与打包范围？

## 代码和测试

- 声明目录：`lib/`（标准 TS 内置库声明 + 构建产物）
- 生成脚本：`scripts/dtsBundler.mjs`、`scripts/generateLocalizedDiagnosticMessages.mjs`
- kit 路径解析：`src/compiler/ohApi.ts`（`OHOS_KIT_CONFIG_PATH`/`HMS_KIT_CONFIG_PATH`）
- 测试：`tests/lib/`、`tests/cases/conformance/`
