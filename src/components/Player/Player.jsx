import './Player.css'

export const Player = ({x, y}) => {
  return (
    <div
      className="player"
      style={{
        left: x,
        top: y,
      }}
    />
  )
}

export default Player;