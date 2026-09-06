import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShieldCheck, Lock, Mail, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { loginAdmin, navigateTo } = useStore();
  const [email, setEmail] = useState('admin@surprise-g.com');
  const [password, setPassword] = useState('admin123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password, email);
    if (success) {
      navigateTo('admin-dashboard');
    }
  };

  const handleQuickDemoLogin = () => {
    loginAdmin('admin123', 'admin@surprise-g.com');
    navigateTo('admin-dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-right">
      <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xl space-y-6">
        
        {/* Header Icon */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-stone-900 text-amber-400 flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-stone-900">
            تسجيل دخول المدير
          </h1>
          <p className="text-xs text-stone-500">
            لوحة الإدارة الحصرية لمتجر Surprise - G لإدارة المنتجات والمخزون والطلبات
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-stone-700 block">البريد الإلكتروني للإدارة</label>
            <div className="relative">
              <input
                id="admin-login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-rose-500 text-stone-900"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-stone-700 block">كلمة المرور</label>
            <div className="relative">
              <input
                id="admin-login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-rose-500 text-stone-900"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            id="admin-login-submit-btn"
            type="submit"
            className="w-full py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
          >
            <KeyRound className="w-4 h-4 text-amber-400" />
            <span>تسجيل الدخول للوحة التحكم</span>
          </button>
        </form>

        {/* Demo Fast Login Helper */}
        <div className="pt-2 border-t border-stone-100">
          <button
            id="admin-quick-demo-login-btn"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 transition flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>دخول تجريبي فوري بنقرة واحدة (admin123)</span>
          </button>
        </div>

        {/* Return link */}
        <div className="text-center">
          <button
            onClick={() => navigateTo('home')}
            className="text-xs text-stone-500 hover:text-stone-800 transition"
          >
            ← العودة إلى المتجر الرئيسي
          </button>
        </div>

      </div>
    </div>
  );
};
