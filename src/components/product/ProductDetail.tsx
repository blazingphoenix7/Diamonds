'use client';

import { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductBySlug, Product } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { useDiscountStore } from '@/store/discountStore';

export default function ProductDetail() {
  const params = useParams();
  const slug = params.slug as string;
  
  // Find product by slug
  const product = getProductBySlug(slug);
  
  // If product not found, return 404
  if (!product) {
    notFound();
  }
  
  // State for selected options
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedMetal, setSelectedMetal] = useState(product.metalOptions[0]);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  
  // Access cart and discount stores
  const addToCart = useCartStore(state => state.addItem);
  const discount = useDiscountStore(state => state.discount);
  
  // Calculate discounted price
  const discountedPrice = discount > 0 
    ? (selectedVariant.price * (1 - discount / 100)).toFixed(2) 
    : null;
  
  // Handle add to cart
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(discountedPrice || selectedVariant.price.toString()),
      image: product.images[0],
      caratSize: selectedVariant.caratSize,
      metalType: selectedMetal,
    });
  };
  
  // Update quantity
  const updateQuantity = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity));
  };
  
  return (
    <div className="pt-20">
      {/* Product Detail */}
      <section className="py-12 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <nav className="flex text-sm text-text-secondary">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/products" className="hover:text-primary">Products</Link>
              <span className="mx-2">/</span>
              <span className="text-text-primary">{product.name}</span>
            </nav>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="bg-background/20 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 mb-4">
                <div className="relative aspect-square">
                  <Image 
                    src={selectedImage} 
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer ${
                      selectedImage === image ? 'border-primary' : 'border-white/10'
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image 
                      src={image} 
                      alt={`${product.name} - View ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {product.name}
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center text-primary">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="ml-2 text-text-secondary">100+ reviews</span>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline mb-2">
                  {discount > 0 ? (
                    <>
                      <span className="text-3xl font-bold text-primary mr-3">
                        ${discountedPrice}
                      </span>
                      <span className="text-xl text-text-secondary line-through">
                        ${selectedVariant.price}
                      </span>
                      <span className="ml-3 text-secondary bg-secondary/10 px-3 py-1 rounded-full text-sm font-bold">
                        {discount}% OFF
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-primary">
                      ${selectedVariant.price}
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-3 text-text-secondary text-sm">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Free shipping</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>30-day returns</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Certified authentic</span>
                  </div>
                </div>
              </div>
              
              <p className="text-text-secondary mb-6">
                {product.description}
              </p>
              
              {/* Variant Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Carat Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.caratSize}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        selectedVariant.caratSize === variant.caratSize
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-white/10 text-text-secondary hover:border-white/30'
                      }`}
                      onClick={() => setSelectedVariant(variant)}
                      aria-label={`Select ${variant.caratSize} carat`}
                    >
                      {variant.caratSize} CT
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Metal Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Metal Type</h3>
                <div className="flex flex-wrap gap-3">
                  {product.metalOptions.map((metal) => (
                    <button
                      key={metal}
                      className={`px-4 py-2 rounded-lg border transition-all ${
                        selectedMetal === metal
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-white/10 text-text-secondary hover:border-white/30'
                      }`}
                      onClick={() => setSelectedMetal(metal)}
                      aria-label={`Select ${metal}`}
                    >
                      {metal}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Quantity</h3>
                <div className="flex items-center">
                  <button 
                    className="h-10 w-10 rounded-l-lg bg-background/40 border border-white/10 flex items-center justify-center"
                    onClick={() => updateQuantity(quantity - 1)}
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => updateQuantity(parseInt(e.target.value) || 1)}
                    className="h-10 w-16 bg-background/40 border-t border-b border-white/10 text-center"
                    aria-label="Quantity"
                  />
                  <button 
                    className="h-10 w-10 rounded-r-lg bg-background/40 border border-white/10 flex items-center justify-center"
                    onClick={() => updateQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Add to Cart */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <motion.button
                  className="btn btn-primary flex-grow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  aria-label="Add to Cart"
                >
                  Add to Cart
                </motion.button>
                
                {discount === 0 && (
                  <Link href="/game" passHref className="flex-grow">
                    <motion.button
                      className="btn btn-outline w-full"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label="Play Game for Discount"
                    >
                      Play Game for 50% Off
                    </motion.button>
                  </Link>
                )}
              </div>
              
              {/* Price Comparison */}
              <div className="bg-background/40 backdrop-blur-sm rounded-lg border border-white/10 p-4 mb-8">
                <h3 className="text-lg font-bold mb-3">Price Comparison</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-primary font-bold text-lg">
                      ${selectedVariant.price}
                    </div>
                    <div className="text-text-secondary text-sm">Our Price</div>
                  </div>
                  <div className="text-center">
                    <div className="text-text-secondary font-bold text-lg">
                      ${product.comparisons.retail}
                    </div>
                    <div className="text-text-secondary text-sm">Retail Price</div>
                  </div>
                  <div className="text-center">
                    <div className="text-text-secondary font-bold text-lg">
                      ${product.comparisons.mined}
                    </div>
                    <div className="text-text-secondary text-sm">Mined Diamond</div>
                  </div>
                </div>
              </div>
              
              {/* Specifications */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-3">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Material:</span>
                      <span>{product.specifications.material}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Clarity:</span>
                      <span>{product.specifications.clarity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Color:</span>
                      <span>{product.specifications.color}</span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Cut:</span>
                      <span>{product.specifications.cut}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Certification:</span>
                      <span>{product.specifications.certification}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Settings:</span>
                      <span>{product.specifications.settings}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Features */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <svg className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Recommended Products */}
      <section className="py-12 bg-gradient-to-b from-background to-background/70">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filter out current product and limit to 4 */}
            {Object.values(getRelatedProducts(product))
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/products/${relatedProduct.slug}`} passHref>
                  <div className="card hover:shadow-glow transition-all duration-300 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <Image 
                        src={relatedProduct.images[0]} 
                        alt={relatedProduct.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold">{relatedProduct.name}</h3>
                      <p className="text-text-secondary text-sm">{relatedProduct.cutType}</p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="font-bold text-primary">
                          From ${relatedProduct.variants[0].price}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Function to get related products (excluding the current product)
function getRelatedProducts(currentProduct: Product) {
  // In a real app, you'd have a more sophisticated recommendation algorithm
  return Object.values(require('@/data/products').products)
    .filter((product: Product) => product.id !== currentProduct.id);
}
