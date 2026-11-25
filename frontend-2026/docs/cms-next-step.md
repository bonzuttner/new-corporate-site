# News and careers CMS — implementation proposal

The redesigned site is a static Next.js export. News/blog and careers
already have public list and detail pages in Japanese and English; their
front-end adapters are documented in [news](news-cms-integration.md) and
[careers](recruit-cms-integration.md). With no API configured they show
their preparation states; `?preview=layout` demonstrates the UI only.
This branch does not change their public feeds or enable demo content.

The previous root application includes a Strapi-backed articles API and
a Strapi-to-SQLite sync script. That establishes prior integration, not
the current deployment, credentials, available content types or CMS
version. Confirm those with the team before choosing a backend.

## Recommended first release

Reuse the current Strapi installation if it is maintained, accessible and
owned by BonZuttner. Map the existing article type to the new news contract
and add a careers content type if it does not already exist. Customize the
editor experience before considering a from-scratch authentication system.

- **News:** locale, slug, title, date, category, summary, image/alt text
  and structured content. Keep Japanese and English independently
  editable and publishable.
- **Careers:** locale, slug, title, location, employment type, summary,
  responsibilities, requirements, application URL and publication state.
  Keep applications and CVs out of this CMS; link to the approved process.
- **Editing:** draft, preview visible only to authorized staff, and
  publish/unpublish. Keep published content readable on the existing site
  even if the admin panel is offline (cache or build snapshots as appropriate).

A custom BonZuttner admin is also feasible. Use an existing company
identity provider with MFA (or managed authentication), a private database
and a separate admin origin. Cloudflare is not required: put the admin on
the existing hosting stack if it already provides the needed access
controls. Cloudflare Access is an optional gate for a private admin, not a
substitute for role checks within the CMS. Workers, D1 and R2 are options,
not prerequisites.

## Before enabling a production CMS

- Require identified staff accounts; no self-registration. Verify permissions
  on the server for every admin action. Separate drafting from publishing.
  Keep authorization role names and assignments under company control.
- Public reads return published records only. Keep drafts, tokens and write
  endpoints inaccessible to public clients. Validate fields and links on
  the server; render structured content rather than accepting arbitrary HTML.
- Log who published, changed or deleted content. Keep backups and test restore.
  Verify the admin audit, backup or workflow features included in the chosen
  CMS edition before relying on them.
- Test in staging: anonymous reads see only published content; editors cannot
  publish; revising a draft does not update the public page; publishing and
  withdrawing update the corresponding locale and page.
- Decide identity provider, hosting, owners and data migration before enabling
  production writes. Configure API tokens on the server only.

No production CMS accounts, storage or public admin routes are created by
this design branch.
