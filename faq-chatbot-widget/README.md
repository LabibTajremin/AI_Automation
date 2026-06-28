# FAQ Chatbot Widget

A minimal "RAG-lite" FAQ chatbot: paste a business's FAQ/knowledge base text once, then
ask questions as a customer would. The bot answers only from that text and admits when
it doesn't know — powered by Gemini's free API tier.

This is the strongest demo for Opportunity #1 (AI automation for SMBs) — it directly
shows a business owner their own customer-support workload being automated.

## Setup (free)

1. Get a free Gemini API key: https://aistudio.google.com/app/apikey
2. `npm install`
3. `cp .env.example .env` and paste your key in
4. `npm start`
5. Open http://localhost:3004

## How to use it as a sales demo

1. Find a real business's FAQ page (dentist, e-commerce shop, real estate agency).
2. Paste their actual FAQ text into the box.
3. Screen-record yourself asking 3-4 realistic customer questions and getting instant answers.
4. Use that recording in cold outreach: "Here's a chatbot answering your actual FAQ — want
   this embedded on your site?"

## Notes / next steps for a real product

- This demo keeps the FAQ text in the browser for simplicity — a real version would store
  it server-side per business (e.g. in a free-tier Postgres/Supabase table) and embed the
  widget via a small `<script>` snippet on the client's site.
- For larger FAQs that don't fit in one prompt, you'd add a vector search step (e.g. free
  tier of a vector DB) instead of stuffing all the text into context.
