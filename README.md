# Alex Morgan — voxel developer portfolio

A responsive personal portfolio built with React, TypeScript, Vite, and Three.js. Includes a handcrafted voxel island, day/night lighting, island rotation, project filters, accessible project dialogs, and an email contact panel.

## Live site

[gpt-6-1-sol-test.vercel.app](https://gpt-6-1-sol-test.vercel.app)

The GitHub repository is connected to Vercel. Pushes to `main` deploy to production automatically.

## Run locally

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

## Make it yours

The name, bio, location, projects, email address, and GitHub link in `src/App.tsx` are sample content. Replace them with your own details before publishing. Project previews are original interface concepts, and the detail dialogs identify them as works in progress.

The voxel scene lives in `src/World.tsx`; typography, responsive layouts, and palettes live in `src/styles.css`.
