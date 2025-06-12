// src/components/CourseViewer.tsx
import React, { useState } from 'react';
import CourseCard from './CourseCards';
import type { ModularCourse } from '../types';

interface Props {
  courses: ModularCourse[];
}

const CourseViewer: React.FC<Props> = ({ courses }) => {
  const [view, setView] = useState<'list' | 'modules'>('list');
  const [selectedCourse, setSelectedCourse] = useState<ModularCourse | null>(null);

  return (
    <div style={{ textAlign: 'center', padding: '40px 0' }}>
      {view === 'list' && (
        <>
          <h2
            style={{
              color: '#fff',
              fontSize: '2rem',
              marginBottom: '30px',
              textShadow: '1px 1px 4px rgba(0, 0, 0, 0.7)',
            }}
          >
            Cursos Modulares
          </h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '40px',
              padding: '0 20px',
            }}
          >
            {courses.map((course) => (
              <div key={course.id} style={{ width: '260px' }}>
                <CourseCard
                  course={course}
                  onSelect={() => {
                    setSelectedCourse(course);
                    setView('modules');
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {view === 'modules' && selectedCourse && (
        <>
          <h2 style={{ color: '#fff', marginTop: '40px' }}>
            {selectedCourse.title}
          </h2>
          {/* Aquí puedes renderizar el componente <LessonViewer /> u otro detalle */}
          <p style={{ color: '#ccc' }}>{selectedCourse.description}</p>
          <button
            onClick={() => setView('list')}
            style={{
              marginTop: '30px',
              padding: '10px 20px',
              backgroundColor: '#444',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Volver a cursos
          </button>
        </>
      )}
    </div>
  );
};

export default CourseViewer;
