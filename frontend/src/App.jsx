import { useState, useRef, useEffect } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas';
import './App.css'
import { getPrompt, postDrawing } from './services/api';
import { useAuth } from './AuthProvider';

const styles = {
  width: '500px', 
  height: '500px',
};

function App() {
  const [strokeColor, setStrokeColor] = useState('blue');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [prompt, setPrompt] = useState("");
  const [isEraser, setIsEraser] = useState(false);
  const canvasRef = useRef(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    
    return () => {
      connection.disconnect();
    };
  }, []);

  const toggleEraser = () => {
    setIsEraser(!isEraser);
    canvasRef.current.eraseMode(!isEraser)
  };

  const exportAsImage = async () => {
    const url = await canvasRef.current.exportImage('png')
    postDrawing(url)
  }

  return (
    <body>
        <header>
          <h1>Please draw: {prompt}</h1>
        </header>
        <div className='center'>
          <div>
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
                </select>
              </div>
              <div className="toolbar-item">
                <label>Stroke width: </label>
                <input 
                  type="range" 
                  min="1" 
                  max="50" 
                  value={strokeWidth} 
                  onChange={(e) => setStrokeWidth(e.target.value)} 
                />
                <span>{strokeWidth}px</span>
              </div>
              <div className="toolbar-item">
                <button onClick={toggleEraser}>
                  {isEraser ? 'Erase mode' : 'Draw mode'}
                </button>
              </div>
            </div>
            <ReactSketchCanvas
              ref={canvasRef}
              style={styles}
              className="canvas"
              strokeWidth={strokeWidth}
              eraserWidth={strokeWidth}
              strokeColor={strokeColor}
            />    
            <div className='submission-bar'>
              <div className="submission-bar-item">
                <button>
                  I don't like this prompt
                </button>
              </div>
              <div className="submission-bar-item">
                <button onClick={exportAsImage}>
                  Submit drawing
                </button>
              </div>
            </div>
          </div>
            <div className='leaderboard-panel'>
              <div className='user-box'> 
                {currentUser.displayName}
              </div>
            </div>
        </div>
    </body>
  )
}

export default App
