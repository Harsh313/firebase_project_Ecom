import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-background w-full">
      <div className="container mx-auto grid lg:grid-cols-2 gap-8 items-center py-12 md:py-20">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline text-foreground tracking-tight">
            Discover Your
            <br />
            <span className="text-primary">Signature Style</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Explore our curated collection of high-quality apparel. From timeless classics to the latest trends, find pieces that truly represent you.
          </p>
          <div className="mt-8 flex gap-4">
            <Button asChild size="lg">
              <Link href="#">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="relative aspect-[3/2] max-w-xl mx-auto lg:mx-0 lg:max-w-none">
           <Image
            src="https://placehold.co/1200x800.png"
            alt="Fashion model"
            fill
            className="object-cover rounded-lg shadow-2xl"
            data-ai-hint="fashion model"
          />
        </div>
      </div>
    </section>
  );
}
