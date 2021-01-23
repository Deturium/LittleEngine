import { Component } from '@/ECS'
import { vec2 } from 'gl-matrix'

export enum ShapeEnum {
  CIRCLE = 'circle',
  // LINE = 'line',
  POLYGON = 'polygon',
}

export class Geometry extends Component {
  shape: ShapeEnum
  position: vec2
  controlPoints: vec2[]

  constructor(shape: ShapeEnum, position: vec2, controlPoints: vec2[]) {
    super()
    this.position = position
    this.shape = shape
    this.controlPoints = controlPoints
  }

  static circle(x: number, y: number, r: number) {
    return new Geometry(
      ShapeEnum.CIRCLE,
      [x, y],
      [[0, 0], [r, 0], [0, r]]
    )
  }

  static rectangle(x: number, y: number, width: number, height: number) {
    return new Geometry(
      ShapeEnum.POLYGON,
      [x, y],
      [[0, 0], [width, 0], [width, height], [0, height]]
    )
  }
}