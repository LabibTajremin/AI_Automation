# Review Sentiment Summarizer

Paste a batch of customer reviews, get a sentiment breakdown, top praises/complaints,
and suggested actions — powered by Gemini's free API tier.

This is the exact "demo automation" idea from the AI-automation-consultant roadmap:
e-commerce shops and local businesses sit on piles of review text they never analyze.

## Setup (free)

1. Get a free Gemini API key: https://aistudio.google.com/app/apikey
2. `npm install`
3. `cp .env.example .env` and paste your key in
4. `npm start`
5. Open http://localhost:3003

## Monetization ideas

- Use this as a live demo when cold-outreaching e-commerce sellers/local businesses
  ("I ran your Google/Etsy reviews through this — here's what your customers actually say").
- Turn into a recurring service: pull reviews monthly, email the business owner a report.
  $50-150/month retainer per client.
