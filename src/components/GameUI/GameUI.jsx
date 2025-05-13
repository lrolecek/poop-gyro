import './GameUI.css'

export const GameUI = ({angle, direction}) => {
  return (
    <div className="gameUI">
      <h2 className="title">Poop Gyro</h2>
      <p className="info">Angle your phone to move</p>
      <p className="angleinfo">
        Angle X: {angle.x.toFixed(2)}<br />
        Angle Y: {angle.y.toFixed(2)}
      </p>
      <p className="angleinfo">{direction ? direction : 'not moving'}</p>
    </div>
  )
}

export default GameUI