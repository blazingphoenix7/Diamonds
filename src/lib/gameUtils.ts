import { GameEntity } from '@/store/gameStore';
import { isLowPerformanceDevice } from './utils';

/**
 * Check collision between two game entities
 */
export function checkCollision(entity1: GameEntity, entity2: GameEntity): boolean {
  return (
    entity1.x < entity2.x + entity2.width &&
    entity1.x + entity1.width > entity2.x &&
    entity1.y < entity2.y + entity2.height &&
    entity1.y + entity1.height > entity2.y
  );
}

/**
 * Calculate distance between two game entities (center points)
 */
export function getDistance(entity1: GameEntity, entity2: GameEntity): number {
  const e1CenterX = entity1.x + entity1.width / 2;
  const e1CenterY = entity1.y + entity1.height / 2;
  const e2CenterX = entity2.x + entity2.width / 2;
  const e2CenterY = entity2.y + entity2.height / 2;
  
  const dx = e1CenterX - e2CenterX;
  const dy = e1CenterY - e2CenterY;
  
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate if an entity is visible in the game viewport
 */
export function isEntityVisible(
  entity: GameEntity,
  viewportWidth: number,
  viewportHeight: number
): boolean {
  return (
    entity.x + entity.width > 0 &&
    entity.x < viewportWidth &&
    entity.y + entity.height > 0 &&
    entity.y < viewportHeight
  );
}

/**
 * Apply performance optimizations based on device capabilities
 */
export function optimizeForDevice(): {
  frameSkip: number;
  particleCount: number;
  enableShadows: boolean;
  enableBlur: boolean;
} {
  const isLowPerformance = isLowPerformanceDevice();
  
  return {
    frameSkip: isLowPerformance ? 2 : 1, // Skip frames for low-performance devices
    particleCount: isLowPerformance ? 5 : 20, // Reduce particle effects
    enableShadows: !isLowPerformance, // Disable shadows for low-performance devices
    enableBlur: !isLowPerformance, // Disable blur effects for low-performance devices
  };
}

/**
 * Calculate game difficulty based on progress
 */
export function calculateDifficulty(progress: number): {
  speed: number;
  obstacleFrequency: number;
} {
  // Increase speed and obstacle frequency as game progresses
  const baseSpeed = 200;
  const maxSpeedIncrease = 150;
  const speed = baseSpeed + (progress / 100) * maxSpeedIncrease;
  
  const minObstacleFrequency = 1500; // milliseconds
  const maxObstacleFrequency = 800; // milliseconds
  const obstacleFrequency = 
    minObstacleFrequency - ((progress / 100) * (minObstacleFrequency - maxObstacleFrequency));
  
  return {
    speed,
    obstacleFrequency,
  };
}

/**
 * Calculate score based on distance traveled and competitors passed
 */
export function calculateScore(distance: number, competitorsPassed: number): number {
  const distancePoints = Math.floor(distance / 10);
  const competitorPoints = competitorsPassed * 100;
  
  return distancePoints + competitorPoints;
}

/**
 * Calculate touch sensitivity based on device screen size
 */
export function calculateTouchSensitivity(screenWidth: number, screenHeight: number): number {
  // Higher sensitivity for smaller screens
  const baseSensitivity = 1.0;
  const smallScreenThreshold = 600; // pixels
  
  if (Math.min(screenWidth, screenHeight) < smallScreenThreshold) {
    return baseSensitivity * 1.5;
  }
  
  return baseSensitivity;
}

/**
 * Smooth entity movement with easing
 */
export function smoothMovement(
  currentPosition: number,
  targetPosition: number,
  easing = 0.1
): number {
  return currentPosition + (targetPosition - currentPosition) * easing;
}

/**
 * Generate a random position within game boundaries
 */
export function randomPosition(
  minX: number,
  maxX: number,
  minY: number,
  maxY: number
): { x: number; y: number } {
  return {
    x: Math.random() * (maxX - minX) + minX,
    y: Math.random() * (maxY - minY) + minY,
  };
}

/**
 * Calculate the interpolated position for smooth entity movement
 */
export function interpolatePosition(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  progress: number
): { x: number; y: number } {
  return {
    x: startX + (endX - startX) * progress,
    y: startY + (endY - startY) * progress,
  };
}
