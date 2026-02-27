import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations (we'll structure these later or load dynamically)
// For now, we'll embed the core UI strings to get the system running immediately.

const resources = {
  en: {
    translation: {
      "nav": {
        "calculator": "Calculator",
        "shop": "Shop",
        "matrix": "Tech Matrix",
        "about": "About"
      },
      "calculator": {
        "title": "Location Analysis",
        "desc": "Enter your location to get real-time environmental data",
        "search_placeholder": "Enter address, city, or zip code",
        "search_btn": "Search",
        "wizard_btn": "Help me figure it out"
      },
      "techMatrix": {
        "title": "Off-Grid Tech Matrix",
        "subtitle": "Compare technologies based on climate suitability, ROI, and implementation difficulty.",
        "table": {
          "title": "Technology Comparison Table",
          "desc": "Detailed breakdown of water and energy solutions for various environments.",
          "col_category": "Category",
          "col_tech": "Technology",
          "col_suitability": "Suitability (Des/Tmp/Trp/Cld)",
          "col_scalability": "Scalability",
          "col_roi": "ROI (1-5)",
          "col_diy": "DIY Difficulty",
          "col_cost": "Cost"
        },
        "legend": {
          "suitability_title": "Suitability Legend",
          "suitability_desc": "Scores range from 1 (Poor) to 5 (Excellent). Columns represent Desert, Temperate, Tropical, and Cold climates respectively.",
          "roi_title": "ROI Calculation",
          "roi_desc": "Return on Investment considers initial cost, maintenance, and resource yield over a 10-year period.",
          "diy_title": "DIY Difficulty",
          "diy_desc": "1 = No tools required. 5 = Professional installation or specialized knowledge recommended."
        },
        "sourcing": {
          "title": "Sourcing & Reality Check",
          "desc": "Finding the right gear isn't always about clicking a \"Buy Now\" button. Here is how to navigate the procurement landscape:",
          "retail_label": "Retail & Affiliates:",
          "retail_desc": "For standard items (solar panels, batteries, pumps), we provide links to trusted suppliers. This is the easiest, albeit sometimes more expensive, route.",
          "direct_label": "Direct Sources:",
          "direct_desc": "Niche tech (like specific wind turbine parts or biogas membranes) often requires contacting manufacturers directly. We'll point you to their catalogs.",
          "scavenger_label": "The Scavenger:",
          "scavenger_desc": "True DIYers know the value of salvage. Old forklift batteries, washing machine motors, and IBC totes from marketplaces are gold mines for the resourceful.",
          "warning_label": "Warning:",
          "warning_desc": "We draw the line at hazardous materials. Please do not attempt to source uranium or other fissile materials for a \"DIY nuclear reactor.\" If you've wandered that far, you're on your own!"
        },
        "items": {
          "rainwater": { "name": "Rainwater Harvesting", "desc": "Collects run-off from roofs/surfaces. Sustainable water source requiring catchment area and storage tanks." },
          "atmos": { "name": "Atmos Water Gen", "desc": "Extracts moisture from humid air. Reliable in high humidity but energy-intensive." },
          "gravity": { "name": "Gravity Filter", "desc": "Filters water using gravity pressure through ceramic/carbon media. No electricity required, ideal for small-scale use." },
          "bore": { "name": "DIY Bore/Well", "desc": "Manual drilling (Auger, Sludging, Jetting) to access shallow aquifers. Labor-intensive but very low cost. Requires soft soil." },
          "solar": { "name": "Solar PV", "desc": "Photovoltaic panels convert sunlight directly to electricity. Silent, modular, and reliable with battery storage." },
          "wind": { "name": "Wind Turbine", "desc": "Generates power from wind flow. Best for open, windy sites; can complement solar for 24/7 generation." },
          "archimedes": { "name": "Archimedes Wind", "desc": "Spiral wind turbines (e.g., Liam F1) that capture wind from multiple angles. Quieter and more efficient in turbulent/urban air." },
          "redux": { "name": "Redux Flow Battery", "desc": "Liquid electrolyte storage (e.g., Iron Flow). Non-flammable, 20+ year life, 100% depth of discharge. Bulky but durable." },
          "hydrogen": { "name": "Hydrogen Paste", "desc": "Emerging tech storing H2 in magnesium hydride paste/cartridges. Safe, high density, but currently proprietary/expensive." },
          "hillside": { "name": "Hillside Gravity", "desc": "Pumping water uphill when solar is excess, releasing it through hydro turbine when needed. Requires steep terrain + water source." },
          "compost": { "name": "Compost Toilet", "desc": "Dry toilet using sawdust/coco-coir. Separates solids/liquids. Odorless if managed. Creates 'humanure' fertilizer." },
          "incinerator": { "name": "Incinerator (Gas)", "desc": "Burns waste to sterile ash using propane. Low electric draw (12V fans). Ideal for vans/cabins with no water." },
          "biogas": { "name": "Biogas Digester", "desc": "Anaerobic bacteria break down kitchen scraps/blackwater into methane gas for cooking + liquid fertilizer." },
          "septic": { "name": "Septic System", "desc": "Standard underground tank + leach field. Bacterial breakdown. High install effort, requires permitting and water." },
          "worm": { "name": "Vermiculture", "desc": "Worm farming for kitchen scraps. Produces high-quality castings/tea. Indoor/outdoor. Temp sensitive." },
          "cassette": { "name": "Cassette/Bucket", "desc": "Portable holding tank (chemical or sawdust). 'Carry-out' method. Simple but requires frequent emptying station access." }
        }
      },
      "waterGuide": {
        "title": "Complete Off-Grid Water Guide 2024",
        "subtitle": "A comprehensive guide to harvesting, filtering, and storing water for self-sufficient living.",
        "why_title": "Why Water Independence?",
        "why_desc": "Water is life. Securing a reliable, clean water source is arguably the most critical aspect of off-grid living. Whether it's rainwater harvesting or well water, having your own supply ensures resilience.",
        "pros": { "title": "Pros", "list": ["No monthly water bills", "Control over water quality", "Resilience against grid failures", "Sustainable resource usage"] },
        "cons": { "title": "Cons", "list": ["Requires maintenance & testing", "Finite supply (dependent on rain/aquifer)", "Filtration systems can be costly", "Storage space required"] },
        "systems_title": "Water Systems",
        "rainwater_title": "Rainwater Harvesting",
        "rainwater_desc": "Collecting rain from roofs is one of the most common off-grid methods. It requires a clean catchment surface (metal roof preferred), gutters, pre-filters, and cisterns.",
        "filter_title": "Filtration & Purification",
        "filter_desc": "Raw water must be treated. Common methods include sediment filters, carbon blocks, UV sterilization, and reverse osmosis.",
        "greywater_title": "Greywater Systems",
        "greywater_desc": "Reuse water from sinks and showers for irrigation. This extends your water supply and reduces waste, but requires careful soap selection and system design.",
        "bore_title": "DIY Bore Drilling",
        "bore_desc": "Accessing groundwater manually is possible in soft soils (clay, sand, silt) using low-cost techniques like augering or sludging.",
        "bore_list": [
          "Hand Auger: Rotating a cutting head. Good for shallow depths (0-15m).",
          "Sludging: Using water pressure and a lever to flush out soil. Can reach 30m+."
        ],
        "bore_warning_title": "Efficiency & Safety Note",
        "bore_warning_desc": "Assuming no regulatory restrictions (no-code zone), this is the most efficient method. Ensure well is capped for safety and contamination prevention.",
        "sizing_title": "Sizing Your Storage",
        "sizing_desc": "A general rule of thumb for off-grid homes is to have at least 3 months of water storage capacity to survive dry spells. Average usage is 50-100 gallons per day for a conservative household.",
        "calc_card_title": "Check your local rainfall",
        "calc_card_desc": "Use our address-based tool to see annual rainfall data for your location.",
        "calc_btn": "Go to Calculator",
        "setup_title": "Setup Steps",
        "setup_list": [
          "Calculate Demand: Audit your water usage.",
          "Catchment Area: Measure your roof footprint. (1 inch of rain on 1,000 sq ft roof = ~600 gallons).",
          "Storage: Install cisterns or tanks (above or below ground).",
          "Pumping: Choose a 12V or 24V DC pump for off-grid efficiency.",
          "Filtration: Install a multi-stage filtration system before the tap."
        ]
      },
      "common": {
        "loading": "Loading...",
        "error": "Error",
        "success": "Success",
        "coming_soon": "Coming Soon"
      }
    }
  },
  nl: {
    translation: {
      "nav": {
        "calculator": "Calculator",
        "shop": "Winkel",
        "matrix": "Tech Matrix",
        "about": "Over ons"
      },
      "calculator": {
        "title": "Locatie Analyse",
        "desc": "Voer uw locatie in voor real-time omgevingsdata",
        "search_placeholder": "Voer adres, stad of postcode in",
        "search_btn": "Zoeken",
        "wizard_btn": "Help mij kiezen"
      },
      "common": {
        "loading": "Laden...",
        "error": "Fout",
        "success": "Succes",
        "coming_soon": "Binnenkort"
      }
    }
  },
  de: {
    translation: {
      "nav": {
        "calculator": "Rechner",
        "shop": "Shop",
        "matrix": "Tech-Matrix",
        "about": "Über uns"
      },
      "calculator": {
        "title": "Standortanalyse",
        "desc": "Geben Sie Ihren Standort ein für Echtzeit-Umweltdaten",
        "search_placeholder": "Adresse, Stadt oder PLZ eingeben",
        "search_btn": "Suchen",
        "wizard_btn": "Hilfe bei der Auswahl"
      },
      "common": {
        "loading": "Laden...",
        "error": "Fehler",
        "success": "Erfolg",
        "coming_soon": "Demnächst"
      }
    }
  },
  fr: {
    translation: {
      "nav": {
        "calculator": "Calculatrice",
        "shop": "Boutique",
        "matrix": "Matrice Tech",
        "about": "À propos"
      },
      "calculator": {
        "title": "Analyse de localisation",
        "desc": "Entrez votre emplacement pour des données environnementales en temps réel",
        "search_placeholder": "Entrez l'adresse, la ville ou le code postal",
        "search_btn": "Rechercher",
        "wizard_btn": "Aidez-moi à choisir"
      },
      "common": {
        "loading": "Chargement...",
        "error": "Erreur",
        "success": "Succès",
        "coming_soon": "Bientôt disponible"
      }
    }
  },
  es: {
    translation: {
      "nav": {
        "calculator": "Calculadora",
        "shop": "Tienda",
        "matrix": "Matriz Técnica",
        "about": "Sobre nosotros"
      },
      "calculator": {
        "title": "Análisis de ubicación",
        "desc": "Ingrese su ubicación para obtener datos ambientales en tiempo real",
        "search_placeholder": "Ingrese dirección, ciudad o código postal",
        "search_btn": "Buscar",
        "wizard_btn": "Ayúdame a elegir"
      },
      "common": {
        "loading": "Cargando...",
        "error": "Error",
        "success": "Éxito",
        "coming_soon": "Próximamente"
      }
    }
  },
  zh: {
    translation: {
      "nav": {
        "calculator": "计算器",
        "shop": "商店",
        "matrix": "技术矩阵",
        "about": "关于我们"
      },
      "calculator": {
        "title": "位置分析",
        "desc": "输入您的位置以获取实时环境数据",
        "search_placeholder": "输入地址、城市或邮政编码",
        "search_btn": "搜索",
        "wizard_btn": "帮我弄清楚"
      },
      "common": {
        "loading": "加载中...",
        "error": "错误",
        "success": "成功",
        "coming_soon": "即将推出"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    }
  });

export default i18n;