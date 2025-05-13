import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const isIframe = videoUrl.includes("canva.com") || videoUrl.includes("streamtape.com");

  return (
    <div>
      {isIframe ? (
        <iframe
          src={videoUrl}
          width="100%"
          height="600px"
          style={{ border: 'none' }}
          allowFullScreen
        />
      ) : (
        <video width="100%" controls>
          <source src={videoUrl} type="video/mp4" />
          Tu navegador no soporta el video.
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;
