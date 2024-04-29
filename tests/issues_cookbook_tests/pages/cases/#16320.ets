import lang from './attached/@arkts.lang'

class NonSendableClass2 {}

@Sendable
class SendableClass10 {}

@Sendable
class SendableClass4 <T, U> {
  prop1: number; // OK
  prop2: string; // OK
  prop3: boolean; // OK
  prop4: bigint; // OK
  prop5: SendableClass3; // OK
  prop6: null; // OK
  prop7: undefined; // OK
  prop8: U; // OK
  prop9: T | number | undefined; // OK
  prop10: alias0; // OK
  prop11: alias1; // OK

  constructor(u: U, t: T) {
    this.prop1 = 1;
    this.prop2 = '';
    this.prop3 = true;
    this.prop4 = BigInt(11111);
    this.prop5 = new SendableClass3(); // should report, arkts-sendable-imported-variables
    this.prop6 = null;
    this.prop7 = undefined;
    this.prop8 = u;
    this.prop9 = undefined;
    this.prop10 = null;
    this.prop11 = new SendableClass10(); // should report, arkts-sendable-imported-variables
  }

}

@Sendable
class SendableClass3 {
  prop1: string[]; // should report, arkts-sendable-prop-types
  prop2: NonSendableClass2; // should report, arkts-sendable-prop-types
  prop3: NonSendableClass2 | null; // should report, arkts-sendable-prop-types
  prop4: NonSendableClass2 | undefined; // should report, arkts-sendable-prop-types
  prop5: NonSendableClass2 | null | undefined; // should report, arkts-sendable-prop-types
  prop6: alias2; // should report, arkts-sendable-prop-types
  prop7: alias3; // should report, arkts-sendable-prop-types
  ['aaa']: number = 0; // should report, arkts-sendable-computed-prop-name

  constructor() {
    this.prop1 = ['']
    this.prop2 = new NonSendableClass2(); // should report, arkts-sendable-imported-variables
    this.prop3 = null;
    this.prop4 = undefined;
    this.prop5 = undefined;
    this.prop6 = new NonSendableClass2(); // should report, arkts-sendable-imported-variables
    this.prop7 = undefined;
  }
}

type alias0 = number | null;
type alias1 = SendableClass10;
type alias2 = NonSendableClass2;
type alias3 = NonSendableClass2 | undefined;

class B {}

@Sendable
class C {}

interface A extends lang.ISendable {
  a: number; // OK
  b:C; // OK
  c:B; // should report, arkts-sendable-prop-types
}


export let other = 1;