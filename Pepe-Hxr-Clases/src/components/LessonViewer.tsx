import React from 'react';
import type { Lesson } from '../types';
import EnhancedPlayer from './EnhancedPlayer';
import { Clock, CheckCircle } from 'lucide-react';

interface LessonViewerProps {
  lessons: Lesson[];
  selectedLesson: Lesson | null;
  onSelectLesson: (lesson: Lesson) => void;
}

const LessonViewer: React.FC<LessonViewerProps> = ({ lessons, selectedLesson, onSelectLesson }) => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Video */}
      {selectedLesson && (
        <div style={{ marginBottom: '40px' }}>
          <EnhancedPlayer videoUrl={selectedLesson.videoUrl} />
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            padding: '20px',
            borderRadius: '12px',
            marginTop: '20px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '10px' }}>
              {selectedLesson.title}
            </h3>
            <p style={{ color: '#ccc', fontSize: '14px' }}>
              {selectedLesson.description}
            </p>
          </div>
        </div>
      )}

      {/* Lista de lecciones */}
      <h3 style={{
        color: '#fff',
        fontSize: '1.3rem',
        marginBottom: '20px',
        textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
      }}>
        Lecciones del módulo
      </h3>

      {lessons.map(lesson => (
        <div
          key={lesson.id}
          onClick={() => onSelectLesson(lesson)}
          style={{
            backgroundColor: 'rgba(31, 31, 31, 0.9)',
            borderRadius: '12px',
            padding: '20px',
            margin: '10px 0',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'rgba(41, 41, 41, 0.9)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'rgba(31, 31, 31, 0.9)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: lesson.completed ? '#28a745' : '#007bff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            {lesson.completed ? <CheckCircle size={24} /> : <Clock size={24} />}
          </div>

          <div style={{ flex: 1 }}>
            <h4 style={{ color: '#fff', fontSize: '16px', marginBottom: '5px' }}>{lesson.title}</h4>
            <p style={{ color: '#ccc', fontSize: '13px', marginBottom: '8px' }}>{lesson.description}</p>
            <span style={{ color: '#aaa', fontSize: '12px' }}>{lesson.duration}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonViewer;
