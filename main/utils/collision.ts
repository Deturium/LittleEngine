
import { Geometry, ShapeGeometry } from '../components/Geometry'
import { vec2 } from 'gl-matrix'

export function point2Circle(point: readonly [number, number], circle: Geometry) {
  const { r } = circle.getGeometry<ShapeGeometry.Circle>()
  return vec2.squaredDistance(point, circle.position) < r * r
}


export function point2Rect(point: readonly [number, number], rect: Geometry) {
  const { width, height } = rect.getGeometry<ShapeGeometry.Rect>()
  const [x1, y1] = rect.position
  const x2 = x1 + width
  const y2 = y1 + height

  const [x, y] = point

  return x > x1 && x < x2
    && y > y1 && y < y2
}


export function circle2Circle(circle1: Geometry, circle2: Geometry) {
  const p1 = circle1.position
  const p2 = circle1.position

  const r1 = circle1.geometry.r
  const r2 = circle2.geometry.r

  return vec2.squaredDistance(p1, p2) < (r1 + r2) * (r1 + r2)
}