'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

type NavigationProps = {
  isMobile?: boolean;
};

const Navigation = ({ isMobile = false }: NavigationProps) => {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Play Game', path: '/game' },
  ];

  return (
    <nav className={isMobile ? 'flex flex-col space-y-6' : 'flex space-x-8'}>
      {navItems.map((item) => {
        const isActive = pathname === item.path || 
                         (item.path !== '/' && pathname?.startsWith(item.path));
        
        return (
          <Link 
            key={item.path} 
            href={item.path}
            className={`relative ${isMobile ? 'text-2xl py-2' : 'text-base'} font-medium transition-colors duration-300 ${
              isActive ? 'text-secondary' : 'text-text-primary hover:text-secondary'
            }`}
          >
            {item.name}
            {isActive && (
              <motion.span
                layoutId="nav-underline"
                className="absolute left-0 top-full h-0.5 w-full bg-secondary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
