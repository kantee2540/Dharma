import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import "./Sound.css";
import { resourceUrl } from "../networkVariable";
import Overlay from "../components/Overlay";
import Default from "../Image/default_image.png";
import CompactButton from "../components/CompactButton";
import { faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";
import SoundItem from "./components/SoundItem";
import SoundNoItem from "./components/SoundNoItem";
import { sound } from "../data/sound";
import { axiosClient } from "../utils/axiosClient";

function Sound() {
  const [soundItem, setSoundItem] = useState<sound[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const size = 9;
  const [isLast, setIsLast] = useState(false);

  const fetchSoundList = () => {
    setIsLoading(true);
    const query = {
      page: page,
      size: size,
    };
    axiosClient
      .get("/sound", {
        params: query,
      })
      .then((response) => {
        const data = response.data;

        setSoundItem((prev) => [...prev, ...data]);

        if (data.length < size) {
          setIsLast(true);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const onNextPage = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    fetchSoundList();
  }, [page]);

  return (
    <div className="content">
      {isLoading || error !== null ? (
        <Overlay
          isLoading={isLoading}
          message={error == null ? "กำลังโหลด" : error}
        />
      ) : (
        ""
      )}
      <Container>
        <div className="head-title">ฟังเสียง</div>
        <Row className="sound-content">
          {soundItem.map((item, key) => (
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
        {!isLast && soundItem.length > 0 ? (
          <CompactButton
            icon={faArrowAltCircleDown}
            title="โหลดเพิ่มเติม"
            justifyContent="center"
            hoverColor="dodgerblue"
            onClick={() => onNextPage()}
          />
        ) : null}
        {soundItem.length === 0 ? <SoundNoItem /> : null}
      </Container>
    </div>
  );
}

export default Sound;
