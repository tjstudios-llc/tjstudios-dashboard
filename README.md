# TJ Studios Dashboard

The TJ Studios Dashboard is the frontend shell for the TJ Studios platform. It is built with React, Vite, TypeScript, Wouter, TanStack Query, Zustand, and Tailwind CSS.

## Current status

This repository currently contains a UI scaffold, not a connected production control plane.

The API package in this repository currently exposes a health endpoint only. It does not yet provide authenticated endpoints for containers, deployments, databases, storage, billing, team management, API keys, audit logs, or host metrics.

To avoid presenting invented operational information as real, this update removes the hard-coded sample records and simulated dashboard metrics. Sections without a real backend integration now display an explicit integration-pending state.

## Workspace layout

- `artifacts/tj-studios-dashboard` — React/Vite dashboard frontend
- `artifacts/api-server` — Express API scaffold
- `artifacts/mockup-sandbox` — isolated UI experimentation
- `lib/api-client-react`, `lib/api-spec`, `lib/api-zod` — API client and shared contracts
- `lib/db` — shared database package
- `scripts` — workspace scripts

## Requirements

- Node.js 22 or newer
- pnpm

## Development

```bash
pnpm install
pnpm --filter @workspace/tj-studios-dashboard dev
```

The dashboard frontend runs through Vite. The API server is a separate workspace package and requires a `PORT` value:

```bash
PORT=5000 pnpm --filter @workspace/api-server dev
```

## Validation

Run workspace typechecking and builds from the repository root:

```bash
pnpm run typecheck
pnpm run build
```

These commands have not been executed as part of this GitHub review.

## Production blockers

Before deployment as a platform dashboard:

- Implement authentication and authorization.
- Connect frontend routes to real, versioned API endpoints.
- Integrate a restricted host agent for Docker and system operations.
- Persist deployment, database, storage, and audit data.
- Add server-side validation, rate limiting, audit events, and tenant isolation.
- Disable or remove all placeholder controls until their actions are implemented.
- Deploy behind a trusted access layer and enforce server-side permissions on every resource operation.

Do not treat the current frontend as a production management console.
