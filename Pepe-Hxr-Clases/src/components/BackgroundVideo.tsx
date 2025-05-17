import React, { useEffect, useRef } from 'react';

interface BackgroundVideoProps {
  videoUrl: string;
  fallbackImageUrl?: string;
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  playbackSpeed?: number;
  overlay?: boolean;
  overlayOpacity?: number;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  videoUrl,
  fallbackImageUrl,
  muted = true,
  loop = true,
  autoPlay = true,
  playbackSpeed = 1,
  overlay = true,
  overlayOpacity = 0.5
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Configurar el video cuando el componente se monta
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      // Configurar propiedades del video
      videoElement.muted = muted;
      videoElement.loop = loop;
      videoElement.autoplay = autoPlay;
      videoElement.playbackRate = playbackSpeed;
      
      // Intenta reproducir el video automáticamente
      if (autoPlay) {
        videoElement.play().catch(error => {
          console.error('Error al reproducir video de fondo:', error);
        });
      }
    }
  }, [videoUrl, muted, loop, autoPlay, playbackSpeed]);

  return (
    <div className="background-video-container">
      {/* El video de fondo */}
      <video
        ref={videoRef}
        className="background-video"
        preload="auto"
        playsInline
        muted={muted}
        loop={loop}
        autoPlay={autoPlay}
      >
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl.replace('.mp4', '.webm')} type="video/webm" />
        <source src={videoUrl.replace('.mp4', '.ogv')} type="video/ogg" />
        <source src={videoUrl.replace('.mp4', '.mov')} type="video/quicktime" />
        <source src={videoUrl.replace('.mp4', '.m4v')} type="video/x-m4v" />
        Tu navegador no soporta videos HTML5.
      </video>
      
      {/* Imagen de respaldo en caso de que el video no cargue */}
      {fallbackImageUrl && (
        <div 
          className="background-fallback" 
          style={{ 
            backgroundImage: `url(${fallbackImageUrl})`,
            display: 'none' // Se mostrará mediante CSS si el video falla
          }}
        />
      )}
      
      {/* Capa de superposición para mejorar la legibilidad del contenido */}
      {overlay && (
        <div 
          className="background-overlay" 
          style={{ 
            backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` 
          }}
        />
      )}
    </div>
  );
};

export default BackgroundVideo;