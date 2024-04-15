declare const Param: PropertyDecorator;
declare const Event: PropertyDecorator;
declare const Once: PropertyDecorator;

@Entry
@Component
struct Index16652 {
  @State p1:number;
  p2: number;
  @Param p3: number;
  @Param @Once p4: number;
  @Event p5: number;

  build() {
    Row() {
      Column() {
        Text('123')
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
      }
      .width('100%')
    }
    .height('100%')
  }
}


export let other = 1;