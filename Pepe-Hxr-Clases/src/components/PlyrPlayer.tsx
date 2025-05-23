import React, { useEffect, useRef } from 'react';
import Plyr from 'plyr';

interface PlyrPlayerProps {
  videoId: string;
}

const PlyrPlayer: React.FC<PlyrPlayerProps> = ({ videoId }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Inyectar el iframe manualmente
    containerRef.current.innerHTML = `
      <div class="plyr__video-embed" id="player-container" style="position: relative">
        <iframe
          src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&iv_load_policy=3&showinfo=0&controls=1&disablekb=1"
          allowfullscreen
          allow="autoplay"
          frameborder="0"
          style="pointer-events: none; width: 100%; height: 100%; border: 0"
        ></iframe>
        <div class="plyr-overlay-mask" style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          z-index: 3;
          pointer-events: none;
        "></div>
      </div>
    `;

    const player = new Plyr('#player-container', {
      controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
    });

    // Mascara visual cuando el video está en pausa
    player.on('pause', () => {
      const iframe = containerRef.current?.querySelector('iframe');
      if (iframe) iframe.style.pointerEvents = 'none';
    });

    player.on('play', () => {
      const iframe = containerRef.current?.querySelector('iframe');
      if (iframe) iframe.style.pointerEvents = 'none';
    });

    return () => {
      player.destroy();
    };
  }, [videoId]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default PlyrPlayer;
