import React, { useEffect } from 'react';

function Toast({ message, type, onClose }) {
  console.log('Toast component rendering:', { message, type });
  
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Toast auto-dismissing');
      onClose();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          background: '#10b981',
          color: 'white',
          icon: '✓'
        };
      case 'error':
        return {
          background: '#ef4444',
          color: 'white',
          icon: '✕'
        };
      case 'info':
        return {
          background: '#3b82f6',
          color: 'white',
          icon: 'ℹ'
        };
      default:
        return {
          background: '#6b7280',
          color: 'white',
          icon: '•'
        };
    }
  };

  const styles = getStyles();
  console.log('Final toast styles:', styles);

  return (
    <div 
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        backgroundColor: styles.background,
        color: styles.color,
        padding: '16px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        fontSize: '14px',
        fontWeight: '300',
        minWidth: '300px',
        maxWidth: '400px',
        fontFamily: 'Inter, sans-serif',
        animation: 'slideIn 0.3s ease-out'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ 
          fontSize: '18px',
          fontWeight: 'bold',
          lineHeight: '1'
        }}>
          {styles.icon}
        </div>
        <div style={{ flex: 1, lineHeight: '1.4' }}>
          {message}
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: styles.color,
            fontSize: '20px',
            cursor: 'pointer',
            opacity: 0.8,
            padding: '0',
            marginLeft: '8px'
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default Toast;
