interface VolumeInfoProps {
  volume: number;
  explanation: string;
}

const VolumeInfo = ({ volume, explanation }: VolumeInfoProps) => {
  return (
    <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/30 dark:to-teal-900/30">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">💧</span>
        <span className="font-semibold">Volume: {volume}L</span>
      </div>
      <p className="text-sm text-muted-foreground">{explanation}</p>
    </div>
  );
};

export default VolumeInfo;
