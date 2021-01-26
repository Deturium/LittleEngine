import { System, Entity, World } from '@/ECS'
import { Geometry, ShapeEnum } from '../../components/Geometry'
import { Transform } from '../../components/Transform'
import { vec3, vec2 } from 'gl-matrix'

import REGL from 'regl'

export const glsl = (x: any) => x;

export class Render3D extends System {

  width = 600
  height = 600

  regl: REGL.Regl

  constructor() {
    super()
  }

  init(world: World) {
    const canvas = world.renderTarget
    canvas.width = this.width
    canvas.height = this.height

    this.regl = REGL(canvas)
  }

  queryEntity(entity: Entity) {
    return entity.hasComponent(Geometry)
  }

  update(_: number) {

    this.regl({
      vert: glsl`
        precision mediump float;
        attribute vec2 position;
        void main () {
          gl_Position = vec4(position, 0, 1);
        }`,
      frag: glsl`
        precision mediump float;
        uniform vec3 u_color;
        uniform vec2 u_resolution;

        #define MAX_STEP 32
        #define EPSILON 0.1

        float sdCircle(vec2 coord, vec2 center, float r) {
          float distance = length(coord - center);
          return distance - r;
        }

        float rayMarch(vec2 xy, vec2 uv) {
          float t = 0.;
          for (int i = 0; i <= MAX_STEP; i++) {
            if (t > u_resolution.x && t > u_resolution.y) {
              break;
            }
            float d = sdCircle(xy + uv * t, u_resolution * vec2(0.5), 50.);
            if (d < EPSILON) {
              return 1.;
            }
            t += d;
          }
          return 0.;
        }

        float random(vec2 st) {
          return fract(
              sin(dot(
                st.xy,
                vec2(12.9898,78.233)
              ))
              * 43758.5453123
            );
        }

        void main() {
          float r1 = random(gl_FragCoord.xy);
          float r2 = random(vec2(r1, r1 * 10.));

          float col = rayMarch(
            vec2(gl_FragCoord.x, u_resolution.y - gl_FragCoord.y), 
            normalize(vec2(r1, r2))
          );
          gl_FragColor = vec4(col, col, col, 1.);
        }`,

      attributes: {
        position: [
          [-1, 1],
          [1, 1],
          [1, -1],
          [-1, -1],
        ]
      },
      uniforms: {
        u_resolution: [this.width, this.height],
        u_color: [1, 1, 1],
      },
      count: 4,
      primitive: 'triangle fan',
    })()
  }
}