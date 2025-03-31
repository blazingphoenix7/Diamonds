'use client';

import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';
import { useDiscountStore } from '@/store/discountStore';
import GameEntities from './GameEntities';
import GameHUD from './GameHUD';
import GameControls from './GameControls';

const GameEngine = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const requestRef = useRef<number | null>(null);
  
  const isPlaying = useGameStore(state => state.isPlaying);
  const isGameOver = useGameStore(state => state.isGameOver);
  const updateGameState = useGameStore(state => state.updateGameState);
  const competitorsPassed = useGameStore(state => state.competitorsPassed);
  const distance = useGameStore(state => state.distance);
  const totalDistance = useGameStore(state => state.totalDistance);
  const initGame = useGameStore(state => state.initGame);
  const endGame = useGameStore(state => state.endGame);
  
  const setDiscount = useDiscountStore(state => state.setDiscount);
  const incrementPerCompetitor = useDiscountStore(state => state.incrementPerCompetitor);
  
  // Initialize game
  useEffect(() => {
    initGame();
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [initGame]);
  
  // Game loop
  useEffect(() => {
    if (!isPlaying || isGameOver) return;
    
    const animate = (time: number) => {
      if (lastFrameTimeRef.current === 0) {
        lastFrameTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
        return;
      }
      
      const deltaTime = time - lastFrameTimeRef.current;
      lastFrameTimeRef.current = time;
      
      // Update game state
      updateGameState(deltaTime / 1000); // Convert to seconds
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        lastFrameTimeRef.current = 0;
      }
    };
  }, [isPlaying, isGameOver, updateGameState]);
  
  // Update discount based on passed competitors
  useEffect(() => {
    const discount = competitorsPassed * incrementPerCompetitor;
    setDiscount(discount);
  }, [competitorsPassed, incrementPerCompetitor, setDiscount]);
  
  // Check if game is complete
  useEffect(() => {
    if (isPlaying && distance >= totalDistance) {
      endGame();
    }
  }, [isPlaying, distance, totalDistance, endGame]);
  
  // Apply touch controls if needed
  useEffect(() => {
    // Touch controls will be implemented in the GameControls component
  }, []);

  return (
    <div className="game-engine relative w-full h-full">
      <div ref={canvasRef} className="game-canvas relative overflow-hidden w-full h-full bg-game-street bg-cover bg-center">
        {/* Game entities (player, competitors, store) */}
        <GameEntities />
        
        {/* Game HUD */}
        <GameHUD />
      </div>
      
      {/* Game controls */}
      <GameControls />
    </div>
  );
};

export default GameEngine;
