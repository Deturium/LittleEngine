define(["require", "exports", "../src/ECS"], function (require, exports, ECS_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PositionC {
        constructor(x = 0, y = 0) {
            this.name = "Position";
            this.x = x;
            this.y = y;
        }
    }
    class MoveC {
        constructor(speedX = 0, speedY = 0) {
            this.name = "Move";
            this.speedX = speedX;
            this.speedY = speedY;
            this.isPin = false;
        }
    }
    class BoxCollisionC {
        constructor(width, height) {
            this.name = "BoxCollision";
            this.width = width;
            this.height = height;
        }
    }
    class InputSC {
        constructor() {
            this.name = "Input";
            this.keys = new Set();
            this.mouse = {
                x: 0,
                y: 0
            };
        }
    }
    class PlayerE extends ECS_1.Entity {
        constructor() {
            super();
            this.addComponent(new MoveC(), new BoxCollisionC(10, 10));
        }
    }
    class BulletE extends ECS_1.Entity {
        constructor() {
            super();
            this.addComponent(new MoveC(), new BoxCollisionC(10, 10));
        }
    }
    class InputS extends ECS_1.System {
        constructor() {
            super(...arguments);
            this.name = 'Input';
        }
        update(eList, scMap) {
            const inputGC = scMap.get('input');
        }
    }
    class MoveS extends ECS_1.System {
        constructor() {
            super(...arguments);
            this.name = 'Move';
        }
        update(eList, scMap) {
            for (let e of eList) {
                let pC = e.getComponent('Position');
                let mC = e.getComponent('Move');
                pC.x += mC.speedX;
                pC.y += mC.speedY;
            }
        }
    }
    class CollisionS extends ECS_1.System {
        constructor() {
            super(...arguments);
            this.name = 'Collision';
        }
        update(eList, scMap) {
            for (let e1 of eList) {
                for (let e2 of eList) {
                    let c1 = e1.getComponent('BoxCollision');
                    let c2 = e2.getComponent('BoxCollision');
                }
            }
        }
    }
    const gameWorld = new ECS_1.World();
    gameWorld.addSingletonComponent(new InputSC());
    gameWorld.addSystem(new InputS(), new MoveS());
    gameWorld.addEntity(new PlayerE(), new BulletE());
    gameWorld.start();
    console.log('hello!');
});
