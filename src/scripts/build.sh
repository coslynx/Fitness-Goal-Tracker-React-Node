#!/bin/bash

# Set environment variables
export NEXT_PUBLIC_API_URL=http://localhost:3001
export DATABASE_URL=mongodb://localhost:27017/fitness-goal-tracker
export GOOGLE_CLIENT_ID=[YOUR_GOOGLE_CLIENT_ID]
export GOOGLE_CLIENT_SECRET=[YOUR_GOOGLE_CLIENT_SECRET]
export FACEBOOK_CLIENT_ID=[YOUR_FACEBOOK_CLIENT_ID]
export FACEBOOK_CLIENT_SECRET=[YOUR_FACEBOOK_CLIENT_SECRET]
export JWT_SECRET=[YOUR_JWT_SECRET]
export SENTRY_DSN=[YOUR_SENTRY_DSN]

# Build the Next.js application
npm run build

# Deploy to Vercel
vercel deploy --prod --token [YOUR_VERCEL_TOKEN] --yes