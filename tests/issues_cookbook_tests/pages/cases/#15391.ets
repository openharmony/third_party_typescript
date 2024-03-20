import buffer from '@ohos.buffer';

function bbb() {
  let array = new Uint8Array(16);
  buffer.from(array); // should not report error: arkts-no-structural-typing, but report
}


export let other = 1;