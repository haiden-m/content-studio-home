import svgPaths from "./svg-lo9hrvls48";

const MENU_ITEMS = [
  {
    id: "file",
    label: "Add file or photos",
    path: svgPaths.p3e361a00,
    viewBox: "0 0 16.6483 17.5025",
    inset: "inset-[-5.26%_-5.56%]",
    iconInset: "inset-[10.21%_11.86%_10.61%_13.23%]",
  },
  {
    id: "content-studio",
    label: "Add from Content Studio",
    path: svgPaths.p36235900,
    viewBox: "0 0 18.3333 16.6668",
    inset: "inset-[-5.56%_-5%]",
    iconInset: "inset-[12.5%_8.33%]",
  },
  {
    id: "brand-guidelines",
    label: "Add Brand Guidlines",
    path: svgPaths.p4c76b80,
    viewBox: "0 0 16.6667 16.6667",
    inset: "inset-[-5.56%]",
    iconInset: "inset-[12.5%]",
  },
] as const;

type MenuProps = {
  onAddFile?: () => void;
};

function MenuIcon({ path, viewBox, inset, iconInset }: {
  path: string;
  viewBox: string;
  inset: string;
  iconInset: string;
}) {
  return (
    <div className="relative shrink-0 size-5">
      <div className={`absolute ${iconInset}`}>
        <div className={`absolute ${inset}`}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={viewBox}>
            <path d={path} stroke="#667085" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Menu({ onAddFile }: MenuProps) {
  return (
    <div
      className="bg-white rounded-xl border border-[#d0d5dd] shadow-[0px_0px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)] overflow-hidden"
      data-name="Menu"
    >
      <div className="flex flex-col gap-0.5 py-4">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={item.id === "file" ? onAddFile : undefined}
            className="w-full px-2 text-left"
          >
            <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-[#f2f4f7] transition-colors w-full">
              <MenuIcon path={item.path} viewBox={item.viewBox} inset={item.inset} iconInset={item.iconInset} />
              <span className="text-sm text-[#101828] whitespace-nowrap">{item.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
