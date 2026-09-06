import React, { useState } from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { Download, Monitor, X, Share2, PlusSquare } from 'lucide-react';

interface PWAInstallButtonProps {
  variant?: 'header' | 'floating' | 'banner';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'header' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running in standalone mode (desktop or mobile app), do not show
  if (isInstalled) {
    return null;
  }

  // Desktop / Chromium / Android install flow
  if (isInstallable) {
    if (variant === 'header') {
      return (
        <button
          id="pwa-install-header-btn"
          onClick={install}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-all shadow-xs"
          title="تثبيت Surprise - G كتطبيق على سطح المكتب أو هاتفك"
        >
          <Monitor className="w-3.5 h-3.5 text-rose-600" />
          <span className="hidden sm:inline">تطبيق الديسكتوب</span>
          <span className="sm:hidden">تثبيت</span>
        </button>
      );
    }

    return (
      <button
        id="pwa-install-btn"
        onClick={install}
        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition-all"
      >
        <Download className="w-4 h-4" />
        <span>تثبيت التطبيق على جهازك</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          id="pwa-install-ios-btn"
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-all shadow-xs"
          title="تثبيت على أجهزة آيفون وآيباد"
        >
          <Download className="w-3.5 h-3.5" />
          <span>تثبيت في الشاشة</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl text-right">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="text-base font-bold text-stone-900">تثبيت التطبيق على آيفون / آيباد</h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-lg text-stone-400 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-4 space-y-3 text-sm text-stone-600">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700 font-bold text-xs">١</span>
                  <p>اضغط على زر المشاركة <Share2 className="w-4 h-4 inline text-blue-600" /> في متصفح سفاري بالأسفل.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700 font-bold text-xs">٢</span>
                  <p>اختر <strong className="text-stone-900">"إضافة إلى الصفحة الرئيسية"</strong> <PlusSquare className="w-4 h-4 inline text-stone-700" /> من القائمة.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700 font-bold text-xs">٣</span>
                  <p>سيعمل المتجر كتطبيق مستقل وسريع على هاتفك!</p>
                </div>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-6 w-full rounded-xl bg-rose-600 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 transition"
              >
                فهمت، شكراً
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
