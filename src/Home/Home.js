import React from 'react'
import Cover from '../Component/Cover'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { baseUrl, resourceUrl } from '../networkVariable'
import './Home.css'
import axios from 'axios'
import Overlay from '../Component/Overlay'

import tawanron from '../Image/tawanron.jpg'
import youtube_channel from '../Image/youtube_channel.jpg'

export default class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            items: [],
            error: null,
            isLoaded: false
        }
    }

    componentDidMount(){
        var url = baseUrl + "/sound";
        axios.get(url, {
            params:{
                limit: 3
            }
        })
        .then(response => {
            this.setState({items: response.data, isLoaded: true});
        }).catch(error => {
            this.setState({error: error.message});
        });
    }

    render(){
        const { items, error, isLoaded } = this.state
        return (
            <div>
                {!isLoaded ? <Overlay message={error == null ? "กำลังโหลด": error}/>: ''}
                <Cover/>
                <Container style={{ marginTop: 20}}>
                    <div className="head-title d-flex justify-content-between">
                        <div>ฟังย้อนหลัง</div>
                        <Link to="/sound">เพิ่มเติม <i class="fas fa-arrow-right"></i></Link>
                    </div>
                    <Row>
                        {items.map((item, key) => 
                            <SoundItem key={key} 
                            id={item.id}
                            img={item.package_image != null ? resourceUrl + "/" + item.sound_package_folder + "/" + item.package_image : tawanron} 
                            title={item.sound_package_name}/>
                        )}
                    </Row>
                    <div className="about">
                        <div className="head-title">เกี่ยวกับเรา</div>
                        <Row>
                            <Col md={3} style={{textAlign: "center"}}>
                                <img className="img" src={youtube_channel}/>
                            </Col>
                            <Col md={9} style={{paddingTop: 10}}>
                                <div className="title">เกี่ยวกับเรา</div>
                                <div className="description">ศึกษาพระไตรปิฎกกับอาจารย์ดิษกฤต สาสนเวชช์</div>
                                <Link to="about" className="btn btn-warning">ดูเพิ่มเติม</Link>
                            </Col>
                        </Row>
                        
                    </div>
                </Container>
            </div>
        )
    }
}

class SoundItem extends React.Component{
    render(){
        var link = "/sound/"+this.props.id;
        return(
            <Col className="sound-item" xs={12} md={6} lg={4}>
                <Link className="sound-item-container" to={link}>
                    <img className="sound-img" src={this.props.img}/>
                    <div className="sound-item-detail">
                        <div className="title">{this.props.title}</div>
                    </div>
                </Link>
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