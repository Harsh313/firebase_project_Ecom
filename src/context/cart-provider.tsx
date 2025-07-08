"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { CartItem, Product } from '@/lib/types';
import { useAuth } from './auth-provider';
import { db } from '@/lib/firebase';
import { collection, doc, onSnapshot, setDoc, updateDoc, deleteDoc, getDoc, getDocs, writeBatch } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateItemQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartCount: number;
  cartTotal: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      setLoading(true);
      const cartColRef = collection(db, 'users', user.uid, 'cart');
      const unsubscribe = onSnapshot(cartColRef, (snapshot) => {
        const items = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as CartItem));
        setCartItems(items);
        setLoading(false);
      }, (error) => {
        console.error("Error listening to cart changes:", error);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setCartItems([]);
      setLoading(false);
    }
  }, [user]);

  const addToCart = useCallback(async (product: Product, quantity = 1) => {
    if (!user) {
      toast({ variant: 'destructive', title: 'Please log in', description: 'You need to be logged in to add items to your cart.' });
      return;
    }
    setLoading(true);
    try {
      const itemRef = doc(db, 'users', user.uid, 'cart', product.id);
      const docSnap = await getDoc(itemRef);

      if (docSnap.exists()) {
        await updateDoc(itemRef, { quantity: docSnap.data().quantity + quantity });
      } else {
        await setDoc(itemRef, { ...product, quantity });
      }
      toast({ title: 'Added to cart', description: `${product.name} has been added to your cart.` });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not add item to cart.' });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  const removeFromCart = useCallback(async (productId: string) => {
    if (!user) return;
    setLoading(true);
    try {
        const itemRef = doc(db, 'users', user.uid, 'cart', productId);
        await deleteDoc(itemRef);
    } catch (error) {
        console.error("Error removing from cart:", error);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not remove item from cart.' });
    } finally {
        setLoading(false);
    }
  }, [user, toast]);

  const updateItemQuantity = useCallback(async (productId: string, quantity: number) => {
    if (!user) return;
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }
    setLoading(true);
    try {
        const itemRef = doc(db, 'users', user.uid, 'cart', productId);
        await updateDoc(itemRef, { quantity });
    } catch (error) {
        console.error("Error updating quantity:", error);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not update item quantity.' });
    } finally {
        setLoading(false);
    }
  }, [user, removeFromCart, toast]);
  
  const clearCart = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
        const cartColRef = collection(db, 'users', user.uid, 'cart');
        const querySnapshot = await getDocs(cartColRef);
        if (querySnapshot.empty) return;
        const batch = writeBatch(db);
        querySnapshot.forEach((doc) => {
            batch.delete(doc.ref);
        });
        await batch.commit();
    } catch (error) {
        console.error("Error clearing cart:", error);
        toast({ variant: 'destructive', title: 'Error', description: 'Could not clear the cart.' });
    } finally {
        setLoading(false);
    }
  }, [user, toast]);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    cartCount,
    cartTotal,
    loading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
