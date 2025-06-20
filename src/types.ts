// Re-export configuration types from the config system
export type {
  SupConfig,
  BoardTypeConfig,
  UnitSystemConfig,
  CalculationParams,
  ShapeRatio,
} from '@/lib/config';

// Original types that are still needed for the UI
export type BoardType =
  | 'all-around'
  | 'touring'
  | 'cruising'
  | 'surf'
  | 'yoga'
  | 'fishing'
  | 'racing'
  | 'whitewater'
  | 'expedition';

export type UnitSystem = 'metric' | 'imperial';

export interface UserInput {
  boardType: BoardType;
  height: number;
  weight: number;
  unitSystem: UnitSystem;
}

export interface BoardDimensions {
  length: string; // in feet'inches" format
  width: string; // in inches format
  thickness: string; // in inches format
}

export interface CalculationResult {
  dimensions: BoardDimensions;
  volume: number; // in liters
  explanation: string;
}

// Legacy interface for backward compatibility
// Now replaced by BoardTypeConfig from config system
export interface BoardTypeInfo {
  name: string;
  description: string;
  icon: string;
}
