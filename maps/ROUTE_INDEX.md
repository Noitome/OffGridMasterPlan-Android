# OffGridMasterPlan Route Index

This document maps all application routes to their purpose, UI elements, and data sources. It serves as the canonical reference for automation tasks and QA.

## M1: Calculator Hub (Core MVP)

| PageID | Route | Purpose | Key UI Elements | Data Source |
|:---|:---|:---|:---|:---|
| **P_HOME** | `/` | Landing + Main Calculator | Address Input, Consumption Sliders, Result Cards | Static + Open-Meteo API |
| **P_PROP** | `/proposal` | Detailed Proposal Report | Printable Report, Charts, Assumptions Table | App State (React Context) |

## M2: Resources & Guides (Content)

| PageID | Route | Purpose | Key UI Elements | Data Source |
|:---|:---|:---|:---|:---|
| **P_SOLAR** | `/resources/energy` | Solar Guide | Guide Text, Product Cards | Static |
| **P_DIY** | `/resources/energy/diy-installs` | DIY Solar Videos | Video Grid, Descriptions | Static |
| **P_BATT** | `/resources/energy-storage` | Battery Guide | Guide Text, Battery Types | Static |
| **P_WIND** | `/resources/wind` | Wind Guide | Guide Text, Turbine Types | Static |
| **P_WATER** | `/resources/water` | Water Guide | Guide Text, Catchment Info | Static |
| **P_FOOD** | `/resources/food` | Food Guide | Guide Text, Permaculture Info | Static |
| **P_SHELTER** | `/resources/shelter` | Shelter Guide | Guide Text, Tiny House Info | Static |
| **P_MATRIX** | `/resources/tech-matrix` | Tech Solutions Matrix | Sortable Table, Filters | Static (CSV/JSON future) |
| **P_AI** | `/resources/ai-insights` | AI Insights Dashboard | Charts, Recommendations | Static (Mock Data) |

## M3: E-Commerce (Affiliate)

| PageID | Route | Purpose | Key UI Elements | Data Source |
|:---|:---|:---|:---|:---|
| **P_PROD** | `/product/:slug` | Product Detail | Image, Price, Reviews, Buy Button | `src/data/products.ts` |

## M4: WordPress Content (External)

| PageID | Route | Purpose | Key UI Elements | Data Source |
|:---|:---|:---|:---|:---|
| **WP_HOME** | `https://offgridmasterplan.com/` | SEO Home | Hero, Features, Blog Grid | WordPress |
| **WP_BLOG** | `https://offgridmasterplan.com/blog/` | Blog Feed | Article List | WordPress |

## Automation Targets (Stable Selectors)

> **Note:** These `data-testid` attributes must be present for n8n/testing.

### Calculator (P_HOME)
- `data-testid="address-input"`: Main location search
- `data-testid="daily-usage-slider"`: kWh/day input
- `data-testid="water-usage-slider"`: Liters/day input
- `data-testid="calculate-btn"`: Trigger calculation
- `data-testid="result-solar-kw"`: Output solar size
- `data-testid="result-battery-kwh"`: Output battery size
- `data-testid="result-water-tank"`: Output tank size

### Product (P_PROD)
- `data-testid="product-price"`: Price display
- `data-testid="buy-amazon-btn"`: Affiliate link button
