import Link from 'next/link';
import Cart from './cart';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M12 22c-2 0-3-1-3-3 0-2 1-3 3-3s3 1 3 3c0 2-1 3-3 3z" />
              <path d="M12 16H8.2c-1.4-2.5-2.2-5-2.2-7.5 0-2.3.9-4.5 2.5-6.1C10.1 1 12 0 14.1 0c3.5 0 6.2 2.8 6.9 6.3" />
              <path d="m5 16 3-1-2-4" />
            </svg>
            <span className="font-bold text-lg">Verdant</span>
          </Link>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <Cart />
        </div>
      </div>
    </header>
  );
};

export default Header;
