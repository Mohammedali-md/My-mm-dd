import React from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { ShoppingBag, Star, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, addToCart } = useStore();

  const isOutOfStock = product.stock <= 0;

  const categoryNames: Record<string, string> = {
    gifts: 'هدايا فاخرة',
    perfumes: 'عطور',
    accessories: 'إكسسوارات',
    'natural-roses': 'ورد طبيعي',
    'artificial-roses': 'ورد صناعي',
    'gift-wrapping': 'تغليف هدايا',
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md hover:border-rose-300 transition-all duration-300 flex flex-col overflow-hidden text-right"
    >
      {/* Product Image Box */}
      <div 
        onClick={() => navigateTo('product-details', { productId: product.id })}
        className="relative aspect-square w-full bg-stone-100 overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          {product.isFeatured && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-600 text-white shadow-xs">
              الأكثر طلباً
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-white shadow-xs">
              جديد
            </span>
          )}
        </div>

        {/* Category Pill */}
        <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-stone-900/75 text-white backdrop-blur-xs">
          {categoryNames[product.category] || product.category}
        </span>

        {/* Stock Alert Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center">
            <span className="px-3 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold">
              نفد من المخزون
            </span>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1 text-amber-500 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-stone-400 text-[11px]">({product.reviewCount})</span>
            </div>
            {product.stock > 0 && product.stock <= 5 && (
              <span className="text-[11px] text-amber-600 font-semibold">
                متبقي {product.stock} فقط!
              </span>
            )}
          </div>

          {/* Title */}
          <h3 
            onClick={() => navigateTo('product-details', { productId: product.id })}
            className="text-sm font-bold text-stone-900 line-clamp-2 hover:text-rose-600 transition cursor-pointer min-h-[40px] leading-snug"
          >
            {product.name}
          </h3>

          <p className="mt-1 text-xs text-stone-500 line-clamp-1">
            {product.description}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-stone-900">
                {product.price}
              </span>
              <span className="text-xs font-bold text-rose-600">ر.س</span>
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-stone-400 line-through -mt-1">
                {product.originalPrice} ر.س
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => navigateTo('product-details', { productId: product.id })}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition"
              title="تفاصيل المنتج"
              aria-label="عرض التفاصيل"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              id={`add-to-cart-${product.id}`}
              onClick={() => addToCart(product, 1)}
              disabled={isOutOfStock}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                isOutOfStock
                  ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white active:scale-95 shadow-xs'
              }`}
              aria-label="إضافة إلى السلة"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>إضافة</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
