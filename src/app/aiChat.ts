export type ChatAttachment = {
  name: string;
  size: number;
  extension: string;
  kind: "image" | "document";
  previewUrl: string | null;
};

export type ChatMessage =
  | { type: "file"; file: ChatAttachment }
  | { type: "user"; text: string }
  | { type: "typing" }
  | { type: "ai"; text: string };

export type AIChatSession = {
  prompt: string;
  attachments: ChatAttachment[];
};

const DEMO_FILE: ChatAttachment = {
  name: "Champions League Bet Week Brief.pdf",
  size: Math.round(1.6 * 1024 * 1024),
  extension: "PDF",
  kind: "document",
  previewUrl: null,
};

export const DEFAULT_CHAT: ChatMessage[] = [
  { type: "file", file: DEMO_FILE },
  {
    type: "user",
    text: "Create an email template for the champions league matches this week using the brief attached.",
  },
  { type: "typing" },
  {
    type: "ai",
    text: "Sure, let me create this for you.\n\n ✶   Reading attached brief\n\n ✶   Extracting details",
  },
];

export const AI_TYPING_RESPONSE =
  "Sure, let me create this for you.\n\n ✶   Reading attached brief\n\n ✶   Extracting details";

export function buildChatFromSession(session: AIChatSession): ChatMessage[] {
  const messages: ChatMessage[] = session.attachments.map((file) => ({
    type: "file",
    file,
  }));

  if (session.prompt.trim()) {
    messages.push({ type: "user", text: session.prompt.trim() });
  }

  if (messages.length === 0) return DEFAULT_CHAT;

  messages.push({ type: "typing" });
  return messages;
}
