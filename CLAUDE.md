# CLAUDE.md â€” PANORISK-X5 Project Memory

## Identity
**PANORISK-X5** (Panorama des Risques 4D) is a geospatial command center for Quebec workplace injury intelligence, part of the AgenticX5 ecosystem by GenAISafety / Preventera.

## Architecture
- **Type**: React SPA (Vite + React 18 + Recharts + inline SVG)
- **Deploy**: Netlify (static build, no backend required)
- **Data**: All data is embedded inline in the dashboard component (~5KB JSON)
- **No backend, no API calls, no auth** â€” 100% client-side rendering

## Data Sources & Calibration
- **Primary**: CNESST open data (Donnees Quebec) â€” 697,602 CSV records (2018-2023)
- **ISQ 2024 anchors**: Monteregie=21,438, Montreal=18,387, Gaspesie=1,130, Cote-Nord=1,407, Total=107,124
- **ISQ 2022 anchors**: Monteregie=28,441, Montreal=24,552, Gaspesie=1,420, Cote-Nord=2,423
- **Total records**: 804,726 (7 years: 2018-2024)

## Data Structure (embedded in PanoriskDashboard.jsx)
```
D = {
  yr: { "2018".."2024": { t, tms, psy, mac, sur, cov } },
  mx: { "2018".."2024": { "Sector": total } },
  rg: [{ c, n, s, lat, lon, p }],
  rm: { "2018".."2024": { "01".."17": count } }
}
```

## Three Views
1. Secteurs â€” 13 SCIAN sector bars, 6 indicator toggles
2. Carte â€” SVG bubble map of 17 QC administrative regions
3. Croisement â€” Region x Sector cross-drill

## Commands
- `npm install` â€” Install dependencies
- `npm run dev` â€” Local dev server (Vite)
- `npm run build` â€” Production build (dist/)
- `npm run preview` â€” Preview production build

## Skills Reference
- `.skills/cnesst-data.md` â€” CNESST dataset structure
- `.skills/regional-calibration.md` â€” ISQ calibration methodology
- `.skills/dashboard-patterns.md` â€” React dark command center patterns

## Ecosystem
Part of AgenticX5: SafeTwinX5, IGNITIA, SafetyGraph Neo4j, SENTINEL-X5, EDGY, LiteraCIA

## Constraints
- Quebec Law 25 / RGPD: Data already anonymized (CNESST open data)
- Canadian sovereign hosting required for production
