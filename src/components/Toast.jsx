import { useEffect, useState } from 'react';

export default function Toast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      const id = Date.now();
      setToasts(prev => [...prev, { id, message: e.detail.message }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
    };
    window.addEventListener('lavstore-toast', handler);
    return () => window.removeEventListener('lavstore-toast', handler);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => (
        <div key={toast.id}
          className="bg-surface border border-border rounded-2xl px-4 py-3 text-sm text-text-main font-medium
            shadow-soft-lg animate-fade-in flex items-center gap-3 min-w-[240px] max-w-xs pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-success flex-shrink-0" />
          {toast.message}
        </div>
      ))}
    </div>
  );
}
