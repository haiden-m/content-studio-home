export type TemplateFieldId =
  | "heroHeadline"
  | "heroBadge"
  | "bodyHeading"
  | "bodyCopy"
  | "ctaText"
  | "topPicksLabel";

export interface TemplateContent {
  heroHeadline: string;
  heroBadge: string;
  bodyHeading: string;
  bodyCopy: string;
  ctaText: string;
  topPicksLabel: string;
}

export const DEFAULT_TEMPLATE_CONTENT: TemplateContent = {
  heroHeadline: "CHAMPIONS LEAGUE WEEKEND",
  heroBadge: "MATCH WEEKEND",
  bodyHeading: "🔥 {{ customer.firstName }}, your chance to Win BIG! ⚽️",
  bodyCopy:
    "Champions league games this weekend mean more opportunities to watch your favourite team and win Big!",
  ctaText: "Place Bet",
  topPicksLabel: "🔥 Our Top Picks for You:",
};

export type PersonalisationFilter = "variants" | "data_connections" | "variables";
export type PersonalisationTab = "snippets" | "content_blocks" | "personalisation_tags";

export interface PersonalisationOption {
  id: string;
  tab: PersonalisationTab;
  filter: PersonalisationFilter;
  title: string;
  variantLabel?: string;
  value: string;
  preview: string;
}

export const PERSONALISATION_OPTIONS: PersonalisationOption[] = [
  {
    id: "bet-amount-v1",
    tab: "snippets",
    filter: "variants",
    title: "Bet Amount",
    variantLabel: "Variant 1",
    value: "Hi {{ customer.name }} ready for tonight's big game!",
    preview: "Hi {{ customer.name }} ready for tonight's big ...",
  },
  {
    id: "bet-amount-v2",
    tab: "snippets",
    filter: "variants",
    title: "Bet Amount",
    variantLabel: "Variant 2",
    value: "{{ customer.firstName }}, your exclusive {{ bet.amount }} bet is ready!",
    preview: "{{ customer.firstName }}, your exclusive {{ bet.amount }} ...",
  },
  {
    id: "headline-v1",
    tab: "snippets",
    filter: "variants",
    title: "Headline",
    variantLabel: "Variant 1",
    value: "🔥 {{ customer.firstName }}, Win BIG This Weekend! ⚽️",
    preview: "🔥 {{ customer.firstName }}, Win BIG This Weekend! ...",
  },
  {
    id: "hero-headline-dc",
    tab: "snippets",
    filter: "data_connections",
    title: "Hero Headline",
    value: "{{ hero_row.Headline }}",
    preview: "{{ hero_row.Headline }}",
  },
  {
    id: "hero-cta-dc",
    tab: "snippets",
    filter: "data_connections",
    title: "CTA Text",
    value: "{{ hero_row.CTA_Text }}",
    preview: "{{ hero_row.CTA_Text }}",
  },
  {
    id: "body-copy-dc",
    tab: "snippets",
    filter: "data_connections",
    title: "Offer Body",
    value: "{{ body_row.Offer_Body }}",
    preview: "{{ body_row.Offer_Body }}",
  },
  {
    id: "customer-name",
    tab: "personalisation_tags",
    filter: "variables",
    title: "Customer Name",
    value: "{{ customer.name }}",
    preview: "{{ customer.name }}",
  },
  {
    id: "customer-first-name",
    tab: "personalisation_tags",
    filter: "variables",
    title: "First Name",
    value: "{{ customer.firstName }}",
    preview: "{{ customer.firstName }}",
  },
  {
    id: "available-spend",
    tab: "personalisation_tags",
    filter: "variables",
    title: "Available Spend",
    value: "{{ customer.availableSpend }}",
    preview: "{{ customer.availableSpend }}",
  },
  {
    id: "bet-block",
    tab: "content_blocks",
    filter: "variants",
    title: "Top Picks Block",
    variantLabel: "Variant 1",
    value: "🔥 Our Top Picks for {{ customer.firstName }}:",
    preview: "🔥 Our Top Picks for {{ customer.firstName }}:",
  },
];

const TOKEN_REGEX = /\{\{[^}]+\}\}/g;

export function renderTemplateText(text: string): Array<string | { token: string }> {
  const parts: Array<string | { token: string }> = [];
  let lastIndex = 0;
  let match = TOKEN_REGEX.exec(text);

  while (match) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push({ token: match[0] });
    lastIndex = match.index + match[0].length;
    match = TOKEN_REGEX.exec(text);
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export function resolvePersonalization(
  text: string,
  context: { firstName?: string; availableSpend?: number },
): string {
  return text
    .replace(/\{\{\s*customer\.name\s*\}\}/g, context.firstName ?? "Customer")
    .replace(/\{\{\s*customer\.firstName\s*\}\}/g, context.firstName ?? "Customer")
    .replace(
      /\{\{\s*customer\.availableSpend\s*\}\}/g,
      String(context.availableSpend ?? 0),
    )
    .replace(/\{\{\s*bet\.amount\s*\}\}/g, "£25")
    .replace(/\{\{\s*hero_row\.Headline\s*\}\}/g, "CHAMPIONS LEAGUE WEEKEND")
    .replace(/\{\{\s*hero_row\.CTA_Text\s*\}\}/g, "Place Bet")
    .replace(
      /\{\{\s*body_row\.Offer_Body\s*\}\}/g,
      "Champions league games this weekend mean more opportunities to watch your favourite team and win Big!",
    );
}
