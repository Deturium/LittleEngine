import { System, Entity } from '@/ECS'
import { Geometry } from '../../components/Geometry'
import { Velocity } from '../../components/Velocity'

export class Kinematics extends System {
  constructor() {
    super()
  }

  init() { }

  queryEntity(entity: Entity) {
    return entity.hasComponent(Velocity) && entity.hasComponent(Geometry)
  }

  update(delta: number) {
    const deltaTime = delta / 60

    this.entities.forEach(e => {
      const velocity = e.getComponent(Velocity)

      if (!velocity.isPin) {
        const geo = e.getComponent(Geometry)
        geo.position[0] += velocity.vx * deltaTime
        geo.position[1] += velocity.vy * deltaTime
      }
    })
  }
}