import { System, Entity } from '@/ECS'
import { Transform } from '../../components/Transform'
import { Velocity } from '../../components/Velocity'

export class Kinematics extends System {

  constructor() {
    super()
  }

  init() {

  }

  queryEntity(entity: Entity) {
    return entity.hasComponent(Velocity) && entity.hasComponent(Transform)
  }

  update(_: number) {

    this.entities.forEach(e => {
      const velocity = e.getComponent(Velocity)

      if (!velocity.isPin) {
        const transform = e.getComponent(Transform)
        transform.translate(velocity.vx, velocity.vy)
      }
    })
  }
}