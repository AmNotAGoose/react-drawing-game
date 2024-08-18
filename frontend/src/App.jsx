import { useState, useRef, useEffect } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas';
import './App.css'
import { getPrompt, postDrawing, getPoints, getLeaderboard } from './services/api';
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
  const { currentUser, logout } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [userPoints, setUserPoints] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {

        await handleGetPrompt();
        await handleGetPoints();
        await createLeaderboard();
      } catch (e) {
        console.error(e);
      }
    };
  
    init();
  }, []);

  const toggleEraser = () => {
    setIsEraser(!isEraser);
    canvasRef.current.eraseMode(!isEraser)
  };

  const exportAsImage = async () => {
    const url = await canvasRef.current.exportImage('png')
    await postDrawing(currentUser.accessToken, {user: currentUser.uid, drawing: url, prompt: prompt}).then(() => {
      window.location.reload(); 
    })
  }

  const handleGetPrompt = async () => {
    getPrompt(currentUser.accessToken).then((p) => {
      setPrompt(p['prompt'])
    })
  }

  const handleGetPoints = async () => {
    getPoints(currentUser.accessToken, currentUser.uid).then((p) => {
      setUserPoints(p)
    })
  }

  const createLeaderboard = async () => {
    await getLeaderboard(currentUser.accessToken).then((p) => {
      setLeaderboard(p)
      console.log(leaderboard)
    })
  }

  return (
    <div>
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
                <button onClick={handleGetPrompt}>
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
              <div className='leaderboard-container'> 
                {leaderboard.map((e, i) => (
                  <div key={i} className="leaderboard-entry">
                    <div className="leaderboard-rank">{i + 1}.</div>
                    {e.name}
                    <div className="leaderboard-points">{e.points}</div>
                  </div>
                ))}
              </div>
              <div className='profile-box'> 
                <div className='user-box'>
                  <div>
                    {currentUser.displayName} &nbsp;
                    {userPoints}
                  </div>
                  <button onClick={logout}>
                    Log out
                  </button>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default App
