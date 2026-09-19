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

## Project layout

```
src/
  content.ts          # all site content – edit this
  app/
    layout.tsx        # font and <head> metadata
    page.tsx          # page structure and styling
    globals.css       # Tailwind + theme variables
  components/ui/
    badge.tsx         # shadcn/ui Badge used for tags
```
