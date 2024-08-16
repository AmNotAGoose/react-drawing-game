import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ReactSketchCanvas } from 'react-sketch-canvas';
import './App.css'

const styles = {
  border: '0.0625rem solid #9c9c9c',
  borderRadius: '0.25rem',
  width: '50vw', 
  height: '50vh',
};

function App() {
  return (
    <>
      <div className='center'>
          <ReactSketchCanvas
          style={styles}
          className="canvas"
          strokeWidth={4}
          strokeColor="blue"
          />
        </div>
    </>
  )
}

export default App
