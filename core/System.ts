import { World } from './World'
import { Entity } from './Entity'

export abstract class System {

  world: World

  name: string
  isPause: boolean = false

  protected entities: Entity[]

  constructor() {
  }

  pause() {
    this.isPause = true
  }

  resume() {
    this.isPause = false
  }

  setQueryEntities(allEntities: Entity[]) {
    this.entities = allEntities.filter(e => this.queryEntity(e))
  }

  abstract init(world: World): void

  abstract queryEntity(entity: Entity): boolean

  abstract update(delta: number): void
}
