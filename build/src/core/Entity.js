define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Entity {
        constructor() {
            this.componentMap = new Map();
        }
        hasComponent(name) {
            return this.componentMap.has(name);
        }
        getComponent(name) {
            return this.componentMap.get(name);
        }
        addComponent(...components) {
            for (let c of components) {
                this.componentMap.set(c.name, c);
            }
        }
        removeComponent(name) {
            this.componentMap.delete(name);
        }
        remove() {
            this.world.removeEntity(this);
        }
        serialize() {
        }
        deserialize() {
        }
    }
    exports.Entity = Entity;
});
