import React from 'react'
import './Toggle.css'

function Toggle({ isTurnon, onChange, style }) {
  return (
    <label className="switch" style={style}>
			<input type="checkbox" checked={isTurnon} onChange={onChange}/>
			<span className="slider round"></span>
		</label>
  )
}

export default Toggle