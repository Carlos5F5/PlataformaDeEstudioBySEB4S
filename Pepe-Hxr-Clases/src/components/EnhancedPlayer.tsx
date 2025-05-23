import React from 'react';
import PlyrPlayer from './PlyrPlayer';

interface EnhancedPlayerProps {
  videoUrl: string;
  audioUrl?: string;
  quality?: string;
}

const EnhancedPlayer: React.FC<EnhancedPlayerProps> = ({ videoUrl }) => {
  const isYouTube = (url: string) => url.includes('youtube.com') || url.includes('youtu.be');
  const isVimeo = (url: string) => url.includes('vimeo.com');
  const isStreamtape = (url: string) => url.includes('streamtape.com');
  const isMp4OrHls = (url: string) =>
    url.endsWith('.mp4') || url.endsWith('.m3u8') || url.includes('googlevideo.com');

  if (isYouTube(videoUrl)) {
    const match = videoUrl.match(/(?:v=|youtu\.be\/)([\w-]+)/);
    const videoId = match ? match[1] : '';
    return <PlyrPlayer videoId={videoId} />;
  }

  // Fallback: Usa tu reproductor nativo si no es YouTube
  if (isMp4OrHls(videoUrl)) {
    return (
      <video
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

export default EnhancedPlayer;
