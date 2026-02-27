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

**Panel Sizing Formula:**
```
Daily Generation = Panel Watts × Peak Sun Hours × System Efficiency (0.85)
```

**Orientation:**
- **Northern Hemisphere:** South-facing, tilt = latitude
- **Southern Hemisphere:** North-facing, tilt = latitude

### 1.2 Battery Banks

**Chemistry Comparison**

| Type | Cycle Life | Depth of Discharge | Cost/kWh |
|------|------------|-------------------|----------|
| LiFePO4 (LFP) | 3000-5000 | 80-100% | $300-800 |
| AGM | 500-1000 | 50% | $200-500 |
| Gel | 1000-2000 | 50% | $300-600 |
| Flooded Lead-Acid | 500-1000 | 50% | $150-400 |
| Lithium NMC | 2000-3000 | 80-100% | $500-900 |

**Sizing:**
```
Capacity (Ah) = Daily Load (Wh) ÷ System Voltage ÷ DoD%
```

**Regional Pricing:**
| Region | LFP $ | AGM $ | Notes |
|--------|-------|-------|-------|
| 🇦🇺 Australia | $400-800/kWh | $300-500/kWh | [Shop Au](https://www.amazon.com.au/dp/B0B21CYWRD?tag=offgridmaster-20) |
| 🇺🇸 USA | $350-700/kWh | $250-450/kWh | [Shop US](https://www.amazon.com/dp/B0B21CYWRD?tag=offgridmaster-20) |
| 🇬🇧 UK | £400-900/kWh | £300-550/kWh | [Shop UK](https://www.amazon.co.uk/dp/B0B21CYWRD?tag=offgridmaster-20) |
| 🇪🇺 EU | €400-850/kWh | €300-550/kWh | [Shop EU](https://www.amazon.de/dp/B0B21CYWRD?tag=offgridmaster-20) |
| 🇨🇦 Canada | $450-900/kWh | $350-550/kWh | [Shop CA](https://www.amazon.ca/dp/B0B21CYWRD?tag=offgridmaster-20) |

### 1.3 Inverters

| Feature | Pure Sine Wave | Modified Sine |
|---------|---------------|---------------|
| Compatibility | All AC devices | Motors buzz, some fail |
| Efficiency | 90-95% | 75-85% |
| Cost | Higher | Lower |

**Sizing:** Inverter Rating = Peak Load × 1.25

**Recommended Products:**
- [Victron MultiPlus (Australia)](https://www.amazon.com.au/dp/B07RSN1CZG?tag=offgridmaster-20) - $1,500-3,000
- [Victron MultiPlus (USA)](https://www.amazon.com/dp/B07RSN1CZG?tag=offgridmaster-20) - $1,200-2,500
- [EG4 All-In-One (US)](https://www.amazon.com/dp/B0CVLYT3G8?tag=offgridmaster-20) - $2,000-4,000

---

## 2. Water Systems

### 2.1 Rainwater Harvesting

**Formula:**
```
Annual Yield (L) = Roof Area (m²) × Annual Rainfall (mm) × 0.85
```

| Region | Annual Rainfall | Roof 100m² Yield |
|--------|-----------------|------------------|
| Australia (Melbourne) | 650mm | 55,000L/year |
| Australia (Brisbane) | 1,200mm | 102,000L/year |
| UK (London) | 600mm | 51,000L/year |
| USA (Seattle) | 970mm | 82,000L/year |
| Spain (Barcelona) | 400mm | 34,000L/year |

**Imperial Conversion:** 1 gallon = 4.546L | 1 inch = 25.4mm

### 2.2 Filtration Stages

| Stage | Removes | Replacement | Cost/AU | Cost/US |
|-------|---------|-------------|---------|---------|
| Leaf Guard | Debris | 6-12 months | $50-100 | $40-80 |
| First Flush | Initial runoff | 5-10 years | $150-300 | $120-250 |
| Sediment (20μm) | Sand, rust | 3-6 months | $40/yr | $30/yr |
| Carbon | Taste, chlorine | 6-12 months | $60/yr | $50/yr |
| UV Sterilizer | Bacteria, viruses | 12 months | $120/yr | $100/yr |

**Regional Filters:**
- [Australian Filters](https://www.amazon.com.au/s?k=water+filter+20inch&tag=offgridmaster-20)
- [US Filters](https://www.amazon.com/s?k=water+filter+20inch&tag=offgridmaster-20)
- [UK Filters](https://www.amazon.co.uk/s?k=water+filter+20inch&tag=offgridmaster-20)

---

## 3. Waste Systems

### 3.1 Composting Toilets

| Type | Cost AU | Cost US | Cost UK |
|------|---------|---------|---------|
| Separett Villa | $800-1,200 | $700-1,000 | £600-900 |
| Nature's Head | $900-1,400 | $800-1,200 | £700-1,000 |
| DIY Composting | $200-500 | $150-400 | £150-350 |

**Products:**
- [Nature's Head (AU)](https://www.amazon.com.au/dp/B001QCZD8G?tag=offgridmaster-20)
- [Separett (US)](https://www.amazon.com/dp/B001QCZD8G?tag=offgridmaster-20)
- [Composting Toilets (UK)](https://www.amazon.co.uk/s?k=composting+toilet&tag=offgridmaster-20)

### 3.2 Biogas Digesters

| System | Capacity | Gas Output | Cost AU | Cost US |
|--------|----------|------------|---------|---------|
| HomeBiogas 2.0 | 120L | 2-3 hrs cooking | $800-1,200 | $700-1,000 |
| HomeBiogas 7.0 | 400L | 4-6 hrs cooking | $2,000-3,000 | $1,800-2,500 |
| DIY 200L Drum | 200L | 1-2 hrs cooking | $200-400 | $150-300 |

---

## 4. Food Autonomy

### 4.1 Hydroponic Systems

| System | Complexity | Water Use | Yield |
|--------|------------|-----------|-------|
| DWC | Low | Very Low | High |
| NFT | Medium | Very Low | High |
| Drip | Medium | Low | Very High |
| Aeroponics | High | Lowest | Highest |
| Vertical Tower | Medium | Low | Very High |

**Grow Lights:**

| Type | Efficiency | Heat | Lifespan | Cost AU | Cost US |
|------|------------|------|----------|---------|---------|
| LED | 2.0-2.5 μmol/J | Low | 50,000hr | $50-200 | $40-150 |
| HPS | 1.0-1.5 μmol/J | High | 10,000hr | $30-100 | $25-80 |
| Fluoro | 0.8-1.0 μmol/J | Medium | 10,000hr | $20-60 | $15-50 |

**Regional Products:**
- [LED Grow Lights AU](https://www.amazon.com.au/s?k=led+grow+light+300w&tag=offgridmaster-20)
- [LED Grow Lights US](https://www.amazon.com/s?k=led+grow+light+300w&tag=offgridmaster-20)
- [Hydroponic Nutrients AU](https://www.amazon.com.au/s?k=hydroponic+nutrient&tag=offgridmaster-20)
- [Hydroponic Nutrients US](https://www.amazon.com/s?k=hydroponic+nutrient&tag=offgridmaster-20)

---

## 5. Electrical Systems

### 5.1 Wire Sizing

**AWG to mm² Conversion:**

| AWG | mm² | Max Amps (Cu) | Max Amps (Al) |
|-----|-----|---------------|---------------|
| 14 | 2.08 | 15A | 12A |
| 12 | 3.31 | 20A | 15A |
| 10 | 5.26 | 30A | 25A |
| 8 | 8.37 | 40A | 30A |
| 6 | 13.30 | 55A | 40A |
| 4 | 21.15 | 70A | 55A |
| 2 | 33.62 | 95A | 75A |

**Voltage Drop (3% max for critical):**
```
VD = (2 × K × I × L) / CM
```
- K = 10.8 (copper)
- I = Current (A)
- L = Distance (ft)
- CM = Wire circular mils

### 5.2 Protection

| Device | Use | Trip Level | Cost AU | Cost US |
|--------|-----|-----------|---------|---------|
| GFCI/RCBO | Wet locations | 30mA (AU) / 5mA (US) | $50-150 | $40-100 |
| DC Breaker | Solar/battery | 1000V rated | $30-80 | $25-60 |
| Surge Protector | Whole system | 40kA | $100-300 | $80-250 |

**Regional Products:**
- [Circuit Protection AU](https://www.amazon.com.au/s?k=dc+circuit+breaker+100v&tag=offgridmaster-20)
- [Circuit Protection US](https://www.amazon.com/s?k=dc+circuit+breaker&tag=offgridmaster-20)

---

## 6. Regional Reference

### 6.1 Peak Sun Hours

| City | Summer | Winter | Annual |
|------|--------|--------|--------|
| Sydney, AU | 5.8 | 3.8 | 4.8 |
| Melbourne, AU | 5.5 | 3.0 | 4.3 |
| Brisbane, AU | 6.0 | 4.5 | 5.3 |
| Los Angeles, US | 6.5 | 4.5 | 5.5 |
| New York, US | 5.5 | 3.0 | 4.3 |
| London, UK | 5.0 | 2.0 | 3.5 |
| Amsterdam, NL | 5.2 | 2.2 | 3.7 |
| Toronto, CA | 5.8 | 3.0 | 4.4 |
| Berlin, DE | 5.5 | 2.5 | 4.0 |

### 6.2 Temperature Conversion

| Celsius | Fahrenheit |
|---------|------------|
| 0°C | 32°F |
| 10°C | 50°F |
| 20°C | 68°F |
| 25°C | 77°F |
| 30°C | 86°F |
| 35°C | 95°F |
| 40°C | 104°F |

Formula: °F = (°C × 9/5) + 32

### 6.3 Distance/Length

| Metric | Imperial |
|--------|----------|
| 1mm | 0.039" |
| 1cm | 0.394" |
| 1m | 3.281ft |
| 1km | 0.621mi |

### 6.4 Volume

| Metric | Imperial |
|--------|----------|
| 1L | 0.264 gal (US) |
| 1L | 0.220 gal (UK) |
| 1 gallon (US) | 3.785L |
| 1 gallon (UK) | 4.546L |

### 6.5 Power

| Metric | Imperial |
|--------|----------|
| 1W | 3.412 BTU/hr |
| 1kW | 3412 BTU/hr |
| 1HP | 746W |

---

## 7. Full System Examples

### 7.1 Family of 4 - Australia (AUD)

| Component | Specification | Cost AUD |
|-----------|---------------|----------|
| Solar | 5kW (10×500W) | $4,000-5,000 |
| Battery | 30kWh LFP | $10,000-15,000 |
| Inverter | 5kW hybrid | $2,000-3,000 |
| Water Tank | 50kL poly | $8,000-12,000 |
| Filtration | 5-stage | $800-1,200 |
| Composting Toilet | Nature's Head | $1,200-1,500 |
| Biogas | HomeBiogas 2.0 | $1,000-1,400 |
| Hydroponics | 20 towers | $800-1,200 |
| **TOTAL** | | **$27,800-40,300** |

### 7.2 Family of 4 - USA (USD)

| Component | Specification | Cost USD |
|-----------|---------------|----------|
| Solar | 6.6kW | $8,000-12,000 |
| Battery | 30kWh | $8,000-14,000 |
| Inverter | 5kW | $2,000-3,500 |
| Water | 10,000 gal | $3,000-6,000 |
| Filtration | 5-stage | $600-1,000 |
| Composting Toilet | Nature's Head | $900-1,200 |
| **TOTAL** | | **$22,500-37,700** |

### 7.3 Family of 4 - UK (£)

| Component | Specification | Cost GBP |
|-----------|---------------|----------|
| Solar | 4kW | £4,000-6,000 |
| Battery | 20kWh | £6,000-10,000 |
| Inverter | 4kW | £1,500-2,500 |
| Water | 5,000L | £2,000-4,000 |
| Filtration | 5-stage | £500-800 |
| Composting Toilet | Separett | £700-1,000 |
| **TOTAL** | | **£14,700-24,300** |

---

## 8. Affiliate Links Template

**How Links Work:**
```
https://www.amazon.{domain}/dp/{ASIN}?tag=offgridmaster-20

AU: amazon.com.au
US: amazon.com  
UK: amazon.co.uk
CA: amazon.ca
DE: amazon.de
FR: amazon.fr
ES: amazon.es
IT: amazon.it
```

**Common Products:**
| Product | AU Link | US Link | UK Link |
|---------|---------|---------|---------|
| 100Ah LiFePO4 | [AU](https://www.amazon.com.au/dp/B0B21CYWRD?tag=offgridmaster-20) | [US](https://www.amazon.com/dp/B0B21CYWRD?tag=offgridmaster-20) | [UK](https://www.amazon.co.uk/dp/B0B21CYWRD?tag=offgridmaster-20) |
| 2000W Inverter | [AU](https://www.amazon.com.au/dp/B07RSN1CZG?tag=offgridmaster-20) | [US](https://www.amazon.com/dp/B07RSN1CZG?tag=offgridmaster-20) | [UK](https://www.amazon.co.uk/dp/B07RSN1CZG?tag=offgridmaster-20) |
| MPPT Controller | [AU](https://www.amazon.com.au/dp/B09MHL8VPV?tag=offgridmaster-20) | [US](https://www.amazon.com/dp/B09MHL8VPV?tag=offgridmaster-20) | [UK](https://www.amazon.co.uk/dp/B09MHL8VPV?tag=offgridmaster-20) |
| Grow Light | [AU](https://www.amazon.com.au/dp/B08B9C1Z2H?tag=offgridmaster-20) | [US](https://www.amazon.com/dp/B08B9C1Z2H?tag=offgridmaster-20) | [UK](https://www.amazon.co.uk/dp/B08B9C1Z2H?tag=offgridmaster-20) |

---

## 9. Troubleshooting

### Solar Issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| Low output | Dirty panels | Clean |
| Zero output | Breaker tripped | Reset |
| Fluctuating | Shading | Trim trees |

### Battery Issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| Low capacity | Sulfation | Equalize |
| Won't hold charge | Dead cells | Replace |
| Swelling | Overcharging | Check charger |

### Water Issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| Low pressure | Filter clogged | Replace |
| Bad taste | Carbon spent | Replace carbon |
| Algae | Light entry | Seal tank |

---

*Dynamic Global Version - Prices and links auto-detect your region*  
*Affiliate: offgridmaster-20*  
*Last Updated: February 2026*