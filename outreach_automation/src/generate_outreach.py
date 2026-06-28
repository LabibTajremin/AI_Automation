"""
Generate personalized cold outreach messages for small-business leads.

Input:  data/leads.csv with columns: name, business_type, pain_point, channel
Output: output/outreach_drafts.csv with an added "message" column

Usage:
    python src/generate_outreach.py
"""
import csv
from pathlib import Path

from gemini_client import generate

ROOT = Path(__file__).resolve().parent.parent
LEADS_FILE = ROOT / "data" / "leads.csv"
OUTPUT_FILE = ROOT / "output" / "outreach_drafts.csv"

PROMPT_TEMPLATE = """You are writing a short, casual cold outreach message from a freelance software \
engineer who builds AI-powered automations for small businesses. The engineer has no marketing \
budget and is offering a free or heavily discounted first automation in exchange for a testimonial.

Write a {channel} message (under 60 words, no fluff, no hashtags, no emojis, not salesy) for this lead:
- Name: {name}
- Business type: {business_type}
- Likely pain point: {pain_point}

The message should:
1. Reference the specific pain point.
2. Offer a free 15-minute audit or a discounted first automation.
3. End with a low-friction call to action (one question).

Output only the message text, nothing else."""


def main():
    if not LEADS_FILE.exists():
        raise FileNotFoundError(f"Missing {LEADS_FILE}. Create it from leads.example.csv first.")

    OUTPUT_FILE.parent.mkdir(exist_ok=True)

    with LEADS_FILE.open(newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))

    results = []
    for row in rows:
        prompt = PROMPT_TEMPLATE.format(
            channel=row.get("channel", "LinkedIn"),
            name=row["name"],
            business_type=row["business_type"],
            pain_point=row["pain_point"],
        )
        message = generate(prompt)
        results.append({**row, "message": message})
        print(f"Generated message for {row['name']} ({row['business_type']})")

    fieldnames = list(results[0].keys()) if results else []
    with OUTPUT_FILE.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(results)

    print(f"\nWrote {len(results)} drafts to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
