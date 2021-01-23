import { ComponentManager } from './Component'
// import { World } from './World'

export class Entity extends ComponentManager {
  uid: number

  // world: World // init when Entity push into World

  constructor() {
    super()
    return this
  }

  serialize() {
  }

  deserialize() {
  }
}
