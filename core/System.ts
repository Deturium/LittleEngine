import {
  Component,
  SingletonComponent,
} from './Component'
import { World } from './World'
import { Entity } from './Entity'

export abstract class System {
  name: string
  isPause: boolean = false

  constructor() {
  }

  filterByFunc(entitySet: Set<Entity>, filterFunc: (entity: Entity) => boolean): Entity[] {
    const retEntityList: Entity[] = []
    for (let entity of entitySet) {
      if (filterFunc(entity))
        retEntityList.push(entity)
    }
    return retEntityList
  }

  filterByComponent(entitySet: Set<Entity>, ...componentNames: string[]): Entity[] {
    return this.filterByFunc(
      entitySet,
      entity => componentNames.every(name => entity.hasComponent(name))
    )
  }

  filterByType(entitySet: Set<Entity>, type: string): Entity[] {
    return this.filterByFunc(entitySet, entity => entity.type === type)
  }

  abstract update(
    entitySet: Set<Entity>,
    singletonComponentMap: Map<string, SingletonComponent>,
    world: World
  ): void

  pause() {
    this.isPause = true
  }

  resume() {
    this.isPause = false
  }
}
