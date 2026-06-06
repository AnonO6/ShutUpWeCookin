export function ProgressDots({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className={`h-2 rounded-full transition-all duration-300 ${
            n === step
              ? "w-8 bg-coral"
              : n < step
                ? "w-2 bg-coral/50"
                : "w-2 bg-white"
          }`}
        />
      ))}
    </div>
  );
}
