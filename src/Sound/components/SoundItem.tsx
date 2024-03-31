import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Sound.css";
import dayjs from "dayjs";

type SoundItemProps = {
  id: number;
  title: string;
  date: string;
  img: string;
};

function SoundItem({ id, title, date, img }: SoundItemProps) {
  const formatDate = (date: string) => {
    let toDate = new Date(date);
    let formatted = dayjs(toDate).format("D MMMM BBBB");
    return formatted;
  };

  const link = `/sound/${id}`;
  return (
    <Col className="sound-item" xs={12} md={6} lg={4}>
      <Link className="sound-item-container" to={link}>
        <img className="sound-img" src={img} alt="cover" />
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

export default SoundItem;
