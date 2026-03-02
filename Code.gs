/**
 * Google Apps Script — Web App entry point.
 *
 * Serves the dashboard HTML when the published web-app URL is visited.
 *
 * SETUP
 * -----
 * 1.  Open https://script.google.com and create a new project.
 * 2.  Paste THIS file into Code.gs (the default file).
 * 3.  Create two HTML files in the project:
 *       File → New → HTML file → name it "Feature_Rate_Stakes_Legs_Latest"
 *       File → New → HTML file → name it "SB_EarlyWin_Deep_Dive"
 *     Paste the corresponding HTML source into each.
 * 4.  Deploy → New deployment → Web app
 *       Execute as: Me
 *       Who has access: Anyone (or Anyone with the link)
 * 5.  Authorize when prompted, then open the provided URL.
 *
 * CONFIGURATION
 * -------------
 * Change DASHBOARD_FILE below to switch which dashboard is served.
 */

var DASHBOARD_FILE = 'Feature_Rate_Stakes_Legs_Latest';

function doGet(e) {
  // Optional: support ?page= parameter to switch dashboards
  var page = (e && e.parameter && e.parameter.page) || DASHBOARD_FILE;

  // Whitelist of allowed pages
  var allowed = {
    'Feature_Rate_Stakes_Legs_Latest': true,
    'SB_EarlyWin_Deep_Dive': true
  };

  if (!allowed[page]) {
    page = DASHBOARD_FILE;
  }

  return HtmlService.createHtmlOutputFromFile(page)
    .setTitle('Early Win & Cash Out Dashboard')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
