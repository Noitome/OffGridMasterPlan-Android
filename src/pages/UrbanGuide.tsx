import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Zap, Droplets, Battery, AlertOctagon, Check, X, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TermTooltip } from '@/components/TermTooltip';

const UrbanGuide = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200 px-4 py-1 text-sm">
            Urban Operations
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Smash Off-Grid in Your <span className="text-purple-600">Urban Home</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            The realistic guide to severing the cord when you're surrounded by concrete, codes, and curious neighbors.
          </p>
        </div>

        {/* Reality Check */}
        <Card className="mb-12 border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/10 border-y-0 border-r-0">
           <CardContent className="p-6">
             <h3 className="text-xl font-bold text-red-800 dark:text-red-200 flex items-center gap-2 mb-2">
               <AlertOctagon className="h-5 w-5" />
               The Urban Reality Check
             </h3>
             <p className="text-red-700 dark:text-red-300">
               You cannot dig a septic tank in a condo. You cannot put a 40ft wind turbine on a townhouse. 
               Urban off-grid is about <strong>efficiency, stealth, and storage</strong>, not generation volume.
             </p>
           </CardContent>
        </Card>

        {/* What You CAN Do */}
        <h2 className="text-3xl font-bold mb-8">The "Smash It" Strategy</h2>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Guerilla Solar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Forget massive roof arrays. Think modular, portable, and legal loopholes.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><strong>Balcony Hangs:</strong> Flexible panels zip-tied to railings (check HOA rules).</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><strong>Windowsill Deployments:</strong> Foldable panels deployed only during sun hours.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><strong>Plug-and-Play:</strong> <TermTooltip term="Micro-inverters" definition="Small inverters attached to individual panels that plug directly into a standard wall outlet (grid-tied)." /> that feed back into your apartment's circuit.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Battery className="h-5 w-5 text-blue-500" />
                The Battery Core
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                In the city, storage is more valuable than generation. Arbitrage the grid.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><strong>Load Shifting:</strong> Charge batteries at night (cheap rates), run home during day.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><strong>Silent Backup:</strong> Gas generators are loud and illegal in apartments. Lithium is silent.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-cyan-500" />
                Stealth Water
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Rain barrels are ugly. Planter boxes are not.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><strong>Planter Reservoirs:</strong> Hidden tanks inside decorative planter boxes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><strong>Condensate Harvesting:</strong> Collect water from AC units (non-potable, for plants).</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
             <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-gray-500" />
                Urban Heat & Cooking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><strong>Induction:</strong> Highly efficient electric cooking powered by your battery bank.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span><strong>Rocket Stoves:</strong> Small, high-efficiency wood burners for balconies (check fire codes!).</span>
                </li>
              </ul>
              <Link to="/shop?search=Induction">
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Find Efficient Induction Cooktops
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Limitations */}
        <h2 className="text-3xl font-bold mb-8">The Hard Limitations</h2>
        <div className="space-y-4">
          <div className="flex gap-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
             <div className="bg-red-100 p-2 rounded-full h-fit">
               <X className="h-5 w-5 text-red-600" />
             </div>
             <div>
               <h4 className="font-bold">Sanitation / Septic</h4>
               <p className="text-sm text-gray-600 dark:text-gray-400">
                 You cannot disconnect from the sewer in most cities. It's a certificate of occupancy requirement. 
                 <TermTooltip term="Compost toilets" definition="Dry toilets that turn waste into soil." /> are often legal indoors but disposal of the material is the problem in a city with no yard.
               </p>
             </div>
          </div>

          <div className="flex gap-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
             <div className="bg-red-100 p-2 rounded-full h-fit">
               <ShieldAlert className="h-5 w-5 text-red-600" />
             </div>
             <div>
               <h4 className="font-bold">Insurance & Code Enforcement</h4>
               <p className="text-sm text-gray-600 dark:text-gray-400">
                 Running a "rogue" electrical system can void your home insurance. 
                 If your DIY battery catches fire, you are 100% liable. 
                 <strong>Recommendation:</strong> Use UL-listed "solar generators" (Ecoflow, Bluetti) rather than DIY 18650 packs to stay insurable.
               </p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UrbanGuide;
