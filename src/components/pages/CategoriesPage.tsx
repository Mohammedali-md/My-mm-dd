import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES } from '../../data/initialData';
import { 
  ArrowLeft, 
  Gift, 
  Sparkles, 
  Flower2, 
  Package, 
  Watch, 
  HeartHandshake 
} from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { products, navigateTo } = useStore();

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Gift': return <Gift className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Watch': return <Watch className="w-6 h-6" />;
      case 'Flower2': return <Flower2 className="w-6 h-6" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6" />;
      case 'Package': return <Package className="w-6 h-6" />;
      default: return <Gift className="w-6 h-6" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-right">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">
          أقسام المتجر المتميزة
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900">
          تصنيفات متجر Surprise - G
        </h1>
        <p className="text-sm text-stone-600">
          اختر القسم الذي ترغب به واستكشف تشكيلاتنا الحصرية من الهدايا، باقات الورد، والعطور
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES.map((category) => {
          const categoryProducts = products.filter((p) => p.category === category.id);
          const topPreviewItems = categoryProducts.slice(0, 3);

          return (
            <div
              key={category.id}
              className="group bg-white rounded-3xl border border-stone-200 shadow-xs hover:shadow-xl hover:border-rose-300 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Category Banner Image */}
                <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent" />
                  
                  {/* Category Tag */}
                  {category.bannerTag && (
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-rose-600 text-white shadow-xs">
                      {category.bannerTag}
                    </span>
                  )}

                  {/* Icon badge */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-3 text-white">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                      {getCategoryIcon(category.iconName)}
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-white">{category.name}</h2>
                      <span className="text-xs text-rose-200">
                        {categoryProducts.length} منتجات متوفرة
                      </span>
                    </div>
                  </div>
                </div>

                {/* Category Body */}
                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed min-h-[40px]">
                    {category.description}
                  </p>

                  {/* Preview Items Thumbnails */}
                  {topPreviewItems.length > 0 && (
                    <div className="pt-2 border-t border-stone-100">
                      <span className="text-[11px] font-bold text-stone-400 block mb-2">
                        أبرز المعروضات في هذا القسم:
                      </span>
                      <div className="flex items-center gap-2">
                        {topPreviewItems.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => navigateTo('product-details', { productId: item.id })}
                            className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 hover:border-rose-400 cursor-pointer transition shrink-0"
                            title={item.name}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  id={`browse-cat-${category.id}`}
                  onClick={() => navigateTo('products', { category: category.id })}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-stone-50 group-hover:bg-rose-600 text-stone-800 group-hover:text-white font-bold text-xs sm:text-sm transition-all shadow-xs"
                >
                  <span>تصفح منتجات {category.name}</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
