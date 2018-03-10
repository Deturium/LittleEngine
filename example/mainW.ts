import {
  World,
  Entity,
  System,
  Component,
  SingletonComponent,
} from '../src/ECS'


// COMPONENTS
class MoveC implements Component {
  name: string

  x: number
  y: number
  speedX: number
  speedY: number
  ispin: boolean

  constructor() {

  }

  move() {
    if (!this.ispin)
      return
    this.x += this.speedX
    this.y += this.speedY
  }

  pin() {
    this.ispin = false
  }

  unpin() {
    this.ispin = true
  }
}

class BoxCollisionC implements Component {
  name: string

  width: number
  height: number

  constructor() {

  }

  testCollosion(withBox: BoxCollisionC): boolean {
    // TODO:
    return false
  }
}


// GLOBAL COMPONENTS
class InputGC implements SingletonComponent {
  keys: Set<String>
  mouse: {
    x: number
    y: number
  }
}




// SYSTEMS
class InputS extends System {
  constructor() {
    super()
    this.name = 'InputS'
  }

  update(entitySet: Set<Entity>) {
    const inputGC = this.getSingletonComponent()
  }
}

class MoveS extends System {
  constructor() {
    super()
    this.name = 'MoveS'
  }

  update(entitySet: Set<Entity>) {
    for (let e of entitySet) {
      let c = e.getComponent('Move')
      c && c.move()
    }
  }
}

class CollisionS extends System {
  constructor() {
    super()
  }

  update(entitySet: Set<Entity>) {
    for (let e1 of entitySet) {
      for (let e2 of entitySet) {
        let c1 = e1.getComponent('collision') as BoxCollisionC
        let c2 = e2.getComponent('collision') as BoxCollisionC

        if (c1.testCollosion(c2)) {
          this.removeEntity(e1)
        }
      }
    }
  }
}


// ENTITIES
class PlayerE extends Entity {
  constructor() {
    super()
    this.addComponent(
      new MoveC(),
      new BoxCollisionC()
    )
  }
}

class BulletE extends Entity {
  constructor() {
    super()
    this.addComponent(
      new MoveC(),
      new BoxCollisionC()
    )
  }
}


// WORLD
const gameWorld = new World()

gameWorld.addSingletonComponent(
  new InputC()
)

gameWorld.addSystem(
  new InputS(),
  new MoveS(),
  new attackS(),
)

gameWorld.addEntity(
  new PlayerE(),
  new BulletE(),
)

gameWorld.start()
