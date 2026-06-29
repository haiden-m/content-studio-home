import svgPaths from "./svg-lo9hrvls48";

function TextAndSupportingText() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-baseline min-w-px relative" data-name="Text and supporting text">
      <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Add file or photos
      </p>
    </div>
  );
}

function Content() {
  return (
    <div className="bg-[#e6e5fc] flex-[1_0_0] min-w-px relative rounded-[8px]" data-name="Content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[10px] pr-[8px] py-[8px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="paperclip">
            <div className="absolute inset-[10.21%_11.86%_10.61%_13.23%]" data-name="Icon">
              <div className="absolute inset-[-5.26%_-5.56%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6483 17.5025">
                  <path d={svgPaths.p3e361a00} id="Icon" stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </svg>
              </div>
            </div>
          </div>
          <TextAndSupportingText />
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-baseline min-w-px relative" data-name="Text and supporting text">
      <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Add from Content Studio
      </p>
    </div>
  );
}

function Content1() {
  return (
    <div className="flex-[1_0_0] min-w-px relative rounded-[8px]" data-name="Content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[10px] pr-[8px] py-[8px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="folder">
            <div className="absolute inset-[12.5%_8.33%]" data-name="Icon">
              <div className="absolute inset-[-5.56%_-5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 16.6668">
                  <path d={svgPaths.p36235900} id="Icon" stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </svg>
              </div>
            </div>
          </div>
          <TextAndSupportingText1 />
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-baseline min-w-px relative" data-name="Text and supporting text">
      <p className="[word-break:break-word] font-['Roboto:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Add Brand Guidlines
      </p>
    </div>
  );
}

function Content2() {
  return (
    <div className="flex-[1_0_0] min-w-px relative rounded-[8px]" data-name="Content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center pl-[10px] pr-[8px] py-[8px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="line-height">
            <div className="absolute inset-[12.5%]" data-name="Icon">
              <div className="absolute inset-[-5.56%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
                  <path d={svgPaths.p4c76b80} id="Icon" stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </svg>
              </div>
            </div>
          </div>
          <TextAndSupportingText2 />
        </div>
      </div>
    </div>
  );
}

function MenuItems() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Menu items">
      <div className="relative shrink-0 w-full" data-name="_Command dropdown menu item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[8px] py-[2px] relative size-full">
            <Content />
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="_Command dropdown menu item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[8px] py-[2px] relative size-full">
            <Content1 />
          </div>
        </div>
      </div>
      <div className="relative shrink-0 w-full" data-name="_Command dropdown menu item">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[8px] py-[2px] relative size-full">
            <Content2 />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Menu() {
  return (
    <div className="bg-white relative rounded-[12px] size-full" data-name="Menu">
      <div className="content-stretch flex flex-col items-start max-w-[inherit] overflow-clip relative rounded-[inherit] size-full">
        <div className="relative shrink-0 w-full" data-name="_Command bar menu section">
          <div className="content-stretch flex flex-col gap-[2px] items-start overflow-clip py-[16px] relative rounded-[inherit] size-full">
            <MenuItems />
          </div>
          <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_0px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)]" />
    </div>
  );
}