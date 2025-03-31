'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import { useCartStore } from '@/store/cartStore';
import { useDiscountStore } from '@/store/discountStore';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { items } = useCartStore();
  const { discount } = useDiscountStore();

  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/90 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="relative z-10">
          <div className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Diamond Studs" 
              width={40} 
              height={40}
              className="mr-2"
            />
            <span className="font-display text-2xl font-bold bg-gradient-to-r from-white to-secondary bg-clip-text text-transparent">
              Diamond Studs
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Navigation />
          
          {/* Cart Icon */}
          <Link href="/checkout" aria-label="Go to checkout" className="relative">
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </motion.div>
          </Link>

          {/* Discount Badge */}
          {discount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-secondary text-background px-3 py-1 rounded-full text-sm font-bold"
            >
              {discount}% OFF
            </motion.div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden relative z-10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <div className="flex items-center space-x-2">
            {cartItemsCount > 0 && (
              <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </div>
        </button>

        {/* Mobile Menu */}
        <motion.div 
          className={`fixed inset-0 bg-background z-0 flex flex-col p-6 ${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0,
            y: isMobileMenuOpen ? 0 : -20
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="pt-20 flex flex-col space-y-6 items-center text-center">
            <Navigation isMobile={true} />
            
            <Link 
              href="/checkout" 
              className="flex items-center space-x-2 text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                />
              </svg>
              <span>Cart ({cartItemsCount})</span>
            </Link>

            {/* Mobile Discount Badge */}
            {discount > 0 && (
              <div className="bg-secondary text-background px-3 py-1 rounded-full text-sm font-bold">
                {discount}% OFF
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
