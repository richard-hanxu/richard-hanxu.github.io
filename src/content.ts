/**
 * Everything shown on the site lives in this file.
 *
 * To add an entry, copy an existing object in the relevant array and change
 * the text. To remove one, delete the object. Sections with an empty array
 * are hidden automatically, so you can leave a list empty while you fill it in.
 *
 * Any text field marked "supports links" can contain Markdown-style links:
 *   "I study at [UWaterloo](https://uwaterloo.ca)."
 */

/**
 * Icons available for sidebar links. Add a new one in
 * src/components/icons.tsx if you need something else.
 */
export type LinkIcon = "github" | "linkedin" | "mail" | "globe" | "file";

export type Link = {
  label: string;
  href: string;
  icon: LinkIcon;
};

export type Experience = {
  /** Shown in bold as the row title. */
  organization: string;
  /** Shown under the title, e.g. your job title. */
  role: string;
  /** Optional. City, "Remote", etc. Shown after the role. */
  location?: string;
  /** Shown on the right, e.g. "2025" or "Jan 2024 – Present". */
  period: string;
  /** Optional. A "Visit" link appears in the expanded details if provided. */
  url?: string;
  /**
   * Optional. Path to a logo inside the public/ folder, e.g.
   * "/images/logos/acme.png". Square images (or SVGs) look best.
   * When omitted, the organization's initials are shown instead.
   */
  logo?: string;
  /** Revealed on hover. Each string becomes a bullet point. Supports links. */
  highlights: string[];
  /** Revealed on hover. Tools, languages, or frameworks. */
  tags: string[];
};

export type Project = {
  /** Shown in bold as the row title. */
  name: string;
  /** Shown under the title, e.g. "Personal project" or "Hack the North". */
  location: string;
  /** Shown on the right, e.g. "2025". */
  year: string;
  /** Optional. A "Visit" link appears in the expanded details if provided. */
  url?: string;
  /** Optional. Same rules as experience logos. */
  logo?: string;
  /** Revealed on hover. Supports links. */
  description: string;
  /** Revealed on hover. */
  tags: string[];
};

export type Interest = {
  name: string;
  /** Supports links. */
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
   * paragraph, so add or remove strings freely. Supports links.
   */
  intro: [
    "A CS student @ [Your University](https://example.edu), spending spare time climbing rocks and writing for this site. Also occasionally found geeking out over distributed systems, DSA problems, and other people's personal websites.",
    "Previously built platform features at [Acme Robotics](https://example.com). Also served as a research assistant in the [Systems Lab](https://example.edu/systems), benchmarking consensus protocols for geo-distributed replication.",
    "This site is a collection of things I've made, organized loosely into a few categories. Feel free to take a look around.",
  ],
  /**
   * Icon links in the sidebar. Delete or reorder freely. To add a résumé,
   * drop a PDF in public/ and add:
   *   { label: "Resume", href: "/resume.pdf", icon: "file" },
   */
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
    {
      label: "Email",
      href: "mailto:you@example.com",
      icon: "mail",
    },
  ] as Link[],
};

export const experiences: Experience[] = [
  {
    organization: "Acme Robotics",
    role: "Software Engineering Intern",
    location: "Toronto, ON",
    period: "2025",
    url: "https://example.com",
    logo: "/images/logos/acme.svg",
    highlights: [
      "Built an internal dashboard for monitoring fleet telemetry, cutting time-to-diagnose for field issues from hours to minutes.",
      "Wrote a Go service that batched sensor uploads and reduced ingestion cost by roughly 30%.",
    ],
    tags: ["Go", "TypeScript", "React", "PostgreSQL", "Grafana"],
  },
  {
    organization: "Systems Lab, Your University",
    role: "Undergraduate Research Assistant",
    period: "2024 – Present",
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
    location: "Personal project",
    year: "2025",
    url: "https://github.com/your-username/ledgerline",
    description:
      "A command-line budgeting tool that imports bank CSV exports, categorizes transactions with simple rules, and produces monthly reports.",
    tags: ["Python", "SQLite", "Click"],
  },
  {
    name: "Notebook Sync",
    location: "Hackathon build",
    year: "2024",
    url: "https://github.com/your-username/notebook-sync",
    description:
      "A small browser extension that keeps highlights from web articles in sync with a local Markdown folder.",
    tags: ["TypeScript", "WebExtensions", "Markdown"],
  },
];

export const interests: Interest[] = [
  {
    name: "Distributed systems",
    description:
      "How systems stay correct when parts of them fail. Currently reading through the [Raft](https://raft.github.io/) and Spanner papers again with fresh eyes.",
  },
  {
    name: "Climbing",
    description: "Mostly bouldering, occasionally outdoors when the weather cooperates.",
  },
  {
    name: "Typography",
    description:
      "A quiet obsession with how text is set. This site is deliberately plain for that reason.",
  },
];
