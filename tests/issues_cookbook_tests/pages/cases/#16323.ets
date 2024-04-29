class NonSendableClass4 {}

@Sendable
class SendableClass6 {}

let v0 = new SendableClass6() as NonSendableClass4; // OK

let v1 = new NonSendableClass4() as SendableClass6; // should report, arkts-sendable-as-expr

let tmp1 = new NonSendableClass4();

let v2 = tmp1 as SendableClass6; // should report, arkts-sendable-as-expr


export let other = 1;