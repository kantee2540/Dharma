import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import "./CompactButton.css"

function CompactButton({ title, icon, rightIcon, onClick, hoverColor }) {
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
      { icon ?
			<div className='icon'>
        <FontAwesomeIcon icon={icon}/>
      </div>
      : null
      }
      <div className='title'>
        {title}
      </div>
      { rightIcon ?
      <div className='icon'>
        <FontAwesomeIcon icon={rightIcon}/>
      </div>
      : null
      }
		</div>
  )
}

export default CompactButton