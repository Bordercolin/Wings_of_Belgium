import React from "react";
import { Model } from "../../Scene.jsx";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Html, Box } from "@react-three/drei";
import map from "./map.module.css";
import { SpriteMaterial, TextureLoader, Sprite } from "three";
import marker from "./marker.png";
import { useNavigate } from "react-router-dom";

function Button({ position, onClick, label, link }) {
  const texture = useLoader(TextureLoader, marker);
  const spriteMaterial = new SpriteMaterial({ map: texture });
  return (
    <group position={position}>
      <sprite scale={0.5} material={spriteMaterial} onClick={onClick} />
      <Html position={[0, 0, 1]}>
        <div>{label}</div>
      </Html>
    </group>
  );
}

export default function WorldMap({
  zoomAllowed,
  dragAllowed,
  showButtons = true,
}) {
  const navigate = useNavigate();
  return (
    <>
      <div className={map.fullScreen}>
        <Canvas camera={{ fov: 20, position: [0, 0, 15] }}>
          <ambientLight intensity={5} />
          <OrbitControls
            enableZoom={zoomAllowed}
            enableRotate={dragAllowed}
            autoRotate
            autoRotateSpeed={1.0}
          />
          <Model scale={1} />
          {showButtons && (
            <>
              <Button
                position={[0, 0, 1.2]}
                onClick={() =>
                  navigate("/mission-popup/clwkl0k7w0e0a07w44j4uc6mh")
                }
              />

              <Button
                position={[-1, 0.6, 0.2]}
                onClick={() =>
                  navigate("/mission-popup/clwkmx12q3f4y07w9qolsf1g9")
                }
              />
            </>
          )}
        </Canvas>
      </div>
    </>
  );
}
