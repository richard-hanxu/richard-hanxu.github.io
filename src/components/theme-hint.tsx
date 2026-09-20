"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** The "P.S." line under the intro. Clicking it toggles the theme. */
export function ThemeHint() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return <p className="text-sm italic text-muted-foreground">&nbsp;</p>;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <p className="text-sm italic text-muted-foreground">
      P.S.{" "}
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="underline decoration-dotted underline-offset-[3px] transition-colors hover:text-foreground"
      >
        try turning the light {isDark ? "on" : "off"}
      </button>
    </p>
  );
}
