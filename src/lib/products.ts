import type { Product } from './types';
import { db } from './firebase';
import { collection, getDocs, doc, getDoc, addDoc, serverTimestamp } from 'firebase/firestore';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const productsCol = collection(db, 'products');
    const productSnapshot = await getDocs(productsCol);
    const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    return productList;
  } catch (error) {
    console.error("Error fetching products: ", error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  try {
    const productDocRef = doc(db, 'products', id);
    const productSnap = await getDoc(productDocRef);

    if (productSnap.exists()) {
      return { id: productSnap.id, ...productSnap.data() } as Product;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching product by ID: ", error);
    return undefined;
  }
};

export const addProduct = async (productData: Omit<Product, 'id' | 'reviews'>): Promise<string> => {
  try {
    const productsCol = collection(db, 'products');
    const docRef = await addDoc(productsCol, {
      ...productData,
      reviews: [],
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding product: ", error);
    throw new Error("Failed to add product.");
  }
};
