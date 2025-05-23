import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  console.log('🔍 Video URL recibida:', videoUrl); // Muestra el link en consola

  // Detectores de tipo de fuente
  const isHls = (url: string) => url.endsWith('.m3u8');
  const isMp4 = (url: string) => url.endsWith('.mp4');
  const isGoogleStream = (url: string) => url.includes('googlevideo.com');
  const isVimeo = (url: string) => url.includes('vimeo.com');
  const isStreamtape = (url: string) => url.includes('streamtape.com');
  const isYouTube = (url: string) => url.includes('youtube.com') || url.includes('youtu.be');

  // Reproductor HLS.js
  useEffect(() => {
    if (videoRef.current && isHls(videoUrl) && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(videoRef.current);
      return () => hls.destroy();
    } else if (videoRef.current && isHls(videoUrl)) {
      videoRef.current.src = videoUrl;
    }
  }, [videoUrl]);

  // Opciones con iframe (solo si quieres mantenerlos)
  if (isVimeo(videoUrl)) {
    const vimeoId = videoUrl.split('/').pop();
    return (
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}`}
        allow="autoplay; fullscreen"
        allowFullScreen
        title="Vimeo Video"
        style={{ width: '100%', height: '100%', border: 0, borderRadius: '12px' }}
      />
    );
  }

  if (isYouTube(videoUrl)) {
    const ytIdMatch = videoUrl.match(/(?:v=|youtu\.be\/)([\w-]+)/);
    const ytId = ytIdMatch ? ytIdMatch[1] : '';
    return (
      <iframe
        src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1&showinfo=0&controls=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube Video"
        style={{ width: '100%', height: '100%', border: 0, borderRadius: '12px' }}
      />
    );
  }

  if (isStreamtape(videoUrl)) {
    return (
      <iframe
        src={videoUrl}
        allowFullScreen
        title="Streamtape Video"
        style={{ width: '100%', height: '100%', border: 0, borderRadius: '12px' }}
      />
    );
  }

  // Reproductor nativo HTML5 para MP4, HLS, GoogleVideo
  if (
    isMp4(videoUrl) ||
    isHls(videoUrl) ||
    videoUrl.includes('googlevideo.com') ||
    videoUrl.includes('videoplayback')
  ) {
    return (
      <video
        ref={videoRef}
        src={!isHls(videoUrl) ? videoUrl : undefined}
        controls
        autoPlay
        playsInline
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          borderRadius: '12px',
          display: 'block',
        }}
      />
    );
  }

  // Si el tipo no es compatible
return (
  <video
    ref={videoRef}
    src={videoUrl}
    controls
    autoPlay
    playsInline
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
      borderRadius: '12px',
      display: 'block',
    }}
    onError={(e) => {
      console.error('❌ Error al reproducir video:', e);
    }}
  />
);
}

export default VideoPlayer;
