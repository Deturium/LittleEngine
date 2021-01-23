import { World, Entity } from '@/ECS'

import { Render2D } from './systems/Render2D'
import { Physics } from './systems/Physics'
import { Geometry } from './components/Geometry'
import { Transform } from './components/Transform'
import { Velocity } from './components/Velocity'

const canvas: HTMLCanvasElement = document.querySelector('#gameboard')

const world = new World(canvas)
  .setFPS(4)


world
  .addSystem(new Render2D())
  .addSystem(new Physics())


world
  .addEntity(
    new Entity()
      .addComponent(
        Geometry.circle(200, 200, 25)
      )
      .addComponent(
        new Transform()
          .scale(2, 2)
          // .rotate(30)
      )
      // .addComponent(
      //   new Velocity(4, 1)
      // )
  )
  .addEntity(
    new Entity()
      .addComponent(
        Geometry.circle(200, 400, 50)
      )
      .addComponent(
        new Transform()
          .rotate(30)
          .scale(1, 2)
      )
      // .addComponent(
      //   new Velocity(4, 1)
      // )
  )
  .addEntity(
    new Entity()
      .addComponent(
        Geometry.rectangle(400, 200, 100, 50)
      )
      .addComponent(
        new Transform()
          .scale(2, 2)
      )
  )
  .addEntity(
    new Entity()
      .addComponent(
        Geometry.rectangle(400, 400, 100, 50)
      )
      .addComponent(
        new Transform()
          .scale(2, 2)
          .rotate(45)
      )
      // .addComponent(
      //   new Velocity(4, 0)
      // )
  )


world.start()

setTimeout(() => {
  world.pause()
}, 4000)