import {
  World,
  Entity,
  System,
  Component,
  SingletonComponent,
  Game,
} from '../core/ECS'

import {
  InputSC
} from './SingletonComponents'

import {
  DinosaurE
} from './Entities'

import {
  InputS,
  MovementS,
  RenderS,
} from './Systems'
import { RenderC } from './Components';


// gameboard
const canvas = <HTMLCanvasElement>document.getElementById('gameboard')


// construct world
const world = new World()

world.addSingletonComponent(
  new InputSC(canvas)
)

world.addSystem(
  new InputS(),
  new MovementS(),
  new RenderS()
)

world.addEntity(
  new DinosaurE()
)


// start game
const game = new Game(canvas)

game.setWorld(world)
  .setFPS(2)
  .start()


setTimeout(() => {
  // console.log(game)
  game.pause()
}, 1000 * 20)
