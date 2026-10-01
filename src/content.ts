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

/** Tags at the top of each detail box. Leave any category empty to hide it. */
export type TechnologyTags = {
  languages: string[];
  libraries: string[];
  tools: string[];
};

export type Experience = {
  /** Groups this entry under Professional Experience or Research Experience. */
  category: "professional" | "research";
  /** Shown below the role in the row subtitle. */
  organization: string;
  /** Shown in bold as the row title. */
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
  /** Revealed on click. Each string becomes a bullet point. Supports links. */
  highlights: string[];
  /** Technology categories shown above the expanded details. */
  tags: TechnologyTags;
};

export type Project = {
  /** Shown in bold as the row title. */
  name: string;
  /** Optional. Shown under the title, e.g. "Personal project" or "Hack the North". */
  location?: string;
  /** Optional. Shown on the right, e.g. "2025". */
  year?: string;
  /** Optional. A "Visit" link appears in the expanded details if provided. */
  url?: string;
  /** Optional. Same rules as experience logos. */
  logo?: string;
  /** Optional emoji shown in place of initials when no logo is supplied. */
  emoji?: string;
  /** Revealed on click. Supports links. */
  description?: string;
  /** Optional bullet points revealed on click. Each string supports links. */
  highlights?: string[];
  /** Revealed on click. */
  tags: TechnologyTags;
};

export type Interest = {
  name: string;
  /** Supports links. */
  description: string;
};

export const profile = {
  name: "Richard Hanxu",
  /** Appears in the browser tab. */
  siteTitle: "Richard Hanxu",
  /**
   * Path to your profile photo inside the public/ folder, e.g.
   * "/images/profile.jpg". Set to "" to show a placeholder until you add one.
   */
  image: "/images/logos/portrait_website.png",
  /**
   * The introductory paragraph(s). Each string is rendered as its own
   * paragraph, so add or remove strings freely. Supports links.
   */
  intro: [
    "I am currently a first-year [Master of Science in Machine Learning](https://ml.cmu.edu/academics/primary-ms-machine-learning-masters) student at Carnegie Mellon University. I previously received my BaSc in [Engineering Science](https://engsci.utoronto.ca/program/majors/robotics-engineering/) (Robotics Specialization) from the University of Toronto. My interests are in bridging the gap between machine learning and robotics through both research and real applications.",
    "I was a Quantitative Trading Analyst at RBC Capital Markets, where I performed high-frequency signal research and wrote high-performant code for the back-end trading infrastructure.",
    "I am always interested in making connections and potential collaborations, feel free to reach out!"
  ],
  /**
   * Icon links in the sidebar. Delete or reorder freely. To add a résumé,
   * drop a PDF in public/ and add:
   *   { label: "Resume", href: "/resume.pdf", icon: "file" },
   */
  links: [
    {
      label: "GitHub",
      href: "https://github.com/richard-hanxu",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/richard-hanxu-761641174/",
      icon: "linkedin",
    },
    {
      label: "Email",
      href: "mailto:richardhanxu@gmail.com",
      icon: "mail",
    },
    {
      label: "Resume",
      href: "https://drive.google.com/file/d/1G2Zl80CVEWaZa40IA41yjdfzPHqPyhK4/view?usp=sharing",
      icon: "file",
    },
  ] as Link[],
};

export const experiences: Experience[] = [
  {
    category: "professional",
    organization: "RBC Capital Markets",
    role: "Quantitative Trading Analyst",
    location: "Toronto, Canada",
    period: "Aug 2024 - Jul 2026",
    // url: "https://example.com",
    logo: "/images/logos/RBC.png",
    highlights: [
      "Researched mid to high frequency signals and performed markout analysis using Python, KDB+/Q and Polars, rapidly iterating from hypothesis to results and clearly presenting findings to team multiple times per week.",
      "Reimplemented market-making algorithms in C++, reducing round-trip latency by 90% and driving a 50% increase in daily trading volume and 30% increase in PnL.",
      "Built automated backtesting pipelines using Python, scikit-learn and Polars responsible for finding a 1.5 out-of-sample Sharpe ratio over two years on $2 million average daily notional.",
      "Parallelized limit order book data backfills in KDB+/Q using multithreading, reducing load time by 75% from 12 to 3 hours and enabling trading analysis up to 5 years.",
      "Created daily scripts using Python, Bash and SQL to load coefficients for systematic strategies trading hundreds of millions of dollars per day, incorporating validation tests to alert the team immediately of faulty data or failed processes."

    ],
    tags: {
      languages: ["C++", "Python", "KDB+/Q", "SQL", "Bash"],
      libraries: ["scikit-learn", "Polars"],
      tools: ["CMake", "Git", "Linux"],
    },
  },
  {
    category: "professional",
    organization: "aUToronto - University of Toronto AutoDrive Team",
    role: "Mapping Software Engineer Lead",
    location: "Toronto, Canada",
    period: "Sep 2023 – Jun 2025",
    logo: "/images/logos/autoronto.jpg",
    highlights: [
    //  Self Driving Vehicle Design Team
      "Led creation of Python/Qt map editing application to replace unintuitive headless tools, cutting creation time by 87% and enabling rapid updates supporting consecutive 1st-place finishes at the 2024 and 2025 SAE AutoDrive Challenge.",
      "Led implementation of C++ augmented-graph map architecture enabling both efficient global route planning as well as road geometry for smooth local path following.",
      "Built a GPS localization tool using Python, ROS and SciPy, reducing vehicle localization error by 80% from 0.5 m to 0.10 m.",
    ],
    tags: {
      languages: ["Python", "C++"],
      libraries: ["Qt", "ROS", "SciPy", "Open3D"],
      tools: ["CMake", "Git", "Jenkins", "Linux"],
    },
  },
  {
    category: "research",
    organization: "Human Sensing Laboratory",
    role: "VLM Researcher",
    location: "Pittsburgh, PA",
    period: "Sep 2026 – Present",
    logo: "/images/logos/ri_logo.png",
    highlights: [
      "Researching efficient methods to augment internal attention between relevant text tokens and visual tokens of interest in multimodal large language models.",
      "Supervised by Professor Fernando De La Torre."
    ],
    tags: {
      languages: ["Python"],
      libraries: ["PyTorch", "HuggingFace"],
      tools: ["Git"],
    },
  },
  {
    category: "research",
    organization: "People AI & Robots Laboratory",
    role: "ML/Robotics Researcher",
    location: "Toronto, Canada",
    period: "Apr 2023 – Oct 2023",
    logo: "/images/logos/pair-logo-sq-2.png",
    highlights: [
      "Executed validation experiments for a PyTorch vision-language-action architecture integrating CLIP and [Perceiver-Actor](https://peract.github.io/), identifying an error responsible for a 5% performance regression on RLBench.",
      "Built middleware using Python to connect policies to CoppeliaSim simulation environments, enabling visualization and reproducible benchmarking across 20+ manipulation and navigation tasks.",
      "Augmented dataset containing over 200 demonstrations using Python and NumPy to synthesize novel camera viewpoints on corresponding RGB-D point clouds."
    ],
    tags: {
      languages: ["Python"],
      libraries: ["PyTorch", "NumPy", "CoppeliaSim"],
      tools: ["Git"],
    },
  },
  {
    category: "research",
    organization: "Applied Optimization Lab",
    role: "ML Researcher",
    location: "Toronto, Canada",
    period: "Jun 2022 – Aug 2022",
    logo: "/images/logos/applied_optimization.png",
    highlights: [
      "Created a custom dataset of over 40 000 street images for classifying roads based on perceived cyclist stress level.",
      "Evaluated baseline machine learning models (SVM, Decision Trees, FFN) on the dataset, identifying limitations in model performance (57% accuracy) and opportunities for improvement."
    ],
    tags: {
      languages: ["Python"],
      libraries: ["PyTorch", "scikit-learn"],
      tools: ["Git", "GCP", "Google Maps Platform"],
    },
  },
];

export const projects: Project[] = [
  {
    name: "Laundry Folding Robot",
    emoji: "🤖",
    // location: "Undergraduate Thesis",
    // year: "2026",
    url: "https://docs.google.com/document/d/1MnCte1tErtbVneek30vyz5Sf7y7tUAlXavQ9e0AnskU/edit?usp=sharing",
    highlights:[
      "Built a deep reinforcement learning pipeline using PyTorch and [NVIDIA FleX](https://developer.nvidia.com/flex) to train CNN-based policies for smoothing and folding deformable garments. ",
      "Added containerization and distributed training using Ray and Docker allowing for both reusability and efficient training (code release coming soon!).",
    ],
      tags: {
      languages: ["Python"],
      libraries: ["PyTorch", "Ray"],
      tools: ["Linux", "Docker"],
    },
  },
  {
    name: "Solar Power Forecasting Model",
    emoji: "☀️",
    // location: "Undergraduate Thesis",
    // year: "2026",
    url: "https://github.com/richard-hanxu/climatehack2023-2024",
    highlights: [
      "Researched and trained custom LSTM and Transformer based models on hundreds of GB of multimodal satellite data to predict solar PV production across regions of Great Britain. ",
      "Placed 2nd among competitors at the University of Toronto and presented findings at final round at Harvard University.",
    ],
    tags: {
      languages: ["Python"],
      libraries: ["PyTorch"],
      tools: ["AWS", "WandB"],
    },
  },
  {
    name: "Party Icebreaker App",
    emoji: "🥳",
    // location: "Undergraduate Thesis",
    // year: "2026",
    url: "https://github.com/richard-hanxu/OOC_BBQ_App",
    highlights:[
      "Vibe-coded a party app where users can answer icebreaker questions and see which other attendees their responses most/least aligned with. ",
      "Securely stored attendees' information on a Supabase server allowing for easy post-party communication to coordinate cost splitting.",
    ],
    tags: {
      languages: ["TypeScript"],
      libraries: ["React", "Next.js", "Tailwind"],
      tools: ["Codex", "Supabase"],
    },
  },
];

export const interests: Interest[] = [
  {
    name: "Fencing",
    description:
      "Fenced Epee for 7 years until university, now rekindling my passion at CMU's Fencing Club.",
  },
  {
    name: "Sports Analytics",
    description: "My favorite analytics columns are [Silver Bulletin](https://www.natesilver.net/), [The Ringer](https://www.theringer.com/), and Daniel Li's [YouTube](https://www.youtube.com/@DanielLi7) channel.",
  },
  {
    name: "Roguelike Video Games",
    description:
      "I have over 200 hours on both Balatro (Completionist++) and Slay The Spire 2 (A10 on 4 characters).",
  },
];
