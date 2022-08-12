const Die = (props) => {
  const bgStyle = {
    backgroundColor: props.isHeld ? '#5c5c5c' : '#1c1c1c',
  }
  const lockStyles = {
    display: props.isHeld ? 'block' : 'none',
  }
  return (
    <div className='die' onClick={props.holdDice} style={bgStyle}>
      <h2>
        {props.value}
        <span className='lock' style={lockStyles}>
          🔒
        </span>
      </h2>
    </div>
  )
}

export default Die
