import React from 'react'
import AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css';
import { Container, Row, Col, Table } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { baseUrl, resourceUrl } from '../networkVariable'
import './Sound.css'
import axios from 'axios'
import Overlay from '../Component/Overlay'
import BottomOverlay from '../Component/BottomOverlay'

class SoundFile extends React.Component{

    constructor(props){
        super(props);
        this.state = {packages: {title: "", folder: "", error: null},
        soundFile: {items: [], isLoaded: false, error: null},
        currentPlay: {title: "", date: "", key: null},
        overlayShow: false};
    }

    getInfomation(){
        var url = baseUrl + "/sound";
        const id = this.props.match.params.id;

        axios.get(url, {
            params: {
                id: id
            }
        })
        .then(response => {
            var info = response.data[0];
            this.setState({packages: 
                {title: info.sound_package_name,
                image: info.package_image,
                folder: info.sound_package_folder}});
        }).catch(error => {
            this.setState({packages: {error: error.message}});
        });
    }

    getSoundFile(){
        var url = baseUrl + "/sound/package";
        const id = this.props.match.params.id;

        axios.get(url, {
            params: {
                id: id
            }
        })
        .then(response => {
            var datas = response.data;
            this.setState({soundFile: {items: datas, isLoaded: true}});
        }).catch(error => {
            this.setState({soundFile: {error: error.message}});
        });
    }

    componentDidMount(){
        this.getInfomation();
        this.getSoundFile();
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
        const { packages, soundFile, currentPlay, overlayShow } = this.state;
        return(
            <div>
                <BottomOverlay message="คัดลอกลิ้งก์แล้ว" show={overlayShow}/>
                {!soundFile.isLoaded ? <Overlay message={soundFile.error === null ? 'กำลังโหลด': soundFile.error}/>: ''}
                <Container>
                    <div className="head-title">
                        <Link to="/" className="back-link">
                            <i class="fas fa-arrow-left"></i>
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
                                    {currentPlay.date}
                                </div>
                            </div>
                            
                                <div className="download-detail">
                                    <a className="compact-button" 
                                    href={resourceUrl+ "/"+ packages.folder +"/"+currentPlay.title} target="_blank" download>
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