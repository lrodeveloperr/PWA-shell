# Shell Lock

This shell is intentionally conservative. It is designed for repeatable B2B utility PWAs where the engine is the product.

## Locked UI Decisions

- Text-only app name in the top-left.
- No floating app logo.
- Top-right public navigation: Support, About, Policies.
- Privacy and terms are one combined Policies page.
- Browser-card header dots use the same color family as the page status dots.
- Standard seven-page screenshot set.
- 1600 x 900 presentation screenshots.
- Safe fictitious data for all demo screens.

## When To Change The Shell

Change `src/shell/` only when the improvement should apply to many apps.

Examples:

- better responsive layout
- better screenshot capture
- reusable new card type
- accessibility improvement
- reusable PWA install handling

## When Not To Change The Shell

Do not change the shell for:

- a single app's calculations
- one app's policy wording
- one app's pricing
- one app's data import
- one app's validation rules
- one app's legal/compliance content

Those belong in config or engine files.

