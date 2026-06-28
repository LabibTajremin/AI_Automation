import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { callGemini } from "./gemini.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

const PROMPT_TEMPLATE = `You are a sales/customer-success assistant. Read the call or meeting transcript \
below and write a short, professional follow-up email to the prospect/client.

The email should:
1. Thank them for their time.
2. Summarize the 2-4 key points discussed (decisions, pain points, requests).
3. List clear next steps with an owner for each (you or them).
4. End with a specific call to action (e.g. propose a date for the next call).

Keep it under 200 words, no fluff, no generic phrases like "I hope this email finds you well."

Transcript:
"""
{transcript}
"""

Output only the email (with a subject line), nothing else.`;

app.post("/api/generate", async (req, res) => {
  const { transcript } = req.body ?? {};
  if (!transcript) {
    return res.status(400).json({ error: "transcript is required." });
  }

  try {
    const prompt = PROMPT_TEMPLATE.replace("{transcript}", transcript);
    const result = await callGemini(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`transcript-to-followup running on http://localhost:${PORT}`));
