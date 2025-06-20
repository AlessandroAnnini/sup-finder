import type {
  UserInput,
  BoardDimensions,
  CalculationResult,
  UnitSystem,
} from '@/types';
import {
  getBoardTypeConfig,
  getBoardMaterialConfig,
  getCalculationParams,
  getSupConfig,
} from '@/lib/config';
import type { BoardTypeConfig, BoardMaterialConfig } from '@/lib/config';

// Get board type info from configuration
export const getBoardTypeInfo = (): Record<string, BoardTypeConfig> => {
  const config = getSupConfig();
  return config.boardTypes;
};

// Get board material info from configuration
export const getBoardMaterialInfo = (): Record<string, BoardMaterialConfig> => {
  const config = getSupConfig();
  return config.boardMaterials;
};

// Convert measurements using config values
const convertUnits = () => {
  const config = getSupConfig();
  const factors = config.conversionFactors;

  return {
    cmToInches: (cm: number): number => cm / factors.cmToInches,
    kgToPounds: (kg: number): number => kg * factors.kgToPounds,
    inchesToFeetAndInches: (totalInches: number): string => {
      const feet = Math.floor(totalInches / 12);
      const inches = Math.round(totalInches % 12);
      return `${feet}'${inches}"`;
    },
  };
};

// Calculate volume needed based on weight, board type, and board material
const calculateVolume = (
  weightLbs: number,
  boardType: string,
  boardMaterial: string
): number => {
  const params = getCalculationParams();
  const boardConfig = getBoardTypeConfig(boardType);
  const materialConfig = getBoardMaterialConfig(boardMaterial);

  // Base volume calculation using config parameters
  const baseVolume = weightLbs * params.baseVolumeMultiplier;

  // Apply both board type and material multipliers from config
  return Math.round(
    baseVolume * boardConfig.volumeMultiplier * materialConfig.volumeMultiplier
  );
};

// Calculate board dimensions based on volume and type
const calculateDimensions = (
  volume: number,
  boardType: string,
  heightInches: number
): BoardDimensions => {
  const boardConfig = getBoardTypeConfig(boardType);
  const params = getCalculationParams();
  const converters = convertUnits();

  const shapeRatio = boardConfig.shapeRatio;

  // Adjust base dimensions based on height using config parameters
  const heightFactor = heightInches / params.averageHeightInches;

  const length = shapeRatio.length * heightFactor;
  const width =
    shapeRatio.width * Math.sqrt(volume / params.widthVolumeScaling);
  const thickness = shapeRatio.thickness;

  return {
    length: converters.inchesToFeetAndInches(length * 12), // Convert feet to inches then format
    width: `${Math.round(width)}"`,
    thickness: `${thickness}"`,
  };
};

// Generate explanation text using config data
const generateExplanation = (
  boardType: string,
  boardMaterial: string,
  volume: number
): string => {
  const boardConfig = getBoardTypeConfig(boardType);
  const materialConfig = getBoardMaterialConfig(boardMaterial);
  return `For ${boardConfig.name.toLowerCase()} paddling with a ${materialConfig.name.toLowerCase()}, we recommend a board with ${volume}L volume. ${
    boardConfig.description
  }. ${
    materialConfig.description
  }. This volume provides the right balance of stability and performance for your weight and intended use.`;
};

// Main calculation function
export const calculateSupBoard = (input: UserInput): CalculationResult => {
  const converters = convertUnits();

  // Convert to imperial if needed
  const heightInches =
    input.unitSystem === 'metric'
      ? converters.cmToInches(input.height)
      : input.height;

  const weightLbs =
    input.unitSystem === 'metric'
      ? converters.kgToPounds(input.weight)
      : input.weight;

  // Calculate volume and dimensions
  const volume = calculateVolume(
    weightLbs,
    input.boardType,
    input.boardMaterial
  );
  const dimensions = calculateDimensions(volume, input.boardType, heightInches);
  const explanation = generateExplanation(
    input.boardType,
    input.boardMaterial,
    volume
  );

  return {
    dimensions,
    volume,
    explanation,
  };
};

// Unit conversion helpers for display
export const convertHeight = (
  height: number,
  fromUnit: UnitSystem,
  toUnit: UnitSystem
): number => {
  if (fromUnit === toUnit) return height;
  const converters = convertUnits();
  return fromUnit === 'metric'
    ? converters.cmToInches(height)
    : height * getSupConfig().conversionFactors.cmToInches;
};

export const convertWeight = (
  weight: number,
  fromUnit: UnitSystem,
  toUnit: UnitSystem
): number => {
  if (fromUnit === toUnit) return weight;
  const converters = convertUnits();
  return fromUnit === 'metric'
    ? converters.kgToPounds(weight)
    : weight / getSupConfig().conversionFactors.kgToPounds;
};

// Legacy export for backward compatibility
export const boardTypeInfo = getBoardTypeInfo();
