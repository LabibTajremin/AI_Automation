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

const PROMPT_TEMPLATE = `Extract structured data from the invoice text below. Respond with ONLY valid \
JSON (no markdown fences, no commentary) matching this shape:

{
  "vendor": string,
  "invoice_number": string | null,
  "invoice_date": string | null,
  "due_date": string | null,
  "currency": string | null,
  "line_items": [{ "description": string, "quantity": number | null, "unit_price": number | null, "total": number | null }],
  "subtotal": number | null,
  "tax": number | null,
  "total": number | null
}

If a field isn't present in the text, use null. Do not invent values.

Invoice text:
"""
{invoice_text}
"""`;

app.post("/api/extract", async (req, res) => {
  const { invoiceText } = req.body ?? {};
  if (!invoiceText) {
    return res.status(400).json({ error: "invoiceText is required." });
  }

  try {
    const prompt = PROMPT_TEMPLATE.replace("{invoice_text}", invoiceText);
    const raw = await callGemini(prompt);
    const cleaned = raw.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      return res.json({ result: cleaned, warning: "Could not parse as JSON, returning raw text." });
    }
    res.json({ result: parsed });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`invoice-data-extractor running on http://localhost:${PORT}`));
