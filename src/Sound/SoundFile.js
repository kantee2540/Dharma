import React from 'react'
import AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { baseUrl, resourceUrl } from '../networkVariable'
import './Sound.css'
import axios from 'axios'
import Overlay from '../Component/Overlay'
import BottomOverlay from '../Component/BottomOverlay'
import dayjs from 'dayjs'

class SoundFile extends React.Component{

    constructor(props){
        super(props);
        this.state = {packages: {title: "", folder: "", error: null},
        soundFile: {items: [], error: null},
        currentPlay: {title: "", date: "", key: null},
        overlayShow: false,
        isLoading: false};
    }

    getInfomation(){
        this.setState({isLoading: true})
        const id = this.props.match.params.id;
        var url = baseUrl + "/sound/"+id;
        
        axios.get(url)
        .then(response => {
            var info = response.data;
            this.setState({
                packages: {
                    title: info.sound_package_name,
                    image: info.package_image,
                    folder: info.sound_package_folder,
                }
            });
            this.setState({
                soundFile: {items: info.data}
            })
            this.setState({isLoading: false})
        }).catch(error => {
            this.setState({packages: {error: error.message}, isLoading: false});
        });
    }

    componentDidMount(){
        this.getInfomation();
    }

    selectSound(fileName, uploadDate, key){
        window.scrollTo(0, 0);
        this.setState({currentPlay: {title: fileName, date: uploadDate, key: key}});
    }

    copyLink(event){
        let currentURL = window.location.href;
        var dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.value = currentURL;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);

        this.setState({overlayShow: true});
        setTimeout(()=>{
            this.setState({overlayShow: false});
        }, 1500);
        console.log(currentURL);

        event.preventDefault();
    }

    render(){
        const { packages, soundFile, currentPlay, overlayShow, isLoading } = this.state;
        return(
            <div>
                <BottomOverlay message="คัดลอกลิ้งก์แล้ว" show={overlayShow}/>
                {isLoading ? <Overlay isLoading={isLoading} message={soundFile.error === null ? 'กำลังโหลด': soundFile.error}/>: ''}
                <Container>
                    { packages.title !== undefined ?
                    <>
                    <div className="head-title">
                        <Link to="/" className="back-link">
                            <i className="fas fa-arrow-left"></i>
                        </Link>
                        {packages.title}
                    </div>
                    <Row>
                        <Col md={6}>
                            {currentPlay.title !== "" ? 
                            <>
                            <img src={resourceUrl+ "/"+ packages.folder +"/"+packages.image} alt="coverimage" className="cover-image-package"/>
                            <AudioPlayer 
                                autoPlay={true}
                                showJumpControls={false}
                                loop={false}
                                src={resourceUrl+ "/"+ packages.folder +"/"+currentPlay.title}/>
                            <div className="play-info">
                                <div className="play-title">
                                {currentPlay.title}
                                </div>
                                <div className="upload-date">
                                    {dayjs(currentPlay.date).format("D MMMM BBBB")}
                                </div>
                            </div>
                            
                                <div className="download-detail">
                                    <a className="compact-button" 
                                    href={resourceUrl+ "/" +packages.folder +"/"+currentPlay.title} 
                                    target="_blank"
                                    rel="noopener noreferrer">
                                        <i className="fas fa-file-download"></i>ดาวโหลด 
                                    </a>
                                    <a className="compact-button" href="#" onClick={this.copyLink.bind(this)}>
                                        <i className="fas fa-copy"></i>คัดลอกลิ้งก์ 
                                    </a>
                                </div>
                            </>
                                : <NoItemSelect/>}
                        </Col>
                        <Col md={6}>
                            <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>ลำดับที่</th>
                                    <th>ชื่อไฟล์</th>
                                </tr>
                            </thead>
                            <tbody className="sound-file-body">
                            {soundFile.items.map((item, key) =>
                                <tr key={key} className={"sound-item "+ (currentPlay.key === key ? 'active': '') }
                                 onClick={this.selectSound.bind(this, item.sound_file, item.created_at, key)}>
                                    <td>{key+1}</td>
                                    <td>{item.sound_file}</td>
                                </tr>
                            )}
                            </tbody>
                            </Table>
                        </Col>
                        
                    </Row>
                    </> : 
                    <div id="not-found">
                        <div className="icon">
                            <i className="fas fa-question-circle"></i>
                        </div>
                        <b>ไม่พบชุดฟังเสียง</b>
                        <div className="detail">
                        ชุดไฟล์เสียงนี้ถูกลบแล้วหรือไม่พบเจอ
                        </div>
                        <Link to="/">
                            <Button>
                                ย้อนกลับ
                            </Button>
                        </Link>
                        
                    </div>
                    }
                </Container>
            </div>
        )
    }
}

export default withRouter(SoundFile)

function NoItemSelect(){
    return(
        <div className="no-item-selected">
            <div className="title">โปรดเลือกไฟล์เสียงเพื่อเล่น</div>
            คลิกเลือกไฟล์เสียงที่ต้องการฟังได้จากรายการ
        </div>
    )
}