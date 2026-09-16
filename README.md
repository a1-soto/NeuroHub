# NeuroHub

A resource hub for the neurodivergent community — accessible news, curated resources, a professional directory, and region-by-region guidance on public aid, built with accessibility as a first-class feature rather than an afterthought.

## Origin

NeuroHub started as a WordPress site built for a real client as part of a non-evaluative practice project — branded "neurored.org" internally, but delivered only as a demo and never deployed publicly; that domain isn't live today. This repository is an independent rebuild in React, developed for portfolio purposes — the original project set the initial direction, but scope, design, and technical decisions throughout this rebuild are the author's own, including several deliberate improvements over the original.

## Live Demo

Not deployed yet — the project currently runs locally only. This section will be updated once a production deploy exists.

## Features

- **Accessibility toolbar**, functional end-to-end: low-stimulus mode, reduced motion, a cursor-tracking reading guide, adjustable text size, line height, and color theme (neutral/sepia) — each control updates the whole site live, not just a settings panel.
- **Ayudas**: public aid guidance filtered by comunidad autónoma and type of need (education support, disability recognition, workplace accommodations) — each combination resolves to a real step-by-step procedure, rather than a fabricated province/municipality drill-down (those aid types are comunidad-level competencies in Spain, not local ones).
- **Curated news and resources**, sourced and attributed rather than scraped or invented.
- Responsive layout and WCAG 2.1 AA as a functional accessibility target, not just an automated-audit checkbox.

## Tech Stack

- [Vite](https://vitejs.dev/) + [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) for utility-first styling, layered on top of CSS custom properties for design tokens
- [React Router](https://reactrouter.com/) for routing
- React Context API for shared accessibility state
- [Lucide](https://lucide.dev/) for icons
- [Atkinson Hyperlegible](https://brailleinstitute.org/freefont) + [Lexend](https://www.lexend.com/) as the site's base typography, not just an accessibility-panel option
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) for unit tests
- ESLint (with `eslint-plugin-jsx-a11y`) + Prettier + Husky/`lint-staged`

## Notable Technical Decisions

- **Tailwind CSS v4 over plain CSS** — the project started on a no-framework, plain-CSS default; switched once the site's visual direction made clear that most components map cleanly to utility classes. Design tokens stay the single source of truth: every token lives in one `@theme` block in `src/index.css`, which makes Tailwind auto-generate matching utilities (`--color-primary` → `bg-primary`/`text-primary`), so a component still reaches a token, just as a class name instead of a `var(--color-primary)` reference. Component-specific `.css` files stay where Tailwind utilities don't cover the styling well (SVG filters, composited-alpha contrast fixes, keyframe animations).
- **Context API over Zustand** — Zustand is the practical 2026 default for shared state, but Context is what's built into React, with the fewest new concepts while state management itself is being learned for the first time.
- **JavaScript over TypeScript** — a deliberate scope decision, not a default: learning architecture concepts (state, routing, testing) and TypeScript's own learning curve at the same time would have been too much at once.
- **Reading Guide** — the cursor-tracking highlight strip behind the "Guía de Lectura" toggle is an original addition, not ported from any prior version of the site.

## Getting Started

```bash
npm install
npm run dev
```

Other commands:

```bash
npm run build          # production build, outputs to dist/
npm run lint           # ESLint
npm run format         # Prettier, writes in place
npm test -- --run       # Vitest, single run
```

## Status

Actively in development. Nav, Footer, and the accessibility toolbar are shared and functional across the whole site; Inicio (home), Recursos, Profesionales, and Ayudas are built and tested. The remaining pages (Noticias, Curso, Blog, Contacto, Donación, Testimonios, Quiénes Somos, and the legal pages) are scaffolded but not yet built out.
