# Outreach Automation

Zero-cost AI toolkit for generating personalized cold outreach messages and freelance
proposals in bulk, so you can apply/reach out to far more leads and jobs per day than
writing each one by hand. Built on Gemini's free API tier.

Goal: maximize the number of high-quality, personalized touches per day — that's the
actual bottleneck to landing a first paying client/gig within a week, not finding leads.

## Setup (free)

1. Get a free Gemini API key: https://aistudio.google.com/app/apikey
2. `cd outreach_automation`
3. `pip install -r requirements.txt`
4. `cp .env.example .env` and paste your key into `.env`

## 1. Cold outreach to small-business leads

1. Copy `data/leads.example.csv` to `data/leads.csv` and fill in real leads you've found
   on LinkedIn/Instagram/Facebook groups (columns: name, business_type, pain_point, channel).
2. Run:
   ```
   python src/generate_outreach.py
   ```
3. Review `output/outreach_drafts.csv` and send each message manually (sending should stay
   manual — automated mass-DMing gets accounts banned and looks spammy).

## 2. Tailored proposals for freelance job postings (Upwork/Contra)

1. Edit `FREELANCER_BIO` in `src/generate_proposal.py` to match your real background.
2. Copy `data/job_postings.example.csv` to `data/job_postings.csv` and paste in real job
   postings you're considering (columns: title, description).
3. Run:
   ```
   python src/generate_proposal.py
   ```
4. Review `output/proposal_drafts.csv`, tweak each proposal lightly, and submit manually.

## Notes

- Always read AI-generated drafts before sending — they're a first draft to save you
  typing time, not a substitute for a final human pass.
- The Gemini free tier has rate limits; the client retries with backoff but if you're
  generating hundreds of messages in one run, add small delays between calls.
