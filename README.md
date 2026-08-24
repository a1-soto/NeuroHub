# NeuroHub

A resource hub for the neurodivergent community — accessible news, curated resources, a professional directory, and region-by-region guidance on public aid, built with accessibility as a first-class feature rather than an afterthought.

## Origin

NeuroHub started as a WordPress site built for a real client as part of a non-evaluative practice project — branded "neurored.org" internally, but delivered only as a demo and never deployed publicly; that domain isn't live today. This repository is an independent rebuild in React, developed for portfolio purposes — the original project set the initial direction, but scope, design, and technical decisions throughout this rebuild are the author's own, including several deliberate improvements over the original.

## Live Demo

Not deployed yet — the project currently runs locally only. This section will be updated once a production deploy exists.

## Features

- **Accessibility toolbar**, functional end-to-end: low-stimulus mode, reduced motion, a cursor-tracking reading guide, adjustable text size, line height, and color theme (neutral/sepia) — each control updates the whole site live, not just a settings panel.
- **Ayudas**: a region → provincia → municipio drill-down for public aid information, structured after the real site's regional organization.
- **Curated news and resources**, sourced and attributed rather than scraped or invented.
- Responsive layout and WCAG 2.1 AA as a functional accessibility target, not just an automated-audit checkbox.

## Tech Stack

- [Vite](https://vitejs.dev/) + [React 19](https://react.dev/)
- [React Router](https://reactrouter.com/) for routing
- React Context API for shared accessibility state
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) for unit tests
- ESLint (with `eslint-plugin-jsx-a11y`) + Prettier + Husky/`lint-staged`

## Notable Technical Decisions

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

Actively in development. Nav, Footer, the accessibility toolbar, and the Inicio (home) page are built and tested; the remaining pages (Noticias, Recursos, Profesionales, Ayudas, Curso, Blog, Contacto, Donación, Testimonios, and the legal pages) are scaffolded but not yet built out.

## Background

Built as part of [nombre del certificado].
