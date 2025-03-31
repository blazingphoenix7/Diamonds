'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { useDiscountStore } from '@/store/discountStore';
import Link from 'next/link';

const GameHUD = () => {
  const isPlaying = useGameStore(state => state.isPlaying);
  const isGameOver = useGameStore(state => state.isGameOver);
  const elapsedTime = useGameStore(state => state.elapsedTime);
  const totalTime = useGameStore(state => state.totalTime);
  const distance = useGameStore(state => state.distance);
  const totalDistance = useGameStore(state => state.totalDistance);
  const competitorsPassed = useGameStore(state => state.competitorsPassed);
  const startGame = useGameStore(state => state.startGame);
  const initGame = useGameStore(state => state.initGame);
  
  const discount = useDiscountStore(state => state.discount);
  const incrementPerCompetitor = useDiscountStore(state => state.incrementPerCompetitor);
  const maxDiscount = useDiscountStore(state => state.maxDiscount);
  
  // Format time for display (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage
  const progressPercent = Math.min(100, (distance / totalDistance) * 100);
  
  // Calculate remaining time
  const remainingTime = totalTime - elapsedTime;
  const remainingTimePercent = Math.max(0, (remainingTime / totalTime) * 100);
  
  // Restart game
  const handleRestart = () => {
    initGame();
    setTimeout(() => {
      startGame();
    }, 500);
  };
  
  return (
    <div className="game-hud absolute inset-0 pointer-events-none">
      {/* Top HUD - Timer & Discount */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
        {/* Timer */}
        <div className="bg-background/70 backdrop-blur-sm p-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="font-mono font-bold">
              {formatTime(Math.max(0, remainingTime))}
            </span>
          </div>
          
          {/* Time progress bar */}
          <div className="w-full h-1 bg-white/20 mt-1 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-secondary"
              initial={{ width: '100%' }}
              animate={{ width: `${remainingTimePercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        
        {/* Current Discount */}
        <div className="bg-background/70 backdrop-blur-sm p-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
            </svg>
            <span className="font-bold">
              {discount}% OFF
            </span>
          </div>
          
          {/* Discount progress bar */}
          <div className="w-full h-1 bg-white/20 mt-1 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-secondary"
              initial={{ width: '0%' }}
              animate={{ width: `${(discount / maxDiscount) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
      
      {/* Bottom HUD - Progress */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="bg-background/70 backdrop-blur-sm p-2 rounded-lg">
          <div className="flex justify-between text-sm">
            <span>Start</span>
            <span className="font-bold">Progress: {Math.round(progressPercent)}%</span>
            <span>Finish</span>
          </div>
          
          {/* Progress bar */}
          <div className="w-full h-2 bg-white/20 mt-1 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: '0%' }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          {/* Stores passed */}
          <div className="flex justify-center mt-1 text-xs">
            <span>Competitors Passed: {competitorsPassed} of 5</span>
          </div>
        </div>
      </div>
      
      {/* Game Start Screen */}
      {!isPlaying && !isGameOver && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md flex flex-col items-center justify-center pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center px-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">Diamond Street</h2>
            <p className="text-lg mb-6 max-w-md mx-auto">
              Drive down NYC&apos;s Diamond District to find the best deals! 
              Pass competitors to increase your discount up to {maxDiscount}% off.
            </p>
            <ul className="text-left mb-8 max-w-md mx-auto">
              <li className="flex items-center mb-2">
                <svg className="h-5 w-5 mr-2 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                Use <span className="mx-1 font-bold">WASD</span> or <span className="mx-1 font-bold">Arrow Keys</span> to drive (mobile: touch controls)
              </li>
              <li className="flex items-center mb-2">
                <svg className="h-5 w-5 mr-2 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                Pass competitor stores to earn <span className="mx-1 font-bold">{incrementPerCompetitor}%</span> discount each
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 mr-2 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                Reach your store before the timer runs out
              </li>
            </ul>
            <motion.button
              className="btn btn-primary text-lg px-8 py-3 pointer-events-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => startGame()}
              aria-label="Start Game"
            >
              Start Driving
            </motion.button>
          </motion.div>
        </div>
      )}
      
      {/* Game Over Screen */}
      {isGameOver && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md flex flex-col items-center justify-center pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center px-6"
          >
            {progressPercent >= 100 ? (
              <>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">You Made It!</h2>
                <p className="text-lg mb-4">
                  You successfully reached your Diamond Studs store.
                </p>
              </>
            ) : (
              <>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Time&apos;s Up!</h2>
                <p className="text-lg mb-4">
                  You made it {Math.round(progressPercent)}% of the way.
                </p>
              </>
            )}
            
            {/* Result summary */}
            <div className="card mb-6 max-w-md mx-auto">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <span>Competitors Passed:</span>
                  <span className="font-bold">{competitorsPassed} of 5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Time Used:</span>
                  <span className="font-bold">{formatTime(elapsedTime)} of {formatTime(totalTime)}</span>
                </div>
                <div className="flex justify-between items-center text-xl">
                  <span>Your Discount:</span>
                  <span className="font-bold text-secondary">{discount}% OFF</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                className="btn btn-outline text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRestart}
                aria-label="Play Again"
              >
                Play Again
              </motion.button>
              
              <Link href="/products" passHref>
                <motion.a
                  className="btn btn-primary text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Shop Now with Discount"
                >
                  Shop Now with {discount}% OFF
                </motion.a>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GameHUD;
