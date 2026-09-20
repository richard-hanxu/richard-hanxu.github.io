import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ExpandableRow } from "@/components/expandable-row";
import { RichText } from "@/components/rich-text";
import { Sidebar, type NavItem } from "@/components/sidebar";
import { ThemeHint } from "@/components/theme-hint";
import { Badge } from "@/components/ui/badge";
import { experiences, interests, profile, projects } from "@/content";

function Tags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tools used">
      {tags.map((tag) => (
        <li key={tag}>
          <Badge variant="outline" className="font-normal text-muted-foreground">
            {tag}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

function VisitLink({ href }: { href?: string }) {
  if (!href) return null;
  let label = href;
  try {
    label = new URL(href).hostname.replace(/^www\./, "");
  } catch {
    /* keep raw href */
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="mt-3 inline-flex items-center gap-1 text-sm text-link underline decoration-link/40 underline-offset-[3px] hover:decoration-link"
    >
      {label}
      <ArrowUpRight aria-hidden className="size-3.5" />
    </a>
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
    <section id={id} className="scroll-mt-28 md:scroll-mt-12">
      <h2 className="mb-5 text-lg font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
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

function Logo({ src, name }: { src?: string; name: string }) {
  const base =
    "size-14 shrink-0 rounded-lg border border-border/60 bg-white shadow-sm dark:shadow-none";
  if (src) {
    return (
      <Image
        src={src}
        alt=""
        width={56}
        height={56}
        className={`${base} object-contain p-2`}
      />
    );
  }
  return (
    <div
      aria-hidden
      className={`${base} flex items-center justify-center text-sm font-semibold text-neutral-500`}
    >
      {initials(name)}
    </div>
  );
}

function RowHeader({
  logo,
  title,
  subtitle,
  aside,
}: {
  logo: React.ReactNode;
  title: string;
  subtitle: string;
  aside: string;
}) {
  return (
    <>
      {logo}
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{title}</p>
        <p className="truncate text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <p className="hidden shrink-0 text-sm text-muted-foreground sm:block">
        {aside}
      </p>
    </>
  );
}

function ProfileImage() {
  if (!profile.image) {
    return (
      <div
        aria-hidden
        className="flex size-20 items-center justify-center rounded-full border border-dashed border-border bg-muted text-center text-[10px] leading-tight text-muted-foreground"
      >
        Add a photo
        <br />
        in content.ts
      </div>
    );
  }
  return (
    <Image
      src={profile.image}
      alt={`Portrait of ${profile.name}`}
      width={80}
      height={80}
      priority
      className="size-20 rounded-full border border-border object-cover"
    />
  );
}

export default function Home() {
  const nav: NavItem[] = [
    { href: "#home", label: "Home" },
    ...(experiences.length > 0
      ? [{ href: "#experience", label: "Experience" }]
      : []),
    ...(projects.length > 0 ? [{ href: "#projects", label: "Projects" }] : []),
    ...(interests.length > 0
      ? [{ href: "#interests", label: "Interests" }]
      : []),
  ];

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-5 pb-24 md:flex-row md:gap-14 md:px-8 md:pt-12">
      <Sidebar nav={nav} />

      <main id="home" className="min-w-0 max-w-2xl flex-1 scroll-mt-28 md:scroll-mt-12">
        <section aria-labelledby="intro-heading">
          <div className="mb-6">
            <ProfileImage />
          </div>
          <h1
            id="intro-heading"
            className="mb-5 text-lg font-bold italic tracking-tight"
          >
            {profile.name}
          </h1>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/85">
            {profile.intro.map((paragraph, i) => (
              <p key={i}>
                <RichText text={paragraph} />
              </p>
            ))}
          </div>
          <div className="mt-10">
            <ThemeHint />
          </div>
        </section>

        <hr className="my-10 border-border" />

        <div className="space-y-14">
          {experiences.length > 0 && (
            <Section id="experience" title="Experience">
              <ul className="space-y-1">
                {experiences.map((item) => (
                  <ExpandableRow
                    key={`${item.organization}-${item.role}-${item.period}`}
                    header={
                      <RowHeader
                        logo={<Logo src={item.logo} name={item.organization} />}
                        title={item.organization}
                        subtitle={[item.role, item.location]
                          .filter(Boolean)
                          .join(" · ")}
                        aside={item.period}
                      />
                    }
                  >
                    <p className="mb-2 text-sm text-muted-foreground sm:hidden">
                      {item.period}
                    </p>
                    {item.highlights.length > 0 && (
                      <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/85 marker:text-muted-foreground/50">
                        {item.highlights.map((line, i) => (
                          <li key={i}>
                            <RichText text={line} />
                          </li>
                        ))}
                      </ul>
                    )}
                    <Tags tags={item.tags} />
                    <VisitLink href={item.url} />
                  </ExpandableRow>
                ))}
              </ul>
            </Section>
          )}

          {projects.length > 0 && (
            <Section id="projects" title="Projects">
              <ul className="space-y-1">
                {projects.map((project) => (
                  <ExpandableRow
                    key={project.name}
                    header={
                      <RowHeader
                        logo={<Logo src={project.logo} name={project.name} />}
                        title={project.name}
                        subtitle={project.location}
                        aside={project.year}
                      />
                    }
                  >
                    <p className="mb-2 text-sm text-muted-foreground sm:hidden">
                      {project.year}
                    </p>
                    <p className="text-sm leading-relaxed text-foreground/85">
                      <RichText text={project.description} />
                    </p>
                    <Tags tags={project.tags} />
                    <VisitLink href={project.url} />
                  </ExpandableRow>
                ))}
              </ul>
            </Section>
          )}

          {interests.length > 0 && (
            <Section id="interests" title="Interests">
              <ul className="space-y-5">
                {interests.map((interest) => (
                  <li key={interest.name}>
                    <h3 className="font-medium">{interest.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/85">
                      <RichText text={interest.description} />
                    </p>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        <footer className="mt-20 text-xs text-muted-foreground/70">
          © {new Date().getFullYear()} {profile.name}
        </footer>
      </main>
    </div>
  );
}
