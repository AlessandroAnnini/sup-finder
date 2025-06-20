import type { UnitSystem } from '@/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface WeightInputProps {
  value: number;
  unitSystem: UnitSystem;
  ranges: { min: number; max: number };
  presets: { light: number; average: number; heavy: number };
  onChange: (value: number) => void;
  onPresetClick: (preset: 'light' | 'average' | 'heavy') => void;
  formatWeight: (value: number) => string;
}

const WeightInput = ({
  value,
  ranges,
  onChange,
  onPresetClick,
  formatWeight,
}: WeightInputProps) => {
  const handleSliderChange = (values: number[]) => {
    onChange(values[0]);
  };

  return (
    <div className="space-y-4">
      <Label>Weight</Label>

      {/* Weight Presets */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPresetClick('light')}
          className="flex-1">
          Light
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPresetClick('average')}
          className="flex-1">
          Average
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPresetClick('heavy')}
          className="flex-1">
          Heavy
        </Button>
      </div>

      {/* Weight Slider */}
      <div className="px-2">
        <Slider
          value={[value]}
          onValueChange={handleSliderChange}
          min={ranges.min}
          max={ranges.max}
          step={1}
          className="w-full"
        />
      </div>

      {/* Weight Display */}
      <div className="text-center">
        <div className="text-2xl font-bold text-primary">
          {formatWeight(value)}
        </div>
      </div>
    </div>
  );
};

export default WeightInput;
