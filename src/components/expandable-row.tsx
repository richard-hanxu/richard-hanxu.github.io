"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

/**
 * A compact list row that reveals extra detail on hover or keyboard focus.
 * Clicking pins it open, which is what makes it usable on touch screens.
 */
export function ExpandableRow({
  header,
  children,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
}) {
  const [pinned, setPinned] = useState(false);
  const detailId = useId();

  return (
    <li
      className="group -mx-3 rounded-xl transition-colors hover:bg-muted/60 focus-within:bg-muted/60 data-[pinned=true]:bg-muted/60"
      data-pinned={pinned}
    >
      <button
        type="button"
        onClick={() => setPinned((value) => !value)}
        aria-expanded={pinned}
        aria-controls={detailId}
        className="flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {header}
        <ChevronDown
          aria-hidden
          className="size-4 shrink-0 text-muted-foreground/50 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180 group-data-[pinned=true]:rotate-180"
        />
      </button>
      <div
        id={detailId}
        className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] group-data-[pinned=true]:grid-rows-[1fr]"
      >
        <div className="overflow-hidden">
          <div className="px-3 pb-4 pt-0 sm:pl-[calc(0.75rem+3.5rem+1rem)]">
            {children}
          </div>
        </div>
      </div>
    </li>
  );
}
