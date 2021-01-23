import { System, Entity, World } from '@/ECS'
import { Geometry, ShapeEnum } from '../components/Geometry'
import { Transform } from '../components/Transform'
import { vec3, vec2 } from 'gl-matrix'

export class Render2D extends System {
  name: 'render-2d'

  width = 1400
  height = 800

  ctx: CanvasRenderingContext2D

  constructor() {
    super()
  }

  init(world: World) {
    const canvas = world.renderTarget
    canvas.width = this.width
    canvas.height = this.height

    this.ctx = canvas.getContext('2d')
  }

  queryEntity(entity: Entity) {
    return entity.hasComponent(Geometry)
  }

  update(_: number) {
    const ctx = this.ctx

    ctx.clearRect(0, 0, this.width, this.height)
    this.entities.forEach(e => {
      const { shape, controlPoints, position } = e.getComponent(Geometry)

      const hasTransform = e.hasComponent(Transform)
      const transformMat = e.getComponent(Transform)?.mat
      const applyTransfrom = (p: vec2) => {
        const out = vec3.create()
        vec3.transformMat3(out, [p[0], p[1], 1], transformMat)
        return [out[0], out[1]]
      }

      const points = controlPoints.map(p => {
        const tp = hasTransform ? applyTransfrom(p) : p
        return [tp[0] + position[0], tp[1] + position[1]] as vec2
      })


      if (shape === ShapeEnum.CIRCLE) {
        const [center, ox, oy] = points
        const major = vec2.distance(center, ox)
        const minor = vec2.distance(center, oy)

        if (major === minor) {
          ctx.beginPath()
          ctx.arc(center[0], center[1], major, 0, 2 * Math.PI)
          ctx.stroke()
        }
        else {
          ctx.beginPath()
          ctx.ellipse(
            center[0], center[1],
            major, minor,
            // 认为长轴默认水平
            vec2.angle([0, 1], [ox[0] - center[0], ox[1] - center[1]]) + Math.PI / 2,
            0, 2 * Math.PI,
            true,
          )
          ctx.stroke()
        }
      }

      if (shape === ShapeEnum.POLYGON) {
        ctx.beginPath()
        const startPoint = points[0]
        ctx.moveTo(startPoint[0], startPoint[1])
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i][0], points[i][1])
        }
        ctx.lineTo(startPoint[0], startPoint[1])
        ctx.stroke()
      }
    })

  }
}