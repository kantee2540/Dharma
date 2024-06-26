import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
// import { Link } from 'react-router-dom'
import { baseUrl, resourceUrl } from "../networkVariable";
// import tawanron from '../Image/tawanron.jpg'
import axios from "axios";
import "./Cover.css";

export default function Cover() {
  const [cover, setCover] = useState("");
  useEffect(() => {
    fetchData();
  });

  const fetchData = () => {
    let url = baseUrl + "/home/cover";
    axios({
      url: url,
    })
      .then((response) => {
        let data = response.data.cover;
        setCover(data);
      })
      .catch((error) => {});
  };

  return (
    <div
      className="cover-image"
      style={{ backgroundImage: cover ? `url('${resourceUrl}${cover}')` : "" }}
    >
      <Container>
        {/* <Row>
            <Col md={6} lg={7} xl={7}></Col>
            <Col xs={12} md={6} lg={5}>
              <div className="schedule-block">
                <div className="schedule-title d-flex justify-content-between">
                  <b>กำหนดการปฏิบัติธรรม</b>
                  <Link to="/schedule">ดูเพิ่มเติม</Link>
                </div>
              
                <div className="next-up">
                  <div className="event-title">วันเข้าพรรษา</div>
                  <div className="event-date">20 กรกฏาคม พ.ศ.2563 - 25 กรกฏาคม พ.ศ.2563</div>
                  <div className="event-location">ศูนย์อบรม</div>
                </div>
                <div className="comming-up">
                  <div className="event-title">วันเข้าพรรษา</div>
                  <div className="event-date">20 กรกฏาคม พ.ศ.2563 - 25 กรกฏาคม พ.ศ.2563</div>
                  <div className="event-location">ศูนย์อบรม</div>
                </div>
              </div>
            </Col>
          </Row> */}
      </Container>
    </div>
  );
}
