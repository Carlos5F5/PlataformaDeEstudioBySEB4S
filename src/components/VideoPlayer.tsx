import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Helpers para detectar el tipo de fuente
  const isHls = (url: string) => url.endsWith('.m3u8');
  const isMp4 = (url: string) => url.endsWith('.mp4');
  const isVimeo = (url: string) => url.includes('vimeo.com');
  const isStreamtape = (url: string) => url.includes('streamtape.com');
  const isYouTube = (url: string) => url.includes('youtube.com') || url.includes('youtu.be');

  // HLS player con hls.js
  useEffect(() => {
    if (videoRef.current && isHls(videoUrl) && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(videoRef.current);
      return () => hls.destroy();
    } else if (videoRef.current && videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = videoUrl;
    }
  }, [videoUrl]);

  // Vimeo
  if (isVimeo(videoUrl)) {
    const vimeoId = videoUrl.split('/').pop();
    return (
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}`}
        allow="autoplay; fullscreen"
        allowFullScreen
        title="Vimeo Video"
        style={{
          width: '100%',
          height: '100%',
          border: 0,
          borderRadius: '12px',
          display: 'block',
        }}
      />
    );
  }

  // YouTube
  if (isYouTube(videoUrl)) {
    const ytIdMatch = videoUrl.match(/(?:v=|youtu\.be\/)([\w-]+)/);
    const ytId = ytIdMatch ? ytIdMatch[1] : '';
    return (
      <iframe
        src={`https://www.youtube.com/embed/${ytId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube Video"
        style={{
          width: '100%',
          height: '100%',
          border: 0,
          borderRadius: '12px',
          display: 'block',
        }}
      />
    );
  }

  // Streamtape
  if (isStreamtape(videoUrl)) {
    return (
      <iframe
        src={videoUrl}
        allowFullScreen
        title="Streamtape Video"
        style={{
          width: '100%',
          height: '100%',
          border: 0,
          borderRadius: '12px',
          display: 'block',
        }}
      />
    );
  }

  // MP4 o HLS directos
  if (isMp4(videoUrl) || isHls(videoUrl)) {
    return (
      <video
        ref={videoRef}
        controls
        className="w-full h-full rounded-xl"
        preload="metadata"
        playsInline
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '12px',
          backgroundColor: 'black',
          display: 'block',
        }}
      />
    );
  }

  // Si no es compatible
  return (
    <div style={{ color: '#fff', padding: '20px', textAlign: 'center' }}>
      No se puede reproducir este tipo de video.
    </div>
  );
};

export default VideoPlayer;
