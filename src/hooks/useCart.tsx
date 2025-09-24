import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  flavor: string;
  image: string;
  price: string;
  puffs: string;
  nicotine: string;
  color: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  applyCoupon: (coupon: string) => boolean;
  removeCoupon: () => void;
  appliedCoupon: string | null;
  discountPercentage: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Valid coupons configuration
const VALID_COUPONS = {
  'vaperos20': 20 // 20% discount
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const addToCart = (product: Product) => {
    console.log('Adding product to cart:', product);
    setItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        console.log('Product already in cart, increasing quantity');
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      console.log('New product added to cart');
      return [...prev, { ...product, quantity: 1 }];
    });
    console.log('Opening cart drawer');
    setIsOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    setDiscountPercentage(0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => {
      // Parse Chilean price format (e.g., "12.000" -> 12000)
      const price = parseFloat(item.price.replace(/\./g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const getDiscountAmount = () => {
    const subtotal = getSubtotal();
    return subtotal * (discountPercentage / 100);
  };

  const getTotalPrice = () => {
    const subtotal = getSubtotal();
    const discount = getDiscountAmount();
    return subtotal - discount;
  };

  const applyCoupon = (coupon: string): boolean => {
    const discount = VALID_COUPONS[coupon.toLowerCase()];
    if (discount) {
      setAppliedCoupon(coupon.toLowerCase());
      setDiscountPercentage(discount);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountPercentage(0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      getSubtotal,
      getDiscountAmount,
      applyCoupon,
      removeCoupon,
      appliedCoupon,
      discountPercentage,
      isOpen,
      setIsOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};