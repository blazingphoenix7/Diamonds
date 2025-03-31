'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { useDiscountStore } from '@/store/discountStore';

export default function ConfirmationPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const { resetDiscount } = useDiscountStore();
  
  // Generate a random order number
  const orderNumber = `DS${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Format date for delivery estimate
  const formatDate = (daysToAdd: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // If accessed directly without checkout, redirect to home
  useEffect(() => {
    if (items.length === 0) {
      // This is a simple simulation. In a real app, we'd check for a valid order ID
      router.push('/');
    }
    
    // Clear cart and discount on component mount (simulating order completion)
    clearCart();
    resetDiscount();
  }, [items.length, router, clearCart, resetDiscount]);
  
  return (
    <div className="pt-20">
      <section className="py-12 bg-background relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="card text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full animate-pulse"></div>
                </div>
                <svg 
                  className="h-16 w-16 text-primary relative z-10 mx-auto" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              
              <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
              <p className="text-lg text-text-secondary mb-6">
                Your order has been received and is being processed.
              </p>
              
              <div className="bg-background/40 backdrop-blur-sm rounded-lg p-6 mb-8 text-left">
                <div className="mb-4 pb-4 border-b border-white/10">
                  <span className="text-text-secondary">Order Number:</span>
                  <p className="text-xl font-bold">{orderNumber}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-text-secondary">Order Date:</span>
                    <p className="font-medium">{new Date().toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}</p>
                  </div>
                  
                  <div>
                    <span className="text-text-secondary">Payment Method:</span>
                    <p className="font-medium">Credit Card (•••• 1234)</p>
                  </div>
                  
                  <div>
                    <span className="text-text-secondary">Estimated Delivery:</span>
                    <p className="font-medium">{formatDate(7)} - {formatDate(10)}</p>
                  </div>
                  
                  <div>
                    <span className="text-text-secondary">Shipping Method:</span>
                    <p className="font-medium">Express Shipping (2-5 business days)</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="font-medium mb-1">Shipping Address:</p>
                  <p className="text-text-secondary">Jane Doe</p>
                  <p className="text-text-secondary">123 Diamond Street</p>
                  <p className="text-text-secondary">New York, NY 10001</p>
                  <p className="text-text-secondary">United States</p>
                </div>
              </div>
              
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8 text-left">
                <div className="flex items-start">
                  <svg 
                    className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium">A confirmation email has been sent to your email address.</p>
                    <p className="text-sm text-text-secondary mt-1">
                      Please check your inbox for order details and tracking information.
                      If you don't see it, please check your spam folder.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/products" passHref>
                  <motion.button
                    className="btn btn-outline"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue Shopping
                  </motion.button>
                </Link>
                
                <Link href="/" passHref>
                  <motion.button
                    className="btn btn-primary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Back to Home
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
