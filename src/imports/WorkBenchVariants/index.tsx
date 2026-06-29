import svgPaths from "./svg-zqf0ptuya6";

function Container2() {
  return (
    <div className="content-stretch flex gap-[4px] h-[40px] items-center relative shrink-0 w-[72px]" data-name="Container">
      <div aria-hidden className="absolute border-[#d0d5dd] border-r border-solid inset-0 pointer-events-none" />
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="flip-backward">
        <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-[20.83%]" data-name="Icon">
          <div className="absolute inset-[-7.69%_-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 15">
              <path d={svgPaths.p33b45000} id="Icon" stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="flip-forward">
        <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-[20.83%]" data-name="Icon">
          <div className="absolute inset-[-7.69%_-5.56%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 15">
              <path d={svgPaths.p2c4623c0} id="Icon" stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0" data-name="Container">
      <Container2 />
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="folder">
        <div className="absolute inset-[12.5%_8.33%]" data-name="Icon">
          <div className="absolute inset-[-5.56%_-5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 20.0002">
              <path d={svgPaths.p23e75200} id="Icon" stroke="var(--stroke-0, #604DD0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-name="Content">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[24px] min-w-px overflow-hidden relative text-[#101828] text-[16px] text-ellipsis whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Champions-league-weekend2026
      </p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white flex-[1_0_0] min-w-px relative rounded-[8px]" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[12px] py-[8px] relative size-full">
          <Content />
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[271px]" data-name="Container">
      <Input />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-[710px]" data-name="Container">
      <Container4 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-[846px]" data-name="Container">
      <Container1 />
      <Container3 />
    </div>
  );
}

function TextPadding() {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] relative shrink-0" data-name="Text padding">
      <p className="[word-break:break-word] font-['Roboto:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#344054] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Run Campaign
      </p>
    </div>
  );
}

function TextPadding1() {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] relative shrink-0" data-name="Text padding">
      <p className="[word-break:break-word] font-['Roboto:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#344054] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Validate
      </p>
    </div>
  );
}

function TextPadding2() {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] relative shrink-0" data-name="Text padding">
      <p className="[word-break:break-word] font-['Roboto:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#344054] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Back
      </p>
    </div>
  );
}

function TextPadding3() {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] relative shrink-0" data-name="Text padding">
      <p className="[word-break:break-word] font-['Roboto:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[14px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Save
      </p>
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center justify-end min-w-px relative" data-name="Actions">
      <div className="bg-white relative rounded-[8px] shrink-0" data-name="Button">
        <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[14px] py-[10px] relative rounded-[inherit] size-full">
          <TextPadding />
        </div>
        <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
      </div>
      <div className="bg-white relative rounded-[8px] shrink-0" data-name="Button">
        <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[14px] py-[10px] relative rounded-[inherit] size-full">
          <TextPadding1 />
        </div>
        <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
      </div>
      <div className="bg-white relative rounded-[8px] shrink-0" data-name="Button">
        <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[14px] py-[10px] relative rounded-[inherit] size-full">
          <TextPadding2 />
        </div>
        <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
      </div>
      <div className="bg-[#7068de] relative rounded-[8px] shrink-0" data-name="Button">
        <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[14px] py-[10px] relative rounded-[inherit] size-full">
          <TextPadding3 />
        </div>
        <div aria-hidden className="absolute border border-[#7068de] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[20px] items-center justify-end min-w-px relative" data-name="Content">
      <Actions />
    </div>
  );
}

function Frame1() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[30px] items-start leading-[0] not-italic relative shrink-0 text-[#90a4ae] text-[22px] text-center whitespace-nowrap">
      <div className="flex flex-col font-['Material_Icons:Regular',sans-serif] justify-center relative shrink-0">
        <p className="leading-[16px]" dir="auto">
          school
        </p>
      </div>
      <div className="flex flex-col font-['Ofont:Regular',sans-serif] justify-center relative shrink-0">
        <p className="leading-[16px]" dir="auto">{`\uE921`}</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[10px] isolate items-center justify-end leading-[0] relative shrink-0 text-[#90a4ae] text-right whitespace-nowrap">
      <div className="flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center relative shrink-0 text-[12px] z-[2]" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[16px]" dir="auto">
          Khumbira Kasambala
        </p>
      </div>
      <div className="flex flex-col font-['Material_Icons:Regular',sans-serif] justify-center not-italic relative shrink-0 text-[22px] z-[1]">
        <p className="leading-[16px]">keyboard_arrow_down</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex gap-[20px] items-center justify-end right-[78px] top-1/2">
      <Frame1 />
      <div className="bg-[#eceff1] h-[28px] relative shrink-0 w-px" />
      <Frame />
    </div>
  );
}

function Group() {
  return (
    <div className="-translate-y-1/2 absolute contents right-[20px] top-1/2">
      <div className="-translate-y-1/2 absolute right-[20px] size-[38px] top-1/2">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 38">
          <circle cx="19" cy="19" fill="var(--fill-0, #13AAAF)" id="Ellipse 98" r="19" />
        </svg>
      </div>
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] right-[37.5px] text-[18px] text-center text-white top-1/2 translate-x-1/2 whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        <p className="leading-[18px]" dir="auto">
          KK
        </p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0" data-name="Button">
      <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[14px] py-[10px] relative rounded-[inherit] size-full">
        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="maximize-01">
          <div className="absolute inset-[12.5%]" data-name="Icon">
            <div className="absolute inset-[-6.67%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
                <path d={svgPaths.p270b500} id="Icon" stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0" data-name="Container">
      <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="Button">
        <p className="[word-break:break-word] font-['Roboto:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#475467] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Convert to HTML
        </p>
      </div>
      <Button />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bg-white content-stretch flex h-[60px] items-center justify-between left-[66px] px-[16px] py-[8px] top-[142px] w-[1373px]" data-name="Container">
      <div aria-hidden className="absolute border-[#d0d5dd] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0 w-[305px]" data-name="Horizontal tabs">
        <div className="flex-[1_0_0] h-[44px] min-w-px relative rounded-[6px]" data-name="_Tab button base">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center justify-center px-[12px] py-[8px] relative size-full">
              <p className="[word-break:break-word] font-['Roboto:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#667085] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                Content
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#e6e5fc] content-stretch flex h-[44px] items-center justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="_Tab button base">
          <p className="[word-break:break-word] font-['Roboto:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#667085] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            Workbench
          </p>
        </div>
        <div className="flex-[1_0_0] h-[44px] min-w-px relative rounded-[6px]" data-name="_Tab button base">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center justify-center px-[12px] py-[8px] relative size-full">
              <p className="[word-break:break-word] font-['Roboto:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#667085] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                Preview
              </p>
            </div>
          </div>
        </div>
      </div>
      <Container6 />
    </div>
  );
}

function HorizontalTabs() {
  return (
    <div className="bg-[#f9fafb] relative rounded-[12px] shrink-0 w-full" data-name="Horizontal tabs">
      <div aria-hidden className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center p-[6px] relative size-full">
          <div className="bg-white content-stretch flex gap-[8px] h-[44px] items-center justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shadow-[0px_0px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)] shrink-0" data-name="_Tab button base">
            <p className="[word-break:break-word] font-['Roboto:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#344054] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Variants
            </p>
          </div>
          <div className="content-stretch flex gap-[8px] h-[44px] items-center justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="_Tab button base">
            <p className="[word-break:break-word] font-['Roboto:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#667085] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Data Connections
            </p>
          </div>
          <div className="-translate-y-1/2 absolute content-stretch flex gap-[8px] h-[44px] items-center justify-center overflow-clip px-[12px] py-[8px] right-[10px] rounded-[6px] top-1/2" data-name="_Tab button base">
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="code-snippet-02">
              <div className="absolute inset-[12.5%_8.33%]" data-name="Icon">
                <div className="absolute inset-[-6.67%_-6%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.6667 17.0004">
                    <path d={svgPaths.p6a8ec00} id="Icon" stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Roboto:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#667085] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Code Editor
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TextAndSupportingText() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-w-px relative self-stretch" data-name="Text and supporting text">
      <p className="font-['Roboto:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#101828] text-[16px] w-full" style={{ fontVariationSettings: '"wdth" 100' }}>
        Variants
      </p>
      <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[20px] overflow-hidden relative shrink-0 text-[#475467] text-[14px] text-ellipsis w-full whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Create multiple variations of your content to test different approaches
      </p>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex gap-[16px] h-[52px] items-start relative shrink-0 w-full z-[1]" data-name="Content">
      <TextAndSupportingText />
    </div>
  );
}

function HeaderContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[56px] items-start justify-end relative shrink-0 w-full" data-name="Header Container">
      <div className="absolute content-stretch flex flex-col isolate items-start left-0 pb-[8px] top-0 w-[836px]" data-name="Section header">
        <Content2 />
      </div>
      <div className="h-px relative shrink-0 w-full" data-name="Divider">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1301 1">
          <path clipRule="evenodd" d="M1301 1H0V0H1301V1Z" fill="var(--fill-0, #EAECF0)" fillRule="evenodd" id="Divider" />
        </svg>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[12px] relative size-full">
        <HeaderContainer />
      </div>
    </div>
  );
}

function TableCell() {
  return (
    <div className="h-[212px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[16px] relative size-full">
          <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            Variant 1
          </p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="trash-01">
            <div className="absolute inset-[8.33%_12.5%]" data-name="Icon">
              <div className="absolute inset-[-4.99%_-5.54%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.33 14.6633">
                  <path d={svgPaths.p4e55f00} id="Icon" stroke="var(--stroke-0, #475467)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="h-[212px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[16px] relative size-full">
          <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            Variant 2
          </p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="trash-01">
            <div className="absolute inset-[8.33%_12.5%]" data-name="Icon">
              <div className="absolute inset-[-4.99%_-5.54%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.33 14.6633">
                  <path d={svgPaths.p4e55f00} id="Icon" stroke="var(--stroke-0, #475467)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="h-[212px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[16px] relative size-full">
          <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            Variant 3
          </p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="trash-01">
            <div className="absolute inset-[8.33%_12.5%]" data-name="Icon">
              <div className="absolute inset-[-4.99%_-5.54%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.33 14.6633">
                  <path d={svgPaths.p4e55f00} id="Icon" stroke="var(--stroke-0, #475467)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="h-[212px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[16px] relative size-full">
          <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
            Variant 4
          </p>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="trash-01">
            <div className="absolute inset-[8.33%_12.5%]" data-name="Icon">
              <div className="absolute inset-[-4.99%_-5.54%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.33 14.6633">
                  <path d={svgPaths.p4e55f00} id="Icon" stroke="var(--stroke-0, #475467)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[160px]" data-name="Column">
      <div className="bg-[#f9fafb] h-[44px] relative shrink-0 w-full" data-name="Table header cell">
        <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[24px] py-[12px] relative size-full">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Table header">
              <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[18px] relative shrink-0 text-[#475467] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                Component
              </p>
            </div>
          </div>
        </div>
      </div>
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
    </div>
  );
}

function TableHeaderCell() {
  return (
    <div className="bg-[#f9fafb] h-[44px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[12px] relative size-full">
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Table header">
            <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[18px] relative shrink-0 text-[#475467] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Subject Line
            </p>
          </div>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="trash-01">
            <div className="absolute inset-[8.33%_12.5%]" data-name="Icon">
              <div className="absolute inset-[-4.99%_-5.54%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.33 14.6633">
                  <path d={svgPaths.p4e55f00} id="Icon" stroke="var(--stroke-0, #475467)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px relative rounded-[8px] w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[14px] py-[12px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal h-full leading-[24px] min-w-px relative text-[#667085] text-[16px] text-left" style={{ fontVariationSettings: '"wdth" 100' }}>
            Enter subject line...
          </p>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px relative w-full" data-name="Input with label">
      <Input1 />
    </div>
  );
}

function TableCell4() {
  return (
    <div className="h-[212px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[12px] items-start px-[24px] py-[16px] relative size-full">
        <button className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px relative w-full" data-name="Textarea input field">
          <InputWithLabel />
        </button>
        <div className="absolute bottom-[27px] overflow-clip right-[34.67px] size-[20px]" data-name="personalization_icon">
          <div className="absolute inset-[20.83%_8.75%_6.25%_8.33%]" data-name="Icon">
            <div className="absolute inset-[-5.14%_-4.52%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0833 16.0833">
                <path d={svgPaths.p333a1f0} id="Icon" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px relative rounded-[8px] w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[14px] py-[12px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal h-full leading-[24px] min-w-px relative text-[#667085] text-[16px] text-left" style={{ fontVariationSettings: '"wdth" 100' }}>
            Enter subject line...
          </p>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px relative w-full" data-name="Input with label">
      <Input2 />
    </div>
  );
}

function TableCell5() {
  return (
    <div className="h-[212px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[12px] items-start px-[24px] py-[16px] relative size-full">
        <button className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px relative w-full" data-name="Textarea input field">
          <InputWithLabel1 />
        </button>
        <div className="absolute bottom-[27px] overflow-clip right-[34.67px] size-[20px]" data-name="personalization_icon">
          <div className="absolute inset-[20.83%_8.75%_6.25%_8.33%]" data-name="Icon">
            <div className="absolute inset-[-5.14%_-4.52%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0833 16.0833">
                <path d={svgPaths.p333a1f0} id="Icon" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px relative rounded-[8px] w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[14px] py-[12px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal h-full leading-[24px] min-w-px relative text-[#667085] text-[16px] text-left" style={{ fontVariationSettings: '"wdth" 100' }}>
            Enter subject line...
          </p>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px relative w-full" data-name="Input with label">
      <Input3 />
    </div>
  );
}

function TableCell6() {
  return (
    <div className="h-[212px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[12px] items-start px-[24px] py-[16px] relative size-full">
        <button className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px relative w-full" data-name="Textarea input field">
          <InputWithLabel2 />
        </button>
        <div className="absolute bottom-[28px] overflow-clip right-[34.67px] size-[20px]" data-name="personalization_icon">
          <div className="absolute inset-[20.83%_8.75%_6.25%_8.33%]" data-name="Icon">
            <div className="absolute inset-[-5.14%_-4.52%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0833 16.0833">
                <path d={svgPaths.p333a1f0} id="Icon" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px relative rounded-[8px] w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[14px] py-[12px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal h-full leading-[24px] min-w-px relative text-[#667085] text-[16px] text-left" style={{ fontVariationSettings: '"wdth" 100' }}>
            Enter subject line...
          </p>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px relative w-full" data-name="Input with label">
      <Input4 />
    </div>
  );
}

function TableCell7() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[212px] items-start px-[24px] py-[16px] relative shrink-0" data-name="Table cell">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <button className="content-stretch cursor-pointer flex flex-col gap-[6px] h-[180px] items-start relative shrink-0 w-[325.667px]" data-name="Textarea input field">
        <InputWithLabel3 />
      </button>
      <div className="absolute bottom-[28px] overflow-clip right-[34.67px] size-[20px]" data-name="personalization_icon">
        <div className="absolute inset-[20.83%_8.75%_6.25%_8.33%]" data-name="Icon">
          <div className="absolute inset-[-5.14%_-4.52%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0833 16.0833">
              <path d={svgPaths.p333a1f0} id="Icon" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Column">
      <TableHeaderCell />
      <TableCell4 />
      <TableCell5 />
      <TableCell6 />
      <TableCell7 />
    </div>
  );
}

function TableHeaderCell1() {
  return (
    <div className="bg-[#f9fafb] h-[44px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[12px] relative size-full">
          <div className="content-stretch flex items-center relative shrink-0" data-name="Table header">
            <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[18px] relative shrink-0 text-[#475467] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Preview Text
            </p>
          </div>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="trash-01">
            <div className="absolute inset-[8.33%_12.5%]" data-name="Icon">
              <div className="absolute inset-[-4.99%_-5.54%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.33 14.6633">
                  <path d={svgPaths.p4e55f00} id="Icon" stroke="var(--stroke-0, #475467)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input5() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px relative rounded-[8px] w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[14px] py-[12px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal h-full leading-[24px] min-w-px relative text-[#667085] text-[16px] text-left" style={{ fontVariationSettings: '"wdth" 100' }}>
            Enter preview text...
          </p>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px relative w-full" data-name="Input with label">
      <Input5 />
    </div>
  );
}

function TableCell8() {
  return (
    <div className="h-[212px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[12px] items-start px-[24px] py-[16px] relative size-full">
        <button className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px relative w-full" data-name="Textarea input field">
          <InputWithLabel4 />
        </button>
        <div className="absolute bottom-[27px] overflow-clip right-[34.67px] size-[20px]" data-name="personalization_icon">
          <div className="absolute inset-[20.83%_8.75%_6.25%_8.33%]" data-name="Icon">
            <div className="absolute inset-[-5.14%_-4.52%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0833 16.0833">
                <path d={svgPaths.p333a1f0} id="Icon" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input6() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px relative rounded-[8px] w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[14px] py-[12px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal h-full leading-[24px] min-w-px relative text-[#667085] text-[16px] text-left" style={{ fontVariationSettings: '"wdth" 100' }}>
            Enter preview text...
          </p>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px relative w-full" data-name="Input with label">
      <Input6 />
    </div>
  );
}

function TableCell9() {
  return (
    <div className="h-[212px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[12px] items-start px-[24px] py-[16px] relative size-full">
        <button className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px relative w-full" data-name="Textarea input field">
          <InputWithLabel5 />
        </button>
        <div className="absolute bottom-[27px] overflow-clip right-[34.67px] size-[20px]" data-name="personalization_icon">
          <div className="absolute inset-[20.83%_8.75%_6.25%_8.33%]" data-name="Icon">
            <div className="absolute inset-[-5.14%_-4.52%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0833 16.0833">
                <path d={svgPaths.p333a1f0} id="Icon" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input7() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px relative rounded-[8px] w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[14px] py-[12px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal h-full leading-[24px] min-w-px relative text-[#667085] text-[16px] text-left" style={{ fontVariationSettings: '"wdth" 100' }}>
            Enter preview text...
          </p>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px relative w-full" data-name="Input with label">
      <Input7 />
    </div>
  );
}

function TableCell10() {
  return (
    <div className="h-[212px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[12px] items-start px-[24px] py-[16px] relative size-full">
        <button className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px relative w-full" data-name="Textarea input field">
          <InputWithLabel6 />
        </button>
        <div className="absolute bottom-[28px] overflow-clip right-[34.92px] size-[20px]" data-name="personalization_icon">
          <div className="absolute inset-[20.83%_8.75%_6.25%_8.33%]" data-name="Icon">
            <div className="absolute inset-[-5.14%_-4.52%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0833 16.0833">
                <path d={svgPaths.p333a1f0} id="Icon" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input8() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px relative rounded-[8px] w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[14px] py-[12px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal h-full leading-[24px] min-w-px relative text-[#667085] text-[16px] text-left" style={{ fontVariationSettings: '"wdth" 100' }}>
            Enter preview text...
          </p>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px relative w-full" data-name="Input with label">
      <Input8 />
    </div>
  );
}

function TableCell11() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[212px] items-start px-[24px] py-[16px] relative shrink-0" data-name="Table cell">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <button className="content-stretch cursor-pointer flex flex-col gap-[6px] h-[180px] items-start relative shrink-0 w-[325.667px]" data-name="Textarea input field">
        <InputWithLabel7 />
      </button>
      <div className="absolute bottom-[28px] overflow-clip right-[34.92px] size-[20px]" data-name="personalization_icon">
        <div className="absolute inset-[20.83%_8.75%_6.25%_8.33%]" data-name="Icon">
          <div className="absolute inset-[-5.14%_-4.52%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0833 16.0833">
              <path d={svgPaths.p333a1f0} id="Icon" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Column">
      <TableHeaderCell1 />
      <TableCell8 />
      <TableCell9 />
      <TableCell10 />
      <TableCell11 />
    </div>
  );
}

function TableHeaderCell2() {
  return (
    <div className="bg-[#f9fafb] h-[44px] relative shrink-0 w-full" data-name="Table header cell">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between px-[24px] py-[12px] relative size-full">
          <div className="content-stretch flex items-center relative shrink-0" data-name="Table header">
            <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[18px] relative shrink-0 text-[#475467] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Bet Amount Intro
            </p>
          </div>
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="trash-01">
            <div className="absolute inset-[8.33%_12.5%]" data-name="Icon">
              <div className="absolute inset-[-4.99%_-5.54%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.33 14.6633">
                  <path d={svgPaths.p4e55f00} id="Icon" stroke="var(--stroke-0, #475467)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input9() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px relative rounded-[8px] w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[14px] py-[12px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal h-full leading-[24px] min-w-px relative text-[#667085] text-[16px] text-left" style={{ fontVariationSettings: '"wdth" 100' }}>
            Enter body content...
          </p>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px relative w-full" data-name="Input with label">
      <Input9 />
    </div>
  );
}

function TableCell12() {
  return (
    <div className="h-[212px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start justify-center px-[24px] py-[16px] relative size-full">
          <button className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px relative w-full" data-name="Textarea input field">
            <InputWithLabel8 />
          </button>
          <div className="absolute bottom-[27px] overflow-clip right-[34.67px] size-[20px]" data-name="personalization_icon">
            <div className="absolute inset-[20.83%_8.75%_6.25%_8.33%]" data-name="Icon">
              <div className="absolute inset-[-5.14%_-4.52%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0833 16.0833">
                  <path d={svgPaths.p333a1f0} id="Icon" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input10() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px relative rounded-[8px] w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[14px] py-[12px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal h-full leading-[24px] min-w-px relative text-[#667085] text-[16px] text-left" style={{ fontVariationSettings: '"wdth" 100' }}>
            Enter body content...
          </p>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px relative w-full" data-name="Input with label">
      <Input10 />
    </div>
  );
}

function TableCell13() {
  return (
    <div className="h-[212px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start justify-center px-[24px] py-[16px] relative size-full">
          <button className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px relative w-full" data-name="Textarea input field">
            <InputWithLabel9 />
          </button>
          <div className="absolute bottom-[27px] overflow-clip right-[34.67px] size-[20px]" data-name="personalization_icon">
            <div className="absolute inset-[20.83%_8.75%_6.25%_8.33%]" data-name="Icon">
              <div className="absolute inset-[-5.14%_-4.52%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0833 16.0833">
                  <path d={svgPaths.p333a1f0} id="Icon" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input11() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px relative rounded-[8px] w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[14px] py-[12px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal h-full leading-[24px] min-w-px relative text-[#667085] text-[16px] text-left" style={{ fontVariationSettings: '"wdth" 100' }}>
            Enter body content...
          </p>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px relative w-full" data-name="Input with label">
      <Input11 />
    </div>
  );
}

function TableCell14() {
  return (
    <div className="h-[212px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start justify-center px-[24px] py-[16px] relative size-full">
          <button className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px relative w-full" data-name="Textarea input field">
            <InputWithLabel10 />
          </button>
          <div className="absolute bottom-[29px] overflow-clip right-[34.17px] size-[20px]" data-name="personalization_icon">
            <div className="absolute inset-[20.83%_8.75%_6.25%_8.33%]" data-name="Icon">
              <div className="absolute inset-[-5.14%_-4.52%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0833 16.0833">
                  <path d={svgPaths.p333a1f0} id="Icon" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input12() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px relative rounded-[8px] w-full" data-name="Input">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start px-[14px] py-[12px] relative size-full">
          <p className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal h-full leading-[24px] min-w-px relative text-[#667085] text-[16px] text-left" style={{ fontVariationSettings: '"wdth" 100' }}>
            Enter body content...
          </p>
        </div>
      </div>
      <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
    </div>
  );
}

function InputWithLabel11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px relative w-full" data-name="Input with label">
      <Input12 />
    </div>
  );
}

function TableCell15() {
  return (
    <div className="h-[212px] relative shrink-0 w-full" data-name="Table cell">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start justify-center px-[24px] py-[16px] relative size-full">
          <button className="content-stretch cursor-pointer flex flex-[1_0_0] flex-col gap-[6px] items-start min-h-px relative w-full" data-name="Textarea input field">
            <InputWithLabel11 />
          </button>
          <div className="absolute bottom-[29px] overflow-clip right-[34.17px] size-[20px]" data-name="personalization_icon">
            <div className="absolute inset-[20.83%_8.75%_6.25%_8.33%]" data-name="Icon">
              <div className="absolute inset-[-5.14%_-4.52%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0833 16.0833">
                  <path d={svgPaths.p333a1f0} id="Icon" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Column3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative" data-name="Column">
      <TableHeaderCell2 />
      <TableCell12 />
      <TableCell13 />
      <TableCell14 />
      <TableCell15 />
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Content">
      <Column />
      <Column1 />
      <Column2 />
      <Column3 />
    </div>
  );
}

function Table() {
  return (
    <div className="bg-white flex-[1_0_0] h-full min-w-px relative rounded-[12px]" data-name="Table">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Content3 />
      </div>
      <div aria-hidden className="absolute border border-[#eaecf0] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Table />
      </div>
      <div className="flex h-[99px] items-center justify-center relative shrink-0 w-[20px]">
        <div className="-rotate-90 flex-none">
          <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative" data-name="+ Add component">
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="plus">
              <div className="absolute inset-[20.83%]" data-name="Icon">
                <div className="absolute inset-[-7.14%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
                    <path d={svgPaths.p1b67fa00} id="Icon" stroke="var(--stroke-0, #475467)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Roboto:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#475467] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Component
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[12px] pr-[40px] py-[8px] relative size-full">
          <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="+ Add component">
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="plus">
              <div className="absolute inset-[20.83%]" data-name="Icon">
                <div className="absolute inset-[-7.14%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
                    <path d={svgPaths.p1b67fa00} id="Icon" stroke="var(--stroke-0, #475467)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Roboto:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#475467] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Variant
            </p>
          </div>
          <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="+ Add component">
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="star-06">
              <div className="absolute inset-[8.33%]" data-name="Icon">
                <div className="absolute inset-[-5%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 18.3333">
                    <path d={svgPaths.pf462980} id="Icon" stroke="var(--stroke-0, #98A2B3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Roboto:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#98a2b3] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
              Generate AI variants
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function TextPadding4() {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] relative shrink-0" data-name="Text padding">
      <p className="[word-break:break-word] font-['Roboto:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#604dd0] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Experiment
      </p>
    </div>
  );
}

function Actions1() {
  return (
    <div className="content-stretch flex gap-[12px] items-end relative shrink-0 w-full" data-name="Actions">
      <div className="bg-white relative rounded-[8px] shrink-0" data-name="+ Add component">
        <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[12px] py-[8px] relative rounded-[inherit] size-full">
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="plus">
            <div className="absolute inset-[20.83%]" data-name="Icon">
              <div className="absolute inset-[-7.14%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
                  <path d={svgPaths.p1b67fa00} id="Icon" stroke="var(--stroke-0, #604DD0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </svg>
              </div>
            </div>
          </div>
          <TextPadding4 />
        </div>
        <div aria-hidden className="absolute border border-[#a4a3f3] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
      </div>
    </div>
  );
}

function WorkBenchContent() {
  return (
    <div className="bg-white flex-[1_0_0] h-[1248px] min-w-px relative" data-name="Work Bench Content">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[24px] items-start p-[24px] relative size-full">
          <HorizontalTabs />
          <Container8 />
          <Container9 />
          <Actions1 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex h-[1248px] items-start left-[66px] top-[203px] w-[1373px]" data-name="Container">
      <WorkBenchContent />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[0_-18.18%]" style={{ containerType: "size" }}>
      <div className="absolute flex inset-[0_18.18%_0_-18.18%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[100cqh] rotate-180 w-[100cqw]">
          <div className="[word-break:break-word] flex flex-col font-['Material_Icons:Regular',sans-serif] justify-center leading-[0] not-italic relative size-full text-[22px] text-right text-white">
            <p className="leading-[16px]">chevron_left</p>
          </div>
        </div>
      </div>
      <div className="absolute flex inset-[0_-18.18%_0_18.18%] items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[100cqh] rotate-180 w-[100cqw]">
          <div className="[word-break:break-word] flex flex-col font-['Material_Icons:Regular',sans-serif] justify-center leading-[0] not-italic relative size-full text-[22px] text-right text-white">
            <p className="leading-[16px]">chevron_left</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute bottom-[14px] content-stretch flex items-center justify-end right-[8px] top-[14px]">
      <div className="bg-[#dff670] content-stretch flex h-[12px] items-center justify-center overflow-clip pb-px px-[4px] relative rounded-[12px] shrink-0" data-name="Menu Icons/ Badge/ Counter">
        <div className="[word-break:break-word] flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#46398c] text-[9px] text-right whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          <p className="leading-[normal]" dir="auto">
            + 9
          </p>
        </div>
      </div>
    </div>
  );
}

function MenuCageroies() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-[108px]" data-name="Menu Cageroies">
      <div className="bg-[#46398c] h-[56px] overflow-clip relative shrink-0 w-[66px]" data-name="Menu Item New">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[16px] top-1/2" data-name="Menu Icon.Level 2">
          <div className="absolute inset-[0_-0.02%_-0.02%_0]" data-name="Union 8">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.0034 16.0035">
              <path d={svgPaths.p34170000} fill="var(--fill-0, #CDD5DF)" id="Union 8" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#46398c] h-[56px] overflow-clip relative shrink-0 w-[66px]" data-name="Menu Item New">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[16px] top-1/2" data-name="Menu Icon.Level 2">
          <div className="absolute inset-[0_0_9.08%_0]" data-name="monitor-dashboard">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 14.547">
              <path d={svgPaths.pc5f6440} fill="var(--fill-0, #CDD5DF)" id="monitor-dashboard" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#46398c] h-[56px] overflow-clip relative shrink-0 w-[66px]" data-name="Menu Item New">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[16px] top-1/2" data-name="Menu Icon.Level 2">
          <div className="absolute inset-[0_-5.16%_0_0]" data-name="account-search">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.826 16">
              <path d={svgPaths.p11b0c600} fill="var(--fill-0, #CDD5DF)" id="account-search" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#342f62] h-[56px] overflow-clip relative shrink-0 w-[66px]" data-name="Menu Item New">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[16px] top-1/2" data-name="Menu Icon.Level 2">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path d={svgPaths.p2ab60f00} fill="var(--fill-0, white)" id="Path 405" />
          </svg>
        </div>
        <div className="absolute bg-[#dff670] bottom-0 left-0 top-0 w-[5px]" data-name="Selected Indication" />
      </div>
      <div className="bg-[#46398c] h-[56px] overflow-clip relative shrink-0 w-[66px]" data-name="Menu Item New">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[16px] top-1/2" data-name="Menu Icon.Level 2">
          <div className="absolute inset-[0_0_-0.01%_0.02%]" data-name="Path 406">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.996 16.0016">
              <path d={svgPaths.p36a37700} fill="var(--fill-0, #CDD5DF)" id="Path 406" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#46398c] h-[56px] overflow-clip relative shrink-0 w-[66px]" data-name="Menu Item New">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[16px] top-1/2" data-name="Menu Icon.Level 2">
          <div className="absolute inset-[0_0.02%_0.02%_0]" data-name="Path 407">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9972 15.9967">
              <path d={svgPaths.p27272bb0} fill="var(--fill-0, #CDD5DF)" id="Path 407" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#46398c] h-[56px] overflow-clip relative shrink-0 w-[66px]" data-name="Menu Item New">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[16px] top-1/2" data-name="Menu Icon.Level 2">
          <div className="absolute inset-[0_0.02%_-0.03%_0]" data-name="database-cog-outline">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9961 16.005">
              <path d={svgPaths.p1447100} fill="var(--fill-0, #CDD5DF)" id="database-cog-outline" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-[#46398c] h-[56px] overflow-clip relative shrink-0 w-[66px]" data-name="Menu Item New">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[16px] top-1/2" data-name="Menu Icons/ Optibot">
          <div className="-translate-x-1/2 absolute bottom-[-0.01%] left-1/2 top-0 w-[11.195px]" data-name="Path 408">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.1953 16.0011">
              <path d={svgPaths.p293c2300} fill="var(--fill-0, #CDD5DF)" id="Path 408" />
            </svg>
          </div>
        </div>
        <Frame3 />
      </div>
    </div>
  );
}

export default function WorkBenchVariants() {
  return (
    <div className="bg-[#eaecf0] relative size-full" data-name="Work Bench - Variants">
      <div className="absolute bg-white content-stretch flex gap-[42px] h-[82px] items-center left-[66px] p-[16px] top-[60px] w-[1374px]" data-name="Content">
        <div aria-hidden className="absolute border-[#d0d5dd] border-b border-solid inset-0 pointer-events-none" />
        <Container />
        <Content1 />
      </div>
      <div className="absolute bg-white h-[60px] left-[66px] overflow-clip shadow-[0px_2px_6px_0px_rgba(0,0,0,0.25)] top-0 w-[1374px]" data-name="Top Nav.Bar">
        <Frame2 />
        <Group />
      </div>
      <Container5 />
      <Container7 />
      <div className="absolute bg-[#46398c] h-[960px] left-0 top-0 w-[66px]" data-name="Full Menu New">
        <div className="absolute bg-[#46398c] bottom-0 h-[112px] left-0 overflow-clip w-[66px]" data-name="Menu Settings">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 overflow-clip size-[16px] top-[calc(50%-28px)]" data-name="Menu Icons/ Settings">
            <div className="absolute inset-[0_0_-2.36%_0]" data-name="Path 2443">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9999 16.3782">
                <path d={svgPaths.p30793900} fill="var(--fill-0, #CDD5DF)" id="Path 2443" />
              </svg>
            </div>
          </div>
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[22px] top-[calc(50%+28px)]" data-name="Menu Icons/ Expand-Collapse/ Horizontal Minimized">
            <Group1 />
          </div>
          <div className="absolute bg-[#697586] bottom-[55px] h-px left-0 w-[250px]" data-name="Upper divider" />
        </div>
        <MenuCageroies />
        <div className="absolute bg-[#46398c] h-[60px] left-0 overflow-clip shadow-[0px_2px_6px_0px_rgba(0,0,0,0.25)] top-0 w-[66px]" data-name="Menu Header">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[29.268px] left-1/2 top-[calc(50%-0.37px)] w-[30px]" data-name="favicon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 29.268">
              <path d={svgPaths.p3cf1bc00} fill="var(--fill-0, white)" id="favicon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}