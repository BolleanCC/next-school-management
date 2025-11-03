# School Management Dashboard

A role-based school management platform built with Next.js 15, Clerk authentication, Prisma ORM, and Tailwind CSS. It provides dedicated dashboards for admins, teachers, students, and parents to manage schedules, classes, announcements, assessments, and attendance in a unified interface.

## Contents

- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Data Model](#data-model)
- [Environment Variables](#environment-variables)
- [Setup & Development](#setup--development)
- [Core NPM Scripts](#core-npm-scripts)
- [Clerk Auth & Role Routing](#clerk-auth--role-routing)
- [Scheduling & Calendar](#scheduling--calendar)
- [Forms & Validation](#forms--validation)
- [Database Seeding](#database-seeding)
- [Troubleshooting](#troubleshooting)

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **UI**: Tailwind CSS, Recharts, React Big Calendar
- **Auth**: Clerk (multi-role support)
- **Database**: PostgreSQL via Prisma ORM
- **Forms**: React Hook Form + Zod validation
- **State/Data**: Server Actions, Prisma queries, suspense-ready React components

## Key Features

- Role-aware dashboards for `admin`, `teacher`, `student`, and `parent`
- Centralized menus with dynamic visibility (`src/components/Menu.tsx`)
- Interactive class and event scheduling with weekly calendar views
- CRUD flows for lessons, classes, exams, assignments, results, announcements, and events
- Analytics widgets (counts, finance, performance) with Recharts visualizations
- Attendance and result tracking per student
- Clerk-powered authentication and middleware-based route protection
- Prisma schema covering admins, teachers, students, parents, lessons, exams, assignments, attendance, events, and announcements

## Project Structure

```text
next-dashboard-ui/
├── prisma/                  # Prisma schema, migrations, and seed script
├── public/                  # Static assets (images, icons, etc.)
├── scripts/                 # Utility scripts (attendance duplication checks)
├── src/
│   ├── app/
│   │   ├── (dashboard)/     # Role-specific dashboards and list pages
│   │   │   ├── admin/       # Admin landing page
│   │   │   ├── teacher/     # Teacher dashboard (schedule + announcements)
│   │   │   ├── student/     # Student dashboard (class schedule & events)
│   │   │   ├── parent/      # Parent dashboard with child schedules
│   │   │   └── list/        # Entity listings (students, lessons, events, etc.)
│   │   ├── [[...sign-in]]/  # Clerk custom sign-in page
│   │   └── api/
│   │       └── auth/role/   # API route to resolve a user's role
│   ├── components/          # Reusable UI components (menus, charts, forms)
│   │   └── forms/           # Form-specific components per entity
│   ├── generated/           # Generated Prisma client types
│   └── lib/                 # Prisma client, utilities, settings, server actions
├── next.config.mjs          # Next.js configuration (image domains)
├── tailwind.config.ts       # Tailwind design tokens & layers
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation (this file)
```

### Notable Files

- `src/middleware.ts`: Enforces authentication, resolves roles, and guards routes.
- `src/lib/utils.ts`: Shared helpers including role resolution and calendar utilities.
- `src/lib/action.ts`: Server actions implementing CRUD logic with Prisma.
- `src/components/Menu.tsx`: Builds the sidebar menu according to the signed-in role.
- `src/components/forms/*`: Entity-specific form components leveraged by modals.
- `prisma/schema.prisma`: Source of truth for the database schema and relations.

## Data Model

Prisma models (see `prisma/schema.prisma`) cover the core school domain:

- `Admin`, `Teacher`, `Student`, `Parent`: user entities with shared attributes like contact, address, image, and metadata.
- `Class`, `Grade`, `Subject`: academic structure linking supervisors, grade levels, and subjects.
- `Lesson`: scheduled classroom sessions connecting teachers, subjects, and classes by day/time.
- `Exam`, `Assignment`, `Result`: assessments and their outcomes.
- `Attendance`: daily student attendance linked to lessons.
- `Event`, `Announcement`: extracurricular events and school-wide communications.

Enums:

- `UserSex` (MALE/FEMALE)
- `Day` (MONDAY–FRIDAY)

Refer to the schema for field-level constraints, relations, and cascade rules.

## Environment Variables

Create a `.env` file in the project root with the following keys:

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string used by Prisma |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk frontend key for the Next.js app |
| `CLERK_PUBLISHABLE_KEY` | Server-side publishable key (legacy compatibility) |
| `CLERK_SECRET_KEY` | Clerk backend secret for middleware and server actions |
| `CLERK_SIGN_IN_URL` | (Optional) Override sign-in route, defaults to `/sign-in` |
| `CLERK_SIGN_UP_URL` | (Optional) Override sign-up route if enabled |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | (Optional) Landing path post sign-in |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | (Optional) Landing path post sign-up |

Ensure the Clerk keys match the application configured in the Clerk dashboard. The middleware relies on Clerk session metadata to determine role-based redirects.

## Setup & Development

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env   # create and populate manually (example file optional)

# 3. Generate Prisma client
npx prisma generate

# 4. Run database migrations
npx prisma migrate dev

# 5. Seed the database with sample data
npx prisma db seed

# 6. Start the development server
npm run dev
```

The app runs on `http://localhost:3000` by default. Clerk requires the app's origin to be added to the "Allowed Origins" list in the Clerk dashboard for local development.

### Alternative Package Managers

Yarn, pnpm, or Bun can be used interchangeably (see scripts in `package.json`). Make sure to clear `node_modules` if switching package managers.

## Core NPM Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start Next.js in development mode |
| `npm run build` | Create an optimized production build |
| `npm run start` | Launch the production build |
| `npm run lint` | Run ESLint with the Next.js config |
| `npx prisma migrate dev` | Apply migrations locally |
| `npx prisma db seed` | Seed the database (alias defined in `package.json`) |

## Clerk Auth & Role Routing

- Authentication is handled by Clerk via `ClerkProvider` in `src/app/layout.tsx` and a custom sign-in experience in `src/app/[[...sign-in]]/page.tsx`.
- `src/middleware.ts` leverages Clerk session data to:
  - Redirect unauthenticated requests hitting protected routes (`/admin`, `/teacher`, `/student`, `/parent`, `/list/...`)
  - Resolve roles through `GET /api/auth/role` when metadata is missing
  - Enforce route access using `routeAccessMap` in `src/lib/settings.ts`
- `src/lib/utils.ts#getRole` normalizes role detection for server components, ensuring menus and forms respect the signed-in user's permissions.

## Scheduling & Calendar

- `src/components/BigCalendarContainer.tsx` aggregates lessons per teacher, class, or Clerk user, then maps them into a weekly schedule via `adjustScheduleToCurrentWeek`.
- `src/components/EventCalendarContainer.tsx` renders a month view with `EventList` filtered by query params.
- Teachers and students see personalized calendars; parents see schedules derived from their children's classes.

## Forms & Validation

- Reusable form modals (`src/components/FormModal.tsx`) dynamically load entity-specific forms from `src/components/forms`.
- Each form uses React Hook Form with Zod schemas (`src/lib/formValidationSchemas.ts`) to validate input before executing Prisma-backed server actions defined in `src/lib/action.ts`.
- Teachers are permission-gated: for example, assignment actions verify that the lesson belongs to the teacher.

## Database Seeding

- Run `npx prisma db seed` (or `npm run prisma:seed` if you add an alias) to populate the database with:
  - Admins, teachers, grades, subjects, classes, parents, and students
  - Sample lessons, exams, assignments, results, attendance records, events, and announcements
- Seed users are created with IDs like `teacher1`, `student1`, and `parentId1`. Map these IDs to Clerk users (set as `id` or `clerkUserId`) to experience role-based flows without manual data entry.

## Troubleshooting

- **Stuck on sign-in redirect**: Ensure the Clerk user exists in the Prisma database with an ID matching `userId` or, for teachers, `clerkUserId`. The `/api/auth/role` endpoint requires a matching record to assign a role.
- **No menu items displayed**: Typically indicates `getRole()` could not resolve a role. Confirm user data is seeded and the Clerk session metadata includes `role`, or the database has matching records.
- **Prisma errors**: Verify `DATABASE_URL` points to a reachable PostgreSQL instance and migrations have been run.
- **Attendance duplication scripts**: Use the provided scripts in `scripts/` to detect and clean duplicates before production deployments.
- **Calendar empty**: For teacher dashboards, ensure lessons exist with matching `teacherId` or `clerkUserId`; for parents, confirm students specify `parentId`.

---

Need help or want to contribute? Open an issue or submit a pull request with details about your improvement. Happy building!