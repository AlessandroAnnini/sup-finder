import { useState } from 'react';
import type {
  UserInput,
  CalculationResult,
  BoardType,
  UnitSystem,
} from '@/types';
import { calculateSupBoard } from '@/lib/supCalculator';
import { getUnitSystemConfig, getSupConfig } from '@/lib/config';
import { ModeToggle } from '@/components/mode-toggle';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import InputForm from './InputForm';
import BoardResults from './BoardResults';

const SupFinder = () => {
  const [userInput, setUserInput] = useState<UserInput>({
    boardType: 'all-around',
    height: 170,
    weight: 70,
    unitSystem: 'metric',
  });

  const [result, setResult] = useState<CalculationResult | null>(null);

  // Smart ranges based on unit system from config
  const getRanges = () => {
    try {
      const unitConfig = getUnitSystemConfig(userInput.unitSystem);
      return unitConfig.ranges;
    } catch {
      // Fallback ranges
      return userInput.unitSystem === 'metric'
        ? { height: { min: 140, max: 210 }, weight: { min: 40, max: 120 } }
        : { height: { min: 55, max: 83 }, weight: { min: 90, max: 265 } };
    }
  };

  // Preset values based on unit system from config
  const getPresets = () => {
    try {
      const unitConfig = getUnitSystemConfig(userInput.unitSystem);
      return unitConfig.presets;
    } catch {
      // Fallback presets
      return userInput.unitSystem === 'metric'
        ? {
            height: { short: 160, average: 175, tall: 190 },
            weight: { light: 60, average: 75, heavy: 90 },
          }
        : {
            height: { short: 63, average: 69, tall: 75 },
            weight: { light: 130, average: 165, heavy: 200 },
          };
    }
  };

  // Get board types from config
  const getBoardTypes = () => {
    try {
      const config = getSupConfig();
      return config.boardTypes;
    } catch {
      return {};
    }
  };

  // Format display values
  const formatHeight = (value: number) => {
    try {
      const unitConfig = getUnitSystemConfig(userInput.unitSystem);
      if (userInput.unitSystem === 'metric') {
        return `${value} ${unitConfig.heightLabel}`;
      } else {
        const feet = Math.floor(value / 12);
        const inches = value % 12;
        return `${feet}'${inches}"`;
      }
    } catch {
      return userInput.unitSystem === 'metric'
        ? `${value} cm`
        : `${Math.floor(value / 12)}'${value % 12}"`;
    }
  };

  const formatWeight = (value: number) => {
    try {
      const unitConfig = getUnitSystemConfig(userInput.unitSystem);
      return `${value} ${unitConfig.weightLabel}`;
    } catch {
      return userInput.unitSystem === 'metric' ? `${value} kg` : `${value} lbs`;
    }
  };

  // Event handlers
  const handleBoardTypeChange = (boardType: BoardType) => {
    setUserInput((prev) => ({ ...prev, boardType }));
  };

  const handleHeightChange = (height: number) => {
    setUserInput((prev) => ({ ...prev, height }));
  };

  const handleWeightChange = (weight: number) => {
    setUserInput((prev) => ({ ...prev, weight }));
  };

  const handleHeightPresetClick = (preset: 'short' | 'average' | 'tall') => {
    const presets = getPresets();
    const value = presets.height[preset];
    handleHeightChange(value);
  };

  const handleWeightPresetClick = (preset: 'light' | 'average' | 'heavy') => {
    const presets = getPresets();
    const value = presets.weight[preset];
    handleWeightChange(value);
  };

  const handleCalculate = () => {
    try {
      const calculationResult = calculateSupBoard(userInput);
      setResult(calculationResult);
    } catch (error) {
      console.error('Calculation failed:', error);
      alert('Calculation failed. Please check your inputs.');
    }
  };

  const handleUnitSystemChange = (newSystem: UnitSystem) => {
    try {
      const config = getSupConfig();
      const factors = config.conversionFactors;

      // Convert existing values when switching unit systems
      let newHeight = userInput.height;
      let newWeight = userInput.weight;

      if (userInput.unitSystem !== newSystem) {
        if (newSystem === 'imperial') {
          // Convert from metric to imperial
          newHeight = Math.round(userInput.height / factors.cmToInches);
          newWeight = Math.round(userInput.weight * factors.kgToPounds);
        } else {
          // Convert from imperial to metric
          newHeight = Math.round(userInput.height * factors.cmToInches);
          newWeight = Math.round(userInput.weight / factors.kgToPounds);
        }
      }

      setUserInput((prev) => ({
        ...prev,
        unitSystem: newSystem,
        height: newHeight,
        weight: newWeight,
      }));
    } catch (error) {
      console.error('Unit conversion failed:', error);
      alert('Unit conversion failed.');
    }
  };

  const ranges = getRanges();
  const presets = getPresets();
  const boardTypes = getBoardTypes();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-slate-900 dark:via-blue-900 dark:to-teal-900">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-10">
        <ModeToggle />
      </div>

      <div className="container mx-auto px-4 py-8">
        <AppHeader />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InputForm
            userInput={userInput}
            boardTypes={boardTypes}
            ranges={ranges}
            presets={presets}
            formatHeight={formatHeight}
            formatWeight={formatWeight}
            onBoardTypeChange={handleBoardTypeChange}
            onUnitSystemChange={handleUnitSystemChange}
            onHeightChange={handleHeightChange}
            onWeightChange={handleWeightChange}
            onHeightPresetClick={handleHeightPresetClick}
            onWeightPresetClick={handleWeightPresetClick}
            onCalculate={handleCalculate}
          />

          {result && <BoardResults result={result} />}
        </div>

        <AppFooter />
      </div>
    </div>
  );
};

export default SupFinder;
