import React, { useState } from 'react';
import CourseCard from './CourseCards';
import { ModularCourse } from '../types';

interface Props {
  courses: ModularCourse[];
  onSelectClass: (videoUrl: string) => void;
}

const ModularCourses: React.FC<Props> = ({ courses, onSelectClass }) => {
  const [selected, setSelected] = useState<ModularCourse | null>(null);

  if (selected) {
    return (
      <div style={{ marginTop: 40 }}>
        <button
          onClick={() => setSelected(null)}
          style={{
            marginBottom: 20,
            background: '#444',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          Volver
        </button>
        <h2 style={{ color: '#fff', marginBottom: 20 }}>{selected.title}</h2>
        {selected.modules.map((mod, idx) => (
          <div key={idx} style={{ marginBottom: 30 }}>
            <h3 style={{ color: '#fff', marginBottom: 10 }}>{mod.name}</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {mod.classes.map((cl, i) => (
                <li key={i}>
                  <button
                    onClick={() => onSelectClass(cl.videoUrl)}
                    style={{
                      background: '#333',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '8px 12px',
                      cursor: 'pointer',
                    }}
                  >
                    {cl.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ marginTop: 60 }}>
      <h2 style={{ color: '#fff', marginBottom: 20 }}>Cursos modulares</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '40px',
        }}
      >
        {courses.map((c, i) => (
          <div key={i} style={{ width: '260px' }}>
            <CourseCard
              course={{
                title: c.title,
                image: c.image,
                videoUrl: '',
                description: c.description || '',
              }}
              onSelect={() => setSelected(c)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModularCourses;
