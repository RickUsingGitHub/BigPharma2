# BigPharma2 — The Medicine Ledger

An original static research website about pharmaceutical evidence, incentives, access and accountability. Independently researched from primary records. The original BigPharma README supplied subject context only; its design, code and datasets were not reused.

## View

Open `dist/index.html` directly, or run `node server.cjs` and visit http://127.0.0.1:4182. There is no build step, dependency installation, account, tracking or application backend. Google Fonts is optional; system fallbacks work offline.

## Structure

- `dist/index.html`: eight editorial chapters and explanatory SVG illustration
- `dist/style.css`: original responsive design, reduced-motion and print styles
- `dist/app.js`: stage explorer, risk model, search/filter/sort, downloads and research notes
- `dist/cases.js`: 12 selected historical case records with legal distinctions and primary sources
- `dist/research.js`: primary research notes, with two additional records in app.js

All editorial material was prepared for the 4 November 2026 research edition. Source dates are shown; historical findings are not live estimates. This is not medical advice or a comprehensive misconduct census. No aggregate penalty number is calculated because the legal amounts are not directly additive.

## Updating

Preserve factual qualifications and source dates. For cases, distinguish parent and subsidiary, criminal and civil components, cash and non-cash remedies, announced and collected amounts, and later legal changes. A new case goes in window.BP_CASES with the existing schema. Update the edition date when substantively re-researching.

## Interactive model

Hypothetical fixed-period risks: treated risk = baseline risk × (1 − relative risk reduction). Absolute reduction = baseline − treated. Number needed to treat = ceiling(1 / absolute reduction), with infinity for no reduction. The model is educational and omits statistical uncertainty, harms and competing risks.
