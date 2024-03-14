import {EtsClass} from "./attached/#14272_array_attached1";
@Component
struct MapPolylineDemo{ 
    private etsClass!: EtsClass
 
    build() { }

    @Builder
    buildDemoUI(){
        Row(){
            Button("setColors")
                .onClick(() => {
                    // let a: Array<number>=[0....1);
                    this.etsClass.setColors([, 0xff000000, , 0xffffff00]); // no report, but should report
                })
        }
    }
}

export let other = 1;