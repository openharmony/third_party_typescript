@Sendable
class SendableClass9 {
  prop1: SendableClass9 = {prop1:new SendableClass9(), prop2:new SendableClass9()}; // should report, arkts-sendable-obj-init
  prop2: SendableClass9 = [1, 2]; // should report, arkts-sendable-obj-init
}

let v0: SendableClass9 = {prop1:new SendableClass9(), prop2:new SendableClass9()}; // should report, arkts-sendable-obj-init
let v1: SendableClass9 = [1, 2]; // should report, arkts-sendable-obj-init


export let other = 1;