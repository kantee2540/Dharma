import React from 'react'
import Cover from '../Component/Cover'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Home.css'

import tawanron from '../Image/tawanron.jpg'
import raiwa from '../Image/raiwa.jpg'

export default function Home() {
    return (
        <div>
            <Cover/>
            <Container style={{ marginTop: 20}}>
                <div className="head-title">ฟังย้อนหลัง</div>
                <Row>
                    <SoundItem/>
                    <SoundItem/>
                    <SoundItem/>
                    <SoundItem/>
                    <SoundItem/>
                    <SoundItem/>
                </Row>

                <div className="head-title">ชมภาพ</div>
                <Row>
                    <VideoItem src="https://youtu.be/uCpbKn8i_oM"/>
                    <VideoItem src="https://youtu.be/AJ_osraEd5s"/>
                </Row>
            </Container>
        </div>
    )
}

class SoundItem extends React.Component{
    render(){
        return(
            <Col className="sound-item" xs={12} md={6} lg={4}>
                <div className="sound-item-container">
                    <img className="sound-img" src={tawanron}/>
                    <div className="sound-item-detail">
                        <div className="title">ปฏิบัติธรรม</div>
                        <div className="date">20 ก.ค.63 - 25 ก.ค.63</div>
                        <div className="location">ตะวันลอนศูนย์ฝึกอบรมไทยพาณิชย์</div>
                    </div>
                </div>
            </Col>
        )
    }
}

class VideoItem extends React.Component{

    constructor(props){
        super(props);
        var src = props.src;
        var youtubeCode = src.substring(src.length - 11, src.length);
        this.state = { code: youtubeCode };
    }

    render(){
        const { code } = this.state;
        var embedUrl = "https://www.youtube.com/embed/" + code;

        return(
            <Col xs={12} md={6}>
                <iframe width="100%" height="315" src={embedUrl} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </Col>
        )
    }
}