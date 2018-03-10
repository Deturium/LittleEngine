import {
  Component,
} from 'ECS'

export class Entity {
  componentMap: Map<string, Component>
  // resourceHandle?: any

  constructor() {
    this.componentMap = new Map()
  }

  getComponent(key: string): Component {
    return this.componentMap.get(key)
  }

  addComponent(...components: Component[]) {
    for (let c of components) {
      this.componentMap.set(c.name, c)
    }
  }

  removeComponent(key: string) {
    this.componentMap.delete(key)
  }
}
