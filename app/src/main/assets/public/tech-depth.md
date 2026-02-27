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

## 6. 3D Gl}