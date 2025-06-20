const ProTip = () => {
  return (
    <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800">
      <div className="flex items-start gap-2">
        <span className="text-lg">💡</span>
        <div>
          <div className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
            Pro Tip
          </div>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            These dimensions are guidelines. Consider your skill level, local
            conditions, and personal preferences when making your final choice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProTip;
