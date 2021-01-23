import { Component } from '@/ECS'


export class InputSC implements Component {

  keys: Set<String>
  mouse: {
    x: number
    y: number
  }
  isChange: boolean = false

  constructor(canvas: HTMLCanvasElement) {
    this.keys = new Set()
    this.mouse = {
      x: 0,
      y: 0
    }

    this._bindListener(canvas)
  }

  _bindListener(canvas: HTMLCanvasElement) {
    canvas.addEventListener('click', (e) => {
      this.mouse.x = e.offsetX
      this.mouse.y = e.offsetY

      this.isChange = true
    })

    // TODO: 键盘事件
  }
}
