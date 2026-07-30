export function HighlightText({
  text,
  match,
  className = "text-destructive",
}: {
  text: string;
  match: string;
  className?: string;
}) {
  const parts = text.split(match);
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 && <span className={className}>{match}</span>}
    </span>
  ));
}

export function MultiHighlightText({
  text,
  matches,
}: {
  text: string;
  matches: { match: string; className: string }[];
}) {
  const pattern = new RegExp(`(${matches.map((m) => m.match).join("|")})`, "g");
  const parts = text.split(pattern);
  return parts.map((part, i) => {
    const found = matches.find((m) => m.match === part);
    return (
      <span key={i} className={found?.className}>
        {part}
      </span>
    );
  });
}
