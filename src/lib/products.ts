import type { Product } from './types';
import { db } from './firebase';
import { collection, getDocs, doc, getDoc, addDoc, serverTimestamp } from 'firebase/firestore';

const sampleProducts: Product[] = [
    {
        id: 'sample-1',
        name: 'Men\'s Graphic Tee',
        description: 'A stylish and comfortable graphic tee made from 100% organic cotton. Perfect for a casual day out.',
        price: 1299,
        images: ['https://placehold.co/600x800.png'],
        sellerId: 'system',
        reviews: [
            { rating: 5, text: "Love the design and the fabric is so soft!", author: "Alex K." },
            { rating: 4, text: "Good quality, fits well.", author: "Ben S." },
        ],
    },
    {
        id: 'sample-2',
        name: 'Women\'s High-Waist Jeans',
        description: 'Flattering high-waist jeans with a modern straight-leg cut. Made from premium stretch denim for all-day comfort.',
        price: 2999,
        images: ['https://placehold.co/600x900.png'],
        sellerId: 'system',
        reviews: [
            { rating: 5, text: "My new favorite pair of jeans! They are so comfortable and stylish.", author: "Chloe M." },
        ],
    },
    {
        id: 'sample-3',
        name: 'Unisex Knit Beanie',
        description: 'Stay warm with this soft, ribbed knit beanie. A versatile accessory for any winter wardrobe.',
        price: 899,
        images: ['https://placehold.co/700x700.png'],
        sellerId: 'system',
        reviews: [],
    },
    {
        id: 'sample-4',
        name: 'Classic Trench Coat',
        description: 'A timeless double-breasted trench coat with a belted waist. The perfect outerwear for a sophisticated look.',
        price: 7999,
        images: ['https://placehold.co/600x850.png'],
        sellerId: 'system',
        reviews: [
            { rating: 5, text: "Stunning coat, great quality and perfect for spring.", author: "Diana P." },
        ],
    },
    {
        id: 'sample-5',
        name: 'Leather Crossbody Bag',
        description: 'A chic and practical leather crossbody bag, perfect for carrying your essentials in style.',
        price: 4599,
        images: ['https://placehold.co/750x750.png'],
        sellerId: 'system',
        reviews: [
            { rating: 5, text: "Perfect size and the leather is beautiful.", author: "Eva F." },
        ],
    },
    {
        id: 'sample-6',
        name: 'Men\'s Suede Loafers',
        description: 'Elegant suede loafers for a smart-casual look. Features a comfortable sole and premium finish.',
        price: 5499,
        images: ['https://placehold.co/800x600.png'],
        sellerId: 'system',
        reviews: [],
    },
    {
        id: 'sample-7',
        name: 'Silk Floral Scarf',
        description: 'A beautiful 100% silk scarf with a vibrant floral print. Adds a touch of elegance to any outfit.',
        price: 1999,
        images: ['https://placehold.co/800x800.png'],
        sellerId: 'system',
        reviews: [
            { rating: 5, text: "The colours are so vibrant, I love it!", author: "Grace H." },
            { rating: 5, text: "Very high quality silk, feels luxurious.", author: "Hannah I." },
        ],
    },
    {
        id: 'sample-8',
        name: 'Linen Summer Shirt',
        description: 'A breathable linen shirt, perfect for warm weather. Features a relaxed fit and mother-of-pearl buttons.',
        price: 3299,
        images: ['https://placehold.co/600x825.png'],
        sellerId: 'system',
        reviews: [],
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
