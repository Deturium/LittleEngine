import {
  World,
  Entity,
  Component,
  SingletonComponent,
} from 'ECS'

export abstract class System {
  name: string

  abstract update(entitySet: Set<Entity>): void
}
