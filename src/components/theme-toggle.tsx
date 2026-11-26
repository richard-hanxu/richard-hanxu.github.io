"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function ThemeToggle({ showLabel = false }: { showLabel?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  // The theme is unknown during server rendering; avoid a hydration mismatch
  // by rendering a neutral placeholder until the client has mounted.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <span
        className={showLabel ? "block h-5" : "inline-block size-8"}
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";
  const Icon = isDark ? Sun : Moon;

  if (showLabel) {
    return (
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label={label}
        className="flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <Icon className="size-4" />
        <span>{isDark ? "Light mode" : "Dark mode"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Icon className="size-4" />
    </button>
  );
}
