# OffGridMasterPlan Technical Reference

Comprehensive depth on all available technologies in the app.

---

## 1. Solar Power Systems

### 1.1 Solar Panels

**Monocrystalline vs Polycrystalline vs Thin-Film**

| Type | Efficiency | Lifespan | Best For |
|------|------------|----------|----------|
| Monocrystalline | 20-23% | 25-30 years | Limited roof space, maximum output |
| Polycrystalline | 15-17% | 25 years | Budget constraints, large arrays |
| Thin-Film | 10-13% | 20 years | Flexible mounting, unusual surfaces |

**Panel Sizing Formula:**
```
Daily Generation (Wh) = Panel Watts × Peak Sun Hours × System Efficiency (0.85)
```

**Orientation (Southern Hemisphere):**
- Optimal: North-facing at angle equal to latitude
- Melbourne: 37.8° tilt, facing north
- Acceptable: ±20° from north, ±10° from optimal tilt

**Temperature Effects:**
- Panels lose ~0.4% efficiency per °C above 25°C
- Hot climates need larger arrays than cool ones

### 1.2 Battery Banks

**Battery Chemistry Comparison**

| Type | Cycle Life | Depth of Discharge | Cost/kWh | Best For |
|------|------------|-------------------|----------|----------|
| LiFePO4 (LFP) | 3000-5000 | 80-100% | $400-800 | Mainstream off-grid |
| AGM | 500-1000 | 50% | $300-500 | Budget, seasonal use |
| Gel | 1000-2000 | 50% | $400-600 | Deep cycle, sealed needed |
| Flooded Lead-Acid | 500-1000 | 50% | $200-400 | Maximum budget |
| Lithium NMC | 2000-3000 | 80-100% | $600-900 | High performance |

**LFP (LiFePO4) Advantages:**
- Non-toxic, no thermal runaway risk
- Can be discharged to 80% daily
- 10+ year lifespan with proper care
- Flat discharge curve = consistent power

**Battery Bank Sizing:**
```
Bank Capacity (Ah) = Daily Load (Wh) ÷ System Voltage ÷ DoD%
```

Example: 3000Wh/day, 48V system, 80% DoD = 3000 ÷ 48 ÷ 0.8 = 78Ah minimum

### 1.3 Inverters

**Pure Sine Wave vs Modified Sine Wave**

| Feature | Pure Sine Wave | Modified Sine Wave |
|---------|---------------|-------------------|
| Appliance Compatibility | All AC devices | Motors buzz, some fail |
| Efficiency | 90-95% | 75-85% |
| Cost | Higher | Lower |
| Recommended | Always | Never for off-grid |

**Inverter Sizing:**
```
Inverter Rating (W) = Peak Load × 1.25 (surge capacity)
```

For 2000W peak load, use 2500W inverter minimum.

**Inverter Types:**
- **String Inverter:** Single unit, panel series connection
- **Microinverters:** One per panel, panel-level optimization
- **Hybrid Inverter:** Built-in MPPT charger for batteries

---

## 2. Water Systems

### 2.1 Rainwater Harvesting

**Catchment Calculation:**
```
Annual Yield (L) = Roof Area (m²) × Annual Rainfall (mm) × 0.8 (efficiency factor)
```

**First Flush Diverter:**
- Diverts first 10-20L of rainfall (dirtiest)
- Critical for water quality
- Automatic reset after rain stops

**Tank Sizing Formula:**
```
Tank Size (L) = Daily Usage (L) × Dry Days Buffer × Safety Factor (1.2)
```

### 2.2 Water Filtration

**Multi-Stage Filtration Train:**

| Stage | Removes | Replacement | Cost |
|-------|---------|-------------|------|
| Leaf Guard/Gutter Mesh | Leaves, debris | 6-12 months | $50-100 |
| First Flush Diverter | Initial dirty runoff | 5-10 years | $150-300 |
| Sediment Filter (20μm) | Sand, silt, rust | 3-6 months | $20-40/yr |
| Carbon Filter | Chlorine, taste, odor, VOCs | 6-12 months | $40-60/yr |
| UV Sterilizer | Bacteria, viruses, parasites | 12 months (bulb) | $80-120/yr |

### 2.3 Greywater Systems

**Sources (in order of quality):**
1. Shower/bath water (highest)
2. Washing machine (high)
3. Bathroom sink (medium)
4. Kitchen sink (low, grease issues)

**Greywater Treatment:**
- Physical filtration (200μm mesh)
- Biological treatment (biofilter/constructed wetland)
- Disinfection (UV or chlorine)

**Greywater to Toilet/Irrigation:**
- Requires 50-100L/day per person for toilet flushing
- Can reduce water consumption by 30-40%

---

## 3. Waste Systems (Humanure)

### 3.1 Urine Diversion

**Urine Composition:**
- Nitrogen: 11g/L
- Phosphorus: 1g/L  
- Potassium: 3g/L
- pH: 6-9

**Applications:**
- Direct to aquaponics (dilute 1:10)
- Fertilizer for non-edible plants
- Composting accelerator

### 3.2 Solid Waste (Humanure)

**Composting Toilet Options:**

| Type | Complexity | Cost | Maintenance |
|------|------------|------|-------------|
| Separett Villa | Medium | $800-1200 | Weekly emptying |
| Nature's Head | Medium | $900-1400 | Weekly emptying |
| DIY Composting | High | $200-500 | Monthly management |

**BSFL (Black Soldier Fly Larvae) Treatment:**
- Self-harvesting larvae eat 25% of body weight daily
- Produces high-protein chicken feed
- Residue goes to compost
- 90% waste reduction

### 3.3 Biogas Digesters

**HomeBiogas System:**
- Input: Human waste, food scraps, animal manure
- Output: Methane gas for cooking (2-3 hours/day)
- Residue: High-quality liquid fertilizer
- Capacity: 1-4 person household

**Biogas Composition:**
- Methane: 60-70%
- CO2: 30-40%
- Trace H2S (odorant)

---

## 4. Food Autonomy

### 4.1 Hydroponic Systems

**Types Comparison:**

| System | Complexity | Water Use | Yield | Best For |
|--------|------------|-----------|-------|----------|
| DWC (Deep Water Culture) | Low | Very Low | High | Leafy greens |
| NFT (Nutrient Film) | Medium | Very Low | High | Herbs, lettuce |
| Drip | Medium | Low | Very High | Fruiting plants |
| Aeroponics | High | Lowest | Highest | Premium crops |
| Vertical Tower | Medium | Low | Very High | Space-limited |

**Nutrient Requirements:**
- Vegetative: N-P-K 3:1:2
- Flowering: N-P-K 1:3:2
- EC: 1.2-2.5 mS/cm
- pH: 5.8-6.2

### 4.2 Aquaponics

**The Loop:**
- Fish waste → Ammonia → Bacteria → Nitrites → Nitrates → Plants → Clean water → Fish

**Fish Species (Temperate Climate):**
- Silver Perch: Hardy, good eating
- Murray Cod: Fast growing
- Yabbies (Crayfish): Excellent, easy

**System Ratios:**
- 1kg fish → supports 3-5kg vegetables annually
- Minimum 1000L tank for year-round production

### 4.3 Grow Lights

**LED vs Other Technologies:**

| Factor | LED | HPS | Fluorescent |
|--------|-----|-----|-------------|
| Efficiency | 2.0-2.5 μmol/J | 1.0-1.5 μmol/J | 0.8-1.0 μmol/J |
| Heat | Low | High | Medium |
| Lifespan | 50,000 hrs | 10,000 hrs | 10,000 hrs |
| Cost | High | Medium | Low |

**Light Scheduling:**
- Leafy greens: 14-16 hours on
- Fruiting plants: 12-14 hours on
- Seedlings: 18-20 hours on

**PPFD Requirements:**
- < 200 μmol/m²/s: Low light (shade tolerant)
- 200-400: Medium light (leafy greens)
- 400-600: High light (fruiting)
- 600-1000: Intense light (tropical)

---

## 5. Advanced Waste (Landfill Diversion)

### 5.1 Plastic-to-Diesel Pyrolysis

**Process:**
1. Heat plastic to 400-500°C in oxygen-free environment
2. Plastic breaks down into hydrocarbon vapors
3. Condense into diesel, gasoline, wax
4. Non-condensable gas fuels the process

**Output from 1kg Plastic:**
- 0.8L diesel
- 0.1L gasoline
- 0.1L wax
- Gas (recycled)

**Scale Options:**
- Home: 5-10kg batch
- Community: 50-100kg/day
- Commercial: 500+ kg/day

### 5.2 Composting (General)

**Browns vs Greens Ratio:**
- Ideal: 25-30:1 carbon:nitrogen
- More browns = slower, finer compost
- More greens = faster, hotter, smell risk

**Compost Temperatures:**
- Mesophilic: 20-45°C
- Thermophilic: 45-70°C (pathogen kill)
- Turn at 55°C for fast decomposition

---

## 6. Electrical Systems

### 6.1 Wire Sizing (AWG to mm²)

**American Wire Gauge (AWG) to Metric:**

| AWG | mm² | Max Amps (Copper) | Max Amps (Aluminum) |
|-----|-----|-------------------|---------------------|
| 14 | 2.08 | 15A | 12A |
| 12 | 3.31 | 20A | 15A |
| 10 | 5.26 | 30A | 25A |
| 8 | 8.37 | 40A | 30A |
| 6 | 13.30 | 55A | 40A |
| 4 | 21.15 | 70A | 55A |
| 2 | 33.62 | 95A | 75A |
| 1/0 | 53.49 | 125A | 100A |

**Voltage Drop Formula:**
```
VD = (2 × K × I × L) / CM
```
Where:
- K = 10.8 (copper) or 21.2 (aluminum)
- I = Current in amps
- L = One-way distance in feet
- CM = Circular mils (wire size)

**3% Voltage Drop Rule:**
- Critical circuits (medical, data): 3%
- General wiring: 5%
- Long runs: 7% (acceptable)

### 6.2 Protection Devices

**Circuit Breaker Types:**

| Type | Use Case | Response |
|------|----------|----------|
| Standard | General AC | Thermal |
| GFCI | Wet locations | 5mA trip |
| AFCI | Arcing prevention | Fast trip |
| DC Breaker | Solar/battery | 1000V rated |

**Fuse Types:**
- **ANL:** Common in DC systems, fast blow
- **Midi:** Midi fuse, automotive style
- **Class T:** Very fast acting, high DC rating

### 6.3 Monitoring Systems

**Shunt-Based Monitoring:**
- Measure current via shunt resistor
- Calculate amp-hours used
- SOC (State of Charge) calculation

**Popular Monitoring Platforms:**
| System | Features | Cost |
|--------|----------|------|
| Victron Venus GX | Full system, display | $300-500 |
| Rogowski Coils + ESP32 | DIY, cheap | $50-100 |
| Victron SmartShunt | Single battery | $150-200 |
| Simarine Pico | Multi-battery, pumps | $400-600 |

---

## 7. System Integration

### 7.1 Load Calculation Worksheet

**Appliance Power Chart:**

| Appliance | Watts | Hours/Day | Daily Wh |
|-----------|-------|-----------|----------|
| Refrigerator (12V) | 50-150 | 24 | 600-1500 |
| LED Lights (total) | 5-60 | 4-8 | 20-300 |
| WiFi Router | 10-20 | 24 | 240-480 |
| Laptop | 30-65 | 4-8 | 120-400 |
| Phone Charging | 5-10 | 2 | 10-20 |
| Water Pump | 200-1000 | 0.5-2 | 100-1000 |
| Microwave | 600-1500 | 0.25 | 150-375 |
| Washing Machine | 300-500 | 1 | 300-500 |

### 7.2 System Diagram Architecture

```
[Solar Panels] → [MPPT Charge Controller] → [Battery Bank] → [Inverter] → [Distribution Panel]
                      ↓                        ↓
               [DC Loads]             [12V/24V/48V Bus]
                      ↓
              [Dump Load]
```

### 7.3 Integration Example: 100% Off-Grid

**Component Sizing for Family of 4:**

| Component | Specification | Cost Estimate |
|-----------|---------------|---------------|
| Solar | 5kW (10 × 500W panels) | $4,000-5,000 |
| Battery | 30kWh LFP (48V, 625Ah) | $8,000-12,000 |
| Inverter | 5kW pure sine | $1,500-2,500 |
| Charge Controller | 60A MPPT | $500-800 |
| Water Catchment | 50kL tank | $8,000-12,000 |
| Filtration | 5-stage | $500-1,000 |
| Composting Toilet | Nature's Head | $1,000-1,500 |
| Biogas Digester | HomeBiogas | $800-1,200 |
| Hydroponics | 20 towers | $500-1,000 |
| **TOTAL** | | **$25,800-36,000** |

---

## 8. Regional Data: Australia

### 8.1 Peak Sun Hours by City

| City | Summer | Winter | Annual Avg |
|------|--------|--------|------------|
| Darwin | 6.5 | 5.5 | 6.0 |
| Brisbane | 6.0 | 4.5 | 5.3 |
| Sydney | 5.8 | 3.8 | 4.8 |
| Melbourne | 5.5 | 3.0 | 4.3 |
| Adelaide | 5.8 | 3.5 | 4.7 |
| Perth | 6.2 | 4.0 | 5.1 |
| Hobart | 5.2 | 2.5 | 3.9 |

### 8.2 Annual Rainfall

| City | mm/year | Dry Days |
|------|---------|----------|
| Darwin | 1700 | 60 |
| Brisbane | 1200 | 80 |
| Sydney | 1200 | 90 |
| Melbourne | 650 | 120 |
| Adelaide | 550 | 140 |
| Perth | 850 | 100 |
| Hobart | 650 | 140 |

### 8.3 Australian Standards

**Electrical (AS/NZS 3000):**
- Solar installations: AS/NZS 5033
- Battery installations: AS/NZS 5139
- Wiring rules: AS/NZS 3000:2018

**Water:**
- Rainwater tanks: AS/NZS 4020
- Plumbing: AS/NZS 3500

**Building:**
- Class 1a dwellings: BCA Volume 2

---

## 9. Maintenance Schedules

### 9.1 Solar System Maintenance

| Task | Frequency | Time |
|------|-----------|------|
| Panel cleaning | Monthly | 30 min |
| Visual inspection | Monthly | 15 min |
| Terminal torque check | Quarterly | 1 hr |
| Performance comparison | Quarterly | 1 hr |
| Thermal imaging | Annually | 2 hrs |
| Professional inspection | Annually | 3 hrs |

### 9.2 Battery Maintenance

**LFP:**
- Check connections: Monthly
- Equalize charge: Every 3 months (if needed)
- Clean terminals: Quarterly
- Capacity test: Annually

**Flooded Lead-Acid:**
- Check electrolyte: Weekly
- Top up with distilled: Weekly
- Equalize charge: Monthly
- Clean terminals: Monthly

### 9.3 Water System Maintenance

| Task | Frequency |
|------|-----------|
| Clean gutters | 6 months |
| Check first flush | 3 months |
| Replace sediment filter | 3-6 months |
| Replace carbon filter | 6-12 months |
| UV bulb replacement | 12 months |
| Tank inspection | Annually |

### 9.4 Composting System

| Task | Frequency |
|------|-----------|
| Turn compost | Weekly |
| Check moisture | 2-3× week |
| Add browns/greens | As needed |
| Harvest finished compost | Monthly |
| Clean toilet | Weekly |
| Check ventilation | Monthly |

---

## 10. ROI & Payback Calculations

### 10.1 Grid-Connected Solar ROI

**Typical Savings:**
- 6.6kW system: $1,000-1,500/year
- 10kW system: $1,500-2,200/year
- 13kW system: $2,000-2,800/year

**Payback Period:**
- With STC + battery: 4-7 years
- Without battery: 3-5 years

### 10.2 Off-Grid Cost Analysis

**Annual Savings vs Grid:**

| System | Annual Savings | Break-Even |
|--------|----------------|------------|
| 5kW solar + 10kWh | $2,500 | 12-15 years |
| Full off-grid | $4,000+ | 8-12 years |

**Hidden Savings:**
- No grid connection fees: $300-500/year
- Water bill reduction: $500-1,000/year
- Food growing: $1,000-3,000/year
- Waste removal: $200-400/year

### 10.3 Investment Returns

**$30,000 Off-Grid Investment:**
- Year 1-5: Build system, learn
- Year 5-10: $3,000-5,000/year savings
- Year 10-20: $5,000-8,000/year (system paid off)
- Year 20+: Pure savings

---

## 11. Troubleshooting

### 11.1 Solar System Problems

| Symptom | Cause | Fix |
|---------|-------|-----|
| Low output | Dirty panels | Clean |
| Zero output | Breaker tripped | Reset breaker |
| Fluctuating output | Shading | Trim trees, adjust angle |
| High output | Controller failure | Replace controller |

### 11.2 Battery Problems

| Symptom | Cause | Fix |
|---------|-------|-----|
| Low capacity | Sulfation (lead) | Equalize charge |
| Won't hold charge | Dead cells | Replace battery |
| Swelling | Overcharging | Check charger |
| Balancing issues | Weak cell | Replace cell |

### 11.3 Water System Problems

| Symptom | Cause | Fix |
|---------|-------|-----|
| Low pressure | Clogged filter | Replace filter |
| Bad taste | Carbon spent | Replace carbon |
| Algae in tank | Light entry | Seal entry points |
| Pump won't start | Air lock | Bleed pump |

---

## 12. Advanced Topics

### 12.1 Grid-Tie with Battery Backup

**Critical Load Subpanel:**
- Power essential circuits during outage
- Automatic transfer switch
- Cost: $1,500-3,000

### 12.2 EV Integration

**Vehicle-to-Home (V2H):**
- Use EV battery as home backup
- Bidirectional charger: $3,000-5,000
- Nissan Leaf, Ford F-150 Lightning supported

### 12.3 Backup Generators

| Type | Fuel | Run Time | Cost |
|------|------|----------|------|
| Portable Gas | Petrol | 8-12 hrs | $500-1,500 |
| Diesel Fixed | Diesel | 24-48 hrs | $3,000-8,000 |
| Propane | LPG | Unlimited | $4,000-10,000 |
| Biogas | On-site | Unlimited | $2,000-5,000 |

---

*Version 2.0 - Expanded with Electrical, Integration, ROI, and Troubleshooting*