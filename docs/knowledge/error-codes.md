# 错误码体系知识

本文只记录 TSC→OH 错误码映射与 `ErrorCodeArea` 分区。API 可用性见 `api-availability.md`，Linter 见 `arkts-linter.md`。

## 核心模型

本仓把标准 TSC 诊断映射成 OpenHarmony 错误码格式，按区域分三类（`ErrorCodeArea`）。映射集中在 `src/compiler/ohApi.ts`，由 `ErrorInfo` 承载、`getErrorCode()` 取码、`getErrorCodeArea()` 判区。

| 区域 | 错误码集 |
|---|---|
| `ErrorCodeArea.TSC` | 经 `newTscCodeMap` 映射：`28014→10505114`、`28045→10505127`；未命中走默认 `105`+`05`+`001`=`10505001` |
| `ErrorCodeArea.LINTER` | `codeCollectionLinter`：`28016`、`28017` |
| `ErrorCodeArea.UI` | `codeCollectionUI`：`28000`–`28007`、`28015` |

固定码段：`SUBSYSTEM_CODE='105'`、`ERROR_TYPE_CODE='05'`、`EXTENSION_CODE='001'`。

## 边界

| 概念 | 说明 | 常见误用 |
|---|---|---|
| `ErrorInfo` | 错误信息载体 | 直接拼字符串绕过它 |
| `getErrorCode()` | 取 OH 错误码 | 新错误不配码，留空 |
| `getErrorCodeArea()` | 按码判区 TSC/LINTER/UI | 跨区复用码段 |
| `newTscCodeMap` | TSC code → OH code 映射 | 改映射不评估下游兼容 |
| 错误等级 | error / warning | 为通过测试把 error 降级 |

## 约束

- **必须**通过 `ErrorInfo` 与 `getErrorCode()` 产码，不要另造错误码路径。
- 新增诊断**必须**配 OH 错误码，不能留空或复用无关码。
- **不要**为通过测试而删除/降级错误码或弱化错误等级。
- 改 `newTscCodeMap` / 码段分区**必须**评估下游工具与用例基线，**先问人**。
- TSC/LINTER/UI 三区码段**不要**跨段复用。

## 修改前检查

- [ ] 新诊断是否配了 OH 错误码？
- [ ] 是否走了 `ErrorInfo` / `getErrorCode()` / `getErrorCodeArea()`？
- [ ] 错误等级是否被不当降级？（否）
- [ ] 映射改动是否评估了下游与基线？

## 代码和测试

- 代码入口：`src/compiler/ohApi.ts`（`ErrorCodeArea`、`ErrorInfo`、`getErrorCode`、`getErrorCodeArea`、`newTscCodeMap`、`codeCollectionUI`/`codeCollectionLinter`）
- 测试：`tests/system_api_test/`、`tests/arkTSTest/`、`tests/baselines/`（错误码出现在基线输出中）
