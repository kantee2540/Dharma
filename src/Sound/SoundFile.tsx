import React, { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { baseUrl, resourceUrl } from "../networkVariable";
import "./Sound.css";
import axios from "axios";
import Overlay from "../components/Overlay";
import BottomOverlay from "../components/BottomOverlay";
import dayjs from "dayjs";
import CompactButton from "../components/CompactButton";
import { faCopy, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import Toggle from "../components/Toggle";
import { packages } from "../data/packages";
import { currentPlay } from "../data/currentPlay";
import { soundFile } from "../data/soundFile";
import { sound } from "../data/sound";

function SoundFile() {
  const { id } = useParams();
  const [autoPlay, setAutoPlay] = useState(
    localStorage.getItem("autoplay") !== null
      ? localStorage.getItem("autoplay") === "true"
        ? true
        : false
      : true
  );
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(
    null
  );
  const [packages, setPackages] = useState<packages | null>(null);
  const [currentPlay, setCurrentPlay] = useState<currentPlay | null>(null);
  const [isOverlayShow, setIsOverlayShow] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [soundFileItems, setSoundFileItems] = useState<soundFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  // constructor(props) {
  //   super(props);
  //   const autoPlay =
  //     localStorage.getItem("autoplay") !== null
  //       ? localStorage.getItem("autoplay") === "true"
  //         ? true
  //         : false
  //       : true;
  //    = {
  //     soundId: props.match.params.id,
  //     autoPlay: autoPlay,
  //     currentTrackIndex: null,
  //     packages: { title: "", folder: "", error: null },
  //     soundFile: { items: [], error: null },
  //     currentPlay: { title: "", date: "", key: null },
  //     overlayShow: false,
  //     overlayMessage: "",
  //     isLoading: false,
  //   };
  // }

  const getInfomation = () => {
    setIsLoading(true);
    const url = `${baseUrl}/sound/${id}`;

    axios
      .get(url)
      .then((response) => {
        var info: sound = response.data;
        setPackages({
          title: info.sound_package_name,
          image: info.package_image,
          folder: info.sound_package_folder,
        });
        setSoundFileItems(info.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const selectSound = (key: number) => {
    window.scrollTo(0, 0);
    const playSound = soundFileItems[key];
    setCurrentTrackIndex(key);
    setCurrentPlay({
      title: playSound.sound_file,
      date: playSound.updated_at,
      key: key,
    });
  };

  const onPreviousTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex((prev) => prev - 1);
    }
  };

  const onNextTrack = () => {
    if (currentTrackIndex !== soundFileItems.length - 1) {
      setCurrentTrackIndex((prev) => prev + 1);
    }
  };

  const onEnded = () => {
    if (autoPlay && currentTrackIndex !== soundFileItems.length - 1) {
      setCurrentTrackIndex((prev) => prev + 1);
    }
  };

  const onDownload = (link: string) => {
    window.open(link, "_blank");
  };

  const onDownloadAll = () => {
    const url = `${baseUrl}/sound/${id}/multi-download`;
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        window.open(`${baseUrl}${data.download_path}`);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const copyLink = (event) => {
    let currentURL = window.location.href;
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.value = currentURL;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);

    setIsOverlayShow(true);
    setOverlayMessage("คัดลอกลิ้งก์แล้ว");
    setTimeout(() => {
      setIsOverlayShow(false);
    }, 3000);
    console.log(currentURL);

    event.preventDefault();
  };

  const onAutoplayChange = () => {
    const newAutoPlay = !autoPlay;
    setAutoPlay(newAutoPlay);
    localStorage.setItem("autoplay", newAutoPlay ? "true" : "false");
  };

  useEffect(() => {
    if (currentTrackIndex !== null) {
      selectSound(currentTrackIndex);
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    getInfomation();
  }, []);

  return (
    <div className="content">
      <BottomOverlay message={overlayMessage} show={isOverlayShow} />
      {isLoading && (
        <Overlay
          isLoading={isLoading}
          message={error === null ? "กำลังโหลด" : error}
        />
      )}
      <Container>
        {packages?.title !== undefined ? (
          <>
            <div className="head-title">
              <Link to="/" className="back-link">
                <i className="fas fa-arrow-left"></i>
              </Link>
              {packages.title}
            </div>
            <Row>
              <Col md={6}>
                {currentPlay ? (
                  <>
                    <img
                      src={`${resourceUrl}/${packages.folder}/${packages.image}`}
                      alt="coverimage"
                      className="cover-image-package"
                    />
                    <AudioPlayer
                      autoPlay={true}
                      loop={false}
                      showSkipControls={true}
                      showJumpControls={false}
                      onClickNext={() => onNextTrack()}
                      onClickPrevious={() => onPreviousTrack()}
                      onEnded={() => onEnded()}
                      src={`${resourceUrl}/${packages.folder}/${currentPlay?.title}`}
                    />
                    <div className="play-info">
                      <div className="play-title">{currentPlay?.title}</div>
                      <div className="upload-date">
                        {dayjs(currentPlay?.date).format("D MMMM BBBB")}
                      </div>
                    </div>
                    <hr />
                    <div className="download-detail">
                      <Row>
                        <Col sm="6" xl="4">
                          <CompactButton
                            title="ดาวโหลด"
                            icon={faFileDownload}
                            hoverColor="#28B463"
                            onClick={() =>
                              onDownload(
                                `${resourceUrl}/${packages.folder}/${currentPlay?.title}`
                              )
                            }
                          />
                        </Col>
                        <Col sm="6" xl="4">
                          <CompactButton
                            title="คัดลอกลิ้งก์"
                            icon={faCopy}
                            hoverColor="dodgerblue"
                            onClick={copyLink.bind(this)}
                          />
                        </Col>
                      </Row>
                    </div>
                  </>
                ) : (
                  <NoItemSelect />
                )}
              </Col>
              <Col md={6}>
                <div className="top-playlist-header">
                  <CompactButton
                    icon={faFileDownload}
                    title={"ดาวโหลดทั้งหมด"}
                    fontSize={16}
                    verticalPadding={10}
                    onClick={() => onDownloadAll()}
                  />
                  <div className="autoplay">
                    <div style={{ marginRight: 13 }}>เล่นอัตโนมัติ</div>
                    <Toggle
                      isTurnon={autoPlay}
                      onChange={() => onAutoplayChange()}
                    />
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
                    {soundFileItems.map((item, key) => (
                      <tr
                        key={key}
                        className={
                          "sound-item " +
                          (currentPlay?.key === key ? "active" : "")
                        }
                        onClick={() => setCurrentTrackIndex(key)}
                      >
                        <td>{key + 1}</td>
                        <td>{item.sound_file}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </>
        ) : (
          <NotFound />
        )}
      </Container>
    </div>
  );
}

export default SoundFile;

function NotFound() {
  return (
    <div id="not-found">
      <div className="icon">
        <i className="fas fa-question-circle"></i>
      </div>
      <b>ไม่พบชุดฟังเสียง</b>
      <div className="detail">ชุดไฟล์เสียงนี้ถูกลบแล้วหรือไม่พบเจอ</div>
      <Link to="/">
        <Button>ย้อนกลับ</Button>
      </Link>
    </div>
  );
}

function NoItemSelect() {
  return (
    <div className="no-item-selected">
      <div className="title">โปรดเลือกไฟล์เสียงเพื่อเล่น</div>
      คลิกเลือกไฟล์เสียงที่ต้องการฟังได้จากรายการ
    </div>
  );
}
