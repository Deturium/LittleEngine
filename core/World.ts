import {
  SingletonComponent,
} from './Component'
import { System } from './System'
import { Entity } from './Entity'

export class World {

  systemList: System[]
  entitySet: Set<Entity>
  singletonComponentMap: Map<string, SingletonComponent>
  renderContent: CanvasRenderingContext2D

  constructor() {
    this.systemList = []
    this.entitySet = new Set()
    this.singletonComponentMap = new Map()
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
    this.systemList.splice(this.systemList.findIndex(sys => sys.name === name), 1)
  }

  update() {
    for (let sys of this.systemList) {
      if (sys.isPause)
        return
      sys.update(this.entitySet, this.singletonComponentMap, this)
    }
  }

  getRenderContent() {
    return this.renderContent
  }
}
