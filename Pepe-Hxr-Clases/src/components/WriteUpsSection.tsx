import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WriteUpCard from './WriteUpCard';

// Conexión a SUPABASE
import { supabase } from '../types/supabaseClient';

type OS = 'Linux' | 'Windows';

interface StoredWU {
  id: string;
  file: File | null;
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

const MAX_SIZE_MB = 3;

const CLOUDINARY_UPLOAD_PRESET = 'writeupsPublic';
const CLOUDINARY_CLOUD_NAME = 'dywlzxrjx';

const WriteUpsSection: React.FC = () => {
  const [store, setStore] = useState<StoredWU[]>([]);
  const [filter, setFilter] = useState<OS | 'All'>('All');
  const [open, setOpen] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [selectedOS, setSelectedOS] = useState<OS>('Linux');

  useEffect(() => {
    const fetchWriteUps = async () => {
      console.log('Cargando write-ups desde Supabase...');

      try {
        const { data, error } = await supabase
          .from('writeups')
          .select('*')
          .order('uploadedAt', { ascending: false });

        if (error) {
          console.error('Error fetching writeups:', error);
          return;
        }

        if (!data || data.length === 0) {
          setStore([]);
          return;
        }

        const restored: StoredWU[] = [];

        for (const wu of data) {
          try {
            const res = await fetch(wu.cloudinaryUrl, { method: 'HEAD' });

            if (res.ok) {
              const restoredWU: StoredWU = {
                id: wu.id,
                file: null,
                os: wu.os,
                cloudinaryUrl: wu.cloudinaryUrl,
                uploadedAt: wu.uploadedAt,
                size: wu.size,
                name: wu.name
              };
              restored.push(restoredWU);
            } else {
              await supabase
                .from('writeups')
                .delete()
                .eq('id', wu.id);
            }
          } catch (err) {
            console.error(`Error al verificar URL de ${wu.name}:`, err);
          }
        }

        setStore(restored);
      } catch (error) {
        console.error('Error general al cargar write-ups:', error);
      }
    };

    fetchWriteUps();
  }, []);

  const allowed = (f: File): boolean => {
    const ext = f.name.toLowerCase().trim().split('.').pop();
    const sizeInMB = f.size / 1024 / 1024;
    return ext === 'pdf' && sizeInMB <= MAX_SIZE_MB;
  };

  const addFiles = async (files: FileList, os: OS) => {
    const validFiles = Array.from(files).filter(allowed);

    if (validFiles.length === 0) {
      alert(`Solo se permiten archivos PDF de máximo ${MAX_SIZE_MB} MB, pero puedes comprimirlos para que pesen menos aquí ;)  : https://www.ilovepdf.com/compress_pdf`);
      return;
    }

    console.log(`Subiendo ${validFiles.length} archivos PDF para ${os}`);
    setUploading(true);
    const uploaded: StoredWU[] = [];

    for (const file of validFiles) {
      const fileKey = `${Date.now()}-${file.name}`;
      console.log(`Procesando archivo: ${file.name}`);

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        formData.append('resource_type', 'raw');

        setUploadProgress(prev => ({ ...prev, [fileKey]: 0 }));

        const xhr = new XMLHttpRequest();
        const cloudinaryPromise = new Promise<CloudinaryResponse>((resolve, reject) => {
          xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
              const percentComplete = Math.round((event.loaded / event.total) * 80);
              setUploadProgress(prev => ({ ...prev, [fileKey]: percentComplete }));
            }
          });

          xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                const data: CloudinaryResponse = JSON.parse(xhr.responseText);
                resolve(data);
              } catch {
                reject(new Error('Error al parsear respuesta Cloudinary'));
              }
            } else {
              reject(new Error(`Error HTTP ${xhr.status}`));
            }
          });

          xhr.addEventListener('error', () => {
            reject(new Error('Error de red al subir archivo'));
          });

          xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`);
          xhr.send(formData);
        });

        const cloudinaryData = await cloudinaryPromise;
        setUploadProgress(prev => ({ ...prev, [fileKey]: 90 }));

        const supabaseData = {
          name: file.name,
          os: os,
          cloudinaryUrl: cloudinaryData.secure_url,
          uploadedAt: new Date().toISOString(),
          size: file.size,
        };

        const { data: inserted, error } = await supabase
          .from('writeups')
          .insert([supabaseData])
          .select()
          .single();

        if (error) throw new Error(`Supabase error: ${error.message}`);

        const newWriteUp: StoredWU = {
          id: inserted.id,
          file: file,
          os: inserted.os,
          cloudinaryUrl: inserted.cloudinaryUrl,
          uploadedAt: inserted.uploadedAt,
          size: inserted.size,
          name: inserted.name,
        };

        uploaded.push(newWriteUp);
        setUploadProgress(prev => ({ ...prev, [fileKey]: 100 }));
        console.log('✅ Subido:', newWriteUp);
      } catch (err) {
        console.error(`Error subiendo ${file.name}:`, err);
        alert(`Error subiendo ${file.name}: ${err instanceof Error ? err.message : 'Error desconocido'}`);
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[fileKey];
          return newProgress;
        });
      }
    }

    if (uploaded.length > 0) {
      setStore(prev => [...uploaded, ...prev]);
      console.log(`✅ Completado: ${uploaded.length} archivos`);
    }

    setTimeout(() => {
      setUploadProgress({});
      setUploading(false);
    }, 1000);
  };


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) addFiles(files, selectedOS);
    e.target.value = '';
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files, selectedOS);
  };

  const removeWriteUp = async (id: string) => {
    try {
      console.log(`Eliminando write-up con ID: ${id}`);

      const { error } = await supabase
        .from('writeups')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error eliminando de Supabase:', error);
        alert('Error al eliminar el archivo de la base de datos');
        return;
      }

      setStore(prev => prev.filter(wu => wu.id !== id));
      console.log('Write-up eliminado correctamente');
    } catch (err) {
      console.error('Error eliminando write-up:', err);
      alert('Error al eliminar el archivo');
    }
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
          {open ? '⌄' : '⌄'}
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
                  {uploading ? 'Subiendo...' : `Subir para ${selectedOS}`}
                  <input
                    type="file"
                    accept=".pdf"
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
                  <option value="Windows">Windows ({windowsCount})</option>
                </select>
              </div>
            </div>

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
                  Subiendo archivos a {selectedOS}...
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
                : `Arrastra archivos aquí (.pdf, máx ${MAX_SIZE_MB} MB)\n${selectedOS} seleccionado`}
            </div>

            {filter === 'All' && store.length > 0 ? (
              <div>
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
                          fileName={w.name}
                          fileSize={w.size}
                          os={w.os}
                          onRemove={() => removeWriteUp(w.id)}
                          cloudinaryUrl={w.cloudinaryUrl}
                          uploadedAt={w.uploadedAt}
                        />
                      ))}
                    </div>
                  </div>
                )}

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
                          fileName={w.name}
                          fileSize={w.size}
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
                      fileName={w.name}
                      fileSize={w.size}
                      os={w.os}
                      onRemove={() => removeWriteUp(w.id)}
                      cloudinaryUrl={w.cloudinaryUrl}
                      uploadedAt={w.uploadedAt}
                    />
                  ))
                ) : (
                  <p style={{ color: '#aaa', gridColumn: '1/-1', textAlign: 'center' }}>
                    {filter === 'All' 
                      ? 'No hay write-ups para mostrar'
                      : `No hay write-ups de ${filter} para mostrar`
                    }
                  </p>
                )}
              </div>
            )}

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
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WriteUpsSection;

