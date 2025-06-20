import React from 'react';

interface WriteUpCardProps {
  file: File | null;
  fileName: string;
  fileSize: number;
  os: 'Linux' | 'Windows';
  onRemove?: () => void;
  cloudinaryUrl?: string;
  uploadedAt?: string;
}

const WriteUpCard: React.FC<WriteUpCardProps> = ({ 
  file,
  fileName,
  fileSize,
  os, 
  onRemove, 
  cloudinaryUrl, 
  uploadedAt 
}) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFileIcon = (fileName: string): string => {
    const ext = fileName.toLowerCase().split('.').pop();
    return ext === 'pdf' ? '' : '';
  };

  const getFileTypeDisplay = (fileName: string): string => {
    const ext = fileName.toLowerCase().split('.').pop();
    return ext === 'pdf' ? 'PDF' : 'Markdown';
  };

  // Función mejorada para manejar descargas y visualización
  const handleDownload = () => {
    if (cloudinaryUrl) {
      try {
        // Para PDFs, abrimos en nueva pestaña para visualización
        if (fileName.toLowerCase().endsWith('.pdf')) {
          window.open(cloudinaryUrl, '_blank', 'noopener,noreferrer');
        } else {
          // Para archivos Markdown, forzamos descarga
          const link = document.createElement('a');
          link.href = cloudinaryUrl;
          link.download = fileName;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (error) {
        console.error('Error al abrir/descargar archivo:', error);
        alert('Error al acceder al archivo. Por favor, intenta de nuevo.');
      }
    }
  };

  // Función para copiar URL al portapapeles con feedback visual
  const handleCopyUrl = async () => {
    if (cloudinaryUrl) {
      try {
        await navigator.clipboard.writeText(cloudinaryUrl);
        // Mostrar feedback visual temporal
        const button = document.activeElement as HTMLElement;
        const originalText = button.textContent;
        button.textContent = '✓ Copiado';
        button.style.background = 'linear-gradient(135deg, #2d8, #4fa)';
        
        setTimeout(() => {
          button.textContent = originalText;
          button.style.background = '';
        }, 1500);
      } catch (error) {
        console.error('Error al copiar URL:', error);
        alert('No se pudo copiar la URL al portapapeles');
      }
    }
  };

  const cardStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))',
    borderRadius: 16,
    padding: '18px',
    minHeight: '180px',
    width: '240px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    border: `1px solid ${os === 'Linux' ? 'rgba(255,107,53,0.3)' : 'rgba(0,120,212,0.3)'}`,
    transition: 'all 0.3s ease',
    position: 'relative',
    color: '#fff',
    backdropFilter: 'blur(4px)',
  };

  const hoverStyle: React.CSSProperties = {
    transform: 'translateY(-6px)',
    boxShadow: `0 12px 30px ${os === 'Linux' ? 'rgba(255,107,53,0.2)' : 'rgba(0,120,212,0.2)'}`,
    border: `1px solid ${os === 'Linux' ? 'rgba(255,107,53,0.5)' : 'rgba(0,120,212,0.5)'}`,
  };

  const buttonStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: 8,
    padding: '6px 12px',
    color: '#fff',
    fontSize: '11px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontWeight: '500',
    flex: 1,
  };

  return (
    <div 
      style={cardStyle}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, hoverStyle);
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, cardStyle);
      }}
    >
      {/* Botón de eliminar
      {onRemove && (
        <button
          onClick={onRemove}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(220,53,69,0.8)',
            border: 'none',
            borderRadius: '50%',
            width: '26px',
            height: '26px',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            fontWeight: 'bold',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(220,53,69,1)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(220,53,69,0.8)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          title="Eliminar write-up"
        >
          ×
        </button>
      )}
 */}
      {/* Indicador de SO mejorado */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        background: os === 'Linux' 
          ? 'linear-gradient(135deg, #ff6b35, #f7931e)' 
          : 'linear-gradient(135deg, #0078d4, #106ebe)',
        color: '#fff',
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '10px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}>
        {os === 'Linux' ? '' : '⊞'} {os}
      </div>

      {/* Contenido principal */}
      <div style={{ marginTop: '35px', flex: 1, textAlign: 'center' }}>
        <div style={{ 
          fontSize: '36px', 
          marginBottom: '12px',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
        }}>
          {getFileIcon(fileName)}
        </div>
        
        <h4 style={{
          margin: '0 0 8px 0',
          fontSize: '14px',
          fontWeight: '600',
          color: '#fff',
          lineHeight: '1.3',
          wordBreak: 'break-word',
          maxHeight: '40px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {fileName}
        </h4>

        <div style={{
          fontSize: '11px',
          color: '#bbb',
          marginBottom: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
          alignItems: 'center'
        }}>
          <span>
            {getFileTypeDisplay(fileName)} • {formatFileSize(fileSize)}
          </span>
          {uploadedAt && (
            <span style={{ fontSize: '10px', opacity: 0.8 }}>
               {formatDate(uploadedAt)}
            </span>
          )}
        </div>
      </div>

      {/* Botones de acción */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginTop: 'auto'
      }}>
        <button
          onClick={handleDownload}
          style={{
            ...buttonStyle,
            background: fileName.toLowerCase().endsWith('.pdf') 
              ? 'linear-gradient(135deg, #e74c3c, #c0392b)'
              : 'linear-gradient(135deg, #3498db, #2980b9)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.opacity = '0.9';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.opacity = '1';
          }}
          disabled={!cloudinaryUrl}
          title={fileName.toLowerCase().endsWith('.pdf') ? 'Ver PDF' : 'Descargar archivo'}
        >
          {fileName.toLowerCase().endsWith('.pdf') ? 'Ver' : 'Descargar'}
        </button>

        <button
          onClick={handleCopyUrl}
          style={{
            ...buttonStyle,
            background: 'linear-gradient(135deg, #9b59b6, #8e44ad)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.opacity = '0.9';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.opacity = '1';
          }}
          disabled={!cloudinaryUrl}
          title="Copiar URL del archivo"
        >
          Copiar URL
        </button>
      </div>

      {/* Indicador de estado de subida */}
      {!cloudinaryUrl && (
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(255,193,7,0.9)',
          color: '#000',
          padding: '2px 8px',
          borderRadius: '10px',
          fontSize: '9px',
          fontWeight: 'bold',
        }}>
          Procesando...
        </div>
      )}
    </div>
  );
};

export default WriteUpCard;