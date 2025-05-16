import React, { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

interface PlyrPlayerProps {
  videoId: string;
}

const PlyrPlayer: React.FC<PlyrPlayerProps> = ({ videoId }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Inyectamos manualmente el iframe dentro del div
    containerRef.current.innerHTML = `
      <div class="plyr__video-embed" id="player">
        <iframe
          src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&iv_load_policy=3"
          allowfullscreen
          allow="autoplay"
        ></iframe>
      </div>
    `;

    const player = new Plyr('#player', {
      controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
    });

    return () => {
      player.destroy();
    };
  }, [videoId]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden' }}
    />
  );
};

export default PlyrPlayer;
