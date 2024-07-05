

@Sendable 
function sf():void {}
function nf():void {}
@Sendable 
type Sft = () => void;
type Nft = () => void;
function LocalDecorator() {};


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

  @LocalDecorator // ERROR
  handle() {}
}

@Sendable 
@nf
function SendableFunctionClosure() {
  const a1:Sft = sf; // OK
  const a2:Nft = nf; // ERROR
  const a3:Sc = new Sc(); // OK
  const a4:Nc = new Nc(); // ERROR
}

namespace ns {
  @Sendable
  function sf():void;
  @Sendable
  function sf():void {}
}