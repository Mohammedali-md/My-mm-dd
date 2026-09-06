import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/initialData';
import { ProductCard } from '../common/ProductCard';
import { 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Gift, 
  Check, 
  Minus, 
  Plus, 
  ArrowRight,
  Sparkles,
  Share2
} from 'lucide-react';

export const ProductDetailsPage: React.FC = () => {
  const { 
    products, 
    selectedProductId, 
    navigateTo, 
    addToCart, 
    showToast 
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [giftMessage, setGiftMessage] = useState('');
  const [includeGiftCard, setIncludeGiftCard] = useState(false);

  // Find product by id or fallback to first
  const product = products.find((p) => p.id === selectedProductId) || products[0];

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-right">
        <h2 className="text-xl font-bold">عذراً، لم يتم العثور على المنتج المطلوب.</h2>
        <button
          onClick={() => navigateTo('products')}
          className="mt-4 px-6 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs"
        >
          العودة لجميع المنتجات
        </button>
      </div>
    );
  }

  const categoryObj = CATEGORIES.find((c) => c.id === product.category);
  const isOutOfStock = product.stock <= 0;
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = (instantCheckout = false) => {
    if (isOutOfStock) return;
    const finalGiftNote = includeGiftCard ? giftMessage : undefined;
    addToCart(product, quantity, finalGiftNote);
    if (instantCheckout) {
      navigateTo('cart');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('تم نسخ الرابط', 'تم نسخ رابط المنتج إلى الحافظة', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-right">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-medium text-stone-500">
        <button 
          onClick={() => navigateTo('home')} 
          className="hover:text-rose-600 transition"
        >
          الرئيسية
        </button>
        <span>/</span>
        <button 
          onClick={() => navigateTo('products', { category: product.category })} 
          className="hover:text-rose-600 transition"
        >
          {categoryObj?.name || 'القسم'}
        </button>
        <span>/</span>
        <span className="text-stone-900 font-bold truncate max-w-xs sm:max-w-md">
          {product.name}
        </span>
      </nav>

      {/* Main Product Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-xs">
        
        {/* Product Image Section */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-100 shadow-inner">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isFeatured && (
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-rose-600 text-white shadow-xs">
                مميّز / الأكثر طلباً
              </span>
            )}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center">
                <span className="px-4 py-2 rounded-2xl bg-red-600 text-white text-sm font-bold shadow-lg">
                  نفد من المخزون
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
            <div className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>صورة حقيقية للمنتج وتغليفه الأصلي</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-stone-600 hover:text-rose-600 font-bold transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>مشاركة المنتج</span>
            </button>
          </div>
        </div>

        {/* Product Details & Actions */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Category badge & Rating */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-rose-50 text-rose-700">
                {categoryObj?.name || 'هدايا'}
              </span>
              <div className="flex items-center gap-1.5 text-amber-500 text-xs">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-stone-400">({product.reviewCount} تقييم حقيقي)</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 leading-snug">
              {product.name}
            </h1>

            {/* Price Box */}
            <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-stone-50 border border-stone-200/60">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-stone-900">{product.price}</span>
                <span className="text-sm font-bold text-rose-600">ريال سعودي</span>
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-stone-400 line-through">
                    {product.originalPrice} ر.س
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                    وفر {product.originalPrice - product.price} ر.س
                  </span>
                </div>
              )}
            </div>

            {/* Stock Availability */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-stone-700">حالة المخزون:</span>
              {isOutOfStock ? (
                <span className="text-red-600 font-bold">غير متوفر حالياً</span>
              ) : (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>متوفر في المستودع ({product.stock} قطعة متاحة)</span>
                </span>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2 text-stone-600 text-sm leading-relaxed border-t border-b border-stone-100 py-4">
              <h3 className="font-bold text-stone-900 text-xs">عن هذا المنتج:</h3>
              <p>{product.description}</p>
              
              {product.features && product.features.length > 0 && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-stone-700">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Personalized Gift Message Option */}
            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-3">
              <label className="flex items-center justify-between cursor-pointer select-none">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-rose-600" />
                  <span className="text-xs font-bold text-stone-900">
                    إرفاق بطاقة إهداء مخصصة (مجاناً)
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={includeGiftCard}
                  onChange={(e) => setIncludeGiftCard(e.target.checked)}
                  className="w-4 h-4 text-rose-600 rounded border-stone-300 focus:ring-rose-500"
                />
              </label>

              {includeGiftCard && (
                <div className="space-y-2 animate-in fade-in">
                  <textarea
                    rows={2}
                    placeholder="اكتب رسالتك الجميلة هنا ليتم كتابتها بالخط العربي على الكرت..."
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    className="w-full p-2.5 text-xs bg-white border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                  <span className="text-[11px] text-rose-700 block">
                    * سيتم إرفاق الكرت داخل ظرف شمعي فاخر مع الهدية.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Area: Quantity & Add to Cart */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              {/* Quantity selector */}
              <div className="flex items-center border border-stone-300 rounded-2xl bg-stone-50 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="p-2 rounded-xl text-stone-600 hover:bg-white disabled:opacity-40 transition"
                  aria-label="تقليل الكمية"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-stone-900 min-w-[36px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  disabled={quantity >= product.stock || isOutOfStock}
                  className="p-2 rounded-xl text-stone-600 hover:bg-white disabled:opacity-40 transition"
                  aria-label="زيادة الكمية"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                id="details-add-to-cart-btn"
                onClick={() => handleAddToCart(false)}
                disabled={isOutOfStock}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-rose-600 hover:bg-rose-500 active:scale-98 text-white font-bold text-sm shadow-md transition disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>إضافة إلى سلة المشتريات</span>
              </button>
            </div>

            {/* Quick Checkout button */}
            <button
              id="details-quick-buy-btn"
              onClick={() => handleAddToCart(true)}
              disabled={isOutOfStock}
              className="w-full py-3 px-6 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm transition shadow-xs disabled:opacity-40 disabled:cursor-not-allowed"
            >
              شراء فوري والانتقال لإتمام الطلب
            </button>

            {/* Trust highlights */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-100 text-center text-[11px] text-stone-500 font-medium">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-rose-600" />
                <span>شحن وتوصيل مبرد</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Gift className="w-4 h-4 text-rose-600" />
                <span>تغليف إهداء راقي</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-rose-600" />
                <span>ضمان الجودة 100%</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-stone-900">
              منتجات ذات صلة من {categoryObj?.name}
            </h2>
            <button
              onClick={() => navigateTo('products', { category: product.category })}
              className="text-xs font-bold text-rose-600 hover:underline"
            >
              عرض المزيد من هذا القسم
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
