uniform float uTime;
uniform sampler2D uDisplacementTexture;

varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;

#include <fog_pars_vertex>

void main() {
  vUv = uv;
  vPos = (modelMatrix * vec4(position, 1.0 )).xyz;
  vNormal = normalMatrix * normal;

  	#include <begin_vertex>
        #include <project_vertex>
        #include <fog_vertex>

  vec4 noiseTexture = texture2D(uDisplacementTexture, uv);
  vec3 newPos = mix(position.xyz, position.xyz + normal * .1, noiseTexture.r);
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}