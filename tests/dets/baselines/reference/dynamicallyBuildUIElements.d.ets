@Component
declare struct CompB02 {
    @State
    CompValue: string;
    aboutToAppear(): void;
    aboutToDisappear(): void;
    build(): void;
}
@Entry
@Component
declare struct CompA04 {
    size1: number;
    @State
    CompValue1: string;
    @State
    CompValue2: string;
    @State
    CompValue3: string;
    @Builder
    CompC(value: string): void;
    @Builder
    SquareText(label: string): void;
    @Builder
    RowOfSquareTexts(label1: string, label2: string): void;
    build(): void;
}
@Component
declare struct CustomContainer {
    header: string;
    @BuilderParam
    noParam: () => void;
    @BuilderParam
    withParam: any;
    footer: string;
    build(): void;
}
@Entry
@Component
declare struct CustomContainerUser {
    @Builder
    specificNoParam(): void;
    @Builder
    SpecificWithParam(label: string): void;
    build(): void;
}
@Component
declare struct CustomContainer02 {
    header: string;
    @BuilderParam
    closer: () => void;
    build(): void;
}
@Builder
declare function specificParam(label1: string, label2: string): void;
@Entry
@Component
declare struct CustomContainerUser02 {
    @State
    text: string;
    build(): void;
}
@Styles
declare function globalFancy();
@Entry
@Component
declare struct FancyUse {
    @Styles
    componentFancy();
    build(): void;
}
@Styles
declare function globalFancy02();
@Entry
@Component
declare struct FancyUse02 {
    @Styles
    componentFancy();
    build(): void;
}
declare function fancy(fontSize: number);
@Entry
@Component
declare struct FancyUse03 {
    build(): void;
}
@CustomDialog
declare struct DialogExample02 {
    controller: CustomDialogController;
    action: () => void;
    build(): void;
}
@Entry
@Component
declare struct CustomDialogUser {
    dialogController: CustomDialogController;
    onAccept(): void;
    existApp(): void;
    build(): void;
}
