# Metrica pixel

Tracker for user inights and events

### Architecture

<p align="center">
  <a href="https://github.com/metrica-to/pixel"><img src="https://github.com/metrica-to/pixel/blob/main/docs/tracker.png" width="600" alt="Metrica Architecture" /></a>
</p>

### Project Structure:

```
.
├── README.md
├── docs
│   ├── ...
├── index.html
├── package.json
├── pnpm-lock.yaml
├── src
│   ├── main.ts
│   ├── pixel-tracker.ts
│   ├── types.ts
│   └── vite-env.d.ts
└── tsconfig.json
```

`main.ts` is where we run an IIFE to execute the tracker in the browser.

### Read more

[Design Decisions](docs/decisions.md)
[How Tracking Works?](docs/how-tracking-works.md)
