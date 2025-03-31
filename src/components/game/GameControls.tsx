'use client';

import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';
import { motion } from 'framer-motion';

const CONTROL_KEYS = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  KeyW: 'up',
  KeyS: 'down',
  KeyA: 'left',
  KeyD: 'right',
} as const;

type ControlKey = keyof typeof CONTROL_KEYS;

const GameControls = () => {
  const setControl = useGameStore(state => state.setControl);
  const isPlaying = useGameStore(state => state.isPlaying);
  const isGameOver = useGameStore(state => state.isGameOver);
  
  // Reference for touch controls
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchMoveThreshold = 10; // Minimum distance to trigger movement
  const gameContainerRef = useRef<HTMLDivElement>(null);
  
  // Keyboard controls
  useEffect(() => {
    if (!isPlaying || isGameOver) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.code as ControlKey;
      if (key in CONTROL_KEYS) {
        e.preventDefault(); // Prevent scrolling with arrow keys
        setControl(CONTROL_KEYS[key], true);
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.code as ControlKey;
      if (key in CONTROL_KEYS) {
        e.preventDefault();
        setControl(CONTROL_KEYS[key], false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      
      // Reset controls when unmounting
      Object.values(CONTROL_KEYS).forEach((control) => {
        setControl(control, false);
      });
    };
  }, [isPlaying, isGameOver, setControl]);
  
  // Touch controls
  useEffect(() => {
    if (!isPlaying || isGameOver || !gameContainerRef.current) return;
    
    const container = gameContainerRef.current;
    
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartRef.current || e.touches.length === 0) return;
      
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const deltaX = touchX - touchStartRef.current.x;
      const deltaY = touchY - touchStartRef.current.y;
      
      // Reset all controls first
      setControl('left', false);
      setControl('right', false);
      setControl('up', false);
      setControl('down', false);
      
      // Apply movement based on dominant direction
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal movement is dominant
        if (Math.abs(deltaX) > touchMoveThreshold) {
          setControl(deltaX > 0 ? 'right' : 'left', true);
        }
      } else {
        // Vertical movement is dominant
        if (Math.abs(deltaY) > touchMoveThreshold) {
          setControl(deltaY > 0 ? 'down' : 'up', true);
        }
      }
    };
    
    const handleTouchEnd = () => {
      touchStartRef.current = null;
      
      // Reset all controls
      setControl('left', false);
      setControl('right', false);
      setControl('up', false);
      setControl('down', false);
    };
    
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isPlaying, isGameOver, setControl]);
  
  return (
    <div ref={gameContainerRef} className="game-controls absolute inset-0 z-10 pointer-events-none">
      {/* Mobile touch control buttons */}
      {isPlaying && !isGameOver && (
        <div className="md:hidden absolute bottom-10 left-0 right-0 flex justify-center gap-3 pointer-events-auto">
          <div className="flex flex-col items-center gap-3">
            <ControlButton direction="up" />
            <div className="flex gap-3">
              <ControlButton direction="left" />
              <ControlButton direction="down" />
              <ControlButton direction="right" />
            </div>
          </div>
        </div>
      )}
      
      {/* Keyboard control hints (desktop only) */}
      {isPlaying && !isGameOver && (
        <div className="hidden md:block absolute bottom-5 right-5 bg-background/70 backdrop-blur-sm p-3 rounded-lg text-sm">
          <p>Move with <span className="font-bold">WASD</span> or <span className="font-bold">Arrow Keys</span></p>
        </div>
      )}
    </div>
  );
};

type ControlButtonProps = {
  direction: 'up' | 'down' | 'left' | 'right';
};

const ControlButton = ({ direction }: ControlButtonProps) => {
  const setControl = useGameStore(state => state.setControl);
  
  // Map direction to arrow icon
  const arrowIcon = {
    up: '↑',
    down: '↓',
    left: '←',
    right: '→',
  };
  
  return (
    <motion.button
      className="bg-background/50 backdrop-blur-sm w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl border border-white/20"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onTouchStart={() => setControl(direction, true)}
      onTouchEnd={() => setControl(direction, false)}
      aria-label={`Move ${direction}`}
    >
      {arrowIcon[direction]}
    </motion.button>
  );
};

export default GameControls;
