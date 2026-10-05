# MarketPilot AI — Free MVP

This is a self-contained prototype for an AI marketing automation SaaS.

## Run locally
1. Open `index.html` directly in a browser, or use VS Code Live Server.
2. Save a business profile.
3. Generate the marketing plan, content, SEO ideas and campaign plans.

The browser MVP stores demo data in localStorage. No API key is required.

## Real AI
For production, connect `/api/ai` to your chosen AI provider. Keep the API key in a server environment variable.

## Publish
### Easiest static MVP
Upload the project to GitHub and enable GitHub Pages. The frontend works without a backend, but it uses the local demo AI engine.

### Production
Use a backend/serverless function for AI calls and database authentication. Never expose provider secrets in frontend JavaScript.

## Important limitation
Real Instagram/Facebook/Google publishing and advertising require the appropriate official APIs, OAuth permissions, business assets and, for ad spend, the customer's own advertising account/budget. This package intentionally does not contain fake credentials or pretend those actions are live.
