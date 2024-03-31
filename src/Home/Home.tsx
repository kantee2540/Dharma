import React, { useEffect, useState } from "react";
import Cover from "../components/Cover";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { resourceUrl } from "../networkVariable";
import "./Home.css";
import Overlay from "../components/Overlay";
import dayjs from "dayjs";

import Default from "../Image/default_image.png";
import youtube_channel from "../Image/youtube_channel.jpg";
import NavButton from "../components/NavButton";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { axiosClient } from "../utils/axiosClient";
import { sound } from "../data/sound";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [soundItems, setSoundItems] = useState<sound[]>([]);

  useEffect(() => {
    setIsLoading(true);
    axiosClient
      .get("/sound", {
        params: {
          limit: 6,
        },
      })
      .then((response) => {
        setSoundItems(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading || error !== null ? (
        <Overlay
          isLoading={isLoading}
          message={error == null ? "กำลังโหลด" : error}
        />
      ) : (
        ""
      )}
      <Cover />
      <Container style={{ marginTop: 20, zIndex: 10 }}>
        <div className="head-title d-flex justify-content-between">
          <div>ฟังย้อนหลัง</div>
          <NavButton to={"/sound"} title="เพิ่มเติม" rightIcon={faArrowRight} />
        </div>
        <Row>
          {soundItems.map((item, key) => (
            <SoundItem
              key={key}
              id={item.id}
              img={
                item.package_image != null
                  ? resourceUrl +
                    "/" +
                    item.sound_package_folder +
                    "/" +
                    item.package_image
                  : Default
              }
              date={item.created_at}
              title={item.sound_package_name}
            />
          ))}
        </Row>
        <div className="about">
          <div className="head-title">เกี่ยวกับเรา</div>
          <Row>
            <Col md={3} style={{ textAlign: "center" }}>
              <img className="img" src={youtube_channel} alt="youtube" />
            </Col>
            <Col md={9} style={{ paddingTop: 10 }}>
              <div className="title">เกี่ยวกับเรา</div>
              <div className="description">
                ศึกษาพระไตรปิฎกกับอาจารย์ดิษกฤต สาสนเวชช์
              </div>
              <Link to="about" className="btn btn-warning">
                ดูเพิ่มเติม
              </Link>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
type SoundItemProps = {
  id: number;
  title: string;
  img: string;
  date: string;
};

function SoundItem({ id, title, img, date }: SoundItemProps) {
  const formatDate = (date: string) => {
    let toDate = new Date(date);
    let formatted = dayjs(toDate).format("D MMMM BBBB");
    return formatted;
  };

  const link = `/sound/${id}`;
  return (
    <Col className="sound-item" xs={12} md={6} lg={4}>
      <Link className="sound-item-container" to={link}>
        <img className="sound-img" src={img} alt="sound item" />
        <div className="sound-item-detail">
          <div className="title">{title}</div>
          <div className="date">
            <b>วันที่เผยแพร่ :</b> {formatDate(date)}
          </div>
        </div>
      </Link>
    </Col>
  );
}
