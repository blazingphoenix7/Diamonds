import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';

export const metadata: Metadata = {
  title: 'Shop Lab-Created Diamond Studs | Premium Collection',
  description: 'Browse our collection of premium lab-created diamond studs. Find the perfect pair with various cuts, carat sizes, and metals at exceptional value.',
};

export default function ProductsPage() {
  return (
    <div className="pt-20">
      {/* Products Hero */}
      <section className="py-12 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Diamond Stud Collections
              </span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Explore our premium lab-created diamond studs in various cuts, carat sizes, and metals.
            </p>
          </div>
          
          {/* Product Filters - Static for now */}
          <div className="bg-background/40 backdrop-blur-sm rounded-lg p-4 mb-8 border border-white/10">
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="flex flex-wrap gap-4">
                <div className="relative">
                  <select className="input appearance-none pr-8 text-text-secondary">
                    <option>All Cuts</option>
                    <option>Round Brilliant</option>
                    <option>Princess Cut</option>
                    <option>Cushion Cut</option>
                    <option>Emerald Cut</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="h-4 w-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <div className="relative">
                  <select className="input appearance-none pr-8 text-text-secondary">
                    <option>All Carat Sizes</option>
                    <option>0.5 Carat</option>
                    <option>1.0 Carat</option>
                    <option>1.5 Carat</option>
                    <option>2.0 Carat</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="h-4 w-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                <div className="relative">
                  <select className="input appearance-none pr-8 text-text-secondary">
                    <option>All Metals</option>
                    <option>14k White Gold</option>
                    <option>14k Yellow Gold</option>
                    <option>18k White Gold</option>
                    <option>18k Yellow Gold</option>
                    <option>Platinum</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="h-4 w-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <select className="input appearance-none pr-8 text-text-secondary">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="h-4 w-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`} passHref>
                <div className="card hover:shadow-glow transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <Image 
                      src={product.images[0]} 
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                    <p className="text-text-secondary text-sm mb-4 flex-grow">{product.cutType} Diamond Studs</p>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {product.variants.map((variant) => (
                          <span 
                            key={variant.caratSize} 
                            className="text-xs bg-background/50 border border-white/10 px-2 py-1 rounded-full"
                          >
                            {variant.caratSize} CT
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold text-primary">
                          From ${product.variants[0].price}
                        </div>
                        <div className="text-xs text-text-secondary line-through">
                          ${product.comparisons.retail}
                        </div>
                      </div>
                      
                      <button className="btn btn-outline btn-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Play Game CTA */}
          <div className="mt-16 bg-gradient-to-r from-background/90 to-background/60 rounded-2xl p-8 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -inset-[10%] opacity-20 blur-3xl">
                <div className="w-full h-full bg-gradient-radial from-primary/30 via-transparent to-transparent"></div>
              </div>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Want a Special Discount?</h2>
                <p className="text-text-secondary max-w-xl">
                  Play our Diamond Street game and earn up to 50% off your purchase. 
                  The more competitors you pass, the bigger your discount!
                </p>
              </div>
              <Link href="/game" passHref>
                <button className="btn btn-primary whitespace-nowrap flex-shrink-0">
                  Play to Save
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Diamond Education Section */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Diamond Education
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Learn about different diamond cuts and what makes our lab-created diamonds special.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-primary">Lab vs. Mined Diamonds</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Identical Properties:</strong> Lab diamonds have the same physical, chemical, and optical properties as mined diamonds.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Better Value:</strong> 30-50% more diamond for your money compared to mined diamonds.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Ethical Choice:</strong> Created in controlled environments with minimal environmental impact.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Quality Guaranteed:</strong> All our diamonds are certified and graded to the same standards as mined diamonds.</span>
                </li>
              </ul>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-primary">Diamond Cut Guide</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Round Brilliant:</strong> Maximum brilliance and fire, classic and timeless.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Princess Cut:</strong> Square shape with pointed corners, modern and geometric.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Cushion Cut:</strong> Soft square or rectangle with rounded corners, vintage-inspired.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span><strong>Emerald Cut:</strong> Rectangular with cropped corners, sophisticated step-cut faceting.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
