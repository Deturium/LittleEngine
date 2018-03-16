define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class World {
        constructor() {
            this.systemList = [];
            this.entitySet = new Set();
            this.singletonComponentMap = new Map();
            this.isStop = true;
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
            this.systemList.push(...systems);
        }
        removeSystem(name) {
            this.systemList.splice(this.systemList.findIndex(sys => sys.name === name), 1);
        }
        update() {
            for (let sys of this.systemList) {
                sys.update(sys._fliterEntity(this.entitySet), this.singletonComponentMap, this);
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
