import { Component } from '../core/ECS'


export class PositionC implements Component {
  name = "Position"

  x: number
  y: number

  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
}

export class VelocityC implements Component {
  name = "Velocity"

  speedX: number
  speedY: number
  isPin: boolean

  constructor(speedX = 0, speedY = 0) {
    this.speedX = speedX
    this.speedY = speedY
    this.isPin = false
  }
}

export class RenderC implements Component {
  name = "Render"

  x: number
  y: number

  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
}
