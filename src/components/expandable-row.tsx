"use client";

import { useId, useState } from "react";

/** Click, tap, or keyboard activation toggles details; hover only highlights. */
export function ExpandableRow({
  header,
  preview,
  children,
}: {
  header: React.ReactNode;
  preview: React.ReactNode;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);
  const detailId = useId();

  return (
    <li className="group -mx-3" data-expanded={expanded}>
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        aria-controls={detailId}
        className="relative flex w-full cursor-pointer items-center gap-4 rounded-xl px-3 py-3 text-left transition-colors duration-200 motion-reduce:transition-none before:absolute before:inset-y-4 before:left-0 before:w-0.5 before:rounded-full before:bg-link before:opacity-0 hover:bg-muted hover:before:opacity-100 focus-visible:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:before:opacity-100 aria-expanded:bg-muted aria-expanded:before:opacity-100 dark:hover:bg-transparent dark:focus-visible:bg-transparent dark:aria-expanded:bg-transparent"
      >
        {header}
      </button>
      <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none group-hover:grid-rows-[1fr] group-hover:opacity-100 group-data-[expanded=true]:grid-rows-[1fr] group-data-[expanded=true]:opacity-100">
        <div className="overflow-hidden">
          <div id={detailId} className="px-3 pb-4 pt-2 sm:pl-[calc(0.75rem+4rem+1rem)]">
            <div className="rounded-xl border border-border bg-muted/50 hover:bg-muted focus-within:bg-muted dark:bg-transparent dark:hover:bg-transparent dark:focus-within:bg-transparent p-4 transition-colors duration-200 ease-out motion-reduce:transition-none">
              {preview}
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="cursor-pointer text-xs font-medium text-muted-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-data-[expanded=true]:hidden"
              >
                Click to expand
              </button>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="hidden cursor-pointer text-xs font-medium text-muted-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-data-[expanded=true]:block"
              >
                Click to collapse
              </button>
              <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none group-data-[expanded=true]:grid-rows-[1fr] group-data-[expanded=true]:opacity-100">
                <div className="overflow-hidden">
                  <div className="mt-4 border-t border-border pt-4">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
