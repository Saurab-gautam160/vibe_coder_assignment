import type { MouseEvent } from "react";

interface ShortlistButtonProps {
  isSelected: boolean;
  onToggle: (e: MouseEvent<HTMLButtonElement>) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: "px-3.5 py-2 text-xs gap-1.5",
  md: "px-4 py-2.5 text-sm gap-2",
  lg: "px-6 py-3 text-sm gap-2",
};

export function ShortlistButton({
  isSelected,
  onToggle,
  size = "md",
  className = "",
}: ShortlistButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isSelected}
      className={`inline-flex shrink-0 items-center justify-center rounded-xl font-semibold transition-all active:scale-95 ${sizeStyles[size]} ${
        isSelected
          ? "border border-rose-400/40 bg-rose-500/15 text-rose-200 hover:border-rose-400 hover:bg-rose-500 hover:text-white"
          : "border border-indigo-400/30 bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-400 hover:shadow-indigo-500/40"
      } ${className}`}
    >
      <span aria-hidden className="text-base leading-none">
        {isSelected ? "★" : "☆"}
      </span>
      {isSelected ? "Shortlisted" : "Shortlist"}
    </button>
  );
}
