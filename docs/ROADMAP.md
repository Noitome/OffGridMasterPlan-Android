# Future Features & Research Roadmap

## 1. Mars-Style Botany & Survival Analysis
**Goal:** Determine what can be grown for minimal survival in the user's specific location/climate.
- **Data Sources:** 
  - USDA Plant Hardiness Zones (mapped to global coordinates).
  - Soil type data (if available via API).
  - Rainfall/Temperature limits for specific survival crops (e.g., Potatoes, Quinoa, Beans).
- **Implementation:**
  - Create a database of "Survival Crops" with growth parameters (min temp, water needs, sun hours).
  - Match user's `climate` object (monthly temp/rain) against crop requirements.
  - Output a "Survival Garden" recommendation list in the Proposal Report.

## 2. Advanced System Simulation
- **Goal:** Hourly simulation of battery charge/discharge.
- **Features:**
  - Import typical load profiles (e.g., "Evening Peak").
  - Simulate 365 days of weather to find "Dark Doldrums" (longest periods without sun).
  - Accurately model battery degradation over 10 years.

## 3. Regulatory & Permitting Check
- **Goal:** Flag potential legal issues.
- **Features:**
  - Check distance to nearest substation (grid connection feasibility).
  - Local council rules for "Permitted Development" of solar arrays.
