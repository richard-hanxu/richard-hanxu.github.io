# Personal website

A minimal single-column personal site: an introduction, then Experience, Projects, and Interests sections, with a sticky header holding your GitHub and LinkedIn links. Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

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
| Your name, intro paragraphs, email | `profile` |
| Your profile photo | `profile.image` |
| GitHub / LinkedIn (or any other) header links | `profile.links` |
| Jobs, internships, research | `experiences` |
| Things you've built | `projects` |
| Hobbies and topics you care about | `interests` |

### Adding an entry

Copy an existing object in the array and edit it. For example, a new experience:

```ts
{
  role: "Teaching Assistant",
  organization: "CS 101, Your University",
  period: "Fall 2025",
  highlights: [
    "Led two weekly discussion sections for ~60 students.",
  ],
  tags: ["Python", "Teaching"],
},
```

- `highlights` renders as bullet points. Leave it empty (`[]`) if you don't want bullets.
- `tags` renders as small pills under the entry. Put tools, languages, or frameworks here.
- `url` is optional on experiences and projects. When set, the organization or project name becomes a link.

### Removing an entry

Delete the object from the array. If an array becomes empty, its whole section (and its nav link) disappears from the page automatically.

### Images

Put image files in the `public/` folder and reference them by their path from that folder:

- **Profile photo:** drop a file at `public/images/profile.jpg` (any name works) and set `profile.image` to `"/images/profile.jpg"`. Until you do, a dashed placeholder circle is shown. A square image looks best because it is cropped to a circle.
- **Company logos:** drop a file in `public/images/logos/` and set `logo` on the experience entry, e.g. `logo: "/images/logos/acme.svg"`. Entries without a logo show the organization's initials instead. `public/images/logos/acme.svg` is a sample you can delete.

### Header icons

Each entry in `profile.links` can set `icon` to `"github"`, `"linkedin"`, `"mail"`, or `"globe"`. Leave `icon` out to show the label as text instead. To add another icon, register it in `src/components/icons.tsx` and add its name to the `LinkIcon` type in `src/content.ts`.

### Dark mode

The header has a sun/moon toggle. The site follows the visitor's system preference by default and remembers their choice in `localStorage`. Colors come from the CSS variables in `src/app/globals.css` (`:root` for light, `.dark` for dark), so adjust those if you want a different palette.

## Project layout

```
public/
  images/
    logos/            # company logos referenced from content.ts
src/
  content.ts          # all site content – edit this
  app/
    layout.tsx        # font, <head> metadata, theme provider
    page.tsx          # page structure and styling
    globals.css       # Tailwind + light/dark theme variables
  components/
    icons.tsx         # GitHub, LinkedIn, and other header icons
    theme-provider.tsx
    theme-toggle.tsx  # sun/moon button in the header
    ui/badge.tsx      # shadcn/ui Badge used for tags
```
