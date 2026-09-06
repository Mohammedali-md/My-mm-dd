import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'طلب خاص وتنسيق هدية',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      showToast('حقول مطلوبة', 'يرجى كتابة الاسم ورقم الجوال ونص الرسالة', 'error');
      return;
    }
    setSubmitted(true);
    showToast('تم إرسال الرسالة', 'شكراً لك، سيتواصل معك فريق خدمة العملاء قريباً', 'success');
  };

  const faqs = [
    {
      q: 'هل يمكنكم توصيل الهدية مباشرة للشخص الآخر دون إظهار الأسعار؟',
      a: 'نعم بكل تأكيد! نوفر خيار الإهداء المباشر، حيث نقوم بإلغاء إرفاق أي فواتير أو أسعار، وننسق موعد التوصيل مع المستلم بلباقة لتقديم المفاجأة في أبهى صورة.'
    },
    {
      q: 'هل الورود الطبيعية طازجة وتدوم طويلاً؟',
      a: 'نعم، نستورد ورودنا الطبيعية يومياً من أفضل المزارع الهولندية والمحلية، ويتم حفظها في بيئة مبردة وتزويد الباقات بماء وتغذية خاصة تضمن نضارتها لأطول فترة ممكنة.'
    },
    {
      q: 'كم يستغرق توصيل الطلب داخل المملكة؟',
      a: 'التوصيل داخل الرياض وجدة والدمام يتم في نفس اليوم أو خلال 24 ساعة حسب رغبة العميل. أما باقي المدن فيستغرق التوصيل من يوم إلى يومين عمل.'
    },
    {
      q: 'ما هي مواصفات خدمة التغليف الملكي والختم الشمعي؟',
      a: 'نستخدم أوراق تغليف فاخرة سميكة، وأشرطة ساتان حريرية، ونقوم بصب ختم شمعي أصلي مذهب مع كرت إهداء فاخر يُكتب فيه نص رسالتك بخط يدوي جميل.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 text-right">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">
          نسعد دائماً بخدمتكم
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900">
          تواصل مع فريق Surprise - G
        </h1>
        <p className="text-sm text-stone-600">
          لأي استفسار عن باقات الورد، تنسيق الهدايا الخاصة، أو متابعة طلباتكم
        </p>
      </div>

      {/* Main Grid: Channels & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info Cards: 5 cols */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* WhatsApp Direct Banner */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-6 shadow-md space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold">محادثة واتساب فورية</h3>
                <span className="text-xs text-emerald-100">استجابة سريعة على مدار الساعة</span>
              </div>
            </div>
            <p className="text-xs text-emerald-50 leading-relaxed">
              تحدث مباشرة مع منسق الهدايا لمساعدتك في تنسيق باقة خاصة أو اختيار العطر المناسب.
            </p>
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-emerald-800 font-bold text-xs hover:bg-emerald-50 transition shadow-xs"
            >
              <span>بدء المحادثة عبر واتساب</span>
              <Send className="w-3.5 h-3.5 rotate-180" />
            </a>
          </div>

          {/* Cards */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4 text-xs">
            <div className="flex items-start gap-3.5 pb-4 border-b border-stone-100">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-sm">الاتصال الهاتفي المباشر</h4>
                <p className="text-stone-500 mt-0.5">+966 50 000 0000 / 920000000</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pb-4 border-b border-stone-100">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-sm">البريد الإلكتروني</h4>
                <p className="text-stone-500 mt-0.5">support@surprise-g.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pb-4 border-b border-stone-100">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-sm">ساعات العمل واستقبال الطلبات</h4>
                <p className="text-stone-500 mt-0.5">يومياً من الساعة 9:00 صباحاً حتى 11:00 مساءً</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-stone-900 text-sm">مقر المتجر الرئيسي</h4>
                <p className="text-stone-500 mt-0.5">المملكة العربية السعودية، الرياض، حي النرجس</p>
              </div>
            </div>
          </div>

        </div>

        {/* Contact Form: 7 cols */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h2 className="text-lg font-bold text-stone-900">أرسل لنا استفسارك أو طلبك المخصص</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              سيسعد فريقنا بمساعدتك وتجهيز أفكار هدايا مخصصة تلائم مناسبتك
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-emerald-900">تم استلام رسالتك بنجاح!</h3>
              <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                شكراً لتواصلك مع Surprise - G. سيقوم أحد ممثلي خدمة العملاء بالرد عليك خلال دقائق.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', phone: '', email: '', subject: 'طلب خاص', message: '' });
                }}
                className="mt-2 px-5 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs"
              >
                إرسال رسالة أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 block">الاسم الكريم *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: أحمد عبد الله"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700 block">رقم الجوال *</label>
                  <input
                    type="tel"
                    required
                    placeholder="مثال: 0501234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 block">البريد الإلكتروني (اختياري)</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700 block">موضوع الرسالة</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-rose-500 font-medium"
                  >
                    <option value="طلب خاص وتنسيق هدية">طلب خاص وتنسيق هدية</option>
                    <option value="استفسار عن باقات الورد">استفسار عن باقات الورد</option>
                    <option value="استفسار عن طلب قائم">استفسار عن طلب قائم</option>
                    <option value="تغليف هدايا للشركات والمناسبات">تغليف هدايا للشركات والمناسبات</option>
                    <option value="أخرى">استفسار عام آخر</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-stone-700 block">نص الرسالة أو تفاصيل طلبك *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="اكتب استفسارك بالتفصيل..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-rose-500"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <span>إرسال الرسالة الآن</span>
                <Send className="w-3.5 h-3.5 rotate-180" />
              </button>
            </form>
          )}

        </div>

      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-rose-600" />
          <h2 className="text-xl font-bold text-stone-900">الأسئلة الأكثر شيوعاً</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="border border-stone-200 rounded-2xl overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 text-right flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-stone-900 hover:bg-stone-50 transition"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-rose-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
