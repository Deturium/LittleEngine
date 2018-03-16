import {
  Component,
  SingletonComponent,
} from './Component'
import { World } from './World'
import { Entity } from './Entity'

export abstract class System {
  name: string
  registerList: string[] = []
  isStop: boolean

  constructor(...componentName: string[]) {
    this.registComponent(...componentName)
    this.isStop = false
  }

  registComponent(...name: string[]) {
    this.registerList.push(...name)
  }

  _fliterEntity(entitySet: Set<Entity>): Entity[] {
    let retEntityList: Entity[] = []
    for (let entity of entitySet) {
      if (this.registerList.every(name => entity.hasComponent(name)))
        retEntityList.push(entity)
    }
    return retEntityList
  }

  abstract update(
    entityList: Entity[],
    singletonComponentMap: Map<string, SingletonComponent>,
    world: World
  ): void

  stop() {
    this.isStop = true
  }

  start() {
    this.isStop = false
  }
}
