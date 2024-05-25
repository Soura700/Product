import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';

interface BoxProps {
  img: string;
}

const Box: React.FC<BoxProps> = ({ img }) => {
  const texture = useTexture(img);

  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

interface ThreeDSceneProps {
  images: string[];
}

const ThreeDScene: React.FC<ThreeDSceneProps> = ({ images }) => {
  return (
    <Canvas style={{ height: '500px', width: '100%' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        {images.map((img, index) => (
          <Box key={index} img={img} />
        ))}
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeDScene;