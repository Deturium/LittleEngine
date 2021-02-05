import { System, Entity, World } from '@/ECS'
// import { Geometry, ShapeEnum } from '../../components/Geometry'
// import { Transform } from '../../components/Transform'
// import { vec3, vec2 } from 'gl-matrix'

import REGL from 'regl'

export const glsl = (x: any) => x;

export class RenderLight extends System {

  regl: REGL.Regl

  constructor() {
    super()
  }

  init(world: World) {
    const canvas = world.canvas

    this.regl = REGL(canvas)
  }

  queryEntity(entity: Entity) {
    // return entity.hasComponent(Geometry)
    return false
  }

  getLightRender(scene: string) {

    const { width, height } = this.world

    return this.regl({
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

        #define MAX_STEP 64
        #define EPSILON 0.01
        #define SAMPLE_COUNT 128

        float circleSDF(vec2 coord, vec2 center, float r) {
          float distance = length(coord - center);
          return distance - r;
        }
        
      ` + scene + glsl`

        float rayMarch(vec2 xy, vec2 st) {
          float t = 0.;
          for (int i = 0; i < MAX_STEP; i++) {
            if (t > u_resolution.x && t > u_resolution.y) {
              break;
            }
            vec2 marchRes = scene(xy + st * t);
            if (marchRes.x < EPSILON) {
              return marchRes.y;
            }
            t += marchRes.x;
          }
          return 0.;
        }

        float random(vec2 st) {
          return fract(
            sin(dot(st.xy,vec2(12.9898,78.233)))
            * 43758.5453123
          );
        }
        
        void main() {
          float color = 0.;

          for (int i = 0; i < SAMPLE_COUNT; i++) {

            float r = 2. * 3.14159 * (
              float(i) + random(vec2(gl_FragCoord.x + float(i), gl_FragCoord.y + float(i))) 
            ) / float(SAMPLE_COUNT);

            float sampleCor = rayMarch(
              vec2(gl_FragCoord.x, u_resolution.y - gl_FragCoord.y), 
              vec2(cos(r), sin(r))
            );

            color += sampleCor / float(SAMPLE_COUNT);
          }

          gl_FragColor = vec4(color, color, color, 1.);
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
        u_resolution: [width, height],
        u_color: [1, 1, 1],
      },
      count: 4,
      primitive: 'triangle fan',
    })
  }

  update(_: number) {
    this.getLightRender(glsl`
      vec2 scene(vec2 coord) {
        float r1 = circleSDF(coord, u_resolution * vec2(0.3, 0.3), 60.);
        float r2 = circleSDF(coord, u_resolution * vec2(0.3, 0.7), 40.);
        float r3 = circleSDF(coord, u_resolution * vec2(0.7, 0.5), 50.);

        float stepL = min(min(r1, r2), r3);
        float lCor = 1.;

        if (stepL == r1) {
          lCor = 0.9;
        }
        if (stepL == r2) {
          lCor = 1.8;
        }
        if (stepL == r3) {
          lCor = 0.;
        }

        return vec2(stepL, lCor);
      }
    `)()
  }
}