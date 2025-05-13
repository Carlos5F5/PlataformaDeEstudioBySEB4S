import React, { useState } from 'react';
import CourseCard from './components/CourseCards';
import VideoPlayer from './components/VideoPlayer';
import logoClase1 from './assets/logos/arquitecturadecomputadoraslogo.jpg';
import logoClase2 from './assets/logos/Anonimato.jpg';
import logoClase3 from './assets/logos/clasepythondesdecero.jpg';
import logoClase4 from './assets/logos/claseredes.jpg';

const App: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');

  const courses = [
    {
      title: 'Clase 01 - Arquitectura de Computadoras',
      image: logoClase1,
      videoUrl: 'https://streamtape.com/e/pxodYrBooOIr69r/Clase-01.mp4',
      description: 'Introducción básica sobre hardware y componentes.',
    },
    {
      title: 'Clase 02 - Anonimato en la red',
      image: logoClase2,
      videoUrl: 'https://streamtape.com/e/8qPkrZdPo8SXgD/Clase-02.mp4',
      description: 'Uso de herramientas para navegar de forma anónima.',
    },
    {
      title: 'Clase 03 - Python desde cero',
      image: logoClase3,
      videoUrl: 'https://streamtape.com/e/L1aWDMz6mPCRROv/Clase-03.mp4',
      description: 'Aprende a programar desde cero usando Python.',
    },
    {
      title: 'Clase 04 - Redes y comunicaciones',
      image: logoClase4,
      videoUrl: 'https://streamtape.com/e/Gk8wBKDKWVH1kx3/Clase-04.mp4',
      description: 'Conceptos básicos de redes y protocolos.',
    },
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* 🎥 Video de fondo */}
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
        <source src="/videosfondo/pepehxrfondo.mp4" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>

      {/* 🌑 Capa oscura */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* 🧱 Contenido principal */}
      <div style={{ position: 'relative', zIndex: 1, padding: '40px 0' }}>
        <div
          style={{
            margin: '0 auto',
            maxWidth: '1300px',
            width: '100%',
            padding: '0 20px',
            boxSizing: 'border-box',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '2.5rem', marginBottom: '30px', color: '#fff' }}>
            Pepe el Maestro Haxor
          </h1>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '40px',
            }}
          >
            {courses.map((course, index) => (
              <div
                key={index}
                style={{
                  width: '260px',
                  boxSizing: 'border-box',
                }}
              >
                <CourseCard
                  course={course}
                  onSelect={() => {
                    setVideoUrl(course.videoUrl);
                    setDescription(course.description);
                  }}
                />
              </div>
            ))}
          </div>

          {description && (
            <p style={{ marginTop: '25px', color: '#ccc' }}>{description}</p>
          )}

          {videoUrl && (
            <>
              <h2 style={{ marginTop: '30px', color: '#fff', fontSize: '24px' }}>
                Clase seleccionada
              </h2>
              <VideoPlayer key={videoUrl} videoUrl={videoUrl} />

</>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
