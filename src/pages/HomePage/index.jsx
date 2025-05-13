import { useState, useEffect } from 'react';
import Player from '../../components/Player/Player';

import './style.css';
import GameUI from '../../components/GameUI/GameUI';

export const HomePage = () => {

  const [coords, setCoords] = useState({
    x: window.innerWidth / 2 - 25,
    y: window.innerHeight / 2 - 25,
  })
  const [isMoving, setIsMoving] = useState(false)
  const [direction, setDirection] = useState(null)
  const [angle, setPhoneAngle] = useState({
    x: 0,
    y: 0,
  })

  const gameLoop = () => {
    if (!direction) return

    const step = 10;
    let {x, y} = coords

    const maxX = window.innerWidth - 50;
    const maxY = window.innerHeight - 50;

    switch(direction) {
      case 'left':
        x = Math.max(x - step, 0)
        break
      case 'right':
        x = Math.min(x + step, maxX)
        break
      case 'up':
        y = Math.max(y - step, 0)
        break
      case 'down':
        y = Math.min(y + step, maxY)
        break
    }

    setCoords({x, y})
  }

  const getDirection = (e) => {
    const angleX = e.gamma / 90 || 0
    const angleY = e.beta / 90 || 0
    const absX = Math.abs(angleX)
    const absY = Math.abs(angleY)
    let dir = null

    if (absX > 0.15 && absX > absY) {
      dir = angleX < 0 ? 'left' : 'right'
    }
    if (absY > 0.15 && absY > absX) {
      dir = angleY < 0 ? 'up' : 'down'
    }

    setDirection(dir)
    setPhoneAngle({x: angleX, y: angleY})
  }

  // game loop
  useEffect(() => {
    const intervalId = setInterval(gameLoop, 25)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  // device orientation
  useEffect(() => {
    window.addEventListener('deviceorientation', getDirection)
    return () => {
      window.removeEventListener('deviceorientation', getDirection)
    }
  }, [])

  const handleDirectionChange = (dir) => {
    if (dir === 'Center') {
      setIsMoving(false)
      setDirection(null)
    }
    setIsMoving(true)
    setDirection(dir)
  }

  return (
    <div className="game">
      <GameUI angle={angle} />
      <Player {...coords} />
    </div>
  );
};
