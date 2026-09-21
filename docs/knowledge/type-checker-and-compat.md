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
- **必须**对 `node.parent` 访问做判空保护：`runArkPack`（`@ohos/hvigor-arkts-compose`）等外部工具创建的合成节点无 parent 指针，直接读 `node.parent.kind` 会抛 `TypeError: Cannot read properties of undefined (reading 'kind')`，导致编译器崩溃且只报 `00308018 Unknown Error`，吞掉真实类型错误。
- **必须**对 `args[i]` 访问做判空保护：同一调用链中 `getEffectiveCallArguments` 返回的 `args` 在合成节点/增量 re-check 场景下可能是稀疏数组，直接读 `args[i].kind` 会抛同样的 `TypeError`。新增 `args` 遍历点必须前置 `arg &&` 或 `if (!arg) continue`。

## 修改前检查

- [ ] 是否动了 `isTypeRelatedTo` / `checkTypeRelatedTo` / `maybeKeys` 栈路径？
- [ ] `maybeKeys` 栈 push/pop 与 `relation` 缓存写入是否与原逻辑对齐？
- [ ] 同输入下改动前后诊断是否一致？
- [ ] strict check 开关组合（`strictCheckerOnly` + `disableStrictCheckPaths`）是否都覆盖？
- [ ] 新增/改动的 `node.parent` 访问是否做了判空（`node.parent?.kind` 或 `if (!parent) return`）？
- [ ] 新增/改动的 `args[i]` 遍历是否做了判空（`arg &&` 或 `if (!arg) continue`）？

## node.parent 空指针崩溃场景

### 问题

`runArkPack` 创建合成 CallExpression 节点时不设置 `parent` 指针。当此类节点流入检查器，重载解析失败展开诊断时，`checkCallExpression` 直接读 `node.parent.kind` 崩溃，hvigor 仅报 `Error Code: 00308018 Unknown Error`，不输出文件位置与真实诊断。该问题间歇性出现于增量编译，`devecocli build clean` 后可恢复但无法根治。

### 崩溃链路

```
runArkPack
  → getResolvedSignature
    → resolveSignature → resolveCallExpression → resolveCall
      → chooseOverload → getSignatureApplicabilityError
        → checkExpressionWithContextualType → checkExpression → checkCallExpression  ← 崩溃
```

合成节点的 `parent` 为 `undefined`，`node.parent.kind` 直接抛 `TypeError`。

### 修复原则

所有修复**对正常 AST 节点行为完全不变**（parser/binder 保证 parent 有值，可选链/early-return 不触发）。唯一变化：孤儿节点的崩溃 → 优雅降级（返回 `undefined`/安全默认值），使编译器继续运行并报告真实类型错误。

### 验证方式

- 回归测试：`tests/cases/compiler/checkCallExpressionParentNullGuard.ts`
- 崩溃场景验证：用 `ts.factory.createCallExpression` 构造无 parent 的合成节点，调 `checker.getResolvedSignature()` 确认不崩
- 行为保持验证：正常 AST 节点的 assertion 收窄、Symbol() 唯一类型、const enum 访问、optional chain、泛型推断均不变

### 后续关注

- `runArkPack`（`@ohos/hvigor-arkts-compose`）侧应增强错误透传：worker 崩溃时输出当时正在编译的文件路径，避免统一显示 `00308018 Unknown Error`。该侧改动不在本仓。
- 新增 `node.parent` 访问时**必须**使用 `?.` 或前置判空，否则同样的崩溃会复发。

## args[i] 空洞崩溃场景

### 问题

与 `node.parent` 崩溃同一条调用链（`checkCallExpression → resolveCallExpression → resolveCall → chooseOverload → getSignatureApplicabilityError`），只是先踩到的判空缺口不同：`getSignatureApplicabilityError` 在实参遍历循环中读 `args[i].kind` 时，`args[i]` 为 `undefined`。`args` 来自 `getEffectiveCallArguments(node)`，正常 `NodeArray` 不可能有空洞；出现 `undefined` 元素只可能来自：

- `runArkPack` 等外部工具构造的合成 CallExpression，其 `arguments` 是稀疏数组或带错误 `.length` 的对象；
- ETS 增量 re-check 复用旧 Program/SourceFile 时 AST 处于半更新状态，`node.arguments` 链断裂；
- `getEffectiveDecoratorArguments` 在 `parent`/`symbol` 缺失时构造残缺合成实参（已对该函数补判空，证明这条链会断）。

官方 TypeScript 主线无此崩溃，因为主线不存在 ETS 增量 re-check 场景；ETS 扩展引入的 `EtsComponentExpression`、装饰器合成实参、`SkipEtsComponentBody` 等路径都在 `resolveCall` 附近，是最可能让 `args` 出现空洞的地方。

### 修复原则

修复**对正常 AST 节点行为完全不变**（parser/binder 保证 `NodeArray` 元素有值，`arg &&` / `if (!arg) continue` 不触发）。唯一变化：稀疏/半重建 `args` 的崩溃 → 优雅降级（跳过该实参的 assignability 检查，等价于已有的 `OmittedExpression` 处理；rest errorNode 缺失时回退到调用节点 `node`），使编译器继续运行并报告真实类型错误。

### 验证方式

- 回归测试：`tests/cases/compiler/checkCallExpressionParentNullGuard.ts`（覆盖多实参调用、rest 参数、spread 实参、重载解析、泛型推断的正常行为）
- 崩溃场景验证：用 `ts.factory.createCallExpression` 构造 `arguments` 为稀疏数组的合成节点，调 `checker.getResolvedSignature()` 确认不崩（源码无法产生稀疏 `arguments`，必须手工构造合成节点）
- 行为保持验证：正常 AST 节点的多参调用、rest 参数、spread 展开、重载解析诊断、泛型推断均不变

### 后续关注

- `args[i]` 的新增遍历点**必须**前置判空（`arg &&` 或 `if (!arg) continue`），否则同样的崩溃会复发。
- 根因（合成节点 `arguments` 出现空洞）应在 `runArkPack` / ETS 增量 re-check 侧根治；本仓的判空是兜底防御。

## 代码和测试

- 代码入口：`src/compiler/checker.ts`（`isTypeRelatedTo`、`checkTypeRelatedTo`、`maybeKeys` 栈、`relation` 缓存）
- 性能相关：`src/compiler/performance.ts`、`src/compiler/perfLogger.ts`、`src/compiler/tracing.ts`
- `node.parent` / `args[i]` 空指针保护：`src/compiler/checker.ts`（散布于 `checkCallExpression` 调用链各函数）、`src/compiler/utilities.ts`（`isInETSFile`）、`src/compiler/ohApi.ts`（`isInEtsFile` 安全变体）
- 测试：`tests/cases/compiler/`、`tests/cases/conformance/`、`tests/baselines/local/`（`npm run baseline` 接受新基线）
- 空指针回归测试：`tests/cases/compiler/checkCallExpressionParentNullGuard.ts`
