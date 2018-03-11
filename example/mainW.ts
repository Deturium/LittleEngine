import {
  World,
  Entity,
  System,
  Component,
  SingletonComponent,
} from '../src/ECS'


// COMPONENTS
class PositionC implements Component {
  name = "Position"

  x: number
  y: number

  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
}

class MoveC implements Component {
  name = "Move"

  speedX: number
  speedY: number
  isPin: boolean

  constructor(speedX = 0, speedY = 0) {
    this.speedX = speedX
    this.speedY = speedY
    this.isPin = false
  }
}

class BoxCollisionC implements Component {
  name = "BoxCollision"

  width: number
  height: number

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
  }
}


// GLOBAL COMPONENTS
class InputSC implements SingletonComponent {
  name = "Input"

  keys: Set<String>
  mouse: {
    x: number
    y: number
  }

  constructor() {

    this.keys = new Set()
    this.mouse = {
      x: 0,
      y: 0
    }
  }
}


// ENTITIES
class PlayerE extends Entity {
  constructor() {
    super()
    this.addComponent(
      new MoveC(),
      new BoxCollisionC(10, 10)
    )
  }
}

class BulletE extends Entity {
  constructor() {
    super()
    this.addComponent(
      new MoveC(),
      new BoxCollisionC(10, 10)
    )
  }
}


// SYSTEMS
class InputS extends System {
  name = 'Input'

  update(eList: Entity[], scMap: Map<string, SingletonComponent>) {
    const inputGC = scMap.get('input')
    // TODO:
  }
}

class MoveS extends System {
  name = 'Move'

  update(eList: Entity[], scMap: Map<string, SingletonComponent>) {
    for (let e of eList) {
      let pC = e.getComponent('Position') as PositionC
      let mC = e.getComponent('Move') as MoveC

      pC.x += mC.speedX
      pC.y += mC.speedY
    }
  }
}

class CollisionS extends System {
  name = 'Collision'

  update(eList: Entity[], scMap: Map<string, SingletonComponent>) {
    for (let e1 of eList) {
      for (let e2 of eList) {
        let c1 = e1.getComponent('BoxCollision') as BoxCollisionC
        let c2 = e2.getComponent('BoxCollision') as BoxCollisionC
        // TODO:

      }
    }
  }
}


// WORLD
const gameWorld = new World()

gameWorld.addSingletonComponent(
  new InputSC()
)

gameWorld.addSystem(
  new InputS(),
  new MoveS(),
  // new attackS(),
)

gameWorld.addEntity(
  new PlayerE(),
  new BulletE(),
)

gameWorld.start()
