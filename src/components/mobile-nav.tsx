"use client";

import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "@/components/sidebar";

export function MobileNav({ nav }: { nav: NavItem[] }) {
  const menuRef = useRef<HTMLDetailsElement>(null);

  function closeMenu() {
    if (menuRef.current) menuRef.current.open = false;
  }

  return (
    <details
      ref={menuRef}
      className="group relative mt-2"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeMenu();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          closeMenu();
          menuRef.current?.querySelector("summary")?.focus();
        }
      }}
    >
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between rounded-md px-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 [&::-webkit-details-marker]:hidden">
        Categories
        <ChevronDown aria-hidden className="size-4 transition-transform group-open:rotate-180" />
      </summary>
      <nav aria-label="Sections" className="absolute inset-x-0 top-full mt-2 rounded-lg border border-border bg-background p-2 shadow-lg">
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={closeMenu}
            className="flex min-h-11 items-center rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </details>
  );
}
