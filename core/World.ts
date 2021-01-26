import {
  ComponentManager,
} from './Component'
import { System } from './System'
import { Entity } from './Entity'

export class World extends ComponentManager {

  fps: number = 60
  isPause: boolean = true
  private timer: number
  renderTarget: HTMLCanvasElement

  systemList: System[]
  entityList: Entity[]


  constructor(canvas: HTMLCanvasElement) {
    super()
    this.renderTarget = canvas

    this.systemList = []
    this.entityList = []
    return this
  }

  addEntity(entity: Entity) {
    // entity.world = this
    this.entityList.push(entity)
    return this
  }

  removeEntity(entity: Entity) {
    const idx = this.entityList.findIndex(e => e.uid === entity.uid)
    this.entityList.splice(idx, 1)
    return this
  }

  addSystem(system: System) {
    system.world = this
    system.init(this)
    this.systemList.push(system)
    return this
  }

  removeSystem(system: System) {
    const idx = this.systemList.findIndex(sys => sys.constructor.name === system.constructor.name)
    this.systemList.splice(idx, 1)
    return this
  }

  private _systemUpdate(delta: number) {
    this.systemList.forEach(sys => {
      if (sys.isPause)
        return

      sys.setQueryEntities(this.entityList)
      sys.update(delta)
    });
  }

  setFPS(fps: number) {
    this.fps = fps
    return this
  }

  start() {
    this.isPause = false
    this.timer = Date.now()
    this._loop()
  }

  pause() {
    this.isPause = true
  }

  /** 渲染一帧 */
  render(currentTime?: number) {
    if (!this.isPause) {
      return
    }

    let delta = 0

    if (currentTime) {
      delta = currentTime - this.timer
      this.timer = currentTime
    }

    this._systemUpdate(delta)
  }


  private _loop() {
    if (this.isPause) {
      return
    }

    const now = Date.now()
    const delta = now - this.timer

    if (delta >= 1000 / this.fps) {
      this.timer = now
      this._systemUpdate(delta)
    }

    window.requestAnimationFrame(this._loop.bind(this))
  }
}
