import React from 'react';

interface Props {
  file: File;
  os: 'Linux' | 'Windows';
}

const WriteUpCard: React.FC<Props> = ({ file, os }) => {
  const objectURL = URL.createObjectURL(file);
  const isPDF = file.type === 'application/pdf';

  return (
    <div
      style={{
        width: '220px',
        background:
          'linear-gradient(145deg, rgba(60,60,60,0.9) 0%, rgba(25,25,25,0.9) 100%)',
        borderRadius: '14px',
        padding: '18px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px',
        boxShadow: '0 4px 10px rgba(0,0,0,.4)',
        transition: 'transform .25s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      {/* icono + SO badge */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ fontSize: '28px' }}>{isPDF ? '📄' : '📝'}</span>
        <span
          style={{
            fontSize: '11px',
            padding: '2px 6px',
            borderRadius: '6px',
            background: os === 'Linux' ? '#28a745' : '#007bff',
            color: '#fff',
            letterSpacing: '.5px',
          }}
        >
          {os}
        </span>
      </div>

      {/* nombre del archivo */}
      <span
        style={{
          fontSize: '14px',
          color: '#f1f1f1',
          textAlign: 'center',
          wordBreak: 'break-word',
        }}
      >
        {file.name}
      </span>

      {/* botón abrir/descargar */}
      <a
        href={objectURL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          background: '#ff006e',
          color: '#fff',
          textDecoration: 'none',
          padding: '8px 18px',
          borderRadius: '8px',
          fontSize: '13px',
          boxShadow: '0 2px 6px rgba(0,0,0,.3)',
        }}
      >
        {isPDF ? 'Ver PDF' : 'Ver .md'}
      </a>
    </div>
  );
};

export default WriteUpCard;
