import { Variants } from 'framer-motion';

/**
 * Fade in animation variants
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

/**
 * Fade in up animation variants
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

/**
 * Fade in down animation variants
 */
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

/**
 * Fade in left animation variants
 */
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  }
};

/**
 * Fade in right animation variants
 */
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  }
};

/**
 * Zoom in animation variants
 */
export const zoomIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  }
};

/**
 * Slide up animation variants
 */
export const slideUp: Variants = {
  hidden: { y: '100%' },
  visible: { 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

/**
 * Staggered children animation variants
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

/**
 * Staggered item animation variants
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

/**
 * Pulse animation variants
 */
export const pulse: Variants = {
  hidden: { opacity: 0.6, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 1.5, 
      repeat: Infinity, 
      repeatType: 'reverse' 
    }
  }
};

/**
 * Game entity movement animation
 */
export const gameEntityMotion = (initialY: number, finalY: number): Variants => ({
  initial: { y: initialY, opacity: 0 },
  animate: { 
    y: finalY, 
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' }
  },
  exit: { 
    y: finalY + 100, 
    opacity: 0,
    transition: { duration: 0.3 }
  }
});

/**
 * Button hover animation
 */
export const buttonHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
};

/**
 * Card hover animation
 */
export const cardHover = {
  whileHover: { y: -5, transition: { duration: 0.2 } }
};

/**
 * Create a page transition animation
 */
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

/**
 * Create a hover glow effect
 */
export const glowEffect = {
  whileHover: { 
    boxShadow: '0 0 15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3)'
  }
};

/**
 * Tilt effect for cards
 */
export const tiltEffect = {
  whileHover: { 
    rotateX: 5, 
    rotateY: 5, 
    transition: { duration: 0.2 }
  }
};
