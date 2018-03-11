import {
  Component,
  World,
} from './ECS'

export class Entity {
  type: string

  world: World
  componentMap: Map<string, Component>
  // resourceHandle?: any

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
}
