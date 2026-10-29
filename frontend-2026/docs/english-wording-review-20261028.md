# English wording review — 2026-10-28

Source: `BonZuttner_Wording_Review_All_Pages_Including_Careers.xlsx`.

All six tabs were reviewed. 106 of 107 requested review rows were applied across TOP, Services, Our Story, Members, Company and Careers. The shared English navigation now uses “Our Team.” Existing heading line breaks were kept at phrase boundaries, with spaces and role/tab separators added where the review identified concatenated words. Interactive story tabs remain separate and functional.

One item is pending: Members Page Review, row 20 asks for preferred Romanized member names **after confirming their spelling with the members**. No confirmed per-member spellings were included. Japanese display names were therefore preserved until confirmation; no names were guessed.

Japanese and Arabic locale files and prerendered pages remain unchanged.

Validation: production static export (46 localized routes); all 106 revised texts found in exported content or hero copy; all 8 project and 10 member dialogs tested in 3 languages; contact validation/review/edit; Akarel tabs. Browser visual QA could not run because the managed preview passes Vite-only flags to `next dev` (`--host` / `--strictPort`). No application changes were made to work around that infrastructure mismatch.

The build tool also reported a known security vulnerability affecting the installed Next.js version (16.4.0) and recommended upgrading. The wording-only change deliberately leaves dependencies unchanged; schedule the framework security update separately.

This source can be deployed by the BonZuttner team to the existing Vercel/GitHub environment. Updating the private Sites preview does not update the Vercel deployment automatically.
