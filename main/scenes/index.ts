import { World, Entity } from '@/ECS'

import { RenderCanvans } from '../systems/Render/Canvas'
import { Picking } from '../systems/Picking'
import { Kinematics } from '../systems/Physics/Kinematics'

import { Geometry } from '../components/Geometry'
// import { Transform } from '../components/Transform'
// import { Velocity } from '../components/Velocity'

import { InputSC } from '../singletonComponents/Input'
import { StateSC } from '../singletonComponents/State'

const canvas: HTMLCanvasElement = document.querySelector('#gameboard')

const world = new World(canvas, 1000, 600)

world
  .addComponent(new InputSC())
  .addComponent(new StateSC())

world
  .addSystem(new Kinematics())
  .addSystem(new Picking())
  .addSystem(new RenderCanvans())


function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

const CIRCLE_COUNT = 100;
const RECT_COUNT = 10;

for (let i = 0; i < CIRCLE_COUNT; i++) {

  const x = random(0, world.width)
  const y = random(0, world.height)
  const r = random(20, 50)

  world
    .addEntity(
      new Entity()
        .addComponent(
          Geometry.circle(x, y, r)
        )
    )
}


for (let i = 0; i < RECT_COUNT; i++) {

  const x = random(0, world.width)
  const y = random(0, world.height)
  const width = random(100, 70)
  const height = random(20, 50)

  world
    .addEntity(
      new Entity()
        .addComponent(
          Geometry.rect(x, y, width, height)
        )
    )
}


/**
 * 绑定一些事件交互
 */
const inputSC = world.getComponent(InputSC)

world.canvas.addEventListener('click', (e) => {
  inputSC.mouse.x = e.offsetX
  inputSC.mouse.y = e.offsetY
  inputSC.isChange = true
})


world
  .setFPS(60)
  .start()