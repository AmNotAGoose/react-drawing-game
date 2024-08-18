import React from 'react';
import './FrontPage.css';
import { useNavigate } from 'react-router-dom';

function FrontPage() {
  const navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate("/login");
  }

    return (
        <div className="front-page">
            <header className="header">
                <h1>Drawing Game</h1>
            </header>
              <div className='main'>
                  Draw the prompt shown at the top of the screen. When you are done, press "Submit." If you want a new prompt, click "I don't like this prompt." Help us create a dataset of human drawn images!
                <button onClick={navigateToSignIn}>
                  Play the game
                </button>
              </div>
            <footer className="footer"/>
        </div>
    );
}

export default FrontPage
