import type { CalculationResult } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import DimensionsGrid from './DimensionsGrid';
import VolumeInfo from './VolumeInfo';
import ProTip from './ProTip';

interface BoardResultsProps {
  result: CalculationResult;
}

const BoardResults = ({ result }: BoardResultsProps) => {
  return (
    <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          🎯 Perfect Board Dimensions
        </CardTitle>
        <CardDescription>Your ideal SUP specifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <DimensionsGrid dimensions={result.dimensions} />
        <VolumeInfo volume={result.volume} explanation={result.explanation} />
        <ProTip />
      </CardContent>
    </Card>
  );
};

export default BoardResults;
