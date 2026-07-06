import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Info, AlertCircle, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export default function Toast({ toasts, removeToast }: ToastProps) {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { key?: string; toast: ToastMessage; onDismiss: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const config = {
    success: {
      bg: 'bg-primary-container text-white border-primary',
      icon: <CheckCircle className="w-5 h-5 text-trust-gold shrink-0" />,
    },
    info: {
      bg: 'bg-white text-primary border-outline-variant shadow-lg',
      icon: <Info className="w-5 h-5 text-trust-gold shrink-0" />,
    },
    error: {
      bg: 'bg-red-50 text-red-900 border-red-200 shadow-md',
      icon: <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />,
    },
  }[toast.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.9 }}
      className={`flex items-start gap-3 p-4 rounded-lg border shadow-lg ${config.bg}`}
    >
      {config.icon}
      <div className="flex-1 text-sm font-medium">{toast.text}</div>
      <button
        onClick={onDismiss}
        className="text-current opacity-60 hover:opacity-100 transition-opacity p-0.5 rounded-full hover:bg-black/5"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
