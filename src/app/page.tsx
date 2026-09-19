import { Badge } from "@/components/ui/badge";
import { experiences, interests, profile, projects } from "@/content";

function Tags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tools used">
      {tags.map((tag) => (
        <li key={tag}>
          <Badge variant="secondary" className="font-normal text-neutral-700">
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
      <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
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
      className={`underline decoration-neutral-300 underline-offset-[3px] transition-colors hover:decoration-neutral-900 ${className ?? ""}`}
    >
      {children}
    </a>
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
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-4 px-6 py-3 sm:px-8">
          <a
            href="#top"
            className="text-sm font-semibold tracking-tight text-neutral-900"
          >
            {profile.name}
          </a>
          <nav className="flex items-center gap-4 text-sm">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hidden text-neutral-500 transition-colors hover:text-neutral-900 sm:inline"
              >
                {item.label}
              </a>
            ))}
            {nav.length > 0 && profile.links.length > 0 && (
              <span
                aria-hidden
                className="hidden h-4 w-px bg-neutral-200 sm:inline-block"
              />
            )}
            {profile.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-[3px] transition-colors hover:decoration-neutral-900"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main
        id="top"
        className="mx-auto w-full max-w-2xl flex-1 px-6 pb-24 pt-16 sm:px-8 sm:pt-20"
      >
        <section aria-labelledby="intro-heading" className="mb-20">
          <h1
            id="intro-heading"
            className="mb-6 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl"
          >
            Hi, I&apos;m {profile.name}.
          </h1>
          <div className="space-y-4 text-[17px] leading-relaxed text-neutral-700">
            {profile.intro.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          {profile.email && (
            <p className="mt-6 text-sm text-neutral-500">
              Reach me at{" "}
              <a
                href={`mailto:${profile.email}`}
                className="text-neutral-900 underline decoration-neutral-300 underline-offset-[3px] hover:decoration-neutral-900"
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
                  <li key={`${item.role}-${item.organization}-${item.period}`}>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <h3 className="text-base font-medium text-neutral-900">
                        {item.role}
                        <span className="text-neutral-400"> · </span>
                        <MaybeLink href={item.url} className="text-neutral-900">
                          {item.organization}
                        </MaybeLink>
                      </h3>
                      <p className="shrink-0 text-sm text-neutral-500">
                        {item.period}
                      </p>
                    </div>
                    {item.highlights.length > 0 && (
                      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-neutral-700 marker:text-neutral-300">
                        {item.highlights.map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    )}
                    <Tags tags={item.tags} />
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
                    <h3 className="text-base font-medium text-neutral-900">
                      <MaybeLink href={project.url}>{project.name}</MaybeLink>
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-neutral-700">
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
                    <h3 className="text-base font-medium text-neutral-900">
                      {interest.name}
                    </h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-neutral-700">
                      {interest.description}
                    </p>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      </main>

      <footer className="mx-auto w-full max-w-2xl px-6 pb-10 text-xs text-neutral-400 sm:px-8">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}
