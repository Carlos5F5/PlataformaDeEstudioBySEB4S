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



// Cursos modulares
import ModularCourses from './components/ModularCourses';
import type { ModularCourse } from './types';



// LOGOS CURSOS MODULARES

import logolinuxmodudar from './assets/logos/logoscursosmodulares/logolinuxmodular.jpg';
import logopentestingmodular from './assets/logos/logoscursosmodulares/pentestingmodularcourse.jpg';
import logopentestingwebmodular from './assets/logos/logoscursosmodulares/pentestingwebmodular.jpg';
import logopentestingmobilemodular from './assets/logos/logoscursosmodulares/hackingandroidmodular.jpg';
import logomalwaremodular from './assets/logos/logoscursosmodulares/malwaremodular.jpg'

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
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const [selectedNormalClass, setSelectedNormalClass] = useState<any>(null); // Si tienes tipado, usa tu Course type


// Componente tooltipStyle para mostrar información adicional al pasar el mouse
const tooltipStyle: React.CSSProperties = {
  position: 'absolute',
  top: '-35px',
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'rgba(0, 0, 0, 0.8)',
  color: '#fff',
  padding: '6px 12px',
  borderRadius: '8px',
  fontSize: '12px',
  whiteSpace: 'nowrap',
  opacity: 0,
  transition: 'opacity 0.3s ease, transform 0.3s ease',
  pointerEvents: 'none',
  zIndex: 1
};


// Asignacion de los cursos modulares
const [showModularCourses, setShowModularCourses] = useState(false);
 
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);


  const modularCourses: ModularCourse[] = [
  {
    title: 'Curso de Linux Profesional',
    image: logolinuxmodudar, // LOGOS CURSOS MODULOS PARA MANTENER EL ORDEN
    description: 'PRÓXIMAMENTE',
    modules: [
      {
        name: 'PRÓXIMAMENTE',
        classes: [
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/IOlIJ3FJ338' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' }

        ]
      },
      {
        name: 'PRÓXIMAMENTE',
        classes: [
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/IOlIJ3FJ338' },
          ]
        },
    ],
      
    },
    {
    title: 'Pentesting',
    image: logopentestingmodular, // LOGOS CURSOS MODULOS PARA MANTENER EL ORDEN
    description: 'ES UN MUNDO LIBRE...',
    modules: [
      {
        name: 'PRÓXIMAMENTE',
        classes: [
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/IOlIJ3FJ338' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' }

        ]
      },
      {
        name: 'PRÓXIMAMENTE',
        classes: [
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/IOlIJ3FJ338' },
          ]
        },
                {
        name: 'PRÓXIMAMENTE',
        classes: [
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/IOlIJ3FJ338' },
          ]
        },
        {
        name: 'PRÓXIMAMENTE',
        classes: [
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/IOlIJ3FJ338' },
          ]
        }
        ],
      },
      {
    title: 'Pentesting Web (Especialización)',
    image: logopentestingwebmodular, // LOGOS CURSOS MODULOS PARA MANTENER EL ORDEN
    description: 'ES UN MUNDO LIBRE...',
    modules: [
      {
        name: 'PRÓXIMAMENTE',
        classes: [
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/IOlIJ3FJ338' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' }

        ]
      },
      {
        name: 'PRÓXIMAMENTE',
        classes: [
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/IOlIJ3FJ338' },
          ]
        },
                {
        name: 'PRÓXIMAMENTE',
        classes: [
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/IOlIJ3FJ338' },
          ]
        },
        {
        name: 'PRÓXIMAMENTE',
        classes: [
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/IOlIJ3FJ338' },
          ]
        }
        ],
      },
           {
    title: 'Pentesting a Dispositivos Movivles (Especialización)',
    image: logopentestingmobilemodular, // LOGOS CURSOS MODULOS PARA MANTENER EL ORDEN
    description: 'ES UN MUNDO LIBRE...',
    modules: [
      {
        name: 'PRÓXIMAMENTE',
        classes: [
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/IOlIJ3FJ338' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' }

        ]
      },
      {
        name: 'PRÓXIMAMENTE',
        classes: [
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/IOlIJ3FJ338' },
          ]
        },
                {
        name: 'PRÓXIMAMENTE',
        classes: [
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/IOlIJ3FJ338' },
          ]
        },
        {
        name: 'PRÓXIMAMENTE',
        classes: [
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/IOlIJ3FJ338' },
          ]
        }
        ],
      },
           {
    title: 'Desarrollo de MALWARE',
    image: logomalwaremodular, // LOGOS CURSOS MODULOS PARA MANTENER EL ORDEN
    description: 'ES UN MUNDO LIBRE...',
    modules: [
      {
        name: 'PRÓXIMAMENTE',
        classes: [
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/IOlIJ3FJ338' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' }

        ]
      },
      {
        name: 'PRÓXIMAMENTE',
        classes: [
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/IOlIJ3FJ338' },
          ]
        },
                {
        name: 'PRÓXIMAMENTE',
        classes: [
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/IOlIJ3FJ338' },
          ]
        },
        {
        name: 'PRÓXIMAMENTE',
        classes: [
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/lXMskKTw3Bc' },
          { title: 'PRÓXIMAMENTE', videoUrl: 'https://youtu.be/IOlIJ3FJ338' },
          ]
        }
        ],
      }
  ];




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
      videoUrl: 'https://youtu.be/Z0TCi_YQ0PE',
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
    fontSize: '3rem',
    fontWeight: '900',
    textAlign: 'center',
    color: '#fff',
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6)',
    letterSpacing: '1px',
    marginBottom: '80px'
  }}
>
  Pepe el Maestro Haxor


           {/* Boton para Cursos Modulares */}

<div
  style={{
    position: window.innerWidth <= 768 ? 'absolute' : 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1000,
  }}
>
  <button
    onClick={() => setShowModularCourses(!showModularCourses)}
    style={{
      padding: '10px 18px',
      fontSize: '14px',
      fontWeight: 600,
      background: 'linear-gradient(90deg, #2dffcc, #34d5ff)',
      color: '#0a0a0a',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      boxShadow: '0 0 10px rgba(0, 255, 180, 0.3)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      backdropFilter: 'blur(4px)',
      textShadow: '0 0 1px rgba(255, 255, 255, 0.2)'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.05)';
      e.currentTarget.style.boxShadow = '0 0 18px rgba(0, 255, 200, 0.5)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 255, 180, 0.3)';
    }}
  >
    {showModularCourses ? 'Volver a clases únicas' : 'Cursos Modulares'}
  </button>
</div>


          </h1>

   

{/* tarjetas de cursos */}
{showModularCourses ? (
  <ModularCourses courses={modularCourses} />
) : (
  <>
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
              setSelectedNormalClass(course);
              setShowPlayerModal(true);
            }}
          />
        </div>
      ))}
    </div>

    {/* MODAL REPRODUCTOR CURSOS NORMALES */}
    {showPlayerModal && videoUrl && selectedNormalClass && (
      <div
        onClick={() => {
          setShowPlayerModal(false);
          setVideoUrl('');
          setAudioUrl('');
          setDescription('');
          setSelectedNormalClass(null);
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '900px',
            aspectRatio: '16/9',
            backgroundColor: '#000',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 0 25px rgba(0,0,0,0.7)',
            animation: 'fadeInScale 0.4s ease'
          }}
        >
          <EnhancedPlayer
            videoUrl={videoUrl}
            audioUrl={useCustomAudio ? audioUrl : undefined}
            quality={videoQuality}
          />
        </div>
      </div>
    )}
  </>
)}

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
          {videoUrl && !showPlayerModal && (
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
            {/* Íconos de redes */}

<div
  style={{
    display: 'flex',
    justifyContent: 'center',
    gap: '45px',
    marginTop: '40px',
    marginBottom: '60px',
    position: 'relative',
    
  }}
>
  {/* Ícono WhatsApp */}
  <div style={{ position: 'relative' }}>
    <a
      href="https://chat.whatsapp.com/CpuJgWjjfgRLRecwDAWSsZ"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: '#25D366',
        fontSize: '28px',
        transition: 'transform 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.2)';
        const tooltip = e.currentTarget.nextSibling as HTMLElement;
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(-10px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        const tooltip = e.currentTarget.nextSibling as HTMLElement;
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(0)';
      }}
    >
      <i className="fab fa-whatsapp"></i>
    </a>
    <div style={tooltipStyle}>Canal WhatsApp NO RULES X:</div>
  </div>

  {/* Ícono WhatsApp GRUPO CLASES */}
  <div style={{ position: 'relative' }}>
    <a
      href="https://chat.whatsapp.com/HbehXgRIOiL5QlYK3uJuS3"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: '#25D366',
        fontSize: '28px',
        transition: 'transform 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.2)';
        const tooltip = e.currentTarget.nextSibling as HTMLElement;
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(-10px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        const tooltip = e.currentTarget.nextSibling as HTMLElement;
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(0)';
      }}
    >
      <i className="fab fa-whatsapp"></i>
    </a>
    <div style={tooltipStyle}>Grupo de Clases, habemos gente de todo tipo, no te pierdas de ninguna clases !</div>
  </div>

  {/* Ícono Telegram */}
  <div style={{ position: 'relative' }}>
    <a
      href="https://t.me/+xv1FGWMZYTE2NTQ5"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: '#0088cc',
        fontSize: '28px',
        transition: 'transform 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.2)';
        const tooltip = e.currentTarget.nextSibling as HTMLElement;
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(-10px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        const tooltip = e.currentTarget.nextSibling as HTMLElement;
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(0)';
      }}
    >
      <i className="fab fa-telegram-plane"></i>
    </a>
    <div style={tooltipStyle}>Telegram: Recursos, labs, cursos y más, encontrarás mucho aquí, pero está en ti aprobecharlo y también puedes compartir recursos</div>
  </div>

  {/* Ícono Discord */}
  <div style={{ position: 'relative' }}>
    <a
      href="https://discord.gg/fBPWcQpYtq
"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: '#7289da',
        fontSize: '28px',
        transition: 'transform 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.2)';
        const tooltip = e.currentTarget.nextSibling as HTMLElement;
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(-10px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        const tooltip = e.currentTarget.nextSibling as HTMLElement;
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(0)';
      }}
    >
      <i className="fab fa-discord"></i>
    </a>
    <div style={tooltipStyle}>Servidor Discord</div>
  </div>

  {/* Ícono Hack The Box */}
  <div style={{ position: 'relative' }}>
    <a
      href="https://app.hackthebox.com/teams/overview/7060"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: '#9FEF00',
        fontSize: '28px',
        transition: 'transform 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.2)';
        const tooltip = e.currentTarget.nextSibling as HTMLElement;
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(-10px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        const tooltip = e.currentTarget.nextSibling as HTMLElement;
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(0)';
      }}
    >
      <i className="fas fa-terminal"></i>
    </a>
    <div style={tooltipStyle}>Team de Hack The Box</div>
  </div>
</div>

<footer
  style={{
    background: 'rgba(0, 0, 0, 0.75)',
    padding: 'clamp(20px, 5vw, 40px)',
    textAlign: 'center',
    color: '#ccc',
    borderTop: '1px solid rgba(0,255,0,0.05)',
    backdropFilter: 'blur(6px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'clamp(10px, 2vw, 20px)',
    marginTop: '80px'
  }}
>
  <h3
    style={{
      margin: 0,
      fontSize: 'clamp(1rem, 2vw, 1.3rem)',
      fontWeight: '600',
      color: '#fff',
      textShadow: '0 1px 3px #00ff9f'
    }}
  >
    Hecho con por <span style={{ color: '#00ff9f', fontWeight: '700' }}>SEB4S</span>
  </h3>

  <p
    style={{
      margin: 0,
      fontSize: 'clamp(0.85rem, 2vw, 1rem)',
      color: '#a7ffdf',
      textShadow: '0 0 2px #00ffaa',
      maxWidth: '90%',
      lineHeight: '1.5'
    }}
  >
    ¿Te gustó la plataforma? ¡Invítame un café!
  </p>

  <a
    href="https://coff.ee/seb4s"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      background: 'linear-gradient(90deg, #00ffcc 0%, #00ff80 100%)',
      color: '#0a0a0a',
      padding: '10px 24px',
      borderRadius: '10px',
      fontWeight: 700,
      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      textDecoration: 'none',
      boxShadow: '0 0 14px #00ffcc',
      transition: 'all 0.25s ease-in-out',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 0 24px #00ffaa';
      e.currentTarget.style.transform = 'scale(1.04)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 0 14px #00ffcc';
      e.currentTarget.style.transform = 'scale(1)';
    }}
  >
    Donar
  </a>
</footer>



            </div>
          );
        };
        
        
        export default App;