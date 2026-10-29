# Decisions

Status key: **Confirmed** (Mila approved) · **Proposed** (built this way, awaiting approval) · **Open**

| Date | Decision | Status | Notes |
| --- | --- | --- | --- |
| 2026-10-29 | Astro static site, no backend | Proposed | Fast, cheap to host anywhere, easy content edits in one file. |
| 2026-10-29 | Self-host fonts (Playfair Display, Montserrat, Allura) | Proposed | Avoids sending visitor IPs to Google (German GDPR case law). |
| 2026-10-29 | Offer shown as "Your 4-week strength & nutrition foundation" | Proposed | Name unconfirmed: PDF says "Strong Through Your Cycle", business facts say "Strong Foundations". Set `offer.name` once decided. |
| 2026-10-29 | No price shown; "shared after a short fit check" | Proposed | ~€599 standard and founding price are not confirmed. |
| 2026-10-29 | Founding-client section and "limited spots" wording off by default | Proposed | Turn on with `founding.enabled` only with real availability. No testimonials shown. |
| 2026-10-29 | Minimal enquiry form (name, email, goal, message, consent) | Proposed | PDF's 10 fields incl. health/location deferred to the post-fit-check intake, per CLAUDE.md. |
| 2026-10-29 | Form falls back to pre-filled email until a form service is chosen | Proposed | Service choice + DPA is Mila's call. |
| 2026-10-29 | About copy uses the PDF draft; photo placeholder | Proposed | No invented credentials or portrait. |
| 2026-10-29 | Hosting provider | Open | Netlify, Vercel, Cloudflare Pages or a German/EU host all work. |
