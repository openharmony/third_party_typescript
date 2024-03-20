// Add rule arkts-sendable-class-inheritance

class BaseNonSendable {
}

@Sendable
class BaseSendable {
}

@Sendable
class DeriveSendable1 extends BaseSendable {
}

@Sendable
class DeriveSendable2 extends BaseNonSendable { // should report, arkts-sendable-class-inheritance
}

class DeriveNonSendable extends BaseSendable {  // should report, arkts-sendable-class-inheritance
}


export let other = 1;
