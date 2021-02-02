import { System, Entity } from '@/ECS'
import { Geometry, ShapeEnum, ShapeGeometry } from '../../components/Geometry'
import { InputSC } from '../../singletonComponents/Input'
import { StateSC } from '../../singletonComponents/State'

import * as collision from '../../utils/collision'

export class Picking extends System {

  constructor() {
    super()
  }

  init() {

  }

  queryEntity(entity: Entity) {
    return entity.hasComponent(Geometry)
  }

  update(_: number) {
    const inputSC = this.world.getComponent(InputSC)
    const stateSC = this.world.getComponent(StateSC)

    const clickPoint = [inputSC.mouse.x, inputSC.mouse.y] as const

    const pickingEntities = this.entities.filter(e => {
      const geo = e.getComponent(Geometry)

      // 几何拾取
      switch (geo.shape) {
        case ShapeEnum.CIRCLE:
          return collision.point2Circle(clickPoint, geo)

        case ShapeEnum.RECT:
          return collision.point2Rect(clickPoint, geo)

        default:
          return false
      }
    })

    if (pickingEntities) {
      stateSC.pickingEntities = pickingEntities
      // stateSC.renderDirty = true
    }
  }
}