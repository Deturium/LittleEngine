import { Component, Entity } from '@/ECS'


export class StateSC extends Component {

  pickingEntities: Entity[] = []
  
  renderDirty: boolean = false

  constructor() {
    super()
  }
}
