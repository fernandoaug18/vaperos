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
  getShippingCost: () => number;
  applyCoupon: (coupon: string) => boolean;
  removeCoupon: () => void;
  appliedCoupon: string | null;
  discountPercentage: number;
  couponType: 'percentage' | 'free_shipping_rm' | 'free_shipping_all' | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedRegion: string | null;
  setSelectedRegion: (region: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Valid coupons configuration
const VALID_COUPONS: { [key: string]: { type: 'percentage' | 'free_shipping_rm' | 'free_shipping_all', value: number } } = {
  'vaperos20': { type: 'percentage', value: 20 }, // 20% discount
  'vaperosrm': { type: 'free_shipping_rm', value: 0 }, // Free shipping for RM
  'vaperoschile': { type: 'free_shipping_all', value: 0 } // Free shipping for all regions
};

// Shipping costs
const SHIPPING_COSTS = {
  'Región Metropolitana de Santiago': 3100,
  default: 4200
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [couponType, setCouponType] = useState<'percentage' | 'free_shipping_rm' | 'free_shipping_all' | null>(null);

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
    setSelectedRegion(null);
    setCouponType(null);
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

  const getShippingCost = () => {
    if (!selectedRegion) return 0;
    
    // Check if coupon provides free shipping
    if (couponType === 'free_shipping_all') {
      return 0;
    }
    
    if (couponType === 'free_shipping_rm' && selectedRegion === 'Región Metropolitana de Santiago') {
      return 0;
    }
    
    // Apply regular shipping costs
    return selectedRegion === 'Región Metropolitana de Santiago' 
      ? SHIPPING_COSTS['Región Metropolitana de Santiago']
      : SHIPPING_COSTS.default;
  };

  const getTotalPrice = () => {
    const subtotal = getSubtotal();
    const discount = getDiscountAmount();
    const shipping = getShippingCost();
    return subtotal - discount + shipping;
  };

  const applyCoupon = (coupon: string): boolean => {
    const couponData = VALID_COUPONS[coupon.toLowerCase()];
    if (couponData) {
      setAppliedCoupon(coupon.toLowerCase());
      setCouponType(couponData.type);
      setDiscountPercentage(couponData.value);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountPercentage(0);
    setCouponType(null);
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
      getShippingCost,
      applyCoupon,
      removeCoupon,
      appliedCoupon,
      discountPercentage,
      couponType,
      isOpen,
      setIsOpen,
      selectedRegion,
      setSelectedRegion
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