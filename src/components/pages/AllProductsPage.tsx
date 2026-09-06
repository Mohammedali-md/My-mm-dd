import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/initialData';
import { CategoryType } from '../../types';
import { ProductCard } from '../common/ProductCard';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  RotateCcw,
  Sparkles,
  Check
} from 'lucide-react';

export const AllProductsPage: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery 
  } = useStore();

  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'rating'>('newest');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(500);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          if (!matchName && !matchDesc) return false;
        }
        // In stock filter
        if (onlyInStock && product.stock <= 0) {
          return false;
        }
        // Max price filter
        if (product.price > maxPrice) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // default: newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [products, selectedCategory, searchQuery, onlyInStock, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setOnlyInStock(false);
    setMaxPrice(500);
    setSortBy('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-right">
      {/* Header Banner */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900">
              جميع منتجات Surprise - G
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              تصفح التشكيلة الكاملة من الهدايا الراقية، العطور، باقات الورد والإكسسوارات الفاخرة
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-stone-100 text-stone-700">
              عدد المنتجات المعروضة: {filteredProducts.length}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-xs space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition ${
              selectedCategory === 'all'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            جميع الأقسام ({products.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = products.filter((p) => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Search, Sort, and Price Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-2 border-t border-stone-100">
          
          {/* Search bar */}
          <div className="md:col-span-5 relative">
            <input
              type="text"
              placeholder="ابحث بالاسم أو الوصف..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-rose-400"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-rose-400 font-medium text-stone-800"
            >
              <option value="newest">الأحدث وصولاً</option>
              <option value="price-asc">السعر: من الأقل إلى الأعلى</option>
              <option value="price-desc">السعر: من الأعلى إلى الأقل</option>
              <option value="rating">الأعلى تقييماً</option>
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="md:col-span-2 flex flex-col">
            <div className="flex items-center justify-between text-[11px] font-bold text-stone-600 mb-1">
              <span>الحد الأقصى:</span>
              <span className="text-rose-600">{maxPrice} ر.س</span>
            </div>
            <input
              type="range"
              min="40"
              max="500"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-rose-600 h-1.5 bg-stone-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* In-stock toggle & Reset */}
          <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-3">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-700 select-none">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 text-rose-600 rounded border-stone-300 focus:ring-rose-500"
              />
              <span>المتوفر فقط</span>
            </label>

            {(selectedCategory !== 'all' || searchQuery || onlyInStock || maxPrice < 500) && (
              <button
                onClick={resetFilters}
                className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition text-xs font-bold flex items-center gap-1"
                title="إعادة ضبط الفلاتر"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">إعادة ضبط</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <SlidersHorizontal className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">لم يتم العثور على منتجات مطابقة</h3>
          <p className="text-xs text-stone-500">
            جرّب تغيير كلمات البحث، أو إزالة بعض الفلاتر لعرض المنتجات المتوفرة.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-500 transition shadow-sm"
          >
            إعادة تعيين جميع الفلاتر
          </button>
        </div>
      )}
    </div>
  );
};
