import Image from "next/image";
import { SocialIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import {
  experiences,
  interests,
  profile,
  projects,
  type Experience,
} from "@/content";

const linkStyle =
  "underline decoration-border underline-offset-[3px] transition-colors hover:decoration-foreground";

function Tags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tools used">
      {tags.map((tag) => (
        <li key={tag}>
          <Badge variant="secondary" className="font-normal">
            {tag}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function MaybeLink({
  href,
  children,
  className,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (!href) return <span className={className}>{children}</span>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${linkStyle} ${className ?? ""}`}
    >
      {children}
    </a>
  );
}

function initials(name: string) {
  return name
    .split(/[\s,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join("");
}

function ProfileImage() {
  const size = 112;
  if (!profile.image) {
    return (
      <div
        aria-hidden
        className="flex size-24 items-center justify-center rounded-full border border-dashed border-border bg-muted text-center text-[11px] leading-tight text-muted-foreground sm:size-28"
      >
        Add a photo in
        <br />
        content.ts
      </div>
    );
  }
  return (
    <Image
      src={profile.image}
      alt={`Portrait of ${profile.name}`}
      width={size}
      height={size}
      priority
      className="size-24 rounded-full border border-border object-cover sm:size-28"
    />
  );
}

function OrganizationLogo({ item }: { item: Experience }) {
  const className =
    "size-11 shrink-0 rounded-lg border border-border bg-card object-contain";
  if (item.logo) {
    return (
      <Image
        src={item.logo}
        alt={`${item.organization} logo`}
        width={44}
        height={44}
        className={`${className} p-1`}
      />
    );
  }
  return (
    <div
      aria-hidden
      className={`${className} flex items-center justify-center bg-muted text-xs font-semibold text-muted-foreground`}
    >
      {initials(item.organization)}
    </div>
  );
}

export default function Home() {
  const hasExperiences = experiences.length > 0;
  const hasProjects = projects.length > 0;
  const hasInterests = interests.length > 0;

  const nav = [
    hasExperiences && { href: "#experience", label: "Experience" },
    hasProjects && { href: "#projects", label: "Projects" },
    hasInterests && { href: "#interests", label: "Interests" },
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <>
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-4 px-6 py-3 sm:px-8">
          <a href="#top" className="text-sm font-semibold tracking-tight">
            {profile.name}
          </a>
          <nav className="flex items-center gap-1 text-sm sm:gap-2">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hidden px-2 text-muted-foreground transition-colors hover:text-foreground sm:inline"
              >
                {item.label}
              </a>
            ))}
            {nav.length > 0 && profile.links.length > 0 && (
              <span
                aria-hidden
                className="mx-1 hidden h-4 w-px bg-border sm:inline-block"
              />
            )}
            {profile.links.map((link) =>
              link.icon ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  title={link.label}
                  className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <SocialIcon name={link.icon} className="size-[18px]" />
                </a>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`px-2 font-medium ${linkStyle}`}
                >
                  {link.label}
                </a>
              ),
            )}
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main
        id="top"
        className="mx-auto w-full max-w-2xl flex-1 px-6 pb-24 pt-16 sm:px-8 sm:pt-20"
      >
        <section aria-labelledby="intro-heading" className="mb-20">
          <div className="mb-8 flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between">
            <h1
              id="intro-heading"
              className="text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Hi, I&apos;m {profile.name}.
            </h1>
            <ProfileImage />
          </div>
          <div className="space-y-4 text-[17px] leading-relaxed text-foreground/80">
            {profile.intro.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          {profile.email && (
            <p className="mt-6 text-sm text-muted-foreground">
              Reach me at{" "}
              <a
                href={`mailto:${profile.email}`}
                className={`text-foreground ${linkStyle}`}
              >
                {profile.email}
              </a>
              .
            </p>
          )}
        </section>

        <div className="space-y-20">
          {hasExperiences && (
            <Section id="experience" title="Experience">
              <ol className="space-y-10">
                {experiences.map((item) => (
                  <li
                    key={`${item.role}-${item.organization}-${item.period}`}
                    className="flex gap-4"
                  >
                    <OrganizationLogo item={item} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <h3 className="text-base font-medium">
                          {item.role}
                          <span className="text-muted-foreground/60"> · </span>
                          <MaybeLink href={item.url}>
                            {item.organization}
                          </MaybeLink>
                        </h3>
                        <p className="shrink-0 text-sm text-muted-foreground">
                          {item.period}
                        </p>
                      </div>
                      {item.highlights.length > 0 && (
                        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-foreground/80 marker:text-muted-foreground/50">
                          {item.highlights.map((line, i) => (
                            <li key={i}>{line}</li>
                          ))}
                        </ul>
                      )}
                      <Tags tags={item.tags} />
                    </div>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {hasProjects && (
            <Section id="projects" title="Projects">
              <ul className="space-y-10">
                {projects.map((project) => (
                  <li key={project.name}>
                    <h3 className="text-base font-medium">
                      <MaybeLink href={project.url}>{project.name}</MaybeLink>
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-foreground/80">
                      {project.description}
                    </p>
                    <Tags tags={project.tags} />
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {hasInterests && (
            <Section id="interests" title="Interests">
              <ul className="space-y-6">
                {interests.map((interest) => (
                  <li key={interest.name}>
                    <h3 className="text-base font-medium">{interest.name}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-foreground/80">
                      {interest.description}
                    </p>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      </main>

      <footer className="mx-auto w-full max-w-2xl px-6 pb-10 text-xs text-muted-foreground/70 sm:px-8">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}
