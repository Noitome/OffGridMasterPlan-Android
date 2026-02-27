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

**Panel Sizing Formula:**
```
Daily Generation (Wh) = Panel Watts × Peak Sun Hours × System Efficiency (0.85)

Example: 400W panel × 5 hours × 0.85 = 1,700Wh/day
```

**Orientation:**
- **Northern Hemisphere:** South-facing, tilt = latitude
- **Southern Hemisphere:** North-facing, tilt = latitude

**Tilt Angle Adjustment:**
| Season | Tilt |
|--------|------|
| Summer | Latitude - 15° |
| Winter | Latitude + 15° |
| Year-round | Latitude |

### 1.2 Battery Banks

**Chemistry Comparison**

| Type | Cycle Life | Depth of Discharge | Cost/kWh | Temperature Range |
|------|------------|-------------------|----------|-------------------|
| LiFePO4 (LFP) | 3000-5000 | 80-100% | $300-800 | -20°C to 60°C |
| AGM | 500-1000 | 50% | $200-500 | -40°C to 60°C |
| Gel | 1000-2000 | 50% | $300-600 | -40°C to 60°C |
| Flooded Lead-Acid | 500-1000 | 50% | $150-400 | -20°C to 50°C |
| Lithium NMC | 2000-3000 | 80-100% | $500-900 | -20°C to 55°C |

**Sizing:**
```
Capacity (Ah) = Daily Load (Wh) ÷ System Voltage ÷ DoD%
Days of Autonomy = Capacity × System Voltage × DoD% ÷ Daily Load
```

**Example:** 3000Wh/day, 48V, 80% DoD, 3 days autonomy:
- Daily capacity needed = 3000 ÷ 48 ÷ 0.8 = 78Ah
- 3-day bank = 78Ah × 3 = 234Ah

**Temperature Compensation:**
| Temperature | Charging Voltage Adjustment |
|-------------|---------------------------|
| 25°C | 1.00x (baseline) |
| 20°C | 1.03x |
| 15°C | 1.06x |
| 10°C | 1.09x |
| 5°C | 1.12x |
| 0°C | 1.15x |

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

**Types:**
| Type | Pros | Cons | Best For |
|------|------|------|----------|
| String Inverter | Cheaper, reliable | Single point failure | Grid-tie |
| Microinverters | Panel-level MPPT, no high DC | Cost, more points | Shaded arrays |
| Hybrid | All-in-one, smart | Expensive | Battery backup |
| Off-grid Specific | High surge, pure sine | Limited features | Full off-grid |

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
| London, UK | 600mm | 51,000L | 77,000L | 102,000L |
| Seattle, US | 970mm | 82,000L | 124,000L | 165,000L |
| Los Angeles, US | 300mm | 26,000L | 38,000L | 51,000L |
| Amsterdam, NL | 800mm | 68,000L | 102,000L | 136,000L |

**First Flush Requirements:**
```
First Flush (L) = Roof Area (m²) × 10

Example: 100m² roof = 1000L first flush needed
```

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
| London | 150 days | 150L | 90,000L |
| California | 180 days | 150L | 108,000L |

### 2.3 Filtration Stages

| Stage | Removes | Micron | Replacement | Cost AU | Cost US | Cost UK |
|-------|---------|--------|-------------|---------|---------|---------|
| Leaf Guard | Leaves | 2mm | 6-12 months | $50-100 | $40-80 | £35-70 |
| First Flush | Dirt | - | 5-10 years | $150-300 | $120-250 | £100-200 |
| Sediment | Sand/silt | 20μm | 3-6 months | $40/yr | $30/yr | £25/yr |
| Sediment | Fine | 1μm | 3-6 months | $50/yr | $40/yr | £35/yr |
| Carbon | Chlorine/taste | - | 6-12 months | $60/yr | $50/yr | £45/yr |
| UV | Bacteria/viruses | - | 12 months | $120/yr | $100/yr | £85/yr |

### 2.4 Greywater Systems

**Yield Estimation:**
| Source | L/person/day | Notes |
|--------|-------------|-------|
| Shower | 30-50 | Highest quality |
| Bath | 40-80 | If used |
| Basin | 10-20 | Low volume |
| Kitchen | 15-30 | Grease issues |
| Laundry | 30-50 | Detergent sensitive |

**Greywater Treatment:**

| Method | Complexity | Cost AU | Effectiveness |
|--------|------------|---------|--------------|
| Simple diversion | Low | $100-300 | 30% |
| Filter + wetland | Medium | $500-1,500 | 60% |
| Sand filter | Medium | $800-2,000 | 75% |
| Membrane bioreactor | High | $3,000-8,000 | 95% |

---

## 3. Waste Systems

### 3.1 Composting Toilets

**Comparison:**

| Model | Type | Capacity | Compost Quality | Cost AU | Cost US | Cost UK |
|-------|------|----------|-----------------|---------|---------|---------|
| Nature's Head | Split | 60-80 uses | Excellent | $900-1,400 | $800-1,200 | £700-1,000 |
| Separett Villa 9210 | Split | 40-60 uses | Excellent | $800-1,200 | $700-1,000 | £600-900 |
| Sun-Mar Excel | Single | 30-50 uses | Good | $1,200-1,800 | $1,000-1,500 | £850-1,200 |
| Airhead | Split | 40-60 uses | Excellent | $700-1,100 | $600-900 | £500-800 |
| DIY 5-gallon | Split | 20-30 uses | Good | $150-300 | $120-250 | £100-200 |

**Vent Requirements:**
- Minimum 3" (75mm) vent pipe
- Extend 300mm above roofline
- Install in shade when possible

### 3.2 Urine Diversion

**Yields:**
| Source | Volume/Day | Nitrogen | Phosphorus | Potassium |
|--------|------------|----------|------------|-----------|
| Urine | 1-2L/person | 6-10g N | 0.5-1g P | 1-2g K |
| Diluted (1:8) | 9-18L | 0.75-1.25g/L | 0.06-0.12g/L | 0.12-0.25g/L |

**Applications:**
- Dilute 1:8 for aquaponics
- Direct to ornamental gardens
- Compost accelerator

### 3.3 Biogas Systems

| System | Input Capacity | Gas Output | Cooking Time | Cost AU | Cost US |
|--------|----------------|------------|--------------|---------|---------|
| HomeBiogas 2.0 | 120L | 0.5-0.7m³ | 2-3 hrs | $800-1,200 | $700-1,000 |
| HomeBiogas 7.0 | 400L | 1.5-2m³ | 4-6 hrs | $2,000-3,000 | $1,800-2,500 |
| Biobag 200L | 200L | 0.8-1m³ | 2-3 hrs | $300-500 | $250-400 |
| DIY 1000L IBC | 1000L | 2-3m³ | 4-6 hrs | $400-800 | $350-700 |

**Feedstock Requirements:**
| Input | Gas Yield | Notes |
|-------|-----------|-------|
| Cow manure | 0.03-0.04 m³/kg | High fiber |
| Pig manure | 0.04-0.05 m³/kg | Good |
| Human urine | 0.02 m³/kg | Dilute 1:5 |
| Food scraps | 0.05-0.06 m³/kg | Best |
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

**DIY BSF Bin:**
- Cost: $50-150
- Capacity: 10-20kg/week
- Harvest: Self-harvesting ramp design

---

## 4. Food Autonomy

### 4.1 Hydroponic Systems

**System Comparison:**

| System | Initial Cost | Complexity | Water Use | Yield/m² | Best For |
|--------|--------------|------------|-----------|----------|----------|
| DWC | $200-500 | Low | Very Low | 20-30kg | Leafy greens |
| NFT | $300-800 | Medium | Very Low | 25-40kg | Herbs, lettuce |
| Drip | $400-1,000 | Medium | Low | 30-50kg | Fruiting |
| Ebb & Flow | $300-700 | Medium | Medium | 25-40kg | Versatile |
| Aeroponics | $500-1,500 | High | Lowest | 40-60kg | Premium |
| Vertical Tower | $400-1,200 | Medium | Low | 40-80kg | Space-limited |

**Nutrient Recipes (per 1000L):**

*Vegetative (High N):*
| Nutrient | Amount |
|----------|--------|
| Calcium Nitrate | 150g |
| Potassium Nitrate | 100g |
| Ammonium Nitrate | 30g |
| MKP | 100g |
| Magnesium Sulfate | 100g |
| Trace Mix | 50g |

*Fruiting (High P/K):*
| Nutrient | Amount |
|----------|--------|
| Calcium Nitrate | 120g |
| Potassium Nitrate | 200g |
| Mono Potassium Phosphate | 150g |
| Magnesium Sulfate | 100g |
| Potassium Sulfate | 80g |
| Trace Mix | 50g |

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
- Tilapia, Goldfish, Koi, Pacu

*Temperate (15-25°C):*
- Silver Perch, Murray Cod, Yabbies, Trout (cold)

*Cold (10-20°C):*
- Trout, Salmon, Arctic Char

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

**Light Spectrum:**

| Spectrum | nm | Effect |
|----------|-----|--------|
| Blue | 400-500 | Vegetative growth, compact plants |
| Green | 500-565 | Photosynthesis (less absorbed) |
| Red | 620-700 | Flowering, fruiting |
| Far Red | 700-750 | Stem elongation |
| UV | 280-400 | Pest resistance, essential oils |

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
| 2/0 | 67.43 | 145A | 175A | 115A |

**Voltage Drop Calculator:**
```
VD% = (2 × K × I × L) / (V × CM)

K = 10.8 (copper), 21.2 (aluminum)
I = Current (A)
L = One-way distance (ft)
V = System voltage
CM = Wire circular mils

Max 3% for critical, 5% for general
```

**Quick Reference (12V, 3% VD, Copper):**

| Watts | 10ft | 20ft | 30ft | 50ft |
|-------|------|------|------|------|
| 100W | 14 AWG | 12 AWG | 10 AWG | 10 AWG |
| 200W | 12 AWG | 10 AWG | 8 AWG | 8 AWG |
| 300W | 10 AWG | 10 AWG | 8 AWG | 6 AWG |
| 500W | 10 AWG | 8 AWG | 6 AWG | 4 AWG |
| 1000W | 8 AWG | 6 AWG | 4 AWG | 2 AWG |

### 5.2 Solar Wire Sizing

| System Size | Wire (PV to Controller) | Wire (Controller to Battery) |
|-------------|------------------------|------------------------------|
| 1000W 12V | 6 AWG | 4 AWG |
| 2000W 24V | 8 AWG | 6 AWG |
| 5000W 48V | 10 AWG | 8 AWG |
| 10000W 48V | 8 AWG | 6 AWG |

### 5.3 Protection Devices

**DC Protection:**

| Application | Breaker | Rating | Notes |
|-------------|---------|--------|-------|
| Solar input | DC MC4 | 1.25× Isc | String fusing |
| Battery | DC Breaker | 1.25× Max | Main disconnect |
| Inverter | DC Breaker | 2× Max | Surge capacity |
| Load | DC Breaker | 1.1× Max | Circuit protect |

**AC Protection:**

| Application | Breaker | Rating |
|-------------|---------|--------|
| Inverter output | AC | 1.25× Max |
| Main panel | AC | Service rating |
| Circuits | AC | 15A/20A standard |

### 5.4 Monitoring Systems

| System | Parameters | Cost AU | Cost US |
|--------|------------|---------|---------|
| Victron GX | All | $400-600 | $350-500 |
| Shunt + ESPHome | Voltage, current, SOC | $50-150 | $40-120 |
| Simarine Pico | Multi-bank, pumps | $400-600 | $350-500 |
| Midnight Solar | Solar specific | $200-400 | $180-350 |

---

## 6. System Integration

### 6.1 Load Calculator

**Appliance Power Database:**

| Appliance | Watts | Daily Hours | Daily Wh | Notes |
|-----------|-------|-------------|----------|-------|
| Fridge (12V compressor) | 40-80 | 24 | 500-1200 | Cycling |
| Fridge (AC) | 80-150 | 24 | 800-2000 | Less efficient |
| LED Lights (total) | 5-60 | 4-8 | 20-300 | Varies |
| WiFi Router | 10-20 | 24 | 240-480 | Always on |
| Phone/Laptop | 20-65 | 2-6 | 40-300 | Charging |
| Water Pump (12V) | 50-150 | 0.5-2 | 25-300 | Pressure system |
| Water Pump (240V) | 500-1500 | 0.5-2 | 250-3000 | Submersible |
| Microwave | 600-1500 | 0.25 | 150-375 | |
| Washing Machine | 300-500 | 1-2 | 300-1000 | Cold wash |
| Clothes Dryer | 2000-3000 | 1 | 2000-3000 | Avoid if possible |
| AC Unit | 1000-2000 | 4-8 | 4000-16000 | Huge load |
| Heater | 1000-2000 | 2-4 | 2000-8000 | Electric resistive |
| TV | 50-150 | 2-6 | 100-600 | |
| Entertainment | 50-200 | 4-8 | 200-1000 | |

**Efficiency Tips:**
- Replace AC with evaporative where possible
- Gas for cooking/heating
- Solar hot water
- Insulate, insulate, insulate

### 6.2 Architecture Diagrams

**Grid-Tie with Battery Backup:**
```
[Solar Array] → [Grid-Tie Inverter] → [Main Panel]
                      ↓
              [Battery] ← [Battery Converter]
```

**Full Off-Grid:**
```
[Solar] → [MPPT] → [Battery Bank] → [Inverter] → [Sub Panel]
    ↓                                           
[DC Loads]                                      
```

**Hybrid:**
```
[Solar] → [Hybrid Inverter] ↔ [Battery]
                ↓
           [Grid] → [Main Panel]
```

### 6.3 Complete System Examples

**Australia - Family of 4 (AUD):**

| Component | Spec | Cost | Lifespan |
|-----------|------|------|----------|
| Solar | 6.6kW | $4,500-6,000 | 25 years |
| Battery | 30kWh LFP | $12,000-18,000 | 15 years |
| Inverter | 5kW hybrid | $2,500-4,000 | 10 years |
| Water Tank | 50kL | $10,000-15,000 | 20+ years |
| Filtration | 5-stage | $1,000-1,500 | Ongoing |
| Composting Toilet | Nature's Head | $1,200-1,500 | 15+ years |
| Biogas | HomeBiogas 2.0 | $1,000-1,400 | 15+ years |
| Hydroponics | 30 towers | $1,000-1,500 | 5+ years |
| **TOTAL** | | **$33,200-48,900** | |

**USA - Family of 4 (USD):**

| Component | Spec | Cost | Lifespan |
|-----------|------|------|----------|
| Solar | 8kW | $10,000-15,000 | 25 years |
| Battery | 30kWh | $10,000-18,000 | 15 years |
| Inverter | 6kW hybrid | $3,000-5,000 | 10 years |
| Water | 10,000 gal | $4,000-8,000 | 20+ years |
| Filtration | 5-stage | $800-1,200 | Ongoing |
| Composting Toilet | Nature's Head | $900-1,200 | 15+ years |
| **TOTAL** | | **$28,700-48,400** | |

**UK - Family of 4 (GBP):**

| Component | Spec | Cost | Lifespan |
|-----------|------|------|----------|
| Solar | 4kW | £5,000-8,000 | 25 years |
| Battery | 20kWh | £8,000-14,000 | 15 years |
| Inverter | 4kW hybrid | £2,000-3,500 | 10 years |
| Water | 5,000L | £3,000-5,000 | 20+ years |
| Filtration | 5-stage | £600-1,000 | Ongoing |
| Composting Toilet | Separett | £700-1,000 | 15+ years |
| **TOTAL** | | **£19,300-32,500** | |

---

## 7. Regional Reference

### 7.1 Peak Sun Hours

| City | Summer | Winter | Annual | Notes |
|------|--------|--------|--------|-------|
| Sydney, AU | 5.8 | 3.8 | 4.8 | Good year-round |
| Melbourne, AU | 5.5 | 3.0 | 4.3 | Winter drop |
| Brisbane, AU | 6.0 | 4.5 | 5.3 | Best AU |
| Perth, AU | 6.2 | 4.0 | 5.1 | Excellent |
| Darwin, AU | 6.5 | 5.5 | 6.0 | Best AU |
| Los Angeles, US | 6.5 | 4.5 | 5.5 | Excellent |
| Phoenix, US | 7.0 | 5.5 | 6.3 | Best US |
| New York, US | 5.5 | 3.0 | 4.3 | Moderate |
| Seattle, US | 5.8 | 2.5 | 4.2 | Winter poor |
| Miami, US | 5.5 | 4.5 | 5.0 | Good |
| London, UK | 5.0 | 2.0 | 3.5 | Poor |
| Edinburgh, UK | 4.8 | 1.8 | 3.3 | Very poor |
| Amsterdam, NL | 5.2 | 2.2 | 3.7 | Moderate |
| Berlin, DE | 5.5 | 2.5 | 4.0 | Moderate |
| Madrid, ES | 6.5 | 4.0 | 5.3 | Good |
| Rome, IT | 6.0 | 3.5 | 4.8 | Good |
| Toronto, CA | 5.8 | 3.0 | 4.4 | Moderate |
| Vancouver, CA | 5.5 | 2.2 | 3.9 | Winter poor |

### 7.2 Climate Zones

**Australia:**
| Zone | Description | Examples |
|------|-------------|----------|
| Tropical | Hot, humid | Darwin, Cairns |
| Subtropical | Warm, humid | Brisbane, Sydney |
| Temperate | Mild | Melbourne, Adelaide |
| Mediterranean | Dry summer | Perth |
| Arid | Hot, dry | Alice Springs |
| Cool/Temperate | Cold winters | Hobart, Canberra |

**Solar Output Multipliers:**
| Zone | Summer | Winter |
|------|--------|--------|
| Tropical | 1.0 | 0.9 |
| Subtropical | 1.0 | 0.8 |
| Temperate | 0.95 | 0.7 |
| Mediterranean | 1.0 | 0.75 |
| Arid | 1.1 | 0.85 |
| Cool | 0.9 | 0.6 |

### 7.3 Temperature Conversion

| °C | °F | Description |
|----|----|-------------|
| -20 | -4 | Extreme cold |
| -10 | 14 | Very cold |
| 0 | 32 | Freezing |
| 5 | 41 | Cold |
| 10 | 50 | Cool |
| 15 | 59 | Mild |
| 20 | 68 | Comfortable |
| 25 | 77 | Warm |
| 30 | 86 | Hot |
| 35 | 95 | Very hot |
| 40 | 104 | Extreme heat |

### 7.4 Unit Conversion Tables

**Length:**
| mm | cm | m | in | ft | yd |
|----|----|----|----|----|-----|
| 1 | 0.1 | 0.001 | 0.039 | 0.003 | 0.001 |
| 10 | 1 | 0.01 | 0.394 | 0.033 | 0.011 |
| 1000 | 100 | 1 | 39.4 | 3.28 | 1.09 |

**Volume:**
| L | mL | gal (US) | gal (UK) | fl oz (US) |
|----|----|----------|----------|-------------|
| 1 | 1000 | 0.264 | 0.220 | 33.8 |
| 3.785 | 3785 | 1 | 0.833 | 128 |
| 4.546 | 4546 | 1.20 | 1 | 154 |

**Weight:**
| kg | g | lb | oz |
|----|----|----|----|
| 1 | 1000 | 2.205 | 35.3 |
| 0.001 | 1 | 0.002 | 0.035 |
| 0.454 | 454 | 1 | 16 |

---

## 8. Maintenance Schedules

### 8.1 Solar System

| Task | Frequency | Time | Notes |
|------|-----------|------|-------|
| Visual inspection | Weekly | 5 min | Check for damage |
| Panel cleaning | Monthly | 30 min | Water, soft brush |
| Performance check | Monthly | 15 min | Compare to expected |
| Terminal inspection | Quarterly | 30 min | Tighten, clean |
| Thermal scan | Annually | 2 hrs | Professional |
| Professional service | Annually | 3 hrs | Full inspection |

### 8.2 Battery System

**LFP:**
| Task | Frequency |
|------|-----------|
| Visual inspection | Monthly |
| Terminal clean/torque | Quarterly |
| Capacity test | Annually |
| BMS update | As needed |

**Flooded Lead-Acid:**
| Task | Frequency |
|------|-----------|
| Electrolyte level | Weekly |
| Specific gravity | Weekly |
| Top up water | Weekly |
| Equalization | Monthly |
| Terminal clean | Monthly |

### 8.3 Water System

| Task | Frequency |
|------|-----------|
| Gutters clean | 6 months |
| First flush check | 3 months |
| Sediment filter | 3-6 months |
| Carbon filter | 6-12 months |
| UV bulb | 12 months |
| Tank inspection | Annually |
| Pressure test | Annually |

### 8.4 Composting System

| Task | Frequency |
|------|-----------|
| Toilet empty | 1-2 weeks |
| Compost turn | Weekly |
| Moisture check | 2-3× week |
| Vent check | Monthly |
| Complete cycle | 3-6 months |

---

## 9. Troubleshooting

### 9.1 Solar Problems

| Symptom | Cause | Solution |
|---------|-------|----------|
| Zero output | Breaker tripped | Reset breaker |
| Low output | Dirty panels | Clean panels |
| Low output | Shading | Trim trees, reposition |
| Fluctuating | Cloud cover | Normal |
| Inverter fault | Overload | Reduce load |
| No charge | Controller fault | Check wiring, replace |

### 9.2 Battery Problems

| Symptom | Cause | Solution |
|---------|-------|----------|
| Won't charge | Bad cells | Replace battery |
| Low capacity | Old cells | Replace battery |
| Swelling | Overcharging | Check charger |
| Balancing | Weak cell | Replace cell |
| BMS fault | Temp/voltage | Check connections |

### 9.3 Water Problems

| Symptom | Cause | Solution |
|---------|-------|----------|
| Low pressure | Filter clogged | Replace filter |
| Bad taste/smell | Carbon spent | Replace carbon |
| Algae | Light entry | Seal, clean tank |
| Pump won't start | Air lock | Bleed pump |
| Overflowing | Overflow blocked | Clear overflow |

### 9.4 Composting Problems

| Symptom | Cause | Solution |
|---------|-------|----------|
| Smelly | Too wet, too much nitrogen | Add browns, aerate |
| Not decomposing | Too dry, too much browns | Add water, greens |
| Fruit flies | Food waste exposed | Cover with browns |
| Liquid overflow | Too wet | Add browns, drain |

---

## 10. DIY Build Guides

### 10.1 DIY Solar Panel Mount

**Materials:**
- Aluminum angle 50×50×3mm
- Stainless bolts M8
- Z-brackets for panel
- Stainless steel washers

**Steps:**
1. Measure roof pitch
2. Cut angle to match panel width
3. Drill holes for Z-brackets
4. Attach to rafters with coach bolts
5. Mount panels with clamps

**Cost:** $50-100 per kW

### 10.2 DIY Battery Box

**Materials:**
- PE or PP container (sealed)
- Bus bars (copper)
- Anderson connectors
- Ventilation pipe

**Steps:**
1. Size box for batteries + 10%
2. Install ventilation (outdoor only)
3. Mount bus bars
4. Wire batteries in series/parallel
5. Install BMS if applicable

**Cost:** $100-300

### 10.3 DIY Rainwater Diverter

**Materials:**
- 90mm PVC pipe
- 90mm overflow
- Ball valve
- Mesh screen

**Steps:**
1. Cut 300mm section of gutter
2. Install diverter body
3. Connect downpipe
4. Attach hose to diverter outlet
5. Test flow

**Cost:** $30-50

### 10.4 DIY Worm Farm/BSFL Bin

**Materials:**
- 3x stacking bins (20L)
- Drill for drainage
- Mesh for drainage
- Spade for harvesting

**Steps:**
1. Drill holes in bottom bin
2. Add drainage layer (rocks)
3. Add bedding (shredded cardboard)
4. Add larvae or worms
5. Add food waste, cover

**Cost:** $30-50

---

## 11. Emergency Preparedness

### 11.1 Emergency Kit

| Item | Purpose | Cost AU | Cost US |
|------|---------|---------|---------|
| 100W portable panel | Emergency charging | $150-250 | $100-200 |
| Power bank 20,000mAh | Phone/device backup | $50-100 | $40-80 |
| 12V fridge | Food preservation | $300-600 | $250-500 |
| LED lights | Illumination | $20-50 | $15-40 |
| Water filter | Clean water | $50-150 | $40-120 |

### 11.2 Blackout Plan

1. **Critical loads identified** - Medical, communication
2. **Battery sized** - 24-48 hour autonomy
3. **Manual override** - Gas backup option
4. **Water backup** - Stored supply + filter

---

## 12. Permaculture Integration

### 12.1 System Stacking

| Element | Functions | Output |
|---------|-----------|--------|
| Solar | Power | Electricity |
| Rainwater | Water | Irrigation |
| Compost | Waste | Fertilizer |
| Aquaponics | Fish + plants | Food |
| Orchards | Fruit | Food |
| Animals | Eggs, meat, manure | Protein, fertilizer |

### 12.2 Water Loop

```
Rain → Roof → Tank → Household → Greywater → 
→ Reed bed → Orchard → Evapotranspiration
     ↓
Urine → Orchard
     ↓
Humanure → Compost → Garden
```

### 12.3 Energy Loop

```
Solar → Battery → Household → Waste
              ↓
        EV/V2H → Transport → Battery
```

---

## Affiliate Links

**Template:** `https://www.amazon.{domain}/dp/{ASIN}?tag=offgridmaster-20`

**Top Products:**

| Category | Product | AU | US | UK |
|----------|---------|----|----|-----|
| Battery | 100Ah LiFePO4 | [Link](https://www.amazon.com.au/dp/B0B21CYWRD?tag=offgridmaster-20) | [Link](https://www.amazon.com/dp/B0B21CYWRD?tag=offgridmaster-20) | [Link](https://www.amazon.co.uk/dp/B0B21CYWRD?tag=offgridmaster-20) |
| Inverter | 2000W Pure Sine | [Link](https://www.amazon.com.au/dp/B07RSN1CZG?tag=offgridmaster-20) | [Link](https://www.amazon.com/dp/B07RSN1CZG?tag=offgridmaster-20) | [Link](https://www.amazon.co.uk/dp/B07RSN1CZG?tag=offgridmaster-20) |
| MPPT | 30A Controller | [Link](https://www.amazon.com.au/dp/B09MHL8VPV?tag=offgridmaster-20) | [Link](https://www.amazon.com/dp/B09MHL8VPV?tag=offgridmaster-20) | [Link](https://www.amazon.co.uk/dp/B09MHL8VPV?tag=offgridmaster-20) |
| Grow Light | 300W LED | [Link](https://www.amazon.com.au/dp/B08B9C1Z2H?tag=offgridmaster-20) | [Link](https://www.amazon.com/dp/B08B9C1Z2H?tag=offgridmaster-20) | [Link](https://www.amazon.co.uk/dp/B08B9C1Z2H?tag=offgridmaster-20) |
| Filter | Whole House | [Link](https://www.amazon.com.au/dp/B08XYZ123?tag=offgridmaster-20) | [Link](https://www.amazon.com/dp/B08XYZ123?tag=offgridmaster-20) | [Link](https://www.amazon.co.uk/dp/B08XYZ123?tag=offgridmaster-20) |
| Toilet | Nature's Head | [Link](https://www.amazon.com.au/dp/B001QCZD8G?tag=offgridmaster-20) | [Link](https://www.amazon.com/dp/B001QCZD8G?tag=offgridmaster-20) | [Link](https://www.amazon.co.uk/dp/B001QCZD8G?tag=offgridmaster-20) |
| Tank | 10,000L Poly | [Link](https://www.amazon.com.au/dp/B07ABC123?tag=offgridmaster-20) | N/A | N/A |
| Pump | 12V Pressure | [Link](https://www.amazon.com.au/dp/B08DEF456?tag=offgridmaster-20) | [Link](https://www.amazon.com/dp/B08DEF456?tag=offgridmaster-20) | [Link](https://www.amazon.co.uk/dp/B08DEF456?tag=offgridmaster-20) |

---

*Version 4.0 - Global Dynamic with DIY Guides, Climate Zones, Emergency Prep, Permaculture Integration*  
*Affiliate: offgridmaster-20*  
*Last Updated: February 2026*