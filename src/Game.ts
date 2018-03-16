import {
  World
} from './ECS'

class Game {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  world: World
  fps: number

  private timer: number

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    this.fps = 60
  }

  setWorld(world: World) {
    this.world = world
  }

  setFPS(fps: number) {
    this.fps = fps
  }

  start() {
    this.timer = Date.now()
    const loopFunc = this._loop.bind(this)
    loopFunc(loopFunc)
  }

  _loop(loopFunc: FrameRequestCallback) {
    const now = Date.now()
    if (now - this.timer >= 1000 / this.fps) {
      this.world.update()
    }

    requestAnimationFrame(loopFunc)
  }
}
