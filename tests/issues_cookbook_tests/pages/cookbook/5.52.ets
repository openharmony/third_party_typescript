interface Document {
  createElement(tagName: any): Element
}

interface Document {
  createElement(tagName: string): HTMLElement
}

interface Document {
  createElement(tagName: number): HTMLDivElement
  createElement(tagName: boolean): HTMLSpanElement
  createElement(tagName: string, value: number): HTMLCanvasElement
}


interface Document_right {
  createElement(tagName: number): HTMLDivElement
  createElement(tagName: boolean): HTMLSpanElement
  createElement(tagName: string, value: number): HTMLCanvasElement
  createElement(tagName: string): HTMLElement
  createElement(tagName: Object): Element
}

interface HTMLDivElement{}
interface HTMLSpanElement{}
interface HTMLCanvasElement{}
interface HTMLElement{}
interface Element{}


export let other = 1;