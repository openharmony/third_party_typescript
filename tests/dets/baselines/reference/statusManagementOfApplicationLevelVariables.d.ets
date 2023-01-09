@Entry
@Component
declare struct ComponentA {
    @StorageLink
    varA: number;
    @StorageProp
    languageCode: string;
    private label;
    aboutToAppear(): void;
    build(): void;
}
declare class MainAbility {
    storage: LocalStorage;
}
declare let storage03: LocalStorage;
@Entry
@Component
declare struct LocalStorageComponent02 {
    @LocalStorageLink
    simpleVarName: number;
    build(): void;
}
@Component
declare struct LocalStorageComponentProp {
    @LocalStorageProp
    simpleVarName: number;
    build(): void;
}
declare let storage02: LocalStorage;
@Entry
@Component
declare struct ComA {
    @LocalStorageLink
    storageLink: number;
    build(): void;
}
@Component
declare struct Child06 {
    @LocalStorageLink
    storageLink: number;
    build(): void;
}
@Entry
@Component
declare struct PersistentComponent {
    @StorageLink
    highScore: string;
    @State
    currentScore: number;
    build(): void;
}
