# Personal website

A minimal personal site with a sticky left sidebar (section links, GitHub / LinkedIn / email, theme toggle) and a main column: profile photo, intro, then Experience, Projects, and Interests. Experience and project rows are compact by default and highlight on hover and reveal a bordered detail box when clicked, tapped, or activated with Enter or Space. Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Run it locally

```bash
npm install
npm run dev
```

Then open [http://localhost:4617](http://localhost:4617).

Other scripts:

- `npm run build` – production build
- `npm run start` – serve the production build on port 4617
- `npm run lint` – lint with ESLint

## Editing the content

All text on the site lives in one file: [`src/content.ts`](src/content.ts). You should not need to touch any other file to update the site.

| What you want to change | Where |
| --- | --- |
| Your name and intro paragraphs | `profile` |
| Your profile photo | `profile.image` |
| GitHub / LinkedIn / email / résumé links in the sidebar | `profile.links` |
| Jobs, internships, research | `experiences` |
| Things you've built | `projects` |
| Hobbies and topics you care about | `interests` |

### Links inside text

Intro paragraphs, highlights, and descriptions accept Markdown-style links:

```ts
"A CS student @ [UWaterloo](https://uwaterloo.ca), spending spare time climbing."
```

### Adding an entry

Copy an existing object in the array and edit it. For example, a new experience:

```ts
{
  category: "professional", // or "research"
  organization: "CS 101, Your University",
  role: "Teaching Assistant",
  location: "Waterloo, ON",   // optional
  period: "Fall 2025",
  highlights: [
    "Led two weekly discussion sections for ~60 students.",
  ],
  tags: {
    languages: ["Python"],
    libraries: [],
    tools: [],
  },
},
```

What shows where:

- **Always visible (collapsed row):** logo, `organization` (or project `name`), `role` + `location` (or project `location`), and `period` / `year` on the right.
- **Revealed on hover:** a detail box with `tags.languages`, `tags.libraries`, and `tags.tools` as labeled pills. Click “Click to expand” to reveal `highlights` or a project `description`; use “Click to collapse” to hide that detail again.

Set an experience `category` to `"professional"` or `"research"` to place it in the corresponding section. Leave `highlights` or any tag category as `[]` to omit it. Edit these fields in `src/content.ts`; tags are display labels, not visitor input fields.

### Removing an entry

Delete the object from the array. If an array becomes empty, its whole section (and its sidebar link) disappears from the page automatically.

### Images

Put image files in the `public/` folder and reference them by their path from that folder:

- **Profile photo:** drop a file at `public/images/profile.jpg` (any name works) and set `profile.image` to `"/images/profile.jpg"`. Until you do, a dashed placeholder circle is shown. A square image looks best because it is cropped to a circle.
- **Logos:** drop a file in `public/images/logos/` and set `logo` on the experience or project, e.g. `logo: "/images/logos/acme.svg"`. Entries without a logo show initials instead. `public/images/logos/acme.svg` is a sample you can delete.

### Sidebar links

Each entry in `profile.links` needs an `icon`: `"github"`, `"linkedin"`, `"mail"`, `"globe"`, or `"file"`. To add a résumé, put a PDF in `public/` and add `{ label: "Resume", href: "/resume.pdf", icon: "file" }`. To add another icon, register it in `src/components/icons.tsx` and add its name to the `LinkIcon` type in `src/content.ts`.

### Dark mode

The sidebar has a Dark mode / Light mode toggle, and the "P.S. try turning the light on" line under the intro toggles it too. The site follows the visitor's system preference by default and remembers their choice. Colors come from the CSS variables in `src/app/globals.css` (`:root` for light, `.dark` for dark); `--link` controls the inline link color.

## Project layout

```
public/
  images/
    logos/               # logos referenced from content.ts
src/
  content.ts             # all site content – edit this
  app/
    layout.tsx           # font, <head> metadata, theme provider
    page.tsx             # page structure and styling
    globals.css          # Tailwind + light/dark theme variables
  components/
    sidebar.tsx          # left column (desktop) / top bar (mobile)
    expandable-row.tsx   # click / tap to toggle details
    rich-text.tsx        # renders [text](url) links inside strings
    theme-hint.tsx       # the "P.S." line
    theme-provider.tsx
    theme-toggle.tsx
    icons.tsx            # GitHub, LinkedIn, and other sidebar icons
    ui/badge.tsx         # shadcn/ui Badge used for tags
```
