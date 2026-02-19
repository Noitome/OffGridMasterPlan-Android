import React, { useMemo } from 'react';
import { products } from '@/data/products';
import { AffiliateProductCard } from '@/components/AffiliateProductCard';

interface ProductRecommendationsProps {
  systemSize: number; // kW
  windViable: boolean;
  isBackpacker?: boolean;
}

export function ProductRecommendations({ systemSize, windViable, isBackpacker = false }: ProductRecommendationsProps) {
  const recommendedProducts = useMemo(() => {
    const pick = (id: string) => products.find((p) => p.id === id) ?? null;
    const chosen = new Map<string, (typeof products)[number]>();

    if (isBackpacker) {
      // Backpacker specific recommendations
      
      // 1. Portable Power Station (instead of battery + inverter)
      const stationPick = pick(systemSize >= 0.5 ? 'jackery-explorer-1000' : 'ecoflow-river-2-pro') ?? pick('ecoflow-river-2-pro');
      if (stationPick) chosen.set(stationPick.id, stationPick);

      // 2. Portable Solar Panel
      const panelPick = pick(systemSize >= 0.2 ? 'allpowers-sp033-200w' : 'anker-solix-ps100-100w') ?? pick('anker-solix-ps100-100w');
      if (panelPick) chosen.set(panelPick.id, panelPick);

      // 3. Water Filter (Essential)
      const filterPick = pick('sawyer-squeeze-water-filter') ?? pick('lifestraw-peak-solo');
      if (filterPick) chosen.set(filterPick.id, filterPick);

    } else {
      // Standard Off-Grid Logic
      const solarPick = pick(systemSize >= 4 ? 'ecoflow-400w-portable-panel' : 'anker-solix-ps100-100w') ?? pick('ecoflow-400w-portable-panel');
      if (solarPick) chosen.set(solarPick.id, solarPick);

      const controllerPick = pick('victron-smartsolar-mppt-100-30') ?? pick('victron-smartsolar-mppt-250-100tr');
      if (controllerPick) chosen.set(controllerPick.id, controllerPick);

      const batteryPick = pick('renogy-48v-50ah-lifepo4') ?? pick('pure-sine-inverter-48v-1500w');
      if (batteryPick) chosen.set(batteryPick.id, batteryPick);

      if (windViable) {
        const shuntPick = pick('victron-smartshunt-500a');
        if (shuntPick) chosen.set(shuntPick.id, shuntPick);
      }
    }

    const ordered: (typeof products)[number][] = [];
    // Define priority order for both standard and backpacker items
    const priorityIds = [
      'jackery-explorer-1000', 'ecoflow-river-2-pro', // Power Stations
      'allpowers-sp033-200w', 'anker-solix-ps100-100w', 'ecoflow-400w-portable-panel', // Panels
      'sawyer-squeeze-water-filter', 'lifestraw-peak-solo', // Filters
      'victron-smartsolar-mppt-100-30', 'victron-smartsolar-mppt-250-100tr',
      'renogy-48v-50ah-lifepo4', 'victron-smartshunt-500a', 'pure-sine-inverter-48v-1500w'
    ];

    for (const id of priorityIds) {
      const p = chosen.get(id);
      if (p) ordered.push(p);
    }
    for (const p of chosen.values()) {
      if (!ordered.some((x) => x.id === p.id)) ordered.push(p);
    }

    return ordered.slice(0, 3);
  }, [systemSize, windViable, isBackpacker]);

  return (
    <div className="space-y-6 mt-12">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Recommended Gear</h3>
        <span className="text-sm text-gray-500">Based on your project specs</span>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {recommendedProducts.map((product) => (
          <AffiliateProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
