'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';

const GameEntities = () => {
  const player = useGameStore(state => state.player);
  const competitors = useGameStore(state => state.competitors);
  const store = useGameStore(state => state.store);
  const distance = useGameStore(state => state.distance);
  const totalDistance = useGameStore(state => state.totalDistance);
  
  // Calculate progress as a percentage (0-100)
  const progress = (distance / totalDistance) * 100;
  
  // Calculate vertical positions based on progress
  const positionEntities = useMemo(() => {
    // Player is fixed at the same vertical position
    const playerPos = {
      x: player.x,
      y: player.y,
    };
    
    // Competitors are positioned based on progress
    const competitorPositions = competitors.map((comp, index) => {
      // Calculate position based on progress
      // Competitors start ahead of player and move toward bottom of screen as player advances
      const totalSegments = competitors.length + 1; // +1 for the store
      const segmentSize = 100 / totalSegments;
      const segmentPosition = (index + 1) * segmentSize;
      
      // Adjust vertical position based on progress and segment
      let yPos = 0;
      
      if (progress < segmentPosition) {
        // Competitor is still ahead (above player viewpoint)
        const segmentProgress = progress / segmentPosition;
        yPos = 700 - (segmentProgress * 1200);
      } else {
        // Competitor has been passed (below player viewpoint)
        yPos = 700 + ((progress - segmentPosition) * 10);
      }
      
      return {
        ...comp,
        yPos,
      };
    });
    
    // Store position
    const storePos = {
      x: store.x,
      y: progress >= 90 ? 400 : -300 + (progress * 7), // Move into view near the end
    };
    
    return {
      player: playerPos,
      competitors: competitorPositions,
      store: storePos,
    };
  }, [player, competitors, store, progress]);
  
  return (
    <div className="game-entities w-full h-full">
      {/* Player car */}
      <motion.div
        className="player absolute"
        style={{
          left: `${positionEntities.player.x}px`,
          top: `${positionEntities.player.y}px`,
          width: `${player.width}px`,
          height: `${player.height}px`,
          zIndex: 20,
        }}
        animate={{
          x: positionEntities.player.x,
          y: positionEntities.player.y,
        }}
        transition={{ type: 'spring', damping: 15 }}
      >
        <Image 
          src="/game-assets/car.png" 
          alt="Player Car" 
          width={player.width} 
          height={player.height}
          className="w-full h-full object-contain"
          priority
        />
      </motion.div>
      
      {/* Competitor stores */}
      {positionEntities.competitors.map((comp, index) => (
        <motion.div
          key={comp.id}
          className={`competitor absolute ${comp.passed ? 'opacity-50' : 'opacity-100'}`}
          style={{
            left: `${comp.x}px`,
            width: `${comp.width}px`,
            height: `${comp.height}px`,
            zIndex: 10,
          }}
          animate={{
            y: comp.yPos,
            x: comp.x,
            opacity: comp.passed ? 0.5 : 1,
          }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <div className="relative">
            <Image 
              src={`/game-assets/store-${index + 1}.png`} 
              alt={`Competitor Store ${index + 1}`}
              width={comp.width} 
              height={comp.height}
              className="w-full h-full object-contain"
            />
            {/* Price tag */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded-full text-sm shadow-neon">
              {4 - index}x higher prices!
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* Your diamond store */}
      <motion.div
        className="store absolute"
        style={{
          left: `${store.x}px`,
          width: `${store.width}px`,
          height: `${store.height}px`,
          zIndex: 10,
        }}
        animate={{
          y: positionEntities.store.y,
        }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <div className="relative">
          <Image 
            src="/game-assets/your-store.png" 
            alt="Your Diamond Store"
            width={store.width} 
            height={store.height}
            className="w-full h-full object-contain"
          />
          {/* Price tag */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-secondary text-background px-3 py-1 rounded-full text-sm font-bold shadow-glow animate-pulse">
            BEST PRICES!
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GameEntities;
