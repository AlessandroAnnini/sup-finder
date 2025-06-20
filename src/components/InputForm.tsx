import type { UserInput, BoardType, UnitSystem } from '@/types';
import type { BoardTypeConfig } from '@/lib/config';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import BoardTypeSelector from './BoardTypeSelector';
import UnitSystemSelector from './UnitSystemSelector';
import HeightInput from './HeightInput';
import WeightInput from './WeightInput';
import CalculateButton from './CalculateButton';

interface InputFormProps {
  userInput: UserInput;
  boardTypes: Record<string, BoardTypeConfig>;
  ranges: {
    height: { min: number; max: number };
    weight: { min: number; max: number };
  };
  presets: {
    height: { short: number; average: number; tall: number };
    weight: { light: number; average: number; heavy: number };
  };
  formatHeight: (value: number) => string;
  formatWeight: (value: number) => string;
  onBoardTypeChange: (value: BoardType) => void;
  onUnitSystemChange: (value: UnitSystem) => void;
  onHeightChange: (value: number) => void;
  onWeightChange: (value: number) => void;
  onHeightPresetClick: (preset: 'short' | 'average' | 'tall') => void;
  onWeightPresetClick: (preset: 'light' | 'average' | 'heavy') => void;
  onCalculate: () => void;
}

const InputForm = ({
  userInput,
  boardTypes,
  ranges,
  presets,
  formatHeight,
  formatWeight,
  onBoardTypeChange,
  onUnitSystemChange,
  onHeightChange,
  onWeightChange,
  onHeightPresetClick,
  onWeightPresetClick,
  onCalculate,
}: InputFormProps) => {
  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Find Your Board</CardTitle>
        <CardDescription>
          Tell us about yourself and your paddling goals
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <BoardTypeSelector
          value={userInput.boardType}
          boardTypes={boardTypes}
          onChange={onBoardTypeChange}
        />

        <UnitSystemSelector
          value={userInput.unitSystem}
          onChange={onUnitSystemChange}
        />

        <HeightInput
          value={userInput.height}
          unitSystem={userInput.unitSystem}
          ranges={ranges.height}
          presets={presets.height}
          onChange={onHeightChange}
          onPresetClick={onHeightPresetClick}
          formatHeight={formatHeight}
        />

        <WeightInput
          value={userInput.weight}
          unitSystem={userInput.unitSystem}
          ranges={ranges.weight}
          presets={presets.weight}
          onChange={onWeightChange}
          onPresetClick={onWeightPresetClick}
          formatWeight={formatWeight}
        />

        <CalculateButton onClick={onCalculate} />
      </CardContent>
    </Card>
  );
};

export default InputForm;
