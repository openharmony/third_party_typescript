@Entry
@Component
declare struct EntryComponent {
    build(): void;
}
declare let storage: LocalStorage;
@Entry
@Component
declare struct LocalStorageComponent {
    @LocalStorageLink
    simpleVarName: number;
    build(): void;
}
@Preview
@Component
declare struct index {
    build(): void;
}
@Component
declare struct index2 {
    build(): void;
}
@CustomDialog
@Component
declare struct DialogExample {
    controller: CustomDialogController;
    action: () => void;
    build(): void;
}
@Observed
declare class ClassA {
    name: string;
    c: number;
    constructor(c: number, name?: string);
}
@Component
declare struct PropertyAndMethod {
    @Consume
    reviewVotes: number;
    @Link
    buttonPlaying: boolean;
    @LocalStorageLink
    storageLink: number;
    @LocalStorageProp
    simpleVarName: number;
    @ObjectLink
    a: string;
    @Prop
    property5: number;
    @Provide
    property6: number;
    @State
    count: number;
    @StorageLink
    varA: number;
    @StorageProp
    languageCode: string;
    @State
    @Watch
    shopBasket: Array<number>;
    @BuilderParam
    noParam: () => void;
    @Builder
    CompC(value: string): void;
    @Styles
    globalFancy();
    build(): void;
}
@Builder
declare function specificParam02(label1: string, label2: string): void;
