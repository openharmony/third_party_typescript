interface Mover {
  getStatus(): { speed: number }
}
interface Shaker {
  getStatus(): { frequency: number }
}

interface MoverShaker extends Mover, Shaker {
  getStatus(): {
    speed: number
    frequency: number
  }
}

class C implements MoverShaker {
  private speed: number = 0
  private frequency: number = 0

  getStatus() {
    return { speed: this.speed, frequency: this.frequency }
  }
}



class MoveStatus_right {
  public speed: number
  constructor() {
    this.speed = 0
  }
}
interface Mover_right {
  getMoveStatus(): MoveStatus_right
}
class ShakeStatus_right {
  public frequency: number
  constructor() {
    this.frequency = 0
  }
}
interface Shaker_right {
  getShakeStatus(): ShakeStatus_right
}
class MoveAndShakeStatus_right {
  public speed: number
  public frequency: number
  constructor() {
    this.speed = 0
    this.frequency = 0
  }
}
class C_right implements Mover_right, Shaker_right {
  private move_status: MoveStatus_right
  private shake_status: ShakeStatus_right

  constructor() {
    this.move_status = new MoveStatus_right()
    this.shake_status = new ShakeStatus_right()
  }

  public getMoveStatus(): MoveStatus_right {
    return this.move_status
  }

  public getShakeStatus(): ShakeStatus_right {
    return this.shake_status
  }

  public getStatus(): MoveAndShakeStatus_right {
    return {
      speed: this.move_status.speed,
      frequency: this.shake_status.frequency
    }
  }
}


export let other = 1;