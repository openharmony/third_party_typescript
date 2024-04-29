class NonSendableClass3 {}

@Sendable
class SendableClass5 <T, U> {
  prop1: T;
  prop2: U;

  constructor(t: T, u: U) {
    this.prop1 = t;
    this.prop2 = u;
  }
}

let ins1 = new SendableClass5<number, string>(0, '1'); // OK
let ins2 = new SendableClass5<number, NonSendableClass3>(0, new NonSendableClass3()); // should report, arkts-sendable-generic-types
let ins3 = new SendableClass5<number[], string[]>([0], ['']); // should 2 report, arkts-sendable-generic-types

let e = SendableClass5; // should report warn
let b = e;

let c = Math.random() > 0.5 ? SendableClass5 : NonSendableClass3; // should report 2 warn

let ins4 = new b<number, NonSendableClass3>(0, new NonSendableClass3()); // should report, arkts-sendable-generic-types
let ins5 = new c<number, NonSendableClass3>(0, new NonSendableClass3()); // OK, skip check


export let other = 1;