# 类型检查器与兼容性知识

本文只记录 `checker.ts` 的边界、类型兼容性与 strict check。API 可用性见 `api-availability.md`。

## 核心模型

`src/compiler/checker.ts` 体积极大，是 OH 改动最密集的文件。

类型兼容性核心是 `isTypeRelatedTo`：先查 `relation` 缓存命中即返回，结构类型交给 `checkTypeRelatedTo` 递归判定。后者用 `maybeKeys` 栈防递归环（已在栈上的 type-pair 直接返回 Maybe，避免自引用类型无限递归），判定完成后把结果写回 `relation` 缓存。

## strict check 开关

| 开关/能力 | 含义 |
|---|---|
| `strictCheckerOnly` | 只对 `.ets` 文件做 strict 检查（性能） |
| `disableStrictCheckPaths` | 指定路径禁用 strict 检查 |
| `updateStrictDiagnosticsToGetSemanticDiagnostics` | strict 诊断并入语义诊断 |

## 约束

- **不要**把 `isTypeRelatedTo` / `checkTypeRelatedTo` 的重构当无害：`maybeKeys` 栈的 push/pop、`relation` 缓存写入必须与原逻辑逐一对齐，否则会静默改变大量比较结果。
- 改类型兼容性逻辑**必须**执行 `tests/cases/conformance` 与 `tests/baselines/`，并接受/核对基线。
- 类型兼容性重构**必须**是行为保持的：同输入下改动前后诊断应逐字节一致，否则视为回归。
- **不要**在循环或热路径里新增全量类型扫描。

## 修改前检查

- [ ] 是否动了 `isTypeRelatedTo` / `checkTypeRelatedTo` / `maybeKeys` 栈路径？
- [ ] `maybeKeys` 栈 push/pop 与 `relation` 缓存写入是否与原逻辑对齐？
- [ ] 同输入下改动前后诊断是否一致？
- [ ] strict check 开关组合（`strictCheckerOnly` + `disableStrictCheckPaths`）是否都覆盖？

## 代码和测试

- 代码入口：`src/compiler/checker.ts`（`isTypeRelatedTo`、`checkTypeRelatedTo`、`maybeKeys` 栈、`relation` 缓存）
- 性能相关：`src/compiler/performance.ts`、`src/compiler/perfLogger.ts`、`src/compiler/tracing.ts`
- 测试：`tests/cases/compiler/`、`tests/cases/conformance/`、`tests/baselines/local/`（`npm run baseline` 接受新基线）
