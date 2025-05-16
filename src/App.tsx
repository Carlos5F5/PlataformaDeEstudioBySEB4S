// src/App.tsx
import React, { useState } from 'react';
import CourseCard from './components/CourseCards';
import EnhancedPlayer from './components/EnhancedPlayer';
import WriteUpsSection from './components/WriteUpsSection';

import logoClase1 from './assets/logos/arquitecturadecomputadoraslogo.jpg';
import logoClase2 from './assets/logos/Anonimato.jpg';
import logoClase3 from './assets/logos/clasepythondesdecero.jpg';
import logoClase4 from './assets/logos/claseredes.jpg';

import pepehxrfondo from '/videosfondo/pepehxrfondo.mp4';

const App: React.FC = () => {
  /* -------------------- state -------------------- */
  const [videoUrl, setVideoUrl]       = useState('');
  const [audioUrl, setAudioUrl]       = useState('');
  const [description, setDescription] = useState('');
  const [useCustomAudio, setUseCustomAudio] = useState(false);
  const [videoQuality, setVideoQuality]     = useState('auto');

  /* -------------------- data --------------------- */
  const courses = [
    {
      title: 'Clase 01 - Arquitectura de Computadoras',
      image: logoClase1,
      videoUrl: 'https://youtu.be/WasDk4qlD1c',
      audioUrl: '',
      description: 'Introducción básica sobre hardware y componentes.',
    },
    {
      title: 'Clase 02 - Anonimato en la red',
      image: logoClase2,
      videoUrl: 'https://youtu.be/lLMM7CdhgEk',
      audioUrl: '',
      description: 'Uso de herramientas para navegar de forma anónima.',
    },
    {
      title: 'Clase 03 - Python desde cero',
      image: logoClase3,
      videoUrl: 'https://youtu.be/pknxAdkG5C0',
      audioUrl: '',
      description: 'Aprende a programar desde cero usando Python.',
    },
    {
      title: 'Clase 04 - Redes y comunicaciones',
      image: logoClase4,
      videoUrl: 'https://youtu.be/81pVIBy66tY',
      audioUrl: '',
      description: 'Conceptos básicos de redes y protocolos.',
    },
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

  /* ------------- render -------------- */
  return (
    <div
      className="app-container"
      style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}
    >
      {/* 🎥 video de fondo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      >
        <source src={pepehxrfondo} type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>

      {/* capa oscura */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,.5)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* -------------------- contenido -------------------- */}
      <div style={{ position: 'relative', zIndex: 1, padding: '40px 0' }}>
        <div
          style={{
            margin: '0 auto',
            maxWidth: '1300px',
            padding: '0 20px',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '2.5rem', marginBottom: '30px', color: '#fff' }}>
            Pepe el Maestro Haxor
          </h1>

          {/* tarjetas de cursos */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '40px',
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
            <p style={{ marginTop: '25px', color: '#ccc' }}>{description}</p>
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
                  margin: '20px 0',
                }}
              >
                {/* selector calidad */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <label style={{ color: '#fff' }}>Calidad:</label>
                  <select
                    value={videoQuality}
                    onChange={handleQualityChange}
                    style={{
                      padding: '6px 12px',
                      background: '#333',
                      color: '#fff',
                      border: '1px solid #555',
                      borderRadius: '8px',
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
                      padding: '6px 12px',
                      background: '#444',
                      color: '#fff',
                      borderRadius: '8px',
                      cursor: 'pointer',
                    }}
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
                        padding: '6px 12px',
                        background: '#666',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                      }}
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
