import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, BrowserRouter, Switch ,Route } from 'react-router-dom'
import axios from 'axios'
import './Sound.css'
import { baseUrl, resourceUrl } from '../networkVariable'
import Overlay from '../Component/Overlay'
import dayjs  from 'dayjs'
import Default from '../Image/default_image.png'

import SoundFile from './SoundFile'
import CompactButton from '../Component/CompactButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleDown, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

export default class Sound extends React.Component {

    render(){
        return (
            <BrowserRouter basename="/sound">
                <div className="content">
                <Switch>
                    <Route path="/" exact>
                        <BaseSound/>
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
    constructor(props){
        super(props);
        this.state = {
            items: [],
            error: null,
            isLoading: false,
            page: 1,
            size: 9,
            isLast: false
        }
    }

    componentDidMount(){
        this.fetchSoundList()
    }

    fetchSoundList = () => {
        this.setState({ isLoading: true })
        const url = baseUrl + "/sound";
        const query = {
            page: this.state.page,
            size: this.state.size
        }
        axios.get(url, {
            params: query
        })
        .then(response => {
            const data = response.data
            data.forEach((item) => {
                this.setState(prevState => ({
                    items: [...prevState.items, item]
                }), ()=>{
                    if(data.length < this.state.size){
                        this.setState({ isLast: true })
                    }
                })
            })

            this.setState({isLoading: false});
        }).catch(error => {
            this.setState({error: error.message, isLoading: false});
        });
    }

    onNextPage = () => {
        this.setState({ page: this.state.page + 1 }, ()=>{
            this.fetchSoundList()
        })
    }

    render(){
        const { isLoading, error, items, isLast } = this.state;
        return(
            <div>
                {isLoading || error !== null ?
                <Overlay isLoading={isLoading} message={error == null ? "กำลังโหลด": error}/>
                : ''}
                <Container>
                    <div className="head-title">ฟังเสียง</div>
                    <Row className="sound-content">
                        {items.map((item, key) => 
                        (
                            <SoundItem key={key} 
                            id={item.id}
                            img={item.package_image != null ? resourceUrl + "/" + item.sound_package_folder + "/" + item.package_image : Default}
                            date={item.created_at} 
                            title={item.sound_package_name}/>
                        ))}
                    </Row>
                    { !isLast && items.length > 0 ?
                    <CompactButton
                    icon={faArrowAltCircleDown}
                    title="โหลดเพิ่มเติม"
                    justifyContent='center'
                    hoverColor='dodgerblue'
                    onClick={()=>this.onNextPage()}
                    />
                    : null
                    }
                    { items.length === 0 ?
                    <NoSound/>
                    : null
                    }
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

class NoSound extends React.Component{
    render(){
        return(
            <div className='no-sound'>
                <div className='icon'>
                    <FontAwesomeIcon icon={faQuestionCircle}/>
                </div>
                <div>
                    <div className='title'>ไม่มีชุดไฟล์เสียง</div>
                    <div className='desc'>กรุณาแจ้งผู้ดูแลระบบสำหรับข้อมูลเพิ่มเติม</div>
                </div>
            </div>
        )
    }
}