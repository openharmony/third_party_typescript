# AGENTS Guidelines for This Repository

This document provides guidance for AI agents working on the ohos-typescript codebase.

## Repository Overview

This is **ohos-typescript** (OpenHarmony TypeScript), a fork of TypeScript 4.9.5-r4 modified for OpenHarmony development. It adds extended support for the **ETS (Extensible TypeScript)** language paradigm used in OpenHarmony development.

## Directory Structure

```
ohos-typescript/                  # OpenHarmony TypeScript (TypeScript 4.9.5-r4 fork)
├── src/                          # Source code
│   ├── compiler/                 # Core compiler implementation
│   │   ├── binder.ts             # Symbol and variable binding
│   │   ├── checker.ts            # Type checker (contains ETS-specific type logic)
│   │   ├── parser.ts             # Syntax parser (handles ETS syntax extensions)
│   │   ├── emitter.ts            # JavaScript code generator
│   │   ├── ohApi.ts              # OpenHarmony/ETS-specific APIs (1776 lines)
│   │   ├── program.ts            # Compilation program management
│   │   ├── transformer.ts        # AST transformation utilities
│   │   ├── moduleNameResolver.ts # Module resolution logic
│   │   ├── types.ts              # TypeScript type definitions
│   │   ├── scanner.ts            # Lexical scanner/tokenizer
│   │   ├── core.ts               # Core compiler interfaces
│   │   ├── utilities.ts          # Shared utility functions
│   │   ├── builder.ts            # AST builder for ETS components
│   │   ├── builderState.ts       # Builder state management
│   │   ├── commandLineParser.ts  # Command-line argument parser
│   │   ├── path.ts               # Path manipulation utilities
│   │   ├── sys.ts                # System I/O abstraction layer
│   │   ├── watch.ts              # File watching infrastructure
│   │   ├── tsbuild.ts            # Project reference build system
│   │   ├── performance.ts        # Performance monitoring
│   │   ├── debug.ts              # Debug logging utilities
│   │   ├── tracing.ts            # Execution tracing
│   │   ├── sourcemap.ts          # Source map generation
│   │   ├── symbolWalker.ts       # AST symbol traversal
│   │   ├── resolutionCache.ts    # Module resolution cache
│   │   ├── moduleSpecifiers.ts   # Module specifier handling
│   │   ├── semver.ts             # Semantic versioning utilities
│   │   ├── perfLogger.ts         # Performance logging
│   │   └── *Public.ts            # Public API variants (corePublic, utilitiesPublic, etc.)
│   ├── services/                 # Language services (auto-completion, navigation)
│   ├── server/                   # Language server implementation
│   ├── tsc/                      # Command-line interface
│   ├── tsserver/                 # TypeScript language server for IDEs
│   ├── testRunner/               # Test framework
│   ├── linter/                   # Linting and static analysis
│   └── typescript/               # TypeScript type definitions
│
├── tests/                        # Test suites
│   ├── cases/                    # Compiler test cases
│   │   ├── compiler/             # Compiler tests
│   │   ├── conformance/          # Conformance tests
│   │   └── project/              # Project-based tests
│   ├── arkTSTest/                # ETS language feature tests
│   ├── baselines/                # Expected output for regression testing
│   ├── system_api_test/          # OpenHarmony-specific API tests
│   ├── projects/                 # Test project configurations
│   └── ts_extra_tests/           # Additional TypeScript tests
│
├── lib/                          # Built JavaScript output
├── doc/                          # Documentation
│   ├── spec-ARCHIVED.md          # TypeScript language specification
│   └── handbook/                 # TypeScript handbook
│
├── bin/                          # Executable scripts
├── scripts/                      # Build and utility scripts
├── built/                        # Build artifacts
├── internal/                     # Internal utilities
│
├── package.json                  # npm package configuration
├── tsconfig.json                 # TypeScript compiler configuration
├── BUILD.gn                      # GN build configuration (OpenHarmony)
├── bundle.json                   # OpenHarmony bundle metadata
├── Herebyfile.mjs                # Hereby build configuration
├── README.md                     # Project overview
├── CONTRIBUTING.md               # Contribution guidelines
├── CLAUDE.md                     # General codebase overview
├── AGENTS.md                     # This file - AI agent guidelines
└── ohos-typescript-4.9.5-r4.tgz  # Release package
```

## Critical Files for ETS Functionality

When working on ETS-related features or issues, these files are most relevant:

- **`src/compiler/ohApi.ts`** - Core OpenHarmony/ETS-specific APIs
  - Annotation processing and transformation
  - Kit import handling (`@kit.*`)
  - ETS decorator detection and processing
  - Module resolution for `oh_modules` (OpenHarmony package manager)

- **`src/compiler/checker.ts`** - Type checker (contains ETS-specific type logic)
- **`src/compiler/parser.ts`** - Parser (handles ETS syntax extensions like `struct`)
- **`src/compiler/emitter.ts`** - Code generator (ETS-specific emission logic)

## ETS Language Features

### Syntax Extensions

- **`struct` declarations** - Custom component syntax (`StructDeclaration` node)
- **`.ets` file extension** - Detected via `ScriptKind.ETS`
- **Special decorators:**
  - `@Builder` / `@LocalBuilder` - Component builders
  - `@BuilderParam` - Builder parameters
  - `@Styles` - Component styling
  - `@Extend` - Extension decorators
  - `@Require` - Requirement decorator
  - `@Sendable` - Concurrent/Shared decorator

### Annotation System

ETS has a custom annotation system that transforms at compile time:
- Annotations use magic prefix: `__$$ETS_ANNOTATION$$__`
- `@interface` syntax for annotation declarations
- Automatic default value injection
- Type inference for annotation properties
- Source retention vs. emit retention

## OpenHarmony Module System

### Package Manager Differences

| Standard TypeScript | OpenHarmony ETS |
|-------------------|-----------------|
| `node_modules` | `oh_modules` |
| `package.json` | `oh-package.json5` |
| `npm` packages | `ohpm` packages |

### Kit Imports

Special handling for `@kit.*` imports (e.g., `@kit.ArkUI`, `@kit.NetworkKit`):
- Transformed during compilation via `processKit()` function
- Uses JSON configuration files in SDK's `build-tools/ets-loader/kit_configs/`
- Supports both OHOS and HMS kit configurations
- Includes lazy import support via `isLazy` flag

## Common Patterns

### Checking ETS Context

```typescript
import { isInEtsFile } from "./ohApi";

// Always check if code is in ETS context before applying ETS-specific logic
if (isInEtsFile(node)) {
    // Apply ETS-specific handling
}
```

### Checking ETS Decorators

```typescript
import { hasEtsBuilderDecoratorNames, hasEtsStylesDecoratorNames } from "./ohApi";

// Check for specific ETS decorator types
if (hasEtsBuilderDecoratorNames(decorators, compilerOptions)) {
    // Handle Builder decorator
}
```

### Module Resolution

```typescript
import { isOHModules, isOhpm, getModuleByPMType } from "./ohApi";

// Check for OpenHarmony package manager
if (isOhpm(packageManagerType)) {
    const modulesDir = getModuleByPMType(packageManagerType); // "oh_modules"
}
```

## Testing Strategy

### Test Locations

- **`tests/cases/`** - Compiler test cases
- **`tests/baselines/`** - Expected output for regression testing
- **`tests/system_api_test/`** - OpenHarmony-specific API tests
- **`tests/arkTSTest/`** - ETS language feature tests

### Build Commands and Run Tests

```bash
# Build both compiler and tests
npm run build

# Build only the compiler
npm run build:compiler

# Build only tests
npm run build:tests

# Run tests
npm run test

# Run lint tests
First, run `npm pack` in the typescript directory to pack the package, and then run `npm install` in the `typescript/tests/arkTSTest` directory to install the dependency.
node run.js -v1.0 -D
node run.js -v1.1 -D

# Run system API tests (OpenHarmony-specific)
npm run test:system-api

# Clean build artifacts
npm run clean
```

## High-Level Architecture

The compiler follows a classic multi-phase architecture:

1. **Parser** (`src/compiler/parser.ts`) - Converts source code to AST
2. **Binder** (`src/compiler/binder.ts`) - Resolves symbols and builds symbol tables
3. **Checker** (`src/compiler/checker.ts`) - Type checking and semantic analysis (very large, ~2.8MB)
4. **Emitter** (`src/compiler/emitter.ts`) - Generates JavaScript output
5. **Diagnostics** - Error and warning reporting system

### Key Directories

- `src/compiler/` - Core compiler implementation (parser, checker, binder, emitter)
- `src/services/` - Language services (auto-completion, navigation, etc.)
- `src/tsserver/` - Language server for IDE integration
- `src/tsc/` - Command-line interface
- `src/testRunner/` - Test framework
- `src/compiler/ohApi.ts` - **OpenHarmony/ETS-specific APIs and utilities**

## OpenHarmony/ETS-Specific Features

### ETS Language Extensions

The codebase adds several ETS-specific language features:

- **Custom component `struct` syntax** - `StructDeclaration` and `EtsComponentExpression` node types
- **Special decorators** - `@Builder`, `@BuilderParam`, `@Styles`, `@Extend` for ETS components
- **Lifecycle completion** - Support for ETS component lifecycle methods
- **Annotations** - Custom annotation system with magic prefix `__$$ETS_ANNOTATION$$__`
- **File extension** - `.ets` files with `ScriptKind.ETS`

### Key OpenHarmony APIs (src/compiler/ohApi.ts)

- `isInEtsFile()` - Check if a node is in an ETS file
- `getReservedDecoratorsOfEtsFile()` - Get ETS-specific decorators
- `processKit()` - Process OpenHarmony kit imports (`@kit.*`)
- `getAnnotationTransformer()` - Transform ETS annotations
- `hasEtsBuilderDecoratorNames()`, `hasEtsStylesDecoratorNames()` - Check for ETS decorators
- `isOHModules()`, `isOhpm()` - Support for `oh_modules` directory (OpenHarmony package manager)

## Build System

- Uses `hereby` as the build tool (accessed via `.gulp.js` shim)
- ESLint for code quality
- Parallel test execution with configurable workers
- LKG (Last Known Good) builds for releases

## Common Tasks

### Adding a New ETS Decorator

1. Define decorator in compiler options schema
2. Add detection logic in `ohApi.ts` (similar to `hasEtsBuilderDecoratorNames`)
3. Update parser if syntax is new
4. Add transformation logic in emitter if needed
5. Add tests

### Modifying Annotation Processing

Annotation transformation happens in `ohApi.ts`:
- `getAnnotationTransformer()` - Main entry point
- `transformAnnotation()` - Core transformation logic
- `visitAnnotationDeclaration()` - Declaration handling
- `visitAnnotation()` - Usage site handling

### Kit Import Changes

Kit import processing is in `processKit()`:
- Kit JSON configs are cached in `kitJsonCache`
- White lists control special handling: `whiteListForErrorSymbol`, `whiteListForTsFile`
- SDK path detection via `getSdkPath()`

## Debugging Tips

### Enable Debug Logging

Check `src/compiler/debug.ts` for debug flags.

### Trace Kit Imports

Kit import transformations add virtual nodes with `NodeFlags.KitImportFlags`.

### Check ETS File Detection

```typescript
// Verify file is being detected as ETS
getSourceFileOfNode(node)?.scriptKind === ScriptKind.ETS
```

## Important Constraints

1. **Never modify ETS files in `.ts` context** - ETS features only active when `ScriptKind.ETS` is detected
2. **Preserve backward compatibility** - Changes should not break standard TypeScript
3. **Annotation prefix is magic** - The `__$$ETS_ANNOTATION$$__` prefix must be preserved for tool compatibility
4. **Virtual nodes** - Many ETS transformations create virtual nodes - handle appropriately
5. **Module system coexistence** - Code must handle both `node_modules` and `oh_modules`

## ArkTS Linter

### Overview

The ArkTS Linter is a static analysis tool for ArkTS (a TypeScript variant used in HarmonyOS). It enforces strict typing rules and language restrictions specific to the ArkTS programming paradigm.

### Directory Structure

```
linter/
├── ArkTSLinter_1_0/          # Linter implementation for ArkTS 1.0
├── ArkTSLinter_1_1/          # Linter implementation for ArkTS 1.1
├── Common/                   # Shared utilities
└── _namespaces/              # TypeScript namespace definitions
```

#### Linter Runner (`LinterRunner.ts`)

The `runArkTSLinter` function is the primary entry point for running the linter:

**Key Features:**
- **Incremental Linting**: Only lints changed files based on program state
- **Version Awareness**: Re-lints all files if ArkTS version changes
- **Build Info Caching**: Stores diagnostics in `.tsbuildinfo` for faster subsequent runs
- **Memory Management**: Clears caches after completion for daemon mode

**Workflow:**
1. Initialize static configuration
2. Collect changed files from program state
3. Run TSC diagnostics (strict and non-strict modes)
4. Iterate through source files and apply ArkTS rules
5. Cache diagnostics and optionally emit build info
6. Release references for memory cleanup

## Error Code System

ETS-specific errors use specific error codes (see `ohApi.ts`):
- **TSC error codes**: Mapped to OpenHarmony error format (e.g., `10505114`)
- **UI error codes**: 28000-28007, 28015
- **Linter error codes**: 28016-28017

Error info is provided via `ErrorInfo` class and `getErrorCode()` function.

## Related Documentation

- **`README.md`** - Project overview and modification history
- **`CONTRIBUTING.md`** - Contribution guidelines
- **`doc/spec-ARCHIVED.md`** - TypeScript language specification (archived)
- **`CLAUDE.md`** - General codebase overview

## Related Repositories

### developtools_ace_ets2bundle

**Purpose**: ETS/ArkTS declarative syntax compiler and bundler for OpenHarmony ACE framework.

**Key Functions**:
- **Syntax Compilation**: Converts declarative ArkTS/ETS syntax into executable bundle formats
- **Syntax Validation**: Performs syntax verification to ensure code correctness
- **Error Reporting**: Provides detailed and friendly syntax error messages for debugging
- **Bytecode Generation**: Works with `arkcompiler_ets_frontend` to produce Ark bytecode files

**Architecture**:
- Part of the **ACE (Ark Compiler Engine)** toolchain
- Source code located in `compiler/src/` directory
- Integrates with Ark Runtime for executing compiled ETS applications

**Links**:
- [Gitcode Repository](https://gitcode.com/openharmony/developtools_ace_ets2bundle)

### arkcompiler_ets_frontend

**Purpose**: Front-end compiler in the ARK Runtime Subsystem for converting ETS/ArkTS source code into Ark bytecode.

**Key Functions**:
- **Bytecode Generation**: Converts ETS (Extended TypeScript), ArkTS, TypeScript, and JavaScript source code into Ark bytecode files
- **Type Processing**: Preserves static type information for optimized runtime execution
- **Compilation Pipeline**: Works as the frontend component that produces bytecode, while the Ark Runtime executes it
- **Integration**: Collaborates with `ace-ets2bundle` component to complete the ETS-to-bytecode conversion

**Architecture**:
- Part of the **ArkCompiler** system - Huawei's default JavaScript/ArkTS runtime on OpenHarmony
- Implementation divided into two parts: Frontend (bytecode generation) and Runtime (execution)
- Provides the foundation for ArkTS language execution on OpenHarmony/HarmonyOS platforms

**Links**:
- [Gitcode Repository](https://gitcode.com/openharmony/arkcompiler_ets_frontend)

## Version Information

- **Base version**: TypeScript 4.9.5
- **Current version**: 4.9.5-r4
- **License**: Apache-2.0
- **Node.js requirement**: >=4.2.0 (build uses Node 14.20.0)

## Development Notes
- This is based on TypeScript 4.9.5, not the latest version
- ETS features are only active in `.ets` files (detected via `ScriptKind.ETS`)
- Many ETS features use AST node flags and virtual nodes for transformation
- The `ohApi.ts` file contains critical ETS-specific logic that hooks into the compiler pipeline
- Annotation processing is a major feature - annotations are transformed with special prefix handling
