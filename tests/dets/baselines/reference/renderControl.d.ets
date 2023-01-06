@Entry
@Component
declare struct MyComponent {
    @State
    arr: number[];
    build(): void;
}
interface DataChangeListener {
    onDataReloaded(): void;
    onDataAdd(index: number): void;
    onDataMove(from: number, to: number): void;
    onDataDelete(index: number): void;
    onDataChange(index: number): void;
}
declare class BasicDataSource02 implements IDataSource {
    private listeners;
    getData(index: number): any;
    totalCount(): number;
    registerDataChangeListener(listener: DataChangeListener): void;
    unregisterDataChangeListener(listener: DataChangeListener): void;
    informDataReload(): void;
    informDataAdd(index: number): void;
    informDataChange(index: number): void;
    informDataDelete(index: number): void;
    informDataMove02(from: number, to: number): void;
}
declare class MyDataSource02 extends BasicDataSource02 {
    private dataArray;
    totalCount02(): number;
    getData(index: number): any;
    addData(index: number, data: string): void;
    pushData(data: string): void;
}
@Entry
@Component
declare struct MyComponent02 {
    private data;
    build(): void;
}
