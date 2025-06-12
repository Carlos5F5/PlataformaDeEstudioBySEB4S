// src/App.tsx
import React, { useState, useEffect, useRef } from 'react';
import CourseCard from './components/CourseCards';
import EnhancedPlayer from './components/EnhancedPlayer';
import WriteUpsSection from './components/WriteUpsSection';


// Importando logos de las clases
import logoKali from './assets/logos/intallKali_Linux_Logo.jpg';
import logoobsidian from './assets/logos/obsidian_logo.jpg';
import logoClase1 from './assets/logos/arquitecturadecomputadoraslogo.jpg';
import logoClase2 from './assets/logos/Anonimato.jpg';
import logoClase3 from './assets/logos/clasepythondesdecero.jpg';
import logoClase4 from './assets/logos/claseredes.jpg';
import logoClase5 from './assets/logos/logoCrackingcontraseñas.jpg';
// import logoDeepWeb from './assets/logos/logoDeepWeb.jpg';
// import logoclase6 from './assets/logos/OsintLogo.jpg'
// Importando estilos 
import './mobile-player.css';
// import type { Course } from './types';

// Componente principal de la aplicación
const App: React.FC = () => {
  /* -------------------- state -------------------- */
  const [videoUrl, setVideoUrl] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [description, setDescription] = useState('');
  const [useCustomAudio, setUseCustomAudio] = useState(false);
  const [videoQuality, setVideoQuality] = useState('auto');
  
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);

  // Función para convertir YouTube Shorts URL a formato embebible
  const getYouTubeVideoUrl = (url: string) => {
    // Extraer ID del video de YouTube Shorts
    const match = url.match(/youtube\.com\/shorts\/([^/?]+)/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1`;
    }
    return url;
  };

  /* -------------------- data (TARJETAS DE LOS MÓDULOS) --------------------- */
  const courses = [
        {
      id: 1,
      title: 'Instalación de nuestro Kali Linux ',
      image: logoKali,
      videoUrl: 'https://youtu.be/Dv3qoKJ5XtA',
      audioUrl: '',
      description: 'Proceso de instalación de Kali Linux y su arquitectura.',
      isModular: false,
    },
    {
      id: 2,
      title: 'Toma de apuntes con Obsidian',
      image: logoobsidian,
      videoUrl: 'https://youtu.be/JikJ_-zCkLE',
      audioUrl: '',
      description: 'Aprende a usar Obsidian, te ayudará en las próximas clases.',
      isModular: false,
    },
    {
      id: 3,
      title: 'Clase 01 - Arquitectura de Computadoras',
      image: logoClase1,
      videoUrl: 'https://youtu.be/WasDk4qlD1c',
      audioUrl: '',
      description: 'Introducción básica sobre hardware y componentes.',
      isModular: false,
    },
    {
      id: 4,
      title: 'Clase 02 - Anonimato en la red',
      image: logoClase2,
      videoUrl: 'https://youtu.be/lLMM7CdhgEk',
      audioUrl: '',
      description: 'Uso de herramientas para navegar de forma anónima.',
      isModular: false,
    },
    {
      id: 5,
      title: 'Clase 03 - Python desde cero',
      image: logoClase3,
      videoUrl: 'https://youtu.be/pknxAdkG5C0',
      audioUrl: '',
      description: 'Aprende a programar desde cero usando Python.',
      isModular: false,
    },
    {
      id: 6,
      title: 'Clase 04 - Redes y comunicaciones',
      image: logoClase4,
      videoUrl: 'https://youtu.be/81pVIBy66tY',
      audioUrl: '',
      description: 'Conceptos básicos de redes y protocolos.',
      isModular: false,
    },
/*     {
      id: 7,
      title: 'Clase 05 - TALLER 1 - DeepWeb',
      image: logoDeepWeb,
      videoUrl: 'https://www.youtube.com/watch?v=Dv3qoKJ5XtA',
      audioUrl: '',
      description: 'Aprende como funciona la DeepWeb y como formar parte de ella.',
      isModular: false,
    }, */
    {
      id: 8,
      title: 'Clase 05 - TALLER 2 - Cracking de contraseñas',
      image: logoClase5,
      videoUrl: 'https://www.youtube.com/watch?v=Dv3qoKJ5XtA',
      audioUrl: '',
      description: 'Técnicas de cracking de contraseñas y seguridad.',
      isModular: false,
    },
/*         {
      id: 9,
      title: 'Clase 06 - OSINT ',
      image: logoclase6,
      videoUrl: 'https://www.youtube.com/watch?v=Dv3qoKJ5XtA',
      audioUrl: '',
      description: 'Mira lo que otros no pueden, mira lo oculto.',
      isModular: false,
    }, */
  ];

  /* ------------- handlers ------------- */
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioUrl(URL.createObjectURL(file));
      setUseCustomAudio(true);
    }
  };

  const handleQualityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVideoQuality(e.target.value);
  };

  // Efecto para manejar el video de fondo
  useEffect(() => {
    const handleVideoLoad = () => {
      // Función para manejar cuando el video se carga
      console.log('Video de fondo cargado');
    };

    const backgroundVideo = backgroundVideoRef.current;
    if (backgroundVideo) {
      backgroundVideo.addEventListener('loadeddata', handleVideoLoad);
      backgroundVideo.addEventListener('canplay', handleVideoLoad);
      
      return () => {
        backgroundVideo.removeEventListener('loadeddata', handleVideoLoad);
        backgroundVideo.removeEventListener('canplay', handleVideoLoad);
      };
    }
  }, []);

  /* ------------- render -------------- */
  return (
    <div
      className="app-container"
      style={{ 
        position: 'relative', 
        minHeight: '100vh', 
        width: '100%',
        overflow: 'hidden' 
      }}
    >
      {/* 🎥 Video de fondo usando iframe para YouTube Shorts */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -2,
          overflow: 'hidden'
        }}
      >
        <iframe
          src={getYouTubeVideoUrl('https://youtube.com/shorts/IOlIJ3FJ338')}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vw',
            height: '177.78vw', // 16:9 aspect ratio
            minWidth: '177.78vh',
            minHeight: '100vh',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            border: 'none'
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Background Video"
        />
      </div>

      {/* Capa oscura para mejorar legibilidad */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.6)',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />

      {/* -------------------- contenido -------------------- */}
      <div 
        style={{ 
          position: 'relative', 
          zIndex: 1, 
          padding: '40px 0',
          minHeight: '100vh'
        }}
      >
        <div
          style={{
            margin: '0 auto',
            maxWidth: '1300px',
            padding: '0 20px',
            textAlign: 'center',
          }}
        >
          <h1 
            style={{ 
              fontSize: '2.5rem', 
              marginBottom: '30px', 
              color: '#fff',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
            }}
          >
            Pepe el Maestro Haxor
          </h1>

          {/* tarjetas de cursos */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '40px',
              marginBottom: '40px'
            }}
          >
            {courses.map((course, i) => (
              <div key={i} style={{ width: '260px' }}>
                <CourseCard
                  course={course}
                  onSelect={() => {
                    setVideoUrl(course.videoUrl);
                    setAudioUrl(course.audioUrl || '');
                    setDescription(course.description);
                    setUseCustomAudio(!!course.audioUrl);
                  }}
                />
              </div>
            ))}
          </div>

          {description && (
            <p 
              style={{ 
                marginTop: '25px', 
                color: '#ccc',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                fontSize: '16px'
              }}
            >
              {description}
            </p>
          )}

          {/* reproductor + controles */}
          {videoUrl && (
            <>
              {/* controles */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: '20px',
                  margin: '30px 0',
                  background: 'rgba(0, 0, 0, 0.7)',
                  padding: '20px',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)'
                }}
              >
                {/* selector calidad */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <label style={{ color: '#fff', fontWeight: '500' }}>Calidad:</label>
                  <select
                    value={videoQuality}
                    onChange={handleQualityChange}
                    style={{
                      padding: '8px 12px',
                      background: '#333',
                      color: '#fff',
                      border: '1px solid #555',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="auto">Automática</option>
                    <option value="240p">240p</option>
                    <option value="360p">360p</option>
                    <option value="480p">480p</option>
                    <option value="720p">720p</option>
                    <option value="1080p">1080p</option>
                  </select>
                </div>

                {/* audio personalizado */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <label
                    htmlFor="audio-upload"
                    style={{
                      padding: '8px 16px',
                      background: '#444',
                      color: '#fff',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'background 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#555'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#444'}
                  >
                    Audio personalizado
                  </label>
                  <input
                    id="audio-upload"
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                    style={{ display: 'none' }}
                  />
                  {useCustomAudio && (
                    <button
                      onClick={() => {
                        setUseCustomAudio(false);
                        setAudioUrl('');
                      }}
                      style={{
                        padding: '8px 16px',
                        background: '#666',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        transition: 'background 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#777'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#666'}
                    >
                      Quitar audio
                    </button>
                  )}
                </div>
              </div>

              {/* contenedor reproductor */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '60px'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    maxWidth: '900px',
                    aspectRatio: '16/9',
                    position: 'relative',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
                    background: '#000'
                  }}
                >
                  <EnhancedPlayer
                    videoUrl={videoUrl}
                    audioUrl={useCustomAudio ? audioUrl : undefined}
                    quality={videoQuality}
                  />
                </div>
              </div>
            </>
          )}

          {/* --------- APARTADO WRITE-UPS --------- */}
                  <WriteUpsSection />
                </div>
              </div>
            </div>
          );
        };
        
        export default App;