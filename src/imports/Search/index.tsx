import { ChevronDown, Search } from "lucide-react";

function FilterBadges() {
  return (
    <div className="flex gap-2 items-center relative shrink-0" data-name="Container">
      {["All items", "All instances", "Date modified"].map((label) => (
        <div
          key={label}
          className="flex items-center gap-1 bg-[#f8f9fc] border border-[#d5d9eb] rounded-full pl-3 pr-2 py-1 shrink-0"
          data-name="Badge"
        >
          <span className="text-sm font-medium text-[#363f72] whitespace-nowrap">{label}</span>
          <ChevronDown size={10} color="#604DD0" />
        </div>
      ))}
    </div>
  );
}

function CreateToggle() {
  return (
    <div className="flex items-center gap-2 shrink-0" data-name="Toggle">
      <div className="bg-[#d0d5dd] flex h-5 items-center overflow-hidden p-0.5 rounded-full w-9" data-name="_Toggle base">
        <div className="bg-white rounded-full shadow-sm size-4 shrink-0" data-name="Button" />
      </div>
      <span className="text-sm font-medium text-[#344054]">Create</span>
    </div>
  );
}

type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <div
      className="bg-white rounded-xl border border-[#c3c3f7] shadow-[0px_4px_10px_0px_rgba(112,104,222,0.2)] overflow-hidden"
      data-name="Search"
    >
      <div className="px-4 pt-4 pb-3 border-b border-[#a4a3f3]/30">
        <div className="flex items-center gap-3 text-[#667085]">
          <Search size={18} strokeWidth={1.8} className="shrink-0" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search templates, content blocks and folders"
            className="flex-1 min-w-0 text-sm text-[#101828] placeholder:text-[#667085] bg-transparent focus:outline-none"
          />
        </div>
      </div>
      <div className="h-12 bg-[#e6e5fc] border-t border-[#a4a3f3]/50 px-4 flex items-center justify-between rounded-b-xl">
        <FilterBadges />
        <CreateToggle />
      </div>
    </div>
  );
}
