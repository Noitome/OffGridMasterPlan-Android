import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Printer, Cpu, Globe, Zap, AlertTriangle, Lightbulb } from 'lucide-react';
import { TermTooltip } from '@/components/TermTooltip';

const About = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200 px-4 py-1 text-sm">
            Founder Story
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            The DIY ROI <span className="text-orange-600">Revolution</span>
          </h1>
          <div className="flex justify-center gap-2 mb-6">
            <Badge variant="outline" className="border-green-600 text-green-600 bg-green-50 dark:bg-green-900/20">
              Default Mode: Unrestricted / No-Code
            </Badge>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Historically, "doing it yourself" was a cost-saving measure that often came with a quality trade-off. 
            Today, that script has flipped.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="grid gap-8 md:grid-cols-12">
          {/* Left Column - Story */}
          <div className="md:col-span-8 space-y-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed">
                Access to <TermTooltip term="open-source designs" definition="Blueprints and schematics made freely available for anyone to use, modify, and distribute." /> and AI-assisted fabrication means DIY solutions often outperform 
                commercial equivalents at a fraction of the cost. We're not just talking about fixing a leak; 
                we're talking about energy independence.
              </p>
            </div>

            <div className="grid gap-6">
              <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full h-fit">
                    <Printer className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">3D Printed Parts</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Custom brackets and gears for wind turbines can be printed on-site, reducing supply chain dependence.
                      Repairability becomes infinite when you can print the spare part.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex gap-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full h-fit">
                    <Cpu className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">AI Design Tools</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      <TermTooltip term="Generative design" definition="Software that uses algorithms to generate optimized forms based on constraints like load, material, and weight." /> software helps builders optimize material usage for structures, reducing waste by up to 30%.
                      Intelligence is no longer centralized in engineering firms.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full h-fit">
                    <Globe className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Knowledge Sharing</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Global databases of "tech hacks" allow a farmer in Vermont to apply a water-saving technique developed in the Negev Desert.
                      The hive mind is the ultimate R&D department.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 mt-8">
               <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                 <Lightbulb className="h-5 w-5 text-yellow-500" />
                 The "Comfortable to Spend" Threshold
               </h3>
               <p className="text-gray-700 dark:text-gray-300 mb-4">
                 This platform exists because commercial options are often overpriced for the value they deliver, 
                 while DIY offers customization and repurposing (e.g., <TermTooltip term="battery repurposing" definition="Using second-life EV batteries for stationary home storage, often at 20% of the cost of new units." /> from EVs) that big brands can't match.
               </p>
               <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-100 dark:border-red-800/50">
                 <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                 <p className="text-sm text-red-800 dark:text-red-200 italic">
                   "But the DIY is only interesting up to a certain level. If you feel comfortable spending a million dollars, 
                   then DIY is probably not for you."
                 </p>
               </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="md:col-span-4 space-y-6">
            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-6 text-white shadow-xl">
                <Zap className="h-12 w-12 mb-4 text-white/90" />
                <h3 className="text-2xl font-bold mb-2">Why This Exists</h3>
                <p className="text-white/90 mb-6">
                  I started this project to bridge the gap between expensive turnkey systems and the wild west of internet forums.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 bg-white/20 p-2 rounded backdrop-blur-sm">
                    <span className="font-bold">1.</span>
                    <span>Curated Tech</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 p-2 rounded backdrop-blur-sm">
                    <span className="font-bold">2.</span>
                    <span>Validated Logic</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 p-2 rounded backdrop-blur-sm">
                    <span className="font-bold">3.</span>
                    <span>Real ROI</span>
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

export default About;
