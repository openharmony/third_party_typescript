/// <reference path='./fourslash.ts' />

// @Filename: flex.d.ts
//// declare enum FlexAlign {
////     Start,
////     Center,
////     End,
////     SpaceBetween,
////     SpaceAround,
////     SpaceEvenly
//// }

//// declare enum ItemAlign {
////     Auto,
////     Start,
////     Center,
////     End,
////     Baseline,
////     Stretch
//// }

//// declare enum FlexDirection {
////     Row,
////     Column,
////     RowReverse,
////     ColumnReverse
//// }

//// declare enum FlexWrap {
////     NoWrap,
////     Wrap,
////     WrapReverse
//// }

//// declare enum VerticalAlign {
////     Top,
////     Center,
////     Bottom
//// }

//// interface FlexInterface {
////     (value?: { direction?: FlexDirection, wrap?: FlexWrap, justifyContent?: FlexAlign, alignItems?: ItemAlign, alignContent?: FlexAlign }): FlexAttribute;
//// }

//// declare class FlexAttribute extends CommonMethod<FlexAttribute> {
//// }

//// declare const /*definition*/Flex: FlexInterface;

//// declare const FlexInstance: FlexAttribute;

// @Filename: test.ets
//// @Extend([|/*reference*/Flex|])
//// function test1(color:string){ 
////     .flexGrow(12)
//// }

verify.goToDefinition("reference", "definition");