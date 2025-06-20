import React from 'react';
import PlyrPlayer from './PlyrPlayer';

interface EnhancedPlayerProps {
  videoUrl: string;
  audioUrl?: string;
  quality?: string;
}

const EnhancedPlayer: React.FC<EnhancedPlayerProps> = ({ videoUrl }) => {
  const isYouTube = (url: string) => url.includes('youtube.com') || url.includes('youtu.be');
  // const isVimeo = (url: string) => url.includes('vimeo.com');
  const isStreamable = (url: string) => url.includes('streamable.com/');
  const isMp4OrHls = (url: string) =>
    url.endsWith('.mp4') || url.endsWith('.m3u8') || url.includes('googlevideo.com');

  if (isYouTube(videoUrl)) {
    const match = videoUrl.match(/(?:v=|youtu\.be\/)([\w-]+)/);
    const videoId = match ? match[1] : '';
    return <PlyrPlayer videoId={videoId} />;
  }

  if (isStreamable(videoUrl)) {
    const match = videoUrl.match(/streamable\.com\/([\w]+)/);
    const videoId = match ? match[1] : '';

    return (
      <div style={{
        width: '100%',
        aspectRatio: '16/9',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#000',
      }}>
        <iframe
          src={`https://streamable.com/e/${videoId}`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    );
  }

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

  return (
    <div style={{ color: '#fff', padding: '20px', textAlign: 'center' }}>
      No se puede reproducir este tipo de video.
    </div>
  );
};

export default EnhancedPlayer;
