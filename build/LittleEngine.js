define("src/Component", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("src/Entity", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Entity {
        constructor() {
            this.componentMap = new Map();
        }
        getComponent(key) {
            return this.componentMap.get(key);
        }
        addComponent(...components) {
            for (let c of components) {
                this.componentMap.set(c.name, c);
            }
        }
        removeComponent(key) {
            this.componentMap.delete(key);
        }
        remove() {
            this.world.removeEntity(this);
        }
    }
    exports.Entity = Entity;
});
define("src/System", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class System {
        constructor() {
        }
    }
    exports.System = System;
});
define("src/World", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class World {
        constructor() {
            this.isStop = true;
            this.systemList = [];
            this.entitySet = new Set();
            this.singletonComponentMap = new Map();
        }
        addSingletonComponent(...singletonComponents) {
            for (let sc of singletonComponents) {
                this.singletonComponentMap.set(sc.name, sc);
            }
        }
        removeSingletonComponent(name) {
            this.singletonComponentMap.delete(name);
        }
        addEntity(...entities) {
            for (let entity of entities) {
                entity.world = this;
                this.entitySet.add(entity);
            }
        }
        removeEntity(entity) {
            this.entitySet.delete(entity);
        }
        addSystem(...systems) {
            for (let sys of this.systemList) {
                this.systemList.push(sys);
            }
        }
        removeSystem(name) {
            this.systemList.filter(sys => sys.name !== name);
        }
        update() {
            for (let sys of this.systemList) {
                sys.update(this.entitySet, this.singletonComponentMap);
            }
        }
        start() {
            this.isStop = false;
        }
        stop() {
            this.isStop = true;
        }
    }
    exports.World = World;
});
define("src/ECS", ["require", "exports", "src/Entity", "src/System", "src/World"], function (require, exports, Entity_1, System_1, World_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Entity = Entity_1.Entity;
    exports.System = System_1.System;
    exports.World = World_1.World;
});
define("example/mainW", ["require", "exports", "src/ECS"], function (require, exports, ECS_1) {
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
    class InputS extends ECS_1.System {
        constructor() {
            super(...arguments);
            this.name = 'Input';
        }
        update(eSet, scMap) {
            const inputGC = scMap.get('input');
        }
    }
    class MoveS extends ECS_1.System {
        constructor() {
            super(...arguments);
            this.name = 'Move';
        }
        update(eSet, scMap) {
            for (let e of eSet) {
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
        update(eSet, scMap) {
            for (let e1 of eSet) {
                for (let e2 of eSet) {
                    let c1 = e1.getComponent('BoxCollision');
                    let c2 = e2.getComponent('BoxCollision');
                }
            }
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
    const gameWorld = new ECS_1.World();
    gameWorld.addSingletonComponent(new InputSC());
    gameWorld.addSystem(new InputS(), new MoveS());
    gameWorld.addEntity(new PlayerE(), new BulletE());
    gameWorld.start();
});
