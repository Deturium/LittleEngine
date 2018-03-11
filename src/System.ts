import {
  World,
  Entity,
  Component,
  SingletonComponent,
} from './ECS'

export abstract class System {
  name: string
  registerList: string[] = []

  constructor() {
  }

  registComponent(...name: string[]) {
    this.registerList.push(...name)
  }

  fliterEntity(entitySet: Set<Entity>): Entity[] {
    let retEntityList: Entity[] = []
    for(let entity of entitySet) {
      if (this.registerList.every(
          name => entity.hasComponent(name)
        )
      )
        retEntityList.push(entity)
    }
    return retEntityList
  }

  abstract update(
    entityList: Entity[],
    singletonComponentMap: Map<string, SingletonComponent>
  ): void
}
