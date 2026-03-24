"use client";

import { useGLTF } from "@react-three/drei";

function BottleMesh({ name, position, rotation, scale, nodes, materials }) {
  return (
    <group name={name} position={position} rotation={rotation} scale={scale}>
      <mesh
        name="Cylinder008"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder008.geometry}
        material={materials["Material.004"]}
      />
      <mesh
        name="Cylinder008_1"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder008_1.geometry}
        material={materials["Material.001"]}
      />
      <mesh
        name="Cylinder008_2"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder008_2.geometry}
        material={materials["Material.003"]}
      />
      <mesh
        name="Cylinder008_3"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder008_3.geometry}
        material={materials.Material}
      />
    </group>
  );
}

const MODEL_URL = "/models/thermos4.glb";
const DRACO_DECODER_PATH = "https://www.gstatic.com/draco/versioned/decoders/1.5.5/";

export function ModelScene({ isHero = false, batteryRef, ...props }) {
  const { nodes, materials } = useGLTF(MODEL_URL, DRACO_DECODER_PATH);

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <BottleMesh
          name="Bottle"
          position={[-0.00137984, 0.58220369, -1.0381211]}
          scale={0.07935338}
          nodes={nodes}
          materials={materials}
        />
        <mesh
          name="Plane"
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={materials["Material.002"]}
          material-roughness={0}
          material-metalness={1}
          scale={9}
        />
        <BottleMesh
          name="Bottle001"
          position={[-1.16934204, 0.19698095, -1.35965967]}
          rotation={[1e-7, -0.79916248, -Math.PI / 2]}
          scale={0.07935338}
          nodes={nodes}
          materials={materials}
        />
        <BottleMesh
          name="Bottle002"
          position={[0.98918366, 0.16850382, -1.61418855]}
          rotation={[-0.35650908, 0.15330252, 1.62745912]}
          scale={[0.07935338, 0.07935338, 0.07935339]}
          nodes={nodes}
          materials={materials}
        />
        <BottleMesh
          name="Bottle003"
          position={[-0.84459889, 0.58220369, -2.90447664]}
          scale={0.07935338}
          nodes={nodes}
          materials={materials}
        />
        <BottleMesh
          name="Bottle004"
          position={[1.07385683, 0.58220369, -4.14420033]}
          rotation={[0, 0.41689743, 0]}
          scale={0.07935338}
          nodes={nodes}
          materials={materials}
        />
        <group
          name="Battery"
          ref={batteryRef}
          scale={[1, 0, 1]}
          rotation={[Math.PI / 2, 0, 0]}
          visible={true}
        >
          <mesh
            name="Cube"
            castShadow
            receiveShadow
            geometry={nodes.Cube.geometry}
            material={materials["Material.006"]}
          />
          <mesh
            name="Cube_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube_1.geometry}
            material={materials["Material.005"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_URL, DRACO_DECODER_PATH);
