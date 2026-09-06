import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ArrowRight, 
  Gift, 
  Truck, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    navigateTo, 
    cartSubtotal 
  } = useStore();

  const [withGiftWrapping, setWithGiftWrapping] = useState(false);

  // Free shipping threshold = 300 SAR
  const freeShippingThreshold = 300;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  
  const shippingFee = cartSubtotal >= freeShippingThreshold ? 0 : (cart.length > 0 ? 25 : 0);
  const wrappingFee = withGiftWrapping ? 35 : 0;
  const totalAmount = cartSubtotal + shippingFee + wrappingFee;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-right space-y-6">
        <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-stone-900">سلة مشترياتك فارغة حالياً</h2>
          <p className="text-sm text-stone-500 max-w-sm mx-auto">
            لم تقم بإضافة أي هدايا أو عطور أو باقات ورد إلى سلتك بعد. استكشف تشكيلتنا واختر أجمل المفاجآت!
          </p>
        </div>
        <button
          id="cart-empty-browse-btn"
          onClick={() => navigateTo('products')}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-rose-600 text-white font-bold text-sm hover:bg-rose-500 shadow-md transition"
        >
          <span>تصفح المنتجات الآن</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-right">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
            سلة المشتريات
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            لديك {cart.reduce((s, i) => s + i.quantity, 0)} عناصر في سلتك
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>تفريغ السلة بالكامل</span>
        </button>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="bg-rose-50/70 border border-rose-100 rounded-2xl p-4 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-2 text-rose-900">
            <Truck className="w-4 h-4 text-rose-600" />
            {remainingForFreeShipping === 0 ? (
              <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                مبروك! لقد حصلت على توصيل مجاني لكامل طلبيتك
              </span>
            ) : (
              <span>
                أضف منتجات بقيمة <span className="text-rose-700">{remainingForFreeShipping} ر.س</span> للحصول على شحن مجاني!
              </span>
            )}
          </div>
          <span className="text-stone-500">{freeShippingProgress}%</span>
        </div>
        <div className="w-full h-2 bg-rose-200/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-rose-600 rounded-full transition-all duration-500"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Cart Layout: Items & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(({ product, quantity, giftCardMessage }) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center gap-4 text-right"
            >
              {/* Product Image */}
              <div 
                onClick={() => navigateTo('product-details', { productId: product.id })}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-stone-100 shrink-0 cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0 space-y-1 w-full sm:w-auto">
                <h3 
                  onClick={() => navigateTo('product-details', { productId: product.id })}
                  className="text-sm font-bold text-stone-900 hover:text-rose-600 cursor-pointer line-clamp-1"
                >
                  {product.name}
                </h3>
                
                <div className="text-xs text-stone-500">
                  سعر الحبة: <span className="font-bold text-stone-800">{product.price} ر.س</span>
                </div>

                {giftCardMessage && (
                  <div className="p-2 rounded-lg bg-stone-50 border border-stone-200/70 text-[11px] text-stone-600 mt-1">
                    <span className="font-bold text-rose-700">رسالة الكرت:</span> "{giftCardMessage}"
                  </div>
                )}
              </div>

              {/* Quantity Controls & Subtotal */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                {/* Quantity */}
                <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 p-0.5">
                  <button
                    onClick={() => updateCartQuantity(product.id, quantity - 1)}
                    className="p-1.5 rounded-lg text-stone-600 hover:bg-white"
                    aria-label="تقليل"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-stone-900 min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(product.id, quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="p-1.5 rounded-lg text-stone-600 hover:bg-white disabled:opacity-30"
                    aria-label="زيادة"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-left sm:text-right min-w-[80px]">
                  <span className="text-sm font-black text-stone-900 block">
                    {product.price * quantity} ر.س
                  </span>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                  title="حذف من السلة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}

          {/* Continue Shopping Button */}
          <button
            onClick={() => navigateTo('products')}
            className="flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-rose-600 transition pt-2"
          >
            <ArrowRight className="w-4 h-4" />
            <span>متابعة التسوق وإضافة هدايا أخرى</span>
          </button>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-6">
          <h2 className="text-base font-bold text-stone-900 pb-3 border-b border-stone-100">
            ملخص الطلب
          </h2>

          {/* Gift Wrapping Add-on Checkbox */}
          <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={withGiftWrapping}
                onChange={(e) => setWithGiftWrapping(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-rose-600 rounded border-stone-300 focus:ring-rose-500"
              />
              <div className="text-xs">
                <div className="flex items-center gap-1.5 font-bold text-stone-900">
                  <Gift className="w-4 h-4 text-amber-600" />
                  <span>إضافة تغليف ملكي فاخر (+35 ر.س)</span>
                </div>
                <p className="text-[11px] text-stone-600 mt-1 leading-normal">
                  تغليف الطلب بأكمله بورق ياباني وشريط حريري أنيق وختم شمعي مذهب.
                </p>
              </div>
            </label>
          </div>

          {/* Cost breakdown */}
          <div className="space-y-3 text-xs text-stone-600">
            <div className="flex items-center justify-between">
              <span>المجموع الفرعي للمنتجات:</span>
              <span className="font-bold text-stone-900">{cartSubtotal} ر.س</span>
            </div>

            <div className="flex items-center justify-between">
              <span>تكلفة التوصيل:</span>
              {shippingFee === 0 ? (
                <span className="font-bold text-emerald-700">مجاني</span>
              ) : (
                <span className="font-bold text-stone-900">{shippingFee} ر.س</span>
              )}
            </div>

            {withGiftWrapping && (
              <div className="flex items-center justify-between text-amber-700">
                <span>رسوم التغليف الملكي:</span>
                <span className="font-bold">+35 ر.س</span>
              </div>
            )}

            <div className="pt-3 border-t border-stone-200 flex items-baseline justify-between">
              <span className="text-sm font-bold text-stone-900">المجموع الكلي:</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-rose-600">{totalAmount}</span>
                <span className="text-xs font-bold text-stone-900">ر.س</span>
              </div>
            </div>
            <span className="text-[10px] text-stone-400 block text-right">
              * جميع الأسعار شاملة ضريبة القيمة المضافة 15%.
            </span>
          </div>

          {/* Checkout CTA Button */}
          <button
            id="cart-proceed-checkout-btn"
            onClick={() => navigateTo('checkout')}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-sm shadow-md hover:shadow-lg hover:brightness-105 active:scale-98 transition flex items-center justify-center gap-2"
          >
            <span>متابعة لإتمام الطلب والدفع</span>
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Security note */}
          <div className="flex items-center justify-center gap-2 text-xs text-stone-400 pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>دفع آمن 100% مع ضمان التسليم الفوري</span>
          </div>
        </div>

      </div>
    </div>
  );
};
