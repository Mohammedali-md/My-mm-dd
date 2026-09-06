import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order } from '../../types';
import { 
  ShieldCheck, 
  Gift, 
  Truck, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Building2, 
  ArrowLeft, 
  Check, 
  AlertCircle 
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, cartSubtotal, createOrder, navigateTo, showToast } = useStore();

  // If cart is empty, redirect
  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center text-right space-y-4">
        <h2 className="text-xl font-bold text-stone-900">سلة المشتريات فارغة</h2>
        <p className="text-xs text-stone-500">لا يمكنك إتمام الطلب دون وجود منتجات في السلة.</p>
        <button
          onClick={() => navigateTo('products')}
          className="px-6 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold"
        >
          العودة للمنتجات
        </button>
      </div>
    );
  }

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [city, setCity] = useState('الرياض');
  const [address, setAddress] = useState('');
  
  // Gift for other options
  const [isGiftForOther, setIsGiftForOther] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [giftMessage, setGiftMessage] = useState('');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('apple_pay');
  const [withGiftWrapping, setWithGiftWrapping] = useState(false);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cost calculations
  const shippingFee = cartSubtotal >= 300 ? 0 : 25;
  const wrappingFee = withGiftWrapping ? 35 : 0;
  const grandTotal = cartSubtotal + shippingFee + wrappingFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !customerPhone.trim() || !address.trim()) {
      showToast('بيانات ناقصة', 'يرجى إكمال جميع الحقول المطلوبة (الاسم، الهاتف، العنوان)', 'error');
      return;
    }

    if (isGiftForOther && (!recipientName.trim() || !recipientPhone.trim())) {
      showToast('بيانات المستلم ناقصة', 'يرجى إدخال اسم المستلم ورقمه لتنسيق التوصيل', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      createOrder({
        customerName,
        customerPhone,
        city,
        address,
        isGiftForOther,
        recipientName: isGiftForOther ? recipientName : undefined,
        recipientPhone: isGiftForOther ? recipientPhone : undefined,
        giftMessage: isGiftForOther ? giftMessage : undefined,
        paymentMethod,
        withGiftWrapping,
        notes: notes.trim() || undefined,
      });

      navigateTo('order-success');
    } catch (err) {
      console.error(err);
      showToast('حدث خطأ', 'تعذر إتمام الطلب، يرجى المحاولة مرة أخرى', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-right">
      {/* Title */}
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
          إتمام الطلب
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          أدخل تفاصيل التوصيل والدفع لتأكيد وشحن هديتك الفاخرة
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Fields: Left/Main 8 cols */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Step 1: Customer Contact & Delivery Info */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-rose-700 font-bold text-xs">١</span>
              <h2 className="text-base font-bold text-stone-900">بيانات المشتري وعنوان التوصيل</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-stone-700 block">الاسم الكامل *</label>
                <input
                  id="checkout-customer-name"
                  type="text"
                  required
                  placeholder="مثال: فهد السبيعي"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-rose-500 text-stone-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 block">رقم الجوال / واتساب *</label>
                <input
                  id="checkout-customer-phone"
                  type="tel"
                  required
                  placeholder="مثال: 0501234567"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-rose-500 text-stone-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 block">المدينة *</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-rose-500 text-stone-900 font-medium"
                >
                  <option value="الرياض">الرياض</option>
                  <option value="جدة">جدة</option>
                  <option value="الدمام">الدمام</option>
                  <option value="مكة المكرمة">مكة المكرمة</option>
                  <option value="المدينة المنورة">المدينة المنورة</option>
                  <option value="الخبر">الخبر</option>
                  <option value="الظهران">الظهران</option>
                  <option value="القصيم">القصيم / بريدة</option>
                  <option value="تبوك">تبوك</option>
                  <option value="أبها">أبها / خميس مشيط</option>
                  <option value="أخرى">مدينة أخرى</option>
                </select>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-stone-700 block">العنوان بالتفصيل *</label>
                <input
                  id="checkout-customer-address"
                  type="text"
                  required
                  placeholder="الحي، اسم الشارع، رقم الفيلا أو الشقة أو معلم قريب"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-rose-500 text-stone-900"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Gift for someone else toggle */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-rose-700 font-bold text-xs">٢</span>
                <h2 className="text-base font-bold text-stone-900">خيار الإهداء المباشر</h2>
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  id="gift-for-other-checkbox"
                  type="checkbox"
                  checked={isGiftForOther}
                  onChange={(e) => setIsGiftForOther(e.target.checked)}
                  className="w-4 h-4 text-rose-600 rounded border-stone-300 focus:ring-rose-500"
                />
                <span className="text-xs font-bold text-rose-700">إرسال كهدية لشخص آخر</span>
              </label>
            </div>

            {isGiftForOther ? (
              <div className="space-y-4 pt-2 animate-in fade-in">
                <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-200 text-xs text-rose-900 flex items-center gap-2">
                  <Gift className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>
                    سنقوم بتوصيل الطلب مباشرة إلى المستلم بكل سرية وفخامة، ولن نرفق أي فاتورة أو سعر في الشحنة.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-stone-700 block">اسم المستلم الكريم *</label>
                    <input
                      type="text"
                      required={isGiftForOther}
                      placeholder="مثال: نورة بنت خالد"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-rose-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-700 block">رقم هاتف المستلم للتوصيل *</label>
                    <input
                      type="tel"
                      required={isGiftForOther}
                      placeholder="مثال: 0559876543"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-rose-500"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-bold text-stone-700 block">
                      نص رسالة الإهداء (تكتب بخط جميل داخل الكرت)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="اكتب كلماتك العذبة للمستلم هنا..."
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-rose-500"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-stone-500">
                سيتم توصيل الطلب إلى عنوانك المدخل بالأعلى. إذا كنت تريد إرساله كهدية مباشرة لشخص آخر، قم بتفعيل الخيار أعلاه.
              </p>
            )}
          </div>

          {/* Step 3: Payment Methods */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-rose-700 font-bold text-xs">٣</span>
              <h2 className="text-base font-bold text-stone-900">طريقة الدفع</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Apple Pay */}
              <label
                className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3 transition ${
                  paymentMethod === 'apple_pay'
                    ? 'border-rose-600 bg-rose-50/50 shadow-xs ring-1 ring-rose-600'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="apple_pay"
                  checked={paymentMethod === 'apple_pay'}
                  onChange={() => setPaymentMethod('apple_pay')}
                  className="w-4 h-4 text-rose-600 focus:ring-rose-500"
                />
                <Smartphone className="w-5 h-5 text-stone-900" />
                <div className="text-right">
                  <div className="text-xs font-bold text-stone-900">Apple Pay</div>
                  <div className="text-[10px] text-stone-500">دفع فوري سريع وآمن</div>
                </div>
              </label>

              {/* Card / Mada */}
              <label
                className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3 transition ${
                  paymentMethod === 'card'
                    ? 'border-rose-600 bg-rose-50/50 shadow-xs ring-1 ring-rose-600'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="w-4 h-4 text-rose-600 focus:ring-rose-500"
                />
                <CreditCard className="w-5 h-5 text-rose-600" />
                <div className="text-right">
                  <div className="text-xs font-bold text-stone-900">بطاقة مدى / ائتمانية</div>
                  <div className="text-[10px] text-stone-500">فيزا، ماستركارد، مدى</div>
                </div>
              </label>

              {/* Cash on delivery */}
              <label
                className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3 transition ${
                  paymentMethod === 'cod'
                    ? 'border-rose-600 bg-rose-50/50 shadow-xs ring-1 ring-rose-600'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="w-4 h-4 text-rose-600 focus:ring-rose-500"
                />
                <Banknote className="w-5 h-5 text-emerald-600" />
                <div className="text-right">
                  <div className="text-xs font-bold text-stone-900">الدفع عند الاستلام (COD)</div>
                  <div className="text-[10px] text-stone-500">ادفع نقداً أو بالشبكة عند التسليم</div>
                </div>
              </label>

              {/* Bank Transfer */}
              <label
                className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3 transition ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-rose-600 bg-rose-50/50 shadow-xs ring-1 ring-rose-600'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="bank_transfer"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={() => setPaymentMethod('bank_transfer')}
                  className="w-4 h-4 text-rose-600 focus:ring-rose-500"
                />
                <Building2 className="w-5 h-5 text-blue-600" />
                <div className="text-right">
                  <div className="text-xs font-bold text-stone-900">تحويل بنكي مباشر</div>
                  <div className="text-[10px] text-stone-500">مصرف الراجحي / الأهلي</div>
                </div>
              </label>
            </div>
          </div>

          {/* Optional notes */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-2">
            <label className="text-xs font-bold text-stone-700 block">
              ملاحظات إضافية للتوصيل (اختياري)
            </label>
            <input
              type="text"
              placeholder="مثال: يرجى الاتصال قبل الوصول بنصف ساعة، أو التسليم في الفترة المسائية"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:border-rose-500"
            />
          </div>

        </div>

        {/* Order Summary & Submit Button: Right 4 cols */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-6">
          <h2 className="text-base font-bold text-stone-900 pb-3 border-b border-stone-100">
            محتويات طلبيتك ({cart.length} منتجات)
          </h2>

          {/* Items Preview */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3 text-xs">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-12 h-12 rounded-xl object-cover shrink-0 bg-stone-100"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-stone-800 line-clamp-1">{item.product.name}</h4>
                  <div className="text-stone-500 text-[11px]">
                    {item.quantity} × {item.product.price} ر.س
                  </div>
                </div>
                <span className="font-bold text-stone-900">
                  {item.product.price * item.quantity} ر.س
                </span>
              </div>
            ))}
          </div>

          {/* Gift wrapping option toggle */}
          <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={withGiftWrapping}
                onChange={(e) => setWithGiftWrapping(e.target.checked)}
                className="w-4 h-4 text-rose-600 rounded border-stone-300"
              />
              <span className="font-bold text-stone-900">تغليف ملكي فاخر (+35 ر.س)</span>
            </label>
            <Gift className="w-4 h-4 text-amber-600" />
          </div>

          {/* Cost details */}
          <div className="space-y-2.5 pt-3 border-t border-stone-100 text-xs text-stone-600">
            <div className="flex items-center justify-between">
              <span>المجموع الفرعي:</span>
              <span className="font-bold text-stone-900">{cartSubtotal} ر.س</span>
            </div>
            <div className="flex items-center justify-between">
              <span>رسوم التوصيل:</span>
              {shippingFee === 0 ? (
                <span className="font-bold text-emerald-700">مجاني (طلب أكثر من 300 ر.س)</span>
              ) : (
                <span className="font-bold text-stone-900">{shippingFee} ر.س</span>
              )}
            </div>
            {withGiftWrapping && (
              <div className="flex items-center justify-between text-amber-700 font-semibold">
                <span>رسوم التغليف الملكي:</span>
                <span>+35 ر.س</span>
              </div>
            )}
            <div className="pt-3 border-t border-stone-200 flex items-baseline justify-between">
              <span className="text-sm font-bold text-stone-900">المبلغ الإجمالي:</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-rose-600">{grandTotal}</span>
                <span className="text-xs font-bold text-stone-900">ر.س</span>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            id="checkout-confirm-order-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-sm shadow-md hover:shadow-lg hover:brightness-105 active:scale-98 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>جاري تأكيد الطلب...</span>
            ) : (
              <>
                <span>تأكيد الطلب الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>بياناتك مشفرة ومحمية بالكامل</span>
          </div>
        </div>

      </form>
    </div>
  );
};
