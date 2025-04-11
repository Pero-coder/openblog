# OpenBlog

![logo](https://i.imgur.com/L6CbstS.png)

Free and opensource blogging social network

## Motivation

I have built this project to get familiar with modern web and database technologies such as React, Next.js and Prisma.

## Features

-   User authentication with GitHub
-   User profiles with customizable usernames, images, and bios
-   Create, read, update, and delete blog posts
-   Image uploads for posts and profiles
-   Markdown support for post content
-   Like and comment system
-   Follow/unfollow users
-   Feed filtering (all posts vs. following)
-   Responsive design

## Tech Stack

-   **Frontend**: React, Next.js 14 (App Router), TypeScript, TailwindCSS
-   **Backend**: Next.js API routes, Prisma ORM
-   **Database**: PostgreSQL
-   **Authentication**: NextAuth.js with GitHub provider
-   **Image Storage**: Vercel Blob
-   **Deployment**: Vercel

## Getting Started

### Prerequisites

-   Node.js (v20 or later recommended)
-   PostgreSQL database
-   GitHub OAuth application
-   Vercel account (for Blob storage)

### Installation

1. Clone the repository

    ```bash
    git clone https://github.com/Pero-coder/openblog.git
    cd openblog
    ```

2. Install dependencies

    ```bash
    npm install
    # or with pnpm
    pnpm install
    ```

3. Set up environment variables (create a .env file)

    ```env
    # NextAuth
    AUTH_SECRET=your-secret-key

    # GitHub OAuth
    AUTH_GITHUB_ID=your-github-client-id
    AUTH_GITHUB_SECRET=your-github-client-secret

    # Database
    POSTGRES_PRISMA_URL=your-postgres-connection-string
    POSTGRES_URL_NON_POOLING=your-postgres-direct-connection-string

    # Vercel Blob
    BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
    ```

4. Set up the database

    ```bash
    npx prisma migrate dev
    ```

5. Run the development server

    ```bash
    npm run dev
    # or
    pnpm dev
    ```

6. Open http://localhost:3000 in your browser

### Project Structure

-   `app/` - Next.js App Router pages and layouts
-   `components/` - React components
-   `prisma/` - Prisma schema and migrations
-   `lib/` - Utility functions and shared code
-   `public/` - Static assets

### Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Set up the environment variables
4. Deploy
