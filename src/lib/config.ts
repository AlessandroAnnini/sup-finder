import { z } from 'zod';
import configData from '@/config/sup-config.json';

// Zod schema for board shape ratios
const ShapeRatioSchema = z.object({
  length: z.number().positive(),
  width: z.number().positive(),
  thickness: z.number().positive(),
});

// Zod schema for board type configuration
const BoardTypeSchema = z.object({
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  volumeMultiplier: z.number().positive(),
  shapeRatio: ShapeRatioSchema,
});

// Zod schema for board material configuration
const BoardMaterialSchema = z.object({
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  volumeMultiplier: z.number().positive(),
});

// Zod schema for range configuration
const RangeSchema = z
  .object({
    min: z.number(),
    max: z.number(),
  })
  .refine((data) => data.min < data.max, {
    message: 'Min value must be less than max value',
  });

// Zod schema for presets configuration
const PresetsSchema = z.object({
  height: z
    .object({
      short: z.number().positive(),
      average: z.number().positive(),
      tall: z.number().positive(),
    })
    .refine((data) => data.short < data.average && data.average < data.tall, {
      message: 'Height presets must be in ascending order',
    }),
  weight: z
    .object({
      light: z.number().positive(),
      average: z.number().positive(),
      heavy: z.number().positive(),
    })
    .refine((data) => data.light < data.average && data.average < data.heavy, {
      message: 'Weight presets must be in ascending order',
    }),
});

// Zod schema for ranges configuration
const RangesSchema = z.object({
  height: RangeSchema,
  weight: RangeSchema,
});

// Zod schema for unit system configuration
const UnitSystemSchema = z.object({
  name: z.string(),
  heightLabel: z.string(),
  weightLabel: z.string(),
  ranges: RangesSchema,
  presets: PresetsSchema,
});

// Zod schema for calculation parameters
const CalculationParamsSchema = z.object({
  baseVolumeMultiplier: z.number().positive(),
  averageHeightInches: z.number().positive(),
  heightScalingFactor: z.number().positive(),
  widthVolumeScaling: z.number().positive(),
});

// Zod schema for conversion factors
const ConversionFactorsSchema = z.object({
  cmToInches: z.number().positive(),
  kgToPounds: z.number().positive(),
});

// Main configuration schema
const SupConfigSchema = z.object({
  boardMaterials: z.record(BoardMaterialSchema),
  boardTypes: z.record(BoardTypeSchema),
  unitSystems: z.object({
    metric: UnitSystemSchema,
    imperial: UnitSystemSchema,
  }),
  calculationParams: CalculationParamsSchema,
  conversionFactors: ConversionFactorsSchema,
});

// Inferred types from Zod schemas
export type SupConfig = z.infer<typeof SupConfigSchema>;
export type BoardTypeConfig = z.infer<typeof BoardTypeSchema>;
export type BoardMaterialConfig = z.infer<typeof BoardMaterialSchema>;
export type UnitSystemConfig = z.infer<typeof UnitSystemSchema>;
export type CalculationParams = z.infer<typeof CalculationParamsSchema>;
export type ShapeRatio = z.infer<typeof ShapeRatioSchema>;

// Validate configuration at module load time
let validatedConfig: SupConfig;

try {
  validatedConfig = SupConfigSchema.parse(configData);
  console.log('✅ SUP configuration loaded and validated successfully');
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('❌ Configuration validation failed:', error.errors);
    throw new Error(
      `Invalid SUP configuration: ${error.errors
        .map((e) => `${e.path.join('.')}: ${e.message}`)
        .join(', ')}`
    );
  }

  console.error('❌ Failed to load SUP configuration:', error);
  throw new Error('Failed to load SUP configuration');
}

// Synchronous configuration access
export const getSupConfig = (): SupConfig => {
  return validatedConfig;
};

// Helper functions for accessing config data
export const getBoardTypeConfig = (boardType: string): BoardTypeConfig => {
  const config = getSupConfig();
  const boardConfig = config.boardTypes[boardType];
  if (!boardConfig) {
    throw new Error(`Board type '${boardType}' not found in configuration`);
  }
  return boardConfig;
};

export const getBoardMaterialConfig = (
  boardMaterial: string
): BoardMaterialConfig => {
  const config = getSupConfig();
  const materialConfig = config.boardMaterials[boardMaterial];
  if (!materialConfig) {
    throw new Error(
      `Board material '${boardMaterial}' not found in configuration`
    );
  }
  return materialConfig;
};

export const getUnitSystemConfig = (
  unitSystem: 'metric' | 'imperial'
): UnitSystemConfig => {
  const config = getSupConfig();
  return config.unitSystems[unitSystem];
};

export const getCalculationParams = (): CalculationParams => {
  const config = getSupConfig();
  return config.calculationParams;
};

// Legacy async loader for backward compatibility (now synchronous)
export const loadSupConfig = async (): Promise<SupConfig> => {
  return Promise.resolve(validatedConfig);
};

// Validation helper for external use
export const validateSupConfig = (config: unknown): SupConfig => {
  return SupConfigSchema.parse(config);
};
