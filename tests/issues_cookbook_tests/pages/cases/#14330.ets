@AnimatableExtend(Text)
function text() {
    .fontColor(Color.Red)
    .fontColor(this.fontColor) // should report here. 'this' 
    .fontColor($r('sys.color.ohos_id_color activated'))
    .fontColor('#000000')
    .fontColor(0xAFEEEE)
}

function test() {
    if (this.obj == undefined) { // should report here. 'this' 
        console.log("no")
    }
}


export let other = 1;