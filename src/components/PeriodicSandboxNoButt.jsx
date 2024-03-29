import React, { Suspense, useState, useRef } from 'react';
import { Canvas} from '@react-three/fiber';
import { Stats, Stars, useCursor, OrbitControls} from '@react-three/drei';
import { useSpring, animated} from "@react-spring/three";
import { BoxGeometry } from "three";
import { elements, textures } from './data/Elements';
import IsotopeStack from "./Utilities+Helpers/IsotopeStack";

const tile = new BoxGeometry(1, 1, 0.5);

const ElementTile = ( {element, material} ) => {
    const ElementTile = useRef();
    const [active, setActive] = useState(false);
    const [hover, setHover] = useState(false);
    useCursor(hover);
    const isotopeMap = element.isotopes;
    const { scale } = useSpring({
        scale: active || hover ? 1.5 : 1,
        config: { tension: 200, friction: 12, mass: 1, clamp: false, precision: 0.001, velocity: 0.01 }
    });
    // const { offsetZ } = useSpring({
    //     offsetZ: active ? [0,0,0] : [0,0,-0.25],
    //     config: { tension: 1000, friction: 50, mass: 1, clamp: false, precision: 0.001, velocity: 0.01 }
    // });
    // console.log(isotopeMap)

    return (
        <>
            <animated.mesh
            ref={ElementTile}
            onPointerOver={(e) => {e.stopPropagation(); setHover(true)}}
            onPointerOut={(e) => {e.stopPropagation(); setHover(false)}}
            onPointerDown={(e) => {e.stopPropagation(); setActive(!active)}}
            geometry={tile}
            material={material}
            scale={scale}
            // position={offsetZ}
            />
            <IsotopeStack data={isotopeMap} active={active}/>
        </>)
}

function PeriodicTable( {textures, elements} ) {
    const Table = useRef();
    return (
        <mesh>
            {elements.map((element, index) =>
            <group ref={Table} position={[(element.x - 9.5) * 1.55, (element.y - 5.75) * 1.55, 0]} key={element.id}>
                <ElementTile element={elements[index]} material={textures[index]} />
            </group>
            )}
        </mesh>
    )
}

export default function PeriodicSandbox( ) {
    return(
        <div className='canvaswrapper'>
            <Canvas camera={{ fov: 30, position:[0,0,30] }}>
                <OrbitControls
                    minPolarAngle={Math.PI / -1}
                    maxPolarAngle={Math.PI / 1}
                    minAzimuthAngle = {Math.PI / -2}
                    maxAzimuthAngle = {Math.PI / 2}
                    minDistance = {10}
                    maxDistance = {60}
                />

                <ambientLight intensity={0.25}/>
                <pointLight position={[0, -20, 100]} lookAt={[0,0,0]} intensity={1}/>

                <Suspense fallback={<></>}>
                    <PeriodicTable textures={textures} elements={elements} />
                </Suspense>

                <Stars/>
                {/* <Stats showPanel={0}/> */}
            </Canvas>
        </div>
    )
}

