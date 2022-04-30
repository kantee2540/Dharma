import { faCookieBite } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import "./CookieConsent.css"

function CookieConsent({ isAccepted, onAccept }) {
  return (
    <div id="cookie-consent" style={{ display: !isAccepted ? 'flex': 'none' }}> 
			<Container>
				<Row style={{ alignItems: 'center' }}>
					<Col md="9" lg="10" className='col-content'>
						<div className='icon'>
							<FontAwesomeIcon icon={faCookieBite} color="brown"/>
						</div>
						<div style={{ flex: 1 }}>
							<div className='title'><b>เว็บไซต์มีการใช้งานคุกกี้</b></div>
							<div>เว็บไซต์นี้มีการใช้งานคุกกี้เพื่อเพิ่มประสิทธิการทำงาน และประสบการณ์การณ์ที่ดีในการใช้งาน</div>
						</div>
					</Col>
					<Col md="3" lg="2">
						<div>
							<Button className='accept-button' onClick={onAccept}>
								ยินยอม
							</Button>
						</div>
					</Col>
				</Row>
			</Container>
			
		</div>
  )
}

export default CookieConsent