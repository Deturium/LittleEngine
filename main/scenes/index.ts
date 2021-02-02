import { World, Entity } from '@/ECS'

import { Render2D } from '../systems/Render2D'
import { Picking } from '../systems/Picking'
import { Kinematics } from '../systems/Physics/Kinematics'

import { Geometry } from '../components/Geometry'
// import { Transform } from './components/Transform'
// import { Velocity } from './components/Velocity'

import { InputSC } from '../singletonComponents/Input'
import { StateSC } from '../singletonComponents/State'

const canvas: HTMLCanvasElement = document.querySelector('#gameboard')

const world = new World(canvas)

world
  .addComponent(new InputSC())
  .addComponent(new StateSC())

world
  .addSystem(new Kinematics())
  .addSystem(new Picking())

const renderSys = new Render2D()
world
  .addSystem(renderSys)


function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

const CIRCLE_COUNT = 20;
const RECT_COUNT = 10;

for (let i = 0; i < CIRCLE_COUNT; i++) {

  const x = random(0, renderSys.width)
  const y = random(0, renderSys.height)
  const r = random(30, 50)

  world
    .addEntity(
      new Entity()
        .addComponent(
          Geometry.circle(x, y, r)
        )
    )
}


for (let i = 0; i < RECT_COUNT; i++) {

  const x = random(0, renderSys.width)
  const y = random(0, renderSys.height)
  const width = random(40, 70)
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

world.renderTarget.addEventListener('click', (e) => {
  inputSC.mouse.x = e.offsetX
  inputSC.mouse.y = e.offsetY
  inputSC.isChange = true
})


world
  .setFPS(60)
  .start()