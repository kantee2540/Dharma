import React from "react";
import { Container } from "react-bootstrap";
import "./Video.css";

import youtube_channel from "../Image/youtube_channel.jpg";

export default function Video() {
  return (
    <div className="content">
      <Container>
        <div className="head-title">ชมภาพ</div>
        <div className="video-content">
          <div className="video-image">
            <img src={youtube_channel} alt="ช่องยูทูปปฏิบัติธรรม" />
          </div>
          <div className="channel-title">พระไตรปิฎกใกล้ตัว</div>
          <div className="channel-description">
            ศึกษาพระไตรปิฎกกับอาจารย์ดิษกฤต สาสนเวชช์
            <br />
            ดูวิดีโอเพิ่มเติมได้ที่ช่องนี้
          </div>
          <a
            href="https://www.youtube.com/c/%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B9%84%E0%B8%95%E0%B8%A3%E0%B8%9B%E0%B8%B4%E0%B8%8E%E0%B8%81%E0%B9%83%E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%95%E0%B8%B1%E0%B8%A7/featured"
            className="btn btn-warning"
            target="_blank"
            rel="noopener noreferrer"
          >
            ไปที่ Youtube
          </a>
        </div>
      </Container>
    </div>
  );
}
