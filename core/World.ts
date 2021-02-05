import {
  ComponentManager,
} from './Component'
import { System } from './System'
import { Entity } from './Entity'

export class World extends ComponentManager {

  /** 刷新率 */
  fps: number = 60
  /** 是否暂停 */
  isPause: boolean = true

  /** 内部计时器 */
  private timer: number

  /** 画布 */
  canvas: HTMLCanvasElement
  /** 画布宽度 */
  width: number
  /** 画布高度 */
  height: number

  /** 设备像素比 */
  dpr: number

  /** 系统 */
  systemList: System[]
  /** 实体 */
  entityList: Entity[]


  constructor(canvas: HTMLCanvasElement, width: number, height: number, dpr?: number) {
    super()

    canvas.width = width
    canvas.height = height

    this.canvas = canvas
    this.width = width
    this.height = height
    this.dpr = dpr ?? 1

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


  private _loop = () => {
    if (this.isPause) {
      return
    }

    const now = Date.now()
    const delta = now - this.timer

    if (delta >= 1000 / this.fps) {
      this.timer = now
      this._systemUpdate(delta)
    }

    window.requestAnimationFrame(this._loop)
  }
}
