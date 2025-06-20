import type { BoardDimensions } from '@/types';

interface DimensionsGridProps {
  dimensions: BoardDimensions;
}

const DimensionsGrid = ({ dimensions }: DimensionsGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30">
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          {dimensions.length}
        </div>
        <div className="text-sm text-muted-foreground">Length</div>
      </div>
      <div className="text-center p-4 rounded-lg bg-teal-50 dark:bg-teal-900/30">
        <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
          {dimensions.width}
        </div>
        <div className="text-sm text-muted-foreground">Width</div>
      </div>
      <div className="text-center p-4 rounded-lg bg-cyan-50 dark:bg-cyan-900/30">
        <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
          {dimensions.thickness}
        </div>
        <div className="text-sm text-muted-foreground">Thickness</div>
      </div>
    </div>
  );
};

export default DimensionsGrid;
