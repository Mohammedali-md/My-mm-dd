import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { PWAInstallButton } from './PWAInstallButton';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Gift, 
  ShieldCheck, 
  Sparkles,
  Phone,
  LayoutDashboard
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentPage, 
    navigateTo, 
    cartTotalCount, 
    searchQuery, 
    setSearchQuery, 
    adminUser 
  } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo('products', { search: localSearch });
  };

  const navLinks = [
    { page: 'home' as const, label: 'الرئيسية' },
    { page: 'products' as const, label: 'جميع المنتجات' },
    { page: 'categories' as const, label: 'التصنيفات' },
    { page: 'contact' as const, label: 'تواصل معنا' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      {/* Top Notification / Value Bar */}
      <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-pink-900 text-rose-50 text-xs py-1.5 px-4 text-center font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>توصيل سريع لجميع مناطق المملكة مع خيارات التغليف الملكي</span>
          </div>
          <div className="mx-auto sm:mx-0 flex items-center gap-4">
            <span className="text-amber-300 font-semibold">شحن مجاني للطلبات فوق ٣٠٠ ر.س</span>
            <span className="hidden md:inline text-rose-300">|</span>
            <button 
              onClick={() => navigateTo('contact')}
              className="hidden md:flex items-center gap-1 hover:underline text-rose-200"
            >
              <Phone className="w-3 h-3" />
              <span>خدمة العملاء: +966 50 000 0000</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo & Brand Identity */}
          <div 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
            id="brand-logo-btn"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-pink-500 flex items-center justify-center text-white shadow-sm shadow-rose-200 group-hover:scale-105 transition-transform duration-200">
              <Gift className="w-6 h-6" />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-stone-900 leading-tight">
                Surprise <span className="text-rose-600 font-black">- G</span>
              </span>
              <span className="text-[11px] text-stone-500 font-medium -mt-0.5">
                متجر الهدايا والعطور والورد الفاخر
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  id={`nav-link-${item.page}`}
                  onClick={() => navigateTo(item.page)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-rose-50 text-rose-700 shadow-xs'
                      : 'text-stone-700 hover:text-rose-600 hover:bg-stone-100/70'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Search Input Bar (Desktop) */}
          <form 
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-xs xl:max-w-sm relative"
          >
            <input
              id="desktop-search-input"
              type="text"
              placeholder="ابحث عن هدية، عطر، باقة ورد..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-stone-100 border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 focus:bg-white transition-all text-stone-900 placeholder:text-stone-400"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-rose-600 transition"
              aria-label="بحث"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Action Buttons: PWA Install, Cart, Admin */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* PWA Install Button */}
            <PWAInstallButton variant="header" />

            {/* Shopping Cart Button */}
            <button
              id="header-cart-btn"
              onClick={() => navigateTo('cart')}
              className="relative p-2.5 rounded-full text-stone-700 hover:text-rose-600 hover:bg-stone-100 transition"
              aria-label="سلة المشتريات"
              title="سلة المشتريات"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartTotalCount > 0 && (
                <span className="absolute -top-1 -left-1 flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-rose-600 text-white text-[11px] font-bold shadow-xs animate-in zoom-in">
                  {cartTotalCount}
                </span>
              )}
            </button>

            {/* Admin Portal Button */}
            {adminUser.isLoggedIn ? (
              <button
                id="header-admin-dashboard-btn"
                onClick={() => navigateTo('admin-dashboard')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-stone-900 text-white hover:bg-stone-800 transition shadow-xs"
                title="لوحة تحكم المدير"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">لوحة الإدارة</span>
              </button>
            ) : (
              <button
                id="header-admin-login-btn"
                onClick={() => navigateTo('admin-login')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 transition"
                title="تسجيل دخول الإدارة"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
                <span className="hidden sm:inline">المدير</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              id="mobile-search-input"
              type="text"
              placeholder="ابحث عن هدية، عطر، ورد..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-stone-100 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-rose-400"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          {navLinks.map((item) => (
            <button
              key={item.page}
              onClick={() => {
                navigateTo(item.page);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-right text-sm font-semibold transition ${
                currentPage === item.page
                  ? 'bg-rose-50 text-rose-700'
                  : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}

          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
            <button
              onClick={() => {
                navigateTo('cart');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-stone-50 text-stone-800 text-sm font-semibold"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-rose-600" />
                <span>سلة المشتريات</span>
              </div>
              <span className="bg-rose-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {cartTotalCount}
              </span>
            </button>

            {adminUser.isLoggedIn ? (
              <button
                onClick={() => {
                  navigateTo('admin-dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 p-3 rounded-xl bg-stone-900 text-white text-sm font-semibold"
              >
                <LayoutDashboard className="w-4 h-4 text-amber-400" />
                <span>الدخول للوحة تحكم المدير</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  navigateTo('admin-login');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 p-3 rounded-xl border border-stone-300 text-stone-700 text-sm font-semibold"
              >
                <ShieldCheck className="w-4 h-4 text-stone-500" />
                <span>تسجيل دخول المدير</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
