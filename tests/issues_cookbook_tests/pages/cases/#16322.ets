@Sendable // OK
class SendableClass7 {
  prop: string = ''; // OK

  constructor() {} // OK

  myMethod1() {} // OK

  myMethod2(param: string) {} // OK

  get myProperty(): string { // OK
    return this.prop;
  }
  set myProperty(value: string) { // OK
    this.prop = value;
  }
}

declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void; // should report, arkts-no-symbol
declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void; // should report, arkts-no-symbol
declare const SomeDecorator:PropertyDecorator;
declare const SomeDecorator2:ParameterDecorator;
declare const NonSendable:ClassDecorator;


@NonSendable // should report, arkts-sendable-class-decorator
@Sendable
class SendableClass8 {
  @SomeDecorator // should report 2 error, arkts-sendable-class-decorator, arkts-sendable-imported-variables
  prop: string = '';

  constructor() {}

  @SomeDecorator // should report 2 error, arkts-sendable-class-decorator, arkts-sendable-imported-variables
  myMethod1() {}

  myMethod2(@SomeDecorator2 param: string) {} // should report 2 error, arkts-sendable-class-decorator, arkts-sendable-imported-variables

  @SomeDecorator // should report 2 error, arkts-sendable-class-decorator, arkts-sendable-imported-variables
  get myPropertyGet(): string {
    return this.prop;
  }
  @SomeDecorator // should report 2 error, arkts-sendable-class-decorator, arkts-sendable-imported-variables
  set myProperty2Set(value: string) {
    this.prop = value;
  }
}


export let other = 1;