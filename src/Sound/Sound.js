import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, BrowserRouter, Switch ,Route } from 'react-router-dom'
import axios from 'axios'
import './Sound.css'
import { baseUrl, resourceUrl } from '../networkVariable'
import Overlay from '../Component/Overlay'
import dayjs from 'dayjs'

import SoundFile from './SoundFile'

import tawanron from '../Image/tawanron.jpg'

export default class Sound extends React.Component {

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
        axios.get(url)
        .then(response => {
            this.setState({items: response.data, isLoading: false});
        }).catch(error => {
            this.setState({error: error.message, isLoading: false});
        });
    }

    render(){
        const { items, error, isLoading } = this.state;
        return (
            <BrowserRouter basename="/sound">
                <div className="content">
                <Switch>
                    <Route path="/" exact>
                        {isLoading || error !== null ?
                         <Overlay isLoading={isLoading} message={error == null ? "กำลังโหลด": error}/>
                         : ''}
                        <BaseSound items={items}/>
                    </Route>
                    <Route path="/:id">
                        <SoundFile/>
                    </Route>
                </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

class BaseSound extends React.Component{
    render(){
        return(
            <div>
                <Container>
                    <div className="head-title">ฟังเสียง</div>
                    <Row className="sound-content">
                        {this.props.items.map((item, key) => 
                        (
                            <SoundItem key={key} 
                            id={item.id}
                            img={item.package_image != null ? resourceUrl + "/" + item.sound_package_folder + "/" + item.package_image : tawanron}
                            date={item.created_at} 
                            title={item.sound_package_name}/>
                        ))}
                    </Row>
                </Container>
            </div>
        )
    }
}

class SoundItem extends React.Component{
    formatDate(date){
        let toDate = new Date(date);
        let formatted = dayjs(toDate).format("DD MMMM BBBB")
        return formatted
    }

    render(){
        var link = "/"+this.props.id;
        return(
            <Col className="sound-item" xs={12} md={6} lg={4}>
                <Link className="sound-item-container" to={link}>
                    <img className="sound-img" src={this.props.img} alt="cover"/>
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