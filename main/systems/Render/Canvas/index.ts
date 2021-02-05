import { System, Entity, World } from '@/ECS'
import { Geometry, ShapeEnum, ShapeGeometry } from '../../../components/Geometry'
import { Transform } from '../../../components/Transform'
import { vec3, vec2 } from 'gl-matrix'

import { StateSC } from '../../../singletonComponents/State'

export class RenderCanvans extends System {

  ctx: CanvasRenderingContext2D

  constructor() {
    super()
  }

  init(world: World) {
    const canvas = world.canvas

    this.ctx = canvas.getContext('2d')
  }

  queryEntity(entity: Entity) {
    return entity.hasComponent(Geometry)
  }

  update(_: number) {
    const ctx = this.ctx
    const { width, height } = this.world
    ctx.clearRect(0, 0, width, height)


    const stateSC = this.world.getComponent(StateSC)
    // if (!stateSC.renderDirty) {
    //   return
    // }
    // stateSC.renderDirty = true

    const pickingEntity = stateSC.pickingEntities[stateSC.pickingEntities.length - 1]

    this.entities.forEach(e => {
      const geometryC = e.getComponent(Geometry)

      if (geometryC.shape === ShapeEnum.CIRCLE) {
        const { position } = geometryC;
        const { r } = geometryC.getGeometry<ShapeGeometry.Circle>();

        ctx.fillStyle = '#66ccff'

        ctx.beginPath()
        ctx.arc(position[0], position[1], r, 0, 2 * Math.PI)

        if (pickingEntity?.uid === e.uid) {
          ctx.fill()
        } else {
          ctx.stroke()
        }
      }

      if (geometryC.shape === ShapeEnum.RECT) {
        const { position } = geometryC;
        const { width, height } = geometryC.getGeometry<ShapeGeometry.Rect>();

        ctx.beginPath()
        ctx.rect(position[0], position[1], width, height)
        if (pickingEntity?.uid === e.uid) {
          ctx.fill()
        } else {
          ctx.stroke()
        }
      }

      if (geometryC.shape === ShapeEnum.POLYGON) {
        const { position } = geometryC;
        const { points } = geometryC.getGeometry<ShapeGeometry.Polygon>();

        const hasTransform = e.hasComponent(Transform)
        const transformMat = e.getComponent(Transform)?.mat
        const applyTransfrom = (p: vec2) => {
          const out = vec3.create()
          vec3.transformMat3(out, [p[0], p[1], 1], transformMat)
          return [out[0], out[1]]
        }

        const worldPoints = points.map(p => {
          const tp = hasTransform ? applyTransfrom(p) : p
          return [tp[0] + position[0], tp[1] + position[1]] as vec2
        })

        ctx.beginPath()
        const startPoint = worldPoints[0]
        ctx.moveTo(startPoint[0], startPoint[1])
        for (let i = 1; i < worldPoints.length; i++) {
          ctx.lineTo(worldPoints[i][0], worldPoints[i][1])
        }
        ctx.lineTo(startPoint[0], startPoint[1])
        ctx.stroke()
      }
    })

  }
}
