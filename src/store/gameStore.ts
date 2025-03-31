'use client';

import { create } from 'zustand';

export interface GameEntity {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  type: 'player' | 'competitor' | 'store';
  passed: boolean;
}

interface GameState {
  isPlaying: boolean;
  isGameOver: boolean;
  elapsedTime: number;
  totalTime: number;
  player: GameEntity;
  competitors: GameEntity[];
  store: GameEntity;
  distance: number;
  totalDistance: number;
  competitorsPassed: number;
  controls: {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
  };
  
  initGame: () => void;
  startGame: () => void;
  endGame: () => void;
  updatePlayer: (deltaX: number, deltaY: number) => void;
  updatePlayerPosition: (x: number, y: number) => void;
  updateGameState: (deltaTime: number) => void;
  setControl: (control: keyof GameState['controls'], value: boolean) => void;
  checkCollisions: () => boolean;
  markCompetitorPassed: (id: string) => void;
  incrementElapsedTime: (deltaTime: number) => void;
}

// Initialize with default values
const initialPlayer: GameEntity = {
  id: 'player',
  x: 200,
  y: 500,
  width: 40,
  height: 80,
  speed: 200,
  type: 'player',
  passed: false,
};

const initialStore: GameEntity = {
  id: 'store',
  x: 200,
  y: -1000,
  width: 150,
  height: 100,
  speed: 0,
  type: 'store',
  passed: false,
};

// Initial competitors (will be positioned in initGame)
const createInitialCompetitors = (): GameEntity[] => {
  const competitors: GameEntity[] = [];
  
  for (let i = 0; i < 5; i++) {
    competitors.push({
      id: `competitor-${i}`,
      x: 50 + (i % 2) * 300, // Alternate left and right sides
      y: -500 - i * 500,     // Staggered on the road
      width: 120,
      height: 100,
      speed: 0,
      type: 'competitor',
      passed: false,
    });
  }
  
  return competitors;
};

export const useGameStore = create<GameState>()((set, get) => ({
  isPlaying: false,
  isGameOver: false,
  elapsedTime: 0,
  totalTime: 90, // 90 seconds game duration
  player: { ...initialPlayer },
  competitors: createInitialCompetitors(),
  store: { ...initialStore },
  distance: 0,
  totalDistance: 5000, // Total distance to travel
  competitorsPassed: 0,
  controls: {
    left: false,
    right: false,
    up: false,
    down: false,
  },
  
  initGame: () => {
    const competitors = createInitialCompetitors();
    
    set({
      isPlaying: false,
      isGameOver: false,
      elapsedTime: 0,
      player: { ...initialPlayer },
      competitors,
      store: { ...initialStore },
      distance: 0,
      competitorsPassed: 0,
      controls: {
        left: false,
        right: false,
        up: false,
        down: false,
      },
    });
  },
  
  startGame: () => set({ isPlaying: true }),
  
  endGame: () => set({ isPlaying: false, isGameOver: true }),
  
  updatePlayer: (deltaX, deltaY) => {
    const { player } = get();
    
    // Calculate new position
    let newX = player.x + deltaX;
    let newY = player.y + deltaY;
    
    // Constrain player to game boundaries (assuming game width of 400)
    newX = Math.max(0, Math.min(newX, 400 - player.width));
    newY = Math.max(0, Math.min(newY, 600 - player.height));
    
    set({ player: { ...player, x: newX, y: newY } });
  },
  
  updatePlayerPosition: (x, y) => {
    const { player } = get();
    set({ player: { ...player, x, y } });
  },
  
  updateGameState: (deltaTime) => {
    const state = get();
    
    if (!state.isPlaying || state.isGameOver) return;
    
    // Update elapsed time
    const newElapsedTime = state.elapsedTime + deltaTime;
    
    // Check if time's up
    if (newElapsedTime >= state.totalTime) {
      set({ isGameOver: true, isPlaying: false });
      return;
    }
    
    // Calculate player movement based on controls
    let deltaX = 0;
    let deltaY = 0;
    const moveSpeed = state.player.speed * (deltaTime / 1000);
    
    if (state.controls.left) deltaX -= moveSpeed;
    if (state.controls.right) deltaX += moveSpeed;
    if (state.controls.up) deltaY -= moveSpeed;
    if (state.controls.down) deltaY += moveSpeed;
    
    // Update player position
    state.updatePlayer(deltaX, deltaY);
    
    // Update distance (progress)
    const distanceIncrement = 100 * (deltaTime / 1000); // Speed of progress
    const newDistance = Math.min(state.distance + distanceIncrement, state.totalDistance);
    
    // Check if player reached the end
    if (newDistance >= state.totalDistance && !state.isGameOver) {
      set({ isGameOver: true, isPlaying: false, distance: state.totalDistance });
      return;
    }
    
    // Update game state
    set({
      elapsedTime: newElapsedTime,
      distance: newDistance,
    });
    
    // Check for collisions and competitors passed
    state.checkCollisions();
  },
  
  setControl: (control, value) => {
    set((state) => ({
      controls: {
        ...state.controls,
        [control]: value,
      },
    }));
  },
  
  checkCollisions: () => {
    const { player, competitors } = get();
    let collision = false;
    
    for (const competitor of competitors) {
      if (competitor.passed) continue;
      
      // Check if player passed a competitor
      if (player.y < competitor.y + competitor.height / 2) {
        get().markCompetitorPassed(competitor.id);
        continue;
      }
      
      // Check for collision
      if (
        player.x < competitor.x + competitor.width &&
        player.x + player.width > competitor.x &&
        player.y < competitor.y + competitor.height &&
        player.y + player.height > competitor.y
      ) {
        collision = true;
        break;
      }
    }
    
    return collision;
  },
  
  markCompetitorPassed: (id) => {
    set((state) => {
      const newCompetitors = state.competitors.map(competitor => 
        competitor.id === id ? { ...competitor, passed: true } : competitor
      );
      
      const newCompetitorsPassed = newCompetitors.filter(c => c.passed).length;
      
      return {
        competitors: newCompetitors,
        competitorsPassed: newCompetitorsPassed,
      };
    });
  },
  
  incrementElapsedTime: (deltaTime) => {
    set((state) => ({
      elapsedTime: state.elapsedTime + deltaTime,
    }));
  },
}));
