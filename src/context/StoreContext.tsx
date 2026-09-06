import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  Order, 
  CartItem, 
  PageView, 
  CategoryType, 
  OrderStatus, 
  AdminUser, 
  ToastMessage 
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from '../data/initialData';

interface StoreContextType {
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  currentPage: PageView;
  selectedProductId: string | null;
  selectedCategory: CategoryType | 'all';
  searchQuery: string;
  adminUser: AdminUser;
  toasts: ToastMessage[];
  lastCompletedOrder: Order | null;
  cartTotalCount: number;
  cartSubtotal: number;
  
  // Navigation
  navigateTo: (page: PageView, options?: { productId?: string; category?: CategoryType | 'all'; search?: string }) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: CategoryType | 'all') => void;

  // Cart operations
  addToCart: (product: Product, quantity?: number, giftMessage?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Checkout & Orders
  createOrder: (orderData: {
    customerName: string;
    customerPhone: string;
    city: string;
    address: string;
    isGiftForOther: boolean;
    recipientName?: string;
    recipientPhone?: string;
    giftMessage?: string;
    paymentMethod: Order['paymentMethod'];
    withGiftWrapping?: boolean;
    notes?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Admin Product Management
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewCount'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetToInitialData: () => void;

  // Auth
  loginAdmin: (password: string, email?: string) => boolean;
  logoutAdmin: () => void;

  // Toast
  showToast: (title: string, description?: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products from localStorage or fallback to initial
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('sg_products');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  // Load orders from localStorage or fallback to initial
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('sg_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_ORDERS;
  });

  // Load cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sg_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Navigation state
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lastCompletedOrder, setLastCompletedOrder] = useState<Order | null>(null);

  // Admin Auth state
  const [adminUser, setAdminUser] = useState<AdminUser>(() => {
    try {
      const saved = localStorage.getItem('sg_admin_session');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return { email: '', name: '', isLoggedIn: false };
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist products
  useEffect(() => {
    try {
      localStorage.setItem('sg_products', JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products:', e);
    }
  }, [products]);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem('sg_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders:', e);
    }
  }, [orders]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('sg_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }, [cart]);

  // Persist admin session
  useEffect(() => {
    try {
      localStorage.setItem('sg_admin_session', JSON.stringify(adminUser));
    } catch (e) {
      console.error('Error saving admin session:', e);
    }
  }, [adminUser]);

  // Toast handler
  const showToast = (title: string, description?: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation function
  const navigateTo = (page: PageView, options?: { productId?: string; category?: CategoryType | 'all'; search?: string }) => {
    if (options?.productId) {
      setSelectedProductId(options.productId);
    }
    if (options?.category) {
      setSelectedCategory(options.category);
    }
    if (options?.search !== undefined) {
      setSearchQuery(options.search);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, giftMessage?: string) => {
    if (product.stock <= 0) {
      showToast('نفد المخزون', 'هذا المنتج غير متوفر حالياً', 'error');
      return;
    }

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock);
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: newQty, giftCardMessage: giftMessage || item.giftCardMessage }
            : item
        );
      }
      return [...prevCart, { product, quantity: Math.min(quantity, product.stock), giftCardMessage: giftMessage }];
    });

    showToast('تمت الإضافة للسلة', `تمت إضافة "${product.name}" بنجاح`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('تم الحذف', 'تم حذف المنتج من السلة', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const validQty = Math.min(quantity, item.product.stock);
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const cartTotalCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  // Checkout & Order creation
  const createOrder = (orderData: {
    customerName: string;
    customerPhone: string;
    city: string;
    address: string;
    isGiftForOther: boolean;
    recipientName?: string;
    recipientPhone?: string;
    giftMessage?: string;
    paymentMethod: Order['paymentMethod'];
    withGiftWrapping?: boolean;
    notes?: string;
  }) => {
    const subtotal = cartSubtotal;
    const shippingFee = subtotal >= 300 ? 0 : 25; // Free shipping over 300 SAR
    const giftWrappingFee = orderData.withGiftWrapping ? 35 : 0;
    const total = subtotal + shippingFee + giftWrappingFee;

    const orderNumber = 'SG-' + Math.floor(10000 + Math.random() * 90000).toString();
    const newOrder: Order = {
      id: 'ord-' + Date.now().toString(),
      orderNumber,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      city: orderData.city,
      address: orderData.address,
      isGiftForOther: orderData.isGiftForOther,
      recipientName: orderData.recipientName,
      recipientPhone: orderData.recipientPhone,
      giftMessage: orderData.giftMessage,
      paymentMethod: orderData.paymentMethod,
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.image,
        category: item.product.category,
        price: item.product.price,
        quantity: item.quantity,
      })),
      subtotal,
      shippingFee,
      giftWrappingFee,
      total,
      status: 'new',
      createdAt: new Date().toISOString(),
      notes: orderData.notes,
    };

    // Deduct stock from products
    setProducts((prev) =>
      prev.map((p) => {
        const cartMatch = cart.find((ci) => ci.product.id === p.id);
        if (cartMatch) {
          return { ...p, stock: Math.max(0, p.stock - cartMatch.quantity) };
        }
        return p;
      })
    );

    // Save order
    setOrders((prev) => [newOrder, ...prev]);
    setLastCompletedOrder(newOrder);
    clearCart();

    showToast('تم تأكيد الطلب بنجاح!', `رقم الطلب الخاص بك: ${orderNumber}`, 'success');
    return newOrder;
  };

  // Order status update (Admin)
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o
      )
    );
    showToast('تم تحديث الطلب', 'تم تحديث حالة الطلب بنجاح', 'success');
  };

  // Admin Product Operations
  const addProduct = (newProdData: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewCount'>): Product => {
    const newProduct: Product = {
      ...newProdData,
      id: 'prod-' + Date.now().toString(),
      rating: 5.0,
      reviewCount: 1,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setProducts((prev) => [newProduct, ...prev]);
    showToast('تمت إضافة المنتج', `تم إضافة "${newProduct.name}" بنجاح`, 'success');
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('تم التعديل', 'تم حفظ تعديلات المنتج بنجاح', 'success');
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    // Also remove from cart if present
    setCart((prev) => prev.filter((item) => item.product.id !== id));
    showToast('تم الحذف', `تم حذف "${target?.name || 'المنتج'}" بنجاح`, 'info');
  };

  const resetToInitialData = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    localStorage.removeItem('sg_products');
    localStorage.removeItem('sg_orders');
    showToast('استعادة البيانات', 'تمت استعادة البيانات الافتراضية بنجاح', 'info');
  };

  // Admin Auth
  const loginAdmin = (password: string, email = 'admin@surprise-g.com') => {
    // Password check: accepts 'admin123' or any password for seamless preview demonstration
    if (password === 'admin123' || password === 'admin' || password.length >= 4) {
      const user: AdminUser = {
        email: email || 'admin@surprise-g.com',
        name: 'مدير المتجر (Surprise-G)',
        isLoggedIn: true,
      };
      setAdminUser(user);
      showToast('تم تسجيل الدخول', 'مرحباً بك في لوحة تحكم Surprise - G', 'success');
      return true;
    }
    showToast('فشل الدخول', 'كلمة المرور غير صحيحة (استخدم: admin123)', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setAdminUser({ email: '', name: '', isLoggedIn: false });
    showToast('تسجيل الخروج', 'تم تسجيل الخروج بنجاح', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        cart,
        currentPage,
        selectedProductId,
        selectedCategory,
        searchQuery,
        adminUser,
        toasts,
        lastCompletedOrder,
        cartTotalCount,
        cartSubtotal,
        navigateTo,
        setSearchQuery,
        setSelectedCategory,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        createOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToInitialData,
        loginAdmin,
        logoutAdmin,
        showToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
