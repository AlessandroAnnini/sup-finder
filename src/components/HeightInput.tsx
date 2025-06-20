import type { UnitSystem } from '@/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface HeightInputProps {
  value: number;
  unitSystem: UnitSystem;
  ranges: { min: number; max: number };
  presets: { short: number; average: number; tall: number };
  onChange: (value: number) => void;
  onPresetClick: (preset: 'short' | 'average' | 'tall') => void;
  formatHeight: (value: number) => string;
}

const HeightInput = ({
  value,
  ranges,
  presets,
  onChange,
  onPresetClick,
  formatHeight,
}: HeightInputProps) => {
  const handleSliderChange = (values: number[]) => {
    onChange(values[0]);
  };

  return (
    <div className="space-y-4">
      <Label>Height</Label>

      {/* Height Presets */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPresetClick('short')}
          className="flex-1">
          Short
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
          onClick={() => onPresetClick('tall')}
          className="flex-1">
          Tall
        </Button>
      </div>

      {/* Height Slider */}
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

      {/* Height Display */}
      <div className="text-center">
        <div className="text-2xl font-bold text-primary">
          {formatHeight(value)}
        </div>
      </div>
    </div>
  );
};

export default HeightInput;
