import { useEffect, useRef } from "react";
import type { EditorTab } from "../shared";

const V3_URL = import.meta.env.VITE_OPTIGENIE_URL as string | undefined;

/** True when the v3 server URL is configured in .env.local */
export const isV3Available = Boolean(V3_URL);

interface OptiGeniePanelV3Props {
  tab: EditorTab;
  templateName: string;
  activeField?: string;
}

/**
 * Embeds the OptiGenie v3 SPA in an iframe with ?embed=true so its sidebar is
 * hidden. Sends page context to the iframe whenever tab/templateName/activeField
 * changes via postMessage, allowing v3 to be context-aware (Phase 2 will wire
 * this into the Claude system prompt on the v3 server side).
 */
export function OptiGeniePanelV3({ tab, templateName, activeField }: OptiGeniePanelV3Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !V3_URL) return;

    const send = () => {
      iframe.contentWindow?.postMessage(
        { type: "cs:context", payload: { tab, templateName, activeField } },
        V3_URL,
      );
    };

    // Send immediately if the iframe is already loaded, or wait for it.
    if (iframe.contentDocument?.readyState === "complete") {
      send();
    } else {
      iframe.addEventListener("load", send, { once: true });
    }
  }, [tab, templateName, activeField]);

  if (!V3_URL) return null;

  return (
    <iframe
      ref={iframeRef}
      src={`${V3_URL}?embed=true`}
      className="w-[450px] flex-shrink-0 h-full border-l border-[#d0d5dd]"
      allow="clipboard-write"
      title="Optimove AI"
    />
  );
}
