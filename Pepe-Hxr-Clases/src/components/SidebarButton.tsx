import React, { useState } from 'react';
import type { Section } from '../App';
import { Menu, Layers, FileText, X, ChevronRight, Zap } from 'lucide-react';

interface SidebarButtonProps {
  activeSection: Section;
  setActiveSection: React.Dispatch<React.SetStateAction<Section>>;
}

interface MenuItem {
  id: Section;
  label: string;
  icon: React.ReactNode;
  description: string;
  activeGradient: string;
  inactiveGradient: string;
  glowColor: string;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<Section | null>(null);

  // Configuración de elementos del menú con temática cyberpunk
  const menuItems: MenuItem[] = [
    {
      id: 'modular',
      label: 'Cursos Modulares',
      icon: <Layers size={20} />,
      description: 'Aprende con nuestros cursos estructurados',
      activeGradient: 'linear-gradient(90deg, #00ffcc 0%, #00ff80 100%)',
      inactiveGradient: 'linear-gradient(90deg, #2dffcc, #34d5ff)',
      glowColor: 'rgba(0,255,200,0.5)'
    },
    {
      id: 'writeups',
      label: 'WriteUps',
      icon: <FileText size={20} />,
      description: 'Documentación y análisis técnico',
      activeGradient: 'linear-gradient(90deg, #ff00cc 0%, #ff0080 100%)',
      inactiveGradient: 'linear-gradient(90deg, #ff2dcc, #ff34d5)',
      glowColor: 'rgba(255,0,200,0.5)'
    }
  ];

  const handleSetSection = (section: Section) => {
    setActiveSection(activeSection === section ? 'main' : section);
    setIsOpen(false);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Overlay para cerrar el sidebar en móvil */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.8)',
            zIndex: 999,
            backdropFilter: 'blur(4px)',
            transition: 'opacity 0.3s ease'
          }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Botón hamburguesa flotante */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1100,
          cursor: 'pointer',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isOpen 
            ? 'linear-gradient(135deg, #ff006e 0%, #ff1744 100%)'
            : 'linear-gradient(90deg, #2dffcc, #34d5ff)',
          borderRadius: '16px',
          boxShadow: isOpen 
            ? '0 0 30px rgba(255, 0, 110, 0.6)' 
            : '0 0 20px rgba(0, 255, 180, 0.4)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(8px)',
          fontFamily: 'monospace'
        }}
        onClick={toggleSidebar}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'rotate(8deg) scale(1.08)';
          e.currentTarget.style.boxShadow = isOpen 
            ? '0 0 40px rgba(255, 0, 110, 0.8)' 
            : '0 0 30px rgba(0, 255, 200, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
          e.currentTarget.style.boxShadow = isOpen 
            ? '0 0 30px rgba(255, 0, 110, 0.6)' 
            : '0 0 20px rgba(0, 255, 180, 0.4)';
        }}
      >
        <div style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease'
        }}>
          {isOpen ? <X color="#0a0a0a" size={28} /> : <Menu color="#0a0a0a" size={28} />}
        </div>
      </div>

      {/* Sidebar principal */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: isOpen ? 0 : '-380px',
          width: '360px',
          height: '100vh',
          background: 'linear-gradient(145deg, rgba(0, 10, 10, 0.96) 0%, rgba(5, 15, 15, 0.98) 100%)',
          backdropFilter: 'blur(20px)',
          borderLeft: '3px solid rgba(0,255,200,0.2)',
          borderTopLeftRadius: '20px',
          borderBottomLeftRadius: '20px',
          transition: 'right 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-20px 0 60px rgba(0,255,200,0.15)',
          fontFamily: 'monospace'
        }}
      >
        {/* Header del sidebar */}
        <div style={{
          padding: '80px 28px 32px',
          borderBottom: '2px solid rgba(0,255,200,0.1)',
          background: 'linear-gradient(135deg, rgba(0,255,200,0.08) 0%, rgba(52,213,255,0.08) 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Elemento decorativo */}
          <div style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            width: '40px',
            height: '40px',
            background: 'linear-gradient(45deg, #00ffcc, #34d5ff)',
            borderRadius: '50%',
            opacity: 0.1,
            animation: 'pulse 2s infinite'
          }} />
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px'
          }}>
            <Zap size={24} style={{ color: '#00ffcc' }} />
            <h2 style={{
              color: '#00ffcc',
              fontSize: '22px',
              fontWeight: 'bold',
              margin: 0,
              textShadow: '0 0 10px rgba(0,255,200,0.5)',
              letterSpacing: '1px'
            }}>
              NAVIGATION
            </h2>
          </div>
          <p style={{
            color: 'rgba(0,255,200,0.7)',
            fontSize: '13px',
            margin: 0,
            lineHeight: '1.4',
            letterSpacing: '0.5px'
          }}>
            &gt; Accede a las secciones de la plataforma
          </p>
        </div>

        {/* Contenedor de navegación */}
        <div style={{
          flex: 1,
          padding: '32px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          overflowY: 'auto'
        }}>
          {/* Renderizado dinámico de elementos del menú */}
          {menuItems.map((item, index) => {
            const isActive = activeSection === item.id;
            const isHovered = hoveredItem === item.id;
            
            return (
              <div
                key={item.id}
                style={{
                  opacity: 0,
                  animation: `slideInCyber 0.6s ease-out ${index * 0.15}s forwards`,
                  transform: 'translateX(30px)'
                }}
              >
                <button
                  onClick={() => handleSetSection(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    background: isActive 
                      ? item.activeGradient
                      : isHovered 
                        ? 'linear-gradient(90deg, rgba(0,255,200,0.1), rgba(52,213,255,0.1))'
                        : 'linear-gradient(90deg, rgba(0,255,200,0.05), rgba(52,213,255,0.05))',
                    border: isActive 
                      ? '2px solid rgba(0,255,200,0.4)' 
                      : '1px solid rgba(0,255,200,0.15)',
                    borderRadius: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    position: 'relative',
                    overflow: 'hidden',
                    transform: isHovered ? 'translateX(8px) scale(1.02)' : 'translateX(0) scale(1)',
                    boxShadow: isActive 
                      ? `0 0 25px ${item.glowColor}` 
                      : isHovered 
                        ? '0 0 15px rgba(0,255,200,0.2)'
                        : 'none',
                    color: isActive ? '#0a0a0a' : '#00ffcc',
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    letterSpacing: '0.5px'
                  }}
                >
                  {/* Línea lateral de estado */}
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '4px',
                    height: '100%',
                    background: isActive ? item.activeGradient : 'transparent',
                    borderRadius: '0 4px 4px 0',
                    transition: 'all 0.3s ease'
                  }} />

                  {/* Icono con efectos */}
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: isActive 
                      ? 'rgba(10,10,10,0.3)' 
                      : 'rgba(0,255,200,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(0,255,200,0.2)',
                    transform: isHovered ? 'rotate(5deg) scale(1.1)' : 'rotate(0deg) scale(1)'
                  }}>
                    {item.icon}
                  </div>

                  {/* Contenido del texto */}
                  <div style={{
                    flex: 1,
                    textAlign: 'left'
                  }}>
                    <div style={{
                      fontSize: '15px',
                      fontWeight: 'bold',
                      marginBottom: '4px',
                      transition: 'color 0.3s ease'
                    }}>
                      {isActive ? 'Volver a Clases' : item.label}
                    </div>
                    <div style={{
                      color: isActive ? 'rgba(10,10,10,0.7)' : 'rgba(0,255,200,0.6)',
                      fontSize: '11px',
                      lineHeight: '1.3',
                      letterSpacing: '0.3px'
                    }}>
                      {item.description}
                    </div>
                  </div>

                  {/* Flecha indicadora */}
                  <ChevronRight 
                    size={18} 
                    style={{
                      opacity: isActive ? 1 : 0.6,
                      transform: isHovered ? 'translateX(6px)' : 'translateX(0)',
                      transition: 'all 0.3s ease'
                    }}
                  />

                  {/* Efecto de partículas en hover */}
                  {isHovered && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      right: '10px',
                      width: '6px',
                      height: '6px',
                      background: '#00ffcc',
                      borderRadius: '50%',
                      opacity: 0.8,
                      animation: 'particle 1s ease-out infinite'
                    }} />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer del sidebar */}
        <div style={{
          padding: '24px',
          borderTop: '2px solid rgba(0,255,200,0.1)',
          background: 'linear-gradient(135deg, rgba(0,255,200,0.05) 0%, rgba(52,213,255,0.05) 100%)',
          textAlign: 'center'
        }}>
          <div style={{
            color: '#00ffcc',
            fontSize: '12px',
            fontWeight: 'bold',
            marginBottom: '4px',
            letterSpacing: '1px',
            textShadow: '0 0 8px rgba(0,255,200,0.3)'
          }}>
            MAESTRO HAXOR
          </div>
          <div style={{
            color: 'rgba(0,255,200,0.5)',
            fontSize: '10px',
            letterSpacing: '0.5px'
          }}>
            &gt; PLATFORM v2.0 - SEB4S
          </div>
        </div>
      </div>

      {/* Estilos de animación */}
      <style>
        {`
          @keyframes slideInCyber {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 0.1;
              transform: scale(1);
            }
            50% {
              opacity: 0.3;
              transform: scale(1.1);
            }
          }
          
          @keyframes particle {
            0% {
              opacity: 0.8;
              transform: scale(1);
            }
            100% {
              opacity: 0;
              transform: scale(1.5) translateX(10px);
            }
          }
        `}
      </style>
    </>
  );
};

export default SidebarButton;