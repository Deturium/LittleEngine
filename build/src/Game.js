define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Game {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.fps = 60;
        }
        setWorld(world) {
            this.world = world;
        }
        setFPS(fps) {
            this.fps = fps;
        }
        start() {
            this.timer = Date.now();
            const loopFunc = this._loop.bind(this);
            loopFunc(loopFunc);
        }
        _loop(loopFunc) {
            const now = Date.now();
            if (now - this.timer >= 1000 / this.fps) {
                this.world.update();
            }
            requestAnimationFrame(loopFunc);
        }
    }
});
