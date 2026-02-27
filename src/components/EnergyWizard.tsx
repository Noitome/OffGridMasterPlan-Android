import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProposalReportData } from '@/pages/ProposalReport';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Check, ChevronRight, Home, Lightbulb, Users, Zap, Truck, Anchor, Smartphone, Tent, Info, Ship, Battery } from 'lucide-react';
import { useWizard, WizardData } from '@/contexts/WizardContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CONTEXT_OPTIONS = [
  { id: 'cabin', label: 'OFF-GRID HOUSE', icon: Home, description: 'Stationary cabin, remote location' },
  { id: 'van', label: 'Van Life', icon: Truck, description: 'Mobile living, vehicle alternator' },
  { id: 'tinyhome', label: 'Tiny Home', icon: Home, description: 'Semi-permanent, Glamping, Limited space' },
  { id: 'boat', label: 'Marine / Boat', icon: Ship, description: 'Water-based, corrosion resistant' },
  { id: 'backpacker', label: 'Backpacker / Tent', icon: Tent, description: 'Portable, lightweight gear' },
  { id: 'other', label: 'Other', icon: Battery, description: 'Custom setup' },
];

const BACKPACKER_STYLES = [
  {
    id: 'ultralight',
    label: 'Ultralight Hiker',
    description: 'Phone, headlamp, emergency beacon. Minimum weight.',
    baseKWh: 0.05, // 50Wh/day
    peakKw: 0.02, // 20W charging
    icon: Lightbulb
  },
  {
    id: 'digital_nomad',
    label: 'Digital Nomad',
    description: 'Laptop, camera, drone, phone, hotspot.',
    baseKWh: 0.3, // 300Wh/day
    peakKw: 0.1, // 100W charging
    icon: Smartphone
  },
  {
    id: 'basecamp',
    label: 'Basecamp / Car Camping',
    description: 'Electric cooler, lights, music, inflatable mattress pump.',
    baseKWh: 0.8, // 800Wh/day
    peakKw: 0.2, // 200W inverter
    icon: Tent
  }
];

const BACKPACKER_GEAR = [
  { id: 'drone', label: 'Drone Charging', kwhPerDay: 0.1, kwSurge: 0.1 },
  { id: 'camera', label: 'Pro Camera Gear', kwhPerDay: 0.05, kwSurge: 0.05 },
  { id: 'cooler', label: '12V Electric Cooler', kwhPerDay: 0.5, kwSurge: 0.06 },
  { id: 'laptop', label: 'High-End Laptop', kwhPerDay: 0.2, kwSurge: 0.1 },
  { id: 'cpap', label: 'Travel CPAP', kwhPerDay: 0.3, kwSurge: 0.1 },
  { id: 'starlink', label: 'Starlink Mini', kwhPerDay: 0.4, kwSurge: 0.05 },
];

const LIFESTYLE_PROFILES = [
  {
    id: 'minimalist',
    label: 'Minimalist / Weekender',
    description: 'Lights, phone charging, small fridge. No heavy appliances.',
    baseKWh: 3,
    peakKw: 2,
    icon: Lightbulb
  },
  {
    id: 'standard',
    label: 'Standard Living',
    description: 'TV, full fridge, washing machine, laptop, kitchen gadgets.',
    baseKWh: 10,
    peakKw: 5,
    icon: Home
  },
  {
    id: 'heavy',
    label: 'Heavy Electric',
    description: 'Electric cooking, A/C or electric heat, water pump, tools.',
    baseKWh: 25,
    peakKw: 8,
    icon: Zap
  },
  {
    id: 'industrial',
    label: 'Homestead / Workshop',
    description: 'Welding, large machinery, EV charging, multiple freezers.',
    baseKWh: 45,
    peakKw: 12,
    icon: Users // Representing multiple people/workers
  }
];

const APPLIANCE_ADDONS = [
  { id: 'ac', label: 'Air Conditioning', kwhPerDay: 8, kwSurge: 3 },
  { id: 'heating', label: 'Electric Heating', kwhPerDay: 12, kwSurge: 4 },
  { id: 'cooking', label: 'Electric Stove/Oven', kwhPerDay: 4, kwSurge: 3 },
  { id: 'wellpump', label: 'Deep Well Pump', kwhPerDay: 1.5, kwSurge: 1.5 },
  { id: 'starlink', label: 'Starlink Internet', kwhPerDay: 1.2, kwSurge: 0.1 },
  { id: 'workshop', label: 'Workshop Tools (Welder/Saw)', kwhPerDay: 2.0, kwSurge: 3.5 },
  { id: 'ev_charging', label: 'EV Charging (Level 1)', kwhPerDay: 10.0, kwSurge: 1.4 },
  { id: 'ev_fast', label: 'EV Charging (Level 2)', kwhPerDay: 25, kwSurge: 7 },
];

export function EnergyWizard() {
  const navigate = useNavigate();
  const { isOpen, closeWizard, setWizardResults, wizardData: currentData } = useWizard();
  const [step, setStep] = useState(0);
  const [context, setContext] = useState<'cabin' | 'van' | 'tinyhome' | 'boat' | 'other' | 'backpacker'>('cabin');
  const [profile, setProfile] = useState<string>('standard');
  const [people, setPeople] = useState<number>(2);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Sync with currentData if available when opening
  useEffect(() => {
    if (isOpen && currentData) {
      setContext(currentData.context);
      setProfile(currentData.profileId);
      setPeople(currentData.peopleCount);
      setSelectedAddons(currentData.addons);
    }
  }, [isOpen, currentData]);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const calculate = () => {
    const isBackpacker = context === 'backpacker';
    const profileList = isBackpacker ? BACKPACKER_STYLES : LIFESTYLE_PROFILES;
    const baseProfile = profileList.find(p => p.id === profile) || profileList[0];
    
    // People adjustment
    const peopleFactor = isBackpacker ? people : (1 + (Math.max(0, people - 2) * 0.2));
    
    let totalKWh = baseProfile.baseKWh * peopleFactor;
    let maxSurge = baseProfile.peakKw; 
    
    if (isBackpacker) {
       maxSurge = baseProfile.peakKw * people; 
    }

    const addonList = isBackpacker ? BACKPACKER_GEAR : APPLIANCE_ADDONS;

    selectedAddons.forEach(addonId => {
      const addon = addonList.find(a => a.id === addonId);
      if (addon) {
        totalKWh += addon.kwhPerDay;
        maxSurge = Math.max(maxSurge, baseProfile.peakKw + addon.kwSurge * 0.8); 
      }
    });

    setWizardResults({
      profileId: baseProfile.id,
      profileLabel: baseProfile.label,
      peopleCount: people,
      addons: selectedAddons,
      context: context
    }, {
      dailyKWh: isBackpacker ? Number(totalKWh.toFixed(3)) : Math.round(totalKWh),
      peakKw: Number(maxSurge.toFixed(3))
    });
    
    closeWizard();
    setStep(0); // Reset for next time

    // Navigate with state for Backpacker mode to ensure immediate report generation
    if (isBackpacker) {
      const mockLocation = { lat: 0, lon: 0, display_name: 'Portable / Roving' };
      const mockClimate = { solarIrradiance: 5, rainfall: 0, windSpeed: 0 }; // Average defaults
      
      // Calculate sensible solar size based on usage (Target: generate 100% of need with 4 sun hours)
      // Ultralight (0.05kWh) -> ~15W panel. Basecamp (0.8kWh) -> ~200W panel.
      const suggestedSolarKw = Math.max(0.02, Math.ceil((totalKWh / 4) * 100) / 100);

      const reportData = {
        version: '1.0.0',
        createdAt: new Date().toISOString(),
        addressQuery: 'Portable',
        location: mockLocation,
        climate: mockClimate,
        inputs: {
          dailyUsageKWh: Number(totalKWh.toFixed(3)),
          dailyWaterUseL: 5 * people,
          systemSizeKW: suggestedSolarKw, // Dynamic sizing
          roofAreaM2: 0,
          propertySizeM2: 0,
          mountType: 'ground',
          turbineHeight: 0,
          resourceAreas: { water: 0, solar: 0, food: 0 },
          wizardData: {
            profileId: baseProfile.id,
            profileLabel: baseProfile.label,
            peopleCount: people,
            addons: selectedAddons,
            context: context
          },
          storage: {
            type: 'battery',
            autonomyDays: 1,
            battery: { usableDoD: 0.9, costPerKWhUsd: 1000, roundTripEfficiency: 0.95 }
          }
        },
        outputs: {
          solarAreaUsedM2: suggestedSolarKw * 5, // Approx 5m2/kW for folding panels
          solarCapacityKW: suggestedSolarKw,
          solarPotentialKWhYr: suggestedSolarKw * 5 * 365,
          solarSavingsPerKWh: 0,
          windAvgSpeedKmh: 0,
          windViable: false,
          windCapacityFactor: 0,
          windPotentialKWhYr: 0,
          waterCaptureAreaM2: 0,
          panelSurfaceAreaM2: suggestedSolarKw * 5,
          panelWaterPotentialLYr: 0,
          waterPotentialLYr: 0,
          annualWaterDemandLYr: 5 * people * 365,
          foodAreaM2: 0,
          peopleFed: 0,
          systemCostUsd: 500 + (suggestedSolarKw * 2000), // Base kit + solar cost
          annualSavingsUsd: 0,
          paybackYears: 0,
          annualUsageKWh: totalKWh * 365,
          annualGenerationKWh: suggestedSolarKw * 5 * 365,
          coveragePercent: (suggestedSolarKw * 5) / totalKWh * 100,
          powerDensityWm2: 0
        },
        assumptions: {
          solarLossFactor: 0.85,
          kWhValueUsd: 0.15,
          roofRunoffFactor: 0.9,
          m2PerKwSolar: 5,
          m2PanelSurfacePerKw: 5,
          windViableThresholdKmh: 14,
          turbineHeightMultiplier100m: 1,
          peopleFedPerM2: 0.1
        },
        limitations: ['Portable system estimates only']
      };
      navigate('/proposal', { state: reportData });
    } else {
      navigate('/proposal');
    }
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeWizard()}>
      <DialogContent className="sm:max-w-[600px] w-[calc(100%-1.5rem)] top-3 translate-y-0 sm:top-[50%] sm:translate-y-[-50%] max-h-[calc(100dvh-1.5rem)] overflow-hidden p-0 flex flex-col gap-0">
        <div className="p-6 pb-0">
          <DialogHeader>
            <DialogTitle>Energy Needs Wizard</DialogTitle>
            <DialogDescription>
              Let's figure out your power requirements based on your lifestyle.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 py-6 overflow-y-auto flex-1 min-h-0">
          {step === 0 && (
            <div className="space-y-6">
              <Label className="text-base">What kind of structure is this for?</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CONTEXT_OPTIONS.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setContext(c.id as any)}
                      className={`flex flex-col items-center text-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-muted ${
                        context === c.id ? 'border-primary bg-primary/5' : 'border-muted'
                      }`}
                    >
                      <div className={`p-3 rounded-full ${context === c.id ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{c.label}</h4>
                        <p className="text-xs text-muted-foreground">{c.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Label className="text-base">{context === 'backpacker' ? 'What is your travel style?' : 'Which best describes your lifestyle?'}</Label>
                {context === 'backpacker' && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Your travel style helps us estimate weight limits and power durability needs.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4">
                {(context === 'backpacker' ? BACKPACKER_STYLES : LIFESTYLE_PROFILES).map((p) => {
                  const Icon = p.icon;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setProfile(p.id)}
                      className={`relative flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all hover:bg-muted ${
                        profile === p.id ? 'border-primary bg-primary/5' : 'border-muted'
                      }`}
                    >
                      <div className={`p-2 rounded-full ${profile === p.id ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{p.label}</h4>
                        <p className="text-sm text-muted-foreground">{p.description}</p>
                      </div>
                      {profile === p.id && (
                        <div className="absolute top-4 right-4">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label className="text-base">{context === 'backpacker' ? 'Party Size' : 'How many people live here?'}</Label>
                  <span className="font-bold text-lg">{people}</span>
                </div>
                <Slider 
                  value={[people]} 
                  min={1} 
                  max={10} 
                  step={1} 
                  onValueChange={(val) => setPeople(val[0])} 
                />
                <p className="text-sm text-muted-foreground">
                  {context === 'backpacker' 
                    ? 'More people = more phones, headlamps, and power bank shares.'
                    : 'More people means more laundry, dishes, and hot water.'}
                </p>
              </div>

              <div className="space-y-4">
                <Label className="text-base">{context === 'backpacker' ? 'Select Heavy Gear (Add-ons)' : 'Do you use any of these heavy appliances?'}</Label>
                <div className="grid grid-cols-2 gap-3">
                  {(context === 'backpacker' ? BACKPACKER_GEAR : APPLIANCE_ADDONS).map((addon) => (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex items-center gap-2 p-3 rounded-md border cursor-pointer transition-colors ${
                        selectedAddons.includes(addon.id) 
                          ? 'border-primary bg-primary/10 text-primary-foreground' 
                          : 'border-muted hover:bg-muted'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                        selectedAddons.includes(addon.id) ? 'bg-primary border-primary' : 'border-gray-400'
                      }`}>
                        {selectedAddons.includes(addon.id) && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <span className={selectedAddons.includes(addon.id) ? 'text-foreground font-medium' : ''}>
                        {addon.label}
                      </span>
                      {addon.id === 'cpap' && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div onClick={(e) => e.stopPropagation()} className="cursor-help ml-1">
                                <Info className="h-4 w-4 text-muted-foreground hover:text-primary" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Continuous Positive Airway Pressure machine for sleep apnea.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 pt-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] border-t bg-background sticky bottom-0">
          <DialogFooter className="flex flex-row items-center justify-between gap-3 w-full">
            {step === 0 ? (
              <Button variant="ghost" onClick={closeWizard} className="text-muted-foreground text-xs sm:text-sm px-2">
                I'll measure myself thanks
              </Button>
            ) : (
              <Button variant="ghost" onClick={handleBack}>
                Back
              </Button>
            )}

            {step < 2 ? (
              <Button onClick={handleNext} className="shrink-0">
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={calculate} className="bg-green-600 hover:bg-green-700 shrink-0">
                Apply Estimate
              </Button>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
