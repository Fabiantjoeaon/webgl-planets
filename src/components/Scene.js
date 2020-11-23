import React, { useRef, Suspense, useCallback, useState } from "react";
import { Canvas, useThree, useFrame } from "react-three-fiber";
import styled from "styled-components";
import * as THREE from "three";
import {
  OverrideMaterialManager,
  BlendFunction,
  BlurPass,
  Resizer,
  KernelSize,
} from "postprocessing";
import {
  EffectComposer,
  ChromaticAberration,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
  SSAO,
  Pixelation,
  HueSaturation,
  ToneMapping,
} from "@react-three/postprocessing";

import Particles from "./Particles";
import { DisplacedSphere } from "./DisplacedSphere";

OverrideMaterialManager.workaroundEnabled = true;
function InnerScene({ mouse }) {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.x += (mouse.current[0] - camera.position.x) * 0.0001;
    camera.position.y += (-mouse.current[1] - camera.position.y) * 0.0001;

    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.updateProjectionMatrix();
  });
  const z = 10;
  const lightColor = "#F9627D";
  return (
    <>
      <Suspense fallback={null}>
        <Particles lightColor={lightColor} mouse={mouse} count={5000} />
        <fog attach="fog" args={["#111D4A", 0, 120]} />
        <DisplacedSphere
          i={1}
          mouse={mouse}
          colors={{
            darkest: new THREE.Color("#111D4A"),
            mid: new THREE.Color("#1BE7FF"),
            lightest: new THREE.Color("#FF4D80"),
          }}
          lightColor={lightColor}
          position={[25, 2, z]}
        />
        <DisplacedSphere
          i={2}
          colors={{
            darkest: new THREE.Color("#2E294E"),
            mid: new THREE.Color("#8661C1"),
            lightest: new THREE.Color("#AA5042"),
          }}
          lightColor={lightColor}
          mouse={mouse}
          position={[-4, -5, z]}
        />
        <DisplacedSphere
          i={2}
          colors={{
            darkest: new THREE.Color("#0F1A20"),
            mid: new THREE.Color("#5EF38C"),
            lightest: new THREE.Color("#9AE5E6"),
          }}
          lightColor={lightColor}
          mouse={mouse}
          position={[-30, 1, z]}
        />
        <DisplacedSphere
          i={2}
          mouse={mouse}
          colors={{
            darkest: new THREE.Color("#000"),
            mid: new THREE.Color("#000"),
            lightest: new THREE.Color("#fff"),
          }}
          lightColor={lightColor}
          position={[10, 2, z - 40]}
        />
        <DisplacedSphere
          i={1}
          mouse={mouse}
          colors={{
            darkest: new THREE.Color("#8A89C0"),
            mid: new THREE.Color("#FF6B6B"),
            lightest: new THREE.Color("#FECDAA"),
          }}
          lightColor={lightColor}
          position={[-25, 20, z - 30]}
        />
        <DisplacedSphere
          i={2}
          mouse={mouse}
          colors={{
            darkest: new THREE.Color("#C57B57"),
            mid: new THREE.Color("#DD7230"),
            lightest: new THREE.Color("#F4C95D"),
          }}
          lightColor={lightColor}
          position={[30, -15, z - 30]}
        />
        {/* 
        <EffectComposer>
          <DepthOfField
            focusDistance={0}
            focalLength={0.4}
            bokehScale={2}
            height={1000}
          />

          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer> */}
      </Suspense>
    </>
  );
}

export function Scene() {
  const [hovered, hover] = useState(false);

  const mouse = useRef([0, 0]);
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  );

  return (
    <>
      <StyledCanvas
        camera={{ fov: 1000, position: [0, 0, 40] }}
        onMouseMove={onMouseMove}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#000"));
        }}
        gl={{
          powerPreference: "high-performance",
          alpha: true,
          antialias: false,
          stencil: true,
          depth: true,
        }}
      >
        <InnerScene mouse={mouse}></InnerScene>
      </StyledCanvas>
    </>
  );
}

const StyledCanvas = styled(Canvas)`
  position: fixed !important;
  top: 0;

  left: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
`;

//https://twitter.com/Sam_Makes_Games/status/1309983076714385408
//https://www.iquilezles.org/www/articles/warp/warp.htm
//https://www.shadertoy.com/view/lsl3RH
