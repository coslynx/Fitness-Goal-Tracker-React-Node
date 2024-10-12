#!/bin/bash

# Set environment variables
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

# Optional: Deploy to a different platform (e.g., AWS, Netlify)
# [Your deployment commands for the chosen platform]

# Post-deployment actions
# [Your post-deployment scripts, e.g., cache clearing, data migration, etc.]