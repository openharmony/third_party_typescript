# 增量编译与结构复用知识

本文只记录 program 增量编译的结构复用判定（`tryReuseStructureFromOldProgram` / `StructureIsReused`）。类型检查见 `type-checker-and-compat.md`，API 可用性见 `api-availability.md`，构建/基线见 `build-test-baseline.md`。

## 核心模型

`tryReuseStructureFromOldProgram`（`src/compiler/program.ts`）在新一轮编译时决定旧 program 的结构能复用到什么程度，返回 `StructureIsReused` 三态（`src/compiler/types.ts`）：

| 值 | 语义 | 全量/增量 | 复用范围 |
|---|---|---|---|
| `Not` | 完全不复用 | 全量 | 重建 `files`/`filesByName`/`fileReasons`/`resolvedTypeReferenceDirectives` 等 |
| `SafeModules` | 复用文件结构、重做模块解析 | 增量(部分) | 复用 source files 列表，重做 modified files 的 `resolvedModules` |
| `Completely` | 最大化复用 | 增量(完全) | 连 modified files 的 `resolvedModules` 都复用旧值，仅重做内容变化文件的 bind/check/emit |

核心判据：**修改是否影响 program 的"结构"**（文件集合 / 模块依赖图 / 解析策略）。影响 → `Not` 或 `SafeModules`；仅内容变而结构不变 → `Completely`。

## 触发全量（`Not`）的场景

任一命中即提前 `return Not`，连 `newSourceFiles` 都可能未遍历完；后续 `createProgram` 重建 program 级结构。判定顺序即代码中 `if` 出现的先后，改顺序会影响结果（见约束）。

| # | 修改场景 | 判定函数/变量 | 原理 |
|---|---|---|---|
| 1 | 首次编译 / `.tsbuildinfo` 缺失或损坏 / 无 oldProgram | `!oldProgram` | 没有旧 program 可复用 |
| 2 | `compilerOptions` 中影响模块解析的选项变化（`module`/`moduleResolution`/`paths`/`baseUrl`/`target`/`configFilePath` 等） | `changesAffectModuleResolution` | 解析策略变了，旧解析结果全部失效 |
| 3 | root 文件列表增删（`rootNames` 变化） | `!arrayIsEqualTo(oldRootNames, rootNames)` | 根文件集变了，文件集合需重建 |
| 4 | project references 不可复用（引用的 tsconfig 变化） | `tryReuseProjectReferences` 返回非 undefined | 项目引用结构变了 |
| 5 | 之前缺失的文件现在存在了 | `nowExistingMissingFilePath` | 缺失文件出现会改变 program 结构 |
| 6 | 某个旧 source file 现在被删除/读不到 | `!newSourceFile` | 文件集合缩减 |
| 7 | redirect 源文件的「底层实际文件」内容变化 | `newSourceFile !== oldSourceFile.redirectInfo.unredirected` | redirect 关系可能断裂 |
| 8 | 被 redirect 指向的目标文件内容变化 | `oldProgram.redirectTargetsMap.has` + `newSourceFile !== oldSourceFile` | redirect 目标变化同样可能断裂 |
| 9 | 同一 package 名下有两个源文件且至少一个变化 | `seenPackageNames` 冲突检测 | 可能产生新 redirect，结构不确定 |

## 触发 `SafeModules`（增量-部分）的场景

文件内容变化（`fileChanged=true`）但未命中上述 `Not` 条件时，进入结构属性比对；任一命中设 `SafeModules`，提前 `return`。判定在 `for (const oldSourceFile of oldSourceFiles)` 遍历内逐文件进行。

| # | 修改场景 | 判定条件 | 原理 |
|---|---|---|---|
| 10 | `impliedNodeFormat` 变化（ESM↔CJS 切换） | `oldSourceFile.impliedNodeFormat !== newSourceFile.impliedNodeFormat` | 模块格式影响解析与 emit |
| 11 | `lib` reference directives 变化（`/// <reference lib=".." />`） | `!arrayIsEqualTo(oldSourceFile.libReferenceDirectives, ...)` | 影响注入的默认库集合 |
| 12 | `hasNoDefaultLib` 变化 | `oldSourceFile.hasNoDefaultLib !== newSourceFile.hasNoDefaultLib` | 影响默认库是否注入 |
| 13 | tripleslash `referencedFiles` 变化（`/// <reference path=".." />`） | `!arrayIsEqualTo(oldSourceFile.referencedFiles, ...)` | 影响文件包含集合 |
| 14 | `imports` 列表变化（import/require 的模块名） | `!arrayIsEqualTo(oldSourceFile.imports, newSourceFile.imports, ...)` | 模块依赖图变化 |
| 15 | `moduleAugmentations` 变化 | `!arrayIsEqualTo(oldSourceFile.moduleAugmentations, ...)` | 模块扩展声明变化 |
| 16 | `PermanentlySetIncrementalFlags` 变化（含 dynamicImport） | `(oldSourceFile.flags & NodeFlags.PermanentlySetIncrementalFlags) !== (...)` | 影响 emit/加载方式 |
| 17 | `typeReferenceDirectives` 变化（`/// <reference types=".." />`） | `!arrayIsEqualTo(oldSourceFile.typeReferenceDirectives, ...)` | 类型库包含集合变化 |
| 18 | 文件内容未变但被 `hasInvalidatedResolutions` 标记失效 | `hasInvalidatedResolutions(oldSourceFile.path)` | watch 场景显式失效解析，需重解析 |
| 19 | modified files 重解析后模块解析结果变化 | `hasChangesInResolutions` (module) | 内容变了导致解析目标变了 |
| 20 | modified files 的 type-reference 解析结果变化 | `hasChangesInResolutions` (typeReference) | 类型库解析目标变了 |
| 21 | `changesAffectingProgramStructure` 或 `hasChangedAutomaticTypeDirectiveNames` | `changesAffectingProgramStructure(oldOptions, options) \|\| host.hasChangedAutomaticTypeDirectiveNames?.()` | options 变化影响 program 结构但不影响模块解析策略，故仅 `SafeModules` |

## 触发 `Completely`（增量-完全）的场景

| # | 修改场景 | 判定条件 | 原理 |
|---|---|---|---|
| 22 | 文件内容未变（`fileChanged=false`）且无 `hasInvalidatedResolutions`，所有结构选项不变 | 初始即 `Completely`，遍历未将其降级 | — |
| 23 | 文件内容变了（`fileChanged=true`）但所有结构相关属性均未变，且重解析模块名结果一致 | `else` 分支（所有 10-17 未命中）+ `hasChangesInResolutions` 返回 false | 改的只是函数体实现等非结构内容，`resolvedModules` 复用旧值 |

**关键优化（场景 23）**：改文件内容但不碰结构相关语法（如只改函数体）仍走 `Completely`，只重做该文件的 bind/check/emit，是最优增量路径。`Completely` 路径直接复用 oldProgram 的 `fileReasons`/`filesByName`/`resolvedTypeReferenceDirectives`/`sourceFileToPackageName`/`redirectTargetsMap`。

## 三态复用差异

| 维度 | `Not`（全量） | `SafeModules`（增量-部分） | `Completely`（增量-完全） |
|---|---|---|---|
| source files 列表 | 重建 | 复用遍历结果 | 复用 |
| 模块解析结果 `resolvedModules` | 全重做 | 重做 modified 部分 | 复用旧值 |
| program 结构（`filesByName`/`fileReasons`/`resolvedTypeRef` 等） | 重建 | 重建 | 复用 oldProgram |
| bind/check/emit 范围 | 全部文件 | modified + 受影响 | modified + 受影响 |

## 日志速查表（按打点显示反查分支）

`PerformanceDotting` 每条记录含 `name`（事件名）+ `fileName`（详情）+ `duration`（纳秒）。`getEventData()` 按 `fullPath-fileName-parentId` 合并同父事件下相同条目的 `duration`。默认关闭，需 host 开启 `VERBOSE`/`TRACE`。

**速查**：先看 `name` 定大类（`Not`/`SafeModules`/`Completely`），再看 `fileName` 的 `#1`-`#9` 编号或描述定具体分支。`start`/`stop`（trace 级）仅 `TRACE` 可见，`startAdvanced`/`stopAdvanced` 在 `VERBOSE` 及以上可见。

### `program.ts` — `tryReuseStructureFromOldProgram` 区间

| name | fileName | 含义 |
|---|---|---|
| `tryReuseStructureFromOldProgram` | （空） | 整个函数调用区间，仅看耗时，无分支含义 |
| `structureIsReused: {Completely/SafeModules/Not}` | （空） | `tryReuseStructureFromOldProgram` 返回值汇总，`const enum` 被内联为数字，此处用三元映射输出枚举名 |

### `program.ts` — `Not` 分支（全量）

| name | fileName 模式 | # | 原因 |
|---|---|---|---|
| `structureIsReused: Not` | `#1 oldProgram is undefined (first build or .tsbuildinfo missing/deleted/corrupt)` | 1 | 无旧 program / `.tsbuildinfo` 缺失或损坏 |
| `structureIsReused: Not` | `#2 changesAffectModuleResolution - changedOptions: [{选项名列表}], configFilePath: {旧} -> {新}` | 2 | `module`/`moduleResolution`/`paths`/`baseUrl`/`target` 等模块解析选项变化（含具体变更选项名列表） |
| `structureIsReused: Not` | `#3 rootNames changed - oldCount={n}, newCount={n}, added=[{文件列表, 上限10}], removed=[{文件列表, 上限10}]` | 3 | 根文件列表增删（含具体增删文件路径，超过 10 个显示 `... and N more`） |
| `structureIsReused: Not` | `#4 tryReuseProjectReferences failed: {子原因+路径}` | 4 | 引用的 tsconfig 变化（子原因：resolved ref 丢失 / sourceFile 变 / fileNames 变 / 新增 resolved / references 数组变，含 project reference 路径） |
| `structureIsReused: Not` | `#5 a previously missing file now exists: {文件路径}` | 5 | 之前缺失的文件现在存在（含具体文件路径） |
| `structureIsReused: Not` | `#6 source file no longer exists: {文件}` | 6 | 源文件被删/读不到（含路径） |
| `structureIsReused: Not` | `#7 redirect underlying file changed: {文件}` | 7 | redirect 底层文件变（含路径） |
| `structureIsReused: Not` | `#8 redirected-to file changed: {文件}` | 8 | redirect 目标文件变（含路径） |
| `structureIsReused: Not` | `#9 package name conflict (two files for package "{包名}", at least one changed): {文件}` | 9 | 同包名两文件且至少一个变（含包名+路径） |

### `program.ts` — `SafeModules` 分支（增量-部分）

| name | fileName 模式 | 对应场景 | 原因 |
|---|---|---|---|
| `structureIsReused: SafeModules` | `属性 changed: {文件}`（遍历内每设置点详情）+ `file content changed but module resolution reusable, modifiedFiles={n}`（汇总，仅 count） | 10-18 | 文件遍历中触发：结构属性变（`imports`/`moduleAugmentations`/`typeReferenceDirectives`/`referencedFiles`/`libReferenceDirectives`/`impliedNodeFormat`/`hasNoDefaultLib`/`PermanentlySetIncrementalFlags`）或 `hasInvalidatedResolutions`；每个触发文件+属性各成一条详情，汇总仅含 modifiedFiles 数量（不含文件列表，避免 report 膨胀；触发文件已由各详情条目单独打印） |
| `structureIsReused: SafeModules` | `{类型} resolution changed: {文件}`（重解析详情）+ `module resolution changed for modified files, modifiedFiles={n}`（汇总） | 19-20 | modified files 重解析后 `resolutionsChanged`（module）或 `typeReferenceResolutionsChanged`（typeReference）；每个变化文件各成一条详情，末尾再打汇总 |
| `structureIsReused: SafeModules` | `#10 changesAffectingProgramStructure: [{选项名列表}]; hasChangedAutomaticTypeDirectiveNames` | 21 | `changesAffectingProgramStructure`（含具体变更选项名）或 `hasChangedAutomaticTypeDirectiveNames`，分号分隔各自原因 |

### `program.ts` — `Completely` 分支（增量-完全）

| name | fileName | 对应场景 | 原因 |
|---|---|---|---|
| `structureIsReused: Completely` | `structure fully reused from old program` | 22-23 | 文件未变，或内容变但结构属性均未变且重解析结果一致 |

### `program.ts` — `createProgram` 阶段子区间

用于排查子阶段耗时之和与 `createProgram` 总耗时的差距。仅列出 `startAdvanced`（VERBOSE+ 可见）。

| name | fileName | 阶段 |
|---|---|---|
| `tryReuseStructureFromOldProgram` | （空） | 增量判定 |
| `structureIsReused: {name}` | （空） | 返回值汇总（枚举名） |
| `resolveModuleNames` | `modifiedFiles={n}` | SafeModules 路径模块重解析总耗时 |
| `processRootFiles` | `rootNames={n}` | Not 路径主工作（递归读文件+解析+模块解析） |
| `processTypeReferences` | `count={n}` | `@types` 解析（文件系统 I/O） |
| `processDefaultLib` | （空） | 默认库读取/解析 |
| `processingDiagnostics` | （空） | 预处理诊断转换 |

### `builder.ts` — `getBuilderCreationParameters`

| name | fileName 模式 | 分支 | 原因 |
|---|---|---|---|
| `getBuilderCreationParameters: reuseProgramFromOldProgram` | `newProgramOrRootNames undefined, no createProgram call` | 复用旧 program | `newProgramOrRootNames` 未提供 |
| `getBuilderCreationParameters: createProgram` | `oldProgram={bool}, hasOldProgram={bool}, rootNames={n}` | 新建 program | 走 `createProgram`，含状态 |
| `getBuilderCreationParameters: newProgramProvided` | `newProgram={bool}, host={bool}, oldProgram={bool}, configFileParsingDiagnostics={bool}` | 外部提供 | 外部已建好 program |

### `watchPublic.ts` — `readBuilderProgram`

| name | fileName 模式 | 分支 | 原因 |
|---|---|---|---|
| `readBuilderProgram: buildInfoNotFound` | `{buildInfoPath} not found` | 缺失 | `.tsbuildinfo` 读不到（含路径） |
| `readBuilderProgram: invalidBuildInfo` | `path={p}, version={v}, hasProgram={bool}` | 无效 | buildInfo 版本不符或缺少 program 段 |
| `readBuilderProgram: loaded` | （空） | 成功 | buildInfo 加载成功（`name` 本身够用） |

### `tsbuildPublic.ts` — `getOldProgram`

| name | fileName 模式 | 分支 | 原因 |
|---|---|---|---|
| `getOldProgram: force` | `--force flag set, returning undefined for {proj}` | force | `--force` 强制重建（含项目路径） |
| `getOldProgram: cachedBuilderProgram` | `reused from builderPrograms map for {proj}` | 缓存命中 | `builderPrograms` 已有（含项目路径） |

### 速查局限

- **SafeModules 遍历触发**：仅结构属性变化的文件产生条目（`属性 changed: {文件}`，通常 1-20 条）；汇总仅含 `modifiedFiles={n}` 数量，不含文件列表（触发文件已由详情条目单独打印）。
- **空 `fileName` 条目**：`tryReuseStructureFromOldProgram` 区间、`structureIsReused: {name}` 汇总只能看耗时。
- **文件列表上限**：`#3 rootNames` 的 `added=[]`/`removed=[]` 最多 10 个路径，超过显示 `... and N more`。

## 约束

- 改动 `tryReuseStructureFromOldProgram` 的判定顺序或条件**必须**逐场景评估：提前 `return` 会跳过后续检查，可能把本应 `Not` 的场景误判为 `SafeModules`/`Completely`，导致脏缓存（modified files 未重检）。
- **不要**在加诊断/打点时意外删除分支的 `return` 语句：`SafeModules` 结果若 fall through 到 `Completely`，会跳过 modified files 的 re-check，静默漏报。
- `StructureIsReused` 是 `const enum`（`src/compiler/types.ts`，`Not=0`/`SafeModules=1`/`Completely=2`），改动枚举值会改变持久化与跨版本兼容，**先问人**。
- `PerformanceDotting.startAdvanced/stopAdvanced` 默认关闭（`src/compiler/performanceDotting.ts`），开关关闭时是 no-op，**不要**依赖打点调用的副作用来驱动逻辑。
- 增量路径的正确性依赖 `.tsbuildinfo` 的完整性；`.tsbuildinfo` 损坏会落到场景 1（`Not`）。

## 修改前检查

- [ ] 是否改动了 `tryReuseStructureFromOldProgram` 的判定顺序/条件/`return`？
- [ ] 每个分支的 `return` 是否保留？加打点时是否误删了 `return`？
- [ ] 改 `Not`/`SafeModules`/`Completely` 的归属是否评估了 modified files 的 re-check 覆盖？
- [ ] `const enum` 值是否未变（避免破坏持久化兼容）？
- [ ] `PerformanceDotting` 调用是否在开关关闭时仍保持 no-op（无副作用）？
- [ ] 是否执行了 `tests/cases/compiler/` 增量用例 + `npm run test`？

## 代码和测试

- 代码入口：`src/compiler/program.ts`（`tryReuseStructureFromOldProgram`、`createProgram`、`StructureIsReused` 消费、`processRootFiles`/`processTypeReferences`/`processDefaultLib`/`resolveModuleNames` 阶段打点）
- 枚举：`src/compiler/types.ts`（`StructureIsReused`，`const enum`，编译时内联为数字）
- 枚举名映射：`src/compiler/program.ts` `tryReuseStructureFromOldProgram` 调用方（三元映射 `const enum` 值 → 字符串，用于 report 可读性）
- 选项变更检测：`src/compiler/commandLineParser.ts`（`moduleResolutionOptionDeclarations`、`optionsAffectingProgramStructure`）；`src/compiler/utilities.ts`（`changesAffectModuleResolution`、`changesAffectingProgramStructure`、`optionsHaveChanges`、`getCompilerOptionValue`）
- builder/watch 复用入口：`src/compiler/builder.ts`（`getBuilderCreationParameters`）、`src/compiler/watchPublic.ts`（`readBuilderProgram`）、`src/compiler/tsbuildPublic.ts`（`getOldProgram`）
- 性能打点：`src/compiler/performanceDotting.ts`（开关、`getEventData`、`layerCount=5` 嵌套深度限制）
- 测试：`tests/cases/compiler/`（增量用例）、`tests/baselines/local/`（`npm run baseline`）
