import { ComponentManager } from './Component'
// import { World } from './World'

let uid = 0

export class Entity extends ComponentManager {
  uid: number

  // world: World // init when Entity push into World

  constructor() {
    super()

    this.uid = uid++

    return this
  }

  serialize() {
  }

  deserialize() {
  }
}
