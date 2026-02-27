
import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface SEOContentSection {
  title: string;
  content: string;
  keywords: string[];
  internalLinks: { text: string; url: string }[];
  externalLinks: { text: string; url: string }[];
}

const seoContent: SEOContentSection[] = [
  {
    title: "Complete Off-Grid Living Solutions",
    content: `OffGridMasterPlan.com provides comprehensive resources for achieving energy independence through solar, wind, and hydro power systems. Our expert guides cover everything from initial planning to system installation and maintenance. Whether you're looking to power a remote cabin or transition your primary residence to renewable energy, we have the tools and knowledge you need to succeed in your off-grid living journey.`,
    keywords: ["off-grid living", "energy independence", "solar power systems", "renewable energy", "sustainable living"],
    internalLinks: [
      { text: "solar panel installation guide", url: "/resources/solar-installation" },
      { text: "wind turbine calculator", url: "/calculator/wind-energy" },
      { text: "battery storage solutions", url: "/resources/energy-storage" }
    ],
    externalLinks: [
      { text: "Department of Energy solar resources", url: "https://www.energy.gov/eere/solar" },
      { text: "NREL renewable energy data", url: "https://www.nrel.gov/" }
    ]
  },
  {
    title: "Water Security and Management",
    content: `Water independence is crucial for off-grid living. Our water management resources include comprehensive guides on rainwater harvesting, well drilling, water purification systems, and greywater recycling. Learn how to design and implement sustainable water systems that provide clean, reliable water for your household while minimizing environmental impact and maintaining compliance with local regulations.`,
    keywords: ["rainwater harvesting", "water purification", "off-grid water systems", "greywater recycling", "water security"],
    internalLinks: [
      { text: "rainwater collection systems", url: "/resources/water-harvesting" },
      { text: "water purification methods", url: "/resources/water-purification" },
      { text: "greywater system design", url: "/resources/greywater-systems" }
    ],
    externalLinks: [
      { text: "EPA water quality standards", url: "https://www.epa.gov/dwstandardsregulations" },
      { text: "Rainwater harvesting regulations", url: "https://www.dsireusa.org/" }
    ]
  },
  {
    title: "Sustainable Food Production",
    content: `Growing your own food is essential for true self-sufficiency. Our food production guides cover permaculture design, greenhouse construction, aquaponics systems, seasonal planting schedules, and food preservation techniques. Discover proven methods for maximizing food production in small spaces while building soil health and creating resilient, sustainable food systems that provide year-round harvests.`,
    keywords: ["permaculture design", "food production", "greenhouse gardening", "aquaponics systems", "sustainable agriculture"],
    internalLinks: [
      { text: "permaculture design principles", url: "/resources/permaculture" },
      { text: "greenhouse construction plans", url: "/resources/greenhouse-plans" },
      { text: "aquaponics system setup", url: "/resources/aquaponics" }
    ],
    externalLinks: [
      { text: "Permaculture Research Institute", url: "https://www.permaculturenews.org/" },
      { text: "Sustainable agriculture resources", url: "https://www.extension.org/" }
    ]
  }
];

export const SEOContent: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {seoContent.map((section, index) => (
          <article key={index} className="mb-12 last:mb-0">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {section.title}
            </h2>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {section.content}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Related Topics:
              </h3>
              <div className="flex flex-wrap gap-2">
                {section.keywords.map((keyword, keywordIndex) => (
                  <span
                    key={keywordIndex}
                    className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  Learn More:
                </h4>
                <ul className="space-y-2">
                  {section.internalLinks.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.url}
                        className="flex items-center text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors"
                      >
                        <ArrowRight className="h-3 w-3 mr-2" />
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                  External Resources:
                </h4>
                <ul className="space-y-2">
                  {section.externalLinks.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                      >
                        <ArrowRight className="h-3 w-3 mr-2" />
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SEOContent;
