import React from 'react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div 
      id="offline-indicator-banner"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-stone-900/90 backdrop-blur-md px-4 py-2.5 text-xs font-medium text-white shadow-xl border border-stone-700 animate-in fade-in"
    >
      <WifiOff className="h-4 w-4 text-amber-400" />
      <span>أنت غير متصل بالإنترنت — تصفح المنتجات المحفوظة في وضع عدم الاتصال</span>
    </div>
  );
};
