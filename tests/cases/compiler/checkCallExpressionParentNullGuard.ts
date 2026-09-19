// @strict: true
// @target: es2017
//
// Regression test for checkCallExpression node.parent null guard.
// When a CallExpression without a parent pointer reaches checkCallExpression
// (e.g. from runArkPack synthetic nodes), the checker should not crash on
// `node.parent.kind` access. This test exercises both guarded code paths:
// 1. The assertion function check (node.parent?.kind === ExpressionStatement)
// 2. The ESSymbolLike / Symbol() check (walkUpParenthesizedExpressions(node.parent))

// --- Path 1: Assertion function as ExpressionStatement ---
function assertNonNull(value: any): asserts value {
    if (value === null || value === undefined) {
        throw new Error("Expected non-null");
    }
}

function testAssertion(x: string | null): void {
    assertNonNull(x);
    x.length;
}

// --- Path 2: Symbol() call in const declaration ---
const sym1 = Symbol();
const obj1 = { [sym1]: 42 };

// --- Combined: overload resolution failure with assertion-like calls ---
// When overload resolution fails, getSignatureApplicabilityError re-checks
// argument expressions through checkExpressionWithContextualType, which
// can recursively enter checkCallExpression.
function overloaded(x: string): void;
function overloaded(x: number): void;
function overloaded(x: string | number): void {}

// Passing a call expression as argument to trigger recursive checkCallExpression
declare function getVal(): string | number;
overloaded(getVal());

// --- Arg-loop null guard in getSignatureApplicabilityError / getSpreadArgumentType
// / getEffectiveCallArguments ---
//
// The three guards added alongside MR#877 defend `args[i]` against `undefined`
// when `args` is sparse (synthetic nodes from runArkPack, or half-rebuilt AST
// during incremental re-check). Well-formed source can never produce a hole,
// so the cases below only exercise the guarded loops on the success path to
// prove normal behavior is unchanged. The actual undefined-arg crash must be
// reproduced with a synthetic CallExpression whose `arguments` array has holes
// (manual verification: `ts.factory.createCallExpression` with a sparse
// arguments array, then `checker.getResolvedSignature()` must not throw).

// Multi-argument call: exercises getSignatureApplicabilityError's fixed-arg loop.
function multiArg(a: string, b: number, c: boolean): void {}
multiArg("s", 1, true);

// Rest-parameter call: exercises getSpreadArgumentType's rest-arg loop.
function withRest(head: number, ...rest: string[]): void {}
withRest(0, "a", "b", "c");

// Spread argument: exercises getEffectiveCallArguments' spread-reconstruction loop.
function spreadInto(head: number, ...rest: string[]): void {}
const tuple: [string, string] = ["x", "y"];
spreadInto(0, ...tuple);

// Overload success with multiple args: exercises chooseOverload -> arg loop.
function pick(x: string, y: number): string;
function pick(x: number, y: string): string;
function pick(x: string | number, y: string | number): string { return String(x) + y; }
const r1 = pick("a", 1);
const r2 = pick(1, "a");

// Generic function call with type inference: exercises inferTypeArguments'
// arg loop (guarded against sparse args[i].kind).
function identity<T>(value: T): T { return value; }
const r3 = identity("hello");
const r4 = identity(42);

// Generic function with multiple type params inferred from args.
function pair<A, B>(a: A, b: B): [A, B] { return [a, b]; }
const r5 = pair("s", 1);
const r6 = pair(true, null);

// Generic with rest parameter: exercises both inferTypeArguments' loop and
// getSignatureApplicabilityError's rest errorNode branch.
function concatAll<T>(...items: T[]): T[] { return items; }
const r7 = concatAll("a", "b", "c");
const r8 = concatAll(1, 2, 3, 4);
