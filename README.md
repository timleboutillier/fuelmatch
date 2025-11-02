# FuelMatch MVP (Pilot)

This is a minimal Next.js (App Router) + Supabase starter for your pilot.
It supports: login via magic link, create company (org), post an intent, compute matches, and request intro.

## 1) Env vars
Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=YOUR_VALUE
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_VALUE
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 2) Install & run
```
npm i
npm run dev
```

## 3) Build & deploy on Vercel
- Import this repo from GitHub, add the same env vars in Vercel, deploy.
- After Vercel gives you a URL (e.g., https://fuelmatch.vercel.app), set:
  - NEXT_PUBLIC_SITE_URL to that URL (both in Vercel and Supabase Auth redirect URLs).

## 4) Supabase
- Run the provided schema & seed SQL in the Supabase SQL editor before using the app.
