interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <span className="text-slate-400">🔍</span>
      </div>
      <input
        type="text"
        className="
          w-full 
          bg-slate-900/60 
          backdrop-blur-md 
          border 
          border-slate-700 
          text-white 
          pl-11 
          pr-4 
          py-3 
          rounded-xl 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500/50 
          focus:border-blue-500 
          transition-all 
          duration-300 
          placeholder-slate-500 
          shadow-inner
        "
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search influencers..."
      />
    </div>
  );
}
