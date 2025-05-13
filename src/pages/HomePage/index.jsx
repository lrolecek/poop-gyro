import { useState, useEffect } from 'react';
import Player from '../../components/Player/Player';

import './style.css';
import GameUI from '../../components/GameUI/GameUI';
import PermissionUI from '../../components/PermissionUI/PermissionUI';

import { throttle } from '../../utils/utils';

export const HomePage = () => {

  const [coords, setCoords] = useState({
    x: window.innerWidth / 2 - 25,
    y: window.innerHeight / 2 - 25,
  })
  const [isMoving, setIsMoving] = useState(true)
  const [direction, setDirection] = useState(null)
  const [angle, setPhoneAngle] = useState({
    x: 0,
    y: 0,
  })
  const [permission, setPermission] = useState(false)
  const [info, setInfo] = useState('info')
  const [count, setCount] = useState(0)

  const gameLoop = () => {
    setCount(oldCount => oldCount + 1)
    setInfo((isMoving ? 'moving' : 'not moving') + ' - ' + direction)

    if (!isMoving) return

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

  const handleOrientation = (e) => {
    const angleX = e.gamma / 90 || 0
    const angleY = e.beta / 90 || 0
    const absX = Math.abs(angleX)
    const absY = Math.abs(angleY)
    let dir = null

    if (absX > 0.05 && absX > absY) {
      dir = angleX < 0 ? 'left' : 'right'
    }
    if (absY > 0.05 && absY > absX) {
      dir = angleY < 0 ? 'up' : 'down'
    }

    setPhoneAngle({x: angleX, y: angleY})
    setDirection(dir)
    setIsMoving(dir !== null)
  }

  // game loop
  useEffect(() => {
    const intervalId = setInterval(gameLoop, 25)
    return () => {
      clearInterval(intervalId)
    }
  }, [])


  const requestPermission = () => {
    if (typeof DeviceMotionEvent?.requestPermission === 'function') {
      DeviceMotionEvent
      .requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          setPermission(true)
        }
      });
    } else {
      setPermission(true)
    }
  }

  // device orientation permission
  useEffect(() => {
    const throttledHandleOrientation = throttle(handleOrientation, 20)

    if (permission) {
      window.addEventListener('deviceorientation', throttledHandleOrientation)
    }

    return () => {
      window.removeEventListener('deviceorientation', throttledHandleOrientation)
    }
  }, [permission])


  return (
    <div className="game">

      {permission ? (
        <>
          <GameUI angle={angle} />
          <Player {...coords} />
          <p>{info}</p>
        </>
      ) : (
        <PermissionUI handlePermission={requestPermission} />
      )}
    </div>
  );
};
