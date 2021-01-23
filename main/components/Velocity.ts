import { Component } from '@/ECS'

export class Velocity extends Component {

  vx: number
  vy: number
  
  isPin: boolean

  constructor(vx = 0, vy = 0) {
    super()
    this.vx = vx
    this.vy = vy
    this.isPin = false
  }
}