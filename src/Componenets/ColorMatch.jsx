import React, { useState, useEffect } from 'react';

const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown'];

function ColorMatch() {
  const [colorName, setColorName] = useState('');
  const [colorToGuess, setColorToGuess] = useState('');
  const [timer, setTimer] = useState(30);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (timer > 0 && !gameOver) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setGameOver(true);
    }
  }, [timer, gameOver]);

  useEffect(() => {
    selectNewColor();
  }, []);

  const selectNewColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const colorName = colors[Math.floor(Math.random() * colors.length)];
    setColorToGuess(colorName);
    setColorName(randomColor);
  };

  const handleColorClick = (color) => {
    if (color === colorToGuess) {
      setScore(score + 1);
      setGameOver(false);
      setTimer(30); // Reset the timer
      selectNewColor();
    } else {
      setGameOver(true);
    }
  };

  return (
    <div className="game-container">
      <h2>Jeu de correspondance des couleurs</h2>
      {gameOver ? (
        <div>
          <h3>Temps écoulé! Votre score final est : {score}</h3>
          <button onClick={() => window.location.reload()} className="btn btn-success">Rejouer</button>
        </div>
      ) : (
        <div>
          <h3 style={{ color: colorName }}>Quel est le nom de cette couleur?</h3>
          <div className="color-buttons">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorClick(color)}
                className="btn"
                style={{ backgroundColor: color }}
              >
                {color}
              </button>
            ))}
          </div>
          <p>Temps restant: {timer}s</p>
          <p>Score: {score}</p>
        </div>
      )}
    </div>
  );
}

export default ColorMatch;
