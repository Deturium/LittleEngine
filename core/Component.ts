export abstract class Component {

  // 可以搞对象池加速分配，但不确定 js 里的优化效果如何
  // 让组件自己去优化吧
  // _componentPool: T[] = []

  static isComponent: true;

  // abstract create(): Component<T>

  // abstract clone(): Component

  // abstract dispose(): void
}


export interface ComponentConstructor<C extends Component> {

  isComponent: true;

  new(...props: any[]): C;
}



export class ComponentManager {

  private componentMap: Map<string, Component> = new Map()

  hasComponent<C extends Component>(component: ComponentConstructor<C>) {
    return this.componentMap.has(component.name)
  }

  getComponent<C extends Component>(component: ComponentConstructor<C>): C {
    return this.componentMap.get(component.name) as C
  }

  addComponent(component: Component) {
    this.componentMap.set(component.constructor.name, component)
    return this
  }

  removeComponent(name: string) {
    this.componentMap.delete(name)
    return this
  }
}