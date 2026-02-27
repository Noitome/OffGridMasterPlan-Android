import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Droplets, CloudRain, ArrowRight, CheckCircle, AlertTriangle, Filter, Hammer, Car, Anchor, Plane, Train, Box, Tent, Warehouse } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TermTooltip } from '@/components/TermTooltip';

export function WaterGuide() {
  const { t } = useTranslation();

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-blue-50 dark:bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Droplets className="h-16 w-16 text-blue-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('waterGuide.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('waterGuide.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose dark:prose-invert max-w-none">
            <h2>{t('waterGuide.why_title')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {t('waterGuide.why_desc')}
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    {t('waterGuide.pros.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(t('waterGuide.pros.list', { returnObjects: true }) as string[]).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                    {t('waterGuide.cons.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(t('waterGuide.cons.list', { returnObjects: true }) as string[]).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2>{t('waterGuide.systems_title')}</h2>
            <div className="grid gap-6 mb-12">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <CloudRain className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    <TermTooltip 
                      term={t('waterGuide.rainwater_title')} 
                      definition="Collection and storage of rain from roofs or other surfaces for future use." 
                    />
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('waterGuide.rainwater_desc')}
                  </p>
                  <Link to="/shop?search=Rain+Barrel">
                    <Button variant="outline" size="sm" className="mt-2">
                      Shop Rain Collection
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Filter className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    <TermTooltip 
                      term={t('waterGuide.filter_title')} 
                      definition="Process of removing impurities and contaminants to make water safe for drinking." 
                    />
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('waterGuide.filter_desc')}
                  </p>
                  <Link to="/shop?search=Filter">
                    <Button variant="outline" size="sm" className="mt-2">
                      Shop Water Filters
                    </Button>
                  </Link>
                </div>
              </div>

               <div className="flex items-start">
                <div className="bg-cyan-100 p-3 rounded-lg mr-4">
                  <Droplets className="h-6 w-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t('waterGuide.greywater_title')}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t('waterGuide.greywater_desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <Hammer className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    <TermTooltip 
                      term={t('waterGuide.bore_title')} 
                      definition="A deep shaft drilled into the ground to extract water from underground aquifers." 
                    />
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {t('waterGuide.bore_desc')}
                  </p>
                  <Link to="/shop?search=Pump">
                    <Button variant="outline" size="sm" className="mb-2">
                      Shop Pumps & Augers
                    </Button>
                  </Link>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 ml-1 text-sm">
                     {(t('waterGuide.bore_list', { returnObjects: true }) as string[]).map((item, i) => (
                       <li key={i}>{item}</li>
                     ))}
                  </ul>
                  <div className="mt-3 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded border border-yellow-200 dark:border-yellow-800 text-sm">
                    <span className="font-bold text-yellow-800 dark:text-yellow-200 flex items-center gap-2 mb-1">
                      <AlertTriangle className="h-3 w-3" /> {t('waterGuide.bore_warning_title')}
                    </span>
                    <span className="text-yellow-800 dark:text-yellow-200">
                      {t('waterGuide.bore_warning_desc')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6">Mobile & Structure Catchment Methods</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Specific techniques for harvesting water from vehicles and alternative structures.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Car className="h-5 w-5 mr-2 text-blue-500" />
                    Cars, Vans & Buses (90% Eff.)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Surface:</strong> Painted Metal Roof
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li><strong>Magnetic Gutters:</strong> Attach flexible magnetic strips to roof edges to channel water.</li>
                    <li><strong>Park on Slope:</strong> Position vehicle so water runs to a single corner for easier collection.</li>
                    <li><strong>Awning Funnels:</strong> Use tarp awnings with a grommet drain point into a tank.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Anchor className="h-5 w-5 mr-2 text-blue-500" />
                    Boats (85% Eff.)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Surface:</strong> Fiberglass Deck / Gelcoat
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li><strong>Deck Scuppers:</strong> Route deck drains directly into internal freshwater tanks (with valve).</li>
                    <li><strong>Canvas Catchers:</strong> Use bimini tops or spray dodgers as large funnels.</li>
                    <li><strong>Salt Flush:</strong> Always let the first few minutes of rain wash away salt spray (first flush).</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Plane className="h-5 w-5 mr-2 text-blue-500" />
                    Aircraft (95% Eff.)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Surface:</strong> Aluminum Fuselage
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li><strong>Wing Drips:</strong> Place buckets or funnels at the trailing edge low points of wings.</li>
                    <li><strong>Fuselage Runoff:</strong> Use temporary guttering along door frames or drip rails.</li>
                    <li><strong>Clean Surface:</strong> Aviation aluminum is very clean, but watch for de-icing fluids/fuel.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Train className="h-5 w-5 mr-2 text-blue-500" />
                    Trains (90% Eff.)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Surface:</strong> Steel Roof
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li><strong>Existing Gutters:</strong> Many cars have built-in gutters; tap into downspouts.</li>
                    <li><strong>Curved Roofs:</strong> Water flows fast; use wide catch basins or routed piping.</li>
                    <li><strong>Industrial Contaminants:</strong> High risk of brake dust/soot; heavy filtration required.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Box className="h-5 w-5 mr-2 text-blue-500" />
                    Shipping Containers (90% Eff.)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Surface:</strong> Corrugated Steel
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li><strong>Welded Angle Iron:</strong> Weld a steel angle along the long edge to act as a sturdy gutter.</li>
                    <li><strong>Corner Castings:</strong> Water naturally pools at corners; pipe directly from corner casting holes.</li>
                    <li><strong>Roof Paint:</strong> Ensure roof is painted with non-toxic, potable-safe paint (epoxy).</li>
                  </ul>
                </CardContent>
              </Card>

               <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Tent className="h-5 w-5 mr-2 text-blue-500" />
                    Tents & Yurts (60% Eff.)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Surface:</strong> Canvas / Synthetic Fabric
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li><strong>Tension Points:</strong> Use guy lines to create a low point in the fly, place bucket underneath.</li>
                    <li><strong>Grommet Adapters:</strong> Install a specialized bulkhead fitting in the fabric for hose attachment.</li>
                    <li><strong>Fabric Absorption:</strong> Canvas absorbs water initially; synthetic flies are more efficient.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Warehouse className="h-5 w-5 mr-2 text-blue-500" />
                    Tanks & Silos (95% Eff.)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Surface:</strong> Steel / Plastic
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li><strong>Direct Capture:</strong> The tank surface itself is a catchment area.</li>
                    <li><strong>Collar Gutters:</strong> Install a gutter around the base or mid-section if domed.</li>
                    <li><strong>Cleanliness:</strong> Very high efficiency due to smooth, vertical/curved surfaces.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-3xl font-bold mb-6">Filtration Method Comparison</h2>
            <div className="overflow-x-auto mb-12">
              <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="p-4 text-left font-semibold">Method</th>
                    <th className="p-4 text-left font-semibold">Pros</th>
                    <th className="p-4 text-left font-semibold">Cons</th>
                    <th className="p-4 text-left font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="p-4 font-medium">Reverse Osmosis (RO)</td>
                    <td className="p-4 text-green-600">Removes 99.9% of everything (bacteria, viruses, heavy metals, salt).</td>
                    <td className="p-4 text-red-500">Requires pressure (pump), wastes water (brine), removes minerals.</td>
                    <td className="p-4">Whole-house purification, drinking water.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">UV Sterilization</td>
                    <td className="p-4 text-green-600">Instantly kills biologicals. Low power. No waste water.</td>
                    <td className="p-4 text-red-500">Does not remove sediment or chemicals. Bulb needs annual replacement.</td>
                    <td className="p-4">Final stage sanitation (after filters).</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Gravity Filter (Ceramic/Carbon)</td>
                    <td className="p-4 text-green-600">No electricity needed. Portable. Removes bacteria/protozoa.</td>
                    <td className="p-4 text-red-500">Slow flow rate. Manual refilling. Doesn't remove viruses (usually).</td>
                    <td className="p-4">Countertop use, emergency backup.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-bold mb-6">Recommended Water Gear</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Link to="/shop?search=UV+Water+Purifier" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-blue-500 transition-colors">UV Sterilizers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Low-power 12V units perfect for solar setups. Ensure water is safe from viruses.
                    </p>
                    <div className="flex items-center text-blue-500 font-medium text-sm">
                      Shop UV Systems <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/shop?search=Reverse+Osmosis" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-blue-500 transition-colors">RO Systems</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Complete purification for pristine drinking water. Requires a pressure pump.
                    </p>
                    <div className="flex items-center text-blue-500 font-medium text-sm">
                      Shop RO Filters <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/shop?search=Submersible+Pump" className="group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-blue-500 transition-colors">Solar Pumps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Efficient 12V/24V submersible pumps for wells and rainwater transfer.
                    </p>
                    <div className="flex items-center text-blue-500 font-medium text-sm">
                      Shop Pumps <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            <h2>{t('waterGuide.sizing_title')}</h2>
            <p className="mb-6">
              {t('waterGuide.sizing_desc')}
            </p>
            
            <Card className="bg-blue-50 dark:bg-gray-800 border-blue-200 dark:border-blue-900 mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">{t('waterGuide.calc_card_title')}</h3>
                <p className="mb-4">{t('waterGuide.calc_card_desc')}</p>
                <Link to="/#calculator">
                  <Button>
                    {t('waterGuide.calc_btn')} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Separator className="my-12" />

            <h2>{t('waterGuide.setup_title')}</h2>
            <ol className="list-decimal pl-6 space-y-4 mb-12">
              {(t('waterGuide.setup_list', { returnObjects: true }) as string[]).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
