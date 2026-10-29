# Strong with Mila — website v1

A single-page landing site for English-speaking women in Berlin. Built from
`00Context/Strong With Mila Website Design.pdf` and the FigJam flow
"Website visitor → enquiry flow — v1".

**Stack:** [Astro](https://astro.build) (static HTML, almost no JavaScript), TypeScript,
plain CSS with brand tokens, self-hosted fonts (no Google Fonts requests, no cookies, no trackers).

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # type check + production build into dist/
npm run preview    # serve the built site
```

## Editing content (for Mila)

Almost everything you'd want to change lives in **one file: `src/content/site.ts`**.

| Want to change… | Look for |
| --- | --- |
| Offer name, price, location, what's included | `offer` |
| Turn the founding-client offer on/off | `founding.enabled` |
| Button wording | `cta` |
| About text, photo, credentials | `about` (put the photo in `public/images/`) |
| FAQ | `faq` |
| Email / Instagram | `contact` |
| Page title & Google description | `seo` |

Every `TODO(Mila)` comment marks something unconfirmed. Search for it before launch.

## Enquiry form

Fields: name, email, broad goal, optional message, consent. No health data is collected.

- **Default (no setup):** submitting opens the visitor's email app with the enquiry pre-filled,
  addressed to the contact email. It works, but some visitors have no mail app set up.
- **Recommended before launch:** pick a form service (e.g. Formspree, Tally, Web3Forms), sign a
  data-processing agreement, and set `PUBLIC_FORM_ENDPOINT` in `.env` (see `.env.example`).
  The form then sends in the background and shows a success or error message.

## Before going live

See `docs/ROADMAP.md` → "Launch checklist". In short: confirm offer/price/location, add real
photo + logo, choose form service and host, write and legally review Impressum and
Datenschutzerklärung, set `SITE_URL`.

## Structure

```
src/content/site.ts     all editable copy and settings
src/components/         one file per page section
src/layouts/            page shell (SEO tags) and legal-page shell
src/pages/              index, privacy, imprint
src/styles/global.css   design tokens and base styles
```
