import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/initialData';
import { 
  Gift, 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  Truck, 
  Sparkles, 
  ShieldCheck, 
  RotateCcw,
  Clock
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      {/* Value Badges Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-stone-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-stone-800/40 border border-stone-800">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">تغليف هدايا احترافي</h4>
              <p className="text-xs text-stone-400 mt-0.5">أشرطة حريرية وأختام شمعية ملكية</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-stone-800/40 border border-stone-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">ورود طبيعية طازجة</h4>
              <p className="text-xs text-stone-400 mt-0.5">منتقاة يومياً ومضمونة النضارة</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-stone-800/40 border border-stone-800">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">توصيل سريع ومباشر</h4>
              <p className="text-xs text-stone-400 mt-0.5">إمكانية التوصيل المباشر للمستلم</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-stone-800/40 border border-stone-800">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">دفع آمن وموثوق</h4>
              <p className="text-xs text-stone-400 mt-0.5">Apple Pay، مدى، والدفع عند الاستلام</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4 text-right">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center text-white">
                <Gift className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white">
                Surprise <span className="text-rose-500 font-bold">- G</span>
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              المتجر المتخصص في فنون الإهداء الفاخر، تشكيلات العطور الشرقية والعالمية، 
              الإكسسوارات الراقية، وباقات الورد الطبيعي والصناعي مع لمسات تغليف استثنائية.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>المملكة العربية السعودية — الرياض، جدة، الدمام وكافة المدن</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-400" />
                <span>خدمة تجهيز وتوصيل الطلبات يومياً من ٩ ص حتى ١١ م</span>
              </div>
            </div>
          </div>

          {/* Categories Links */}
          <div className="space-y-3 text-right">
            <h3 className="text-sm font-bold text-white tracking-wide">أقسام المتجر</h3>
            <ul className="space-y-2 text-xs text-stone-400">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigateTo('products', { category: cat.id })}
                    className="hover:text-rose-400 transition"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-right">
            <h3 className="text-sm font-bold text-white tracking-wide">روابط سريعة</h3>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-rose-400 transition">
                  الصفحة الرئيسية
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('products')} className="hover:text-rose-400 transition">
                  جميع المنتجات
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('categories')} className="hover:text-rose-400 transition">
                  دليل التصنيفات
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('cart')} className="hover:text-rose-400 transition">
                  سلة المشتريات
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-rose-400 transition">
                  اتصل بنا
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin-login')} className="hover:text-rose-400 transition">
                  تسجيل دخول الإدارة
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Support */}
          <div className="space-y-3 text-right">
            <h3 className="text-sm font-bold text-white tracking-wide">خدمة العملاء</h3>
            <div className="space-y-2 text-xs text-stone-400">
              <a 
                href="https://wa.me/966500000000" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-xl bg-stone-800/60 hover:bg-emerald-900/30 text-emerald-400 border border-stone-700/50 transition"
              >
                <Phone className="w-4 h-4" />
                <span>محادثة واتساب مباشرة</span>
              </a>
              <a 
                href="mailto:support@surprise-g.com"
                className="flex items-center gap-2 p-2 rounded-xl bg-stone-800/60 hover:bg-stone-800 text-stone-300 border border-stone-700/50 transition"
              >
                <Mail className="w-4 h-4 text-rose-400" />
                <span>support@surprise-g.com</span>
              </a>
            </div>
            <div className="pt-2 text-[11px] text-stone-400 leading-relaxed">
              يسعدنا دائماً خدمتكم ومساعدتكم في اختيار الهدية المثالية لأحبائكم.
            </div>
          </div>
        </div>

        {/* Bottom copyright & payment methods */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} Surprise - G. جميع الحقوق محفوظة لمتجر سوربرايز جي.</p>
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 rounded bg-stone-800 text-[11px] font-semibold text-stone-300">مدى Mada</span>
            <span className="px-2 py-1 rounded bg-stone-800 text-[11px] font-semibold text-stone-300">Apple Pay</span>
            <span className="px-2 py-1 rounded bg-stone-800 text-[11px] font-semibold text-stone-300">Visa / Mastercard</span>
            <span className="px-2 py-1 rounded bg-stone-800 text-[11px] font-semibold text-stone-300">الدفع عند الاستلام</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
