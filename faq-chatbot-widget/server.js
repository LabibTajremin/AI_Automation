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

const PROMPT_TEMPLATE = `You are a customer support assistant for a business. Answer the customer's \
question using ONLY the FAQ/knowledge base text below. If the answer isn't covered in the FAQ, say \
you don't have that information and suggest contacting the business directly — do not make anything up.

Keep the answer short (under 80 words) and friendly.

FAQ / knowledge base:
"""
{faq}
"""

Customer question: {question}

Output only the answer, nothing else.`;

app.post("/api/ask", async (req, res) => {
  const { faq, question } = req.body ?? {};
  if (!faq || !question) {
    return res.status(400).json({ error: "Both faq and question are required." });
  }

  try {
    const prompt = PROMPT_TEMPLATE.replace("{faq}", faq).replace("{question}", question);
    const result = await callGemini(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`faq-chatbot-widget running on http://localhost:${PORT}`));
