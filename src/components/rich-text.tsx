import { Fragment } from "react";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/**
 * Renders a string that may contain Markdown-style links, e.g.
 * "I study at [UWaterloo](https://uwaterloo.ca)."
 */
export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(LINK)) {
    const [full, label, href] = match;
    const start = match.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    const external = /^https?:\/\//.test(href);
    parts.push(
      <a
        key={start}
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className="text-link underline decoration-link/40 underline-offset-[3px] transition-colors hover:decoration-link"
      >
        {label}
      </a>,
    );
    last = start + full.length;
  }
  if (last < text.length) parts.push(text.slice(last));

  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>{part}</Fragment>
      ))}
    </>
  );
}
