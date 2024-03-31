import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

function NoSound() {
  return (
    <div className="no-sound">
      <div className="icon">
        <FontAwesomeIcon icon={faQuestionCircle} />
      </div>
      <div>
        <div className="title">ไม่มีชุดไฟล์เสียง</div>
        <div className="desc">กรุณาแจ้งผู้ดูแลระบบสำหรับข้อมูลเพิ่มเติม</div>
      </div>
    </div>
  );
}

export default NoSound;
