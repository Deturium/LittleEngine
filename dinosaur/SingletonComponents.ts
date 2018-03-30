import { SingletonComponent } from '../core/ECS'


export class InputSC implements SingletonComponent {
  name = "Input"

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

    this._init(canvas)
  }

  _init(canvas: HTMLCanvasElement) {
    canvas.addEventListener('click', (e) => {
      this.mouse.x = e.offsetX
      this.mouse.y = e.offsetY

      this.isChange = true
    })
  }
}

export class ImagesSC implements SingletonComponent {
  name = "Images"

  // TODO:
}
