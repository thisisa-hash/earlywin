# Deploying to Google Apps Script

## Quick Start

1. Go to [script.google.com](https://script.google.com) and click **New project**
2. Rename the project (e.g. "Early Win Dashboard")

### Add the server-side code

3. In the default `Code.gs` file, paste the contents of `Code.gs` from this repo

### Add the HTML dashboard(s)

4. Click **File > New > HTML file**, name it exactly:
   - `Feature_Rate_Stakes_Legs_Latest`
5. Delete the default content and paste the full contents of
   `Feature_Rate_Stakes_Legs_Latest.html`
6. (Optional) Repeat for the second dashboard:
   - **File > New > HTML file**, name it `SB_EarlyWin_Deep_Dive`
   - Paste the contents of `SB Early Win First Deep Dive (March 2026).html`

### Deploy

7. Click **Deploy > New deployment**
8. Select type: **Web app**
9. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone (or Anyone with the link)
10. Click **Deploy**, then **Authorize access** when prompted
11. Copy the **Web app URL** — that's your live dashboard

## Switching dashboards

- Default dashboard is set in `Code.gs` via the `DASHBOARD_FILE` variable
- You can also use `?page=SB_EarlyWin_Deep_Dive` in the URL to switch

## Notes

- Plotly.js is loaded from CDN (`https://cdn.plot.ly/plotly-3.3.1.min.js`)
  so the dashboard requires an internet connection
- Google Fonts (DM Sans, DM Mono) also load from the web
- The HTML files are ~125 KB each, well within the Apps Script HtmlService limit
- The dashboard runs in IFRAME sandbox mode for maximum compatibility
