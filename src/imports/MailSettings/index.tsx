import svgPaths from "./svg-mbyoazkmzx";
import imgVideoPlayer from "./f831acdc18bc5cf3e76b7f4c0324760bbc41c693.png";
import imgAppIcon from "./867be7e217c5dbe5b34b9cbfe159a6154ef09563.png";

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

function Group1() {
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
        <div className="bg-[#e6e5fc] flex-[1_0_0] h-[44px] min-w-px relative rounded-[6px]" data-name="_Tab button base">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex items-center justify-center px-[12px] py-[8px] relative size-full">
              <p className="[word-break:break-word] font-['Roboto:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#344054] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
                Content
              </p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex h-[44px] items-center justify-center overflow-clip px-[12px] py-[8px] relative rounded-[6px] shrink-0" data-name="_Tab button base">
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

function Frame5() {
  return (
    <div className="bg-[#175cd3] col-1 content-stretch flex items-center justify-center ml-[74.13%] mt-[246.06px] p-[12px] relative rounded-[4px] row-1 w-[23.63%]">
      <div aria-hidden className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[4px]" />
      <p className="[word-break:break-word] font-['Roboto:SemiBold',sans-serif] font-semibold leading-[18px] relative shrink-0 text-[12px] text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-white whitespace-nowrap" dir="ltr" style={{ fontVariationSettings: '"wdth" 100' }}>
        MATCH WEEKEND
      </p>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-full">
      <button className="block col-1 cursor-pointer h-[303.975px] ml-0 mt-0 overflow-clip relative rounded-[8px] row-1 w-full" data-name="Video player">
        <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[8px]">
          <img alt="" className="absolute max-w-none object-cover rounded-[8px] size-full" src={imgVideoPlayer} />
          <div className="absolute bg-[rgba(0,0,0,0.2)] inset-0 rounded-[8px]" />
        </div>
        <div className="absolute bg-gradient-to-b bottom-0 from-[rgba(0,0,0,0)] h-[116px] left-0 right-0 to-[rgba(0,0,0,0.2)]" data-name="Shadow overlay player" />
      </button>
      <Frame5 />
      <div className="col-1 h-[50.891px] ml-[2.99%] mt-[21.12px] relative rounded-[9px] row-1 w-[14.92%]" data-name="App Icon">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[9px] size-full" src={imgAppIcon} />
      </div>
      <p className="[word-break:break-word] col-1 font-['Roboto:SemiBold',sans-serif] font-semibold h-[57.612px] leading-[60px] ml-[10.45%] mt-[125.79px] relative row-1 text-[48px] text-center text-shadow-[0px_10px_20px_black] text-white tracking-[-0.96px] w-[84.33%]" style={{ fontVariationSettings: '"wdth" 100' }}>
        CHAMPIONS LEAGUE WEEKEND
      </p>
    </div>
  );
}

function TextPadding4() {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] relative shrink-0" data-name="Text padding">
      <p className="[word-break:break-word] font-['Roboto:Bold',sans-serif] font-bold leading-[30px] relative shrink-0 text-[20px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Place Bet
      </p>
    </div>
  );
}

function HeadingAndBody() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full" data-name="Heading and body">
      <p className="[word-break:break-word] font-['Roboto:SemiBold',sans-serif] font-semibold leading-[44px] min-w-full relative shrink-0 text-[#101828] text-[36px] text-center tracking-[-0.72px] w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
        🔥 Your Chance to Win BIG! ⚽️
      </p>
      <p className="[word-break:break-word] font-['Roboto:Bold',sans-serif] font-bold leading-[28px] min-w-full relative shrink-0 text-[#475467] text-[18px] text-center w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>{` Champions league games this weekend mean more opportunities to watch your favourite team and win Big!`}</p>
      <div className="bg-[#101828] relative rounded-[9999px] shrink-0" data-name="Buttons/Button">
        <div className="content-stretch flex gap-[4px] items-center justify-center overflow-clip px-[36px] py-[10px] relative rounded-[inherit] size-full">
          <TextPadding4 />
          <div className="overflow-clip relative shrink-0 size-[20px]" data-name="arrow-right">
            <div className="absolute inset-[20.83%]" data-name="Icon">
              <div className="absolute inset-[-7.14%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
                  <path d={svgPaths.p22d8b900} id="Icon" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden className="absolute border border-[#7068de] border-solid inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
      </div>
      <p className="[word-break:break-word] font-['Roboto:Bold',sans-serif] font-bold leading-[28px] min-w-full relative shrink-0 text-[#475467] text-[18px] text-center w-[min-content]" style={{ fontVariationSettings: '"wdth" 100' }}>
        🔥 Our Top Picks for You:
      </p>
    </div>
  );
}

function Body() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Body">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[24px] py-[32px] relative size-full">
          <HeadingAndBody />
        </div>
      </div>
    </div>
  );
}

function EmailTemplate() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Email template">
      <div className="content-stretch flex flex-col gap-[16px] items-start px-[32px] relative size-full">
        <Group />
        <Body />
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[759px] items-center px-[24px] py-[48px] relative shrink-0 w-[884px]" data-name="Content">
      <EmailTemplate />
    </div>
  );
}

function TabButtonBase() {
  return (
    <div className="content-stretch flex h-[60px] items-center overflow-clip px-[24px] py-[12px] relative shrink-0 w-[130px]" data-name="_Tab button base">
      <p className="[word-break:break-word] font-['Roboto:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#101828] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Email Details
      </p>
    </div>
  );
}

function Tabs() {
  return (
    <div className="content-stretch flex gap-[12px] h-[60px] items-center relative shrink-0 w-full" data-name="Tabs">
      <TabButtonBase />
    </div>
  );
}

function HorizontalTabs() {
  return (
    <div className="content-stretch flex flex-col h-[60px] items-start relative shrink-0 w-[414px]" data-name="Horizontal tabs">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <Tabs />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-white content-stretch flex h-[60px] items-center relative shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border-[#eaecf0] border-b border-solid inset-0 pointer-events-none" />
      <HorizontalTabs />
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-name="Content">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[24px] min-w-px overflow-hidden relative text-[#667085] text-[16px] text-ellipsis text-left whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        ​
      </p>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(16,24,40,0.05)] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <Content3 />
        </div>
      </div>
    </div>
  );
}

function InputWithLabel() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#344054] text-[14px] text-left whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Subject
      </p>
      <Input1 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex h-[40px] items-center relative shrink-0" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="personalization_icon">
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

function Container10() {
  return (
    <div className="content-stretch flex gap-[8px] items-end relative shrink-0" data-name="Container">
      <button className="content-stretch cursor-pointer flex flex-col gap-[6px] items-start relative shrink-0 w-[338px]" data-name="Input field">
        <InputWithLabel />
      </button>
      <Container11 />
    </div>
  );
}

function Containeer() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0" data-name="Containeer">
      <Container10 />
      <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="+ Add component">
        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="plus">
          <div className="absolute inset-[20.83%]" data-name="Icon">
            <div className="absolute inset-[-7.14%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
                <path d={svgPaths.p1b67fa00} id="Icon" stroke="var(--stroke-0, #7068DE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </svg>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Roboto:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#7068de] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Add variant
        </p>
      </div>
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-name="Content">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[24px] min-w-px overflow-hidden relative text-[#d0d5dd] text-[16px] text-ellipsis text-left whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Optional
      </p>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(16,24,40,0.05)] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <Content4 />
        </div>
      </div>
    </div>
  );
}

function InputWithLabel1() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#344054] text-[14px] text-left whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Preview text
      </p>
      <Input2 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex h-[40px] items-center relative shrink-0" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="personalization_icon">
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

function Container12() {
  return (
    <div className="content-stretch flex gap-[8px] items-end relative shrink-0 w-full" data-name="Container">
      <button className="content-stretch cursor-pointer flex flex-col gap-[6px] items-start relative shrink-0 w-[338px]" data-name="Input field">
        <InputWithLabel1 />
      </button>
      <Container13 />
    </div>
  );
}

function Containeer1() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0" data-name="Containeer">
      <Container12 />
      <div className="content-stretch flex gap-[6px] items-center justify-center overflow-clip relative shrink-0" data-name="+ Add component">
        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="plus">
          <div className="absolute inset-[20.83%]" data-name="Icon">
            <div className="absolute inset-[-7.14%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
                <path d={svgPaths.p1b67fa00} id="Icon" stroke="var(--stroke-0, #7068DE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </svg>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Roboto:SemiBold',sans-serif] font-semibold leading-[20px] relative shrink-0 text-[#7068de] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
          Add variant
        </p>
      </div>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-name="Content">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[24px] min-w-px overflow-hidden relative text-[#d0d5dd] text-[16px] text-ellipsis text-left whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Select
      </p>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(16,24,40,0.05)] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <Content5 />
        </div>
      </div>
    </div>
  );
}

function InputWithLabel2() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#344054] text-[14px] text-left whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        From email
      </p>
      <Input3 />
    </div>
  );
}

function Container15() {
  return <div className="content-stretch flex h-[40px] items-center relative shrink-0 w-[20px]" data-name="Container" />;
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[8px] items-end relative shrink-0 w-full" data-name="Container">
      <button className="content-stretch cursor-pointer flex flex-col gap-[6px] items-start relative shrink-0 w-[338px]" data-name="Input field">
        <InputWithLabel2 />
      </button>
      <Container15 />
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-name="Content">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[24px] min-w-px overflow-hidden relative text-[#d0d5dd] text-[16px] text-ellipsis text-left whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        ​
      </p>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(16,24,40,0.05)] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <Content6 />
        </div>
      </div>
    </div>
  );
}

function InputWithLabel3() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#344054] text-[14px] text-left whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        From name
      </p>
      <Input4 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex h-[40px] items-center relative shrink-0" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="personalization_icon">
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

function Container16() {
  return (
    <div className="content-stretch flex gap-[8px] items-end relative shrink-0 w-full" data-name="Container">
      <button className="content-stretch cursor-pointer flex flex-col gap-[6px] items-start relative shrink-0 w-[338px]" data-name="Input field">
        <InputWithLabel3 />
      </button>
      <Container17 />
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-name="Content">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[24px] min-w-px overflow-hidden relative text-[#d0d5dd] text-[16px] text-ellipsis text-left whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Select
      </p>
    </div>
  );
}

function Input5() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(16,24,40,0.05)] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <Content7 />
        </div>
      </div>
    </div>
  );
}

function InputWithLabel4() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#344054] text-[14px] text-left whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Reply-to
      </p>
      <Input5 />
    </div>
  );
}

function Container19() {
  return <div className="content-stretch flex h-[40px] items-center relative shrink-0 w-[20px]" data-name="Container" />;
}

function Container18() {
  return (
    <div className="content-stretch flex gap-[8px] items-end relative shrink-0 w-full" data-name="Container">
      <button className="content-stretch cursor-pointer flex flex-col gap-[6px] items-start relative shrink-0 w-[338px]" data-name="Input field">
        <InputWithLabel4 />
      </button>
      <Container19 />
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-name="Content">
      <p className="[word-break:break-word] flex-[1_0_0] font-['Roboto:Regular',sans-serif] font-normal leading-[24px] min-w-px overflow-hidden relative text-[#d0d5dd] text-[16px] text-ellipsis text-left whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Select
      </p>
    </div>
  );
}

function Input6() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(16,24,40,0.05)] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative size-full">
          <Content8 />
        </div>
      </div>
    </div>
  );
}

function InputWithLabel5() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Input with label">
      <p className="[word-break:break-word] font-['Roboto:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#344054] text-[14px] text-left whitespace-nowrap" style={{ fontVariationSettings: '"wdth" 100' }}>
        Topics
      </p>
      <Input6 />
    </div>
  );
}

function Container21() {
  return <div className="content-stretch flex h-[40px] items-center relative shrink-0 w-[20px]" data-name="Container" />;
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[8px] items-end relative shrink-0 w-full" data-name="Container">
      <button className="content-stretch cursor-pointer flex flex-col gap-[6px] items-start relative shrink-0 w-[338px]" data-name="Input field">
        <InputWithLabel5 />
      </button>
      <Container21 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Container">
      <div className="overflow-clip relative shrink-0 size-[18px]" data-name="mark">
        <div className="absolute inset-[8.33%]" data-name="Icon">
          <div className="absolute inset-[-5.57%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.67 16.67">
              <path d={svgPaths.p18fef0} id="Icon" stroke="var(--stroke-0, #7068DE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.67" />
            </svg>
          </div>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#7068de] text-[14px] whitespace-nowrap">UTM Parameters</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[366px]" data-name="Container">
      <Containeer />
      <Containeer1 />
      <Container14 />
      <Container16 />
      <Container18 />
      <Container20 />
      <Container22 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="bg-white h-[701px] relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center p-[24px] relative size-full">
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function RightPanel() {
  return (
    <div className="content-stretch flex flex-col h-[761px] items-start mr-[-1px] relative shrink-0 w-[414px]" data-name="Right panel">
      <div aria-hidden className="absolute border-black border-l border-solid inset-0 pointer-events-none shadow-[0px_0px_3px_0px_rgba(16,24,40,0.1),0px_1px_2px_0px_rgba(16,24,40,0.06)]" />
      <Container8 />
      <Frame6 />
    </div>
  );
}

function ButtonsButton() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-[8px] shrink-0 w-[39px]" data-name="Buttons/Button">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="palette">
        <div className="absolute inset-[8.33%]" data-name="Icon">
          <div className="absolute inset-[-5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 18.3333">
              <g id="Icon">
                <path d={svgPaths.pdc6a000} stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.pf68cf00} stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.pedb8e80} stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                <path d={svgPaths.p36f02000} stroke="var(--stroke-0, #667085)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonsButton1() {
  return (
    <div className="bg-[#e6e5fc] content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-[8px] shrink-0 w-[39px]" data-name="Buttons/Button">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="settings-01">
        <div className="absolute inset-[8.33%]" data-name="Icon">
          <div className="absolute inset-[-4.5%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.1667 18.1667">
              <g id="Icon">
                <path d={svgPaths.p3393df00} stroke="var(--stroke-0, #604DD0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d={svgPaths.p3e92d600} stroke="var(--stroke-0, #604DD0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function RightToolbar() {
  return (
    <div className="bg-white flex-[1_0_0] h-[759px] min-w-px relative" data-name="right toolbar">
      <div aria-hidden className="absolute border-[#cfd8dc] border-l border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-center p-[16px] relative size-full">
          <ButtonsButton />
          <ButtonsButton1 />
          <div className="content-stretch flex items-center justify-center overflow-clip p-[8px] relative rounded-[8px] shrink-0 w-[39px]" data-name="Buttons/Button">
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="logo OptiGenie">
              <div className="absolute inset-[9.41%_14.29%_0_0]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.1425 18.1182">
                  <path d={svgPaths.p3f79e180} fill="var(--fill-0, #667085)" id="Vector" />
                </svg>
              </div>
              <div className="absolute inset-[0_0_69.59%_70.48%]" data-name="Vector">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.9045 6.08245">
                  <path d={svgPaths.p17125c80} fill="var(--fill-0, #667085)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-center min-w-px relative">
      <RightPanel />
      <RightToolbar />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex h-[758px] items-start left-[66px] top-[202px] w-[1373px]" data-name="Container">
      <Content2 />
      <Frame4 />
    </div>
  );
}

function Group2() {
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

export default function MailSettings() {
  return (
    <div className="bg-[#eaecf0] relative size-full" data-name="Mail - Settings">
      <div className="absolute bg-white content-stretch flex gap-[42px] h-[82px] items-center left-[66px] p-[16px] top-[60px] w-[1374px]" data-name="Content">
        <div aria-hidden className="absolute border-[#d0d5dd] border-b border-solid inset-0 pointer-events-none" />
        <Container />
        <Content1 />
      </div>
      <div className="absolute bg-white h-[60px] left-[66px] overflow-clip shadow-[0px_2px_6px_0px_rgba(0,0,0,0.25)] top-0 w-[1374px]" data-name="Top Nav.Bar">
        <Frame2 />
        <Group1 />
      </div>
      <Container5 />
      <Container7 />
      <div className="absolute left-[83px] rounded-[8px] top-[222.5px]" data-name="Button group">
        <div className="content-stretch flex isolate items-start overflow-clip relative rounded-[inherit] size-full">
          <div className="bg-[#e6e5fc] content-stretch flex items-center justify-center min-h-[40px] px-[12px] py-[8px] relative shrink-0 z-[9]" data-name="_Button group base">
            <div aria-hidden className="absolute border-[#d0d5dd] border-r border-solid inset-[0_-0.5px_0_0] pointer-events-none" />
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="monitor-04">
              <div className="absolute inset-[12.5%_8.33%]" data-name="Icon">
                <div className="absolute inset-[-5.56%_-5%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 16.6667">
                    <path d={svgPaths.p12431380} id="Icon" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white content-stretch flex items-center justify-center min-h-[40px] px-[12px] py-[8px] relative shrink-0 z-[1]" data-name="_Button group base">
            <div aria-hidden className="absolute border-[#d0d5dd] border-r border-solid inset-[0_-0.5px_0_0] pointer-events-none" />
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="phone-01">
              <div className="absolute inset-[8.33%_20.83%]" data-name="Icon">
                <div className="absolute inset-[-5%_-7.14%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 18.3333">
                    <path d={svgPaths.p1a042900} id="Icon" stroke="var(--stroke-0, #344054)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden className="absolute border border-[#d0d5dd] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]" />
      </div>
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
            <Group2 />
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