// src/components/ModularCourses.tsx
import React from 'react';
import CourseViewer from './CourseViewer';
import type { ModularCourse } from '../types';

interface ModularCoursesProps {
  courses: ModularCourse[];
}

const ModularCourses: React.FC<ModularCoursesProps> = ({ courses }) => {
  return (
    <div style={{ marginTop: '80px' }}>
      <h2 style={{
        color: '#fff',
        fontSize: '2rem',
        textAlign: 'center',
        marginBottom: '30px',
        textShadow: '1px 1px 4px rgba(0,0,0,0.6)'
      }}>
        Cursos Modulares
      </h2>
      <CourseViewer courses={courses} />
    </div>
  );
};

export default ModularCourses;
