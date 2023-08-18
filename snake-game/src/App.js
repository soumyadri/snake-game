import React, { useState, useEffect } from 'react';
import { boxLength, getRandomFoodPosition, initialSnakeDetails } from './constant';
import './App.css';

const App = () => {
  const [snakeDetails, setSnakeDetails] = useState(initialSnakeDetails);
  const [foodDetails, setFoodDetails] = useState(getRandomFoodPosition());
  const [directionDetails, setDirectionDetails] = useState('DOWN');
  const [gameOverStatus, setGameOverStatus] = useState(false);
  const [speedController, setSpeedController] = useState(50);
  const [highestScore, setHighestScore] = useState(0);

  const moveSnake = () => {
    const newSnakeDetail = [...snakeDetails];
    const snakeHead = { ...newSnakeDetail[0] };

    switch (directionDetails) {
      case 'UP':
        snakeHead.y -= 1;
        break;
      case 'DOWN':
        snakeHead.y += 1;
        break;
      case 'LEFT':
        snakeHead.x -= 1;
        break;
      case 'RIGHT':
        snakeHead.x += 1;
        break;
      default:
        break;
    }
    newSnakeDetail.unshift(snakeHead);
    if (snakeHead.x === foodDetails.x && snakeHead.y === foodDetails.y) {
      setFoodDetails(getRandomFoodPosition());
      setHighestScore(highestScore + 1);
    } else {
      newSnakeDetail.pop();
    }
    if (validateCollision(snakeHead, snakeDetails)) {
      setGameOverStatus(true);
      return;
    }
    setSnakeDetails(newSnakeDetail);
  };

  const validateCollision = (snakeHead, snakeArray) => {
    return (
      snakeHead.x < 0 ||
      snakeHead.x >= boxLength ||
      snakeHead.y < 0 ||
      snakeHead.y >= boxLength ||
      snakeArray.some((segmentDetails) => segmentDetails.x === snakeHead.x && segmentDetails.y === snakeHead.y)
    );
  };

  const handleKeyPressFn = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        if (directionDetails !== 'DOWN') setDirectionDetails('UP');
        break;
      case 'ArrowDown':
        if (directionDetails !== 'UP') setDirectionDetails('DOWN');
        break;
      case 'ArrowLeft':
        if (directionDetails !== 'RIGHT') setDirectionDetails('LEFT');
        break;
      case 'ArrowRight':
        if (directionDetails !== 'LEFT') setDirectionDetails('RIGHT');
        break;
      case 'w':
        if (directionDetails !== 'DOWN') setDirectionDetails('UP');
        break;
      case 's':
        if (directionDetails !== 'UP') setDirectionDetails('DOWN');
        break;
      case 'a':
        if (directionDetails !== 'RIGHT') setDirectionDetails('LEFT');
        break;
      case 'd':
        if (directionDetails !== 'LEFT') setDirectionDetails('RIGHT');
        break;
      default:
        break;
    }
  };

  const handleGameOverFn = () => {
    setGameOverStatus(!gameOverStatus);
    setSnakeDetails(initialSnakeDetails);
    setHighestScore(0);
    if (directionDetails === 'UP') {
      setDirectionDetails('DOWN');
    } else {
      setDirectionDetails('UP');
    }
  }

  useEffect(() => {
    if (!gameOverStatus) {
      const intervalId = setInterval(moveSnake, speedController);
      window.addEventListener('keydown', handleKeyPressFn);

      return () => {
        clearInterval(intervalId);
        window.removeEventListener('keydown', handleKeyPressFn);
      };
    }
  }, [snakeDetails, directionDetails, foodDetails, gameOverStatus]);

  return (
    <div className="snake-game-container">
      <h1 className="snake-header">Snake Game</h1>
      <div className="game-board-container">
        {Array.from({ length: boxLength * boxLength }, (_, index) => {
          const x = index % boxLength;
          const y = Math.floor(index / boxLength);
          const isSnakeSegment = snakeDetails.some(
            (segmentDetails) => segmentDetails.x === x && segmentDetails.y === y
          );
          const isFood = foodDetails.x === x && foodDetails.y === y;
          return (
            <div
              key={index}
              className={`cell ${isSnakeSegment ? 'snake-cell' : isFood ? 'food-cell' : ''
                }`}
            ></div>
          );
        })}
      </div>
      <div>
        <h3>Speed Controller</h3>
        <div>
          <button onClick={() => setSpeedController(150)} className="button-text">Low</button>
          <button onClick={() => setSpeedController(80)} className="button-text">Medium</button>
          <button onClick={() => setSpeedController(30)} className="button-text">High</button>
          <button onClick={handleGameOverFn} className="button-text">Reload</button>
        </div>
      </div>
      {gameOverStatus && <p className="game-over-container">Game Over! {highestScore}</p>}
    </div>
  );
};

export default App;