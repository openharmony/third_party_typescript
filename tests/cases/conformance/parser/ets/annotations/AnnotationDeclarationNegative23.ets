// @etsAnnotationsEnable: true
declare let interface: PropertyDecorator
declare let f: PropertyDecorator;
class C {
    @interface
    @f
    a: number = 1;
    @f
    @interface
    b: number = 1;
}