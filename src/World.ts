import {
  Entity,
  System,
  SingletonComponent,
} from 'ECS'

export class World {

  systemList: System[]
  entitySet: Set<Entity>
  SingletonComponent: Set<SingletonComponent>

  isStop: boolean

  constructor() {
    this.isStop = true
    this.systemList = []
    this.entitySet = new Set()
  }

  update() {
    for (let sys of this.systemList) {
      sys.update(this.entitySet)
    }
  }

  addEntity(...entity: Entity[]) {

  }

  removeEntity(entity: Entity) {

  }

  addSystem(...systems: System[]) {
    for (let sys of this.systemList) {
      this.systemList.push(sys)
    }
  }

  removeSystem(name: string) {
    this.systemList.filter(sys => sys.name !== name)
  }

  start() {
    this.isStop = false
  }

  stop() {
    this.isStop = true
  }
}
