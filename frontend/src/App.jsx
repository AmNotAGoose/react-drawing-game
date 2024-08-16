import { useState } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas';
import './App.css'

const styles = {
  border: '0.0625rem solid #9c9c9c',
  borderRadius: '0.25rem',
  width: '50vw', 
  height: '50vh',
};

function App() {
  const [strokeColor, setStrokeColor] = useState('blue');
  const [strokeWidth, setStrokeWidth] = useState(4);

  return (
    <>
    <body>
        <header>
          Simple drawing game with React
        </header>
        <div className='center'>
            <div className='controls'>
              <label>
                Color: 
              </label>
              <select 
                value={strokeColor} 
                onChange={(e) => setStrokeColor(e.target.value)}
              >
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="black">Black</option>
                <option value="white">White</option>
              </select>
              <br/>
              <label>
                Stroke width:
              </label>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={strokeWidth} 
                onChange={(e) => setStrokeWidth(e.target.value)} 
              />
              {strokeWidth}px
            </div>
            <ReactSketchCanvas
            style={styles}
            className="canvas"
            strokeWidth={strokeWidth}
            strokeColor={strokeColor}
            />
        </div>
    </body>
    </>
  )
}

export default App
