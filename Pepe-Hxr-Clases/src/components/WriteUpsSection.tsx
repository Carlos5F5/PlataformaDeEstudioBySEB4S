import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WriteUpCard from './WriteUpCard';

type OS = 'Linux' | 'Windows';

interface StoredWU {
  id: string;
  file: File;
  os: OS;
  cloudinaryUrl: string;
  uploadedAt: string;
  size: number;
  name: string;
}

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  bytes: number;
  original_filename: string;
}

const MAX_SIZE_MB = 10;
const CLOUDINARY_UPLOAD_PRESET = 'writeupsPublic';
const CLOUDINARY_CLOUD_NAME = 'dywlzxrjx';

const WriteUpsSection: React.FC = () => {
  const [store, setStore] = useState<StoredWU[]>([]);
  const [filter, setFilter] = useState<OS | 'All'>('All');
  const [open, setOpen] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const [selectedOS, setSelectedOS] = useState<OS>('Linux');

  useEffect(() => {
    const savedWriteUps = localStorage.getItem('cloudinary-writeups');
    if (savedWriteUps) {
      try {
        const parsed: StoredWU[] = JSON.parse(savedWriteUps);
        const restored = parsed.map(wu => ({
          ...wu,
          file: new File([], wu.name, { type: getFileType(wu.name) })
        }));
        setStore(restored);
      } catch (error) {
        console.error('Error al cargar write-ups guardados:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (store.length > 0) {
      const toSave = store.map(wu => ({
        id: wu.id,
        os: wu.os,
        cloudinaryUrl: wu.cloudinaryUrl,
        uploadedAt: wu.uploadedAt,
        size: wu.size,
        name: wu.name
      }));
      localStorage.setItem('cloudinary-writeups', JSON.stringify(toSave));
    } else {
      localStorage.removeItem('cloudinary-writeups');
    }
  }, [store]);

  const getFileType = (filename: string): string => {
    const ext = filename.toLowerCase().split('.').pop();
    return ext === 'pdf' ? 'application/pdf' : 'text/markdown';
  };


  // RECARGA DE CLOUDINARY ARCHIVOS
  useEffect(() => {
  store.forEach(item => {
    if (item.cloudinaryUrl) {
      fetch(item.cloudinaryUrl, { method: 'HEAD' })
        .then(response => {
          if (!response.ok) {
            // Si fue eliminado en Cloudinary, quitamos el item
            setStore(prev => prev.filter(w => w.cloudinaryUrl !== item.cloudinaryUrl));
          }
        })
        .catch(() => {
          // Si hay error de red, también quitar
          setStore(prev => prev.filter(w => w.cloudinaryUrl !== item.cloudinaryUrl));
        });
    }
  });
}, [store]);



  const allowed = (f: File): boolean => {
    const ext = f.name.toLowerCase().trim().split('.').pop();
    const sizeInMB = f.size / 1024 / 1024;
    const sizeOk = sizeInMB <= MAX_SIZE_MB;
    const validExtension = ext === 'pdf' || ext === 'md';
    
    return sizeOk && validExtension;
  };

  const uploadToCloudinary = async (file: File): Promise<CloudinaryResponse> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      formData.append('resource_type', 'auto'); // Cambio importante: 'raw' en lugar de 'auto'
      formData.append('context', `alt=${file.name}`); // <-- para que Cloudinary lo sirva como PDF
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setUploadProgress(prev => ({ 
            ...prev, 
            [`${Date.now()}-${file.name}`]: Math.round(percentComplete) 
          }));
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data: CloudinaryResponse = JSON.parse(xhr.responseText);
            if (!data.secure_url) {
              reject(new Error('Respuesta inválida de Cloudinary'));
            } else {
              resolve(data);
            }
          } catch (error) {
            reject(new Error('Error al parsear respuesta de Cloudinary'));
          }
        } else {
          reject(new Error(`Error HTTP ${xhr.status}: ${xhr.responseText}`));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Error de red al subir archivo'));
      });

      xhr.addEventListener('timeout', () => {
        reject(new Error('Timeout al subir archivo'));
      });

      xhr.timeout = 60000;
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`);
      xhr.send(formData);
    });
  };

  const addFiles = async (files: FileList, os: OS) => {
    const uploaded: StoredWU[] = [];
    const rejected: Array<{name: string, reason: string}> = [];

    setUploading(true);
    setUploadProgress({});

    for (const file of Array.from(files)) {
      const fileId = `${Date.now()}-${file.name}`;
      
      if (!allowed(file)) {
        const sizeInMB = file.size / 1024 / 1024;
        const ext = file.name.toLowerCase().split('.').pop();
        let reason = '';
        
        if (sizeInMB > MAX_SIZE_MB) {
          reason = `Tamaño excesivo (${sizeInMB.toFixed(2)} MB)`;
        } else if (ext !== 'pdf' && ext !== 'md') {
          reason = `Extensión no válida (.${ext})`;
        }
        
        rejected.push({ name: file.name, reason });
        continue;
      }

      try {
        setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
        
        console.log(`Subiendo a Cloudinary: ${file.name}`);
        const cloudinaryData = await uploadToCloudinary(file);
        
        setUploadProgress(prev => ({ ...prev, [fileId]: 100 }));

        const newWriteUp: StoredWU = {
          id: fileId,
          file: new File([file], file.name, { type: file.type }),
          os,
          cloudinaryUrl: cloudinaryData.secure_url,
          uploadedAt: new Date().toISOString(),
          size: cloudinaryData.bytes,
          name: cloudinaryData.original_filename || file.name
        };

        uploaded.push(newWriteUp);
        console.log(`Subido exitosamente: ${file.name}`);
        
      } catch (error) {
        console.error(`Error al subir ${file.name}:`, error);
        rejected.push({ 
          name: file.name, 
          reason: error instanceof Error ? error.message : 'Error desconocido'
        });
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[fileId];
          return newProgress;
        });
      }
    }

    setUploading(false);
    setUploadProgress({});

    if (rejected.length > 0) {
      const rejectedDetails = rejected.map(r => `• ${r.name}: ${r.reason}`).join('\n');
      alert(
        `Archivos rechazados:\n\n${rejectedDetails}\n\n` +
        `Acepto solo archivos .pdf o .md de hasta ${MAX_SIZE_MB} MB`
      );
    }

    if (uploaded.length > 0) {
      setStore(prev => [...prev, ...uploaded]);
      console.log(`${uploaded.length} archivo(s) subido(s) exitosamente`);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      addFiles(files, selectedOS);
    }
    e.target.value = '';
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (!e.dataTransfer.files.length) return;
    addFiles(e.dataTransfer.files, selectedOS);
  };

  const removeWriteUp = (id: string) => {
    setStore(prev => prev.filter(wu => wu.id !== id));
  };

  const visible = store.filter(w => filter === 'All' || w.os === filter);
  const linuxCount = store.filter(w => w.os === 'Linux').length;
  const windowsCount = store.filter(w => w.os === 'Windows').length;

  const selectStyle: React.CSSProperties = {
    background: '#1a1a1a',
    color: '#fff',
    border: '1px solid #4a5568',
    borderRadius: 8,
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: 13,
    outline: 'none',
    transition: 'all 0.2s ease',
  };

  const buttonStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #4fa, #2d8)',
    border: 'none',
    borderRadius: 8,
    padding: '8px 16px',
    color: '#fff',
    fontSize: 13,
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.2s ease',
    fontWeight: '500',
  };

  const osButtonStyle = (os: OS): React.CSSProperties => ({
    background: selectedOS === os 
      ? (os === 'Linux' ? 'linear-gradient(135deg, #ff6b35, #f7931e)' : 'linear-gradient(135deg, #0078d4, #106ebe)')
      : 'rgba(255,255,255,0.1)',
    border: selectedOS === os ? 'none' : '1px solid rgba(255,255,255,0.2)',
    borderRadius: 8,
    padding: '8px 16px',
    color: '#fff',
    fontSize: 13,
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.2s ease',
    fontWeight: selectedOS === os ? '600' : '400',
  });

  return (
    <section style={{ marginTop: 80 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: '1.9rem',
          display: 'block',
          margin: '0 auto 14px',
          cursor: 'pointer',
          outline: 'none',
          transition: 'all 0.2s ease',
        }}
      >
        Write-Ups&nbsp;
        <span style={{ fontSize: '1.3rem', color: '#4fa' }}>
          {open ? '' : ''}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Panel de control mejorado */}
            <div
              style={{
                backdropFilter: 'blur(8px)',
                background: 'rgba(0,0,0,0.6)',
                padding: '20px',
                borderRadius: 16,
                marginBottom: 28,
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {/* Selección de OS */}
              <div style={{ marginBottom: 16 }}>
                <h4 style={{ 
                  color: '#fff', 
                  fontSize: '14px', 
                  marginBottom: 10,
                  textAlign: 'center',
                  fontWeight: '600'
                }}>
                  Selecciona el Sistema Operativo
                </h4>
                <div style={{ 
                  display: 'flex', 
                  gap: 12, 
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => setSelectedOS('Linux')}
                    style={osButtonStyle('Linux')}
                    disabled={uploading}
                  >
                    Linux
                  </button>
                  <button
                    onClick={() => setSelectedOS('Windows')}
                    style={osButtonStyle('Windows')}
                    disabled={uploading}
                  >
                     Windows
                  </button>
                </div>
              </div>

              {/* Controles de archivo y filtrado */}
              <div style={{ 
                display: 'flex', 
                gap: 12, 
                justifyContent: 'center',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}>
                <label
                  style={{
                    ...buttonStyle,
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    opacity: uploading ? 0.6 : 1,
                    display: 'inline-block',
                  }}
                >
                  {uploading ? 'Subiendo...' : ` Subir para ${selectedOS}`}
                  <input
                    type="file"
                    accept=".pdf,.md"
                    multiple
                    onChange={handleInput}
                    disabled={uploading}
                    style={{ display: 'none' }}
                  />
                </label>

                <select
                  value={filter}
                  onChange={e => setFilter(e.target.value as OS | 'All')}
                  style={selectStyle}
                >
                  <option value="All"> Todos ({store.length})</option>
                  <option value="Linux"> Linux ({linuxCount})</option>
                  <option value="Windows"> Windows ({windowsCount})</option>
                </select>
              </div>
            </div>

            {/* Indicador de progreso */}
            {uploading && Object.keys(uploadProgress).length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ 
                  background: 'rgba(0,0,0,0.8)', 
                  padding: '16px', 
                  borderRadius: 12, 
                  marginBottom: 20,
                  color: '#fff',
                  fontSize: '0.9rem',
                  border: '1px solid rgba(79,255,170,0.3)'
                }}
              >
                <div style={{ fontWeight: '600', marginBottom: 8 }}>
                  ⏳ Subiendo archivos a {selectedOS}...
                </div>
                {Object.entries(uploadProgress).map(([fileId, progress]) => (
                  <div key={fileId} style={{ marginTop: 8 }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: 4,
                      fontSize: '0.8rem'
                    }}>
                      <span>{fileId.split('-').slice(1).join('-')}</span>
                      <span>{progress}%</span>
                    </div>
                    <div style={{ 
                      background: '#333', 
                      borderRadius: 4, 
                      overflow: 'hidden',
                      height: 6
                    }}>
                      <div style={{ 
                        background: 'linear-gradient(90deg, #4fa, #2d8)', 
                        height: '100%', 
                        width: `${progress}%`,
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Área de drag & drop */}
            <div
              onDragOver={e => {
                e.preventDefault();
                if (!uploading) setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              style={{
                border: dragOver ? '3px dashed #4fa' : '3px dashed #555',
                background: dragOver
                  ? 'rgba(79,170,255,0.15)'
                  : 'rgba(255,255,255,0.05)',
                borderRadius: 16,
                padding: 40,
                marginBottom: 40,
                transition: 'all 0.3s ease',
                textAlign: 'center',
                color: uploading ? '#999' : '#ccc',
                fontSize: 15,
                cursor: uploading ? 'not-allowed' : 'default',
              }}
            >
              {uploading
                ? ' Subiendo archivos...'
                : dragOver
                ? ` Suelta los archivos para ${selectedOS}`
                : ` Arrastra archivos aquí (.pdf o .md, máx ${MAX_SIZE_MB} MB)\n${selectedOS} seleccionado, POR FAVOR NO MEZCLES SOs`}
            </div>

            {/* Grid de archivos con separación por OS */}
            {filter === 'All' && store.length > 0 ? (
              <div>
                {/* Sección Linux */}
                {linuxCount > 0 && (
                  <div style={{ marginBottom: 40 }}>
                    <h3 style={{ 
                      color: '#ff6b35', 
                      fontSize: '1.2rem', 
                      marginBottom: 20,
                      textAlign: 'center',
                      fontWeight: '600'
                    }}>
                      Linux ({linuxCount})
                    </h3>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                        gap: 20,
                        justifyItems: 'center',
                      }}
                    >
                      {store.filter(w => w.os === 'Linux').map((w) => (
                        <WriteUpCard 
                          key={w.id} 
                          file={w.file} 
                          os={w.os}
                          onRemove={() => removeWriteUp(w.id)}
                          cloudinaryUrl={w.cloudinaryUrl}
                          uploadedAt={w.uploadedAt}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Sección Windows */}
                {windowsCount > 0 && (
                  <div>
                    <h3 style={{ 
                      color: '#0078d4', 
                      fontSize: '1.2rem', 
                      marginBottom: 20,
                      textAlign: 'center',
                      fontWeight: '600'
                    }}>
                      Windows ({windowsCount})
                    </h3>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                        gap: 20,
                        justifyItems: 'center',
                      }}
                    >
                      {store.filter(w => w.os === 'Windows').map((w) => (
                        <WriteUpCard 
                          key={w.id} 
                          file={w.file} 
                          os={w.os}
                          onRemove={() => removeWriteUp(w.id)}
                          cloudinaryUrl={w.cloudinaryUrl}
                          uploadedAt={w.uploadedAt}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: 20,
                  justifyItems: 'center',
                }}
              >
                {visible.length ? (
                  visible.map((w) => (
                    <WriteUpCard 
                      key={w.id} 
                      file={w.file} 
                      os={w.os}
                      onRemove={() => removeWriteUp(w.id)}
                      cloudinaryUrl={w.cloudinaryUrl}
                      uploadedAt={w.uploadedAt}
                    />
                  ))
                ) : (
                  <p style={{ color: '#aaa', gridColumn: '1/-1', textAlign: 'center' }}>
                    {filter === 'All' 
                      ? ' No hay write-ups para mostrar'
                      : ` No hay write-ups de ${filter} para mostrar`
                    }
                  </p>
                )}
              </div>
            )}

            {/* Información estadística */}
            {store.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ 
                  marginTop: 40, 
                  padding: '16px 20px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 12,
                  color: '#bbb',
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <div style={{ fontWeight: '600', marginBottom: 8 }}>
                  Estadísticas de Write-Ups
                </div>
                <div>
                  Total: {store.length} archivo{store.length !== 1 ? 's' : ''} | 
                  Linux: {linuxCount} | 
                  Windows: {windowsCount}
                </div>
                <div style={{ fontSize: '0.8rem', marginTop: 4, opacity: 0.8 }}>
                  
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WriteUpsSection;