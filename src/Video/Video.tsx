import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import "./Video.css";

import youtube_channel from "../Image/youtube_channel.jpg";
import { youtubeChannelId, youtubeApiKey } from "../networkVariable";
import { youtubeVideo } from "../data/youtubeVideo";
import Overlay from "../components/Overlay";

const channelUrl =
  "https://www.youtube.com/c/%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B9%84%E0%B8%95%E0%B8%A3%E0%B8%9B%E0%B8%B4%E0%B8%8E%E0%B8%81%E0%B9%83%E0%B8%81%E0%B8%A5%E0%B9%89%E0%B8%95%E0%B8%B1%E0%B8%A7/featured";

export default function Video() {
  const [videos, setVideos] = useState<youtubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getVideos = () => {
    if (!youtubeApiKey) {
      setError("ยังไม่ได้ตั้งค่า YouTube API key");
      return;
    }

    setIsLoading(true);
    const uploadsPlaylistId = youtubeChannelId.replace(/^UC/, "UU");
    const url = "https://www.googleapis.com/youtube/v3/playlistItems";

    axios
      .get(url, {
        params: {
          part: "snippet",
          maxResults: 8,
          playlistId: uploadsPlaylistId,
          key: youtubeApiKey,
        },
      })
      .then((response) => {
        const items = response.data.items.map((item: any) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          thumbnail:
            item.snippet.thumbnails.medium?.url ??
            item.snippet.thumbnails.default?.url,
          publishedAt: item.snippet.publishedAt,
        }));
        setVideos(items);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="content">
      {isLoading && <Overlay isLoading={isLoading} message="กำลังโหลด" />}
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
            href={channelUrl}
            className="btn btn-warning"
            target="_blank"
            rel="noopener noreferrer"
          >
            ไปที่ Youtube
          </a>
        </div>

        {videos.length > 0 && (
          <div className="video-list">
            {videos.map((video) => (
              <a
                key={video.id}
                className="video-item"
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={video.thumbnail} alt={video.title} />
                <div className="video-item-title">{video.title}</div>
              </a>
            ))}
          </div>
        )}

        {error && !isLoading && videos.length === 0 && (
          <div className="video-error">{error}</div>
        )}
      </Container>
    </div>
  );
}
