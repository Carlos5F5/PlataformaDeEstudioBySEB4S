import React from 'react';

interface Course {
  title: string;
  image: string;
  videoUrl: string;
  description: string;
}

interface CourseCardProps {
  course: Course;
  onSelect: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onSelect }) => {
  return (
    <div
      style={{
        width: '260px',
        backgroundColor: '#1f1f1f',
        borderRadius: '12px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
      }}
      onClick={onSelect}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <img
        src={course.image}
        alt={course.title}
        style={{
          width: '100%',
          height: '170px',
          objectFit: 'cover',
        }}
      />
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '17px', color: '#fff', marginBottom: '10px' }}>
          {course.title}
        </h3>
        <p style={{ fontSize: '14px', color: '#ccc', marginBottom: '15px' }}>
          {course.description}
        </p>
        <button
          style={{
            padding: '10px 16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Inscribirte ahora
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
