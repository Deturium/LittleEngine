import { Component } from './Component'
import { World } from './World'

export class Entity {
  type: string

  world: World // init when Entity push into World
  componentMap: Map<string, Component>

  constructor() {
    this.componentMap = new Map()
  }

  hasComponent(name: string): boolean {
    return this.componentMap.has(name)
  }

  getComponent(name: string): Component {
    return this.componentMap.get(name)
  }

  addComponent(...components: Component[]) {
    for (let c of components) {
      this.componentMap.set(c.name, c)
    }
  }

  removeComponent(name: string) {
    this.componentMap.delete(name)
  }

  remove() {
    this.world.removeEntity(this)
  }

  serialize() {
  }

  deserialize() {
  }
}
