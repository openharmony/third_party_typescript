# 构建与测试基线知识

本文只记录构建命令、测试布局与基线工作流。

## 核心模型

构建工具是 `hereby`（`Herebyfile.mjs`，经 `.gulp.js` shim 暴露为 npm 脚本），构建在仓库根执行。OH 侧另有 `BUILD.gn`（GN）与 `bundle.json`（OH bundle 元数据）。构建使用 Node 14.20.0。

| 命令 | 作用 |
|---|---|
| `npm run build` | 全量构建（compiler + tests） |
| `npm run build:compiler` | 仅 compiler（`hereby local`） |
| `npm run build:tests` | 仅 tests（`hereby tests`） |
| `npm run test` | 执行测试（`hereby runtests-parallel --light=false`） |
| `npm run lint` | `hereby lint` |
| `npm run baseline` | 接受新基线（`hereby baseline-accept`） |
| `npm run test:system-api` | OH 系统 API 测试 |
| `npm run clean` | 清理产物 |
| `npm run release` | LKG（Last Known Good）发布 |
| `node lib/tsc` | 直接运行 compiler |

## 测试布局

| 目录 | 内容 |
|---|---|
| `tests/cases/compiler/` | 编译器用例 |
| `tests/cases/conformance/` | 一致性用例（标准 TS 行为守卫） |
| `tests/cases/project/` | 项目级用例 |
| `tests/baselines/local/` | 本地预期输出 |
| `tests/baselines/reference/` | 参考预期输出 |
| `tests/arkTSTest/` | ArkTS 用例，`node run.js -v1.0 -D` / `-v1.1 -D` |
| `tests/system_api_test/` | OH 系统 API 测试 |
| `tests/dets/` | `.d.ets` 用例 |
| `tests/ts_extra_tests/` | 额外 TS 用例 |
| `tests/issues_cookbook_tests/` | issue 用例 |
| `tests/verify_3rd_libs/` | 三方库验证 |
| `tests/projects/` | 测试工程配置 |

## 一键测试入口

`scripts/auto-test-runner.sh` 封装 4 个 suite，依赖 npm/node/python3：

| suite | 内容 | 内部命令 |
|---|---|---|
| `tsc-native` | 编译器原生测试 | `npm ci`→`npm run build`→`npm run release`→`npm run test` |
| `ts-extra` | 扩展 TS 用例 | `tests/ts_extra_tests/run_ts_case.py test_ts_cases -tsc ../../bin/tsc -v4.9` |
| `arkts` | ArkTS Linter 1.0+1.1 | `npm pack`→`tests/arkTSTest` `npm install`→`node run.js -D -v1.0` / `-v1.1` |
| `system-api` | OH 系统 API | `npm ci`→`npm run test:system-api` |

```sh
./scripts/auto-test-runner.sh --all                  # 全套
./scripts/auto-test-runner.sh --suite <suite>         # 单 suite
./scripts/auto-test-runner.sh --all --fail-fast       # 失败即停
```

## 基线工作流

用例的预期输出落在 `tests/baselines/`。改了用例预期或 compiler 行为后：

1. 执行 `npm run test`，对比本地与基线
2. 确认差异**是预期内的**（不是回归）
3. `npm run baseline` 接受新基线
4. 提交时包含基线变更

`tests/arkTSTest/` 有 `ignorecase.json` 控制忽略用例；运行前需在仓库根 `npm pack`，再到 `tests/arkTSTest` `npm install`。

## 约束

- **必须**在仓库根执行构建命令，不在子目录。
- 改用例预期**必须**执行 `npm run baseline` 接受基线并在提交中包含。
- **不要**为让测试通过而改基线掩盖回归；基线差异必须先确认是预期内。
- **不要**跳过 `tests/cases/conformance`——它是标准 TS 向后兼容的守卫。
- ArkTS 用例 1.0 与 1.1 两版**都要**执行。
- 涉及设备/集成的行为**必须**补板侧证据，不能只靠 `npm test`。

## 修改前检查

- [ ] 构建是否在仓库根执行？
- [ ] 用例预期变更是否执行了 `npm run baseline`？
- [ ] conformance 用例是否通过（向后兼容）？
- [ ] arkTSTest 1.0 与 1.1 是否都执行？

## 代码和测试

- 构建：`Herebyfile.mjs`、`package.json`、`BUILD.gn`、`bundle.json`、`scripts/`
- 测试运行：`scripts/auto-test-runner.sh`、`tests/arkTSTest/run.js`、`src/testRunner/`
- 失败排查：`scripts/failed-tests.cjs`
