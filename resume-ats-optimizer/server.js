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

const PROMPT_TEMPLATE = `You are an ATS (Applicant Tracking System) resume optimizer. Compare the resume \
below against the job description and produce:

1. "Match score" out of 100 for how well the resume matches the job description's keywords/requirements.
2. "Missing keywords": a bullet list of important skills/terms from the job description that are absent \
or weakly represented in the resume.
3. "Rewrite suggestions": 3-5 concrete, specific bullet-point rewrites of existing resume lines that would \
incorporate missing keywords naturally, without fabricating experience the candidate doesn't have.

Resume:
"""
{resume}
"""

Job description:
"""
{job_description}
"""

Respond in plain text with the three sections clearly labeled.`;

app.post("/api/optimize", async (req, res) => {
  const { resume, jobDescription } = req.body ?? {};
  if (!resume || !jobDescription) {
    return res.status(400).json({ error: "Both resume and jobDescription are required." });
  }

  try {
    const prompt = PROMPT_TEMPLATE.replace("{resume}", resume).replace(
      "{job_description}",
      jobDescription
    );
    const result = await callGemini(prompt);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`resume-ats-optimizer running on http://localhost:${PORT}`));
