# Backend

A simple Express + TypeScript backend with MongoDB, JWT auth, and form submission.

## Requirements

- Node.js 18+
- MongoDB (local or Atlas)

## Setup

1. Install dependencies:
   - `npm.cmd install`

2. Create or update the environment file at `src/.env`:

   ```env
   PORT=5000
   DB_LOCAL=mongodb://localhost:27017/ngo
   DB_DEV=your_atlas_connection_string
   DB_PROD=your_production_connection_string
   JWT_SECRET=your_secret
   JWT_EXPIRY=30
   ```

## Scripts

- `npm.cmd run local` - run with `DB_LOCAL`
- `npm.cmd run dev` - run with `DB_DEV`
- `npm.cmd run build` - build TypeScript
- `npm.cmd run start` - build and run with `DB_PROD`

## API Endpoints

Base URL: `http://localhost:5000`

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`

### Forms

- `POST /api/forms/submit` (admin only)

## Notes

- Mongoose uses pluralized collection names by default.
  - `User` -> `users`
  - `Form` -> `forms`
