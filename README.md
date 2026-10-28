# Community Lens

Independent civic-data storytelling for Los Angeles, designed and developed by Yixiao Zhang.

## What it does

- **Animal welfare:** Long Beach public shelter intake and outcome records, with links to separate City of LA and LA County systems. Data periods and agencies are not added into a fictitious regional total.
- **Food access:** USC's October 2025 household food-insecurity research and food-assistance resources.
- **Housing:** LAHSA's 2026 Point-in-Time Count, historical comparisons and housing-assistance links.
- **Education:** LA County's 2025–26 public-school enrollment and library/adult-learning resources.
- **The Daily Lens:** dated source-aware summary, with a live Long Beach animal-data query when that public API is reachable.
- **Ask Lens Guide:** a deterministic keyword-based navigation assistant, not a connected generative AI model.
- **Newsletter:** opt-in Google Form and Google Apps Script email workflow; setup and authorizations are documented separately in `newsletter/README.md`.

## Run locally

The website is buildless HTML/CSS/JavaScript. Serve the repository root directory from any static HTTP server and open `index.html` from that server. The site requires network access for official datasets, real Unsplash images, public mapping dependencies, and Google Fonts.

## Validation

```bash
node tests/site-audit.mjs
for file in *.js; do node --check "$file" || exit 1; done
```

The test checks source metadata, navigation targets, unique Unsplash photo identifiers, source caveats, accessible visual behavior and required local assets. It does **not** replace browser, mobile-device, screen-reader or external-link testing.

## Editorial and data principles

1. Label each figure with jurisdiction, reporting period and source.
2. Distinguish intake events, outcomes, active shelter occupancy and estimated populations.
3. Do not equate an annual estimate with a live daily count.
4. Keep photographs unique, real and linked to the photographer's original source page; they are illustrative, not evidence of specific incidents.
5. Fail transparently when a public dataset or third-party asset is unavailable.

## Important references

- [Long Beach animal records](https://data.longbeach.gov/explore/dataset/animal-shelter-intakes-and-outcomes/)
- [LA County animal statistics](https://animalcare.lacounty.gov/animal-statistics/)
- [USC food and nutrition insecurity report, October 2025](https://public-exchange.org/usc/wp-content/uploads/sites/2/2025/12/Food-Nutrition-Insecurity-in-LA-County-October-2025.pdf)
- [LAHSA 2026 Homeless Count](https://www.lahsa.org/news/?article=1079-2026-homeless-count-reveals-bottleneck-stymied-progress)
- [Los Angeles County Ed-Data summary, 2025–26](https://www.ed-data.org/county/los-angeles/)

## Scope and limitations

This is an independent public-interest project, not a government agency, emergency-response service or comprehensive regional administrative database. Real-time data availability depends on upstream providers; the app does not claim measured impact, a region-wide shelter census, or generative-AI integration. Before a professional launch, test all pages at desktop and mobile widths and confirm the deployed version matches this source package.
