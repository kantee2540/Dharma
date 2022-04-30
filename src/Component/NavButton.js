import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'
import './NavButton.css'

function NavButton({ to, title, lefticon, rightIcon }) {
  return (
		<Link to={to} className='nav-btn'>
			{ lefticon ?
			<FontAwesomeIcon icon={lefticon}/>
			: null
			}
			<span className='title'>{title}</span>
			{ rightIcon ?
			<FontAwesomeIcon icon={rightIcon}/>
			: null
			}
		</Link>
  )
}

export default NavButton