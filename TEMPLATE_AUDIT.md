# Uploaded template audit

Template archive: `dnx-v1.0.0 (1).zip`. The complete archive file tree is in [`ZIP_STRUCTURE.md`](./ZIP_STRUCTURE.md). The original extracted tree and file names are retained as a reference alongside the Next.js application.

| Checklist item | Present in uploaded zip? | Location or implementation |
| --- | --- | --- |
| CSS custom properties | Yes, one declaration in the template source | `--DataGrid-rowBorderColor` in `src/theme/components/data-grid/DataGrid.tsx`. `--vertical` appears in a class selector, not as a CSS custom property. |
| `@font-face` rules | No | No `@font-face` declaration is present in the archive. The template uses Plus Jakarta Sans in `src/theme/typography.ts` and loads the font from Google Fonts in `index.html`. The site retains Plus Jakarta Sans. |
| Loading screen | Yes | `src/components/loader/PageLoader.tsx` and `src/components/loader/Splash.tsx`. |
| Cookie consent banner | No | Added in `src/app/site-shell.tsx`, with stored preferences under `barnabas-impact-cookie-consent`. |
| CAPTCHA integration | No | Added as reCAPTCHA v3 verification for public forms, with a v2 step-up challenge when the v3 score is below 0.5. `RECAPTCHA_SECRET_KEY` is used server-side only. A v2 site key is configured separately as `NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY`. |
| `/legal/privacy-policy` | No | Added in the application route map. |
| `/legal/terms` | No | Added in the application route map. |
| `/legal/cookie-policy` | No | Added in the application route map. |
| 404 page | Yes | `src/pages/Error404.tsx`; a branded Next.js not-found experience is in `src/app/not-found.page.tsx`. |
| 500 page | No | Added as a branded `/500` route and Next.js error boundary. |
| API route filenames | No API route files are in the uploaded zip | Added routes: `route.route.ts` files under `src/app/api/**`, registered with Next.js using the preserved template directory layout and custom page extensions. Public paths: `/api/auth/register`, `/api/beneficiaries/add`, `/api/activities/add`, `/api/finance/add`, `/api/volunteers/add`, `/api/evidence/upload`, `/api/public/publish`, and `/api/send-enquiry`. NextAuth handlers are at `/api/auth/[...nextauth]`. |
| `.env` variable names | No `.env` file or environment variable declarations are in the uploaded zip | Added `.env.example` with all requested variable names, plus `NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY` for the v2 step-up challenge. |

## Template palette and type reference

The template's primary color is `#546FFF`; its supporting palette includes the neutrals, green, and light backgrounds in `src/theme/colors.ts` and `src/theme/palette.ts`. The new chart and UI CSS properties are mapped to those existing palette values. The font remains Plus Jakarta Sans. No `@font-face` rule was introduced.

The uploaded archive is a Vite/MUI starter, not a Next.js site. To keep its paths unchanged while using the requested App Router, the Next.js app lives under `src/app` and `next.config.ts` uses custom `pageExtensions` (`page.tsx` and `route.ts`). The Next.js build confirms the application routes resolve while the original template files remain in place.

## Dependency resolution note

The requested `@vercel/blob@0.29.4` is not published in the configured npm registry, so the compatible published release `2.8.2` is used. The requested `next-auth@5.0.0-beta.28`, `jspdf@3.0.1`, `nodemailer@6.10.1`, and `zod@3.25.67` produce high or critical npm audit findings in the current registry snapshot. Their compatible maintained releases are pinned in `package.json`; npm audit reports zero vulnerabilities. The requested `next lint` command is not available in Next.js 16, so the `lint` script runs `tsc --noEmit`.
