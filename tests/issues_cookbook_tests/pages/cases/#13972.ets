@Entry
@Component
struct Index {
  @State message: string = 'Hello World'
  
  build(){
    Row() {
      Column(){
        Text(this.message)
          .fontSize(50)
          // should report
          // @ts-ignore
          .fontWeight(FontWeight.Bold)
      }
      .width('100%')
    }
    .height('100%')
  }
}


export let other = 1;
