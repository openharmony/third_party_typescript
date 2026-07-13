# ArkTS Linter 知识

本文只记录 ArkTS Linter 的结构与运行边界。错误码见 `error-codes.md`。

## 核心模型

ArkTS Linter 是 ArkTS（TS 变体）的静态分析器，按版本分两套实现，共享公共代码。

```
src/linter/
├── ArkTSLinter_1_0/   # ArkTS 1.0
├── ArkTSLinter_1_1/   # ArkTS 1.1
├── Common/            # 共享工具
└── _namespaces/       # TS namespace 定义
```

入口 `LinterRunner.ts` 的 `runArkTSLinter`：

1. 初始化静态配置
2. 从 program state 收集变更文件
3. 执行 TSC 诊断（strict 与 non-strict 两路）
4. 遍历源文件应用 ArkTS 规则
5. 缓存诊断到 `.tsbuildinfo`（可选 emit）
6. 释放引用做内存清理（daemon 模式）

## 边界

| 概念 | 说明 | 常见误用 |
|---|---|---|
| 增量 lint | 只 lint 变更文件 | 版本变更后未全量重 lint |
| 版本感知 | ArkTS 版本变更触发全量 | 忽略版本切换导致旧诊断残留 |
| `.tsbuildinfo` | 诊断缓存 | 改规则后不失效缓存 |
| strict / non-strict | 两路 TSC 诊断 | 只执行一路会漏报 |
| 1.0 / 1.1 | 两套实现 | 规则只改一边导致两版不一致 |

## 约束

- **必须**同时执行 strict 与 non-strict 两路 TSC 诊断，不能只执行一路。
- 改 ArkTS 规则**必须**确认 1.0 与 1.1 两套实现是否都需同步，不能只改一边。
- **不要**为减少告警而弱化规则或绕过 `.tsbuildinfo` 失效；版本变更必须全量重 lint。
- daemon 模式下**必须**保留内存清理路径，避免长驻内存膨胀。
- Linter 专属错误码 28016–28017（见 `error-codes.md`），新增规则**必须**配码。

## 修改前检查

- [ ] strict 与 non-strict 两路是否都执行？
- [ ] 1.0 与 1.1 是否需要同步改？
- [ ] `.tsbuildinfo` 失效策略是否覆盖版本变更与规则变更？
- [ ] 新规则是否配了错误码并加了用例？

## 代码和测试

- 代码入口：`src/linter/LinterRunner.ts`（`runArkTSLinter`）、`src/linter/ArkTSLinter_1_0/`、`src/linter/ArkTSLinter_1_1/`、`src/linter/Common/`
- 测试：`tests/arkTSTest/`（`node run.js -v1.0 -D`、`-v1.1 -D`）、`tests/cases/`
