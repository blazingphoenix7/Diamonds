'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useDiscountStore } from '@/store/discountStore';

type GameInstructionsProps = {
  onStart: () => void;
};

const GameInstructions = ({ onStart }: GameInstructionsProps) => {
  const incrementPerCompetitor = useDiscountStore(state => state.incrementPerCompetitor);
  const maxDiscount = useDiscountStore(state => state.maxDiscount);
  
  return (
    <div className="bg-background/90 backdrop-blur-lg p-6 rounded-2xl h-full flex flex-col justify-center border border-white/10">
      <div className="text-center max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Diamond Street Challenge
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-lg mb-8">
            Drive down New York&apos;s Diamond District and find the best deals. Pass competitor shops to increase your discount up to {maxDiscount}% off.
          </p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Instructions */}
          <div className="card text-left">
            <h3 className="text-xl font-bold mb-4 text-secondary">How to Play</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                <span>Use <strong>WASD</strong> or <strong>Arrow Keys</strong> to drive your car (touch controls on mobile)</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                <span>Pass competitor stores to earn <strong>{incrementPerCompetitor}%</strong> discount each</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                <span>Reach your own store before time runs out</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                <span>Apply your earned discount to any purchase</span>
              </li>
            </ul>
          </div>
          
          {/* Game Preview */}
          <div className="card overflow-hidden p-0 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 z-10"></div>
            <Image 
              src="/game-assets/game-preview.jpg" 
              alt="Diamond Street Game Preview" 
              width={400} 
              height={300}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-center z-20">
              <p className="font-bold text-lg">Beat competitors&apos; prices!</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={onStart}
            className="btn btn-primary text-lg px-10 py-4 shadow-glow"
            aria-label="Start Game"
          >
            Start Driving
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default GameInstructions;
