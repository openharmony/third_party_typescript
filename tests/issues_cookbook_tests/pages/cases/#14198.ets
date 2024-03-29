@Entry
@Component struct Index {
    @State message: string = 'Hello World';
    @State m: number = null;
    build() {
        Row() {
            Column() {
                Text(this.message)
                    .fontSize(50)
                    .fontWeight(FontWeight.Bold)
            }
            .width('100%')
        }
        .height('100%')
    }
    test(){
        this.m = null; // should report
    }
}


export let other = 1;