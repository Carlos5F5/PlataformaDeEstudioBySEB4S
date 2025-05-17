import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WriteUpCard from './WriteUpCard';

type OS = 'Linux' | 'Windows';
interface StoredWU { file: File; os: OS }

const MAX_SIZE_MB = 10;

const WriteUpsSection: React.FC = () => {
  const [store, setStore] = useState<StoredWU[]>([]);
  const [filter, setFilter] = useState<OS | 'All'>('All');
  const [open, setOpen] = useState(true);
  const [dragOver, setDragOver] = useState(false);

  /* ---------- validación y alta ---------- */
  const allowed = (f: File) =>
    (f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.md')) &&
    f.size / 1024 / 1024 <= MAX_SIZE_MB;

  const addFiles = (files: FileList, os: OS) => {
    const ok: StoredWU[] = [];
    const rejected: string[] = [];

    Array.from(files).forEach(file => {
      if (allowed(file)) ok.push({ file, os });
      else rejected.push(file.name);
    });

    if (rejected.length)
      alert(
        `Se descartaron:\n${rejected.join(
          '\n'
        )}\n\n(acepto solo .pdf o .md hasta ${MAX_SIZE_MB} MB)`
      );

    if (ok.length) setStore(prev => [...prev, ...ok]);
  };

  /* ---------- handlers ---------- */
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      const osSel = (document.getElementById('os-select') as HTMLSelectElement)
        .value as OS;
      addFiles(files, osSel);
    }
    e.target.value = '';
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (!e.dataTransfer.files.length) return;
    const osSel = (document.getElementById('os-select') as HTMLSelectElement)
      .value as OS;
    addFiles(e.dataTransfer.files, osSel);
  };

  const visible = store.filter(w => filter === 'All' || w.os === filter);

  /* ---------- UI helpers ---------- */
  const selectStyle: React.CSSProperties = {
    background: '#222',
    color: '#fff',
    border: '1px solid #555',
    borderRadius: 8,
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: 13,
    outline: 'none',
  };

  return (
    <section style={{ marginTop: 80 }}>
      {/* botón-título toggle */}
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
        }}
      >
        Write-Ups&nbsp;
        <span style={{ fontSize: '1.3rem' }}>{open ? '𖣐' : ''}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* controles */}
            <div
              style={{
                backdropFilter: 'blur(4px)',
                background: 'rgba(0,0,0,.45)',
                padding: '14px 22px',
                borderRadius: 12,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 14,
                justifyContent: 'center',
                marginBottom: 28,
              }}
            >
              <select id="os-select" style={selectStyle}>
                <option>Linux</option>
                <option>Windows</option>
              </select>

              <label
                style={{
                  ...selectStyle,
                  padding: '6px 18px',
                  cursor: 'pointer',
                  display: 'inline-block',
                }}
              >
                Elegir archivos
                <input
                  type="file"
                  accept=".pdf,.md"
                  multiple
                  onChange={handleInput}
                  style={{ display: 'none' }}
                />
              </label>

              <select
                value={filter}
                onChange={e => setFilter(e.target.value as OS | 'All')}
                style={selectStyle}
              >
                <option value="All">Todos</option>
                <option value="Linux">Linux</option>
                <option value="Windows">Windows</option>
              </select>
            </div>

            {/* área drag‑and‑drop */}
           <div
  onDragOver={e => {
    e.preventDefault();
    setDragOver(true);
  }}
  onDragLeave={() => setDragOver(false)}
  onDrop={onDrop}
  style={{
    border: dragOver ? '3px dashed #4fa' : '3px dashed #555',
    background: dragOver
      ? 'rgba(79,170,255,.12)'
      : 'rgba(255,255,255,.05)',       // ← sombreado gris tenue
    borderRadius: 12,
    padding: 40,
    marginBottom: 40,
    transition: 'all .25s',
    textAlign: 'center',
    color: '#ccc',
    fontSize: 15,
  }}
>
  {dragOver
    ? '¡Suelta los archivos aquí!'
    : 'O arrastra y suelta aquí tus .pdf o .md (≤10 MB)'}
</div>

            {/* grid tarjetas */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: 35,
                justifyItems: 'center',
              }}
            >
              {visible.length ? (
                visible.map((w, i) => (
                  <WriteUpCard key={i} file={w.file} os={w.os} />
                ))
              ) : (
                <p style={{ color: '#aaa', gridColumn: '1/-1' }}>
                  – Sin write-ups para mostrar –
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WriteUpsSection;
