import React from 'react'
import { Container, Tabs, Tab, Row, Col } from 'react-bootstrap'
import './Schedule.css'

export default function Schedule() {
    return (
        <div className="content">
            <Container>
                <div className="head-title">ตารางกำหนดการ</div>
                <Tabs>
                    <Tab eventKey="all" title="ทั้งหมด">
                        <div className="schedule-field">
                            <div className="comming-up-schedule">
                                <b>ปฏิบัติธรรมต่อไป</b>
                                <hr/>
                                <ScheduleItemComming/>
                            </div>
                            <div className="next-up-schedule">
                                <b>ปฏิบัติธรรมหน้า</b>
                                <hr/>
                                <ScheduleItem/>
                                <ScheduleItem/>
                                <ScheduleItem/>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="tawanron" title="ตะวันรอน">
                        <div className="schedule-field">
                            <div className="comming-up-schedule">
                                <b>ปฏิบัติธรรมต่อไป</b>
                                <hr/>
                                <ScheduleItemComming/>
                            </div>
                            <div className="next-up-schedule">
                                <b>ปฏิบัติธรรมหน้า</b>
                                <hr/>
                                <ScheduleItem/>
                                <ScheduleItem/>
                                <ScheduleItem/>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="raiwa" title="บ้านไรวา">
                        <div className="schedule-field">
                            <div className="comming-up-schedule">
                                <b>ปฏิบัติธรรมต่อไป</b>
                                <hr/>
                                <ScheduleItemComming/>
                            </div>
                            <div className="next-up-schedule">
                                <b>ปฏิบัติธรรมหน้า</b>
                                <hr/>
                                <ScheduleItem/>
                                <ScheduleItem/>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="bansuan" title="บ้านสวน">
                        <div className="schedule-field">
                            <div className="comming-up-schedule">
                                <b>ปฏิบัติธรรมต่อไป</b>
                                <hr/>
                                <ScheduleItemComming/>
                            </div>
                            <div className="next-up-schedule">
                                <b>ปฏิบัติธรรมหน้า</b>
                                <hr/>
                                <ScheduleItem/>
                                <ScheduleItem/>
                                <ScheduleItem/>
                                <ScheduleItem/>
                                <ScheduleItem/>
                                <ScheduleItem/>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="sarathum" title="ศาลาธรรม">
                        <div className="schedule-field">
                            <div className="comming-up-schedule">
                                <b>ปฏิบัติธรรมต่อไป</b>
                                <hr/>
                                <ScheduleItemComming/>
                            </div>
                            <div className="next-up-schedule">
                                <b>ปฏิบัติธรรมหน้า</b>
                                <hr/>
                                <ScheduleItem/>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </Container>
        </div>
    )
}

class ScheduleItem extends React.Component{
    render(){
        return(
            <div className="schedule-item">
                <div className="title">วันเข้าพรรษา</div>
                <div className="date">20 กรกฏาคม พ.ศ.2563 - 25 กรกฏาคม พ.ศ.2563</div>
                <div className="date">อ.ดิษกฤต สาสนเวชช์</div>
                <div className="location">ตะวันลอน</div>
            </div>
        )
    }
}

class ScheduleItemComming extends React.Component{
    render(){
        return(
            <div className="schedule-item-comming">
                <div className="title">วันเข้าพรรษา</div>
                <div className="date">20 กรกฏาคม พ.ศ.2563 - 25 กรกฏาคม พ.ศ.2563</div>
                <div className="date">อ.ดิษกฤต สาสนเวชช์</div>
            </div>
        )
    }
}