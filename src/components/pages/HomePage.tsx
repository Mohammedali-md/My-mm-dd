import React, { useState, useEffect, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { PWAInstallButton } from '../common/PWAInstallButton';
import { CategoryType } from '../../types';
import { 
  Gift, 
  Sparkles, 
  ArrowLeft, 
  Flower2, 
  Star, 
  Truck, 
  Check, 
  Clock, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  MessageCircle, 
  Flame, 
  ShieldCheck, 
  Send,
  Watch,
  Heart
} from 'lucide-react';

interface HeroSlide {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  ctaText: string;
  category?: CategoryType;
  image: string;
  badge: string;
  icon: React.ReactNode;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    tag: 'صناديق الهدايا الملكية',
    title: 'صندوق هدايا فاخر يخلد أجمل اللحظات',
    subtitle: 'تشكيلات حصرية مصممة بعناية فائقة مع شوكولاتة بلجيكية ولمسات إهداء ملكية تأسر القلوب وتفاجئ من تحب.',
    ctaText: 'تسوق الآن',
    category: 'gifts',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1600&q=85',
    badge: 'تغليف ملكي بالختم الشمعي',
    icon: <Gift className="w-4 h-4 text-rose-600" />
  },
  {
    id: 2,
    tag: 'نضارة فائقة وألوان مبهجة',
    title: 'باقات ورد طبيعية نضرة تقطف يومياً',
    subtitle: 'زهور هولندية فواحة بتنسيقات عصرية وألوان ساحرة تعبر عن أصدق المشاعر وتملأ الأرجاء بهجة وحباً.',
    ctaText: 'تسوق الآن',
    category: 'natural-roses',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1600&q=85',
    badge: 'قطاف طازج يومي مضمون 100%',
    icon: <Flower2 className="w-4 h-4 text-rose-600" />
  },
  {
    id: 3,
    tag: 'روائح آسرة تدوم طويلاً',
    title: 'عطر فاخر وتغليف هدية راقٍ واستثنائي',
    subtitle: 'توليفات ملكية من دهن العود المعتق، خشب الصندل، والمسك الأبيض مغلفة بأناقة ومجهزة للإهداء الفوري.',
    ctaText: 'تسوق الآن',
    category: 'perfumes',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1600&q=85',
    badge: 'ثبات وفوحان مضمون لأيام',
    icon: <Sparkles className="w-4 h-4 text-amber-600" />
  },
  {
    id: 4,
    tag: 'أناقة وتألق يدوم',
    title: 'مجموعة إكسسوارات وساعات بلمسات عصرية',
    subtitle: 'قطع مختارة من الأساور والساعات الفاخرة المطلية بالذهب لتكون الإضافة المثالية لأي إطلالة أو هدية قيمة.',
    ctaText: 'تسوق الآن',
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1600&q=85',
    badge: 'مطلية بالذهب ومقاومة للماء',
    icon: <Watch className="w-4 h-4 text-rose-600" />
  }
];

const OCCASIONS = [
  { id: 'birthday', name: 'عيد ميلاد', icon: '🎂', query: 'ميلاد', badge: 'الأكثر بحثاً' },
  { id: 'graduation', name: 'تخرج ونجاح', icon: '🎓', query: 'تخرج', badge: 'موسمي' },
  { id: 'love', name: 'ذكرى حب وزواج', icon: '❤️', query: 'حب', badge: 'رومانسي' },
  { id: 'baby', name: 'قدوم مولود', icon: '👶', query: 'مولود', badge: 'فرحة جديدة' },
  { id: 'thanks', name: 'شكر وتقدير', icon: '💐', query: 'شكر', badge: 'راقي' },
  { id: 'men', name: 'هدايا رجالية', icon: '👔', query: 'رجالي', badge: 'فخم' },
  { id: 'women', name: 'هدايا نسائية', icon: '👝', query: 'نسائي', badge: 'أنيق' },
  { id: 'healing', name: 'حمدلله ع السلامة', icon: '🌿', query: 'سلامة', badge: 'أمنيات طيبة' }
];

export const HomePage: React.FC = () => {
  const { products, navigateTo, addToCart } = useStore();

  // Search input state
  const [searchInput, setSearchInput] = useState('');

  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHoveringHero, setIsHoveringHero] = useState(false);

  // Flash Deal Countdown Timer (Mock countdown for special offers)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 48 });

  // Auto-slide effect every 4 seconds as requested
  useEffect(() => {
    if (isHoveringHero) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHoveringHero]);

  // Flash timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigateTo('products', { search: searchInput.trim() });
    }
  };

  // Best Sellers (الأكثر مبيعاً)
  const bestSellers = useMemo(() => {
    return products.filter((p) => p.isFeatured || p.rating >= 4.8).slice(0, 4);
  }, [products]);

  // Special Offers (العروض الخاصة)
  const specialOffers = useMemo(() => {
    return products.filter((p) => p.originalPrice && p.originalPrice > p.price).slice(0, 4);
  }, [products]);

  // Latest Products (أحدث المنتجات)
  const latestProducts = useMemo(() => {
    return products.filter((p) => p.isNew).concat(products.slice(3, 7)).slice(0, 4);
  }, [products]);

  // Flash deal hero item (Royal box)
  const flashProduct = products.find((p) => p.id === 'prod-1') || products[0];

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 text-right">
      
      {/* 1. شريط البحث السريع والكلمات المفتاحية (في بداية الصفحة) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-stone-200/90">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="ابحث عن هدية، باقة ورد جوري، عطر فرنسي، ساعة يد، أو نوع تغليف..."
                className="w-full pr-12 pl-4 py-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-stone-800 text-sm focus:outline-hidden focus:border-rose-500 focus:bg-white transition"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>بحث في المتجر</span>
            </button>
          </form>

          {/* وسوم البحث السريع الأكثر رواجاً */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-stone-100 text-xs text-stone-500">
            <span className="font-bold text-stone-700">الأكثر رواجاً:</span>
            {[
              { label: 'صندوق المفاجأة الملكي', query: 'المفاجأة الملكي' },
              { label: 'باقة جوري أحمر طبيعي', query: 'جوري' },
              { label: 'عطر مسك الختام', query: 'مسك' },
              { label: 'تغليف شمعي مذهب', query: 'تغليف' },
              { label: 'طقم رجالي ملكي', query: 'رجالي' },
              { label: 'سوار ذهبي أنيق', query: 'سوار' }
            ].map((tag) => (
              <button
                key={tag.label}
                type="button"
                onClick={() => navigateTo('products', { search: tag.query })}
                className="px-3 py-1 rounded-lg bg-stone-100 hover:bg-rose-50 hover:text-rose-600 border border-stone-200/60 transition cursor-pointer"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. السلايدر الرئيسي الكبير والاحترافي (مباشرة بعد شريط البحث) */}
      <section 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        onMouseEnter={() => setIsHoveringHero(true)}
        onMouseLeave={() => setIsHoveringHero(false)}
      >
        <div className="relative rounded-3xl overflow-hidden shadow-lg border border-stone-200/80 bg-stone-100 min-h-[460px] sm:min-h-[520px] lg:min-h-[560px] flex items-center">
          
          {/* الشرائح الأربع (صندوق هدايا فاخر - باقة ورد طبيعية - عطر فاخر مع تغليف هدية - مجموعة إكسسوارات) */}
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* صورة واقعية مشرقة وواضحة بدون أي طبقة سوداء قاتمة */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center"
                />

                {/* طبقة تدرج ضوئية خفيفة جداً فقط لحفظ وضوح النص بدون حجب جمال وإشراق الصورة */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent sm:w-2/3 pointer-events-none" />

                {/* بطاقة المحتوى الواضحة والمشرقة فوق الصورة */}
                <div className="relative max-w-7xl mx-auto px-6 sm:px-10 h-full flex items-center z-10">
                  <div className="max-w-lg py-12 space-y-4 sm:space-y-5">
                    
                    {/* وسم التصنيف المصغر */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-rose-200 text-rose-700 text-xs font-bold shadow-xs">
                      {slide.icon}
                      <span>{slide.tag}</span>
                    </div>

                    {/* العنوان المناسب */}
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-stone-900 leading-tight tracking-tight">
                      {slide.title}
                    </h1>

                    {/* الوصف القصير */}
                    <p className="text-xs sm:text-sm lg:text-base text-stone-700 leading-relaxed font-medium">
                      {slide.subtitle}
                    </p>

                    {/* شارة ميزة إضافية */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{slide.badge}</span>
                    </div>

                    {/* زر تسوق الآن */}
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          if (slide.category) {
                            navigateTo('products', { category: slide.category });
                          } else {
                            navigateTo('products');
                          }
                        }}
                        className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md hover:shadow-lg hover:shadow-rose-600/25 active:scale-95 transition cursor-pointer"
                      >
                        <span>{slide.ctaText}</span>
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}

          {/* أزرار التنقل بالسهمين */}
          <button
            onClick={prevSlide}
            aria-label="الشريحة السابقة"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-stone-800 border border-stone-200 shadow-md flex items-center justify-center hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="الشريحة التالية"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-stone-800 border border-stone-200 shadow-md flex items-center justify-center hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* مؤشرات النقاط للشريحة الفعالة */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/30 backdrop-blur-xs px-3.5 py-1.5 rounded-full">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`انتقل إلى الشريحة ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentSlide ? 'w-6 bg-rose-500' : 'w-2 bg-white/70 hover:bg-white'
                }`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 3. بطاقات المميزات الأربع بعد السلايدر */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* ميزة 1: توصيل سريع وموثوق */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:border-rose-200 transition flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black text-stone-900">توصيل سريع وموثوق</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                توصيل في نفس اليوم لضمان نضارة الورد وسرعة وصول الهدية في موعدها المحدد.
              </p>
            </div>
          </div>

          {/* ميزة 2: ورد طازج 100% */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:border-rose-200 transition flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
              <Flower2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black text-stone-900">ورد طازج 100%</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                قطاف يومي مباشر من أرقى مزارع الورد مع عناية وتغذية تدوم لأطول فترة.
              </p>
            </div>
          </div>

          {/* ميزة 3: إهداء سري بدون فواتير */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:border-rose-200 transition flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black text-stone-900">إهداء سري بدون فواتير</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                نوصل الهدية لباب المستلم مباشرة بدون أي مبالغ أو فواتير لمفاجأة تامة.
              </p>
            </div>
          </div>

          {/* ميزة 4: كرت إهداء وتغليف */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:border-rose-200 transition flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
              <Gift className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black text-stone-900">كرت إهداء وتغليف</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                تغليف ملكي بالختم الشمعي مع طباعة كرت إهداء مخصص بكلماتك مجاناً.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. قسم "اختر هديتك حسب المناسبة" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600">
              <Heart className="w-3.5 h-3.5 fill-rose-600" />
              <span>لحظات لا تُنسى</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
              اختر هديتك حسب المناسبة
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md">
            مهما كانت المناسبة، ستجد لدينا الهدية المثالية التي تعبر عن مشاعرك بكل صدق وأناقة.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {OCCASIONS.map((occ) => (
            <button
              key={occ.id}
              onClick={() => navigateTo('products', { search: occ.query })}
              className="group bg-white p-4 rounded-2xl border border-stone-200/80 hover:border-rose-300 hover:shadow-md transition flex flex-col items-center text-center cursor-pointer relative overflow-hidden"
            >
              <div className="w-14 h-14 rounded-2xl bg-rose-50/70 group-hover:bg-rose-100 flex items-center justify-center text-2xl mb-2.5 transition transform group-hover:scale-110">
                {occ.icon}
              </div>
              <span className="text-xs font-bold text-stone-800 group-hover:text-rose-600 transition">
                {occ.name}
              </span>
              <span className="text-[10px] text-stone-400 mt-0.5">
                {occ.badge}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 5. الأكثر مبيعًا (Best Sellers) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600">
              <Star className="w-3.5 h-3.5 fill-rose-600" />
              <span>اختيارات مفضلة للجميع</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
              الأكثر مبيعاً
            </h2>
          </div>
          <button
            onClick={() => navigateTo('products')}
            className="text-xs sm:text-sm font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>عرض كل المنتجات</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* شبكة المنتجات الأكثر مبيعاً */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. العروض الخاصة (Special Offers) مع عداد تنازلي حي ومنتجات مخفضة */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600">
              <Flame className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
              <span>توفير مميز لفترة محدودة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
              العروض الخاصة
            </h2>
          </div>
          <div className="text-xs sm:text-sm font-bold text-stone-500">
            خصومات تصل حتى 25% مع تغليف وكرت إهداء مجاني
          </div>
        </div>

        {/* بانر العرض المحدود الرئيسي */}
        {flashProduct && (
          <div className="mb-8 rounded-3xl bg-gradient-to-r from-stone-900 via-rose-950 to-stone-900 text-white p-6 sm:p-8 relative overflow-hidden shadow-lg border border-rose-900/40">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-600/40 text-rose-200 text-xs font-bold border border-rose-500/30">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  <span>عرض الأسبوع الخاص</span>
                </div>

                <h3 className="text-xl sm:text-3xl font-black text-white">
                  {flashProduct.name}
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
                  {flashProduct.description}
                </p>

                {/* مؤقت العداد التنازلي الحي */}
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-xs text-rose-300 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>ينتهي خلال:</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="bg-black/50 border border-white/10 px-3 py-1.5 rounded-xl text-center min-w-[50px]">
                      <div className="text-base sm:text-lg font-black font-mono">{timeLeft.hours.toString().padStart(2, '0')}</div>
                      <div className="text-[9px] text-stone-400">ساعة</div>
                    </div>
                    <span className="font-bold text-rose-400">:</span>
                    <div className="bg-black/50 border border-white/10 px-3 py-1.5 rounded-xl text-center min-w-[50px]">
                      <div className="text-base sm:text-lg font-black font-mono">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                      <div className="text-[9px] text-stone-400">دقيقة</div>
                    </div>
                    <span className="font-bold text-rose-400">:</span>
                    <div className="bg-black/50 border border-white/10 px-3 py-1.5 rounded-xl text-center min-w-[50px]">
                      <div className="text-base sm:text-lg font-black text-rose-400 font-mono">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                      <div className="text-[9px] text-stone-400">ثانية</div>
                    </div>
                  </div>
                </div>

                {/* السعر وزر الطلب */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-white">{flashProduct.price} ر.س</span>
                    {flashProduct.originalPrice && (
                      <span className="text-sm text-stone-400 line-through">{flashProduct.originalPrice} ر.س</span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      addToCart(flashProduct, 1);
                      navigateTo('cart');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition cursor-pointer"
                  >
                    اطلب العرض الآن
                  </button>
                </div>

              </div>

              {/* صورة المنتج */}
              <div className="lg:col-span-4">
                <div className="rounded-2xl overflow-hidden shadow-md aspect-4/3 sm:aspect-square bg-stone-800">
                  <img
                    src={flashProduct.image}
                    alt={flashProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* شبكة منتجات العروض الخاصة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialOffers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. أحدث المنتجات (Latest Products) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600">
              <Sparkles className="w-3.5 h-3.5" />
              <span>وصل حديثاً</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
              أحدث المنتجات
            </h2>
          </div>
          <button
            onClick={() => navigateTo('products')}
            className="text-xs sm:text-sm font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>استكشف الكتالوج بالكامل</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* شبكة أحدث المنتجات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 8. آراء العملاء (Customer Reviews) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600">
              <Star className="w-3.5 h-3.5 fill-rose-600" />
              <span>تجارب حقيقية</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
              ماذا يقول عملاء Surprise - G؟
            </h2>
          </div>
          <div className="text-xs sm:text-sm font-bold text-stone-600">
            أكثر من 5,000 عميل سعيد بتقييم 4.9 من 5 ★
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              "طلبت صندوق المفاجأة الملكي مع باقة جوري أحمر لوالدتي في ذكرى ميلادها. التغليف بالشمع المذهب وكرت الإهداء كان شيئاً لا يصدق من الجمال، والورد كان فريش وكأنه مقطوف للتو!"
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900">سارة الشمري</span>
              <span className="text-stone-400">الرياض • مشترٍ موثوق</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              "خدمة إرسال الهدية مباشرة للمستلم ريحتني جداً! نسقوا مع صديقي بكل ذوق وسلموه الهدية بدون أي ذكر للأسعار، وردة فعله كانت لا توصف. شكراً Surprise - G على الدقة والاحترافية."
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900">عبدالرحمن القحطاني</span>
              <span className="text-stone-400">جدة • مشترٍ موثوق</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              "عطر مسك الليل والسوار الأنيق فخامة تفوق الوصف. رائحة العطر ثابتة لعدة أيام، والعلبة صالحة لأن تقدم لأرقى المناسبات مباشرة. المتجر المفضل لدي للهدايا بلا منازع!"
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900">نورة السبيعي</span>
              <span className="text-stone-400">الدمام • مشترٍ موثوق</span>
            </div>
          </div>

        </div>
      </section>

      {/* 9. خدمة المساعد الشخصي عبر واتساب وتنسيق الهدايا الخاصة */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-emerald-950 text-white p-6 sm:p-8 border border-emerald-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-right">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400">
              <MessageCircle className="w-4 h-4" />
              <span>خدمة المنسق الخاص المجانية</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              تريد تنسيق باقة خاصة أو هدية بميزانية محددة؟
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200 max-w-xl">
              تحدث مباشرة مع خبير تنسيق الزهور والهدايا في Surprise - G عبر واتساب، وسيقوم بتجهيز بوكس مخصص بالكامل لمناسبتك الخاصة.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="https://wa.me/966500000000?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D9%85%D9%86%D8%B3%D9%82%20%D8%A7%D9%84%D9%87%D8%AF%D8%A7%D9%8A%D8%A7%20%D9%81%D9%8A%20Surprise%20-%20G%20%D9%84%D8%AA%D9%86%D8%B3%D9%8A%D9%82%20%D8%B7%D9%84%D8%A8%20%D8%AE%D8%A7%D8%B5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-sm shadow-lg transition cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>تحدث مع منسق الهدايا عبر واتساب</span>
            </a>
          </div>
        </div>
      </section>

      {/* 10. تثبيت التطبيق PWA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 text-right">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-600">
              <Sparkles className="w-3.5 h-3.5" />
              <span>تطبيق خفيف وسريع</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900">
              ثبّت متجر Surprise - G على جهازك كتطبيق مستقل!
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
              تم بناء المتجر بتقنية Progressive Web App ليعمل كتطبيق سطح مكتب فائق السرعة على ويندوز وماك، أو على هاتفك الذكي.
            </p>
          </div>
          <div className="shrink-0">
            <PWAInstallButton variant="banner" />
          </div>
        </div>
      </section>

    </div>
  );
};
