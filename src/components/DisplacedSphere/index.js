import React, { useMemo, useRef, useEffect } from "react";
import { useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";
import glslify from "glslify";

import vert from "./vert.glsl";
import frag from "./frag.glsl";

import noiseMap from "../../assets/images/tilenoise.png";
import displacementMap from "../../assets/images/tilenoise.png";

export function DisplacedSphere({ position, colors, mouse, i, lightColor }) {
  const sphere = useRef(null);
  const { scene } = useThree();

  const uniforms = useMemo(() => {
    const noiseTexture = new THREE.TextureLoader().load(noiseMap);
    noiseTexture.offset = new THREE.Vector2(0.5, 0.5);
    noiseTexture.repeat.set(16, 16);
    noiseTexture.wrapS = noiseTexture.wrapT = THREE.MirroredRepeatWrapping;

    const displacementTexture = new THREE.TextureLoader().load(displacementMap);

    return {
      uTime: {
        type: "f",
        value: 0,
      },
      uNoiseTexture: {
        type: "t",
        value: noiseTexture,
      },
      uDisplacementTexture: {
        type: "t",
        value: displacementTexture,
      },
      uUvOffset: {
        type: "v2",
        value: new THREE.Vector2(0, 0),
      },
      uNoiseTextureResolution: {
        type: "v2",
        value: new THREE.Vector2(512, 512),
      },
      uDarkestColor: {
        type: "v3",
        value: colors.darkest,
      },
      uMidColor: {
        type: "v3",
        value: colors.mid,
      },
      uLightestColor: {
        type: "v3",
        value: colors.lightest,
      },
      Ka: { value: new THREE.Color(lightColor) },
      Kd: { value: new THREE.Color(lightColor) },
      Ks: { value: new THREE.Vector3(0.1, 0.1, 0.1).normalize() },
      diffuse: { value: new THREE.Color(lightColor) },
      LightIntensity: { value: new THREE.Vector4(0.2, 0.2, 0.2, 0.2) },

      Shininess: { value: 100.0 },
      ...THREE.UniformsLib["fog"],
      ...THREE.UniformsLib["lights"],
    };
  });
  const x = THREE.MathUtils.randFloat(-0.015, 0.015);
  const y = THREE.MathUtils.randFloat(-0.015, 0.015);
  const z = THREE.MathUtils.randFloat(-0.015, 0.015);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime / 5;
    if (sphere.current) {
      sphere.current.rotation.x = t * x;
      sphere.current.rotation.y = t * y;
      sphere.current.rotation.z = t + z;

      sphere.current.material.uniforms["uTime"].value += 0.004;
    }
  });

  return (
    <mesh position={position} ref={sphere}>
      <sphereGeometry args={[THREE.MathUtils.randFloat(4, 7), 30, 30]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={glslify(vert)}
        fragmentShader={glslify(frag)}
        fog
        lights
      />
    </mesh>
  );
}
