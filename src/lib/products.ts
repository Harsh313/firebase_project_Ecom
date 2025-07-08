import type { Product } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    description:
      'A tropical plant with iconic split leaves, perfect for adding a touch of the jungle to your home. Easy to care for and a fast grower.',
    price: 35.0,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    reviews: [
      { rating: 5, text: 'Absolutely beautiful plant! Arrived in perfect condition.', author: 'Jane D.' },
      { rating: 4, text: 'Love my monstera, it has already put out a new leaf.', author: 'John S.' },
    ],
  },
  {
    id: '2',
    name: 'Fiddle Leaf Fig',
    description:
      "A popular statement plant with large, violin-shaped leaves. It's a bit of a diva but worth the effort for its stunning looks.",
    price: 55.0,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    reviews: [
      { rating: 5, text: 'The perfect centerpiece for my living room.', author: 'Emily R.' },
      { rating: 3, text: 'Dropped a few leaves at first, but it\'s happy now. Be patient!', author: 'Mike T.' },
    ],
  },
  {
    id: '3',
    name: 'Snake Plant',
    description:
      "The ultimate beginner plant. It's virtually indestructible, tolerates low light, and purifies the air. What's not to love?",
    price: 25.0,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    reviews: [
      { rating: 5, text: 'I forget I even have this plant sometimes, it\'s so low maintenance.', author: 'Chris B.' },
      { rating: 5, text: 'Looks great and is super easy to care for.', author: 'Sarah L.' },
    ],
  },
  {
    id: '4',
    name: 'Pothos Plant',
    description:
      'A forgiving and fast-growing vining plant. Perfect for hanging baskets or trailing down a shelf. Comes in various beautiful variegations.',
    price: 18.0,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    reviews: [
      { rating: 5, text: 'Grows like a weed! My home is turning into a jungle.', author: 'Alex P.' },
      { rating: 4, text: 'Very versatile plant, I have them all over my house.', author: 'Maria G.' },
    ],
  },
  {
    id: '5',
    name: 'ZZ Plant',
    description:
      'Another low-light tolerant and drought-resistant plant. Its waxy, dark green leaves add a touch of modern elegance to any space.',
    price: 30.0,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    reviews: [
      { rating: 5, text: 'The perfect office plant. Thrives on neglect.', author: 'David C.' },
      { rating: 5, text: 'Stunning and so easy. Highly recommend for beginners.', author: 'Olivia M.' },
    ],
  },
  {
    id: '6',
    name: 'Spider Plant',
    description:
      'A classic and charming plant known for producing "spiderettes" or baby plants. It\'s easy to propagate and share with friends.',
    price: 20.0,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    reviews: [
      { rating: 5, text: 'Already have so many babies from this plant! It\'s the gift that keeps on giving.', author: 'Ben W.' },
      { rating: 4, text: 'A retro classic that never goes out of style.', author: 'Chloe T.' },
    ],
  },
   {
    id: '7',
    name: 'Bird of Paradise',
    description:
      'Bring a tropical paradise indoors with this large, upright plant. Its banana-like leaves make a bold statement.',
    price: 65.0,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    reviews: [
      { rating: 5, text: 'Makes me feel like I\'m on vacation. A stunning plant.', author: 'Sophia K.' },
      { rating: 4, text: 'Needs a lot of light, but it\'s a showstopper.', author: 'Liam J.' },
    ],
  },
   {
    id: '8',
    name: 'Calathea Orbifolia',
    description:
      'A beautiful prayer plant with large, round leaves striped with silver. It moves its leaves up and down with the day-night cycle.',
    price: 40.0,
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    reviews: [
      { rating: 4, text: 'The leaves are mesmerizing. A bit picky about water but worth it.', author: 'Ava N.' },
      { rating: 5, text: 'My favorite plant! The foliage is a work of art.', author: 'Noah F.' },
    ],
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};
