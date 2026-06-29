import svgPaths from "./svg-idiac7rqje";

function Container2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-w-px relative" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="search-md">
        <div className="absolute inset-[12.5%]" data-name="Icon">
          <div className="absolute inset-[-6.67%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
              <path d={svgPaths.p5b35d00} id="Icon" stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <div className="[word-break:break-word] flex flex-[1_0_0] flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] min-w-px relative text-[#667085] text-[14px]" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[20px]">Search templates, content blocks and folders</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-w-px py-[2px] relative" data-name="Container">
      <Container2 />
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex gap-[10px] items-start px-[16px] py-[12px] relative size-full">
        <Container1 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="bg-[#f8f9fc] content-stretch flex gap-[4px] items-center pl-[12px] pr-[10px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#d5d9eb] border-solid inset-0 pointer-events-none rounded-[9999px]" />
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#363f72] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          All items
        </p>
        <div className="overflow-clip relative shrink-0 size-[12px]" data-name="chevron-down">
          <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Icon">
            <div className="absolute inset-[-25%_-12.5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.5 4.5">
                <path d={svgPaths.p36c58480} id="Icon" stroke="var(--stroke-0, #604DD0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f8f9fc] content-stretch flex gap-[4px] items-center pl-[12px] pr-[10px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#d5d9eb] border-solid inset-0 pointer-events-none rounded-[9999px]" />
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#363f72] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          All instances
        </p>
        <div className="overflow-clip relative shrink-0 size-[12px]" data-name="chevron-down">
          <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Icon">
            <div className="absolute inset-[-25%_-12.5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.5 4.5">
                <path d={svgPaths.p36c58480} id="Icon" stroke="var(--stroke-0, #604DD0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f8f9fc] content-stretch flex gap-[4px] items-center pl-[12px] pr-[10px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Badge">
        <div aria-hidden className="absolute border border-[#d5d9eb] border-solid inset-0 pointer-events-none rounded-[9999px]" />
        <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#363f72] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Date modified
        </p>
        <div className="overflow-clip relative shrink-0 size-[12px]" data-name="chevron-down">
          <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Icon">
            <div className="absolute inset-[-25%_-12.5%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.5 4.5">
                <path d={svgPaths.p36c58480} id="Icon" stroke="var(--stroke-0, #604DD0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return <div className="bg-white relative rounded-[9999px] shadow-[0px_0px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] shrink-0 size-[16px]" data-name="Button" />;
}

function TextAndSupportingText() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Text and supporting text">
      <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#344054] text-[14px] w-full" style={{ fontVariationSettings: '"wdth" 100' }}>
        Create
      </p>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#e6e5fc] h-[48px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border-[#a4a3f3] border-solid border-t-[0.5px] inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[12px] relative size-full">
          <Container4 />
          <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-[93px]" data-name="Toggle">
            <div className="bg-[#d0d5dd] content-stretch flex h-[20px] items-center overflow-clip p-[2px] relative rounded-[9999px] shrink-0 w-[36px]" data-name="_Toggle base">
              <Button />
            </div>
            <TextAndSupportingText />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Search() {
  return (
    <div className="relative rounded-[12px] size-full" data-name="Search">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Container />
        <Container3 />
      </div>
      <div aria-hidden className="absolute border border-[#a4a3f3] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_4px_10px_0px_rgba(112,104,222,0.2)]" />
    </div>
  );
}