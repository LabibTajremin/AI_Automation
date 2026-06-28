# Invoice Data Extractor

Paste raw invoice text and get structured JSON (vendor, line items, totals, dates) —
powered by Gemini's free API tier. Targets the "manual data entry" pain point that's
extremely common among small businesses and bookkeepers.

## Setup (free)

1. Get a free Gemini API key: https://aistudio.google.com/app/apikey
2. `npm install`
3. `cp .env.example .env` and paste your key in
4. `npm start`
5. Open http://localhost:3005

## Notes

- This works on text copy-pasted from a PDF/email. A production version would add PDF/image
  parsing (e.g. free-tier OCR or a PDF-to-text library) before this extraction step.
- Strong demo for bookkeepers, accountants, and small businesses doing manual invoice entry
  into spreadsheets or accounting software.

## Monetization ideas

- Pitch to small accounting/bookkeeping firms as a time-saving tool — bill per invoice
  processed or as a monthly retainer once integrated with their workflow (e.g. auto-export
  to Google Sheets/Airtable via Make.com or n8n).
