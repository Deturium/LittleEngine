import { Component } from '@/ECS'
import { vec2 } from 'gl-matrix'

export enum ShapeEnum {
  CIRCLE = 'circle',
  RECT = 'rect',
  LINE = 'line',
  POLYGON = 'polygon',
}

export namespace ShapeGeometry {
  export interface Circle {
    r: number
  }

  export interface Rect {
    width: number
    height: number
  }

  export interface Polygon {
    points: vec2[]
  }
}

export class Geometry extends Component {
  shape: ShapeEnum

  /** 位置信息 */
  position: vec2

  /** 跟 shape 有关的几何信息 */
  geometry: any

  getGeometry<T>() {
    return this.geometry as T
  }

  constructor(shape: ShapeEnum, position: vec2, geometry: any) {
    super()
    this.position = position
    this.shape = shape
    this.geometry = geometry
  }

  static circle(x: number, y: number, r: number) {
    return new Geometry(
      ShapeEnum.CIRCLE,
      [x, y],
      { r }
    )
  }

  static rect(x: number, y: number, width: number, height: number) {
    return new Geometry(
      ShapeEnum.RECT,
      [x, y],
      { width, height }
    )
  }

  static polygon(x: number, y: number, points: vec2[]) {
    return new Geometry(
      ShapeEnum.POLYGON,
      [x, y],
      { points }
    )
  }
}