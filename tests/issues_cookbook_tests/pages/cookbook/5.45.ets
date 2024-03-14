function drawText({ text = '', location: [x, y] = [0, 0], bold = false }) {
  text;
  x;
  y;
  bold;
}

drawText({ text: 'Hello, world!', location: [100, 50], bold: true })


function drawText_right(text: String, location: number[], bold: boolean) {
  let x = location[0];
  let y = location[1];
  text;
  x;
  y;
  bold;
}

function main() {
  drawText_right('Hello, world!', [100, 50], true);
}


export let other = 1;