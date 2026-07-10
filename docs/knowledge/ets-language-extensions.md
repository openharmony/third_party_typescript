# ETS 语言扩展知识

本文只记录 ETS（Extensible TypeScript）语言扩展的边界与约束。OH 模块系统见 `oh-module-system.md`，类型检查器见 `type-checker-and-compat.md`。

## 核心模型

ETS 扩展只在 `ScriptKind.ETS`（`.ets` 文件）下激活。所有 ETS 专属逻辑集中在 `src/compiler/ohApi.ts`，挂在标准 parser/binder/checker/emitter 流程上。

| 阶段 | 文件 | ETS 钩子 |
|---|---|---|
| 解析 | `src/compiler/parser.ts` | `struct` 声明（`StructDeclaration`）、`EtsComponentExpression` |
| 绑定 | `src/compiler/binder.ts` | 装饰器/注解符号绑定 |
| 检查 | `src/compiler/checker.ts` | ETS 类型逻辑、API 可用性、@throws |
| 生成 | `src/compiler/emitter.ts` | ETS 专属 emit、注解保留 |
| 入口 | `src/compiler/ohApi.ts` | kit/注解/装饰器/oh_modules 集中点 |

## 边界：ETS 装饰器与注解

| 概念 | 用途 | 常见误用 |
|---|---|---|
| `@Builder` / `@LocalBuilder` | 组件构建器 | 在 `.ts` 文件使用——不生效 |
| `@BuilderParam` | 构建器参数 | 与普通参数混用 |
| `@Styles` | 组件样式复用 | 当作普通函数装饰器 |
| `@Extend` | 扩展原生组件 | 扩展自定义组件 |
| `@Require` | 强制必传 | 与 `@Prop`/`@Link` 语义混淆 |
| `@Sendable` | 跨并发可共享 | 标注不可共享对象 |
| 注解 `@interface` | 编译期注解声明 | 与 TS `interface` 混淆 |
| `__$$ETS_ANNOTATION$$__` | 注解魔法前缀 | 手改或省略——工具链断裂 |

## 约束

- **必须**先判断 `isInEtsFile(node)` 再应用任何 ETS 逻辑；在 `.ts` 上下文启用 ETS 扩展是污染标准 TS 的高频错误。
- **不要**改动注解魔法前缀 `__$$ETS_ANNOTATION$$__`；它由 `getAnnotationTransformer()` 注入，emit 端与下游工具依赖。
- **不要**手改 ETS 变换产生的虚拟节点（`NodeFlags.KitImportFlags` 等）；改 source of truth 后重新走变换。
- **必须**保持对标准 TypeScript 的向后兼容：ETS 能力只在 `.ets` 生效，`.ts` 行为不能因 ETS 改动而变。
- 注解分 source retention 与 emit retention，**不要**为通过测试把 emit-retention 注解删掉。

## 修改前检查

- [ ] 改动是否被 `isInEtsFile` / `ScriptKind.ETS` 守卫？
- [ ] 是否动了 `__$$ETS_ANNOTATION$$__` 前缀？（否）
- [ ] `.ts` 文件的标准 TS 行为是否未变？（执行 `tests/cases/conformance`）
- [ ] 新装饰器是否在 `ohApi.ts` 加了检测逻辑（仿 `hasEtsBuilderDecoratorNames`）？

## 代码和测试

- 代码入口：`src/compiler/ohApi.ts`（`isInEtsFile`、`getReservedDecoratorsOfEtsFile`、`hasEtsBuilderDecoratorNames`、`hasEtsStylesDecoratorNames`、`getAnnotationTransformer`、`transformAnnotation`、`visitAnnotationDeclaration`、`visitAnnotation`）
- 解析/生成：`src/compiler/parser.ts`、`src/compiler/emitter.ts`
- 测试：`tests/arkTSTest/`（`node run.js -v1.0 -D` / `-v1.1 -D`）、`tests/cases/`、`tests/dets/`
