
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface BacklinkData {
  text: string;
  url: string;
  category: string;
}

const backlinkData: BacklinkData[] = [
  // Government & Authority Sites
  { text: "Department of Energy Solar Resources", url: "https://www.energy.gov/eere/solar", category: "government" },
  { text: "NREL Renewable Energy Data", url: "https://www.nrel.gov/", category: "government" },
  { text: "EPA Green Living Resources", url: "https://www.epa.gov/greenhomes", category: "government" },
  
  // Industry Publications
  { text: "Solar Power World Magazine", url: "https://www.solarpowerworldonline.com/", category: "industry" },
  { text: "Renewable Energy World", url: "https://www.renewableenergyworld.com/", category: "industry" },
  { text: "Green Tech Media", url: "https://www.greentechmedia.com/", category: "industry" },
  
  // Off-Grid Living Communities
  { text: "Backwoods Home Magazine", url: "https://backwoodshome.com/", category: "community" },
  { text: "Mother Earth News", url: "https://www.motherearthnews.com/", category: "community" },
  { text: "Homesteading Today Forum", url: "https://www.homesteadingtoday.com/", category: "community" },
  { text: "Permaculture Research Institute", url: "https://www.permaculturenews.org/", category: "community" },
  
  // Educational Resources
  { text: "Solar Energy Industries Association", url: "https://www.seia.org/", category: "education" },
  { text: "American Solar Energy Society", url: "https://ases.org/", category: "education" },
  { text: "Off Grid Survival Guide", url: "https://offgridsurvival.com/", category: "education" },
  
  // Equipment & Suppliers
  { text: "Solar Panel Comparison Guide", url: "https://www.solarpaneltalk.com/", category: "equipment" },
  { text: "Wind Turbine Reviews", url: "https://www.windpowerengineering.com/", category: "equipment" },
  { text: "Battery Storage Solutions", url: "https://www.energystorage.org/", category: "equipment" },
  
  // Financial & Incentives
  { text: "DSIRE Incentive Database", url: "https://www.dsireusa.org/", category: "financial" },
  { text: "Federal Tax Credits for Solar", url: "https://www.energystar.gov/about/federal_tax_credits", category: "financial" },
  
  // Sustainability Organizations
  { text: "Sierra Club Renewable Energy", url: "https://www.sierraclub.org/energy", category: "sustainability" },
  { text: "World Wildlife Fund - Climate", url: "https://www.worldwildlife.org/initiatives/climate", category: "sustainability" },
  { text: "Greenpeace Energy Solutions", url: "https://www.greenpeace.org/usa/global-warming/", category: "sustainability" }
];

export const BacklinkFooter: React.FC = () => {
  const categorizedLinks = backlinkData.reduce((acc, link) => {
    if (!acc[link.category]) {
      acc[link.category] = [];
    }
    acc[link.category].push(link);
    return acc;
  }, {} as Record<string, BacklinkData[]>);

  const categoryTitles: Record<string, string> = {
    government: "Government Resources",
    industry: "Industry Publications",
    community: "Off-Grid Communities",
    education: "Educational Resources",
    equipment: "Equipment & Reviews",
    financial: "Financial & Incentives",
    sustainability: "Sustainability Organizations"
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Trusted Resources & Partners
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Object.entries(categorizedLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white capitalize">
                {categoryTitles[category]}
              </h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    >
                      <ExternalLink className="h-3 w-3 mr-2 flex-shrink-0" />
                      <span className="line-clamp-2">{link.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 font-medium">
              We collaborate with trusted industry leaders, government agencies, and educational institutions 
              to provide you with the most accurate and up-to-date off-grid living information.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <a href="/partnerships" className="text-primary hover:text-green-600 dark:text-primary dark:hover:text-green-400 font-medium transition-colors">
                Partner With Us
              </a>
              <a href="/resources" className="text-primary hover:text-green-600 dark:text-primary dark:hover:text-green-400 font-medium transition-colors">
                All Resources
              </a>
              <a href="/contact" className="text-primary hover:text-green-600 dark:text-primary dark:hover:text-green-400 font-medium transition-colors">
                Suggest a Resource
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BacklinkFooter;
