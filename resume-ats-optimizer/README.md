# Resume ATS Optimizer

Paste a resume and a job description, get a match score, missing keywords, and concrete
rewrite suggestions — powered by Gemini's free API tier.

Two uses:
1. **Your own job search** — run your resume against postings you're applying to.
2. **Sellable micro-tool** — niche audience (job seekers) who'd pay a few dollars per
   optimization or a small monthly fee for unlimited use.

## Setup (free)

1. Get a free Gemini API key: https://aistudio.google.com/app/apikey
2. `npm install`
3. `cp .env.example .env` and paste your key in
4. `npm start`
5. Open http://localhost:3001

## Monetization ideas

- One-time micro-payment per optimization (Stripe Checkout, free until you earn).
- Free tier (3 optimizations/day) + paid unlimited tier for job seekers using LinkedIn/Indeed.
- Distribute on r/jobs, r/resumes, r/cscareerquestions as a free tool first to build trust,
  then add payment once you have users.
