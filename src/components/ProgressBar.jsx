export default function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full px-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-mono text-[#1A1A1A]/60">
          {current} / {total}
        </span>
        <span className="text-sm font-mono text-[#1A1A1A]/40">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full h-1 bg-[#1A1A1A]/10 overflow-hidden">
        <div
          className="h-full bg-[#1A1A1A] transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
