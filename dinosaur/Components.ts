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

  x: number
  y: number
  isPin: boolean

  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
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
