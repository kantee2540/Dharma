import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";

import Home from "./Home/Home";
import Schedule from "./Schedule/Schedule";
import Video from "./Video/Video";
import About from "./About/About";
import CookieConsent from "./components/CookieConsent";
import SoundFile from "./Sound/SoundFile";
import BaseSound from "./Sound/BaseSound";
dayjs.extend(buddhistEra);
dayjs.locale("th");

export default function App() {
  const [isCookieAccepted, setIsCookieAccepted] = useState(
    localStorage.getItem("cookie-accept") === "true" ? true : false
  );

  const onAcceptCookie = () => {
    localStorage.setItem("cookie-accept", "true");
    setIsCookieAccepted(true);
  };

  useEffect(() => {
    onAcceptCookie();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <div className="App">
          <UserStack />
        </div>
      </BrowserRouter>
      <CookieConsent isAccepted={isCookieAccepted} onAccept={onAcceptCookie} />
    </div>
  );
}

function UserStack() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/sound" element={<BaseSound />} />
        <Route path="/video" element={<Video />} />
        <Route path="/about" element={<About />} />
        <Route path="/sound/:id" element={<SoundFile />} />
      </Routes>
      <hr style={{ marginTop: 40, marginBottom: 0 }} />
      <Footer />
    </>
  );
}
