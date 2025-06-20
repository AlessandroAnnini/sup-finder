import type { BoardType } from '@/types';
import type { BoardTypeConfig } from '@/lib/config';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BoardTypeSelectorProps {
  value: BoardType;
  boardTypes: Record<string, BoardTypeConfig>;
  onChange: (value: BoardType) => void;
}

const BoardTypeSelector = ({
  value,
  boardTypes,
  onChange,
}: BoardTypeSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="boardType">Board Type</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(boardTypes).map(([key, info]) => (
            <SelectItem key={key} value={key}>
              <div className="flex items-center gap-2">
                <span>{info.icon}</span>
                <div className="flex flex-col">
                  <span>{info.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {info.description}
                  </span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default BoardTypeSelector;
