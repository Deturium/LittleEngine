define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class System {
        constructor(...componentName) {
            this.registerList = [];
            this.registComponent(...componentName);
            this.isStop = false;
        }
        registComponent(...name) {
            this.registerList.push(...name);
        }
        _fliterEntity(entitySet) {
            let retEntityList = [];
            for (let entity of entitySet) {
                if (this.registerList.every(name => entity.hasComponent(name)))
                    retEntityList.push(entity);
            }
            return retEntityList;
        }
        stop() {
            this.isStop = true;
        }
        start() {
            this.isStop = false;
        }
    }
    exports.System = System;
});
