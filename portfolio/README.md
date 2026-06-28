# Portfolio Landing Page

A single static page linking all the AI micro-tools in this repo, meant to be the one
URL you send in cold outreach instead of five separate localhost links.

Live demos aren't deployed publicly on purpose: each tool's server holds a Gemini API
key, and a public deployment without rate-limiting or auth would let anyone burn your
free quota. Instead this page links to source + a "book an audit" CTA — you demo live
on a call or via a screen recording.

## Deploy for free with GitHub Pages

1. On GitHub: go to the repo → **Settings → Pages**.
2. Under "Build and deployment", set **Source** to "Deploy from a branch".
3. Set **Branch** to `main` and folder to `/portfolio`, then Save.
4. GitHub gives you a free URL like `https://labibtajremin.github.io/AI_Automation/`.

That's it — no build step, no server, $0/month.

## Editing

- Update the email in the "Book a free automation audit" button and the About section
  if you want a different contact method.
- Add a screenshot/GIF per card once you've recorded demos (drop images in this folder
  and reference them with `<img>` tags in `index.html`).
