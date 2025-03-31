'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameEngine from './GameEngine';
import GameInstructions from './GameInstructions';
import { useGameStore } from '@/store/gameStore';
import { useDiscountStore } from '@/store/discountStore';

const GameContainer = () => {
  const [showInstructions, setShowInstructions] = useState(true);
  const initGame = useGameStore(state => state.initGame);
  const startGame = useGameStore(state => state.startGame);
  const isGameOver = useGameStore(state => state.isGameOver);
  const discount = useDiscountStore(state => state.discount);
  
  // Initialize game when component mounts
  useEffect(() => {
    initGame();
    // Check if user is returning with an existing discount
    if (discount > 0) {
      setShowInstructions(false);
    }
  }, [initGame, discount]);
  
  // Function to start the game
  const handleStartGame = () => {
    setShowInstructions(false);
    startGame();
  };
  
  // Function to show instructions again
  const handleShowInstructions = () => {
    setShowInstructions(true);
  };
  
  return (
    <div className="game-container-wrapper relative w-full max-w-4xl mx-auto">
      <div className="game-container">
        <GameEngine />
      </div>
      
      <AnimatePresence>
        {showInstructions && !isGameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50"
          >
            <GameInstructions onStart={handleStartGame} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameContainer;
