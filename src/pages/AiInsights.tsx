import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Brain, Cpu, Leaf, Zap, Hammer, Globe, Droplets, Recycle } from 'lucide-react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const insightsData = {
  microgrids: {
    title: "Smart Microgrids",
    description: "AI-driven energy distribution systems that optimize usage and storage.",
    examples: [
      { 
        name: "Brooklyn Microgrid", 
        desc: "A peer-to-peer energy trading system using blockchain. Neighbors sell excess solar power to each other automatically.", 
        tags: ["Urban", "Solar", "Blockchain"] 
      },
      { 
        name: "Stone Edge Farm", 
        desc: "An islandable microgrid in Sonoma that uses AI to switch between solar, battery, and hydrogen storage instantly.", 
        tags: ["Rural", "Hydrogen", "AI"] 
      }
    ]
  },
  biogas: {
    title: "Automated Biogas",
    description: "Self-regulating anaerobic digesters monitored by sensors.",
    examples: [
      { 
        name: "HomeBiogas Smart System", 
        desc: "IoT-connected domestic digester that tracks gas levels and temperature, alerting users via app.", 
        tags: ["IoT", "Domestic", "Waste"] 
      },
      { 
        name: "Village Industrial Power", 
        desc: "Mobile generators that use steam engines run on biomass, automatically regulating pressure and output.", 
        tags: ["Commercial", "Heat", "Power"] 
      }
    ]
  },
  water: {
    title: "AI Water Management",
    description: "Smart systems for harvesting, purification, and conservation.",
    examples: [
      { 
        name: "Hydraloop", 
        desc: "Smart greywater recycling system that cleans shower and bath water for toilet flushing and irrigation, saving 45% of water.", 
        tags: ["Recycling", "Urban", "Smart Home"] 
      },
      { 
        name: "Source Hydropanels", 
        desc: "Solar-powered panels that extract pure drinking water from air using hygroscopic materials and smart monitoring.", 
        tags: ["Solar", "Air-to-Water", "Off-Grid"] 
      }
    ]
  },
  waste: {
    title: "Circular Waste Systems",
    description: "Automated sorting and processing to turn waste into resources.",
    examples: [
      { 
        name: "Pela Lomi", 
        desc: "Smart kitchen composter that turns food scraps into dirt in 4 hours using heat and abrasion sensors.", 
        tags: ["Composting", "Kitchen", "Speed"] 
      },
      { 
        name: "TrashPresso", 
        desc: "Mobile solar-powered plastic recycling plant that turns trash into architectural tiles on-site.", 
        tags: ["Recycling", "Mobile", "Construction"] 
      }
    ]
  }
};

const AiInsights = () => {
  const [activeInsight, setActiveInsight] = React.useState<string | null>(null);

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      {/* Header Section */}
      <header className="mb-12 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-6">
          <Brain className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
          AI Insights: <span className="text-indigo-600">The Future of Off-Grid Living</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          How artificial intelligence is revolutionizing self-sufficiency, from smart energy management to automated permaculture.
        </p>
      </header>

      {/* Main Content */}
      <div className="space-y-12">
        
        {/* Section 1: Symbiotic Technologies */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Symbiotic Technologies</h2>
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                The next generation of off-grid systems isn't just about isolated components—it's about integration. 
                AI algorithms are now capable of managing the delicate balance between waste production and energy generation, 
                creating truly circular systems that mimic nature.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <Card 
                  className="bg-gray-50 dark:bg-gray-900 border-none cursor-pointer hover:shadow-md transition-all hover:scale-[1.02]"
                  onClick={() => setActiveInsight('microgrids')}
                >
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-500" /> Smart Microgrids
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      AI load balancing predicts energy spikes and automatically diverts excess solar power. Click to see real-world examples.
                    </p>
                  </CardContent>
                </Card>
                <Card 
                  className="bg-gray-50 dark:bg-gray-900 border-none cursor-pointer hover:shadow-md transition-all hover:scale-[1.02]"
                  onClick={() => setActiveInsight('biogas')}
                >
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <Cpu className="h-5 w-5 text-blue-500" /> Automated Biogas
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Sensors monitor digester pH and temperature, adjusting feedstock input. Click to see real-world examples.
                    </p>
                  </CardContent>
                </Card>
                <Card 
                  className="bg-gray-50 dark:bg-gray-900 border-none cursor-pointer hover:shadow-md transition-all hover:scale-[1.02]"
                  onClick={() => setActiveInsight('water')}
                >
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-cyan-500" /> AI Water Management
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Smart irrigation and atmospheric water generation monitored by AI. Click to see real-world examples.
                    </p>
                  </CardContent>
                </Card>
                <Card 
                  className="bg-gray-50 dark:bg-gray-900 border-none cursor-pointer hover:shadow-md transition-all hover:scale-[1.02]"
                  onClick={() => setActiveInsight('waste')}
                >
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <Recycle className="h-5 w-5 text-green-500" /> Circular Waste
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Automated sorting and composting systems that close the loop. Click to see real-world examples.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Dialog for Details */}
        <Dialog open={!!activeInsight} onOpenChange={(open) => !open && setActiveInsight(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                {activeInsight === 'microgrids' && <Zap className="h-6 w-6 text-yellow-500" />}
                {activeInsight === 'biogas' && <Cpu className="h-6 w-6 text-blue-500" />}
                {activeInsight === 'water' && <Droplets className="h-6 w-6 text-cyan-500" />}
                {activeInsight === 'waste' && <Recycle className="h-6 w-6 text-green-500" />}
                {activeInsight && insightsData[activeInsight as keyof typeof insightsData]?.title}
              </DialogTitle>
              <DialogDescription className="text-lg">
                {activeInsight && insightsData[activeInsight as keyof typeof insightsData]?.description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4 space-y-4">
              {activeInsight && insightsData[activeInsight as keyof typeof insightsData]?.examples.map((example, idx) => (
                <div key={idx} className="bg-muted/50 p-4 rounded-lg border border-border">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-lg">{example.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{example.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {example.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Section 2: The DIY ROI Revolution */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                <Hammer className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">The DIY ROI Revolution</h2>
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                Historically, "doing it yourself" was a cost-saving measure that often came with a quality trade-off. 
                Today, access to open-source designs and AI-assisted fabrication means DIY solutions often outperform commercial equivalents 
                at a fraction of the cost.
              </p>
              
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-green-100 dark:bg-green-900 rounded-full p-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>3D Printed Parts:</strong> Custom brackets and gears for wind turbines can be printed on-site, reducing supply chain dependence.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-green-100 dark:bg-green-900 rounded-full p-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>AI Design Tools:</strong> Generative design software helps builders optimize material usage for structures, reducing waste by up to 30%.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-green-100 dark:bg-green-900 rounded-full p-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Knowledge Sharing:</strong> Global databases of "tech hacks" allow a farmer in Vermont to apply a water-saving technique developed in the Negev Desert.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Regional Adaptability */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Regional Adaptability</h2>
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                One size rarely fits all in off-grid living. A solution that works perfectly in the humid tropics might fail catastrophically in an arid desert. 
                Modern tech allows for hyper-local adaptation.
              </p>
              
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800">
                <h4 className="font-bold text-indigo-900 dark:text-indigo-300 mb-3">Climate-Responsive Architecture</h4>
                <p className="text-indigo-800 dark:text-indigo-200">
                  New building materials change their thermal properties based on ambient temperature. Phase-change materials (PCMs) absorb heat during the day 
                  and release it at night, maintaining a stable indoor climate without active HVAC systems. This is critical for off-grid homes where 
                  every watt of energy counts.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
      
      <div className="mt-12 text-center text-gray-500 text-sm">
        <p>© 2024 OffGrid Masterplan. Powered by Visioncraft AI Analytics.</p>
      </div>
    </div>
  );
};

export default AiInsights;
