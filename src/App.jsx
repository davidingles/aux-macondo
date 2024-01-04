import { Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Stats, OrbitControls, Environment, useGLTF, Clone } from '@react-three/drei'
import { useControls } from 'leva'

const Models = [

  { title: 'OPCION OSCURA', url: './models/OPCION OSCURA.glb' },
  { title: 'OPCION CLARA', url: './models/OPCION CLARA.glb' }
]

function Model({ url }) {
  const { scene } = useGLTF(url)
  return <Clone object={scene} castShadow receiveShadow />
}

export default function App() {
  const { title } = useControls({
    title: {
      options: Models.map(({ title }) => title)
    }
  })

  return (
    <>
      <div className='box'>
        <Canvas camera={{ position: [0, .5, -.7], near: 0.025 }}>
          {/* <Environment files="./img/workshop_1k.hdr" background blur={.5} /> */}
          {/* <pointLight position={[20, 20, 90]} intensity={5000} decay={2} distance={1} /> */}
          <pointLight position={[10, 10, 0]} intensity={1000} decay={2} />
          <pointLight position={[-10, 10, 0]} intensity={1000} decay={2} />
          <pointLight position={[-10, -10, 10]} intensity={1000} decay={2} />
          <pointLight position={[-10, -10, -10]} intensity={1000} decay={2} />
          <ambientLight intensity={2} />
          <Suspense>
            <Model url={Models[Models.findIndex((m) => m.title === title)].url} />
          </Suspense>
          <OrbitControls autoRotate />
          {/* <Stats /> */}
        </Canvas>
        <span id="info">Tienes seleccionada la caja {title} </span>
      </div>
    </>
  )
}

useGLTF.preload(Models.map(({ url }) => url))

