import type { BoardMaterial, BoardMaterialConfig } from '@/types';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BoardMaterialSelectorProps {
  value: BoardMaterial;
  boardMaterials: Record<string, BoardMaterialConfig>;
  onChange: (value: BoardMaterial) => void;
}

const BoardMaterialSelector = ({
  value,
  boardMaterials,
  onChange,
}: BoardMaterialSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="boardMaterial">Board Material</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(boardMaterials).map(([key, info]) => (
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

export default BoardMaterialSelector;
