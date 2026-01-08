# stream-prompt-manager

A simple Vite + React + TypeScript app for managing prompt blocks. Powered by PostgreSQL via Prisma.

## Setup

1.  **Install**:
    ```bash
    pnpm install
    ```

2.  **Environment**:
    Create a `.env` file:
    ```env
    DATABASE_URL="your-postgresql-url"
    ```

3.  **Database**:
    ```bash
    pnpm prisma db push
    pnpm prisma db seed
    ```

4.  **Run**:
    ```bash
    pnpm dev
    ```

## Deploy to Vercel

1. Push to GitHub
2. Import to Vercel
3. Add `DATABASE_URL` to environment variables
4. Deploy!

## Tech Stack
-   React, Vite, TypeScript, Tailwind, Prisma
-   PostgreSQL (Neon)
-   Vercel Serverless Functions

