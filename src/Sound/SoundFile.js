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
import CompactButton from '../Component/CompactButton';
import { faCopy, faFileDownload } from '@fortawesome/free-solid-svg-icons';
import Toggle from '../Component/Toggle';

class SoundFile extends React.Component{

    constructor(props){
        super(props);
        const autoPlay = 
        localStorage.getItem('autoplay') !== null ? 
        (localStorage.getItem('autoplay') === 'true' ? true: false)
        : true
        this.state = {
            soundId: this.props.match.params.id,
            autoPlay: autoPlay,
            currentTrackIndex: null,
            packages: {title: "", folder: "", error: null},
            soundFile: {items: [], error: null},
            currentPlay: {title: "", date: "", key: null},
            overlayShow: false,
            overlayMessage: "",
            isLoading: false
        };
    }

    getInfomation(){
        this.setState({isLoading: true})
        var url = `${baseUrl}/sound/${this.state.soundId}`;
        
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
        this.setState({
            currentTrackIndex: key,
            currentPlay: {title: fileName, date: uploadDate, key: key}
        });
    }

    onPreviousTrack = () => {
        if(this.state.currentTrackIndex > 0){
            this.setState({ currentTrackIndex: this.state.currentTrackIndex - 1 }, ()=>{
                const data = this.state.soundFile.items[this.state.currentTrackIndex]
                this.selectSound(data.sound_file, data.created_at, this.state.currentTrackIndex)
            })
        }
    }

    onNextTrack = () => {
        if(this.state.currentTrackIndex !== this.state.soundFile.items.length - 1){
            this.setState({ currentTrackIndex: this.state.currentTrackIndex + 1 }, ()=>{
                const data = this.state.soundFile.items[this.state.currentTrackIndex]
                this.selectSound(data.sound_file, data.created_at, this.state.currentTrackIndex)
            })
        }
    }

    onEnded = () => {
        if(this.state.autoPlay && this.state.currentTrackIndex !== this.state.soundFile.items.length - 1){
            this.setState({ currentTrackIndex: this.state.currentTrackIndex + 1 }, ()=>{
                const data = this.state.soundFile.items[this.state.currentTrackIndex]
                this.selectSound(data.sound_file, data.created_at, this.state.currentTrackIndex)
            })
        }
    }

    onDownload = (link) => {
        window.open(link, '_blank')
    }

    onDownloadAll = () => {
        const url = `${baseUrl}/sound/${this.state.soundId}/multi-download`
        this.setState({ isLoading: true })
        axios.get(url)
        .then(response => {
            const data = response.data
            window.open(`${baseUrl}${data.download_path}`)
            this.setState({ isLoading: false })
        }) 
        .catch(error => {
            console.error(error)
        })
    }

    copyLink(event){
        let currentURL = window.location.href;
        var dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.value = currentURL;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);

        this.setState({overlayShow: true, overlayMessage: "คัดลอกลิ้งก์แล้ว"});
        setTimeout(()=>{
            this.setState({overlayShow: false});
        }, 3000);
        console.log(currentURL);

        event.preventDefault();
    }

    onAutoplayChange = () => {
        const autoPlay = !this.state.autoPlay ? true:false
        this.setState({ autoPlay: autoPlay }, ()=>{
            localStorage.setItem('autoplay', autoPlay ? 'true':'false')
        })
    }

    render(){
        const { packages, soundFile, currentPlay, overlayShow, isLoading, overlayMessage } = this.state;
        return(
            <div>
                <BottomOverlay message={overlayMessage} show={overlayShow}/>
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
                                loop={false}
                                showSkipControls={true}
                                showJumpControls={false}
                                onClickNext={()=>this.onNextTrack()}
                                onClickPrevious={()=>this.onPreviousTrack()}
                                onEnded={()=>this.onEnded()}
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
                                    <Row>
                                        <Col sm="6" xl="4">
                                            <CompactButton 
                                            title="ดาวโหลด" 
                                            icon={faFileDownload} 
                                            hoverColor="#28B463"
                                            onClick={()=>this.onDownload(`${resourceUrl}/${packages.folder}/${currentPlay.title}`)}/>
                                        </Col>
                                        <Col sm="6" xl="4">
                                            <CompactButton 
                                            title="คัดลอกลิ้งก์" 
                                            icon={faCopy} 
                                            hoverColor="dodgerblue"
                                            onClick={this.copyLink.bind(this)}/>
                                        </Col>
                                    </Row>
                                    
                                    
                                </div>
                            </>
                                : <NoItemSelect/>}
                        </Col>
                        <Col md={6}>
                            <div className='top-playlist-header'>
                                <CompactButton
                                    icon={faFileDownload}
                                    title={"ดาวโหลดทั้งหมด"}
                                    fontSize={16}
                                    verticalPadding={10}
                                    onClick={()=>this.onDownloadAll()}
                                />
                                <div className='autoplay'>
                                    <div style={{ marginRight: 13 }}>เล่นอัตโนมัติ</div>
                                    <Toggle 
                                    isTurnon={this.state.autoPlay}
                                    onChange={()=>this.onAutoplayChange()}/>
                                </div>
                            </div>
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
                    <NotFound/>
                    }
                </Container>
            </div>
        )
    }
}

export default withRouter(SoundFile)

function NotFound(){
    return (
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
    )
}

function NoItemSelect(){
    return(
        <div className="no-item-selected">
            <div className="title">โปรดเลือกไฟล์เสียงเพื่อเล่น</div>
            คลิกเลือกไฟล์เสียงที่ต้องการฟังได้จากรายการ
        </div>
    )
}