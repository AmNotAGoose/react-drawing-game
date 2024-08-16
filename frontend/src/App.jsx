import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ReactSketchCanvas } from 'react-sketch-canvas';
import './App.css'

const styles = {
  border: '0.0625rem solid #9c9c9c',
  borderRadius: '0.25rem',
  width: '100vw', 
  height: '100vh'
};

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <ReactSketchCanvas
          style={styles}
          width="100%"
          height="100%"
          strokeWidth={4}
          strokeColor="blue"
          />
        </div>
    </>
  )
}

export default App
