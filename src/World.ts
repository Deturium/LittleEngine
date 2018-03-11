import {
  Entity,
  System,
  SingletonComponent,
} from './ECS'

export class World {

  systemList: System[]
  entitySet: Set<Entity>
  singletonComponentMap: Map<string, SingletonComponent>

  isStop: boolean

  constructor() {
    this.isStop = true
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
    for (let sys of this.systemList) {
      this.systemList.push(sys)
    }
  }

  removeSystem(name: string) {
    this.systemList.splice(
      this.systemList.findIndex(sys => sys.name === name), 1
    )
  }

  update() {
    for (let sys of this.systemList) {
      sys.update(
        sys.fliterEntity(this.entitySet),
        this.singletonComponentMap
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
