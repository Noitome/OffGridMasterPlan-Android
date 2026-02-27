import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Calculator, 
  MapPin, 
  Sun, 
  CloudRain, 
  Wind, 
  DollarSign, 
  Loader2,
  CheckCircle,
  AlertCircle,
  Maximize2,
  Home,
  User,
  X
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { UnifiedMeasurementMap } from './UnifiedMeasurementMap';
import { MultiLayerMap } from './MultiLayerMap';
import { ProductRecommendations } from './ProductRecommendations';
import { EnergyWizard } from './EnergyWizard';
import { WizardData, useWizard } from '@/contexts/WizardContext';

const windThreshold = 14;
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useNavigate } from 'react-router-dom';

interface LocationData {
  lat: number;
  lon: number;
  display_name: string;
}

interface ClimateData {
  solarIrradiance: number; // kWh/m²/day
  rainfall: number; // mm/year
  windSpeed: number; // km/h
  monthlyRainfallMm?: number[];
  monthlySolarKWh?: number[];
  monthlyTempC?: number[];
  annualRainDays?: number; // Days with > 1mm rain
}

// --- Wind & Water Physics Helpers ---

// Rayleigh distribution (Weibull k=2) probability density function
function rayleighPDF(v: number, avgV: number): number {
  if (avgV <= 0) return 0;
  // Scale parameter c approx 1.128 * avgV
  const c = 1.128 * avgV; 
  if (c === 0) return 0;
  return (2 * v / (c * c)) * Math.exp(- (v * v) / (c * c));
}

// Generic 1kW Turbine Power Curve
function getTurbinePowerOutput(windSpeedMs: number): number {
  // Cut-in: 3 m/s, Rated: 11 m/s, Cut-out: 25 m/s
  if (windSpeedMs < 3) return 0;
  if (windSpeedMs > 25) return 0;
  if (windSpeedMs >= 11) return 1000; // Rated power (Watts)
  
  // Cubic curve between 3 and 11
  // P = 0.5 * rho * A * Cp * v^3
  // Simplified interpolation:
  const pct = (windSpeedMs - 3) / (11 - 3);
  return 1000 * Math.pow(pct, 3);
}

// First flush diverter estimation (1mm deduction per rain event)
function calculateEffectiveRainfall(annualRainfallMm: number, rainDays: number): number {
  const firstFlushLoss = rainDays * 1.0; // 1mm per rain day
  return Math.max(0, annualRainfallMm - firstFlushLoss);
}

const PANEL_PRESETS = [
  { id: 'mono-400', label: 'Monocrystalline 400W', watts: 400, areaM2: 1.7, costUsd: 180 },
  { id: 'mono-450', label: 'Monocrystalline 450W', watts: 450, areaM2: 2.0, costUsd: 210 },
  { id: 'premium-500', label: 'Premium 500W', watts: 500, areaM2: 2.2, costUsd: 260 },
  { id: 'custom', label: 'Custom', watts: 400, areaM2: 1.7, costUsd: 180 },
] as const;

const INVERTER_TYPES = [
  { id: 'offgrid', label: 'Off-grid inverter/charger' },
  { id: 'hybrid', label: 'Hybrid inverter' },
  { id: 'gridtie', label: 'Grid-tie inverter' },
] as const;

const STORAGE_TYPES = [
  { id: 'none', label: 'No storage (direct use / grid / generator)' },
  { id: 'battery', label: 'Batteries (LiFePO4 / lead-acid)' },
  { id: 'gravity', label: 'Gravity storage (winch / weight / water tower)' },
  { id: 'custom', label: 'Custom storage (manual inputs)' },
] as const;

const CATCHMENT_MATERIALS = [
  { key: 'impermeable_0_95', label: 'Impermeable (Plastic Liner / Metal) - 95%', efficiency: 0.95 },
  { key: 'hard_0_9', label: 'Hard Surface (Concrete / Tiles) - 90%', efficiency: 0.9 },
  { key: 'paved_0_85', label: 'Paved Surface - 85%', efficiency: 0.85 },
  { key: 'compacted_0_5', label: 'Compacted Soil / Clay - 50%', efficiency: 0.5 },
  { key: 'vegetation_0_2', label: 'Natural Vegetation - 20%', efficiency: 0.2 },
  // Vehicles & Structures
  { key: 'vehicle_car_0_9', label: 'Car / Van / Bus Roof (Metal) - 90%', efficiency: 0.9 },
  { key: 'vehicle_boat_0_85', label: 'Boat Deck (Fiberglass/Gelcoat) - 85%', efficiency: 0.85 },
  { key: 'vehicle_plane_0_95', label: 'Aircraft Fuselage (Aluminum) - 95%', efficiency: 0.95 },
  { key: 'vehicle_train_0_9', label: 'Train Car (Steel) - 90%', efficiency: 0.9 },
  { key: 'structure_tank_0_95', label: 'Tank / Silo Surface (Steel) - 95%', efficiency: 0.95 },
  { key: 'structure_shipping_0_9', label: 'Shipping Container (Corrugated Steel) - 90%', efficiency: 0.9 },
  { key: 'fabric_tent_0_6', label: 'Tent / Yurt (Canvas/Fabric) - 60%', efficiency: 0.6 },
] as const;

export function AddressCalculator() {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [climate, setClimate] = useState<ClimateData | null>(null);
  const [systemSize, setSystemSize] = useState<number>(5); // kW default
  const [dailyUsage, setDailyUsage] = useState<number>(20); // kWh default
  const [dailyWaterUseL, setDailyWaterUseL] = useState<number>(250); // L/day default
  const [roofArea, setRoofArea] = useState<number>(150); // m² default
  const [propertySize, setPropertySize] = useState<number>(1000); // m² default
  const [mountType, setMountType] = useState<'roof' | 'ground'>('roof'); // 'roof' or 'ground'
  const [measurementMode, setMeasurementMode] = useState<'roof' | 'property'>('roof');
  
  // New State for Turbine Height Adjustment (default to 10m for conservative estimate, allow user to toggle)
  const [turbineHeight, setTurbineHeight] = useState<10 | 100>(10);

  // New State for Multi-Layer Selection
  const [activeResourceLayer, setActiveResourceLayer] = useState<'water' | 'solar' | 'food'>('water');
  const [resourceAreas, setResourceAreas] = useState({
    water: 0,
    solar: 0,
    food: 0
  });

  const [resourcePolygons, setResourcePolygons] = useState<Record<'water' | 'solar' | 'food', { id: string; area: number; points: { lat: number; lng: number }[]; materialKey?: string }[]>>({
    water: [],
    solar: [],
    food: [],
  });

  const [panelPresetId, setPanelPresetId] = useState<(typeof PANEL_PRESETS)[number]['id']>('mono-400');
  const [panelWatts, setPanelWatts] = useState<number>(400);
  const [panelAreaM2, setPanelAreaM2] = useState<number>(1.7);
  const [panelCostUsd, setPanelCostUsd] = useState<number>(180);
  const [panelSpacingFactor, setPanelSpacingFactor] = useState<number>(1.15);
  const [solarLossFactor, setSolarLossFactor] = useState<number>(0.85);
  const [waterMaterialKey, setWaterMaterialKey] = useState<(typeof CATCHMENT_MATERIALS)[number]['key']>('hard_0_9');
  const [energyValueUsdPerKWh, setEnergyValueUsdPerKWh] = useState<number>(0.15);
  const [energyValueTouched, setEnergyValueTouched] = useState(false);

  const [solarSizingMode, setSolarSizingMode] = useState<'manual' | 'area'>('manual');

  const [dcBusVoltage, setDcBusVoltage] = useState<12 | 24 | 48>(48);
  const [inverterType, setInverterType] = useState<(typeof INVERTER_TYPES)[number]['id']>('offgrid');
  const [inverterSizeKw, setInverterSizeKw] = useState<number>(Math.max(3, Math.round((dailyUsage / 4) * 10) / 10));
  const [inverterSizeTouched, setInverterSizeTouched] = useState(false);
  const [inverterCostPerKwUsd, setInverterCostPerKwUsd] = useState<number>(450);
  const [bosCostPerKwUsd, setBosCostPerKwUsd] = useState<number>(900);
  const [bosFixedCostUsd, setBosFixedCostUsd] = useState<number>(800);

  const [storageType, setStorageType] = useState<(typeof STORAGE_TYPES)[number]['id']>('none');
  const [autonomyDays, setAutonomyDays] = useState<number>(1);
  const [batteryUsableDoD, setBatteryUsableDoD] = useState<number>(0.8);
  const [batteryCostPerKWhUsd, setBatteryCostPerKWhUsd] = useState<number>(350);
  const [batteryRoundTripEfficiency, setBatteryRoundTripEfficiency] = useState<number>(0.9);

  const [gravityHeightM, setGravityHeightM] = useState<number>(30);
  const [gravityCostPerKWhUsd, setGravityCostPerKWhUsd] = useState<number>(600);

  const [customStorageKWh, setCustomStorageKWh] = useState<number>(10);
  const [customStorageCostUsd, setCustomStorageCostUsd] = useState<number>(4000);

  const { wizardData, setWizardData, openWizard } = useWizard();
  const isBackpacker = wizardData?.context === 'backpacker';

  useEffect(() => {
    const preset = PANEL_PRESETS.find((p) => p.id === panelPresetId);
    if (!preset) return;
    if (panelPresetId === 'custom') return;
    setPanelWatts(preset.watts);
    setPanelAreaM2(preset.areaM2);
    setPanelCostUsd(preset.costUsd);
  }, [panelPresetId]);

  useEffect(() => {
    if (isBackpacker) {
      setRoofArea(0);
      setPropertySize(0);
      setMountType('ground');
      setStorageType('battery');
      setBatteryCostPerKWhUsd(1000); // Portable power stations are premium priced
      setBosCostPerKwUsd(0); // Cables included
      setBosFixedCostUsd(0);
      setInverterCostPerKwUsd(0); // Integrated
      
      // Adjust defaults for portable scale if they seem too high
      setDailyUsage(prev => prev > 5 ? 0.5 : prev);
      setDailyWaterUseL(prev => prev > 100 ? 10 : prev);
    }
  }, [isBackpacker]);

  const handleSearch = async () => {
    if (!address) return;
    
    setLoading(true);
    setClimate(null);
    setLocation(null);

    try {
      console.log("Searching for address:", address);
      // 1. Geocoding via Google Geocoding API
      // Prioritize Google for better address precision (Rooftop level)
      const apiKeyVal = import.meta.env.VITE_GOOGLE_SOLAR_API_KEY;
      let lat: number, lon: number, display_name: string;

      if (apiKeyVal) {
        try {
          const googleGeoRes = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKeyVal}`
          );
          const googleGeoData = await googleGeoRes.json();
          
          if (googleGeoData.status === 'OK' && googleGeoData.results.length > 0) {
            const result = googleGeoData.results[0];
            lat = result.geometry.location.lat;
            lon = result.geometry.location.lng;
            display_name = result.formatted_address;
            console.log("Google Geocoding success:", result);
          } else {
             throw new Error(`Google Geocoding status: ${googleGeoData.status}`);
          }
        } catch (googleErr) {
          console.warn("Google Geocoding failed, falling back to Nominatim", googleErr);
          // Fallback to Nominatim
          const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`, {
            headers: { 'Accept-Language': 'en-US,en;q=0.9' }
          });
          if (!geoRes.ok) throw new Error(`Geocoding failed: ${geoRes.statusText}`);
          const geoData = await geoRes.json();
          if (!geoData || geoData.length === 0) {
             toast.error("Address not found. Please try a more specific address.");
             setLoading(false);
             return;
          }
          const bestMatch = geoData[0];
          lat = parseFloat(bestMatch.lat);
          lon = parseFloat(bestMatch.lon);
          display_name = bestMatch.display_name;
        }
      } else {
        // Fallback if no key
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`, {
          headers: { 'Accept-Language': 'en-US,en;q=0.9' }
        });
        if (!geoRes.ok) throw new Error(`Geocoding failed: ${geoRes.statusText}`);
        const geoData = await geoRes.json();
        if (!geoData || geoData.length === 0) {
           toast.error("Address not found. Please try a more specific address.");
           setLoading(false);
           return;
        }
        const bestMatch = geoData[0];
        lat = parseFloat(bestMatch.lat);
        lon = parseFloat(bestMatch.lon);
        display_name = bestMatch.display_name;
      }

      setLocation({ lat, lon, display_name });

      // 2. Fetch Climate Data via Open-Meteo
      // Fetching last year's data to estimate annual averages
      // Note: This is a simplified estimation.
      const today = new Date();
      const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()).toISOString().split('T')[0];
      const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).toISOString().split('T')[0];

      const weatherRes = await fetch(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${lastYear}&end_date=${yesterday}&daily=shortwave_radiation_sum,precipitation_sum,wind_speed_10m_max,temperature_2m_max&hourly=wind_speed_100m&timezone=auto`
      );
      const weatherData = await weatherRes.json();

      if (weatherData.daily) {
        // Calculate averages
        const solarSum = weatherData.daily.shortwave_radiation_sum.reduce((a: number, b: number) => a + (b || 0), 0);
        const rainSum = weatherData.daily.precipitation_sum.reduce((a: number, b: number) => a + (b || 0), 0);
        // We use 10m for surface data reference, but will prefer 100m for turbine calc if available
        const windSum = weatherData.daily.wind_speed_10m_max.reduce((a: number, b: number) => a + (b || 0), 0);
        const count = weatherData.daily.time.length;

        // Calculate 100m avg wind speed from hourly data if available
        let avgWind100m = 0;
        if (weatherData.hourly && weatherData.hourly.wind_speed_100m) {
           const hourlySum = weatherData.hourly.wind_speed_100m.reduce((a: number, b: number) => a + (b || 0), 0);
           avgWind100m = hourlySum / weatherData.hourly.time.length;
        }

        // Solar radiation is in MJ/m², convert to kWh/m² (1 MJ = 0.277 kWh)
        // Actually Open-Meteo archive shortwave_radiation_sum is in MJ/m² per day.
        const avgSolarMJ = solarSum / count;
              const avgSolarKWh = avgSolarMJ * 0.277778;

              const totalRain = rainSum; // Annual rainfall in mm
              const avgWind = windSum / count; // Avg max wind speed in km/h

              const monthlyRainfallMm = Array.from({ length: 12 }, () => 0);
              const monthlySolarKWh = Array.from({ length: 12 }, () => 0);
              const monthlyTempC = Array.from({ length: 12 }, () => 0);
              const monthlyCounts = Array.from({ length: 12 }, () => 0);
              
              let rainDays = 0;

              for (let i = 0; i < weatherData.daily.time.length; i++) {
                const dateStr = weatherData.daily.time[i] as string | undefined;
                const dayRain = weatherData.daily.precipitation_sum[i] as number | undefined;
                const daySolarMJ = weatherData.daily.shortwave_radiation_sum[i] as number | undefined;
                const dayTemp = weatherData.daily.temperature_2m_max[i] as number | undefined;

                if (!dateStr) continue;
                const parts = dateStr.split('-');
                if (parts.length < 2) continue;
                const monthIdx = Math.max(0, Math.min(11, Number(parts[1]) - 1));

                if (Number.isFinite(dayRain as number)) {
                  const r = dayRain as number;
                  monthlyRainfallMm[monthIdx] += r;
                  if (r > 1.0) rainDays++; // Count significant rain days
                }
                
                if (Number.isFinite(daySolarMJ as number)) {
                  monthlySolarKWh[monthIdx] += (daySolarMJ as number) * 0.277778;
                }
                if (Number.isFinite(dayTemp as number)) {
                  monthlyTempC[monthIdx] += (dayTemp as number);
                }
                monthlyCounts[monthIdx]++;
              }

              // Average out the solar and temp
              const monthlySolarAvg = monthlySolarKWh.map((sum, i) => monthlyCounts[i] > 0 ? sum / monthlyCounts[i] : 0);
              const monthlyTempAvg = monthlyTempC.map((sum, i) => monthlyCounts[i] > 0 ? sum / monthlyCounts[i] : 0);

              setClimate({
                solarIrradiance: parseFloat(avgSolarKWh.toFixed(2)),
                rainfall: parseFloat(totalRain.toFixed(0)),
                windSpeed: parseFloat((avgWind100m || avgWind).toFixed(1)),
                monthlyRainfallMm: monthlyRainfallMm.map((v) => Math.round(v)),
                monthlySolarKWh: monthlySolarAvg,
                monthlyTempC: monthlyTempAvg,
                annualRainDays: rainDays,
              });
        
        toast.success("Location data loaded successfully!");
      }
      
      // Try to get Google Solar API data if key exists
      const apiKey = import.meta.env.VITE_GOOGLE_SOLAR_API_KEY;
      if (apiKey) {
        try {
          const solarRes = await fetch(
            `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${lat}&location.longitude=${lon}&requiredQuality=HIGH&key=${apiKey}`
          );
          
          if (solarRes.ok) {
            const solarData = await solarRes.json();
            if (solarData.solarPotential && solarData.solarPotential.wholeRoofStats) {
               const stats = solarData.solarPotential.wholeRoofStats;
               if (stats.areaMeters2) {
                 setRoofArea(Math.round(stats.areaMeters2));
                 toast.success("Roof area auto-detected from satellite data!");
               }
            }
          }
        } catch (err) {
          console.warn("Could not fetch automated roof data", err);
        }
      }

    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(error instanceof Error ? error.message : "Failed to fetch location data. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleAreaCalculated = (area: number) => {
    if (area <= 0) return;
    
    if (measurementMode === 'roof') {
      setRoofArea(area);
      // Also update resource area default for compatibility
      setResourceAreas(prev => ({ ...prev, water: area }));
    } else {
      setPropertySize(area);
    }
  };

  const handleResourceAreaUpdate = React.useCallback((layer: 'water' | 'solar' | 'food', area: number) => {
    setResourceAreas(prev => ({
      ...prev,
      [layer]: area
    }));

    // Sync drawn areas to main calculator inputs for better UX
    if (layer === 'water') {
      toast.success(`Catchment area updated to ${area} m²`);
    } else if (layer === 'solar') {
      const panelSurfaceM2PerKwLocal = Math.max(0.1, panelAreaM2 / (Math.max(1, panelWatts) / 1000));
      const m2PerKwSolarLocal = Math.max(0.1, panelSurfaceM2PerKwLocal * Math.max(1, panelSpacingFactor));
      const calculatedKw = Math.round((area / m2PerKwSolarLocal) * 10) / 10;
      setSystemSize(calculatedKw);
      setSolarSizingMode('area');
      toast.success(`System size updated to ${calculatedKw} kW based on selected area`);
    } else if (layer === 'food') {
      toast.success(`Food production area set to ${area} m²`);
    }
  }, [panelAreaM2, panelWatts, panelSpacingFactor]);

  const handleResourcePolygonsUpdate = React.useCallback((layer: 'water' | 'solar' | 'food', polygons: { id: string; area: number; points: { lat: number; lng: number }[]; materialKey?: string }[]) => {
    setResourcePolygons((prev) => ({
      ...prev,
      [layer]: polygons,
    }));

    if (layer === 'solar') {
      const totalArea = polygons.reduce((sum, p) => sum + Math.max(0, p.area), 0);
      if (totalArea <= 0 && solarSizingMode === 'area') {
        setSolarSizingMode('manual');
      }
    }
  }, []);

  // Calculations

  const panelSurfaceM2PerKw = Math.max(0.1, panelAreaM2 / (Math.max(1, panelWatts) / 1000));
  const m2PerKwSolar = Math.max(0.1, panelSurfaceM2PerKw * Math.max(1, panelSpacingFactor));

  const solarAreaFromPolygonsM2 = resourcePolygons.solar.length > 0
    ? resourcePolygons.solar.reduce((sum, p) => sum + Math.max(0, p.area), 0)
    : 0;

  const solarAreaForSizingM2 = solarSizingMode === 'area'
    ? (solarAreaFromPolygonsM2 > 0 ? solarAreaFromPolygonsM2 : Math.max(0, resourceAreas.solar))
    : 0;

  const desiredSolarCapacityKW = solarAreaForSizingM2 > 0 ? (solarAreaForSizingM2 / m2PerKwSolar) : systemSize;
  const panelsNeeded = Math.max(1, Math.ceil((desiredSolarCapacityKW * 1000) / Math.max(1, panelWatts)));
  const solarCapacityKW = (panelsNeeded * panelWatts) / 1000;
  const solarAreaUsed = solarAreaForSizingM2 > 0 ? solarAreaForSizingM2 : (solarCapacityKW * m2PerKwSolar);

  const suggestedInverterKw = useMemo(() => {
    const usageKwRaw = dailyUsage / 4;
    const usageKw = Number.isFinite(usageKwRaw) && usageKwRaw > 0 ? usageKwRaw : 0;

    const pvKw = Number.isFinite(solarCapacityKW) && solarCapacityKW > 0 ? solarCapacityKW : 0;
    const dcAcTarget = inverterType === 'gridtie' ? 1.2 : inverterType === 'hybrid' ? 1.25 : 1.1;
    const pvBasedAcKw = pvKw > 0 ? (pvKw / dcAcTarget) : 0;

    const raw = Math.max(1, usageKw, pvBasedAcKw);
    return Math.round(raw * 10) / 10;
  }, [dailyUsage, inverterType, solarCapacityKW]);

  useEffect(() => {
    if (inverterSizeTouched) return;
    setInverterSizeKw(suggestedInverterKw);
  }, [inverterSizeTouched, suggestedInverterKw]);

  useEffect(() => {
    if (energyValueTouched) return;
    const display = location?.display_name;
    if (!display) return;

    const text = display.toLowerCase();
    const isAustralia = text.includes('australia');
    if (!isAustralia) return;

    const stateRatesAudPerKWh: Array<{ match: RegExp; value: number }> = [
      { match: /(\bvictoria\b|\bvic\b)/i, value: 0.30 },
      { match: /(\bnew south wales\b|\bnsw\b)/i, value: 0.31 },
      { match: /(\bqueensland\b|\bqld\b)/i, value: 0.28 },
      { match: /(\bsouth australia\b|\bsa\b)/i, value: 0.36 },
      { match: /(\bwestern australia\b|\bwa\b)/i, value: 0.30 },
      { match: /(\btasmania\b|\btas\b)/i, value: 0.29 },
      { match: /(\baustralian capital territory\b|\bact\b)/i, value: 0.29 },
      { match: /(\bnorthern territory\b|\bnt\b)/i, value: 0.31 },
    ];

    const matched = stateRatesAudPerKWh.find((s) => s.match.test(display));
    setEnergyValueUsdPerKWh(matched ? matched.value : 0.28);
  }, [energyValueTouched, location?.display_name]);

  const solarPotential = climate ? (climate.solarIrradiance * 365 * solarCapacityKW * solarLossFactor) : 0;
  const savings = solarPotential * energyValueUsdPerKWh;
  const paybackYears = (solarCapacityKW * 3000) / (savings || 1);

  // 2. Water Calculation (Based on drawn Water Area)
  const waterPolygons = resourcePolygons.water;
  const waterMaterialEfficiencyMap = useMemo(() => {
    const m: Record<string, number> = {};
    CATCHMENT_MATERIALS.forEach((item) => {
      m[item.key] = item.efficiency;
    });
    return m;
  }, []);

  const defaultWaterEfficiency = waterMaterialEfficiencyMap[waterMaterialKey] ?? 0.9;

  const waterCaptureAreaFromPolygonsM2 = waterPolygons.length > 0
    ? waterPolygons.reduce((sum, p) => sum + Math.max(0, p.area), 0)
    : 0;

  const waterCaptureArea = waterCaptureAreaFromPolygonsM2 > 0
    ? waterCaptureAreaFromPolygonsM2
    : (resourceAreas.water > 0 ? resourceAreas.water : roofArea);

  const effectiveWaterCaptureAreaM2 = waterCaptureAreaFromPolygonsM2 > 0
    ? waterPolygons.reduce((sum, p) => {
        const material = p.materialKey || waterMaterialKey;
        const eff = waterMaterialEfficiencyMap[material] ?? defaultWaterEfficiency;
        return sum + (Math.max(0, p.area) * Math.max(0, Math.min(1, eff)));
      }, 0)
    : (waterCaptureArea * Math.max(0, Math.min(1, defaultWaterEfficiency)));

  const waterRunoffFactorUsed = waterCaptureArea > 0 ? (effectiveWaterCaptureAreaM2 / waterCaptureArea) : defaultWaterEfficiency;

  // Apply First Flush Diverter Loss (approx 1mm per rain day)
  const annualRainDays = climate?.annualRainDays ?? 80; // Default if unknown
  const effectiveRainfallMm = calculateEffectiveRainfall(climate?.rainfall ?? 0, annualRainDays);
  
  const catchmentWaterPotentialLYr = (effectiveRainfallMm * effectiveWaterCaptureAreaM2);

  const catchmentBreakdown = useMemo(() => {
    // Use effective rainfall for breakdown to match total
    const rainfallToUse = effectiveRainfallMm > 0 ? effectiveRainfallMm : (climate?.rainfall ?? 0);
    
    if (rainfallToUse <= 0) return [] as { materialKey: string; label: string; areaM2: number; efficiency: number; potentialLYr: number }[];

    const materialLabelForKey = (key: string) => CATCHMENT_MATERIALS.find((m) => m.key === key)?.label ?? key;

    if (waterCaptureAreaFromPolygonsM2 > 0) {
      const byKey: Record<string, { materialKey: string; label: string; areaM2: number; efficiency: number; effectiveAreaM2: number }> = {};
      waterPolygons.forEach((p) => {
        const areaM2 = Math.max(0, p.area);
        if (areaM2 <= 0) return;

        const materialKey = p.materialKey || waterMaterialKey;
        const effRaw = waterMaterialEfficiencyMap[materialKey] ?? defaultWaterEfficiency;
        const efficiency = Math.max(0, Math.min(1, effRaw));

        const existing = byKey[materialKey];
        if (existing) {
          existing.areaM2 += areaM2;
          existing.effectiveAreaM2 += areaM2 * efficiency;
        } else {
          byKey[materialKey] = {
            materialKey,
            label: materialLabelForKey(materialKey),
            areaM2,
            efficiency,
            effectiveAreaM2: areaM2 * efficiency,
          };
        }
      });

      return Object.values(byKey)
        .map((v) => ({
          materialKey: v.materialKey,
          label: v.label,
          areaM2: v.areaM2,
          efficiency: v.efficiency,
          potentialLYr: rainfallToUse * v.effectiveAreaM2,
        }))
        .sort((a, b) => b.potentialLYr - a.potentialLYr);
    }

    const materialKey = waterMaterialKey;
    const efficiency = Math.max(0, Math.min(1, defaultWaterEfficiency));
    return [{
      materialKey,
      label: materialLabelForKey(materialKey),
      areaM2: Math.max(0, waterCaptureArea),
      efficiency,
      potentialLYr: catchmentWaterPotentialLYr,
    }];
  }, [
    catchmentWaterPotentialLYr,
    effectiveRainfallMm,
    climate?.rainfall,
    defaultWaterEfficiency,
    waterCaptureArea,
    waterCaptureAreaFromPolygonsM2,
    waterMaterialEfficiencyMap,
    waterMaterialKey,
    waterPolygons,
  ]);
  
  const panelSurfaceArea = solarCapacityKW * panelSurfaceM2PerKw;
  // Apply effective rainfall to panels too (first flush loss)
  const panelWaterPotential = effectiveRainfallMm > 0 ? (effectiveRainfallMm * panelSurfaceArea * 0.9) : 0;

  // Total Water Potential
  const waterPotential = mountType === 'roof' 
    ? catchmentWaterPotentialLYr 
    : catchmentWaterPotentialLYr + panelWaterPotential;

  const safeDailyWaterUseL = Number.isFinite(dailyWaterUseL) && dailyWaterUseL > 0 ? dailyWaterUseL : 0;
  const annualWaterDemandLYr = safeDailyWaterUseL * 365;
  const waterCoveragePercent = annualWaterDemandLYr > 0 ? (waterPotential / annualWaterDemandLYr) * 100 : 0;

  const waterStorageSuggestion = useMemo(() => {
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const monthlyMm = climate?.monthlyRainfallMm;

    const demandPerDay = safeDailyWaterUseL;
    const fallbackTankL = Math.max(0, demandPerDay * 90);

    if (!monthlyMm || monthlyMm.length !== 12 || demandPerDay <= 0) {
      return {
        requiredTankL: fallbackTankL,
        suggestedTankL: fallbackTankL,
        wettestMonthIdx: -1,
        driestMonthIdx: -1,
      };
    }

    const wettestMonthIdx = monthlyMm.reduce((bestIdx, v, idx) => (v > monthlyMm[bestIdx] ? idx : bestIdx), 0);
    const driestMonthIdx = monthlyMm.reduce((bestIdx, v, idx) => (v < monthlyMm[bestIdx] ? idx : bestIdx), 0);

    let storageDeficitL = 0;
    let requiredTankL = 0;

    for (let i = 0; i < 24; i++) {
      const m = i % 12;
      const supplyL = (monthlyMm[m] * effectiveWaterCaptureAreaM2) + (mountType === 'ground' ? (monthlyMm[m] * panelSurfaceArea * 0.9) : 0);
      const demandL = demandPerDay * monthDays[m];
      storageDeficitL = Math.max(0, storageDeficitL + (demandL - supplyL));
      requiredTankL = Math.max(requiredTankL, storageDeficitL);
    }

    const bufferedTankL = requiredTankL * 1.15;
    const suggestedTankL = Math.ceil(bufferedTankL / 1000) * 1000;

    return {
      requiredTankL,
      suggestedTankL,
      wettestMonthIdx,
      driestMonthIdx,
    };
  }, [
    climate?.monthlyRainfallMm,
    effectiveWaterCaptureAreaM2,
    mountType,
    panelSurfaceArea,
    safeDailyWaterUseL,
  ]);
  // 3. Food Calculation (Based on drawn Food Area)
  const availableLand = Math.max(0, propertySize - roofArea);
  const foodArea = resourceAreas.food > 0 ? resourceAreas.food : availableLand;
  const foodProductivityFactor = useMemo(() => {
    const rain = climate?.rainfall ?? 0;
    const sun = climate?.solarIrradiance ?? 0;
    const rainFactor = rain > 0 ? Math.min(1.6, Math.max(0.4, rain / 700)) : 0.7;
    const sunFactor = sun > 0 ? Math.min(1.4, Math.max(0.6, sun / 4)) : 0.8;
    const combined = (rainFactor * 0.6) + (sunFactor * 0.4);
    return Math.min(1.6, Math.max(0.5, combined));
  }, [climate?.rainfall, climate?.solarIrradiance]);

  const m2PerPersonFood = 100 / Math.max(0.2, foodProductivityFactor);
  const peopleFed = Math.floor(foodArea / Math.max(1, m2PerPersonFood));

  // 4. Wind Calculation
  // Use the selected turbine height data if available, otherwise fallback
  // Open-Meteo provides 10m and 100m data. 
  // We apply a simple wind shear adjustment if the user wants "140m" equivalent or just stick to 100m for accuracy.
  // Note: Open-Meteo "wind_speed_10m_max" is a daily max. "wind_speed_100m" (hourly) is averaged.
  // Ideally we use the hourly average for energy calculation, not the daily max.
  
  // Recalculate based on user selection (10m vs 100m)
  // If 100m is selected but not available (climate data only has 10m fallback), we estimate.
  // Hellmann exponent approx 0.143 for open terrain. v2 = v1 * (h2/h1)^0.143
  
  let baseWindSpeed = climate ? climate.windSpeed : 0;
  
  // If we want to simulate higher altitude (e.g. 140m cyclone area)
  // Let's assume the 'climate.windSpeed' is the best available average (likely 10m or 100m).
  // If the user selects "High Altitude / 100m+", we ensure we use the 100m data or extrapolate.
  
  const windSpeedToUse = turbineHeight === 100 ? (baseWindSpeed * 1.35) : baseWindSpeed; // Simplified extrapolation if data is 10m
  // Note: This is a rough estimation. In a real app, we'd store both 10m and 100m separately in state.
  
  const avgWindSpeed = windSpeedToUse;
  const windViable = avgWindSpeed >= 14; // 14 km/h threshold
  
  // Detailed Wind Calculation
  // We use 1kW turbine reference
  const turbineRatedPowerW = 1000;
  const windAvg = avgWindSpeed * 0.27778; // Convert km/h to m/s
  
  // Calculate Capacity Factor using Rayleigh Distribution
  let totalPowerW = 0;
  // Integrate from 0 to 30 m/s
  for(let v = 0; v <= 30; v += 0.5) {
     const prob = rayleighPDF(v, windAvg); // v and avg in m/s
     const power = getTurbinePowerOutput(v); // returns Watts
     totalPowerW += prob * power * 0.5; // * dv
  }
  
  // Capacity factor = Average Power / Rated Power
  const calculatedCapacityFactor = totalPowerW / turbineRatedPowerW;
  const windCapacityFactor = windViable ? Math.min(1, Math.max(0, calculatedCapacityFactor)) : 0;

  // Annual Generation for a 1kW turbine
  const windPotential = windViable ? (1 * 8760 * windCapacityFactor) : 0;
  const windCost = windViable ? 4000 : 0; // Approx $4000 for a 1kW turbine kit

  // Power Density Calculation (Watts/m²)
  // Formula: 0.5 * air_density * v^3
  // Air density approx 1.225 kg/m³ at sea level.
  // Wind speed must be in m/s. (1 km/h = 0.27778 m/s)
  const windSpeedMs = avgWindSpeed * 0.27778;
  const powerDensity = 0.5 * 1.225 * Math.pow(windSpeedMs, 3);

  const panelsCostTotalUsd = panelsNeeded * Math.max(0, panelCostUsd);
  const inverterCostTotalUsd = Math.max(0, inverterSizeKw) * Math.max(0, inverterCostPerKwUsd);
  const bosCostTotalUsd = (solarCapacityKW * Math.max(0, bosCostPerKwUsd)) + Math.max(0, bosFixedCostUsd);
  const solarHardwareCostUsd = panelsCostTotalUsd + inverterCostTotalUsd + bosCostTotalUsd;

  const suggestedStorageKWh = Math.max(0, (dailyUsage * autonomyDays) / Math.max(0.1, batteryUsableDoD) / Math.max(0.1, batteryRoundTripEfficiency));
  const batteryCostTotalUsd = suggestedStorageKWh * Math.max(0, batteryCostPerKWhUsd);

  const gravityKwhPerTonne = (1000 * 9.81 * Math.max(1, gravityHeightM)) / 3600000;
  const gravityTonnesRequired = gravityKwhPerTonne > 0 ? (suggestedStorageKWh / gravityKwhPerTonne) : 0;
  const gravityCostTotalUsd = suggestedStorageKWh * Math.max(0, gravityCostPerKWhUsd);

  const customCostTotalUsd = Math.max(0, customStorageCostUsd);

  const storageCostUsd = storageType === 'battery'
    ? batteryCostTotalUsd
    : storageType === 'gravity'
      ? gravityCostTotalUsd
      : storageType === 'custom'
        ? customCostTotalUsd
        : 0;

  const systemCost = solarHardwareCostUsd + (windViable ? windCost : 0) + storageCostUsd;
  const totalSavings = (savings || 0) + (windPotential * energyValueUsdPerKWh);
  const totalPaybackYears = totalSavings > 0 ? systemCost / totalSavings : 0;

  const handleDetailedProposal = async () => {
    if (!location || !climate) {
      toast.error('Enter a location first to generate a proposal.');
      return;
    }

    setIsGenerating(true);
    
    // Simulate processing delay for better UX (and to show loading state)
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const annualUsageKWh = dailyUsage * 365;
    const annualGenerationKWh = solarPotential + windPotential;
    const coveragePercent = annualUsageKWh > 0 ? (annualGenerationKWh / annualUsageKWh) * 100 : 0;

    const proposal = {
      version: '1',
      createdAt: new Date().toISOString(),
      addressQuery: address,
      location,
      climate,
      inputs: {
        dailyUsageKWh: dailyUsage,
        dailyWaterUseL: safeDailyWaterUseL,
        systemSizeKW: systemSize,
        roofAreaM2: roofArea,
        propertySizeM2: propertySize,
        mountType,
        dcBusVoltage,
        panel: {
          presetId: panelPresetId,
          watts: panelWatts,
          areaM2: panelAreaM2,
          costUsd: panelCostUsd,
          spacingFactor: panelSpacingFactor,
        },
        inverter: {
          type: inverterType,
          sizeKw: inverterSizeKw,
          costPerKwUsd: inverterCostPerKwUsd,
        },
        costs: {
          bosCostPerKwUsd,
          bosFixedCostUsd,
          energyValueUsdPerKWh,
        },
        storage: {
          type: storageType,
          autonomyDays,
          battery: {
            usableDoD: batteryUsableDoD,
            costPerKWhUsd: batteryCostPerKWhUsd,
            roundTripEfficiency: batteryRoundTripEfficiency,
          },
          gravity: {
            heightM: gravityHeightM,
            costPerKWhUsd: gravityCostPerKWhUsd,
          },
          custom: {
            storageKWh: customStorageKWh,
            storageCostUsd: customStorageCostUsd,
          },
        },
        turbineHeight,
        resourceAreas,
        resourcePolygons,
        wizardData,
      },
      outputs: {
        solarAreaUsedM2: solarAreaUsed,
        solarCapacityKW,
        panelsNeeded,
        panelsCostTotalUsd,
        inverterCostTotalUsd,
        bosCostTotalUsd,
        solarHardwareCostUsd,
        solarPotentialKWhYr: solarPotential,
        solarSavingsPerKWh: energyValueUsdPerKWh,
        windAvgSpeedKmh: avgWindSpeed,
        windViable,
        windCapacityFactor,
        windPotentialKWhYr: windPotential,
        effectiveRainfall: effectiveRainfallMm,
        firstFlushLoss: (climate?.rainfall ?? 0) - effectiveRainfallMm,
        waterCaptureAreaM2: waterCaptureArea,
        catchmentWaterPotentialLYr,
        waterCatchmentBreakdown: catchmentBreakdown,
        panelSurfaceAreaM2: panelSurfaceArea,
        panelWaterPotentialLYr: panelWaterPotential,
        waterPotentialLYr: waterPotential,
        annualWaterDemandLYr,
        waterCoveragePercent,
        suggestedWaterTankL: waterStorageSuggestion.suggestedTankL,
        requiredWaterTankL: waterStorageSuggestion.requiredTankL,
        foodAreaM2: foodArea,
        peopleFed,
        systemCostUsd: systemCost,
        storageCostUsd,
        suggestedStorageKWh: storageType === 'custom' ? customStorageKWh : suggestedStorageKWh,
        gravityTonnesRequired: storageType === 'gravity' ? gravityTonnesRequired : 0,
        batteryAhSuggested: storageType === 'battery' ? ((suggestedStorageKWh * 1000) / Math.max(1, dcBusVoltage)) : 0,
        annualSavingsUsd: totalSavings,
        paybackYears: totalPaybackYears,
        annualUsageKWh,
        annualGenerationKWh,
        coveragePercent,
        powerDensityWm2: powerDensity,
      },
      assumptions: {
        solarLossFactor,
        kWhValueUsd: energyValueUsdPerKWh,
        roofRunoffFactor: waterRunoffFactorUsed,
        m2PerKwSolar,
        m2PanelSurfacePerKw: panelSurfaceM2PerKw,
        windViableThresholdKmh: windThreshold,
        turbineHeightMultiplier100m: 1.35,
        peopleFedPerM2: 1 / Math.max(1, m2PerPersonFood),
      },
      limitations: [
        'Does not model shading from trees/buildings or seasonal shadow paths.',
        'Does not model roof tilt, azimuth, or slope; assumes generic yield and losses.',
        'Does not include site constraints (setbacks, access, storm exposure, corrosion, wildfire risk).',
        `Wind calculation uses Rayleigh distribution (k=2) approximation. Actual site turbulence may vary.`,
        `Rainwater assumes ${annualRainDays} rain days/yr with 1mm first-flush loss per event.`,
        'Costs are ballpark estimates and vary by region, supplier, and install complexity.',
        'Does not model battery/inverter efficiency under real load profiles or surge currents.',
        'Large systems require proper electrical design (voltage, current limits, phases, compliance).',
      ],
    };

    try {
      localStorage.setItem('offgrid_proposal_report_v1', JSON.stringify(proposal));
    } catch {}

    navigate('/proposal', { state: proposal });
    setIsGenerating(false);
    } catch (error) {
      console.error("Proposal generation failed:", error);
      toast.error("Something went wrong generating the proposal. Please try again.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-6 w-6 text-green-600" />
            <span>Location Analysis</span>
          </CardTitle>
          <CardDescription>
            Enter your location to get real-time environmental data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input 
              id="address-input"
              data-testid="address-input"
              placeholder="Enter address, city, or zip code" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={loading} data-testid="search-btn">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
            </Button>
          </div>

          {location && (
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-sm flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100 mb-1">Selected Location:</p>
                  <p className="text-gray-600 dark:text-gray-400 break-words line-clamp-2">{location.display_name}</p>
                  <div className="mt-2 flex gap-2 text-xs text-gray-500">
                    <span>Lat: {location.lat.toFixed(4)}</span>
                    <span>Lon: {location.lon.toFixed(4)}</span>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Verified</Badge>
              </div>

              {/* Area Selection Map */}
              <Tabs defaultValue={isBackpacker ? "distance" : "area"} className="space-y-4">
                <TabsList className={`grid w-full ${isBackpacker ? 'grid-cols-1' : 'grid-cols-2'}`}>
                  {!isBackpacker && <TabsTrigger value="area">Area Measurement</TabsTrigger>}
                  <TabsTrigger value="distance">Distance Measurement</TabsTrigger>
                </TabsList>
                
                {!isBackpacker && (
                <TabsContent value="area" className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Interactive Resource Mapping</Label>
                    <div className="grid grid-cols-3 gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-md">
                       <button
                         onClick={() => setActiveResourceLayer('water')}
                         className={`px-2 py-1 text-xs rounded-sm transition-all flex items-center justify-center ${
                           activeResourceLayer === 'water' 
                             ? 'bg-blue-100 text-blue-700 font-medium shadow-sm' 
                             : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                         }`}
                       >
                         <CloudRain className="w-3 h-3 mr-1" />
                         Water
                       </button>
                       <button
                         onClick={() => setActiveResourceLayer('solar')}
                         className={`px-2 py-1 text-xs rounded-sm transition-all flex items-center justify-center ${
                           activeResourceLayer === 'solar' 
                             ? 'bg-yellow-100 text-yellow-700 font-medium shadow-sm' 
                             : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                         }`}
                       >
                         <Sun className="w-3 h-3 mr-1" />
                         Solar
                       </button>
                       <button
                         onClick={() => setActiveResourceLayer('food')}
                         className={`px-2 py-1 text-xs rounded-sm transition-all flex items-center justify-center ${
                           activeResourceLayer === 'food' 
                             ? 'bg-green-100 text-green-700 font-medium shadow-sm' 
                             : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                         }`}
                       >
                         <span className="w-3 h-3 mr-1">🥕</span>
                         Food
                       </button>
                    </div>
                  </div>
                  
                  {activeResourceLayer === 'water' && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800 space-y-2">
                      <Label className="text-xs font-semibold text-blue-800 dark:text-blue-300">
                        Catchment Surface Material
                      </Label>
                      <Select 
                        value={waterMaterialKey} 
                        onValueChange={(v) => {
                          const material = CATCHMENT_MATERIALS.find((m) => m.key === v);
                          if (material) {
                            setWaterMaterialKey(material.key);
                            setResourcePolygons((prev) => ({
                              ...prev,
                              water: prev.water.map((p) => ({
                                ...p,
                                materialKey: material.key,
                              })),
                            }));
                            toast.success(`Runoff efficiency updated to ${Math.round(material.efficiency * 100)}%`);
                          }
                        }}
                      >
                        <SelectTrigger className="h-8 text-xs bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CATCHMENT_MATERIALS.map((m) => (
                            <SelectItem key={m.key} value={m.key}>
                              {m.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-[10px] text-blue-600 dark:text-blue-400">
                        Select the material of your catchment surface. Lining a hillside with plastic significantly increases runoff.
                      </p>
                    </div>
                  )}

                  <MultiLayerMap 
                    center={{ lat: location.lat, lng: location.lon }}
                    activeLayer={activeResourceLayer}
                    onAreaUpdate={handleResourceAreaUpdate}
                    onGeometryUpdate={handleResourcePolygonsUpdate}
                    waterMaterialKey={waterMaterialKey}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Select a resource type above, then draw on the map to calculate potential.
                  </p>
                </TabsContent>
                )}

                <TabsContent value="distance" className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Point-to-Point Distance</Label>
                  </div>
                  <UnifiedMeasurementMap 
                    mode="distance"
                    center={{ lat: location.lat, lng: location.lon }}
                  />
                  <p className="text-xs text-gray-500">
                    Click multiple points on the map to measure total distance (e.g., fence lines, pipe runs).
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          )}

          <Separator />

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <Sun className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
                <div className="text-sm font-medium">Solar</div>
                <div className="text-xs text-gray-500">
                  {climate ? `${climate.solarIrradiance} kWh/m²/day` : '-'}
                </div>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <CloudRain className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className="text-sm font-medium">Rainfall</div>
                <div className="text-xs text-gray-500">
                  {climate ? `${climate.rainfall} mm/yr` : '-'}
                </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg relative group cursor-help">
                <Wind className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                <div className="text-sm font-medium">Wind Potential</div>
                <div className="text-xs text-gray-500">
                  {climate ? `${climate.windSpeed} km/h` : '-'}
                </div>
                {climate && (
                   <div className="text-[10px] text-gray-400 mt-1">
                     {Math.round(powerDensity)} W/m²
                   </div>
                )}
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-black/90 text-white text-xs rounded hidden group-hover:block z-50">
                   Power Density: {Math.round(powerDensity)} W/m²
                   <br/>
                   <span className="opacity-70">Measure of wind energy available per square meter. &gt;200 W/m² is good.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
             <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Daily Usage (kWh)</Label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={openWizard}
                  className="h-8 text-xs"
                >
                  <Calculator className="w-3 h-3 mr-1" />
                  Help me estimate needs
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <input 
                  type="number" 
                  data-testid="daily-usage-input"
                  value={dailyUsage}
                  onChange={(e) => setDailyUsage(parseFloat(e.target.value))}
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-900"
                />
              </div>

              {wizardData && (
                <div className="relative mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-blue-900 dark:text-blue-100">{wizardData.profileLabel}</span>
                  </div>
                  <div className="text-blue-700 dark:text-blue-300 text-xs pl-6">
                    <p>{wizardData.peopleCount} People • {wizardData.addons.length} Add-ons</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {wizardData.addons.map(id => (
                        <span key={id} className="bg-white/50 dark:bg-black/20 px-1.5 py-0.5 rounded text-[10px] uppercase">
                          {id.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

             <div className="space-y-2">
              <Label>System Size (kW)</Label>
              <div className="flex items-center space-x-4">
                <input 
                  type="range" 
                  min="0.05" 
                  max={isBackpacker ? "2" : "20"}
                  step="0.05" 
                  data-testid="system-size-slider"
                  value={systemSize} 
                  onChange={(e) => {
                    setSystemSize(parseFloat(e.target.value));
                    if (solarSizingMode !== 'manual') {
                      setSolarSizingMode('manual');
                      toast.info('Switched to manual system sizing. Map area not used for PV size.');
                    }
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <span className="font-bold w-12" data-testid="system-size-display">{systemSize} kW</span>
              </div>
            </div>
            
            {!isBackpacker && (
            <div className="space-y-2">
              <Label>Daily Water Use (L/day)</Label>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  data-testid="daily-water-input"
                  value={dailyWaterUseL}
                  onChange={(e) => setDailyWaterUseL(parseFloat(e.target.value))}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>
            )}

            {!isBackpacker && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Roof Area (m²)</Label>
                    <div className="relative">
                      <Input 
                        type="number" 
                        value={roofArea}
                        onChange={(e) => setRoofArea(parseFloat(e.target.value))}
                      />
                      <span className="absolute right-3 top-2 text-xs text-gray-500">m²</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Property Size (m²)</Label>
                    <div className="relative">
                      <Input 
                        type="number" 
                        value={propertySize}
                        onChange={(e) => setPropertySize(parseFloat(e.target.value))}
                      />
                      <span className="absolute right-3 top-2 text-xs text-gray-500">m²</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Solar Panel Mount Type</Label>
                  <RadioGroup 
                    value={mountType} 
                    onValueChange={(v) => setMountType(v as 'roof' | 'ground')}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="roof" id="roof" />
                      <Label htmlFor="roof">Roof Mounted</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ground" id="ground" />
                      <Label htmlFor="ground">Ground / Shed</Label>
                    </div>
                  </RadioGroup>
                </div>
              </>
            )}

            <Separator />

            {!isBackpacker && (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="customise" className="border rounded-md px-3">
                <AccordionTrigger className="hover:no-underline">Customise (advanced)</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Panels</Label>
                        <div className="text-xs text-gray-500">{panelsNeeded} panels • {solarCapacityKW.toFixed(2)} kW • ~{Math.round(solarAreaUsed)} m²</div>
                      </div>

                      <Select value={panelPresetId} onValueChange={(v) => setPanelPresetId(v as (typeof PANEL_PRESETS)[number]['id'])}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select panel type" />
                        </SelectTrigger>
                        <SelectContent>
                          {PANEL_PRESETS.map((preset) => (
                            <SelectItem key={preset.id} value={preset.id}>
                              {preset.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Panel size (W)</Label>
                          <Input
                            type="number"
                            value={panelWatts}
                            onChange={(e) => {
                              const next = Number(e.target.value);
                              setPanelWatts(Number.isFinite(next) ? next : 0);
                              setPanelPresetId('custom');
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Panel area (m²)</Label>
                          <Input
                            type="number"
                            value={panelAreaM2}
                            onChange={(e) => {
                              const next = Number(e.target.value);
                              setPanelAreaM2(Number.isFinite(next) ? next : 0);
                              setPanelPresetId('custom');
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Cost per panel ($)</Label>
                          <Input
                            type="number"
                            value={panelCostUsd}
                            onChange={(e) => {
                              const next = Number(e.target.value);
                              setPanelCostUsd(Number.isFinite(next) ? next : 0);
                              setPanelPresetId('custom');
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Spacing factor</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={panelSpacingFactor}
                            onChange={(e) => {
                              const next = Number(e.target.value);
                              setPanelSpacingFactor(Number.isFinite(next) ? next : 1);
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Inverter</Label>
                        <div className="text-xs text-gray-500">Suggested: {suggestedInverterKw.toFixed(1)} kW</div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Type</Label>
                          <Select value={inverterType} onValueChange={(v) => setInverterType(v as (typeof INVERTER_TYPES)[number]['id'])}>
                            <SelectTrigger>
                              <SelectValue placeholder="Inverter type" />
                            </SelectTrigger>
                            <SelectContent>
                              {INVERTER_TYPES.map((t) => (
                                <SelectItem key={t.id} value={t.id}>
                                  {t.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>DC bus (V)</Label>
                          <Select value={String(dcBusVoltage)} onValueChange={(v) => setDcBusVoltage(Number(v) as 12 | 24 | 48)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Voltage" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="12">12V</SelectItem>
                              <SelectItem value="24">24V</SelectItem>
                              <SelectItem value="48">48V</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Inverter size (kW)</Label>
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              value={inverterSizeKw}
                              onChange={(e) => {
                                const next = Number(e.target.value);
                                setInverterSizeTouched(true);
                                setInverterSizeKw(Number.isFinite(next) ? next : 0);
                              }}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                setInverterSizeTouched(false);
                                setInverterSizeKw(suggestedInverterKw);
                              }}
                            >
                              Use
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Inverter cost ($/kW)</Label>
                          <Input
                            type="number"
                            value={inverterCostPerKwUsd}
                            onChange={(e) => {
                              const next = Number(e.target.value);
                              setInverterCostPerKwUsd(Number.isFinite(next) ? next : 0);
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <Label>Costs & losses</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Balance of system ($/kW)</Label>
                          <Input
                            type="number"
                            value={bosCostPerKwUsd}
                            onChange={(e) => {
                              const next = Number(e.target.value);
                              setBosCostPerKwUsd(Number.isFinite(next) ? next : 0);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Fixed BOS ($)</Label>
                          <Input
                            type="number"
                            value={bosFixedCostUsd}
                            onChange={(e) => {
                              const next = Number(e.target.value);
                              setBosFixedCostUsd(Number.isFinite(next) ? next : 0);
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Energy value ($/kWh)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={energyValueUsdPerKWh}
                          onChange={(e) => {
                            const next = Number(e.target.value);
                            setEnergyValueTouched(true);
                            setEnergyValueUsdPerKWh(Number.isFinite(next) ? next : 0);
                          }}
                        />
                        </div>
                        <div className="space-y-2">
                          <Label>Solar loss factor</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={solarLossFactor}
                            onChange={(e) => {
                              const next = Number(e.target.value);
                              setSolarLossFactor(Number.isFinite(next) ? next : 0);
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <Label>Storage</Label>
                      <Select value={storageType} onValueChange={(v) => setStorageType(v as (typeof STORAGE_TYPES)[number]['id'])}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select storage" />
                        </SelectTrigger>
                        <SelectContent>
                          {STORAGE_TYPES.map((t) => (
                            <SelectItem key={t.id} value={t.id}>
                              {t.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {storageType !== 'none' && storageType !== 'custom' && (
                        <div className="text-xs text-gray-600 dark:text-gray-300">
                          Suggested storage: {Math.round(suggestedStorageKWh * 10) / 10} kWh ({dcBusVoltage}V ≈ {Math.round(((suggestedStorageKWh * 1000) / Math.max(1, dcBusVoltage)))} Ah)
                        </div>
                      )}

                      {storageType === 'battery' && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Autonomy (days)</Label>
                            <Input
                              type="number"
                              step="0.5"
                              value={autonomyDays}
                              onChange={(e) => {
                                const next = Number(e.target.value);
                                setAutonomyDays(Number.isFinite(next) ? next : 0);
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Usable DoD</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={batteryUsableDoD}
                              onChange={(e) => {
                                const next = Number(e.target.value);
                                setBatteryUsableDoD(Number.isFinite(next) ? next : 0);
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Round-trip eff.</Label>
                            <Input
                              type="number"
                              step="0.01"
                              value={batteryRoundTripEfficiency}
                              onChange={(e) => {
                                const next = Number(e.target.value);
                                setBatteryRoundTripEfficiency(Number.isFinite(next) ? next : 0);
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Cost ($/kWh)</Label>
                            <Input
                              type="number"
                              value={batteryCostPerKWhUsd}
                              onChange={(e) => {
                                const next = Number(e.target.value);
                                setBatteryCostPerKWhUsd(Number.isFinite(next) ? next : 0);
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {storageType === 'gravity' && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Lift height (m)</Label>
                            <Input
                              type="number"
                              value={gravityHeightM}
                              onChange={(e) => {
                                const next = Number(e.target.value);
                                setGravityHeightM(Number.isFinite(next) ? next : 0);
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Cost ($/kWh)</Label>
                            <Input
                              type="number"
                              value={gravityCostPerKWhUsd}
                              onChange={(e) => {
                                const next = Number(e.target.value);
                                setGravityCostPerKWhUsd(Number.isFinite(next) ? next : 0);
                              }}
                            />
                          </div>
                          <div className="col-span-2 text-xs text-gray-600 dark:text-gray-300">
                            Required moving mass (rough): {Math.round(gravityTonnesRequired * 10) / 10} tonnes at {Math.max(1, gravityHeightM)}m
                          </div>
                        </div>
                      )}

                      {storageType === 'custom' && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Storage (kWh)</Label>
                            <Input
                              type="number"
                              value={customStorageKWh}
                              onChange={(e) => {
                                const next = Number(e.target.value);
                                setCustomStorageKWh(Number.isFinite(next) ? next : 0);
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Storage cost ($)</Label>
                            <Input
                              type="number"
                              value={customStorageCostUsd}
                              onChange={(e) => {
                                const next = Number(e.target.value);
                                setCustomStorageCostUsd(Number.isFinite(next) ? next : 0);
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Turbine Height Adjustment</Label>
                      <div className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-800 p-2 rounded-md">
                        <Button
                          variant={turbineHeight === 10 ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setTurbineHeight(10)}
                          className="text-xs"
                        >
                          Standard (10m)
                        </Button>
                        <Button
                          variant={turbineHeight === 100 ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setTurbineHeight(100)}
                          className="text-xs"
                        >
                          High Altitude / Tower (100m+)
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Adjust calculation for tower height or hill elevation. Wind speed increases significantly with height.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-6 w-6 text-blue-600" />
            <span>Off-Grid Potential</span>
          </CardTitle>
          <CardDescription>
            Estimated performance based on local data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{isBackpacker ? 'Daily Solar Potential' : 'Annual Solar Generation'}</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-400" data-testid="result-solar-kwh">
                  {climate ? (isBackpacker ? (Math.round((solarPotential / 365) * 100) / 100).toLocaleString() : Math.round(solarPotential).toLocaleString()) : '-'} <span className="text-sm font-normal text-gray-500">kWh</span>
                </p>
              </div>
              <Sun className="h-10 w-10 text-green-500 opacity-50" />
            </div>

            {!isBackpacker && (
            <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Water Harvest Potential</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                  {climate ? Math.round(waterPotential).toLocaleString() : '-'} <span className="text-sm font-normal text-gray-500">Liters/yr</span>
                </p>
                <div className="text-xs text-gray-500 mt-1">
                  <p>
                    {waterCaptureAreaFromPolygonsM2 > 0 ? 'Catchment surfaces' : 'Catchment'}: {climate ? Math.round(catchmentWaterPotentialLYr).toLocaleString() : '-'} L
                  </p>
                  {waterCaptureAreaFromPolygonsM2 > 0 && catchmentBreakdown.slice(0, 3).map((item) => (
                    <p key={item.materialKey}>
                      {item.label}: {climate ? Math.round(item.potentialLYr).toLocaleString() : '-'} L
                    </p>
                  ))}
                  {mountType === 'ground' && (
                    <p className="text-blue-600 font-medium">
                      + Solar Panels: {climate ? Math.round(panelWaterPotential).toLocaleString() : '-'} L
                    </p>
                  )}
                  {safeDailyWaterUseL > 0 && !isBackpacker && (
                    <p data-testid="result-water-tank">
                      Suggested tank: {Math.round(waterStorageSuggestion.suggestedTankL).toLocaleString()} L
                    </p>
                  )}
                  {safeDailyWaterUseL > 0 && (
                    <p>
                      Demand coverage: {climate ? `${Math.round(Math.min(999, waterCoveragePercent))}%` : '-'}
                    </p>
                  )}
                </div>
              </div>
              <CloudRain className="h-10 w-10 text-blue-500 opacity-50" />
            </div>
            )}

            {!isBackpacker && (
            <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Wind Energy Potential</p>
                <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                  {windViable ? Math.round(windPotential).toLocaleString() : 'Low Wind'} <span className="text-sm font-normal text-gray-500">kWh/yr</span>
                </p>
                <div className="text-xs text-gray-500 mt-1">
                  {windViable 
                    ? `Based on 1kW turbine @ ${avgWindSpeed} km/h avg` 
                    : `Avg speed ${avgWindSpeed} km/h (need >14 km/h)`}
                </div>
              </div>
              <Wind className="h-10 w-10 text-gray-500 opacity-50" />
            </div>
            )}

            {!isBackpacker && (
            <div className="flex justify-between items-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-900">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Food Production Potential</p>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">
                  {peopleFed > 0 ? `Feeds ~${peopleFed} People` : 'Limited Space'}
                </p>
                <p className="text-xs text-gray-500 mt-1">Based on {foodArea}m² allocated land</p>
              </div>
              <Label className="sr-only">Food</Label>
              <Badge variant="outline" className="h-10 w-10 flex items-center justify-center rounded-full border-orange-500 text-orange-500 opacity-50">
                 <span className="text-lg">🥕</span>
              </Badge>
            </div>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Estimated System Cost</span>
              <span className="font-semibold">${systemCost.toLocaleString()}</span>
            </div>

            <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Panels</span>
                <span className="font-semibold">{panelsNeeded} × {Math.round(panelWatts)}W</span>
              </div>
              <div className="flex justify-between">
                <span>Panel cost</span>
                <span className="font-semibold">${Math.round(panelsCostTotalUsd).toLocaleString()}</span>
              </div>
              {!isBackpacker && (
                <>
                  <div className="flex justify-between">
                    <span>Inverter ({inverterType})</span>
                    <span className="font-semibold">${Math.round(inverterCostTotalUsd).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>BOS (mount/wire/etc.)</span>
                    <span className="font-semibold">${Math.round(bosCostTotalUsd).toLocaleString()}</span>
                  </div>
                </>
              )}
              {storageCostUsd > 0 && (
                <div className="flex justify-between">
                  <span>{isBackpacker ? 'Power Station' : `Storage (${storageType})`}</span>
                  <span className="font-semibold">${Math.round(storageCostUsd).toLocaleString()}</span>
                </div>
              )}
              {windViable && !isBackpacker && (
                <div className="flex justify-between">
                  <span>Wind kit (1kW)</span>
                  <span className="font-semibold">${Math.round(windCost).toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between text-green-600">
              <span>Est. Annual Savings</span>
              <span className="font-semibold">${Math.round(totalSavings).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Payback Period</span>
              <span className="font-semibold">{climate ? totalPaybackYears.toFixed(1) : '-'} years</span>
            </div>
          </div>

          {climate && (solarPotential + windPotential) > (dailyUsage * 365) ? (
             <div className="flex items-start gap-2 p-3 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 rounded-md text-sm">
               <CheckCircle className="h-5 w-5 shrink-0" />
               <p>Great news! This system size should cover <strong>{Math.round(((solarPotential + windPotential) / (dailyUsage * 365)) * 100)}%</strong> of your annual energy needs.</p>
             </div>
          ) : (
            <div className="flex items-start gap-2 p-3 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 rounded-md text-sm">
               <AlertCircle className="h-5 w-5 shrink-0" />
               <p>{climate ? `This system covers about ${Math.round(((solarPotential + windPotential) / (dailyUsage * 365)) * 100)}% of your needs. Consider increasing system size or reducing usage.` : 'Enter location to see analysis.'}</p>
             </div>
          )}

          <Button className="w-full" size="lg" onClick={handleDetailedProposal} disabled={!climate || !location || isGenerating} data-testid="calculate-btn">
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Proposal...
              </>
            ) : (
              "Get Detailed Proposal"
            )}
          </Button>
          
          <Separator />
          
          {/* Product Recommendations */}
          <ProductRecommendations 
            systemSize={systemSize}
            windViable={windViable}
            isBackpacker={isBackpacker}
          />
        </CardContent>
      </Card>
    </div>
  );
}
