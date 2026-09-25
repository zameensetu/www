import React from 'react';

interface ToastProps {
  message: string | null;
  icon?: string;
}

export const Toast: React.FC<ToastProps> = ({ message, icon = 'check_circle' }) => {
  if (!message) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-[#263143] text-[#ecf1ff] text-xs font-medium shadow-2xl flex items-center gap-2 animate-bounce-short transition-all">
      <span className="material-symbols-outlined text-[18px] text-[#97f5cc]">
        {icon}
      </span>
      <span>{message}</span>
    </div>
  );
};
