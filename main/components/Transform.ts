import { Component } from '@/ECS'
import { mat3 } from 'gl-matrix'

export class Transform extends Component {
  mat: mat3

  constructor() {
    super()
    this.mat = mat3.create()
    return this
  }

  translate(x: number, y: number) {
    mat3.translate(this.mat, this.mat, [x, y])
    return this
  }

  scale(x: number, y: number) {
    mat3.scale(this.mat, this.mat, [x, y])
    return this
  }

  rotate(angle: number) {
    mat3.rotate(this.mat, this.mat, angle * 2 * Math.PI / 360)
    return this
  }
}