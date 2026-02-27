import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Download, FileText, MapPin, Printer, Zap, CheckCircle2, ShoppingCart, ArrowRight, User, Recycle, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, ResponsiveContainer, Legend, ComposedChart } from 'recharts';
import { products, Product } from '@/data/products';
import { AffiliateProductCard } from '@/components/AffiliateProductCard';
import { SystemSchematic } from '@/components/SystemSchematic';

export type ProposalReportData = {
  version: string;
  createdAt: string;
  addressQuery: string;
  location: { lat: number; lon: number; display_name: string };
  climate: { 
    solarIrradiance: number; 
    rainfall: number; 
    windSpeed: number; 
    monthlyRainfallMm?: number[];
    monthlySolarKWh?: number[];
    monthlyTempC?: number[];
  };
  inputs: {
    dailyUsageKWh: number;
    dailyWaterUseL?: number;
    systemSizeKW: number;
    roofAreaM2: number;
    propertySizeM2: number;
    mountType: 'roof' | 'ground';
    dcBusVoltage?: number;
    panel?: {
      presetId: string;
      watts: number;
      areaM2: number;
      costUsd: number;
      spacingFactor: number;
    };
    inverter?: {
      type: string;
      sizeKw: number;
      costPerKwUsd: number;
    };
    costs?: {
      bosCostPerKwUsd: number;
      bosFixedCostUsd: number;
      energyValueUsdPerKWh: number;
    };
    storage?: {
      type: string;
      autonomyDays: number;
      battery?: {
        usableDoD: number;
        costPerKWhUsd: number;
        roundTripEfficiency: number;
      };
      gravity?: {
        heightM: number;
        costPerKWhUsd: number;
      };
      custom?: {
        storageKWh: number;
        storageCostUsd: number;
      };
    };
    turbineHeight: number;
    resourceAreas: { water: number; solar: number; food: number };
    resourcePolygons?: Record<'water' | 'solar' | 'food', { id: string; area: number; points: { lat: number; lng: number }[]; materialKey?: string }[]>;
    wizardData?: {
      profileId: string;
      profileLabel: string;
      peopleCount: number;
      addons: string[];
      context?: 'cabin' | 'van' | 'tinyhome' | 'boat' | 'other' | 'backpacker';
    };
  };
  outputs: {
    solarAreaUsedM2: number;
    solarCapacityKW: number;
    panelsNeeded?: number;
    panelsCostTotalUsd?: number;
    inverterCostTotalUsd?: number;
    bosCostTotalUsd?: number;
    solarHardwareCostUsd?: number;
    solarPotentialKWhYr: number;
    solarSavingsPerKWh: number;
    windAvgSpeedKmh: number;
    windViable: boolean;
    windCapacityFactor: number;
    windPotentialKWhYr: number;
    effectiveRainfall?: number;
    firstFlushLoss?: number;
    waterCaptureAreaM2: number;
    catchmentWaterPotentialLYr?: number;
    roofWaterPotentialLYr?: number;
    waterCatchmentBreakdown?: { materialKey: string; label: string; areaM2: number; efficiency: number; potentialLYr: number }[];
    panelSurfaceAreaM2: number;
    panelWaterPotentialLYr: number;
    waterPotentialLYr: number;
    annualWaterDemandLYr?: number;
    waterCoveragePercent?: number;
    suggestedWaterTankL?: number;
    requiredWaterTankL?: number;
    foodAreaM2: number;
    peopleFed: number;
    systemCostUsd: number;
    storageCostUsd?: number;
    suggestedStorageKWh?: number;
    gravityTonnesRequired?: number;
    batteryAhSuggested?: number;
    annualSavingsUsd: number;
    paybackYears: number;
    annualUsageKWh: number;
    annualGenerationKWh: number;
    coveragePercent: number;
    powerDensityWm2: number;
  };
  assumptions: {
    solarLossFactor: number;
    kWhValueUsd: number;
    roofRunoffFactor: number;
    m2PerKwSolar: number;
    m2PanelSurfacePerKw: number;
    windViableThresholdKmh: number;
    turbineHeightMultiplier100m: number;
    peopleFedPerM2: number;
  };
  limitations: string[];
};

function buildStaticMapsUrl(params: {
  center: { lat: number; lon: number };
  polygonsByLayer: Record<'water' | 'solar' | 'food', { points: { lat: number; lng: number }[] }[]>;
  zoom?: number;
}) {
  const apiKey = import.meta.env.VITE_GOOGLE_SOLAR_API_KEY as string | undefined;
  if (!apiKey) return null;

  const base = new URL('https://maps.googleapis.com/maps/api/staticmap');
  base.searchParams.set('size', '640x360');
  base.searchParams.set('scale', '2');
  base.searchParams.set('maptype', 'hybrid');
  base.searchParams.set('format', 'png');
  base.searchParams.set('key', apiKey);

  const allPoints: { lat: number; lng: number }[] = [];
  (['water', 'solar', 'food'] as const).forEach((layer) => {
    const polys = params.polygonsByLayer[layer] ?? [];
    polys.forEach((poly) => {
      (poly.points ?? []).forEach((pt) => {
        allPoints.push(pt);
      });
    });
  });

  if (allPoints.length > 0) {
    const minLat = Math.min(...allPoints.map((p) => p.lat));
    const maxLat = Math.max(...allPoints.map((p) => p.lat));
    const minLng = Math.min(...allPoints.map((p) => p.lng));
    const maxLng = Math.max(...allPoints.map((p) => p.lng));
    const padLat = Math.max(0.00025, (maxLat - minLat) * 0.08);
    const padLng = Math.max(0.00025, (maxLng - minLng) * 0.08);
    const paddedMinLat = minLat - padLat;
    const paddedMaxLat = maxLat + padLat;
    const paddedMinLng = minLng - padLng;
    const paddedMaxLng = maxLng + padLng;
    base.searchParams.append('visible', `${paddedMinLat},${paddedMinLng}`);
    base.searchParams.append('visible', `${paddedMinLat},${paddedMaxLng}`);
    base.searchParams.append('visible', `${paddedMaxLat},${paddedMinLng}`);
    base.searchParams.append('visible', `${paddedMaxLat},${paddedMaxLng}`);
  } else {
    const zoom = params.zoom ?? 18;
    base.searchParams.set('center', `${params.center.lat},${params.center.lon}`);
    base.searchParams.set('zoom', String(zoom));
  }

  const layerStyle: Record<'water' | 'solar' | 'food', { stroke: string; fill: string }> = {
    water: { stroke: '0x3b82f6ff', fill: '0x60a5fa55' },
    solar: { stroke: '0xeab308ff', fill: '0xfacc1555' },
    food: { stroke: '0x22c55eff', fill: '0x4ade8055' },
  };

  (['water', 'solar', 'food'] as const).forEach((layer) => {
    const polys = params.polygonsByLayer[layer] ?? [];
    polys.forEach((poly) => {
      const pts = poly.points ?? [];
      if (pts.length < 3) return;
      const pathParts = [
        `weight:2`,
        `color:${layerStyle[layer].stroke}`,
        `fillcolor:${layerStyle[layer].fill}`,
        ...pts.map((pt) => `${pt.lat},${pt.lng}`),
      ];
      base.searchParams.append('path', pathParts.join('|'));
    });
  });

  return base.toString();
}

function formatNumber(value: number, decimals = 0) {
  if (!Number.isFinite(value)) return '-';
  return value.toLocaleString(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: decimals });
}

function formatDateTime(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString();
}

export function ProposalReport() {
  const routerLocation = useLocation();
  const [report, setReport] = useState<ProposalReportData | null>(null);

  useEffect(() => {
    const stateCandidate = routerLocation.state as ProposalReportData | null;
    if (stateCandidate && stateCandidate.location && stateCandidate.outputs) {
      setReport(stateCandidate);
      return;
    }

    try {
      const stored = localStorage.getItem('offgrid_proposal_report_v1');
      if (!stored) return;
      const parsed = JSON.parse(stored) as ProposalReportData;
      if (parsed && parsed.location && parsed.outputs) setReport(parsed);
    } catch {}
  }, [routerLocation.state]);

  const isBackpacker = useMemo(() => {
    return report?.inputs.wizardData?.context === 'backpacker';
  }, [report]);

  const headline = useMemo(() => {
    if (!report) return null;
    const coverage = Math.round(report.outputs.coveragePercent);
    const label = coverage >= 100 ? 'Likely energy-independent (annualised)' : 'Partial coverage (annualised)';
    return { coverage, label };
  }, [report]);

  const displayAnnualSavingsUsd = useMemo(() => {
    if (!report) return 0;
    const v = report.outputs.annualSavingsUsd;
    return Number.isFinite(v) ? v : 0;
  }, [report]);

  const displaySystemCostUsd = useMemo(() => {
    if (!report) return 0;
    const raw = report.outputs.systemCostUsd;
    if (Number.isFinite(raw)) return raw;
    const panels = typeof report.outputs.panelsCostTotalUsd === 'number' ? report.outputs.panelsCostTotalUsd : 0;
    const inverter = typeof report.outputs.inverterCostTotalUsd === 'number' ? report.outputs.inverterCostTotalUsd : 0;
    const bos = typeof report.outputs.bosCostTotalUsd === 'number' ? report.outputs.bosCostTotalUsd : 0;
    const storage = typeof report.outputs.storageCostUsd === 'number' ? report.outputs.storageCostUsd : 0;
    const wind = report.outputs.windViable ? 4000 : 0;
    const sum = panels + inverter + bos + storage + wind;
    return Number.isFinite(sum) ? sum : 0;
  }, [report]);

  const displayPaybackYears = useMemo(() => {
    if (!report) return 0;
    const raw = report.outputs.paybackYears;
    if (Number.isFinite(raw) && raw > 0) return raw;
    if (displayAnnualSavingsUsd <= 0) return 0;
    return displaySystemCostUsd / displayAnnualSavingsUsd;
  }, [displayAnnualSavingsUsd, displaySystemCostUsd, report]);

  const markedAreasMapUrl = useMemo(() => {
    if (isBackpacker) return null; // No map for backpackers
    if (!report?.inputs.resourcePolygons) return null;
    const polygonsByLayer: Record<'water' | 'solar' | 'food', { points: { lat: number; lng: number }[] }[]> = {
      water: report.inputs.resourcePolygons.water ?? [],
      solar: report.inputs.resourcePolygons.solar ?? [],
      food: report.inputs.resourcePolygons.food ?? [],
    };
    const totalPolys = polygonsByLayer.water.length + polygonsByLayer.solar.length + polygonsByLayer.food.length;
    if (totalPolys === 0) return null;
    return buildStaticMapsUrl({
      center: { lat: report.location.lat, lon: report.location.lon },
      polygonsByLayer,
      zoom: 18,
    });
  }, [report, isBackpacker]);

  const markedAreasTotals = useMemo(() => {
    const safeSum = (items: { area?: number }[] | undefined) => {
      if (!items || items.length === 0) return 0;
      return items.reduce((sum, p) => sum + (Number.isFinite(p.area) ? Math.max(0, p.area as number) : 0), 0);
    };

    const poly = report?.inputs.resourcePolygons;
    if (poly) {
      return {
        water: safeSum(poly.water),
        solar: safeSum(poly.solar),
        food: safeSum(poly.food),
      };
    }

    return {
      water: report?.inputs.resourceAreas.water ?? 0,
      solar: report?.inputs.resourceAreas.solar ?? 0,
      food: report?.inputs.resourceAreas.food ?? 0,
    };
  }, [report?.inputs.resourceAreas.food, report?.inputs.resourceAreas.solar, report?.inputs.resourceAreas.water, report?.inputs.resourcePolygons]);

  const solarByMonthChart = useMemo(() => {
    const sol = report?.climate?.monthlySolarKWh;
    const temp = report?.climate?.monthlyTempC;
    
    if (!sol || sol.length !== 12) return null;
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return months.map((m, idx) => {
      const psh = Math.max(0, sol[idx] ?? 0);
      const t = temp && temp[idx] ? temp[idx] : 25; // Default to 25C if missing
      
      // Basic efficiency model: -0.4% per degree C above 25
      // 100% is baseline at 25C
      const deltaT = t - 25;
      const efficiencyLoss = deltaT * 0.4;
      const efficiency = Math.max(80, Math.min(120, 100 - efficiencyLoss));
      
      // Future tech (Perovskite/N-Type) has better heat coefficient (-0.29% or less)
      const futureLoss = deltaT * 0.25;
      const futureEfficiency = Math.max(85, Math.min(125, 105 - futureLoss)); // Base 105% due to higher absolute efficiency

      return {
        month: m,
        psh: psh,
        efficiency: efficiency,
        futureEfficiency: futureEfficiency
      };
    });
  }, [report?.climate?.monthlySolarKWh, report?.climate?.monthlyTempC]);

  const rainfallByMonthChart = useMemo(() => {
    const mm = report?.climate?.monthlyRainfallMm;
    if (!mm || mm.length !== 12) return null;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((m, idx) => ({ month: m, mm: Math.max(0, mm[idx] ?? 0) }));
  }, [report?.climate?.monthlyRainfallMm]);

  // --- Product Matching Logic (BOM) ---
  const bom = useMemo(() => {
    if (!report) return null;

    const { outputs, inputs } = report;
    const isBackpacker = inputs.wizardData?.context === 'backpacker';
    const items: { product: Product; quantity: number; reason: string }[] = [];

    // --- Backpacker BOM Strategy ---
    if (isBackpacker) {
       // 1. Portable Power Station (Battery + Inverter combined)
       // Match based on daily usage. If < 500Wh -> small unit. If > 500Wh -> River 2 Pro or Jackery 1000.
       const dailyWh = inputs.dailyUsageKWh * 1000;
       const targetWh = dailyWh * (inputs.storage?.autonomyDays || 1); 
       
       let powerStation = products.find(p => p.id === 'ecoflow-river-2-pro');
       if (targetWh > 800) {
         powerStation = products.find(p => p.id === 'jackery-explorer-1000') || powerStation;
       }

       if (powerStation) {
         items.push({
           product: powerStation,
           quantity: 1,
           reason: `All-in-one power for your ${Math.round(dailyWh)}Wh daily needs`
         });
       }

       // 2. Portable Solar Panel
       // 100W or 200W folder
       const panelWattsNeeded = (dailyWh / 4); // Very rough sun hours estimate for backpacker
       let portablePanel = products.find(p => p.id === 'anker-solix-ps100-100w');
       if (panelWattsNeeded > 150) {
          portablePanel = products.find(p => p.id === 'allpowers-sp033-200w') || portablePanel;
       }

       if (portablePanel) {
         items.push({
           product: portablePanel,
           quantity: 1,
           reason: 'Foldable charging for on-the-go'
         });
       }

       // 3. Water Filter
       const filter = products.find(p => p.id === 'sawyer-squeeze-water-filter');
       if (filter) {
         items.push({
           product: filter,
           quantity: 1,
           reason: 'Essential safety for wild water sources'
         });
       }

       return items;
    }

    // --- Standard Off-Grid BOM Strategy ---

    // 1. Solar Panels
    // Find closest panel wattage match
    const targetWatts = inputs.panel?.watts || 400;
    const bestPanel = products
      .filter(p => p.category === 'Solar Panels')
      .sort((a, b) => {
         // Simple parsing of watts from name if not in specs (rough heuristic)
         // Ideally specs would have numeric watts. 
         // For now, we prioritize high rated items in the category.
         return b.rating - a.rating;
      })[0];
    
    if (bestPanel) {
      items.push({
        product: bestPanel,
        quantity: outputs.panelsNeeded || 10,
        reason: `Best rated match for ${targetWatts}W target`
      });
    }

    // 2. Battery
    // Find closest battery match (e.g. 48V)
    const targetVoltage = inputs.dcBusVoltage || 48;
    const bestBattery = products
      .filter(p => p.category === 'Battery Storage' && (p.name.includes(String(targetVoltage)) || p.name.includes('48V'))) // Basic string match
      .sort((a, b) => b.rating - a.rating)[0];

    if (bestBattery) {
      // Estimate quantity: Capacity needed / battery capacity (assuming ~5kWh per unit for big batteries or 2.5kWh)
      // This is a rough BOM estimation
      const totalKwhNeeded = outputs.suggestedStorageKWh || 10;
      const batteryKwh = 2.5; // Avg 48V 50Ah
      const qty = Math.ceil(totalKwhNeeded / batteryKwh);
      items.push({
        product: bestBattery,
        quantity: qty,
        reason: `To meet ${totalKwhNeeded.toFixed(1)} kWh storage needs`
      });
    }

    // 3. Inverter
    const targetInvKw = inputs.inverter?.sizeKw || 5;
    // Prefer the Victron 24V for mid-size, or generic 48V for large
    let bestInverter = products.find(p => p.id === 'victron-multiplus-24-3000');
    
    if (targetVoltage === 48 || targetInvKw > 3) {
       bestInverter = products.find(p => p.id === 'pure-sine-inverter-48v-1500w') || bestInverter;
    } else if (targetInvKw < 1) {
       bestInverter = products.find(p => p.id === 'victron-phoenix-inverter-12-800');
    }
    
    if (bestInverter) {
      items.push({
        product: bestInverter,
        quantity: Math.ceil(targetInvKw / 3), // Stack if needed
        reason: `Reliable power for ${targetInvKw}kW loads`
      });
    }

    // 4. Charge Controller (MPPT)
    // Always good to add a Victron if we have solar
    const bestMppt = products.find(p => p.id === 'victron-smartsolar-mppt-250-100tr');
    if (bestMppt) {
      // Number of controllers depends on array size, simplified to 1-2
      const qty = Math.ceil((outputs.solarCapacityKW || 5) / 4); // ~4kW per large controller
      items.push({
        product: bestMppt,
        quantity: qty,
        reason: 'High-efficiency MPPT for array'
      });
    }

    // 5. Electrical BOS (Safety & Distribution)
    // Combiner Box
    if (outputs.solarCapacityKW > 0.8) {
      const combiner = products.find(p => p.id === 'solar-combiner-box-4-string');
      if (combiner) {
        items.push({
          product: combiner,
          quantity: 1,
          reason: 'Essential safety & string fusing'
        });
      }
    }

    // Breakers
    const breaker = products.find(p => p.id === 'dc-circuit-breaker-63a');
    if (breaker) {
      items.push({
        product: breaker,
        quantity: 2,
        reason: 'Overcurrent protection for Battery & PV'
      });
    }
    
    // Busbars
    const busbar = products.find(p => p.id === 'busbar-250a-4-stud');
    if (busbar) {
       items.push({
        product: busbar,
        quantity: 2, // Positive and Negative
        reason: 'Clean battery distribution'
       });
    }

    return items;
  }, [report]);

  const handlePrint = () => {
    window.print();
  };

  if (!report) {
    return (
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Proposal Report
              </CardTitle>
              <CardDescription>
                No proposal data found. Generate one from the calculator first.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-3">
              <Button asChild>
                <Link to="/#calculator">Go to Calculator</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/resources/energy/diy-installs">DIY Solar Installs</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  {isBackpacker ? 'Backcountry Gear Proposal' : 'Off-Grid Potential Proposal'}
                </h1>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{report.location.display_name}</span>
                  </div>
                  <div>
                    Generated: {formatDateTime(report.createdAt)}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 no-print">
                <Button variant="outline" onClick={handlePrint} className="gap-2">
                  <Printer className="h-4 w-4" />
                  Print / Save as PDF
                </Button>
                <Button asChild className="gap-2">
                  <Link to="/#calculator">
                    <Zap className="h-4 w-4" />
                    Back to Calculator
                  </Link>
                </Button>
              </div>
            </div>

            {isBackpacker ? (
              <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
                    Backcountry Protocol (Leave No Trace)
                  </CardTitle>
                  <CardDescription>
                    Responsible camping guidelines for your trip
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-3 items-start">
                      <div className="mt-1 bg-emerald-200 dark:bg-emerald-800 rounded-full p-1">
                        <CheckCircle2 className="h-3 w-3 text-emerald-700 dark:text-emerald-300" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900 dark:text-gray-100">Plan Ahead & Prepare</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Know the regulations and special concerns for the area you'll visit.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="mt-1 bg-emerald-200 dark:bg-emerald-800 rounded-full p-1">
                        <CheckCircle2 className="h-3 w-3 text-emerald-700 dark:text-emerald-300" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900 dark:text-gray-100">Travel & Camp on Durable Surfaces</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Camp at least 200 feet from lakes and streams.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="mt-1 bg-emerald-200 dark:bg-emerald-800 rounded-full p-1">
                        <CheckCircle2 className="h-3 w-3 text-emerald-700 dark:text-emerald-300" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-900 dark:text-gray-100">Dispose of Waste Properly</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Pack it in, pack it out. Dig cat holes 6-8 inches deep for human waste.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-700 dark:text-green-300" />
                  Permit Checklist (Freedom Mode)
                </CardTitle>
                <CardDescription>
                  Assuming "No Codes" region or <span className="font-semibold">Under 200 sq. ft. exemption</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <div className="mt-1 bg-green-200 dark:bg-green-800 rounded-full p-1">
                      <CheckCircle2 className="h-3 w-3 text-green-700 dark:text-green-300" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900 dark:text-gray-100">Structure Size Limit</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Keep footprint under 200 sq. ft. (18.5 m²) to avoid most building permits.</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="mt-1 bg-green-200 dark:bg-green-800 rounded-full p-1">
                      <CheckCircle2 className="h-3 w-3 text-green-700 dark:text-green-300" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900 dark:text-gray-100">Mobile Foundation</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Use skids or wheels (tiny home on wheels) to classify as "temporary structure".</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="mt-1 bg-green-200 dark:bg-green-800 rounded-full p-1">
                      <CheckCircle2 className="h-3 w-3 text-green-700 dark:text-green-300" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900 dark:text-gray-100">Composting Toilet</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Zero-discharge systems often bypass septic requirements. <span className="underline decoration-dotted" title="Verify local health department rules">Verify locally.</span></p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            )}

            <Card className="border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-700 dark:text-yellow-300" />
                  Important limitations
                </CardTitle>
                <CardDescription className="text-yellow-800/90 dark:text-yellow-200/90">
                  This report is a first-pass estimate. It intentionally ignores many site-specific constraints.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 text-sm text-yellow-900 dark:text-yellow-100 space-y-1">
                  {report.limitations.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {report.inputs.wizardData && (
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                    Lifestyle Profile
                  </CardTitle>
                  <CardDescription>
                    Based on your "Help me figure it out" inputs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-lg text-blue-900 dark:text-blue-100">
                          {report.inputs.wizardData.profileLabel}
                        </p>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          Household of {report.inputs.wizardData.peopleCount} people
                        </p>
                      </div>
                      <div className="text-right text-xs text-blue-600 dark:text-blue-400">
                         <p>Add-ons:</p>
                         <div className="flex flex-wrap gap-1 justify-end mt-1">
                           {report.inputs.wizardData.addons.length > 0 ? report.inputs.wizardData.addons.map(id => (
                             <span key={id} className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded-full uppercase">
                               {id.replace('_', ' ')}
                             </span>
                           )) : <span>None</span>}
                         </div>
                      </div>
                   </div>
                </CardContent>
              </Card>
            )}

            {isBackpacker ? (
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                   <CardHeader>
                     <CardTitle>Estimated Kit Cost</CardTitle>
                     <CardDescription>Portable Power & Filters</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-2">
                     <div className="text-3xl font-bold text-gray-900 dark:text-white">
                       ~${formatNumber(1200)}
                     </div>
                     <div className="text-sm text-gray-600 dark:text-gray-300">
                       Includes solar, battery, and water filtration.
                     </div>
                   </CardContent>
                </Card>
                <Card>
                   <CardHeader>
                     <CardTitle>Gear Strategy</CardTitle>
                     <CardDescription>Mobility Focused</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-2">
                     <div className="text-3xl font-bold text-gray-900 dark:text-white">
                       Solar + Battery
                     </div>
                     <div className="text-sm text-gray-600 dark:text-gray-300">
                       Foldable panels charging a portable power station.
                     </div>
                   </CardContent>
                </Card>
                <Card>
                   <CardHeader>
                     <CardTitle>Total Weight</CardTitle>
                     <CardDescription>Estimated Pack Weight</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-2">
                     <div className="text-3xl font-bold text-gray-900 dark:text-white">
                       ~12 kg
                     </div>
                     <div className="text-sm text-gray-600 dark:text-gray-300">
                       Assuming 768Wh station + 100W panel + water gear.
                     </div>
                   </CardContent>
                </Card>
              </div>
            ) : (
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Energy coverage</CardTitle>
                  <CardDescription>{headline?.label}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {headline ? `${headline.coverage}%` : '-'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Generation: {formatNumber(report.outputs.annualGenerationKWh)} kWh/yr
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Usage: {formatNumber(report.outputs.annualUsageKWh)} kWh/yr
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost & payback</CardTitle>
                  <CardDescription>
                    Energy value: ${formatNumber(report.assumptions.kWhValueUsd, 2)}/kWh
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${formatNumber(displaySystemCostUsd)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Est. savings: ${formatNumber(displayAnnualSavingsUsd)} / yr
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Payback: {formatNumber(displayPaybackYears, 1)} years
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Annual generation used: {formatNumber(report.outputs.annualGenerationKWh)} kWh/yr
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Payback = system cost ÷ annual savings
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Overview</CardTitle>
                  <CardDescription>Recommended configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {formatNumber(report.outputs.solarCapacityKW ?? 0, 1)} kW Solar
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 flex justify-between">
                     <span>Storage:</span>
                     <span className="font-medium">{formatNumber(report.outputs.suggestedStorageKWh ?? 0, 1)} kWh</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 flex justify-between">
                     <span>Inverter:</span>
                     <span className="font-medium">{formatNumber(report.inputs.inverter?.sizeKw ?? 0, 1)} kW</span>
                  </div>
                  <Separator className="my-2"/>
                  {typeof report.outputs.panelsNeeded === 'number' && report.inputs.panel && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {formatNumber(report.outputs.panelsNeeded)} × {formatNumber(report.inputs.panel.watts)}W panels ({report.inputs.mountType})
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            )}

            <Separator />

            <Card>
              <CardHeader>
                <CardTitle>Marked areas</CardTitle>
                <CardDescription>Saved from your map drawing (water/solar/food)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {markedAreasMapUrl ? (
                  <div className="overflow-hidden rounded-md border">
                    <img src={markedAreasMapUrl} alt="Marked areas map" className="w-full h-auto" />
                  </div>
                ) : (
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    No marked area geometry was saved in this proposal.
                  </div>
                )}
                <div className="grid sm:grid-cols-3 gap-3 text-sm">
                  <div className="flex justify-between"><span>Water</span><span className="font-semibold">{formatNumber(markedAreasTotals.water)} m²</span></div>
                  <div className="flex justify-between"><span>Solar</span><span className="font-semibold">{formatNumber(markedAreasTotals.solar)} m²</span></div>
                  <div className="flex justify-between"><span>Food</span><span className="font-semibold">{formatNumber(markedAreasTotals.food)} m²</span></div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              {!isBackpacker && (
                <Card>
                  <CardHeader>
                    <CardTitle>Hardware</CardTitle>
                    <CardDescription>Panels, inverter, and BOS</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Panels</span><span className="font-semibold">{report.inputs.panel ? `${formatNumber(report.outputs.panelsNeeded ?? 0)} × ${formatNumber(report.inputs.panel.watts)}W` : '-'}</span></div>
                    <div className="flex justify-between"><span>Est. Array Area</span><span className="font-semibold text-blue-600">{formatNumber(report.outputs.solarAreaUsedM2, 1)} m²</span></div>
                    <div className="flex justify-between"><span>Panel unit cost</span><span className="font-semibold">{report.inputs.panel ? `$${formatNumber(report.inputs.panel.costUsd)}` : '-'}</span></div>
                    <div className="flex justify-between"><span>Panels subtotal</span><span className="font-semibold">{typeof report.outputs.panelsCostTotalUsd === 'number' ? `$${formatNumber(report.outputs.panelsCostTotalUsd)}` : '-'}</span></div>
                    <div className="flex justify-between"><span>Inverter</span><span className="font-semibold">{report.inputs.inverter ? `${formatNumber(report.inputs.inverter.sizeKw, 1)} kW (${report.inputs.inverter.type})` : '-'}</span></div>
                    <div className="flex justify-between"><span>Inverter subtotal</span><span className="font-semibold">{typeof report.outputs.inverterCostTotalUsd === 'number' ? `$${formatNumber(report.outputs.inverterCostTotalUsd)}` : '-'}</span></div>
                    <div className="flex justify-between"><span>BOS subtotal</span><span className="font-semibold">{typeof report.outputs.bosCostTotalUsd === 'number' ? `$${formatNumber(report.outputs.bosCostTotalUsd)}` : '-'}</span></div>
                  </CardContent>
                </Card>
              )}

              {!isBackpacker && (
                <Card>
                  <CardHeader>
                    <CardTitle>Storage</CardTitle>
                    <CardDescription>Suggested storage sizing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Type</span><span className="font-semibold">{report.inputs.storage?.type ?? 'none'}</span></div>
                    <div className="flex justify-between"><span>Suggested capacity</span><span className="font-semibold">{typeof report.outputs.suggestedStorageKWh === 'number' ? `${formatNumber(report.outputs.suggestedStorageKWh, 1)} kWh` : '-'}</span></div>
                    <div className="flex justify-between"><span>Bus voltage</span><span className="font-semibold">{report.inputs.dcBusVoltage ? `${formatNumber(report.inputs.dcBusVoltage)}V` : '-'}</span></div>
                    {typeof report.outputs.batteryAhSuggested === 'number' && report.outputs.batteryAhSuggested > 0 && (
                      <div className="flex justify-between"><span>Battery size (rough)</span><span className="font-semibold">{formatNumber(report.outputs.batteryAhSuggested, 0)} Ah</span></div>
                    )}
                    {typeof report.outputs.gravityTonnesRequired === 'number' && report.outputs.gravityTonnesRequired > 0 && (
                      <div className="flex justify-between"><span>Moving mass (rough)</span><span className="font-semibold">{formatNumber(report.outputs.gravityTonnesRequired, 1)} tonnes</span></div>
                    )}
                    <div className="flex justify-between"><span>Storage subtotal</span><span className="font-semibold">{typeof report.outputs.storageCostUsd === 'number' ? `$${formatNumber(report.outputs.storageCostUsd)}` : '$0'}</span></div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle>Solar breakdown & Efficiency</CardTitle>
                  <CardDescription>
                    Usable sun hours and temperature impact. 
                    <span className="ml-1 text-green-600 font-medium">
                       Future tech (2026+) trends shown in dotted line.
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                          <div className="flex justify-between"><span>Solar irradiance</span><span className="font-semibold">{formatNumber(report.climate.solarIrradiance, 2)} kWh/m²/day</span></div>
                          <div className="flex justify-between"><span>Loss factor</span><span className="font-semibold">{formatNumber(report.assumptions.solarLossFactor, 2)}</span></div>
                      </div>
                      <div>
                          <div className="flex justify-between"><span>PV capacity</span><span className="font-semibold">{formatNumber(report.outputs.solarCapacityKW, report.outputs.solarCapacityKW < 1 ? 3 : 1)} kW</span></div>
                          <div className="flex justify-between"><span>{isBackpacker ? 'Est. daily generation' : 'Est. annual generation'}</span><span className="font-semibold">{formatNumber(isBackpacker ? report.outputs.solarPotentialKWhYr / 365 : report.outputs.solarPotentialKWhYr, isBackpacker ? 2 : 0)} kWh</span></div>
                      </div>
                  </div>

                  {solarByMonthChart && (
                    <div className="pt-2">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Monthly Sun Hours vs Temperature Efficiency</div>
                      <ChartContainer
                        className="min-h-[250px] w-full"
                        config={{
                          psh: {
                            label: 'Sun Hours (kWh/m²)',
                            color: 'hsl(var(--chart-1))',
                          },
                          efficiency: {
                            label: 'Panel Eff. (%)',
                            color: 'hsl(var(--chart-2))',
                          },
                          future: {
                            label: '2026 Tech (%)',
                            color: '#10b981', // Green
                          }
                        }}
                      >
                        <ComposedChart data={solarByMonthChart} margin={{ left: 0, right: 0 }}>
                          <CartesianGrid vertical={false} strokeDasharray="3 3" />
                          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{fontSize: 10}} />
                          <YAxis yAxisId="left" orientation="left" tickLine={false} axisLine={false} width={30} tick={{fontSize: 10}} label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                          <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} width={30} tick={{fontSize: 10}} domain={[80, 130]} hide />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar yAxisId="left" dataKey="psh" fill="var(--color-psh)" radius={[4, 4, 0, 0]} barSize={20} name="Sun Hours" />
                          <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="var(--color-efficiency)" strokeWidth={2} dot={false} name="Current Tech Efficiency (Rel)" />
                          <Line yAxisId="right" type="monotone" dataKey="futureEfficiency" stroke="var(--color-future)" strokeWidth={2} strokeDasharray="5 5" dot={false} name="2026 Tech Projection" />
                          <Legend verticalAlign="top" height={36}/>
                        </ComposedChart>
                      </ChartContainer>
                      <div className="text-[10px] text-gray-500 mt-2">
                        * Efficiency lines show relative performance vs Standard Test Conditions (STC 25°C). 2026 Projection assumes N-Type/Perovskite tech with lower heat degradation.
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {!isBackpacker && (
              <Card>
                <CardHeader>
                  <CardTitle>Wind breakdown</CardTitle>
                  <CardDescription>1kW reference turbine</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Avg wind speed</span><span className="font-semibold">{formatNumber(report.outputs.windAvgSpeedKmh, 1)} km/h</span></div>
                  <div className="flex justify-between"><span>Viable threshold</span><span className="font-semibold">{formatNumber(report.assumptions.windViableThresholdKmh)} km/h</span></div>
                  <div className="flex justify-between"><span>Capacity factor</span><span className="font-semibold">{formatNumber(report.outputs.windCapacityFactor, 2)}</span></div>
                  <div className="flex justify-between text-xs text-gray-500"><span>Turbine Specs</span><span>3/11/25 m/s (1kW)</span></div>
                  <div className="flex justify-between text-xs text-gray-500"><span>Model</span><span>Rayleigh (k=2)</span></div>
                  <div className="flex justify-between"><span>Est. annual generation</span><span className="font-semibold">{report.outputs.windViable ? `${formatNumber(report.outputs.windPotentialKWhYr)} kWh` : 'Low wind'}</span></div>
                  <div className="flex justify-between"><span>Power density</span><span className="font-semibold">{formatNumber(report.outputs.powerDensityWm2, 0)} W/m²</span></div>
                </CardContent>
              </Card>
              )}
            </div>

            <Separator />
            
            {!isBackpacker && (
            <section className="space-y-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Zap className="h-6 w-6 text-yellow-500" />
                  System Schematic
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                   Standard DC-coupled off-grid topology for your proposed {formatNumber(report.outputs.solarCapacityKW, 1)}kW system.
                </p>
              </div>
              <SystemSchematic />
            </section>
            )}

            {!isBackpacker && <Separator />}

            <section className="space-y-6 no-print">
              <div className="flex flex-col gap-2">
                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                   <ShoppingCart className="h-6 w-6 text-green-600" />
                   Recommended Bill of Materials (BOM)
                 </h2>
                 <p className="text-gray-600 dark:text-gray-300">
                    We've matched your system requirements with top-rated components from our shop.
                 </p>
              </div>

              {bom && bom.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {bom.map((item, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -top-3 -right-3 z-10 bg-secondary text-secondary-foreground font-bold px-3 py-1 rounded-full shadow-md">
                        x{item.quantity}
                      </div>
                      <AffiliateProductCard {...item.product} />
                      <div className="mt-2 text-xs text-muted-foreground bg-muted p-2 rounded text-center">
                        {item.reason}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-muted rounded-lg">
                  <p>No matching products found in catalog.</p>
                </div>
              )}
            </section>

            <Separator className="no-print" />
            
            <section className="space-y-6">
               <div className="flex flex-col gap-2">
                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                   <CheckCircle2 className="h-6 w-6 text-blue-600" />
                   Next Steps
                 </h2>
               </div>
               
               <div className="grid md:grid-cols-2 gap-6">
                 <Card>
                   <CardHeader>
                     <CardTitle className="text-lg">1. Verification</CardTitle>
                   </CardHeader>
                   <CardContent>
                     <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                       <li>Verify sun hours with a local solar insolation map.</li>
                       <li>Check local council regulations for "Permitted Development" rights.</li>
                       <li>Confirm soil type if planning ground mounts.</li>
                     </ul>
                   </CardContent>
                 </Card>
                 
                 <Card>
                   <CardHeader>
                     <CardTitle className="text-lg">2. Procurement</CardTitle>
                   </CardHeader>
                   <CardContent>
                     <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                       <li>Order major components (Panels, Inverter, Batteries) early due to shipping times.</li>
                       <li>Source copper cabling (4/0 AWG for battery, 10 AWG for PV) locally to save shipping.</li>
                       <li>Buy fuses and breakers matching 1.25x your max current.</li>
                     </ul>
                   </CardContent>
                 </Card>
               </div>
            </section>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Water harvesting</CardTitle>
                  <CardDescription>Rainfall-based capture estimate</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between"><span>Annual rainfall</span><span className="font-semibold">{formatNumber(report.climate.rainfall)} mm</span></div>
                  {report.outputs.effectiveRainfall !== undefined && (
                     <div className="flex justify-between text-xs text-gray-500 pl-2 border-l-2 border-gray-200 dark:border-gray-700 ml-1">
                        <span>First-flush loss</span>
                        <span>-{formatNumber(report.outputs.firstFlushLoss ?? 0, 0)} mm</span>
                     </div>
                  )}
                  {report.outputs.effectiveRainfall !== undefined && (
                     <div className="flex justify-between">
                        <span>Effective rainfall</span>
                        <span className="font-semibold">{formatNumber(report.outputs.effectiveRainfall, 0)} mm</span>
                     </div>
                  )}
                  <div className="flex justify-between"><span>Capture area</span><span className="font-semibold">{formatNumber(report.outputs.waterCaptureAreaM2)} m²</span></div>
                  <div className="flex justify-between"><span>Runoff factor</span><span className="font-semibold">{formatNumber(report.assumptions.roofRunoffFactor, 2)}</span></div>
                  <div className="flex justify-between"><span>Catchment potential</span><span className="font-semibold">{formatNumber((report.outputs.catchmentWaterPotentialLYr ?? report.outputs.roofWaterPotentialLYr) ?? 0)} L/yr</span></div>
                  {(report.outputs.waterCatchmentBreakdown ?? []).length > 0 && (
                    <div className="space-y-1">
                      {(report.outputs.waterCatchmentBreakdown ?? []).slice(0, 4).map((item) => (
                        <div key={item.materialKey} className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                          <span>{item.label}</span>
                          <span className="font-medium">{formatNumber(item.potentialLYr)} L/yr</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {report.inputs.mountType === 'ground' && (
                    <div className="flex justify-between"><span>Panel potential</span><span className="font-semibold">{formatNumber(report.outputs.panelWaterPotentialLYr)} L/yr</span></div>
                  )}
                  <div className="flex justify-between"><span>Total potential</span><span className="font-semibold">{formatNumber(report.outputs.waterPotentialLYr)} L/yr</span></div>

                  {typeof report.outputs.annualWaterDemandLYr === 'number' && (
                    <div className="flex justify-between"><span>Est. annual demand</span><span className="font-semibold">{formatNumber(report.outputs.annualWaterDemandLYr)} L/yr</span></div>
                  )}
                  {typeof report.outputs.waterCoveragePercent === 'number' && (
                    <div className="flex justify-between"><span>Demand coverage</span><span className="font-semibold">{formatNumber(report.outputs.waterCoveragePercent, 0)}%</span></div>
                  )}
                  {typeof report.outputs.suggestedWaterTankL === 'number' && (
                    <div className="flex justify-between"><span>Suggested tank</span><span className="font-semibold">{formatNumber(report.outputs.suggestedWaterTankL, 0)} L</span></div>
                  )}

                  {rainfallByMonthChart && (
                    <div className="pt-2">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Monthly rainfall (last-year archive data)</div>
                      <ChartContainer
                        className="min-h-[220px] w-full"
                        config={{
                          mm: {
                            label: 'Rainfall (mm)',
                            color: 'hsl(var(--chart-2))',
                          },
                        }}
                      >
                        <BarChart data={rainfallByMonthChart} margin={{ left: 8, right: 8 }}>
                          <CartesianGrid vertical={false} />
                          <XAxis dataKey="month" tickLine={false} axisLine={false} />
                          <YAxis tickLine={false} axisLine={false} width={34} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="mm" fill="var(--color-mm)" radius={6} />
                        </BarChart>
                      </ChartContainer>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Food area heuristic*</CardTitle>
                  <CardDescription>Planning-only estimate, climate-adjusted</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Food area</span><span className="font-semibold">{formatNumber(report.outputs.foodAreaM2)} m²</span></div>
                  <div className="flex justify-between"><span>Heuristic*</span><span className="font-semibold">{formatNumber(1 / report.assumptions.peopleFedPerM2, 0)} m²/person</span></div>
                  <div className="flex justify-between"><span>People fed</span><span className="font-semibold">{report.outputs.peopleFed > 0 ? `~${report.outputs.peopleFed}` : 'Limited space'}</span></div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Starts from 100 m²/person, then adjusts using annual rainfall and solar irradiance. Ignores irrigation, soil quality, crops, and seasonal variability.
                  </div>
                  
                  {/* Survival Botany Section */}
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="text-lg">🥔</span> Survival Botany (Mars-Style)
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                      High-efficiency crops for extreme self-reliance. Prioritizing calories and resilience.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="bg-orange-50 dark:bg-orange-900/10 p-2 rounded text-xs border border-orange-100 dark:border-orange-800">
                        <p className="font-semibold text-orange-800 dark:text-orange-200">Top Survival Calories:</p>
                        <ul className="list-disc pl-4 mt-1 space-y-1 text-orange-900 dark:text-orange-100">
                          <li><strong>Sweet Potatoes:</strong> 769 kcal/kg. Edible leaves + tubers. Heat tolerant.</li>
                          <li><strong>Potatoes:</strong> High yield. Needs depth. The "Mars" staple.</li>
                          <li><strong>Amaranth:</strong> Drought-hardy grain + protein-rich greens.</li>
                        </ul>
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/10 p-2 rounded text-xs border border-blue-100 dark:border-blue-800">
                        <p className="font-semibold text-blue-800 dark:text-blue-200">Hydro/Aeroponics (Low Water):</p>
                        <p className="mt-1 text-blue-900 dark:text-blue-100">
                          Use <strong>High Pressure Aeroponics (HPA)</strong> for 98% water savings vs soil.
                          Roots hang in air, misted every 5 mins. Ideal for bunkers or arid zones.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Backpacker / Context Advice */}
              {report.inputs.wizardData?.context === 'backpacker' && (
                <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
                   <CardHeader>
                     <CardTitle className="flex items-center gap-2">
                       <span className="text-xl">🎒</span> Backpacker Strategy
                     </CardTitle>
                   </CardHeader>
                   <CardContent className="text-sm space-y-2 text-green-900 dark:text-green-100">
                     <p><strong>Mobility is Key:</strong> Forget glass panels. Use <strong>ETFE foldable panels</strong> (lighter, durable).</p>
                     <p><strong>Power Bank:</strong> A 20,000mAh buffer is mandatory. Look for USB-C PD input/output.</p>
                     <p><strong>Water:</strong> You cannot carry a tank. Invest in a <strong>Sawyer Squeeze</strong> or UV pen (Steripen) for on-the-go filtration.</p>
                     <Separator className="my-2 bg-green-200 dark:bg-green-800" />
                     <p><strong>Sanitation (Leave No Trace):</strong></p>
                     <ul className="list-disc pl-5 text-xs">
                        <li><strong>Cat Holes:</strong> Dig 6-8" deep, 200ft from water. Cover well.</li>
                        <li><strong>WAG Bags:</strong> Required in sensitive/alpine zones. Pack it out!</li>
                        <li><strong>TP:</strong> Pack it out in a Ziploc. Don't burn it (forest fire risk).</li>
                     </ul>
                   </CardContent>
                </Card>
              )}

              {/* Sanitation & Waste Strategy (For non-backpackers) */}
              {report.inputs.wizardData?.context !== 'backpacker' && (
                <Card className="border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Recycle className="h-5 w-5 text-emerald-600" />
                      Sanitation & Waste Strategy
                    </CardTitle>
                    <CardDescription>
                      Tailored for {report.inputs.wizardData?.context || 'Cabin'} living
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    {/* Strategy Selection based on Context */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Blackwater (Toilet) */}
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Trash2 className="h-4 w-4" /> Toilet Solutions
                        </h4>
                        {report.inputs.wizardData?.context === 'van' || report.inputs.wizardData?.context === 'boat' ? (
                          <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
                            <li><strong>Best:</strong> Urine Diverting Dry Toilet (UDDT) or Cassette. Minimizes smell/weight.</li>
                            <li><strong>Incinerating (Gas):</strong> Burns waste to ash. 12V power. No blackwater tank needed (Huge plus for vans).</li>
                            <li><strong>Avoid:</strong> Composting (too bulky) or standard flush (too much water weight).</li>
                          </ul>
                        ) : (
                          <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
                            <li><strong>Best:</strong> Composting / Humanure. Free fertilizer for the garden.</li>
                            <li><strong>Alternative:</strong> Septic System (Requires permits + heavy machinery).</li>
                            <li><strong>Biogas Digester:</strong> Turns waste + kitchen scraps into cooking gas.</li>
                          </ul>
                        )}
                      </div>

                      {/* Greywater & Kitchen Waste */}
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-900/10 rounded border border-emerald-100 dark:border-emerald-800">
                         <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <span className="text-lg">🪱</span> Greywater & Scraps
                        </h4>
                         <ul className="space-y-2 text-xs text-emerald-900 dark:text-emerald-100">
                           <li><strong>Kitchen Scraps:</strong> Feed to <em>Red Wiggler</em> worms (Vermiculture) or Biogas digester.</li>
                           <li><strong>Greywater:</strong> Use biodegradable soap. Divert to "Mulch Basins" around fruit trees (no storage &gt;24h).</li>
                           <li><strong>Trash:</strong> Burn paper/cardboard. Compact plastics. "Pack it in, pack it out" rule applies.</li>
                         </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <Separator />

            <Card>
              <CardHeader>
                <CardTitle>Assumptions used</CardTitle>
                <CardDescription>These drive the numbers—adjusting them changes the result.</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between"><span>Energy value</span><span className="font-semibold">${formatNumber(report.assumptions.kWhValueUsd, 2)}/kWh</span></div>
                <div className="flex justify-between"><span>m² per kW PV</span><span className="font-semibold">{formatNumber(report.assumptions.m2PerKwSolar)} m²</span></div>
                <div className="flex justify-between"><span>PV losses</span><span className="font-semibold">{formatNumber(report.assumptions.solarLossFactor, 2)}</span></div>
                <div className="flex justify-between"><span>Roof runoff</span><span className="font-semibold">{formatNumber(report.assumptions.roofRunoffFactor, 2)}</span></div>
                <div className="flex justify-between"><span>Wind threshold</span><span className="font-semibold">{formatNumber(report.assumptions.windViableThresholdKmh)} km/h</span></div>
                <div className="flex justify-between"><span>Food heuristic*</span><span className="font-semibold">{formatNumber(1 / report.assumptions.peopleFedPerM2, 0)} m²/person</span></div>
              </CardContent>
            </Card>

            <div className="no-print">
              <Button variant="outline" onClick={handlePrint} className="gap-2">
                <Download className="h-4 w-4" />
                Download as PDF (via Print)
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
