declare class Model {
    value: string;
    constructor(value: string);
}
@Entry
@Component
declare struct EntryComponent05 {
    build(): void;
}
@Component
declare struct MyComponent05 {
    @State
    title: Model;
    @State
    count: number;
    private toggle;
    private increaseBy;
    build(): void;
}
@Entry
@Component
declare struct ParentComponent {
    @State
    countDownStartValue: number;
    build(): void;
}
@Component
declare struct CountDownComponent {
    @Prop
    count: number;
    private costOfOneAttempt;
    build(): void;
}
@Entry
@Component
declare struct Player {
    @State
    isPlaying: boolean;
    build(): void;
}
@Component
declare struct PlayButton {
    @Link
    buttonPlaying: boolean;
    build(): void;
}
@Entry
@Component
declare struct Parent {
    @State
    arr: number[];
    build(): void;
}
@Component
declare struct Child {
    @Link
    items: number[];
    build(): void;
}
@Entry
@Component
declare struct ParentView {
    @State
    counter: number;
    build(): void;
}
@Component
declare struct ChildA {
    @Prop
    counterVal: number;
    build(): void;
}
@Component
declare struct ChildB {
    @Link
    counterRef: number;
    build(): void;
}
declare var nextID: number;
@Observed
declare class ClassA05 {
    name: string;
    c: number;
    id: number;
    constructor(c: number, name?: string);
}
@Component
declare struct ViewA {
    label: string;
    @ObjectLink
    a: ClassA05;
    build(): void;
}
@Entry
@Component
declare struct ViewB {
    @State
    arrA: ClassA05[];
    build(): void;
}
@Entry
@Component
declare struct CompA {
    @Provide
    reviewVotes: number;
    build(): void;
}
@Component
declare struct CompB {
    build(): void;
}
@Component
declare struct CompC {
    @Consume
    reviewVotes: number;
    build(): void;
}
@Entry
@Component
declare struct CompA02 {
    @State
    @Watch
    shopBasket: Array<number>;
    @State
    totalPurchase: number;
    @State
    addPurchase: number;
    aboutToAppear(): void;
    updateTotal(): number;
    onBasketUpdated(propName: string): void;
    build(): void;
}
