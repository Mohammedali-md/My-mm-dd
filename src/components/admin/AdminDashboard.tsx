import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, Order, CategoryType } from '../../types';
import { CATEGORIES } from '../../data/initialData';
import { ProductFormModal } from './ProductFormModal';
import { 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  AlertTriangle, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Phone, 
  Gift, 
  LogOut, 
  ArrowLeft, 
  Search, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    orders, 
    isAdminLoggedIn, 
    logoutAdmin, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateOrderStatus, 
    navigateTo, 
    showToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [productSearch, setProductSearch] = useState('');
  const [productCatFilter, setProductCatFilter] = useState<string>('all');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  // Product modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center text-right space-y-4">
        <h2 className="text-xl font-bold text-stone-900">يتطلب هذا القسم تسجيل دخول المدير</h2>
        <p className="text-xs text-stone-500">يرجى تسجيل الدخول بحساب الإدارة للوصول إلى لوحة التحكم.</p>
        <button
          onClick={() => navigateTo('admin-login')}
          className="px-6 py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs"
        >
          الانتقال لصفحة تسجيل الدخول
        </button>
      </div>
    );
  }

  // Filter products
  const filteredProducts = products.filter((p) => {
    if (productCatFilter !== 'all' && p.category !== productCatFilter) return false;
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    }
    return true;
  });

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
    return true;
  });

  // KPI calculations
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const lowStockCount = products.filter((p) => p.stock <= 3).length;

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (productData: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewCount'>) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
  };

  const handleDeleteProduct = (product: Product) => {
    if (window.confirm(`هل أنت متأكد من رغبتك في حذف المنتج "${product.name}"؟`)) {
      deleteProduct(product.id);
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'new':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">جديد</span>;
      case 'processing':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">قيد التجهيز</span>;
      case 'shipped':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">تم الشحن</span>;
      case 'delivered':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">تم التسليم</span>;
      case 'cancelled':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">ملغي</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-right">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-stone-900 text-amber-400 font-black text-xs">
              لوحة الإدارة
            </span>
            <span className="text-xs text-stone-500">متجر Surprise - G</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
            لوحة تحكم المدير
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="px-4 py-2 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-100 transition"
          >
            زيارة واجهة المتجر
          </button>
          <button
            onClick={logoutAdmin}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 text-red-600 font-bold text-xs hover:bg-red-100 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-bold">إجمالي المنتجات</span>
            <Package className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-stone-900">{products.length}</div>
          <span className="text-[11px] text-stone-500">منتج مسجل بالكتالوج</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-bold">إجمالي الطلبات</span>
            <ShoppingBag className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-stone-900">{orders.length}</div>
          <span className="text-[11px] text-stone-500">طلب تم استلامه</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-bold">إجمالي المبيعات</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">{totalSales} ر.س</div>
          <span className="text-[11px] text-stone-500">حجم المبيعات الكلي</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-xs font-bold">تنبيهات المخزون</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-600">{lowStockCount}</div>
          <span className="text-[11px] text-stone-500">منتجات قاربت على النفاد</span>
        </div>
      </div>

      {/* Navigation Tabs (Products vs Orders) */}
      <div className="flex items-center justify-between border-b border-stone-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 text-sm font-bold border-b-2 transition ${
              activeTab === 'products'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            إدارة المنتجات ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-sm font-bold border-b-2 transition ${
              activeTab === 'orders'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            مشاهدة وإدارة الطلبات ({orders.length})
          </button>
        </div>

        {activeTab === 'products' && (
          <button
            id="admin-add-product-btn"
            onClick={handleOpenAddModal}
            className="flex items-center gap-1.5 px-4 py-2 mb-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة منتج جديد</span>
          </button>
        )}
      </div>

      {/* TAB 1: Products Management */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          {/* Filter toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="ابحث عن منتج..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:border-rose-400"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="font-bold text-stone-600 shrink-0">التصنيف:</span>
              <select
                value={productCatFilter}
                onChange={(e) => setProductCatFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-medium"
              >
                <option value="all">جميع التصنيفات</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
                  <tr>
                    <th className="p-4">المنتج والصورة</th>
                    <th className="p-4">التصنيف</th>
                    <th className="p-4">السعر</th>
                    <th className="p-4">الكمية المتوفرة</th>
                    <th className="p-4">المميز</th>
                    <th className="p-4 text-left">إجراءات المدير</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredProducts.map((product) => {
                    const catObj = CATEGORIES.find((c) => c.id === product.category);
                    return (
                      <tr key={product.id} className="hover:bg-stone-50/70 transition">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 rounded-xl object-cover bg-stone-100 shrink-0 border border-stone-100"
                            />
                            <div>
                              <div className="font-bold text-stone-900 text-sm">{product.name}</div>
                              <div className="text-stone-400 text-[11px] line-clamp-1 max-w-xs">
                                {product.description}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 font-bold">
                            {catObj?.name || product.category}
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="font-black text-stone-900">{product.price} ر.س</div>
                          {product.originalPrice && (
                            <div className="text-[10px] text-stone-400 line-through">
                              {product.originalPrice} ر.س
                            </div>
                          )}
                        </td>

                        <td className="p-4">
                          {product.stock <= 0 ? (
                            <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-800 font-bold">
                              نفد من المخزون (0)
                            </span>
                          ) : product.stock <= 3 ? (
                            <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold">
                              منخفض ({product.stock} فقط)
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold">
                              {product.stock} قطعة
                            </span>
                          )}
                        </td>

                        <td className="p-4">
                          {product.isFeatured ? (
                            <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-bold text-[11px]">
                              نعم ★
                            </span>
                          ) : (
                            <span className="text-stone-400">-</span>
                          )}
                        </td>

                        <td className="p-4 text-left">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              id={`admin-edit-prod-${product.id}`}
                              onClick={() => handleOpenEditModal(product)}
                              className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition"
                              title="تعديل المنتج"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              id={`admin-del-prod-${product.id}`}
                              onClick={() => handleDeleteProduct(product)}
                              className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition"
                              title="حذف المنتج"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Orders Management */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {/* Status filter toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 flex items-center justify-between gap-3 text-xs">
            <span className="font-bold text-stone-700">تصفية حسب حالة الطلب:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {['all', 'new', 'processing', 'shipped', 'delivered'].map((st) => (
                <button
                  key={st}
                  onClick={() => setOrderStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 ${
                    orderStatusFilter === st
                      ? 'bg-rose-600 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {st === 'all' && 'جميع الطلبات'}
                  {st === 'new' && 'جديد'}
                  {st === 'processing' && 'قيد التجهيز'}
                  {st === 'shipped' && 'تم الشحن'}
                  {st === 'delivered' && 'تم التسليم'}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Cards Grid */}
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-3xl border border-stone-200 text-stone-500">
                لا توجد طلبات تطابق الفلتر المحدد.
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4 text-xs"
                >
                  {/* Order header row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-stone-900">
                          طلب رقم: {order.orderNumber}
                        </span>
                        {getStatusBadge(order.status)}
                      </div>
                      <span className="text-[11px] text-stone-400">
                        تاريخ الطلب: {new Date(order.createdAt).toLocaleString('ar-SA')}
                      </span>
                    </div>

                    {/* Change Status Dropdown */}
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-600">تعديل حالة الطلب:</span>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className="p-2 bg-stone-50 border border-stone-300 rounded-xl font-bold text-stone-900 focus:outline-none focus:border-rose-500"
                      >
                        <option value="new">جديد</option>
                        <option value="processing">قيد التجهيز</option>
                        <option value="shipped">تم الشحن</option>
                        <option value="delivered">تم التسليم</option>
                        <option value="cancelled">ملغي</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer, Recipient, and Delivery Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-100">
                    <div>
                      <span className="text-stone-400 font-bold block mb-1">بيانات العميل:</span>
                      <div className="font-bold text-stone-900">{order.customerName}</div>
                      <div className="text-stone-600">{order.customerPhone}</div>
                      <div className="text-stone-600">{order.city} - {order.address}</div>
                    </div>

                    <div>
                      <span className="text-stone-400 font-bold block mb-1">المستلم والهدية:</span>
                      {order.isGiftForOther ? (
                        <div className="space-y-0.5">
                          <div className="text-rose-700 font-bold">هدية موجهة لمستلم:</div>
                          <div className="font-bold text-stone-900">{order.recipientName}</div>
                          <div className="text-stone-600">{order.recipientPhone}</div>
                        </div>
                      ) : (
                        <div className="text-stone-500">تسليم مباشر للمشتري نفسه</div>
                      )}
                    </div>

                    <div>
                      <span className="text-stone-400 font-bold block mb-1">الدفع والتغليف:</span>
                      <div className="font-bold text-stone-900">
                        طريقة الدفع: {order.paymentMethod}
                      </div>
                      <div className="text-stone-600">
                        التغليف الملكي: {order.withGiftWrapping ? 'نعم (+35 ر.س)' : 'عادي مجاني'}
                      </div>
                      <div className="font-black text-rose-600 text-sm mt-1">
                        الإجمالي: {order.total} ر.س
                      </div>
                    </div>
                  </div>

                  {/* Gift message if present */}
                  {order.giftMessage && (
                    <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-900">
                      <span className="font-bold block">رسالة كرت الإهداء المطلوب كتابتها:</span>
                      <p className="italic mt-0.5">"{order.giftMessage}"</p>
                    </div>
                  )}

                  {/* Order items list */}
                  <div className="space-y-2 pt-2">
                    <span className="font-bold text-stone-700 block">المنتجات المطلوبة:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2 rounded-xl bg-white border border-stone-200"
                        >
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-stone-900 truncate">{item.productName}</div>
                            <div className="text-stone-500 text-[11px]">
                              {item.quantity} × {item.price} ر.س
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* WhatsApp contact CTA for Admin */}
                  <div className="pt-2 flex items-center justify-end">
                    <a
                      href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`مرحباً أستاذ ${order.customerName}، معكم متجر Surprise - G بخصوص طلبكم رقم ${order.orderNumber}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold transition"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>مراسلة العميل عبر واتساب</span>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialProduct={editingProduct}
      />
    </div>
  );
};
