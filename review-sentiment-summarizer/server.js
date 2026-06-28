import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { callGemini } from "./gemini.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json({ limit: "2mb" }));
app.use(express.static(path.join(__dirname, "public")));

const PROMPT_TEMPLATE = `You are analyzing customer reviews for a small business. Below is a list of \
raw customer reviews (one per line). Produce a report with:

1. "Overall sentiment": positive/neutral/negative split as rough percentages.
2. "Top praises": 3-5 bullet points of what customers like most, with frequency noted.
3. "Top complaints": 3-5 bullet points of the most common complaints/issues, with frequency noted.
4. "Suggested actions": 2-3 concrete, specific actions the business could take to address the complaints.

Reviews:
"""
{reviews}
"""

Respond in plain text with the four sections clearly labeled.`;

app.post("/api/summarize", async (req, res) => {
  const { reviews } = req.body ?? {};
  if (!reviews) {
    return res.status(400).json({ error: "reviews is required (one review per line)." });
  }

  try {
    const prompt = PROMPT_TEMPLATE.replace("{reviews}", reviews);
    const result = await callGemini(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`review-sentiment-summarizer running on http://localhost:${PORT}`));
