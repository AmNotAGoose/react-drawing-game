import { useState } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas';
import './App.css'

const styles = {
  width: '500px', 
  height: '500px',
};

function App() {
  const [strokeColor, setStrokeColor] = useState('blue');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [prompt, setPrompt] = useState("");

  return (
    <>
    <body>
        <header>
          Please draw: {prompt}
        </header>
        <div className='center'>
          <div className="toolbar">
            <div className="toolbar-item">
              <label>Color: </label>
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
            </div>
            <div className="toolbar-item">
              <label>Stroke width: </label>
              <input 
                type="range" 
                min="1" 
                max="20" 
                value={strokeWidth} 
                onChange={(e) => setStrokeWidth(e.target.value)} 
              />
              <span>{strokeWidth}px</span>
            </div>
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
