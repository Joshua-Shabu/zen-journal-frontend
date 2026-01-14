import React from 'react';
import Toast from './Toast';

function ToastContainer({ toasts, removeToast }) {
  console.log('ToastContainer received toasts:', toasts);
  console.log('ToastContainer toasts length:', toasts.length);
  
  if (toasts.length === 0) {
    console.log('No toasts to display');
    return null;
  }
  
  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2">
      {toasts.map((toast) => {
        console.log('Rendering toast:', toast);
        return (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        );
      })}
    </div>
  );
}

export default ToastContainer;
