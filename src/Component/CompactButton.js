import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import "./CompactButton.css"

function CompactButton({ title, icon, onClick, hoverColor }) {
  const [hover, setHover] = useState(false)

  return (
    <div 
    onMouseEnter={()=>setHover(true)}
    onMouseLeave={()=>setHover(false)}
    className='compact-button' 
    onClick={onClick}
    style={{
      color: hover ? hoverColor: 'black'
    }}
    >
			<div className='icon'>
        <FontAwesomeIcon icon={icon}/>
      </div>
      <div className='title'>
        {title}
      </div>
		</div>
  )
}

export default CompactButton