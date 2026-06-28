"""
Generate tailored freelance proposals (Upwork/Contra-style) for job postings.

Input:  data/job_postings.csv with columns: title, description
Output: output/proposal_drafts.csv with an added "proposal" column

Usage:
    python src/generate_proposal.py
"""
import csv
from pathlib import Path

from gemini_client import generate

ROOT = Path(__file__).resolve().parent.parent
JOBS_FILE = ROOT / "data" / "job_postings.csv"
OUTPUT_FILE = ROOT / "output" / "proposal_drafts.csv"

# Edit this to reflect your real background.
FREELANCER_BIO = """5 years of professional software engineering experience. Comfortable with
backend APIs, system architecture, and integrating LLMs (Claude, Gemini) into production
workflows, including AI agents with tool use and RAG pipelines. Recently built AI-powered
automation workflows (n8n + Gemini) for small businesses."""

PROMPT_TEMPLATE = """You are a freelance software engineer applying to jobs on Upwork. Write a short, \
non-templated proposal (under 100 words) for the job posting below. Reference at least one specific \
detail from the posting so it doesn't read as generic. Keep tone confident but not boastful. End with \
a specific question about the project, not a generic "let's chat."

Freelancer background:
{bio}

Job title: {title}
Job description: {description}

Output only the proposal text, nothing else."""


def main():
    if not JOBS_FILE.exists():
        raise FileNotFoundError(f"Missing {JOBS_FILE}. Create it from job_postings.example.csv first.")

    OUTPUT_FILE.parent.mkdir(exist_ok=True)

    with JOBS_FILE.open(newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))

    results = []
    for row in rows:
        prompt = PROMPT_TEMPLATE.format(
            bio=FREELANCER_BIO,
            title=row["title"],
            description=row["description"],
        )
        proposal = generate(prompt)
        results.append({**row, "proposal": proposal})
        print(f"Generated proposal for: {row['title']}")

    fieldnames = list(results[0].keys()) if results else []
    with OUTPUT_FILE.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(results)

    print(f"\nWrote {len(results)} proposals to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
