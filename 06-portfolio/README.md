# Portfolio

My personal portfolio — a single page built with React and Vite, with a working
contact form that sends real email through Gmail SMTP.

## Features

- Hero with a typing effect, animated gradient ring and floating tech chips
- Scroll-reveal animations on every section, and counters that count up
- Services, grouped skill bars, and a project grid with category filters
- Dark and light themes, remembered between visits
- A contact form that actually sends — no `mailto:`, no third-party form service

## The contact form

The form posts to `/api/contact`, a serverless function that sends the message
over SMTP with `nodemailer`. The credentials live in environment variables, so
they never reach the browser and never enter the repository.

It also:

- rejects requests with a filled honeypot field, silently, so bots see success
- rate-limits to 3 messages per minute per IP
- validates and caps the length of every field
- sets `replyTo` to the sender, so hitting Reply in the inbox goes to them

The same function runs locally: `vite.config.js` mounts it as dev middleware, so
`npm run dev` behaves like production.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Fill `.env` with a Gmail **app password** (a normal account password will not
work — Google stopped accepting those):

```
SMTP_USER=you@gmail.com
SMTP_PASS=your16charapppassword
CONTACT_TO=you@gmail.com
```

Create one at <https://myaccount.google.com/apppasswords> — 2-step verification
has to be on first.

## Deploying to Vercel

1. Import the repository and set **Root Directory** to `06-portfolio`
2. Add `SMTP_USER`, `SMTP_PASS` and `CONTACT_TO` under Environment Variables
3. Deploy — Vercel picks up `api/contact.js` as a serverless function on its own

`vercel.json` adds security headers, including a content security policy that
allows only same-origin scripts, styles and connections.

## Project structure

```
api/
  contact.js         # serverless SMTP handler
src/
  data.js            # every piece of content on the page
  App.jsx
  index.css          # tokens, layout and both themes
  components/        # Navbar, Hero, About, Services, Skills, Projects, Contact, Footer
  hooks/             # useScrollReveal, useCountUp, useTheme
vercel.json          # security headers
```
