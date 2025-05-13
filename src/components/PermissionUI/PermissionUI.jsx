import './PermissionUI.css'

export const PermissionUI = ({handlePermission}) => {
  return (
    <div className="permissionUI">
      <h2 className="title">Poop Gyro</h2>
      <p className="info">We need to ask you for permission to use gyroscope on your phone.</p>
      <p className="info">Click the button and then Allow permission.</p>
      <p className="subinfo">(this probably won't work on PC)</p>
      <div className="buttonContainer">
        <button className="button" onClick={handlePermission}>START</button>
      </div>
    </div>
  )
}

export default PermissionUI