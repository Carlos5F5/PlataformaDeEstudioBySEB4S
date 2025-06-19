import React, { useState } from 'react';
import type { ModularCourse } from '../types';
import EnhancedPlayer from './EnhancedPlayer';

interface ModularCoursesProps {
  courses: ModularCourse[];
}

const ModularCourses: React.FC<ModularCoursesProps> = ({ courses }) => {
  const [selectedCourse, setSelectedCourse] = useState<ModularCourse | null>(null);
  const [expandedModuleIndex, setExpandedModuleIndex] = useState<number | null>(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);
  const [currentClassTitle, setCurrentClassTitle] = useState<string>('');
  const [showPlayerModal, setShowPlayerModal] = useState<boolean>(false);
  const [useCustomAudio, setUseCustomAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [videoQuality, setVideoQuality] = useState('auto');

  return (
    <div style={{ marginTop: '80px', padding: '0 20px', color: '#fff', textAlign: 'center' }}>
     
<div style={{
  marginBottom: '70px',
  textAlign: 'center',
  position: 'relative',
}}>
  <h2 style={{
    fontSize: '2.2rem',
    fontWeight: '800',
    color: '#00ffc3',
    textTransform: 'uppercase',
    textShadow: '0 0 12px rgba(0,255,200,0.5), 0 0 24px rgba(0,255,200,0.2)',
    display: 'inline-block',
    letterSpacing: '1.5px',
    background: 'rgba(0, 255, 200, 0.05)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(0,255,200,0.2)',
    borderRadius: '14px',
    padding: '16px 36px',
    position: 'relative',
    animation: 'pulseGlow 2.5s infinite ease-in-out',
    borderBottom: '3px solid rgba(0,255,200,0.7)',
  }}>
    Cursos Modulares
  </h2>
</div>



      {!selectedCourse ? (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '30px'
        }}>
          {courses.map((course, i) => (
            <div key={i}
              onClick={() => {
                setSelectedCourse(course);
                setExpandedModuleIndex(null);
                setCurrentVideoUrl(null);
              }}
              style={{
                width: '320px',
                background: 'rgba(0,0,0,0.6)',
                padding: '20px',
                borderRadius: '16px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                cursor: 'pointer',
                transition: 'transform 0.3s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img src={course.image} alt={course.title} style={{
                width: '100%',
                height: '180px',
                objectFit: 'cover',
                borderRadius: '10px',
                marginBottom: '15px'
              }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{course.title}</h3>
              <p style={{ fontSize: '0.95rem', color: '#ccc' }}>{course.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ maxWidth: '950px', margin: '0 auto', textAlign: 'left' }}>
         <button
  onClick={() => {
    setSelectedCourse(null);
    setExpandedModuleIndex(null);
    setCurrentVideoUrl(null);
    setShowPlayerModal(false);
  }}
  style={{
    marginBottom: '25px',
    padding: '12px 24px',
    fontSize: '15px',
    fontWeight: 600,
    background: 'linear-gradient(135deg, #1de9b6, #00bcd4)',
    color: '#000',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '0 0 10px rgba(0,255,200,0.3)',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    textShadow: '0 0 1px rgba(255,255,255,0.1)'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
    e.currentTarget.style.boxShadow = '0 0 18px rgba(0,255,200,0.45)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = '0 0 10px rgba(0,255,200,0.3)';
  }}
>
  Ver las clases modulares
</button>


          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
            {selectedCourse.title}
          </h3>

          {selectedCourse.modules.map((mod, modIndex) => (
            <div key={modIndex} style={{
              marginBottom: '20px',
              background: 'rgba(255,255,255,0.05)',
              padding: '15px',
              borderRadius: '12px'
            }}>
              <div
                onClick={() =>
                  setExpandedModuleIndex(expandedModuleIndex === modIndex ? null : modIndex)
                }
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  paddingBottom: '10px'
                }}
              >
                Módulo {modIndex + 1}: {mod.name}
              </div>

              {expandedModuleIndex === modIndex && (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '20px',
                  marginTop: '10px'
                }}>
                  {mod.classes.map((cls, clsIndex) => (
                    <div key={clsIndex}
                      onClick={() => {
                        setCurrentVideoUrl(cls.videoUrl);
                        setCurrentClassTitle(cls.title);
                        setShowPlayerModal(true);
                      }}
                      style={{
                        background: 'rgba(255,255,255,0.07)',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        flex: '1 1 250px',
                        transition: 'transform 0.2s ease-in-out'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <strong>Clase {clsIndex + 1}:</strong><br />
                      {cls.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/*  Modal tipo Telegram */}
      {showPlayerModal && currentVideoUrl && (
        <div
          onClick={() => {
            setShowPlayerModal(false);
            setCurrentVideoUrl(null);
            setCurrentClassTitle('');
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
            padding: '20px',
            backdropFilter: 'blur(15px)',
            animation: 'fadeInScale 0.4s ease'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '900px',
              aspectRatio: '16 / 9',
              backgroundColor: '#000',
              borderRadius: '12px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 0 25px rgba(0,0,0,0.7)',
              animation: 'fadeInScale 0.3s ease'
            }}
          >
            <EnhancedPlayer
              videoUrl={currentVideoUrl}
              audioUrl={useCustomAudio ? audioUrl : undefined}
              quality={videoQuality}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModularCourses;
