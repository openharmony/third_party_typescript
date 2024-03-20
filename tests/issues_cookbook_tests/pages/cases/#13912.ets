import inputEventClient from '@ohos.multimodalInput.inputEventClient'
import { Callback } from '@ohos.base';
try {
    let backKeyDown: inputEventClient.KeyEvent = {
        isPressed: true,
        keyCode: 2,
        keyDownDuration: 0,
        isIntercepted: false
    }
    inputEventClient.injectEvent({KeyEvent: backKeyDown}); // shout NOT report
} catch (error){
    console.log(`Failed to inject KeyEvent, error: ${JSON.stringify(error, [`code`, `message`])}`)
}


export let other = 1;