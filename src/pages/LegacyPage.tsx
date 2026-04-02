type Props = {
  html: string;
};

/** Renders legacy onboarding markup (string HTML + global handlers) until screens are ported to React. */
export function LegacyPage({ html }: Props) {
  return <div className="legacy-page-root" dangerouslySetInnerHTML={{ __html: html }} />;
}
