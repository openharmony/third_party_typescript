import image from '@ohos.multimedia.image'
import resmgr from '@ohos.resourceManager';
async function foo(resourceMgr: resmgr.ResourceManager, name: string) {
    const fileData = await resourceMgr.getRawFileContent(name + '.svg');
    const imageSource = image.createImageSource(fileData.buffer); // should report error: arkts-no-structural-typing, but no error on the previous version
}
class A { }
class B { }
function f1(a: A | B) {
    f2(a)      // should report
    f2(a as A) // should NOT report 
}
function f2(b: A) { }


export let other = 1;