/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { OfflineIndicator } from './components/common/OfflineIndicator';

import { HomePage } from './components/pages/HomePage';
import { AllProductsPage } from './components/pages/AllProductsPage';
import { CategoriesPage } from './components/pages/CategoriesPage';
import { ProductDetailsPage } from './components/pages/ProductDetailsPage';
import { CartPage } from './components/pages/CartPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { OrderSuccessPage } from './components/pages/OrderSuccessPage';
import { ContactPage } from './components/pages/ContactPage';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

const AppContent: React.FC = () => {
  const { currentPage } = useStore();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'products':
        return <AllProductsPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'product-details':
        return <ProductDetailsPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-success':
        return <OrderSuccessPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin-login':
        return <AdminLoginModal />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-rose-500 selection:text-white">
      <Header />
      <OfflineIndicator />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

