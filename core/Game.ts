import {
  World
} from './ECS'

export class Game {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  world: World
  fps: number = 60
  isPause: boolean = false

  private timer: number

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  }

  setWorld(world: World) {
    world.renderContent = this.ctx
    this.world = world
    return this
  }

  setFPS(fps: number) {
    this.fps = fps
    return this
  }

  start() {
    this.timer = Date.now()
    this._loop()
  }

  pause() {
    this.isPause = true
  }

  resume() {
    this.isPause = false
    this._loop()
  }

  _loop() {
    const now = Date.now()

    if (this.isPause)
      return

    if (now - this.timer >= 1000 / this.fps) {
      this.timer = now
      this.world.update()
    }

    window.requestAnimationFrame(this._loop.bind(this))
  }
}
