# CLAUDE.md

## Project Overview

**Early Win Analytics Dashboard** — a self-contained, interactive HTML dashboard for analyzing "Early Win" and "Cash Out" feature adoption across countries and user segments in sports betting.

The entire project is a single standalone HTML file (~4.9 MB, ~5,300 lines) with all dependencies embedded inline. There is no build system, package manager, or server-side component.

## Repository Structure

```
earlywin/
├── CLAUDE.md                          # This file
└── Early_Win_First_Deep_Dive_2_WITH_XRATIO_ALIGN3__20_ (2).html
```

The HTML file contains (in order):
1. HTML structure — navigation, headers, tab containers, chart sections
2. Embedded Plotly.js v3.3.1 (minified) — charting library
3. Embedded utility libraries (d3 core, ieee754, buffer, MapLibre GL JS)
4. CSS stylesheets — dark-theme design system
5. Custom JavaScript — tab switching, chart initialization, KPI pickers, data manipulation
6. Data definitions — country-specific arrays and objects for all metrics

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Markup | HTML5 |
| Styling | Embedded CSS (dark theme) |
| Logic | Vanilla JavaScript |
| Charting | Plotly.js 3.3.1 |
| Fonts | Google Fonts (DM Sans, DM Mono) |

All libraries are embedded directly — the file works offline (except font loading).

## Dashboard Features

- **Three analysis tabs:** Adoption Rate (User Level), Feature Rate (Bet Level), Stakes & Legs (Bet Level)
- **Country views:** Greece, Brazil, Mexico, Chile, Ecuador, Ireland, All Countries
- **Segment filters:** VIP vs Non-VIP, bet types (BetBuilder, BetBuilderCombo, Multiple, System, ALL)
- **Interactive Plotly charts** with KPI pickers, toggleable legends, responsive layouts
- **Key Insights panel** with color-coded takeaways

## Design System

- Background: `#0f1117`, `#171c27`
- Primary blue: `#4f8ef7`
- Success green: `#34d399`
- Purple accent: `#a78bfa`
- Orange accent: `#fb923c`
- Pink accent: `#f472b6`
- Text: `#e8ecf4`

## Naming Conventions

- Chart element IDs: `{chartType}-chart-{countryName}` (e.g., `bet-chart-Brazil`)
- Picker IDs: `{chartType}-picker-{countryName}` (e.g., `user-picker-Greece`)
- CSS classes: kebab-case (e.g., `.chart-wrap`, `.country-name`, `.kpi-pill`)
- JS variables: camelCase (e.g., `activeKpis`, `selectionOrder`, `countryData`)

## Development Workflow

There is **no build step, test suite, linter, or CI/CD pipeline**. The project is a static artifact.

- **To view:** Open the HTML file directly in any modern web browser
- **To edit:** Modify the HTML file in a text editor; changes take effect on browser refresh
- **To deploy:** Serve the HTML file from any static file host or share directly

## Key Conventions for AI Assistants

1. **Single-file architecture** — all changes go into the one HTML file. Do not split it into separate files unless explicitly asked.
2. **Embedded dependencies** — libraries are vendored inline. Do not add CDN links or external script references without asking.
3. **No build tooling** — there is nothing to install or compile. Do not introduce package.json, bundlers, or similar tooling unless requested.
4. **Large file** — the HTML is ~5,300 lines. When editing, use targeted edits rather than full rewrites. Read specific line ranges to locate sections.
5. **Data is inline** — chart data is defined as JS arrays/objects within `<script>` tags. Changes to data require editing the HTML directly.
6. **Dark theme** — the dashboard uses a dark color scheme. Maintain visual consistency when adding or modifying UI elements.
