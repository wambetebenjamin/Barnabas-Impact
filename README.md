# Barnabas Impact

Show the work. Earn the trust.

Barnabas Impact is a recording and reporting tool for Kenyan NGOs, CBOs, and community programmes. It helps small teams log beneficiary records, activities, finance summaries, volunteers, and evidence, then publish a selected impact summary and export a PDF.

> Barnabas Impact is a recording and reporting tool. It is not an auditor and does not provide assurance opinions.

## Local development

Use Node.js 24 or newer (`.nvmrc` is set to `24`).

```sh
npm ci
cp .env.example .env.local
npm run dev
```

The site can render marketing and sample pages without service credentials. Account registration and dashboard storage require Vercel KV credentials. Evidence uploads require a Vercel Blob token. Google sign-in requires OAuth credentials. Email delivery requires SMTP credentials. Public reCAPTCHA checks require v3 site and secret keys; low-score step-up uses a v2 site key.

## Verification

Next.js 16 no longer provides the `next lint` CLI command, so `npm run lint` runs the TypeScript no-emit check instead.

```sh
npx tsc --noEmit
npm run lint
npm run build
npm audit --audit-level=high
```

## Template reference

The original uploaded Vite/MUI template remains extracted in its original tree. See [`ZIP_STRUCTURE.md`](./ZIP_STRUCTURE.md) for the read-only archive tree and [`TEMPLATE_AUDIT.md`](./TEMPLATE_AUDIT.md) for the source audit.

Pexels photographs and their source pages are listed in [`image-credits.md`](./image-credits.md).
