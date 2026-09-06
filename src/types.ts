export type CategoryType = 
  | 'gifts'          // الهدايا
  | 'perfumes'       // العطور
  | 'accessories'    // الإكسسوارات
  | 'natural-roses'  // باقات الورد الطبيعي
  | 'artificial-roses' // باقات الورد الصناعي
  | 'gift-wrapping'; // تغليف الهدايا

export interface CategoryInfo {
  id: CategoryType;
  name: string;
  description: string;
  iconName: string;
  image: string;
  bannerTag?: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  price: number;
  originalPrice?: number;
  stock: number;
  image: string;
  images?: string[];
  description: string;
  features?: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  giftCardMessage?: string;
  selectedWrappingId?: string;
}

export type OrderStatus = 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  category: CategoryType;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  city: string;
  address: string;
  isGiftForOther: boolean;
  recipientName?: string;
  recipientPhone?: string;
  giftMessage?: string;
  paymentMethod: 'cod' | 'card' | 'bank_transfer' | 'apple_pay';
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  giftWrappingFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt?: string;
  notes?: string;
}

export type PageView = 
  | 'home' 
  | 'products' 
  | 'categories' 
  | 'product-details' 
  | 'cart' 
  | 'checkout' 
  | 'contact' 
  | 'admin-login' 
  | 'admin-dashboard'
  | 'order-success';

export interface AdminUser {
  email: string;
  name: string;
  isLoggedIn: boolean;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}
