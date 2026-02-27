# Feature Documentation — Early Win Analytics Dashboard

## 1. Purpose

This dashboard provides Novibet's product and analytics teams with a weekly, interactive deep-dive into the adoption and behavioural characteristics of two sports-betting features: **Early Win** (automatic early settlement of winning bets) and **Cash Out** (manual early settlement). It covers an 8-week rolling window from December 2025 through February 2026 across six markets.

---

## 2. Dashboard Tabs

The interface is organised into three top-level analysis tabs. Each tab provides the same six per-country sections plus an "All Countries" aggregate view.

### 2.1 Adoption Rate (User Level)

Analyses what percentage of **active users** adopted each feature during a given week.

**KPIs available (select up to 3):**

| KPI | ID | Colour | Description |
|-----|----|--------|-------------|
| Early Win Adoption | `ew` | Blue `#4f8ef7` | % of users who used Early Win |
| Cash Out Adoption | `co` | Green `#34d399` | % of users who used Cash Out |
| Early Win **and** Cash Out Adoption | `p1` | Purple `#a78bfa` | % of users who used **both** features (overlap) |
| Early Win Only Adoption (not Cash Out) | `p2` | Orange `#fb923c` | % of users who used Early Win but **not** Cash Out |
| Cash Out Only Adoption (not Early Win) | `p3` | Pink `#f472b6` | % of users who used Cash Out but **not** Early Win |

**Special annotation — CO/EW ratio:** When both Early Win and Cash Out are selected, each Early Win bar displays a golden `×N.N` label showing how many times larger Cash Out adoption is relative to Early Win (e.g., `×2.6` means Cash Out is 2.6 times Early Win).

**Controls:**
- **VIP Level toggle** — switch between "NON VIP" and "VIP" segments via a Plotly dropdown on the chart.
- **KPI Picker pills** — click coloured pills above the chart to toggle individual KPIs on/off (max 3 active; oldest auto-deselects when a 4th is clicked).

### 2.2 Feature Rate (Bet Level)

Analyses what percentage of **individual bets** were settled through each feature during a given week.

**KPIs available (select up to 2):**

| KPI | ID | Colour | Description |
|-----|----|--------|-------------|
| Early Win Bet Rate | `ew` | Blue `#4f8ef7` | % of bets settled via Early Win |
| Cash Out Bet Rate | `co` | Green `#34d399` | % of bets settled via Cash Out |

**Special annotation — CO/EW ratio:** Same golden `×N.N` label as in Tab 1.

**Hover detail:** Tooltips include the absolute bet count (e.g., "730 of 875,171 bets") alongside the percentage, giving both proportion and volume context.

**Controls:**
- **VIP Level toggle** — NON VIP / VIP dropdown.
- **Bet Type dropdown** — filter by bet construction: ALL (default), BetBuilder, BetBuilderCombo, Multiple, System.
- **KPI Picker pills** — toggle individual KPIs (max 2).

### 2.3 Stakes & Legs (Bet Level)

Analyses the structural characteristics of bets that used each feature — how many selections (legs) they contain and how much was wagered (stake).

**Two switchable areas via "Area" dropdown:**

#### Legs Area
| KPI | ID | Colour | Description |
|-----|----|--------|-------------|
| Avg Legs — All Bets | `allLegs` | Purple `#a78bfa` | Average number of selections across all bets |
| Avg Legs — Early Win Bets | `ewLegs` | Blue `#4f8ef7` | Average legs on bets that triggered Early Win |
| Avg Legs — Cash Out Bets | `coLegs` | Green `#34d399` | Average legs on bets that used Cash Out |

Y-axis is fixed at 28 for cross-country comparability.

#### Stakes Area
| KPI | ID | Colour | Description |
|-----|----|--------|-------------|
| Avg Stake — All Bets | `allStake` | Purple `#a78bfa` | Average wager (€) across all bets |
| Avg Stake — Early Win Bets | `ewStake` | Blue `#4f8ef7` | Average wager on Early Win bets |
| Avg Stake — Cash Out Bets | `coStake` | Green `#34d399` | Average wager on Cash Out bets |

Y-axis dynamically scales based on visible data, with a `€` suffix on tick labels.

**Controls:**
- **VIP Level toggle** — NON VIP / VIP.
- **Bet Type dropdown** — ALL, BetBuilder, BetBuilderCombo, Multiple, System.
- **Area dropdown** — Legs / Stakes. Switching resets KPI selection to defaults.
- **KPI Picker pills** — toggle individual KPIs (max 3).

---

## 3. Country Navigation

Each tab provides a sticky horizontal navigation bar with quick-jump links to:

| Link | Anchor |
|------|--------|
| Greece | `#Greece` / `#bet-Greece` / `#sl-Greece` |
| Brazil | `#Brazil` / `#bet-Brazil` / `#sl-Brazil` |
| Mexico | `#Mexico` / `#bet-Mexico` / `#sl-Mexico` |
| Chile | `#Chile` / `#bet-Chile` / `#sl-Chile` |
| Ecuador | `#Ecuador` / `#bet-Ecuador` / `#sl-Ecuador` |
| Ireland | `#Ireland` / `#bet-Ireland` / `#sl-Ireland` |
| All Countries | `#summary` / `#bet-summary` / `#sl-summary` |

The "All Countries" link is styled in green to visually distinguish the aggregate summary from individual country sections.

**Per-country x-axis:** Weekly date ranges (e.g., "Dec 14–20", "Jan 25–31").
**All Countries x-axis:** Country labels (one grouped bar per country showing averages).

---

## 4. Key Takeaways

The **Adoption Rate** tab includes a collapsible "Key Takeaways" insight panel below each country's chart. Each panel provides:

- A **NON VIP** summary bullet (green dot) quoting adoption rates, the CO/EW ratio, and overlap percentage.
- A **VIP** summary bullet (amber dot) with the same structure.

Takeaways are currently populated for Greece, Brazil, Mexico, and Chile. Ecuador, Ireland, and All Countries show placeholder text (`xxx`, `yyy`), indicating these are pending data review.

---

## 5. Interactive Chart Features

All charts are rendered with Plotly.js and share these interactive capabilities:

| Feature | Detail |
|---------|--------|
| **Grouped bar charts** | Side-by-side bars for each active KPI, grouped by week (or country for summary) |
| **Unified hover** | Hovering over a week highlights all bars and shows a combined tooltip |
| **Responsive layout** | Charts resize automatically on window resize; tab switching triggers a resize event to reflow hidden charts |
| **Legend** | Vertical legend in top-right showing KPI name + period average (e.g., "Early Win Adoption \| avg: 6.0%") |
| **Plotly dropdowns** | In-chart dropdown menus for VIP segment, bet type, and area switching (captured via `plotly_buttonclicked` events) |
| **No mode bar** | The Plotly toolbar is hidden (`displayModeBar: false`) for a cleaner look |
| **Text labels** | Each bar has an outside text label showing its formatted value (percentage, count, or euro amount) |

---

## 6. Data Architecture

All data is embedded inline as JavaScript objects within `<script>` tags. There is no backend or API — the dashboard is fully static.

### 6.1 User-Level Data (Tab 1)

```
countries[] → per-country object
  ├── name: "Greece"
  ├── "NON VIP"
  │   ├── ew: [8 weekly values]   (Early Win adoption rate)
  │   ├── co: [8 weekly values]   (Cash Out adoption rate)
  │   ├── p1: [8 weekly values]   (Both features)
  │   ├── p2: [8 weekly values]   (EW only)
  │   ├── p3: [8 weekly values]   (CO only)
  │   ├── avgEw, avgCo, avgP1, avgP2, avgP3: string averages
  │   └── ymax: number
  └── "VIP" → same structure
```

`summary` object uses country labels as x-axis instead of weeks (one value per country).

### 6.2 Bet-Level Data (Tab 2)

```
betCountries[] → per-country object
  ├── name: "Greece"
  ├── "NON VIP"
  │   ├── "ALL"
  │   │   ├── ew: [8 weekly values]
  │   │   ├── co: [8 weekly values]
  │   │   ├── ewN: [8 absolute counts]
  │   │   ├── coN: [8 absolute counts]
  │   │   ├── totalN: [8 total bet counts]
  │   │   ├── avgEw, avgCo: string averages
  │   │   └── ymax: number
  │   ├── "BetBuilder" → same structure
  │   ├── "BetBuilderCombo" → same structure
  │   ├── "Multiple" → same structure
  │   └── "System" → same structure
  └── "VIP" → same structure
```

A precomputed `globalYmax` ensures all bet-level charts share the same y-scale within a given segment + bet type combination.

### 6.3 Stakes & Legs Data (Tab 3)

Two parallel datasets — `legCountries[]` and `stakeCountries[]` — merged at runtime into `slCountryData[]`:

```
legCountries[] → per-country object
  ├── name: "Greece"
  ├── "NON VIP"
  │   └── "ALL"
  │       ├── allLegs, ewLegs, coLegs: [8 weekly values]
  │       └── mean_allLegs, mean_ewLegs, mean_coLegs, ymax
  └── ...

stakeCountries[] → per-country object
  ├── name: "Greece"
  ├── "NON VIP"
  │   └── "ALL"
  │       ├── allStake, ewStake, coStake: [8 weekly values]
  │       └── mean_allStake, mean_ewStake, mean_coStake, ymax
  └── ...
```

---

## 7. State Management

Each chart maintains its own state object tracking user selections:

| State field | Tab 1 (User) | Tab 2 (Bet) | Tab 3 (Stakes & Legs) |
|-------------|-------------|-------------|----------------------|
| `seg` | NON VIP / VIP | NON VIP / VIP | NON VIP / VIP |
| `activeKpis` | up to 3 of 5 KPIs | up to 2 of 2 KPIs | up to 3 of 3 KPIs |
| `selectionOrder` | FIFO queue for auto-deselect | FIFO queue | FIFO queue |
| `betType` | — | ALL / BetBuilder / BetBuilderCombo / Multiple / System | ALL / BetBuilder / BetBuilderCombo / Multiple / System |
| `area` | — | — | Legs / Stakes |

State objects are stored in per-tab dictionaries (`chartStates`, `betChartStates`, `slChartStates`), keyed by chart DOM ID.

---

## 8. UI/UX Design

- **Dark theme:** Background `#0f1117` / `#171c27`, text `#e8ecf4`, muted `#6b7591`.
- **Sticky header:** Shows "Novibet · Weekly · Dec 2025 – Feb 2026" with title and subtitle; stays fixed on scroll.
- **Tab indicator colours:** Blue for Adoption Rate, orange for Feature Rate, purple for Stakes & Legs.
- **KPI pills:** Rounded pill badges with a colour dot; glow shadow when active.
- **Max-KPI hint:** A "Max N selected" message fades in briefly when the limit is hit.
- **Section dividers:** Thin horizontal rules between country sections.
- **Typography:** DM Sans for body text, DM Mono for data labels and axis ticks.

---

## 9. Time Period and Reporting Cadence

| Parameter | Value |
|-----------|-------|
| **Window** | 8 weeks rolling |
| **Start date** | Dec 14, 2025 |
| **End date** | Feb 7, 2026 |
| **Granularity** | Weekly (Saturday–Friday ranges) |
| **Refresh** | Manual (static file; data must be re-exported to update) |

---

## 10. Known Limitations and Incomplete Areas

1. **Placeholder takeaways** — Ecuador, Ireland, and All Countries key takeaways contain placeholder text (`xxx`, `yyy`) and have not been filled in with actual insights.
2. **No data pipeline** — Data is hardcoded; updating requires regenerating and re-embedding the JavaScript arrays.
3. **No export functionality** — Charts cannot be downloaded as images or data cannot be exported to CSV from the UI.
4. **No date range picker** — The 8-week window is fixed; users cannot adjust the time range.
5. **Single file** — At ~4.9 MB, the embedded Plotly.js library makes the file large; load times may be noticeable on slow connections.
6. **No mobile optimisation** — While responsive, the dense chart layout and dropdown controls are best suited for desktop viewports.
