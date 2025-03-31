import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: 'Diamond Studs | Premium Lab-Created Diamond Jewelry',
  description: 'Discover our premium collection of lab-created diamond studs. Play our Diamond Street game to unlock exclusive discounts of up to 50% off.',
};

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70"></div>
          <Image 
            src="/diamonds/hero-bg.jpg" 
            alt="Diamond Studs Background" 
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>
        
        <div className="container mx-auto px-4 z-10 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Stunning Lab-Created <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Diamond Studs</span>
              </h1>
              <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-xl">
                Ethically sourced, exquisitely crafted, at prices that shine as bright as our diamonds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/game" passHref>
                  <button className="btn btn-primary text-lg px-8">
                    Play to Save 50%
                  </button>
                </Link>
                <Link href="/products" passHref>
                  <button className="btn btn-outline text-lg px-8">
                    Shop Collection
                  </button>
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative h-80 w-80 md:h-96 md:w-96">
                <Image 
                  src="/diamonds/hero-diamond.png" 
                  alt="Diamond Stud" 
                  fill
                  className="object-contain animate-float"
                  priority
                />
                <div className="absolute inset-0 animate-pulse opacity-50 blur-xl bg-primary rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Game Promo Section */}
      <section className="py-20 bg-gradient-to-b from-background to-background/70 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid-pattern)" />
            </svg>
            <defs>
              <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M10,0 L0,0 L0,10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              </pattern>
            </defs>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Play to <span className="text-secondary">Save Up to 50%</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Drive down Diamond Street in our interactive game and unlock exclusive discounts on our entire collection.
            </p>
          </div>
          
          <div className="bg-background/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/10 max-w-4xl mx-auto">
            <div className="p-6 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 pr-0 md:pr-6">
                <Image 
                  src="/game-assets/game-preview.jpg" 
                  alt="Diamond Street Game" 
                  width={500} 
                  height={300}
                  className="rounded-lg w-full h-auto shadow-lg"
                />
              </div>
              <div className="md:w-1/2 text-left">
                <h3 className="text-2xl font-bold mb-3">Diamond Street Challenge</h3>
                <p className="mb-6">
                  Navigate through competitor shops with inflated prices and reach your destination to unlock real savings on your purchase.
                </p>
                <div className="flex flex-col space-y-3 mb-6">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-secondary mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>90-second gameplay</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-secondary mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>+10% discount per competitor passed</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-secondary mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Works on mobile and desktop</span>
                  </div>
                </div>
                <Link href="/game" passHref>
                  <button className="btn btn-primary w-full">
                    Play Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-20 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="text-primary">Collections</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Exquisite lab-created diamond studs crafted to perfection.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`} passHref>
                <div className="card hover:shadow-glow transition-all duration-300 overflow-hidden h-full flex flex-col">
                  <div className="relative h-48 mb-4 overflow-hidden">
                    <Image 
                      src={product.images[0]} 
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                    <p className="text-text-secondary text-sm mb-3 flex-grow">{product.cutType} Diamond Studs</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-primary">
                        From ${product.variants[0].price}
                      </span>
                      <span className="text-xs text-text-secondary line-through">
                        ${product.comparisons.retail}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/products" passHref>
              <button className="btn btn-outline">
                View All Collections
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-background/90 to-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-secondary">Our Diamonds</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Discover the benefits of our lab-created diamond studs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center hover:shadow-glow transition-all duration-300">
              <div className="mb-4 flex justify-center">
                <svg className="h-16 w-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Identical to Mined</h3>
              <p className="text-text-secondary">
                Our lab-created diamonds possess the same physical, chemical, and optical properties as mined diamonds.
              </p>
            </div>
            
            <div className="card text-center hover:shadow-glow transition-all duration-300">
              <div className="mb-4 flex justify-center">
                <svg className="h-16 w-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Exceptional Value</h3>
              <p className="text-text-secondary">
                Get 30-50% more diamond for your budget compared to mined diamonds of equal quality.
              </p>
            </div>
            
            <div className="card text-center hover:shadow-glow transition-all duration-300">
              <div className="mb-4 flex justify-center">
                <svg className="h-16 w-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Ethically Sourced</h3>
              <p className="text-text-secondary">
                Peace of mind knowing your diamonds are ethically created in controlled environments with minimal impact.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="text-primary">Customers Say</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Hear from our satisfied customers about their Diamond Studs experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card relative">
              <div className="absolute -top-4 -left-4 text-4xl text-primary opacity-50">"</div>
              <p className="mb-4 relative z-10">
                These diamond studs are absolutely stunning! The brilliance and fire are incredible, and I love that they're ethically created. The game was a fun way to get a discount too!
              </p>
              <div className="flex items-center">
                <div className="mr-3 rounded-full overflow-hidden w-12 h-12 bg-primary/20 flex items-center justify-center text-primary font-bold">
                  SM
                </div>
                <div>
                  <h4 className="font-bold">Sarah M.</h4>
                  <p className="text-text-secondary text-sm">Round Brilliant Studs</p>
                </div>
              </div>
            </div>
            
            <div className="card relative">
              <div className="absolute -top-4 -left-4 text-4xl text-primary opacity-50">"</div>
              <p className="mb-4 relative z-10">
                I was skeptical about lab-created diamonds, but these are indistinguishable from mined ones. The princess cuts have amazing sparkle and the price was unbeatable.
              </p>
              <div className="flex items-center">
                <div className="mr-3 rounded-full overflow-hidden w-12 h-12 bg-primary/20 flex items-center justify-center text-primary font-bold">
                  JD
                </div>
                <div>
                  <h4 className="font-bold">James D.</h4>
                  <p className="text-text-secondary text-sm">Princess Cut Studs</p>
                </div>
              </div>
            </div>
            
            <div className="card relative">
              <div className="absolute -top-4 -left-4 text-4xl text-primary opacity-50">"</div>
              <p className="mb-4 relative z-10">
                The cushion cut halo studs are absolutely gorgeous! They look much larger than their carat weight suggests. The game was fun too - I managed to get 40% off!
              </p>
              <div className="flex items-center">
                <div className="mr-3 rounded-full overflow-hidden w-12 h-12 bg-primary/20 flex items-center justify-center text-primary font-bold">
                  AK
                </div>
                <div>
                  <h4 className="font-bold">Alexandra K.</h4>
                  <p className="text-text-secondary text-sm">Cushion Cut Halo Studs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-background to-background/70 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[10%] opacity-30 blur-3xl">
            <div className="w-full h-full bg-gradient-radial from-primary/30 via-transparent to-transparent"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Find Your Perfect Diamond Studs?
            </h2>
            <p className="text-xl text-text-secondary mb-8">
              Play our Diamond Street game to unlock exclusive discounts or shop our collection now.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/game" passHref>
                <button className="btn btn-primary text-lg px-8">
                  Play to Save 50%
                </button>
              </Link>
              <Link href="/products" passHref>
                <button className="btn btn-outline text-lg px-8">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
