import React from 'react'
import Cover from '../Component/Cover'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { baseUrl, resourceUrl } from '../networkVariable'
import './Home.css'
import axios from 'axios'
import Overlay from '../Component/Overlay'
import dayjs from 'dayjs'

import Default from '../Image/default_image.png'
// import tawanron from '../Image/tawanron.jpg'
import youtube_channel from '../Image/youtube_channel.jpg'
import NavButton from '../Component/NavButton'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            items: [],
            error: null,
            isLoading: false
        }
    }

    componentDidMount(){
        this.setState({isLoading: true})
        var url = baseUrl + "/sound";
        axios.get(url, {
            params:{
                limit: 6
            }
        })
        .then(response => {
            this.setState({items: response.data, isLoading: false});
        }).catch(error => {
            this.setState({error: error.message, isLoading: false});
        });
    }

    render(){
        const { items, error, isLoading } = this.state
        return (
            <div>
                {isLoading || error !== null  ? 
                <Overlay isLoading={isLoading} message={error == null ? "กำลังโหลด": error}/>
                : ''}
                <Cover/>
                <Container style={{ marginTop: 20}}>
                    <div className="head-title d-flex justify-content-between">
                        <div>ฟังย้อนหลัง</div>
                        <NavButton
                        to={"/sound"}
                        title="เพิ่มเติม"
                        rightIcon={faArrowRight}
                        />
                    </div>
                    <Row>
                        {items.map((item, key) => 
                            <SoundItem key={key} 
                            id={item.id}
                            img={item.package_image != null ? resourceUrl + "/" + item.sound_package_folder + "/" + item.package_image : Default} 
                            date={item.created_at}
                            title={item.sound_package_name}/>
                        )}
                    </Row>
                    <div className="about">
                        <div className="head-title">เกี่ยวกับเรา</div>
                        <Row>
                            <Col md={3} style={{textAlign: "center"}}>
                                <img className="img" src={youtube_channel} alt="youtube"/>
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
    formatDate(date){
        let toDate = new Date(date);
        let formatted = dayjs(toDate).format("D MMMM BBBB")
        return formatted
    }

    render(){
        var link = "/sound/"+this.props.id;
        console.log(this.props.date)
        return(
            <Col className="sound-item" xs={12} md={6} lg={4}>
                <Link className="sound-item-container" to={link}>
                    <img className="sound-img" src={this.props.img} alt="sound item"/>
                    <div className="sound-item-detail">
                        <div className="title">{this.props.title}</div>
                        <div className="date">
                            <b>วันที่เผยแพร่ :</b> {this.formatDate(this.props.date)}
                        </div>
                    </div>
                </Link>
            </Col>
        )
    }
}

// class VideoItem extends React.Component{

//     constructor(props){
//         super(props);
//         var src = props.src;
//         var youtubeCode = src.substring(src.length - 11, src.length);
//         this.state = { code: youtubeCode };
//     }

//     render(){
//         const { code } = this.state;
//         var embedUrl = "https://www.youtube.com/embed/" + code;

//         return(
//             <Col xs={12} md={6}>
//                 <iframe width="100%" height="315" src={embedUrl} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//             </Col>
//         )
//     }
// }