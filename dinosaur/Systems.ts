import {
  Component,
  SingletonComponent,
  Entity,
  System,
  World
} from '../core/ECS'

import {
  PositionC,
  VelocityC,
  RenderC,
} from './Components'

export class MovementS extends System {
  name = 'Movement'

  update(eSet: Set<Entity>, scMap: Map<string, SingletonComponent>, world: World) {
    const eList = this.filterByComponent(eSet, 'Position', 'Velocity')

    for (let e of eSet) {
      let p = e.getComponent('Position') as PositionC
      let v = e.getComponent('Velocity') as VelocityC

      p.x += v.x
      p.y += v.y
    }
  }
}

export class RenderS extends System {
  name = 'Render'

  update(eSet: Set<Entity>, scMap: Map<string, SingletonComponent>, world: World) {
    const eList = this.filterByComponent(eSet, 'Position', 'Render')
    const ctx = world.getRenderContent()

    for (let e of eSet) {
      let p = e.getComponent('Position') as PositionC

      ctx.fillStyle='#66ccff';
      ctx.fillRect(p.x, p.y, 30, 30);
    }
  }
}

export class InputS extends System {
  name = 'Input'

  update(eSet: Set<Entity>, scMap: Map<string, SingletonComponent>, world: World) {
    const Dinosaur = this.filterByType(eSet, 'Dinosaur')[0]
    const input = scMap.get('Input')

    if (!input.isChange)
      return

    input.isChange = false

    const p = Dinosaur.getComponent('Position') as PositionC
    p.x = input.mouse.x
    p.y = input.mouse.y
  }
}
