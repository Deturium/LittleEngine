import {
  SingletonComponent,
} from './Component'
import { System } from './System'
import { Entity } from './Entity'

export class World {

  systemList: System[]
  entitySet: Set<Entity>
  singletonComponentMap: Map<string, SingletonComponent>
  isStop: boolean

  constructor() {
    this.systemList = []
    this.entitySet = new Set()
    this.singletonComponentMap = new Map()
    this.isStop = true
  }

  addSingletonComponent(...singletonComponents: SingletonComponent[]) {
    for (let sc of singletonComponents) {
      this.singletonComponentMap.set(sc.name, sc)
    }
  }

  removeSingletonComponent(name: string) {
    this.singletonComponentMap.delete(name)
  }

  addEntity(...entities: Entity[]) {
    for (let entity of entities) {
      entity.world = this
      this.entitySet.add(entity)
    }
  }

  removeEntity(entity: Entity) {
    this.entitySet.delete(entity)
  }

  addSystem(...systems: System[]) {
    this.systemList.push(...systems)
  }

  removeSystem(name: string) {
    this.systemList.splice(
      this.systemList.findIndex(sys => sys.name === name),
      1
    )
  }

  update() {
    for (let sys of this.systemList) {
      sys.update(
        sys._fliterEntity(this.entitySet),
        this.singletonComponentMap,
        this
      )
    }
  }

  start() {
    this.isStop = false
  }

  stop() {
    this.isStop = true
  }
}
