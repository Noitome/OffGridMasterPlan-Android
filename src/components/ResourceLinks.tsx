
import React from 'react';
import { ArrowRight, BookOpen, Calculator, Users, DollarSign, Shield } from 'lucide-react';

interface ResourceLink {
  title: string;
  description: string;
  url: string;
  icon: React.ElementType;
  external?: boolean;
}

const resourceLinks: ResourceLink[] = [
  {
    title: "Solar Panel Efficiency Calculator",
    description: "Calculate the efficiency of different solar panel types and configurations",
    url: "https://www.nrel.gov/pvwatts/",
    icon: Calculator,
    external: true
  },
  {
    title: "Wind Resource Assessment",
    description: "Determine wind potential for your location",
    url: "https://www.nrel.gov/wind/",
    icon: BookOpen,
    external: true
  },
  {
    title: "Federal Tax Credits Database",
    description: "Find available tax incentives for renewable energy systems",
    url: "https://www.dsireusa.org/",
    icon: DollarSign,
    external: true
  },
  {
    title: "Off-Grid Living Community",
    description: "Connect with others living off-grid and share experiences",
    url: "https://www.homesteadingtoday.com/forums/",
    icon: Users,
    external: true
  },
  {
    title: "Permaculture Design Principles",
    description: "Learn sustainable food production techniques",
    url: "https://www.permaculturenews.org/",
    icon: BookOpen,
    external: true
  },
  {
    title: "Water Purification Standards",
    description: "EPA guidelines for safe drinking water systems",
    url: "https://www.epa.gov/dwstandardsregulations",
    icon: Shield,
    external: true
  },
  {
    title: "Energy Storage Solutions",
    description: "Compare battery technologies for off-grid systems",
    url: "/resources/energy-storage",
    icon: BookOpen
  },
  {
    title: "Building Code Resources",
    description: "Navigate building codes for alternative construction",
    url: "/resources/building-codes",
    icon: BookOpen
  }
];

export const ResourceLinks: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Essential Off-Grid Resources
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Access trusted tools, calculators, and databases to help plan your off-grid lifestyle
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resourceLinks.map((link, index) => {
            const IconComponent = link.icon;
            return (
              <a
                key={index}
                href={link.url}
                target={link.external ? "_blank" : "_self"}
                rel={link.external ? "noopener noreferrer" : ""}
                className="group block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <IconComponent className="h-8 w-8 text-green-600 dark:text-green-400" />
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {link.description}
                </p>
                {link.external && (
                  <span className="inline-flex items-center mt-3 text-xs text-gray-500 dark:text-gray-500">
                    External Resource →
                  </span>
                )}
              </a>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href="/resources"
            className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            View All Resources
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ResourceLinks;
