import React, { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

// Definición de props con tipos adecuados
interface EnhancedPlayerProps {
  videoUrl: string;
  audioUrl?: string;
  quality?: string; // Nueva prop para la calidad del video
}

const EnhancedPlayer: React.FC<EnhancedPlayerProps> = ({ videoUrl, audioUrl, quality = 'auto' }) => {
  // Referencias para el reproductor y elementos de audio
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Plyr | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastTapRef = useRef<number>(0);

  useEffect(() => {
    // Limpiar cualquier instancia anterior
    if (playerRef.current) {
      playerRef.current.destroy();
    }

    // Crear el elemento de video para YouTube
    const videoElement = document.createElement('div');
    videoElement.className = 'plyr__video-embed';
    
    // Extraer el ID del video de YouTube desde la URL
    const videoId = extractYoutubeID(videoUrl);
    
    // Configurar el iframe para YouTube con parámetros de calidad
    videoElement.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${videoId}?origin=${window.location.origin}&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"
        allowfullscreen
        allowtransparency
        allow="autoplay"
      ></iframe>
    `;
    
    // Añadir el elemento al contenedor
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(videoElement);
    }
    
    // Configuración de Plyr
    const options = {
      captions: { active: true, update: true },
      controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'mute',
        'volume',
        'captions',
        'settings',
        'pip',
        'fullscreen',
      ],
      settings: ['captions', 'quality', 'speed', 'loop'],
      youtube: { 
        noCookie: true, 
        rel: 0, 
        showinfo: 0, 
        iv_load_policy: 3, 
        modestbranding: 1
      }
    };
    
    // Inicializar Plyr
    if (containerRef.current) {
      playerRef.current = new Plyr(containerRef.current.querySelector('.plyr__video-embed') as HTMLElement, options);
    }

    // Configuración de calidad de video si está disponible el parámetro
    if (playerRef.current && quality !== 'auto') {
      playerRef.current.once('ready', () => {
        // Si el reproductor está listo, intentar establecer la calidad
        try {
          // Acceder a la API de YouTube para controlar la calidad
          const iframe = containerRef.current?.querySelector('iframe');
          if (iframe) {
            const player = iframe as any;
            // Mapear la calidad a los valores que acepta YouTube
            const qualityMapping: {[key: string]: string} = {
              '240p': 'small',
              '360p': 'medium',
              '480p': 'large',
              '720p': 'hd720',
              '1080p': 'hd1080'
            };
            
            // Si el reproductor tiene la API de YouTube cargada
            if (player.contentWindow && player.contentWindow.postMessage) {
              // Usar postMessage para establecer la calidad
              const qualityValue = qualityMapping[quality] || 'default';
              player.contentWindow.postMessage(JSON.stringify({
                event: 'command',
                func: 'setPlaybackQuality',
                args: [qualityValue]
              }), '*');
            }
          }
        } catch (error) {
          console.error('Error al establecer la calidad del video:', error);
        }
      });
    }
    
    // Configuración del audio si está disponible
    if (audioUrl) {
      // Crear o actualizar el elemento de audio
      if (!audioRef.current) {
        audioRef.current = new Audio();
      }
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      
      // Sincronizar audio con video
      if (playerRef.current) {
        // Función de sincronización
        const syncAudio = () => {
          if (audioRef.current && playerRef.current) {
            // Si el video está reproduciendo, también reproduce el audio
            if (playerRef.current.playing) {
              audioRef.current.play().catch(e => console.error('Error al reproducir audio:', e));
              // Sincronizar tiempo
              if (Math.abs(audioRef.current.currentTime - playerRef.current.currentTime) > 0.3) {
                audioRef.current.currentTime = playerRef.current.currentTime;
              }
            } else {
              // Si el video está pausado, pausa el audio
              audioRef.current.pause();
            }
          }
        };
        
        // Eventos de reproductor para mantener sincronización
        playerRef.current.on('play', syncAudio);
        playerRef.current.on('pause', syncAudio);
        playerRef.current.on('seeking', syncAudio);
        playerRef.current.on('timeupdate', syncAudio);
      }
    }
    
    // Agregar controles táctiles y de teclado
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!playerRef.current) return;
      
      // Espacio para reproducir/pausar
      if (e.code === 'Space') {
        e.preventDefault();
        playerRef.current.togglePlay();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    // Detectar toques en dispositivos móviles
    const handleTouch = (e: TouchEvent) => {
      e.preventDefault();
      const now = new Date().getTime();
      const timeSince = now - lastTapRef.current;
      
      if (timeSince < 300) {
        // Doble toque detectado
        if (playerRef.current) {
          playerRef.current.togglePlay();
        }
      }
      
      lastTapRef.current = now;
    };
    
    // Agregar eventos touch y click al elemento del reproductor
    const plyrElement = containerRef.current?.querySelector('.plyr');
    if (plyrElement) {
      plyrElement.addEventListener('touchstart', handleTouch as EventListener);
      plyrElement.addEventListener('click', () => {
        if (playerRef.current) {
          playerRef.current.togglePlay();
        }
      });
    }
    
    // Limpieza cuando el componente se desmonta
    return () => {
      if (playerRef.current) {
        // Limpiar eventos antes de destruir
       // playerRef.current.off('play');
       // playerRef.current.off('pause');
       // playerRef.current.off('seeking');
       // playerRef.current.off('timeupdate');
       // playerRef.current.destroy();
      }
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      document.removeEventListener('keydown', handleKeyDown);
      
      if (plyrElement) {
        plyrElement.removeEventListener('touchstart', handleTouch as EventListener);
        plyrElement.removeEventListener('click', () => {
          if (playerRef.current) {
            playerRef.current.togglePlay();
          }
        });
      }
    };
  }, [videoUrl, audioUrl, quality]); // Dependencias del efecto

  // Función auxiliar para extraer ID de YouTube desde URL
  const extractYoutubeID = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        borderRadius: '12px',
        overflow: 'hidden', 
        backgroundColor: 'black' 
      }}
    >
      {/* El contenido se insertará dinámicamente */}
    </div>
  );
};

export default EnhancedPlayer;