import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ExpandableRow } from "@/components/expandable-row";
import { RichText } from "@/components/rich-text";
import { Sidebar, type NavItem } from "@/components/sidebar";
import { ThemeHint } from "@/components/theme-hint";
import { Typewriter } from "@/components/typewriter";
import { Badge } from "@/components/ui/badge";
import {
  experiences,
  interests,
  profile,
  projects,
  type Experience,
  type TechnologyTags,
} from "@/content";

function Tags({ tags }: { tags: TechnologyTags }) {
  const groups = [
    { label: "Languages", values: tags.languages },
    { label: "Libraries", values: tags.libraries },
    { label: "Developer tools", values: tags.tools },
  ].filter((group) => group.values.length > 0);

  if (groups.length === 0) return null;

  return (
    <dl className="mb-4 space-y-2 border-b border-border pb-4">
      {groups.map(({ label, values }) => (
        <div key={label} className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
          <dt className="w-24 shrink-0 text-xs text-muted-foreground">{label}</dt>
          <dd className="min-w-0 flex-1">
            <ul className="flex flex-wrap gap-1.5" aria-label={label}>
            {values.filter(Boolean).map((tag) => (
                <li key={tag}>
                  <Badge
                    variant="outline"
                    className="h-auto cursor-default whitespace-normal break-words font-normal text-muted-foreground transition-colors hover:bg-muted dark:hover:bg-transparent hover:text-foreground"
                  >
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
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

function Logo({ src, name, emoji }: { src?: string; name: string; emoji?: string }) {
  const base =
    "size-16 shrink-0 rounded-lg border border-border/60 bg-white shadow-sm dark:shadow-none";
  if (src) {
    return (
      <Image
        src={src}
        alt=""
        width={64}
        height={64}
        className={`${base} object-contain p-2`}
      />
    );
  }
  return (
    <div
      aria-hidden
      className={`${base} flex items-center justify-center text-sm font-semibold text-neutral-500`}
    >
      {emoji ? <span className="text-3xl">{emoji}</span> : initials(name)}
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

function ExperienceList({ items }: { items: Experience[] }) {
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <ExpandableRow
          key={`${item.organization}-${item.role}-${item.period}`}
          preview={<Tags tags={item.tags} />}
          header={
            <RowHeader
              logo={<Logo src={item.logo} name={item.organization} />}
              title={item.role}
              subtitle={[item.organization, item.location].filter(Boolean).join(" · ")}
              aside={item.period}
            />
          }
        >
          <p className="mb-2 text-sm text-muted-foreground sm:hidden">{item.period}</p>
          {item.highlights.length > 0 && (
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground/85 marker:text-muted-foreground/50">
              {item.highlights.map((line, i) => (
                <li key={i}>
                  <RichText text={line} />
                </li>
              ))}
            </ul>
          )}
          <VisitLink href={item.url} />
        </ExpandableRow>
      ))}
    </ul>
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
      width={200}
      height={200}
      priority
      className="size-50 rounded-full border border-border object-cover"
    />
  );
}

export default function Home() {
  const professionalExperiences = experiences.filter(
    (item) => item.category === "professional",
  );
  const researchExperiences = experiences.filter(
    (item) => item.category === "research",
  );
  const nav: NavItem[] = [
    { href: "#home", label: "Home" },
    ...(professionalExperiences.length > 0
      ? [{ href: "#professional-experience", label: "Professional Experience" }]
      : []),
    ...(researchExperiences.length > 0
      ? [{ href: "#research-experience", label: "Research Experience" }]
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
          <div className="mb-6 flex items-center gap-4">
            <ProfileImage />
            <div className="flex min-w-0 flex-1 justify-center">
              <div className="relative inline-block">
                <h1 id="intro-heading" className="text-4xl font-bold tracking-tight">
                  {profile.name}
                </h1>
                <div className="absolute top-full left-0 w-max">
                  <Typewriter />
                </div>
              </div>
            </div>
          </div>
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
          {professionalExperiences.length > 0 && (
            <Section id="professional-experience" title="Professional Experience">
              <ExperienceList items={professionalExperiences} />
            </Section>
          )}

          {researchExperiences.length > 0 && (
            <Section id="research-experience" title="Research Experience">
              <ExperienceList items={researchExperiences} />
            </Section>
          )}

          {projects.length > 0 && (
            <Section id="projects" title="Projects">
              <ul className="space-y-1">
                {projects.map((project) => (
                  <ExpandableRow
                    key={project.name}
                    preview={<Tags tags={project.tags} />}
                    header={
                      <RowHeader
                        logo={<Logo src={project.logo} name={project.name} emoji={project.emoji} />}
                        title={project.name}
                        subtitle={project.location ?? ""}
                        aside={project.year ?? ""}
                      />
                    }
                  >
                    <p className="mb-2 text-sm text-muted-foreground sm:hidden">
                      {project.year}
                    </p>
                    {project.description && (
                      <p className="text-sm leading-relaxed text-foreground/85">
                        <RichText text={project.description} />
                      </p>
                    )}
                    {!!project.highlights?.length && (
                      <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/85">
                        {project.highlights.map((highlight, index) => (
                          <li key={index}>
                            <RichText text={highlight} />
                          </li>
                        ))}
                      </ul>
                    )}
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
