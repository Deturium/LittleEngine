import {
  Component,
  Entity
} from '../core/ECS'

import {
  PositionC,
  VelocityC,
  RenderC
} from './Components'


export class DinosaurE extends Entity {
  type = "Dinosaur"

  constructor() {
    super()

    this.addComponent(
      new PositionC(100, 100),
      new VelocityC(10, 0),
      new RenderC()
    )
  }
}
