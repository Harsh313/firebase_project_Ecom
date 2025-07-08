import type { Product } from './types';
import { db } from './firebase';
import { collection, getDocs, doc, getDoc, addDoc, serverTimestamp } from 'firebase/firestore';

const sampleProducts: Product[] = [
    {
        id: 'sample-1',
        name: 'Classic White Tee',
        description: 'A timeless wardrobe staple, perfect for any occasion. Made from 100% premium cotton.',
        price: 25.00,
        images: ['https://placehold.co/600x600.png'],
        sellerId: 'system',
        reviews: [
            { rating: 5, text: "So soft and comfortable!", author: "Jane D." },
            { rating: 4, text: "Great fit, but a little sheer.", author: "John S." },
        ],
    },
    {
        id: 'sample-2',
        name: 'Vintage Denim Jeans',
        description: 'Perfectly worn-in straight-leg jeans with a classic fit. Your new favorite pair.',
        price: 79.99,
        images: ['https://placehold.co/600x600.png'],
        sellerId: 'system',
        reviews: [
            { rating: 5, text: "I live in these jeans!", author: "Emily R." },
        ],
    },
    {
        id: 'sample-3',
        name: 'Cozy Knit Sweater',
        description: 'Stay warm and stylish with this oversized chunky knit sweater. Ideal for chilly days.',
        price: 64.50,
        images: ['https://placehold.co/600x600.png'],
        sellerId: 'system',
        reviews: [],
    },
    {
        id: 'sample-4',
        name: 'Leather Biker Jacket',
        description: 'Add an edge to any outfit with this classic leather biker jacket. A true investment piece.',
        price: 250.00,
        images: ['https://placehold.co/600x600.png'],
        sellerId: 'system',
        reviews: [
            { rating: 5, text: "Incredible quality for the price.", author: "Mark C." },
        ],
    },
];

export const getProducts = async (): Promise<Product[]> => {
  try {
    const productsCol = collection(db, 'products');
    const productSnapshot = await getDocs(productsCol);
    const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));

    if (productList.length === 0) {
      return sampleProducts;
    }

    return productList;
  } catch (error) {
    console.error("Error fetching products: ", error);
    // Return sample products on error as a fallback
    return sampleProducts;
  }
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  try {
    // Check if we are trying to get a sample product
    const sampleProduct = sampleProducts.find(p => p.id === id);
    if (sampleProduct) {
      return sampleProduct;
    }

    const productDocRef = doc(db, 'products', id);
    const productSnap = await getDoc(productDocRef);

    if (productSnap.exists()) {
      return { id: productSnap.id, ...productSnap.data() } as Product;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching product by ID: ", error);
    // Fallback for sample product if firestore fails
    return sampleProducts.find(p => p.id === id);
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
