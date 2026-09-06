import React from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  CheckCircle2, 
  Gift, 
  ArrowLeft, 
  Printer, 
  MessageSquare, 
  Truck, 
  Clock, 
  MapPin,
  ShieldCheck
} from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const { lastCompletedOrder, navigateTo } = useStore();

  if (!lastCompletedOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center text-right space-y-4">
        <h2 className="text-xl font-bold text-stone-900">لا يوجد طلب حالي</h2>
        <button
          onClick={() => navigateTo('home')}
          className="px-6 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs"
        >
          العودة للرئيسية
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const paymentLabels: Record<string, string> = {
    apple_pay: 'Apple Pay',
    card: 'بطاقة مدى / ائتمانية',
    cod: 'الدفع عند الاستلام',
    bank_transfer: 'تحويل بنكي مباشر',
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8 text-right">
      {/* Success Banner */}
      <div className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-sm text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
          شكراً لك! تم استلام طلبك بنجاح
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          رقم طلبك هو <strong className="text-rose-600 font-black">{lastCompletedOrder.orderNumber}</strong>. 
          فريق Surprise - G يقوم الآن بتجهيز طلبيتك وتنسيق الهدايا بعناية فائقة.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`https://wa.me/966500000000?text=${encodeURIComponent(`مرحباً Surprise - G، استفسار بخصوص طلبي رقم ${lastCompletedOrder.orderNumber}`)}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition"
          >
            <MessageSquare className="w-4 h-4" />
            <span>متابعة الطلب عبر واتساب</span>
          </a>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs transition"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة الفاتورة</span>
          </button>
        </div>
      </div>

      {/* Printable Receipt Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs text-stone-400 font-medium">تفاصيل الفاتورة:</span>
            <h3 className="text-lg font-black text-stone-900">
              طلب رقم {lastCompletedOrder.orderNumber}
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            جديد - قيد المراجعة
          </span>
        </div>

        {/* Customer / Recipient Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-1">
            <span className="font-bold text-stone-400 block mb-1">بيانات العميل:</span>
            <div className="font-bold text-stone-900">{lastCompletedOrder.customerName}</div>
            <div className="text-stone-600">{lastCompletedOrder.customerPhone}</div>
            <div className="text-stone-600">{lastCompletedOrder.city} - {lastCompletedOrder.address}</div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-1">
            <span className="font-bold text-stone-400 block mb-1">طريقة الدفع والتوصيل:</span>
            <div className="font-bold text-stone-900">
              {paymentLabels[lastCompletedOrder.paymentMethod] || lastCompletedOrder.paymentMethod}
            </div>
            <div className="text-stone-600">توصيل سريع لباب المنزل</div>
            {lastCompletedOrder.isGiftForOther && (
              <div className="text-rose-600 font-bold mt-1">
                هدية موجهة للمستلم: {lastCompletedOrder.recipientName}
              </div>
            )}
          </div>
        </div>

        {/* Gift Message Card if present */}
        {lastCompletedOrder.giftMessage && (
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 text-xs space-y-1">
            <span className="font-bold text-rose-800 block">نص رسالة الإهداء المرفقة:</span>
            <p className="italic text-stone-800">"{lastCompletedOrder.giftMessage}"</p>
          </div>
        )}

        {/* Items List */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-stone-700 block">المنتجات المطلوبة:</span>
          {lastCompletedOrder.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-10 h-10 rounded-lg object-cover bg-stone-100"
                />
                <div>
                  <h4 className="font-bold text-stone-900">{item.productName}</h4>
                  <span className="text-stone-500">{item.quantity} × {item.price} ر.س</span>
                </div>
              </div>
              <span className="font-bold text-stone-900">{item.quantity * item.price} ر.س</span>
            </div>
          ))}
        </div>

        {/* Price Totals */}
        <div className="space-y-2 pt-2 border-t border-stone-100 text-xs text-stone-600">
          <div className="flex items-center justify-between">
            <span>المجموع الفرعي:</span>
            <span className="font-bold text-stone-900">{lastCompletedOrder.subtotal} ر.س</span>
          </div>
          <div className="flex items-center justify-between">
            <span>رسوم الشحن:</span>
            <span>{lastCompletedOrder.shippingFee === 0 ? 'مجاني' : `${lastCompletedOrder.shippingFee} ر.س`}</span>
          </div>
          {lastCompletedOrder.giftWrappingFee > 0 && (
            <div className="flex items-center justify-between text-amber-700 font-bold">
              <span>التغليف الملكي الفاخر:</span>
              <span>+{lastCompletedOrder.giftWrappingFee} ر.س</span>
            </div>
          )}
          <div className="flex items-baseline justify-between pt-3 border-t border-stone-200 text-sm font-bold text-stone-900">
            <span>الإجمالي المدفوع:</span>
            <span className="text-xl font-black text-rose-600">{lastCompletedOrder.total} ر.س</span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 transition shadow-xs"
          >
            العودة إلى الصفحة الرئيسية
          </button>
          <button
            onClick={() => navigateTo('admin-dashboard')}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition"
          >
            عرض الطلب في لوحة تحكم المدير
          </button>
        </div>
      </div>
    </div>
  );
};
