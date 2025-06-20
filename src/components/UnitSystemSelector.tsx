import type { UnitSystem } from '@/types';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface UnitSystemSelectorProps {
  value: UnitSystem;
  onChange: (value: UnitSystem) => void;
}

const UnitSystemSelector = ({ value, onChange }: UnitSystemSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="unitSystem">Unit System</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="metric">Metric (cm, kg)</SelectItem>
          <SelectItem value="imperial">Imperial (inches, lbs)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UnitSystemSelector;
