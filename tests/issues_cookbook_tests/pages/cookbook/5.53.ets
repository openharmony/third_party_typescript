class Control {
  state: number = 0
}

interface SelectableControl extends Control {
  select(): void
}



interface Control_right {
  state: number
}

interface SelectableControl_right extends Control_right {
  select(): void
}


export let other = 1;