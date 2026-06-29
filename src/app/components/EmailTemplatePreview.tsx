import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/champions-league-hero.jpg";
import betbroLogo from "@/assets/betbro-logo.png";

const ROBOTO = { fontFamily: "'Roboto', sans-serif" } as const;

export const DEFAULT_EMAIL_SUBJECT = "Champions League Weekend — Your Chance to Win BIG!";

export function EmailTemplatePreview({ className = "" }: { className?: string }) {
  return (
    <div className={`@container bg-white flex flex-col items-center ${className}`}>
      <div className="flex flex-col gap-4 w-full px-8 py-12">
        <div className="relative w-full rounded-lg overflow-hidden aspect-[512/304]">
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/20 rounded-lg" />
          <div className="absolute bottom-0 left-0 right-0 h-[116px] bg-gradient-to-b from-transparent to-black/20" />
          <img
            src={betbroLogo}
            alt="BetBro"
            className="absolute top-[7%] left-[3%] w-[15%] rounded-[9px] object-cover"
          />
          <p
            className="absolute left-[10%] right-[6%] top-[41%] text-center text-white text-[clamp(1.25rem,7cqi,3rem)] font-semibold leading-[1.25] tracking-[-0.02em]"
            style={{ ...ROBOTO, textShadow: "0px 10px 20px black" }}
          >
            CHAMPIONS LEAGUE WEEKEND
          </p>
          <div className="absolute bottom-[5%] right-[2%] bg-[#175cd3] border border-white rounded px-3 py-3">
            <p
              className="text-white text-xs font-semibold whitespace-nowrap"
              style={{ ...ROBOTO, textShadow: "0px 4px 4px rgba(0,0,0,0.25)" }}
            >
              MATCH WEEKEND
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 items-center px-6 py-8">
          <p
            className="text-[#101828] text-[clamp(1.375rem,5.5cqi,2.25rem)] font-semibold text-center leading-tight tracking-[-0.02em]"
            style={ROBOTO}
          >
            🔥 Your Chance to Win BIG! ⚽️
          </p>
          <p
            className="text-[#475467] text-lg font-bold text-center leading-7"
            style={ROBOTO}
          >
            Champions league games this weekend mean more opportunities to watch your favourite team and win Big!
          </p>
          <button
            type="button"
            className="inline-flex items-center gap-1 bg-[#101828] text-white rounded-full px-9 py-2.5 border border-[#7068de] shadow-sm"
            style={ROBOTO}
          >
            <span className="text-xl font-bold">Place Bet</span>
            <ArrowRight size={20} strokeWidth={1.67} />
          </button>
          <p className="text-[#475467] text-lg font-bold text-center leading-7" style={ROBOTO}>
            🔥 Our Top Picks for You:
          </p>
        </div>
      </div>
    </div>
  );
}
