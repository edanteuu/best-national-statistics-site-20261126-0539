# best-national-statistics-site-20261126-0539

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/edanteuu/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/edanteuu/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

**AngkaNusa — Indonesia in Numbers.** A national statistics site for Indonesia: 283.5 million people, a US$1,396 billion economy, 38 provinces — every figure sourced and dated, every chart drawn from the published record. Six working pages: a dashboard (KPI strip, GDP-growth bars 2015–2025, age-structure pyramid, largest provinces, latest releases), Economy (sector donut, growth and inflation, exports vs imports, money at a glance), People (pyramid, population growth, health, education and work), Provinces (all 38, searchable and sortable, with regional extremes), a Data Explorer (49 published indicators, topic filter, text search, CSV download), and Sources & Methods (where every number comes from, and how figures that look alike — the two HDIs, the two unemployment rates — are kept apart).

## Run it

Serve `app/` with any static server and open `index.html`, or:

```sh
node serve.ts
# then open http://localhost:8080
```

To hand the entry in (writes `app/`, `screenshots/` and `dossier.json` to `out/`):

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

The site is plain static files with no build step and no network request: hand-rolled SVG charts, system fonts only, all data in `app/data.js`.

## Data

Figures are the latest published annual values at the time of writing (November 2026): Statistics Indonesia (BPS), World Bank WDI, IMF, Bank Indonesia, UNDP, APJII, GAPKI. Headline figures: population 283.5m (2024), GDP US$1,396bn, GDP growth 5.03% (2024) and 5.11% (2025), inflation 1.57% (2024), poverty 8.57% (Sep 2024), open unemployment 4.91% (Aug 2024). Provincial populations are BPS mid-year estimates for 2024. See `app/sources` in the site itself for the full source list and methods.

---

<sub>Entered on [make.fun](https://make.fun/?ref=edanteuu&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
