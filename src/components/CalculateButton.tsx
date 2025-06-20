import { Button } from '@/components/ui/button';

interface CalculateButtonProps {
  onClick: () => void;
}

const CalculateButton = ({ onClick }: CalculateButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
      size="lg">
      Find My Perfect SUP
    </Button>
  );
};

export default CalculateButton;
