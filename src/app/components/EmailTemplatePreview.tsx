import type { CSSProperties, MouseEvent } from "react";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/champions-league-hero.jpg";
import betbroLogo from "@/assets/betbro-logo.png";
import {
  DEFAULT_TEMPLATE_CONTENT,
  renderTemplateText,
  resolvePersonalization,
  type TemplateContent,
  type TemplateFieldId,
} from "../templateContent";

const ROBOTO = { fontFamily: "'Roboto', sans-serif" } as const;

export const DEFAULT_EMAIL_SUBJECT = "Champions League Weekend — Your Chance to Win BIG!";

interface EditableTextProps {
  fieldId: TemplateFieldId;
  value: string;
  editable?: boolean;
  active?: boolean;
  className?: string;
  style?: CSSProperties;
  tokenClassName?: string;
  resolveContext?: { firstName?: string; availableSpend?: number };
  onClick?: (fieldId: TemplateFieldId, event: MouseEvent<HTMLButtonElement>) => void;
}

function EditableText({
  fieldId,
  value,
  editable = false,
  active = false,
  className = "",
  style,
  tokenClassName = "text-[#7068de]",
  resolveContext,
  onClick,
}: EditableTextProps) {
  const displayValue = resolveContext ? resolvePersonalization(value, resolveContext) : value;
  const parts = renderTemplateText(displayValue);

  const content = parts.map((part, index) =>
    typeof part === "string" ? (
      <span key={index}>{part}</span>
    ) : (
      <span key={index} className={tokenClassName}>
        {part.token}
      </span>
    ),
  );

  if (!editable) {
    return (
      <p className={className} style={style}>
        {content}
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={(event) => onClick?.(fieldId, event)}
      className={`text-left rounded-md transition-shadow cursor-pointer ${
        active
          ? "ring-2 ring-[#7068de] ring-offset-2"
          : "hover:ring-2 hover:ring-[#7068de]/40 hover:ring-offset-1"
      } ${className}`}
      style={style}
    >
      {content}
    </button>
  );
}

export interface EmailTemplatePreviewProps {
  className?: string;
  content?: TemplateContent;
  editable?: boolean;
  activeField?: TemplateFieldId | null;
  resolveContext?: { firstName?: string; availableSpend?: number };
  onFieldClick?: (fieldId: TemplateFieldId, event: MouseEvent<HTMLButtonElement>) => void;
}

export function EmailTemplatePreview({
  className = "",
  content = DEFAULT_TEMPLATE_CONTENT,
  editable = false,
  activeField = null,
  resolveContext,
  onFieldClick,
}: EmailTemplatePreviewProps) {
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
          <EditableText
            fieldId="heroHeadline"
            value={content.heroHeadline}
            editable={editable}
            active={activeField === "heroHeadline"}
            resolveContext={resolveContext}
            onClick={onFieldClick}
            className="absolute left-[10%] right-[6%] top-[41%] text-center text-white text-[clamp(1.25rem,7cqi,3rem)] font-semibold leading-[1.25] tracking-[-0.02em] w-[84%]"
            style={{ ...ROBOTO, textShadow: "0px 10px 20px black" }}
            tokenClassName="text-[#c3bff5]"
          />
          <div className="absolute bottom-[5%] right-[2%] bg-[#175cd3] border border-white rounded px-3 py-3">
            <EditableText
              fieldId="heroBadge"
              value={content.heroBadge}
              editable={editable}
              active={activeField === "heroBadge"}
              resolveContext={resolveContext}
              onClick={onFieldClick}
              className="text-white text-xs font-semibold whitespace-nowrap"
              style={{ ...ROBOTO, textShadow: "0px 4px 4px rgba(0,0,0,0.25)" }}
              tokenClassName="text-[#c3bff5]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 items-center px-6 py-8">
          <EditableText
            fieldId="bodyHeading"
            value={content.bodyHeading}
            editable={editable}
            active={activeField === "bodyHeading"}
            resolveContext={resolveContext}
            onClick={onFieldClick}
            className="text-[#101828] text-[clamp(1.375rem,5.5cqi,2.25rem)] font-semibold text-center leading-tight tracking-[-0.02em]"
            style={ROBOTO}
          />
          <EditableText
            fieldId="bodyCopy"
            value={content.bodyCopy}
            editable={editable}
            active={activeField === "bodyCopy"}
            resolveContext={resolveContext}
            onClick={onFieldClick}
            className="text-[#475467] text-lg font-bold text-center leading-7"
            style={ROBOTO}
          />
          <button
            type="button"
            onClick={(event) => editable && onFieldClick?.("ctaText", event)}
            className={`inline-flex items-center gap-1 bg-[#101828] text-white rounded-full px-9 py-2.5 border border-[#7068de] shadow-sm ${
              editable
                ? activeField === "ctaText"
                  ? "ring-2 ring-[#7068de] ring-offset-2"
                  : "hover:ring-2 hover:ring-[#7068de]/40 hover:ring-offset-1 cursor-pointer"
                : ""
            }`}
            style={ROBOTO}
          >
            <span className="text-xl font-bold">
              {renderTemplateText(
                resolveContext ? resolvePersonalization(content.ctaText, resolveContext) : content.ctaText,
              ).map((part, index) =>
                typeof part === "string" ? (
                  <span key={index}>{part}</span>
                ) : (
                  <span key={index} className="text-[#c3bff5]">
                    {part.token}
                  </span>
                ),
              )}
            </span>
            <ArrowRight size={20} strokeWidth={1.67} />
          </button>
          <EditableText
            fieldId="topPicksLabel"
            value={content.topPicksLabel}
            editable={editable}
            active={activeField === "topPicksLabel"}
            resolveContext={resolveContext}
            onClick={onFieldClick}
            className="text-[#475467] text-lg font-bold text-center leading-7"
            style={ROBOTO}
          />
        </div>
      </div>
    </div>
  );
}
