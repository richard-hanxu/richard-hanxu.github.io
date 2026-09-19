/**
 * Everything shown on the site lives in this file.
 *
 * To add an entry, copy an existing object in the relevant array and change
 * the text. To remove one, delete the object. Sections with an empty array
 * are hidden automatically, so you can leave a list empty while you fill it in.
 */

/**
 * Icons available for header links. Add a new one in
 * src/components/icons.tsx if you need something else.
 */
export type LinkIcon = "github" | "linkedin" | "mail" | "globe";

export type Link = {
  /** Used for the tooltip and screen readers. */
  label: string;
  href: string;
  /** Which icon to show. Omit to show the label as plain text instead. */
  icon?: LinkIcon;
};

export type Experience = {
  role: string;
  organization: string;
  /** Free-form, e.g. "Summer 2025" or "Jan 2024 – Present". */
  period: string;
  /** Optional. Shown as a link on the organization name if provided. */
  url?: string;
  /**
   * Optional. Path to a logo inside the public/ folder, e.g.
   * "/images/logos/acme.png". Square images (or SVGs) look best.
   * When omitted, the organization's initials are shown instead.
   */
  logo?: string;
  /** Each string becomes a bullet point. */
  highlights: string[];
  /** Tools, languages, or frameworks. Each string becomes a tag. */
  tags: string[];
};

export type Project = {
  name: string;
  description: string;
  /** Optional. Shown as a link on the project name if provided. */
  url?: string;
  tags: string[];
};

export type Interest = {
  name: string;
  description: string;
};

export const profile = {
  name: "Your Name",
  /** Appears in the browser tab. */
  siteTitle: "Your Name",
  /**
   * Path to your profile photo inside the public/ folder, e.g.
   * "/images/profile.jpg". Set to "" to show a placeholder until you add one.
   */
  image: "",
  /**
   * The introductory paragraph(s). Each string is rendered as its own
   * paragraph, so add or remove strings freely.
   */
  intro: [
    "I'm a third-year student studying Computer Science and Mathematics. Most of my coursework has centered on systems, distributed computing, and probability, and I spend a lot of my free time building tools that make those ideas easier to work with.",
    "Outside of class I care about well-designed software, long-form writing, and getting outside. This site is a running record of where I've worked, what I've built, and what I'm curious about right now.",
  ],
  /** Links pinned in the header at the top of the page. */
  links: [
    {
      label: "GitHub",
      href: "https://github.com/your-username",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/your-username",
      icon: "linkedin",
    },
  ] as Link[],
  /** Optional. Set to an empty string to hide the email line. */
  email: "you@example.com",
};

export const experiences: Experience[] = [
  {
    role: "Software Engineering Intern",
    organization: "Acme Robotics",
    period: "Summer 2025",
    url: "https://example.com",
    logo: "/images/logos/acme.svg",
    highlights: [
      "Built an internal dashboard for monitoring fleet telemetry, cutting time-to-diagnose for field issues from hours to minutes.",
      "Wrote a Go service that batched sensor uploads and reduced ingestion cost by roughly 30%.",
    ],
    tags: ["Go", "TypeScript", "React", "PostgreSQL", "Grafana"],
  },
  {
    role: "Undergraduate Research Assistant",
    organization: "Systems Lab, Your University",
    period: "Jan 2024 – Present",
    highlights: [
      "Implemented and benchmarked consensus protocol variants for a paper on geo-distributed replication.",
      "Maintain the lab's shared experiment harness and CI pipeline.",
    ],
    tags: ["Rust", "Python", "Docker", "GitHub Actions"],
  },
];

export const projects: Project[] = [
  {
    name: "Ledgerline",
    description:
      "A command-line budgeting tool that imports bank CSV exports, categorizes transactions with simple rules, and produces monthly reports.",
    url: "https://github.com/your-username/ledgerline",
    tags: ["Python", "SQLite", "Click"],
  },
  {
    name: "Notebook Sync",
    description:
      "A small browser extension that keeps highlights from web articles in sync with a local Markdown folder.",
    url: "https://github.com/your-username/notebook-sync",
    tags: ["TypeScript", "WebExtensions", "Markdown"],
  },
];

export const interests: Interest[] = [
  {
    name: "Distributed systems",
    description:
      "How systems stay correct when parts of them fail. Currently reading through the Raft and Spanner papers again with fresh eyes.",
  },
  {
    name: "Trail running",
    description:
      "Long, slow miles on dirt. Working toward a first 50k.",
  },
  {
    name: "Typography",
    description:
      "A quiet obsession with how text is set. This site is deliberately plain for that reason.",
  },
];
