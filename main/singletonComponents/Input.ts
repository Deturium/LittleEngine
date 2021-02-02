import { Component } from '@/ECS'


export class InputSC extends Component {

  keys: Set<String>
  mouse: {
    x: number
    y: number
  }
  isChange: boolean = false

  constructor() {
    super()

    this.keys = new Set()
    this.mouse = {
      x: 0,
      y: 0
    }
  }
}
