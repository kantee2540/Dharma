import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Sound.css'

import tawanron from '../Image/tawanron.jpg'

export default function Sound() {
    return (
        <div className="content">
            <Container>
                <div className="head-title">ฟังเสียง</div>
                <Row className="sound-content">
                    <SoundItem/>
                    <SoundItem/>
                    <SoundItem/>
                    <SoundItem/>
                    <SoundItem/>
                    <SoundItem/>
                    <SoundItem/>
                    <SoundItem/>
                    <SoundItem/>
                </Row>
            </Container>
        </div>
    )
}

class SoundItem extends React.Component{
    render(){
        return(
            <Col className="sound-item" xs={12} md={6} lg={4}>
                <Link className="sound-item-container">
                    <img className="sound-img" src={tawanron}/>
                    <div className="sound-item-detail">
                        <div className="title">ปฏิบัติธรรม</div>
                        <div className="date">20 ก.ค.63 - 25 ก.ค.63</div>
                        <div className="location">ตะวันลอนศูนย์ฝึกอบรมไทยพาณิชย์</div>
                    </div>
                </Link>
            </Col>
        )
    }
}