# stream-prompt-manager

A small Vite + React + TypeScript app for creating and managing prompt blocks for streaming workflows. Now powered by a PostgreSQL database via Prisma and Express.

## Setup

1.  **Install dependencies**:
    ```bash
    pnpm install
    ```

2.  **Environment Variables**:
    Create a `.env` file with your `DATABASE_URL`:
    ```env
    DATABASE_URL="your-postgresql-url"
    ```

3.  **Database Migration**:
    ```bash
    pnpm prisma db push
    ```

4.  **Seed Data** (Optional):
    ```bash
    pnpm prisma db seed
    ```

5.  **Run the app**:
    ```bash
    pnpm run dev
    ```
    This starts both the Vite frontend (port 5173) and the Express backend (port 3001).

## Tech Stack
-   **Frontend**: React, Vite, TypeScript, Tailwind CSS, Lucide, GSAP, dnd-kit
-   **Backend**: Express, Node.js
-   **Database**: PostgreSQL (Neon), Prisma ORM

