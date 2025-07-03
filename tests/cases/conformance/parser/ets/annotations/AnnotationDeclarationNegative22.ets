// @etsAnnotationsEnable: true
declare let interface: ClassDecorator
declare let f: ClassDecorator;
@interface
@f
class C1 {}
@f
@interface
class C2 {}