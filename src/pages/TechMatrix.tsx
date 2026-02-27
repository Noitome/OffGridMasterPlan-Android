import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, AlertTriangle, Info, ShoppingCart } from 'lucide-react';
import { TermTooltip } from '@/components/TermTooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const TechMatrix = () => {
  const { t } = useTranslation();

  const data = [
    {
      category: 'Water',
      technology: t('techMatrix.items.rainwater.name'),
      description: t('techMatrix.items.rainwater.desc'),
      suitability: { desert: 3, temp: 5, trop: 5, cold: 2 },
      scalability: 'High',
      roi: 4,
      diy: 2,
      cost: '$$',
    },
    {
      category: 'Water',
      technology: t('techMatrix.items.atmos.name'),
      description: t('techMatrix.items.atmos.desc'),
      suitability: { desert: 4, temp: 3, trop: 5, cold: 1 },
      scalability: 'Medium',
      roi: 2,
      diy: 4,
      cost: '$$$',
    },
    {
      category: 'Water',
      technology: t('techMatrix.items.gravity.name'),
      description: t('techMatrix.items.gravity.desc'),
      suitability: { desert: 5, temp: 5, trop: 5, cold: 5 },
      scalability: 'Low',
      roi: 5,
      diy: 1,
      cost: '$',
    },
    {
      category: 'Water',
      technology: t('techMatrix.items.bore.name'),
      description: t('techMatrix.items.bore.desc'),
      suitability: { desert: 2, temp: 4, trop: 5, cold: 3 },
      scalability: 'Medium',
      roi: 5,
      diy: 4,
      cost: '$',
    },
    {
      category: 'Energy',
      technology: t('techMatrix.items.solar.name'),
      description: t('techMatrix.items.solar.desc'),
      suitability: { desert: 5, temp: 4, trop: 4, cold: 2 },
      scalability: 'High',
      roi: 3,
      diy: 3,
      cost: '$$$$',
    },
    {
      category: 'Energy',
      technology: t('techMatrix.items.wind.name'),
      description: t('techMatrix.items.wind.desc'),
      suitability: { desert: 2, temp: 4, trop: 3, cold: 4 },
      scalability: 'High',
      roi: 2,
      diy: 4,
      cost: '$$$',
    },
    {
      category: 'Energy',
      technology: t('techMatrix.items.archimedes.name'),
      description: t('techMatrix.items.archimedes.desc'),
      suitability: { desert: 3, temp: 4, trop: 4, cold: 4 },
      scalability: 'Medium',
      roi: 3,
      diy: 3,
      cost: '$$$$',
    },
    {
      category: 'Storage',
      technology: t('techMatrix.items.redux.name'),
      description: t('techMatrix.items.redux.desc'),
      suitability: { desert: 5, temp: 5, trop: 5, cold: 3 },
      scalability: 'Very High',
      roi: 4,
      diy: 5,
      cost: '$$$$',
    },
    {
      category: 'Storage',
      technology: t('techMatrix.items.hydrogen.name'),
      description: t('techMatrix.items.hydrogen.desc'),
      suitability: { desert: 5, temp: 5, trop: 5, cold: 5 },
      scalability: 'High',
      roi: 1,
      diy: 5,
      cost: '$$$$$',
    },
    {
      category: 'Storage',
      technology: t('techMatrix.items.hillside.name'),
      description: t('techMatrix.items.hillside.desc'),
      suitability: { desert: 1, temp: 4, trop: 5, cold: 2 },
      scalability: 'High',
      roi: 5,
      diy: 4,
      cost: '$$',
    },
    {
      category: 'Waste',
      technology: t('techMatrix.items.compost.name'),
      description: t('techMatrix.items.compost.desc'),
      suitability: { desert: 5, temp: 4, trop: 3, cold: 2 },
      scalability: 'Low',
      roi: 5,
      diy: 5,
      cost: '$',
    },
    {
      category: 'Waste',
      technology: t('techMatrix.items.incinerator.name'),
      description: t('techMatrix.items.incinerator.desc'),
      suitability: { desert: 5, temp: 5, trop: 5, cold: 5 },
      scalability: 'Low',
      roi: 2,
      diy: 4,
      cost: '$$$$',
    },
    {
      category: 'Waste',
      technology: t('techMatrix.items.biogas.name'),
      description: t('techMatrix.items.biogas.desc'),
      suitability: { desert: 3, temp: 3, trop: 5, cold: 1 },
      scalability: 'Medium',
      roi: 4,
      diy: 3,
      cost: '$$$',
    },
    {
      category: 'Waste',
      technology: t('techMatrix.items.septic.name'),
      description: t('techMatrix.items.septic.desc'),
      suitability: { desert: 4, temp: 4, trop: 4, cold: 3 },
      scalability: 'High',
      roi: 3,
      diy: 1,
      cost: '$$$$',
    },
    {
      category: 'Waste',
      technology: t('techMatrix.items.worm.name'),
      description: t('techMatrix.items.worm.desc'),
      suitability: { desert: 2, temp: 4, trop: 4, cold: 2 },
      scalability: 'Low',
      roi: 5,
      diy: 5,
      cost: '$',
    },
    {
      category: 'Waste',
      technology: t('techMatrix.items.cassette.name'),
      description: t('techMatrix.items.cassette.desc'),
      suitability: { desert: 5, temp: 5, trop: 5, cold: 5 },
      scalability: 'Low',
      roi: 3,
      diy: 5,
      cost: '$',
    },
  ];

  const getSuitabilityColor = (score: number) => {
    if (score >= 5) return 'bg-green-500';
    if (score >= 3) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getDifficultyLabel = (level: number) => {
    const labels = ['Very Easy', 'Easy', 'Moderate', 'Hard', 'Expert'];
    return labels[level - 1] || 'Unknown';
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Off-Grid Tech Matrix</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Compare technologies based on climate suitability, ROI, and implementation difficulty.
        </p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Technology Comparison Table</CardTitle>
          <CardDescription>
            Detailed breakdown of water and energy solutions for various environments.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 uppercase font-semibold">
              <tr>
                <th className="p-4 border-b">{t('techMatrix.table.col_category')}</th>
                <th className="p-4 border-b">{t('techMatrix.table.col_tech')}</th>
                <th className="p-4 border-b text-center">
                  <TermTooltip term={t('techMatrix.table.col_suitability')} definition={t('techMatrix.legend.suitability_desc')} />
                </th>
                <th className="p-4 border-b">{t('techMatrix.table.col_scalability')}</th>
                <th className="p-4 border-b text-center">
                  <TermTooltip term={t('techMatrix.table.col_roi')} definition={t('techMatrix.legend.roi_desc')} />
                </th>
                <th className="p-4 border-b">
                  <TermTooltip term={t('techMatrix.table.col_diy')} definition={t('techMatrix.legend.diy_desc')} />
                </th>
                <th className="p-4 border-b">{t('techMatrix.table.col_cost')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {data.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="p-4 font-medium text-gray-900 dark:text-white">{row.category}</td>
                  <td className="p-4 font-medium text-blue-600 dark:text-blue-400">
                    <Popover>
                      <PopoverTrigger className="flex items-center gap-1 hover:underline cursor-pointer focus:outline-none">
                        {row.technology}
                        <Info className="h-3 w-3 opacity-50" />
                      </PopoverTrigger>
                      <PopoverContent className="w-80 text-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
                        <div className="font-semibold mb-1">{row.technology}</div>
                        <div className="text-gray-600 dark:text-gray-300">{row.description}</div>
                      </PopoverContent>
                    </Popover>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1 justify-center">
                      <div className={`w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold ${getSuitabilityColor(row.suitability.desert)}`} title="Desert">{row.suitability.desert}</div>
                      <div className={`w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold ${getSuitabilityColor(row.suitability.temp)}`} title="Temperate">{row.suitability.temp}</div>
                      <div className={`w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold ${getSuitabilityColor(row.suitability.trop)}`} title="Tropical">{row.suitability.trop}</div>
                      <div className={`w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold ${getSuitabilityColor(row.suitability.cold)}`} title="Cold">{row.suitability.cold}</div>
                    </div>
                  </td>
                  <td className="p-4">{row.scalability}</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full mx-0.5 ${i < row.roi ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{row.diy}/5</span>
                      <span className="text-xs text-gray-500">({getDifficultyLabel(row.diy)})</span>
                    </div>
                  </td>
                  <td className="p-4 font-mono font-bold text-green-600">{row.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
          <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">{t('techMatrix.legend.suitability_title')}</h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            {t('techMatrix.legend.suitability_desc')}
          </p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
          <h3 className="font-bold text-green-800 dark:text-green-300 mb-2">{t('techMatrix.legend.roi_title')}</h3>
          <p className="text-sm text-green-700 dark:text-green-400">
            {t('techMatrix.legend.roi_desc')}
          </p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-100 dark:border-orange-800">
          <h3 className="font-bold text-orange-800 dark:text-orange-300 mb-2">{t('techMatrix.legend.diy_title')}</h3>
          <p className="text-sm text-orange-700 dark:text-orange-400">
            {t('techMatrix.legend.diy_desc')}
          </p>
        </div>
      </div>

      <div className="mt-12 bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full hidden sm:block">
            <ShoppingCart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('techMatrix.sourcing.title')}</h2>
                <p className="text-slate-600 dark:text-slate-300">
                  {t('techMatrix.sourcing.desc')}
                </p>
              </div>
              <Link to="/shop">
                <Button size="sm" variant="outline" className="gap-2 whitespace-nowrap">
                  <ShoppingCart className="h-4 w-4" />
                  Browse Shop
                </Button>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="font-bold text-slate-700 dark:text-slate-200 min-w-[120px]">{t('techMatrix.sourcing.retail_label')}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {t('techMatrix.sourcing.retail_desc')}
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="font-bold text-slate-700 dark:text-slate-200 min-w-[120px]">{t('techMatrix.sourcing.direct_label')}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {t('techMatrix.sourcing.direct_desc')}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="font-bold text-slate-700 dark:text-slate-200 min-w-[120px]">{t('techMatrix.sourcing.scavenger_label')}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {t('techMatrix.sourcing.scavenger_desc')}
                  </div>
                </div>
                <div className="flex gap-3 bg-red-50 dark:bg-red-900/10 p-3 rounded border border-red-100 dark:border-red-800/50">
                  <div className="font-bold text-red-700 dark:text-red-400 min-w-[120px] flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    {t('techMatrix.sourcing.warning_label')}
                  </div>
                  <div className="text-sm text-red-600 dark:text-red-300 italic">
                    {t('techMatrix.sourcing.warning_desc')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechMatrix;
