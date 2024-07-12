

@Sendable 
function sf():void {}
function nf():void {}
@Sendable 
type Sft = () => void;
type Nft = () => void;
function localDecorator() {};


@Sendable 
class Sc {}
class Nc {}

@Sendable 
class SendableClassClosure {
  constructor() {
    const a1:Sft = sf; // OK
    const a2:Nft = nf; // ERROR
    const a3:Sc = new Sc(); // OK
    const a4:Nc = new Nc(); // ERROR
  }

  @localDecorator // ERROR
  handle() {}
}

@Sendable 
@nf
function sendableFunctionClosure() {
  const a1:Sft = sf; // OK
  const a2:Nft = nf; // ERROR
  const a3:Sc = new Sc(); // OK
  const a4:Nc = new Nc(); // ERROR
}

namespace Ns {
  @Sendable
  function sf():void;
  @Sendable
  function sf():void {}
}