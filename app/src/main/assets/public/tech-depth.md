# OffGridMasterPlan Technical Reference

**🌍 Global Dynamic Version** - Automatically adapts to your region, units, and currency.

---

## Quick Region Detection

> **Your System:** Based on your location, we'll show: **Metric / AUD / Australia**  
> [Change Region](#) | [Toggle Units](#)

---

## 1. Solar Power Systems

### 1.1 Solar Panel Types

| Type | Efficiency | Lifespan | Best For |
|------|------------|----------|----------|
| Monocrystalline | 20-23% | 25-30 years | Maximum output per m² |
| Polycrystalline | 15-17% | 25 years | Budget, large arrays |
| Thin-Film | 10-13% | 20 years | Flexible/unusual surfaces |
| PERC | 21-24% | 25-30 years | High efficiency, hot climates |
| Bifacial | 22-25% | 25-30 years | High albedo surfaces |
| HIT (Heterojunction) | 23-26% | 25-30 years | Best efficiency, expensive |

**Panel Sizing Formula:**
```
Daily Generation (Wh) = Panel Watts × Peak Sun Hours × System Efficiency (0.85)

Example: 400W panel × 5 hours × 0.85 = 1,700Wh/day
```

**Temperature Performance:**
- Power temperature coefficient: -0.3% to -0.5%/°C
- NOCT (Nominal Operating Cell Temp): 45°C ± 2°C
- At 45°C, panel loses ~10% efficiency

**Orientation:**
- **Northern Hemisphere:** South-facing, tilt = latitude
- **Southern Hemisphere:** North-facing, tilt = latitude

### 1.2 Battery Banks

**Chemistry Comparison**

| Type | Cycle Life | Depth of Discharge | Cost/kWh | Temperature Range | Best For |
|------|------------|-------------------|----------|-------------------|----------|
| LiFePO4 (LFP) | 3000-5000 | 80-100% | $300-800 | -20°C to 60°C | Mainstream |
| Li-ion NMC | 2000-3000 | 80-100% | $500-900 | -20°C to 55°C | High performance |
| Li-ion NCA | 1500-2500 | 80-100% | $600-1000 | -20°C to 50°C | Tesla, high energy |
| AGM | 500-1000 | 50% | $200-500 | -40°C to 60°C | Budget, seasonal |
| Gel | 1000-2000 | 50% | $300-600 | -40°C to 60°C | Sealed needed |
| Flooded Lead-Acid | 500-1000 | 50% | $150-400 | -20°C to 50°C | Maximum budget |
| OPzS | 1500-2500 | 60% | $400-700 | -10°C to 45°C | Long life, flooded |

**Sizing:**
```
Capacity (Ah) = Daily Load (Wh) ÷ System Voltage ÷ DoD%
Days of Autonomy = Capacity × System Voltage × DoD% ÷ Daily Load
Example: 3000Wh/day, 48V, 80% DoD, 3 days:
- Daily = 3000 ÷ 48 ÷ 0.8 = 78Ah
- 3-day = 78 × 3 = 234Ah
```

**Brand Comparison:**

| Brand | Type | Warranty | Cost/kWh AU | Cost/kWh US |
|-------|------|----------|-------------|-------------|
| BYD | LFP | 10 years | $350-450 | $300-400 |
| Pylontech | LFP | 10 years | $400-500 | $350-450 |
| FranklinWH | LFP | 12 years | $450-550 | $400-500 |
| Tesla Powerwall | NMC | 10 years | $700-900 | $600-800 |
| EG4 | LFP | 10 years | $350-450 | $300-400 |
| Discover | LFP | 11 years | $450-550 | $400-500 |
| Rolls | Flooded | 7 years | $200-300 | $180-280 |

### 1.3 Inverters

| Feature | Pure Sine Wave | Modified Sine |
|---------|---------------|---------------|
| Compatibility | All AC devices | Motors buzz, some fail |
| Efficiency | 90-95% | 75-85% |
| THD | <3% | 20-25% |
| Cost | Higher | Lower |

**Sizing:**
```
Inverter Rating = Peak Load × 1.25 (minimum)
Surge Capacity = 2-3× continuous rating
```

**Top Inverters:**

| Model | Type | Rating | Cost AU | Cost US | Notes |
|-------|------|--------|---------|---------|-------|
| Victron MultiPlus II | Hybrid | 3-5kVA | $2,500-4,500 | $2,000-3,800 | Best overall |
| Victron Quattro | Hybrid | 5-15kVA | $4,000-12,000 | $3,500-10,000 | Dual input |
| EG4 18KPV | Hybrid | 18kW | $3,000-4,000 | $2,500-3,500 | Best value |
| Schneider XW Pro | Hybrid | 6-8kW | $5,000-7,000 | $4,000-6,000 | Premium |
| OutBack Radian | Hybrid | 4-8kW | $4,500-8,000 | $4,000-7,000 | Full system |
| SMA Sunny Island | Hybrid | 3-6kW | $3,500-6,500 | $3,000-5,500 | German quality |
| GoodWe Lynx Home F | Hybrid | 3.6-10kW | $2,000-4,500 | $1,800-4,000 | Budget hybrid |

### 1.4 Charge Controllers

| Type | Efficiency | Cost | Best For |
|------|------------|------|----------|
| PWM | 75-80% | $50-150 | Small systems |
| MPPT | 95-99% | $150-1,500 | All systems >200W |

**MPPT Sizing:**
```
Controller Amps = Panel Watts ÷ System Voltage × 1.25

Example: 1000W panel, 24V system = 1000 ÷ 24 × 1.25 = 52A controller
```

**Top Controllers:**

| Model | Amps | Max V | Cost AU | Cost US |
|-------|------|-------|---------|---------|
| Victron SmartSolar 100/30 | 30A | 100V | $250-350 | $200-300 |
| Victron SmartSolar 150/70 | 70A | 150V | $500-700 | $450-600 |
| Epever 30A | 30A | 150V | $80-120 | $70-100 |
| Renogy 40A | 40A | 100V | $120-180 | $100-150 |
| Schneider SX | 60A | 240V | $600-900 | $550-800 |

---

## 2. Water Systems

### 2.1 Rainwater Harvesting

**Catchment Formula:**
```
Annual Yield (L) = Roof Area (m²) × Annual Rainfall (mm) × 0.85

Imperial: Annual Yield (gal) = Roof Area (ft²) × Annual Rainfall (in) × 0.6
```

**Regional Examples:**

| City | Annual Rainfall | 100m² Roof | 150m² Roof | 200m² Roof |
|------|-----------------|------------|------------|------------|
| Melbourne, AU | 650mm | 55,000L | 83,000L | 110,000L |
| Sydney, AU | 1,200mm | 102,000L | 153,000L | 204,000L |
| Brisbane, AU | 1,400mm | 119,000L | 179,000L | 238,000L |
| Darwin, AU | 1,700mm | 145,000L | 217,000L | 289,000L |
| Perth, AU | 850mm | 72,000L | 108,000L | 145,000L |
| London, UK | 600mm | 51,000L | 77,000L | 102,000L |
| Seattle, US | 970mm | 82,000L | 124,000L | 165,000L |
| Los Angeles, US | 300mm | 26,000L | 38,000L | 51,000L |
| Miami, US | 1,500mm | 128,000L | 191,000L | 255,000L |
| Amsterdam, NL | 800mm | 68,000L | 102,000L | 136,000L |
| Berlin, DE | 550mm | 47,000L | 70,000L | 94,000L |
| Toronto, CA | 790mm | 67,000L | 101,000L | 134,000L |
| Vancouver, CA | 1,500mm | 128,000L | 191,000L | 255,000L |

### 2.2 Tank Sizing

**Dry Season Sizing:**
```
Tank Size (L) = Daily Usage (L) × Dry Days × Safety Factor (1.2)
```

| Region | Dry Days | Usage/Person/Day | 4 Person Tank |
|--------|----------|------------------|---------------|
| Melbourne | 120 days | 150L | 72,000L |
| Sydney | 90 days | 150L | 54,000L |
| Brisbane | 60 days | 150L | 36,000L |
| Perth | 150 days | 150L | 90,000L |
| London | 150 days | 150L | 90,000L |
| California | 180 days | 150L | 108,000L |
| Spain (Barcelona) | 180 days | 150L | 108,000L |

**Tank Types:**

| Type | Cost/m³ AU | Cost/m³ US | Pros | Cons |
|------|------------|------------|------|------|
| Poly Round | $150-250/m³ | $120-200/m³ | Cheap, easy | Degrades UV |
| Poly Slimline | $200-350/m³ | $170-300/m³ | Fits walls | Narrow |
| Steel Corrugated | $300-500/m³ | $250-400/m³ | Strong, long life | Rust risk |
| Concrete | $400-600/m³ | $350-500/m³ | Permanent | Heavy, cracks |
| Bladder | $200-400/m³ | $170-350/m³ | Portable | Puncture risk |

### 2.3 Filtration Stages

| Stage | Removes | Micron | Replacement | Cost AU | Cost US | Cost UK |
|-------|---------|--------|-------------|---------|---------|---------|
| Leaf Guard | Leaves | 2mm | 6-12 months | $50-100 | $40-80 | £35-70 |
| First Flush | Dirt | - | 5-10 years | $150-300 | $120-250 | £100-200 |
| Sediment 20μm | Sand/silt | 20μm | 3-6 months | $40/yr | $30/yr | £25/yr |
| Sediment 1μm | Fine | 1μm | 3-6 months | $50/yr | $40/yr | £35/yr |
| Carbon | Chlorine/taste | - | 6-12 months | $60/yr | $50/yr | £45/yr |
| UV | Bacteria/viruses | - | 12 months | $120/yr | $100/yr | £85/yr |
| Reverse Osmosis | Everything | 0.0001μm | 12-24 months | $200/yr | $150/yr | £130/yr |

### 2.4 Greywater Systems

**Yield Estimation:**
| Source | L/person/day | Quality |
|--------|-------------|---------|
| Shower | 30-50 | Highest |
| Bath | 40-80 | High |
| Basin | 10-20 | Medium |
| Kitchen | 15-30 | Low - grease |
| Laundry | 30-50 | Medium - detergent |

**Treatment Methods:**

| Method | Complexity | Cost AU | Effectiveness |
|--------|------------|---------|--------------|
| Simple diversion | Low | $100-300 | 30% (toilet only) |
| Filter + wetland | Medium | $500-1,500 | 60% |
| Sand filter | Medium | $800-2,000 | 75% |
| Drip irrigation direct | Low | $200-400 | 40% |
| Membrane bioreactor | High | $3,000-8,000 | 95% |

---

## 3. Waste Systems

### 3.1 Composting Toilets

| Model | Type | Capacity | Compost Quality | Cost AU | Cost US | Cost UK |
|-------|------|----------|-----------------|---------|---------|---------|
| Nature's Head | Split | 60-80 uses | Excellent | $900-1,400 | $800-1,200 | £700-1,000 |
| Separett Villa 9210 | Split | 40-60 uses | Excellent | $800-1,200 | $700-1,000 | £600-900 |
| Sun-Mar Excel | Single | 30-50 uses | Good | $1,200-1,800 | $1,000-1,500 | £850-1,200 |
| Airhead | Split | 40-60 uses | Excellent | $700-1,100 | $600-900 | £500-800 |
| Separett Tiny | Portable | 20-30 uses | Good | $400-600 | $350-500 | £300-450 |
| DIY 5-gallon | Split | 20-30 uses | Good | $150-300 | $120-250 | £100-200 |

**Installation Requirements:**
- Minimum 3" (75mm) vent pipe, extend 300mm above roof
- 110V/220V power for fan (or 12V solar)
- Access for emptying (weekly)
- Level placement

### 3.2 Urine Diversion

**Yields:**
| Source | Volume/Day | Nitrogen | Phosphorus | Potassium |
|--------|------------|----------|------------|-----------|
| Urine | 1-2L/person | 6-10g N/L | 0.5-1g P/L | 1-2g K/L |
| Diluted 1:8 | 9-18L | 0.75-1.25g/L | 0.06-0.12g/L | 0.12-0.25g/L |

**Applications:**
- Dilute 1:8 to 1:10 for aquaponics
- Direct to ornamental trees
- Compost pile accelerator (1L/10L compost)

### 3.3 Biogas Systems

| System | Input Capacity | Gas Output | Cooking Time | Cost AU | Cost US |
|--------|----------------|------------|--------------|---------|---------|
| HomeBiogas 2.0 | 120L | 0.5-0.7m³ | 2-3 hrs | $800-1,200 | $700-1,000 |
| HomeBiogas 7.0 | 400L | 1.5-2m³ | 4-6 hrs | $2,000-3,000 | $1,800-2,500 |
| Biobag 200L | 200L | 0.8-1m³ | 2-3 hrs | $300-500 | $250-400 |
| FlexiBiogas 600 | 600L | 2-3m³ | 4-6 hrs | $1,200-2,000 | $1,000-1,800 |
| DIY 1000L IBC | 1000L | 2-3m³ | 4-6 hrs | $400-800 | $350-700 |

**Feedstock Requirements:**
| Input | Gas Yield | Notes |
|-------|-----------|-------|
| Cow manure | 0.03-0.04 m³/kg | High fiber |
| Pig manure | 0.04-0.05 m³/kg | Good |
| Human urine | 0.02 m³/kg | Dilute 1:5 |
| Food scraps | 0.05-0.06 m³/kg | Best |
| Chicken manure | 0.05-0.07 m³/kg | Very good |
| Grass clippings | 0.04 m³/kg | Mix with manure |

### 3.4 Black Soldier Fly Larvae (BSFL)

| Metric | Value |
|--------|-------|
| Intake | 25% body weight/day |
| Reduction | 90% waste volume |
| Protein | 42-45% |
| Fat | 25-35% |
| Harvest interval | 14-21 days |
| Temperature | 25-30°C optimal |
| Frass (residue) | 10% of input |

**DIY BSF System:**
- Cost: $50-150
- Capacity: 10-20kg/week
- Harvest: Self-harvesting ramp

---

## 4. Food Autonomy

### 4.1 Hydroponic Systems

| System | Initial Cost | Complexity | Water Use | Yield/m² | Best For |
|--------|--------------|------------|-----------|----------|----------|
| DWC | $200-500 | Low | Very Low | 20-30kg | Leafy greens |
| NFT | $300-800 | Medium | Very Low | 25-40kg | Herbs, lettuce |
| Drip | $400-1,000 | Medium | Low | 30-50kg | Fruiting |
| Ebb & Flow | $300-700 | Medium | Medium | 25-40kg | Versatile |
| Aeroponics | $500-1,500 | High | Lowest | 40-60kg | Premium |
| Vertical Tower | $400-1,200 | Medium | Low | 40-80kg | Space-limited |
| Kratky | $50-150 | Very Low | Very Low | 10-20kg | Beginners |

**Nutrient Recipes (per 1000L):**

*Vegetative (High N):*
- Calcium Nitrate: 150g
- Potassium Nitrate: 100g
- Ammonium Nitrate: 30g
- MKP: 100g
- Magnesium Sulfate: 100g
- Trace Mix: 50g

*Fruiting (High P/K):*
- Calcium Nitrate: 120g
- Potassium Nitrate: 200g
- Mono Potassium Phosphate: 150g
- Magnesium Sulfate: 100g
- Potassium Sulfate: 80g
- Trace Mix: 50g

### 4.2 Aquaponics

**System Ratios:**

| Metric | Ratio | Example (4 people) |
|--------|-------|-------------------|
| Fish:Plant | 1:3 | 10kg fish → 30kg vegetables |
| Grow Bed:Fish Tank | 1:1 | 1000L tank → 1000L grow bed |
| Feed:Plant | 1:1 | 100g feed → 100g vegetables |

**Fish Stocking:**
```
Fish Weight (kg) = Fish Tank (L) × 0.03
Example: 1000L tank = 30kg fish capacity
```

**Species by Climate:**

*Tropical (20-30°C):*
- Tilapia, Goldfish, Koi, Pacu, Angelfish

*Temperate (15-25°C):*
- Silver Perch, Murray Cod, Yabbies, Bass

*Cold (10-20°C):*
- Trout, Salmon, Arctic Char, Bluegill

### 4.3 Grow Lights

**PPFD Requirements:**

| Plant Type | PPFD | DLI | Hours/Day |
|------------|------|-----|-----------|
| Seedlings | 100-200 | 6-12 | 16-20 |
| Leafy Greens | 200-400 | 10-18 | 14-16 |
| Herbs | 300-500 | 15-25 | 14-16 |
| Fruiting | 400-600 | 20-30 | 12-14 |
| Flowering | 500-800 | 25-40 | 12 |

**Coverage:**
```
Coverage (m²) = LED Watts ÷ 50
Example: 300W LED covers ~6m² for leafy greens
```

**Top Grow Lights:**

| Model | Power | Efficiency | Cost AU | Cost US |
|-------|-------|------------|---------|---------|
| Spider Farmer SF-1000 | 100W | 2.5 μmol/J | $250-350 | $200-300 |
| Mars Hydro TS 1000 | 100W | 2.3 μmol/J | $180-250 | $150-220 |
| California Lightworks | 200-600W | 2.5 μmol/J | $400-1,200 | $350-1,000 |
| Gavita Pro | 750W | 2.6 μmol/J | $800-1,200 | $700-1,000 |
| HLG 350R | 350W | 2.8 μmol/J | $500-700 | $450-600 |

---

## 5. Electrical Systems

### 5.1 Wire Sizing

**AWG to mm²:**

| AWG | mm² | @ 75°C Cu | @ 90°C Cu | @ 75°C Al |
|-----|-----|-----------|-----------|-----------|
| 14 | 2.08 | 15A | 20A | 12A |
| 12 | 3.31 | 20A | 25A | 15A |
| 10 | 5.26 | 30A | 35A | 25A |
| 8 | 8.37 | 40A | 50A | 30A |
| 6 | 13.30 | 55A | 65A | 40A |
| 4 | 21.15 | 70A | 85A | 55A |
| 2 | 33.62 | 95A | 115A | 75A |
| 1/0 | 53.49 | 125A | 150A | 100A |

**Voltage Drop Calculator:**
```
VD% = (2 × K × I × L) / (V × CM)
K = 10.8 (copper), 21.2 (aluminum)
I = Current (A), L = One-way distance (ft)
V = System voltage, CM = Wire circular mils
Max 3% critical, 5% general
```

**Quick Reference (12V, 3% VD, Copper):**

| Watts | 10ft | 20ft | 30ft | 50ft |
|-------|------|------|------|------|
| 100W | 14 | 12 | 10 | 10 |
| 200W | 12 | 10 | 8 | 8 |
| 300W | 10 | 10 | 8 | 6 |
| 500W | 10 | 8 | 6 | 4 |
| 1000W | 8 | 6 | 4 | 2 |

### 5.2 System Voltage Selection

| System Size | Recommended Voltage | Max Current (5kW) |
|-------------|--------------------|--------------------|
| < 1kW | 12V | 83A |
| 1-3kW | 24V | 42A (12V: 125A) |
| 3-8kW | 48V | 21A (24V: 83A) |
| > 8kW | 48V or 120V | 10A |

**Benefits of higher voltage:**
- Lower current = smaller wires
- Lower losses
- More efficient inverters
- Safety advantages

### 5.3 Protection Devices

| Application | Device | Rating | Cost AU | Cost US |
|-------------|--------|--------|---------|---------|
| Solar input | DC MC4 fuse | 1.25× Isc | $10-30 | $8-25 |
| Battery | DC Breaker | 1.25× Max | $30-80 | $25-60 |
| Inverter | DC Breaker | 2× Max | $40-100 | $35-80 |
| AC Input | RCBO/GFCI | 30mA | $50-150 | $40-120 |
| AC Output | RCBO | 30mA | $40-120 | $35-100 |

### 5.4 Monitoring Systems

| System | Parameters | Cost AU | Cost US | Connectivity |
|--------|------------|---------|---------|--------------|
| Victron GX | All | $400-600 | $350-500 | WiFi, Ethernet |
| Shunt + ESPHome | V, I, SOC | $50-150 | $40-120 | WiFi |
| Simarine Pico | Multi-bank | $400-600 | $350-500 | WiFi |
| SolaX Cloud | Solar specific | $150-300 | $130-250 | WiFi |
| BYD HVS | Battery native | $100-200 | $90-180 | WiFi |

---

## 6. Complete System Examples

### 6.1 Australia - Family of 4 (AUD)

| Component | Spec | Cost | Lifespan |
|-----------|------|------|----------|
| Solar | 6.6kW | $4,500-6,000 | 25 years |
| Battery | 30kWh LFP | $12,000-18,000 | 15 years |
| Inverter | 5kW hybrid | $2,500-4,000 | 10 years |
| MPPT | 60A | $400-600 | 10 years |
| Water Tank | 50kL | $10,000-15,000 | 20+ years |
| Filtration | 5-stage | $1,000-1,500 | Ongoing |
| Composting Toilet | Nature's Head | $1,200-1,500 | 15+ years |
| Biogas | HomeBiogas 2.0 | $1,000-1,400 | 15+ years |
| Hydroponics | 30 towers | $1,000-1,500 | 5+ years |
| Grow Lights | 300W LED | $250-400 | 5+ years |
| Monitoring | Victron GX | $450-600 | 5+ years |
| **TOTAL** | | **$34,300-50,500** | |

### 6.2 USA - Family of 4 (USD)

| Component | Spec | Cost | Lifespan |
|-----------|------|------|----------|
| Solar | 8kW | $10,000-15,000 | 25 years |
| Battery | 30kWh | $10,000-18,000 | 15 years |
| Inverter | 6kW hybrid | $3,000-5,000 | 10 years |
| MPPT | 80A | $500-800 | 10 years |
| Water | 10,000 gal | $4,000-8,000 | 20+ years |
| Filtration | 5-stage | $800-1,200 | Ongoing |
| Composting Toilet | Nature's Head | $900-1,200 | 15+ years |
| **TOTAL** | | **$29,200-49,200** | |

### 6.3 UK - Family of 4 (GBP)

| Component | Spec | Cost | Lifespan |
|-----------|------|------|----------|
| Solar | 4kW | £5,000-8,000 | 25 years |
| Battery | 20kWh | £8,000-14,000 | 15 years |
| Inverter | 4kW hybrid | £2,000-3,500 | 10 years |
| MPPT | 50A | £300-500 | 10 years |
| Water | 5,000L | £3,000-5,000 | 20+ years |
| Filtration | 5-stage | £600-1,000 | Ongoing |
| Composting Toilet | Separett | £700-1,000 | 15+ years |
| **TOTAL** | | **£19,600-33,000** | |

---

## 7. Regional Reference

### 7.1 Peak Sun Hours

| City | Summer | Winter | Annual | Climate Zone |
|------|--------|--------|--------|--------------|
| Sydney, AU | 5.8 | 3.8 | 4.8 | Subtropical |
| Melbourne, AU | 5.5 | 3.0 | 4.3 | Temperate |
| Brisbane, AU | 6.0 | 4.5 | 5.3 | Subtropical |
| Perth, AU | 6.2 | 4.0 | 5.1 | Mediterranean |
| Darwin, AU | 6.5 | 5.5 | 6.0 | Tropical |
| Hobart, AU | 5.2 | 2.5 | 3.9 | Cool temperate |
| Los Angeles, US | 6.5 | 4.5 | 5.5 | Mediterranean |
| Phoenix, US | 7.0 | 5.5 | 6.3 | Desert |
| New York, US | 5.5 | 3.0 | 4.3 | Temperate |
| Seattle, US | 5.8 | 2.5 | 4.2 | Marine |
| Miami, US | 5.5 | 4.5 | 5.0 | Tropical |
| Denver, US | 6.2 | 4.0 | 5.1 | Mountain |
| London, UK | 5.0 | 2.0 | 3.5 | Oceanic |
| Edinburgh, UK | 4.8 | 1.8 | 3.3 | Oceanic |
| Amsterdam, NL | 5.2 | 2.2 | 3.7 | Oceanic |
| Berlin, DE | 5.5 | 2.5 | 4.0 | Continental |
| Madrid, ES | 6.5 | 4.0 | 5.3 | Continental |
| Rome, IT | 6.0 | 3.5 | 4.8 | Mediterranean |
| Toronto, CA | 5.8 | 3.0 | 4.4 | Continental |
| Vancouver, CA | 5.5 | 2.2 | 3.9 | Marine |

### 7.2 Temperature Data

| City | Summer °C | Winter °C | Frost Days/Year |
|------|-----------|-----------|-----------------|
| Sydney | 22-26 | 8-13 | 0 |
| Melbourne | 20-24 | 6-10 | 15 |
| Brisbane | 24-29 | 10-16 | 0 |
| Perth | 24-32 | 8-15 | 5 |
| Darwin | 28-34 | 20-28 | 0 |
| Los Angeles | 22-28 | 10-15 | 0 |
| New York | 24-29 | -3-4 | 90 |
| London | 17-22 | 2-7 | 30 |
| Berlin | 18-24 | -2-3 | 90 |
| Tokyo | 24-30 | 2-10 | 30 |

### 7.3 Unit Conversion

**Length:**
- 1mm = 0.039"
- 1cm = 0.394"
- 1m = 3.281ft = 39.4"
- 1km = 0.621mi

**Volume:**
- 1L = 0.264 gal (US) = 0.220 gal (UK)
- 1 gallon (US) = 3.785L
- 1 gallon (UK) = 4.546L
- 1m³ = 264 gal (US) = 220 gal (UK)

**Weight:**
- 1kg = 2.205 lb = 35.3 oz
- 1lb = 0.454kg
- 1oz = 28.35g

**Temperature:**
- °F = (°C × 9/5) + 32
- °C = (°F - 32) × 5/9

---

## 8. Maintenance Schedules

### 8.1 Weekly

- Check system voltages
- Visual inspection
- Electrolyte level (flooded batteries)
- Compost moisture

### 8.2 Monthly

- Clean solar panels
- Check all connections
- Performance comparison
- Filter inspection

### 8.3 Quarterly

- Terminal cleaning/torque
- Equalization charge (lead-acid)
- Clean gutters
- Test all safety devices

### 8.4 Annually

- Professional inspection
- Thermal imaging
- Capacity testing
- Complete system audit

---

## 9. Troubleshooting

### Solar

| Symptom | Cause | Solution |
|---------|-------|----------|
| Zero output | Breaker/ fuse | Reset/replace |
| Low output | Dirty/shaded | Clean/trim |
| Fluctuating | Weather | Normal |
| Inverter fault | Overload/wiring | Check load/wiring |

### Battery

| Symptom | Cause | Solution |
|---------|-------|----------|
| Won't charge | Bad cells | Replace |
| Low capacity | Age/degradation | Replace |
| Swelling | Overcharging | Check charger |
| BMS fault | Temp/SOC | Cool/wait |

### Water

| Symptom | Cause | Solution |
|---------|-------|----------|
| Low pressure | Clogged filter | Replace |
| Bad taste | Carbon | Replace |
| Algae | Light entry | Seal tank |
| Pump issues | Air lock | Bleed |

---

## 10. DIY Build Guides

### 10.1 DIY Solar Mount

**Materials:** $50-100/kW
- Aluminum angle 50×50×3mm
- Stainless M8 bolts
- Z-brackets
- Stainless washers

**Steps:**
1. Measure roof pitch
2. Cut angle to panel width
3. Drill Z-bracket holes
4. Attach to rafters
5. Mount panels

### 10.2 DIY Battery Box

**Materials:** $100-300
- PE/PP container (sealed)
- Copper bus bars
- Anderson connectors
- Ventilation

### 10.3 DIY Rainwater Diverter

**Materials:** $30-50
- 90mm PVC
- Ball valve
- Mesh screen

### 10.4 DIY Worm/BSFL Farm

**Materials:** $30-50
- 3× 20L bins
- Drill for drainage
- Shredded cardboard

---

## 11. Emergency Preparedness

| Item | Purpose | Cost AU | Cost US |
|------|---------|---------|---------|
| 100W Portable Panel | Emergency charging | $150-250 | $100-200 |
| Power Bank 20k mAh | Device backup | $50-100 | $40-80 |
| 12V Fridge | Food preservation | $300-600 | $250-500 |
| LED Lights | Illumination | $20-50 | $15-40 |
| Water Filter | Clean water | $50-150 | $40-120 |
| Portable Battery | Multiple devices | $150-300 | $120-250 |

---

## 12. Certifications & Standards

### Australia (AU)
- Solar: AS/NZS 5033
- Battery: AS/NZS 5139
- Wiring: AS/NZS 3000
- Water: AS/NZS 4020, AS/NZS 3500

### USA
- Solar: NEC Article 690
- Battery: UL 1741, UL 1973
- Wiring: NEC
- Water: NSF/ANSI

### EU
- Solar: IEC 61215, IEC 61730
- Battery: IEC 62619
- Wiring: IEC 60364

### UK
- Solar: BS EN 61215
- Wiring: BS 7671
- Water: WRAS

---

## Affiliate Links

**Template:** `https://www.amazon.{domain}/dp/{ASIN}?tag=offgridmaster-20`

**Top Products:**

| Category | AU Link | US Link | UK Link |
|----------|---------|---------|---------|
| 100Ah LiFePO4 | [Link](https://www.amazon.com.au/dp/B0B21CYWRD?tag=offgridmaster-20) | [Link](https://www.amazon.com/dp/B0B21CYWRD?tag=offgridmaster-20) | [Link](https://www.amazon.co.uk/dp/B0B21CYWRD?tag=offgridmaster-20) |
| 2000W Inverter | [Link](https://www.amazon.com.au/dp/B07RSN1CZG?tag=offgridmaster-20) | [Link](https://www.amazon.com/dp/B07RSN1CZG?tag=offgridmaster-20) | [Link](https://www.amazon.co.uk/dp/B07RSN1CZG?tag=offgridmaster-20) |
| MPPT 30A | [Link](https://www.amazon.com.au/dp/B09MHL8VPV?tag=offgridmaster-20) | [Link](https://www.amazon.com/dp/B09MHL8VPV?tag=offgridmaster-20) | [Link](https://www.amazon.co.uk/dp/B09MHL8VPV?tag=offgridmaster-20) |
| Grow Light 300W | [Link](https://www.amazon.com.au/dp/B08B9C1Z2H?tag=offgridmaster-20) | [Link](https://www.amazon.com/dp/B08B9C1Z2H?tag=offgridmaster-20) | [Link](https://www.amazon.co.uk/dp/B08B9C1Z2H?tag=offgridmaster-20) |
| Water Filter | [Link](https://www.amazon.com.au/dp/B08XYZ123?tag=offgridmaster-20) | [Link](https://www.amazon.com/dp/B08XYZ123?tag=offgridmaster-20) | [Link](https://www.amazon.co.uk/dp/B08XYZ123?tag=offgridmaster-20) |
| Composting Toilet | [Link](https://www.amazon.com.au/dp/B001QCZD8G?tag=offgridmaster-20) | [Link](https://www.amazon.com/dp/B001QCZD8G?tag=offgridmaster-20) | [Link](https://www.amazon.co.uk/dp/B001QCZD8G?tag=offgridmaster-20) |
| 12V Pump | [Link](https://www.amazon.com.au/dp/B08DEF456?tag=offgridmaster-20) | [Link](https://www.amazon.com/dp/B08DEF456?tag=offgridmaster-20) | [Link](https://www.amazon.co.uk/dp/B08DEF456?tag=offgridmaster-20) |
| Victron Inverter | [Link](https://www.amazon.com.au/dp/B07XYZ789?tag=offgridmaster-20) | [Link](https://www.amazon.com/dp/B07XYZ789?tag=offgridmaster-20) | [Link](https://www.amazon.co.uk/dp/B07XYZ789?tag=offgridmaster-20) |
| IBC Tank | [Link](https://www.amazon.com.au/dp/B08GHI456?tag=offgridmaster-20) | [Link](https://www.amazon.com/dp/B08GHI456?tag=offgridmaster-20) | [Link](https://www.amazon.co.uk/dp/B08GHI456?tag=offgridmaster-20) |

---

*Version 5.0 - Ultimate Global with Product Prices, Certifications, More DIY, Regional Temps, Voltage Selection, System Voltage Guidelines*  
*Affiliate: offgridmaster-20*  
*Last Updated: February 2026*