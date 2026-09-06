import React, { useState, useEffect } from 'react';
import { Product, CategoryType } from '../../types';
import { CATEGORIES, IMAGE_PRESETS } from '../../data/initialData';
import { X, Image as ImageIcon, Sparkles, Check } from 'lucide-react';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productData: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewCount'>) => void;
  initialProduct?: Product | null;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialProduct,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<CategoryType>('gifts');
  const [price, setPrice] = useState<number>(150);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(undefined);
  const [stock, setStock] = useState<number>(10);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [showPresets, setShowPresets] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setCategory(initialProduct.category);
      setPrice(initialProduct.price);
      setOriginalPrice(initialProduct.originalPrice);
      setStock(initialProduct.stock);
      setImage(initialProduct.image);
      setDescription(initialProduct.description);
      setIsFeatured(!!initialProduct.isFeatured);
    } else {
      setName('');
      setCategory('gifts');
      setPrice(150);
      setOriginalPrice(undefined);
      setStock(10);
      setImage(IMAGE_PRESETS[0].url);
      setDescription('');
      setIsFeatured(false);
    }
  }, [initialProduct, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !image.trim() || price <= 0) {
      alert('يرجى ملء جميع الحقول الإلزامية (اسم المنتج، السعر، ورابط الصورة)');
      return;
    }

    onSubmit({
      name,
      category,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      stock: Number(stock),
      image,
      description: description.trim() || 'منتج فاخر عالي الجودة من متجر Surprise - G.',
      isFeatured,
      isNew: true,
    });
    onClose();
  };

  const handleSelectPreset = (url: string) => {
    setImage(url);
    setShowPresets(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs text-right overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg font-black text-stone-900">
              {initialProduct ? 'تعديل بيانات المنتج' : 'إضافة منتج جديد للمتجر'}
            </h2>
            <p className="text-xs text-stone-500">
              أدخل تفاصيل المنتج، السعر، المخزون، والتصنيف بدقة
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs">
          {/* Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-stone-700 block">اسم المنتج *</label>
              <input
                id="modal-product-name"
                type="text"
                required
                placeholder="مثال: عطر مسك الورد 100 مل"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-rose-500 text-stone-900"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700 block">التصنيف *</label>
              <select
                id="modal-product-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-rose-500 font-semibold text-stone-900"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price, Original Price & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-stone-700 block">السعر (ر.س) *</label>
              <input
                id="modal-product-price"
                type="number"
                required
                min="1"
                placeholder="150"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-rose-500 font-bold text-stone-900"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700 block">السعر قبل الخصم (اختياري)</label>
              <input
                type="number"
                min="1"
                placeholder="مثال: 190"
                value={originalPrice || ''}
                onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-rose-500 text-stone-900"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-700 block">الكمية المتوفرة بالمخزون *</label>
              <input
                id="modal-product-stock"
                type="number"
                required
                min="0"
                placeholder="10"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-rose-500 font-bold text-stone-900"
              />
            </div>
          </div>

          {/* Image Input & Presets */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowPresets(!showPresets)}
                className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 text-[11px]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{showPresets ? 'إخفاء الصور المقترحة' : 'اختر من مكتبة الصور الجاهزة لـ Surprise - G'}</span>
              </button>
              <label className="font-bold text-stone-700 block">رابط صورة المنتج (URL) *</label>
            </div>

            <div className="flex gap-3 items-center">
              {image && (
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                  <img src={image} alt="معاينة" className="w-full h-full object-cover" />
                </div>
              )}
              <input
                id="modal-product-image"
                type="url"
                required
                placeholder="https://images.unsplash.com/..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="flex-1 p-3 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-rose-500 text-stone-900 ltr text-left"
              />
            </div>

            {/* Presets Gallery Drawer */}
            {showPresets && (
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 max-h-48 overflow-y-auto">
                <span className="text-[11px] font-bold text-stone-500 block">
                  انقر على أي صورة لتطبيقها على المنتج فوراً:
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {IMAGE_PRESETS.map((preset, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSelectPreset(preset.url)}
                      className="group cursor-pointer rounded-lg overflow-hidden border-2 hover:border-rose-500 aspect-square bg-white relative transition"
                      title={preset.label}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-full h-full object-cover"
                      />
                      {image === preset.url && (
                        <div className="absolute inset-0 bg-rose-600/40 flex items-center justify-center text-white">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="font-bold text-stone-700 block">وصف المنتج ومميزاته</label>
            <textarea
              id="modal-product-description"
              rows={3}
              placeholder="اكتب وصفاً جذاباً لمكونات المنتج وطريقة تقديمه وتغليفه..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-rose-500 text-stone-900"
            />
          </div>

          {/* Is Featured Checkbox */}
          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-rose-600 rounded border-stone-300 focus:ring-rose-500"
              />
              <span className="font-bold text-stone-800">
                تمييز المنتج وإظهاره في قسم "الأكثر طلباً" بالصفحة الرئيسية
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 font-bold"
            >
              إلغاء
            </button>
            <button
              id="modal-product-submit-btn"
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-xs transition"
            >
              {initialProduct ? 'حفظ التعديلات' : 'إضافة المنتج الآن'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
