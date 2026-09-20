import { SocialIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile, type Link } from "@/content";

export type NavItem = { href: string; label: string };

function IconLink({ link, compact }: { link: Link; compact?: boolean }) {
  const external = /^https?:\/\//.test(link.href);
  return (
    <a
      href={link.href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      aria-label={compact ? link.label : undefined}
      title={compact ? link.label : undefined}
      className={
        compact
          ? "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          : "flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      }
    >
      <SocialIcon name={link.icon} className="size-4" />
      {!compact && <span>{link.label}</span>}
    </a>
  );
}

/** Desktop: sticky column on the left. Mobile: sticky bar across the top. */
export function Sidebar({ nav }: { nav: NavItem[] }) {
  return (
    <>
      <aside className="hidden md:block md:w-40 md:shrink-0">
        <div className="sticky top-12 flex flex-col gap-6">
          <nav aria-label="Sections" className="flex flex-col gap-3">
            {nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors hover:text-foreground ${
                  i === 0 ? "font-semibold" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          {profile.links.length > 0 && (
            <>
              <div className="h-px w-16 bg-border" />
              <nav aria-label="Profiles" className="flex flex-col gap-3">
                {profile.links.map((link) => (
                  <IconLink key={link.href} link={link} />
                ))}
              </nav>
            </>
          )}
          <div className="h-px w-16 bg-border" />
          <ThemeToggle showLabel />
        </div>
      </aside>

      <header className="sticky top-0 z-10 -mx-5 mb-8 border-b border-border bg-background/90 px-5 py-3 backdrop-blur md:hidden">
        <div className="flex items-center justify-between gap-3">
          <a href="#home" className="text-sm font-semibold italic">
            {profile.name}
          </a>
          <div className="flex items-center gap-1">
            {profile.links.map((link) => (
              <IconLink key={link.href} link={link} compact />
            ))}
            <ThemeToggle />
          </div>
        </div>
        <nav
          aria-label="Sections"
          className="mt-2 flex gap-4 overflow-x-auto text-sm text-muted-foreground"
        >
          {nav.slice(1).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}
