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

//// declare class FlexAttribute {
////    /*definition*/flexGrow(value: number): FlexAttribute;
//// }

//// declare const Flex: FlexInterface;

//// declare const FlexInstance: FlexAttribute;

// @Filename: test.ets
//// @Builder
//// function test1(color:string){ 
////     Flex().[|/*reference*/flexGrow|](12)
//// }

verify.goToDefinition("reference", "definition");