# ohos-typescript 指引

> 入口层：永远在上下文中，只做路由和全局约束。领域知识在 `docs/knowledge/`，按需加载。
> 本仓是 TypeScript 4.9.5-r4 的 OpenHarmony fork（包名 `ohos-typescript`），新增 ETS 语言范式、OH 模块系统、API 可用性检查、ArkTS Linter 等。

## 1. 代码地图

本 AGENTS.md 适用于仓库根。本仓对应 OpenHarmony 源码树 `third_party/typescript`，当前不存在子级 AGENTS.md / CLAUDE.md；各目录的局部规则尚未沉淀，遇到歧义先以根为准并提问。

核心职责：在标准 TypeScript 之上扩展 ETS 语法、OH 模块解析、API 可用性检查与 ArkTS Linter，同时保持对标准 TS 的向后兼容。

关键路径（按重要性与高频修改排序）：

- `src/compiler/ohApi.ts`：OH/ETS 专属逻辑入口（kit 导入、注解、装饰器、oh_modules、错误码映射），改动最频繁。
- `src/compiler/checker.ts`：类型检查器，体积极大、性能敏感，OH 扩展（API 可用性、`@throws`、`getTypeOfNode`）散落其中，回归代价高。
- `src/compiler/`：编译器核心（parser/binder/checker/emitter）。
- `src/linter/`：ArkTS Linter（1.0 / 1.1）。
- `lib/`：构建产物 + 标准 TS 内置 `.d.ts` 声明，禁止手改（ArkUI 枚举等 SDK 声明不在本仓 `lib/`）。
- `tests/`：`cases/`（编译器用例）、`baselines/`（回归基线）、`arkTSTest/`、`system_api_test/`、`dets/`、`ts_extra_tests/`。

Where to look（任务 → 路径）：

- 语法 / 注解 / `.ets` 行为变更 → `src/compiler/ohApi.ts`
- 类型检查 / 兼容回归 → `src/compiler/checker.ts`
- ArkTS lint 行为 → `src/linter/`
- 公开声明 / ArkUI 枚举 / `.d.ts` → `lib/`
- 用例预期输出 → `tests/baselines/` + `tests/cases/`

## 2. 知识路由

改动前先按以下三类归类任务，读取对应领域文档。不要把这些文档当可选背景，它们是任务级权威。所有链接均指向真实存在的 `docs/knowledge/*.md`。

### Task-based routing（按任务类型）

- 语法 / 注解 / `.ets` 范式扩展 → 读 `docs/knowledge/ets-language-extensions.md`
- OH 模块系统 / kit 导入 / ohpm 解析 → 读 `docs/knowledge/oh-module-system.md`
- 类型检查 / 兼容性改动 → 读 `docs/knowledge/type-checker-and-compat.md`
- API 可用性 / `apiAvailable` / `@throws` 改动 → 读 `docs/knowledge/api-availability.md`
- 内置声明 / `.d.ts` / ArkUI 枚举改动 → 读 `docs/knowledge/lib-declarations.md`
- Linter 规则 / 增量 lint 改动 → 读 `docs/knowledge/arkts-linter.md`
- 错误码增删或语义变更 → 读 `docs/knowledge/error-codes.md`
- 构建 / 基线 / 测试体系改动 → 读 `docs/knowledge/build-test-baseline.md`

### Path-based routing（按修改路径）

- `src/compiler/ohApi.ts` → 读 `ets-language-extensions.md` + `oh-module-system.md`
- `src/compiler/checker.ts` → 读 `type-checker-and-compat.md`（**必读**，该文件大且回归代价高）
- `src/linter/` → 读 `arkts-linter.md`
- `lib/` 或 `scripts/dtsBundler.mjs` → 读 `lib-declarations.md`
- `tests/baselines/` 或 `tests/cases/` → 读 `build-test-baseline.md`

### Vocabulary-based routing（按术语）

当任务、issue、log、API 名或被改文件出现下列术语时，规划前先读对应文档：

| 术语 | 风险提示 | 先读 |
| --- | --- | --- |
| struct / @Builder / @Styles / @Extend / annotation / `.ets` / `ScriptKind` | ETS 扩展只应在 `.ets` 生效，污染 `.ts` 会破坏标准 TS | `ets-language-extensions.md` |
| `oh_modules` / ohpm / oh-package.json5 / `@kit` / `processKit` | 必须同时处理 `node_modules` 与 `oh_modules`，只认一套会丢解析 | `oh-module-system.md` |
| checker / 类型兼容 / `isTypeRelatedTo` / `maybeKeys` / `strictCheckerOnly` | 文件大、性能敏感，回归代价高 | `type-checker-and-compat.md` |
| `apiAvailable` / `getTypeOfNode` / `WithEnv` / `@throws` / API 可用性 | 影响公共 API 语义与兼容性 | `api-availability.md` |
| `lib` / `.d.ts` / ArkUI 枚举 / ES2022 / `dtsBundler` | 生成物，禁止手改 | `lib-declarations.md` |
| linter / ArkTSLinter / `LinterRunner` / 增量 lint / `.tsbuildinfo` | 规则跨 1.0/1.1，行为差异易错 | `arkts-linter.md` |
| 错误码 / 10505114 / 28000 / `ErrorInfo` / `getErrorCode` | 错误码是公共契约，改动需问人 | `error-codes.md` |
| hereby / BUILD.gn / bundle.json / baseline / runtests / `arkTSTest` / `system_api_test` | 构建测试体系，基线变更必须接受 | `build-test-baseline.md` |

### Plan 阶段声明

在开始实现前，plan 中需声明：

- 任务归类（task category）
- 已读的领域文档
- 已识别的约束（见第 3 节）
- 是否需要先问人、是否需要补充板侧证据

## 3. 约束边界

### Architecture / domain invariants

- **ETS 隔离**：所有 ETS 扩展必须先判断 `isInEtsFile(node)` / `ScriptKind.ETS`，否则会污染标准 TS 行为。
- **向后兼容**：必须保持对标准 TypeScript 的向后兼容；ETS 能力只在 `.ets` 生效。
- **双模块解析**：必须同时处理 `node_modules` 与 `oh_modules`，不能只认一套。
- **注解前缀不变**：不得改动魔法前缀 `__$$ETS_ANNOTATION$$__`，工具链依赖它。
- **生成物不手改**：`lib/` 下产物与生成 `.d.ts` 不得手改，改 source of truth 后重新生成。
- **checker 性能敏感性**：`checker.ts` 体极大、性能敏感，改动须先读 `type-checker-and-compat.md`，评估回归面。
- **DFX 不可绕过**：不得为通过测试删除/绕过 DFX、日志、错误码或兼容性检查。
- **持久化/兼容性边界**：错误码、API 签名、`.d.ts` 公开声明属于跨版本兼容契约，不得随意破坏。

### Do not

- 不要在 `.ts` 上下文启用 ETS 逻辑。
- 不要手改 `lib/` 下构建产物与生成 `.d.ts`。
- 不要为通过测试删除/绕过 DFX、日志、错误码或兼容性检查。
- 不要改动注解魔法前缀 `__$$ETS_ANNOTATION$$__`。
- 不要只认 `node_modules` 或 `oh_modules` 一套模块解析。
- 不要把内部实现细节泄露到公开 API / `.d.ts`。

### Ask before

- 新增第三方依赖。
- 改动公共 API 签名 / 错误码语义。
- 改动 `lib/*.d.ts` 公开声明。
- 删除兼容 shim 或迁移逻辑。
- 运行可能影响真实设备的命令（板侧操作）。

## 4. 验证闭环

构建命令从仓库根目录执行。

### Minimum checks

- 构建：`npm run build`
- 仅 compiler：`npm run build:compiler`
- 测试：`npm run test`
- Lint：`npm run lint`
- 接受基线（用例预期输出变更后必须）：`npm run baseline`
- OH 系统 API 测试：`npm run test:system-api`

一键执行全套用 `scripts/auto-test-runner.sh`（4 suite：tsc-native / ts-extra / arkts / system-api）：

```sh
./scripts/auto-test-runner.sh --all                # 全套
./scripts/auto-test-runner.sh --suite tsc-native   # 单 suite
./scripts/auto-test-runner.sh --all --fail-fast    # 失败即停
```

ArkTS 用例（先在仓库根 `npm pack`，再到 `tests/arkTSTest npm install`）：

```sh
node tests/arkTSTest/run.js -v1.0 -D
node tests/arkTSTest/run.js -v1.1 -D
```

### Task-specific checks

- ETS 语法 / 注解 / `ohApi.ts` 改动 → 执行相关编译器用例 + `npm run baseline`（若基线变）。
- `checker.ts` / 类型兼容改动 → 执行 `npm run test`，重点看兼容用例。
- Linter 改动 → 执行 `tests/arkTSTest`（1.0/1.1）+ `npm run test:eslint-rules`。
- `lib/` / `.d.ts` 改动 → 重新生成后执行 `npm run build:tests` + 涉及声明的用例。
- 错误码改动 → 执行 `scripts/errorCheck.mjs` + `npm run test:system-api`，更新对应基线。
- 仅测试改动 → 执行被改用例 + 至少一个邻近相关用例。

### Done 定义与无法验证的兜底

任务完成须满足：

- 请求行为已实现。
- 相关 build/test/lint/baseline/兼容性检查已执行，**或给出无法验证的原因**（环境缺失、依赖板侧、用例不可本地复现等）——不得用虚假验证声称完成。
- 涉及真实设备 / 集成行为的改动，**必须补充板侧证据**，不能只靠 `npm test` 声称完成。
- 最终回复包含：变更文件、验证命令与结果、兼容性/DFX/错误码影响（若有）、剩余风险。
- 不夹带无关格式化、重构或顺手改动。

## 附：知识文档清单

`docs/knowledge/`：`ets-language-extensions.md`、`oh-module-system.md`、`type-checker-and-compat.md`、`api-availability.md`、`lib-declarations.md`、`arkts-linter.md`、`error-codes.md`、`build-test-baseline.md`。
