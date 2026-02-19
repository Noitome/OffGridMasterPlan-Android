import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AddressCalculator } from '@/components/AddressCalculator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Droplets, 
  Wind, 
  Sun, 
  Home as HomeIcon, 
  Leaf, 
  BookOpen, 
  MapPin,
  ArrowRight,
  Star,
  Calendar,
  TrendingUp,
  ShoppingCart,
  Users,
  CheckCircle2,
  ListTodo,
  Calculator,
  Battery
} from 'lucide-react';
import { AffiliateProductCard } from '@/components/AffiliateProductCard';
import { products } from '@/data/products';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useWizard } from '@/contexts/WizardContext';

type SuccessStory = {
  id: string;
  title: string;
  locationLabel: string;
  tagline: string;
  summary: string;
  sourceUrl: string;
  image: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
    blurDataURL?: string;
  };
  tags: string[];
  badgeColors: string[];
};

const stories: SuccessStory[] = [
  {
    id: "earthship-ironbank",
    title: "Earthship Ironbank",
    locationLabel: "South Australia",
    tagline: "Council Approved",
    summary: "Australia's first council-approved Earthship. Proved tyre architecture meets strict building codes. Maintains ~21°C year-round without AC using thermal mass.",
    sourceUrl: "https://sustainablehouseday.com/listing/earthship-ironbank/",
    image: {
      url: "https://images.pexels.com/photos/2816323/pexels-photo-2816323.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Earthship Ironbank exterior with tire walls and greenhouse"
    },
    tags: ["Council Approved", "100% Rainwater"],
    badgeColors: ["bg-green-500/20 text-white border-green-500/30", "bg-blue-500/20 text-white border-blue-500/30"]
  },
  {
    id: "removed-tiny-house",
    title: "\"Removed\" Tiny House",
    locationLabel: "Currumbin, QLD",
    tagline: "Legal Parking",
    summary: "Solved the #1 tiny house hurdle: legal parking. Built on a road-registerable heavy-duty trailer with residential insulation and steel frames to resist termites.",
    sourceUrl: "https://www.autoevolution.com/news/this-aussie-tiny-house-successfully-marries-simplicity-with-sustainability-234823.html",
    image: {
      url: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Removed Tiny House exterior in Currumbin"
    },
    tags: ["Legal Parking", "Lithium AC"],
    badgeColors: ["bg-orange-500/20 text-white border-orange-500/30", "bg-purple-500/20 text-white border-purple-500/30"]
  },
  {
    id: "john-c-daley",
    title: "John C. Daley",
    locationLabel: "Bendigo, Australia",
    tagline: "8kW Solar",
    summary: "4 years fully off-grid. Uses evacuated tube hot water and a massive cistern. Proves standard residential comfort is possible with correctly sized LiFePO4 storage.",
    sourceUrl: "https://permies.com/t/272286/off-grid-solar-system-review-years",
    image: {
      url: "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "John C. Daley solar array in Bendigo"
    },
    tags: ["8kW Solar", "LiFePO4"],
    badgeColors: ["bg-yellow-500/20 text-white border-yellow-500/30", "bg-cyan-500/20 text-white border-cyan-500/30"]
  },
  {
    id: "wales-forest-school",
    title: "Wales Forest School",
    locationLabel: "Wales, UK",
    tagline: "Low Cost",
    summary: "Built an off-grid tiny home for £18,000 to escape mortgage traps. Highlights wood burners and simple living over high-tech complexity.",
    sourceUrl: "https://www.bbc.co.uk/news/uk-wales-63304989",
    image: {
      url: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Wales Forest School tiny home in the woods"
    },
    tags: ["Low Cost", "Wood Heat"],
    badgeColors: ["bg-red-500/20 text-white border-red-500/30", "bg-amber-700/20 text-white border-amber-700/30"]
  },
  {
    id: "oud-heverlee",
    title: "Oud-Heverlee Microgrid",
    locationLabel: "Belgium",
    tagline: "Community Grid",
    summary: "13 houses went off-grid together. Demonstrates symbiotic systems: sharing excess solar production between neighbors reduces individual battery costs by 40%.",
    sourceUrl: "https://horizon2020-story.eu/story_case_study/case-study-2/",
    image: {
      url: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Oud-Heverlee community microgrid participants"
    },
    tags: ["Community Grid", "Shared Solar"],
    badgeColors: ["bg-indigo-500/20 text-white border-indigo-500/30", "bg-teal-500/20 text-white border-teal-500/30"]
  },
  {
    id: "permaculture-canada",
    title: "Northern Canada Permaculture",
    locationLabel: "Northern Canada",
    tagline: "Microgrid",
    summary: "Family with two children living off-grid with solar/wind microgrid. Transformed 13 acres into a food forest despite short summers.",
    sourceUrl: "https://permacultureplants.com/off-grid-living/",
    image: {
      url: "https://images.pexels.com/photos/225769/pexels-photo-225769.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Northern Canada permaculture food forest"
    },
    tags: ["Microgrid", "Food Forest"],
    badgeColors: ["bg-emerald-500/20 text-white border-emerald-500/30", "bg-lime-500/20 text-white border-lime-500/30"]
  }
];

export function Home() {
  const { openWizard } = useWizard();
  const [currentSlide, setCurrentSlide] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const heroSlides = [
    {
      title: "Energy Independence",
      subtitle: "Solar, Wind & Hydro Solutions",
      image: "https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Complete renewable energy systems for off-grid living"
    },
    {
      title: "Water Security",
      subtitle: "Harvesting, Purification & Storage",
      image: "https://images.pexels.com/photos/221166/pexels-photo-221166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Sustainable water solutions for self-sufficient living"
    },
    {
      title: "Food Sovereignty",
      subtitle: "Permaculture & Food Production",
      image: "https://images.pexels.com/photos/225769/pexels-photo-225769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Grow your own food year-round with proven techniques"
    }
  ];

  const energySystems = [
    { name: "Solar PV Systems", efficiency: 95, cost: "$15,000 - $50,000", icon: Sun, link: "/resources/energy" },
    { name: "Wind Turbines", efficiency: 85, cost: "$10,000 - $30,000", icon: Wind, link: "/resources/wind" },
    { name: "Micro-Hydro", efficiency: 90, cost: "$8,000 - $25,000", icon: Droplets, link: "/resources/water" },
    { name: "Battery Storage", efficiency: 88, cost: "$5,000 - $20,000", icon: Zap, link: "/resources/energy-storage" }
  ];

  const resources = [
    {
      category: "Energy Systems",
      items: [
        { title: "Solar Panel Guide", link: "/resources/energy" },
        { title: "DIY Solar Installs", link: "/resources/energy/diy-installs" },
        { title: "Wind Turbine Calculator", link: "/resources/wind" },
        { title: "Battery Storage", link: "/resources/energy-storage" },
        { title: "Battery Maintenance Checklist", link: "/articles/battery-maintenance-annual-checklist" },
        { title: "Energy Audit Tools", link: "/resources/energy" }
      ]
    },
    {
      category: "Water & Waste",
      items: [
        { title: "Rainwater Harvesting", link: "/resources/water" },
        { title: "Composting Toilets", link: "/resources/shelter" },
        { title: "Greywater Systems", link: "/resources/water" },
        { title: "Well Drilling Guide", link: "/resources/water" },
        { title: "Water Purification", link: "/resources/water" }
      ]
    },
    {
      category: "Food Production",
      items: [
        { title: "Greenhouse Plans", link: "/resources/food" },
        { title: "Aquaponics Systems", link: "/resources/food" },
        { title: "Permaculture Design", link: "/resources/food" },
        { title: "Seed Saving Guide", link: "/resources/food" },
        { title: "Food Preservation", link: "/resources/food" }
      ]
    },
    {
      category: "Shelter & Construction",
      items: [
        { title: "Tiny House Plans", link: "/resources/shelter" },
        { title: "Earthship Building", link: "/resources/shelter" },
        { title: "Cob Construction", link: "/resources/shelter" },
        { title: "Straw Bale Homes", link: "/resources/shelter" },
        { title: "Natural Building Materials", link: "/resources/shelter" }
      ]
    }
  ];

  const successStories = [
    {
      name: "Sarah & Mike Johnson",
      location: "Montana Rockies",
      achievement: "100% Energy Independent",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
      story: "Built their off-grid homestead from scratch using solar and wind power. Now they grow 80% of their own food."
    },
    {
      name: "The Rodriguez Family",
      location: "New Mexico Desert",
      achievement: "Water Self-Sufficient",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
      story: "Transformed 10 acres of desert into a thriving permaculture oasis with rainwater harvesting and solar power."
    },
    {
      name: "Tom Chen",
      location: "Pacific Northwest",
      achievement: "Zero Waste Living",
      image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
      story: "Built a completely self-sufficient tiny house with composting systems and grows all his own vegetables."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroSlides[currentSlide].image} 
            alt={heroSlides[currentSlide].title}
            className="w-full h-full object-cover transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 animate-fade-in text-shadow-lg">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-4 opacity-90 font-sans">
            {heroSlides[currentSlide].subtitle}
          </p>
          <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto font-sans">
            {heroSlides[currentSlide].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold"
              onClick={() => {
                openWizard();
                document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start Planning
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-black/30 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary font-bold"
              onClick={() => document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-secondary' : 'bg-white/50'}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary font-heading mb-2">50K+</div>
              <div className="text-sm md:text-base text-muted-foreground">Homes Powered</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-secondary font-heading mb-2">95%</div>
              <div className="text-sm md:text-base text-muted-foreground">Energy Independence</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary font-heading mb-2">$2M+</div>
              <div className="text-sm md:text-base text-muted-foreground">Savings Generated</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-secondary font-heading mb-2">24/7</div>
              <div className="text-sm md:text-base text-muted-foreground">Expert Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6-Step Roadmap */}
      <section id="roadmap" className="py-20 bg-background border-t border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
               <ListTodo className="h-6 w-6 text-primary" />
             </div>
             <h2 className="text-4xl font-bold font-heading text-foreground mb-4">
               Your Off-Grid Journey Roadmap
             </h2>
             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
               Going off-grid can be overwhelming. Follow our proven 6-step process to success.
             </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative px-4 md:px-0">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-border -z-10"></div>
            
            {[
              { title: "1. Assess Location", desc: "Use our Calculator to analyze solar, wind, and water potential.", icon: MapPin, color: "text-blue-500", action: "Use Calculator", link: "#calculator" },
              { title: "2. Calculate Needs", desc: "Audit your energy usage to size your system correctly.", icon: Calculator, color: "text-green-500", action: "Start Audit", link: "/resources/energy" },
              { title: "3. Choose Systems", desc: "Select the right mix of Solar, Wind, and Hydro.", icon: Zap, color: "text-yellow-500", action: "Compare Systems", link: "/resources/energy" },
              { title: "4. Get Equipment", desc: "Source reliable components from trusted suppliers.", icon: ShoppingCart, color: "text-orange-500", action: "Visit Shop", link: "#shop" },
              { title: "5. Permits & Legal", desc: "Navigate zoning laws and building codes.", icon: BookOpen, color: "text-purple-500", action: "Read Guide", link: "/resources/shelter" },
              { title: "6. Build & Install", desc: "Follow step-by-step installation guides.", icon: HomeIcon, color: "text-indigo-500", action: "Start Building", link: "/resources/shelter" },
            ].map((step, i) => (
              <div key={i} className="bg-card p-6 rounded-xl shadow-sm border border-border relative hover:shadow-md transition-shadow mb-6 md:mb-0">
                 <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-card p-2 rounded-full border border-border">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-muted ${step.color}`}>
                      <step.icon className="h-6 w-6" />
                    </div>
                 </div>
                 <div className="mt-6 text-center">
                   <h3 className="text-xl font-bold font-heading mb-3">{step.title}</h3>
                   <p className="text-muted-foreground text-base mb-6">{step.desc}</p>
                   {step.link.startsWith('#') ? (
                     <Button className="w-full sm:w-auto font-bold" onClick={() => document.getElementById(step.link.substring(1))?.scrollIntoView({ behavior: 'smooth' })}>
                       {step.action} <ArrowRight className="ml-2 h-4 w-4" />
                     </Button>
                   ) : (
                     <Link to={step.link} className="block w-full sm:w-auto mx-auto">
                       <Button className="w-full sm:w-auto font-bold">
                         {step.action} <ArrowRight className="ml-2 h-4 w-4" />
                       </Button>
                     </Link>
                   )}
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Energy Systems Overview */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading text-foreground mb-4">
              Complete Energy Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From solar panels to wind turbines, we provide everything you need for energy independence
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {energySystems.map((system, index) => {
              const IconComponent = system.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                      <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground border-secondary/20">{system.efficiency}% Efficient</Badge>
                    </div>
                    <CardTitle className="text-xl font-heading">{system.name}</CardTitle>
                    <CardDescription>{system.cost}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={system.efficiency} className="mb-4 h-2" />
                    <Button asChild variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      <Link to={system.link}>Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resources Hub */}
      <section id="resources" className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
              Ultimate Resource Library
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Everything you need to plan, build, and maintain your off-grid lifestyle
            </p>
          </div>

          <Tabs defaultValue="energy" className="w-full">
            <div className="overflow-x-auto pb-4 md:overflow-visible">
              <TabsList className="flex w-full min-w-[320px] mb-8 bg-muted">
                <TabsTrigger value="energy" className="flex-1 flex items-center justify-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Zap className="h-4 w-4" />
                  <span>Energy</span>
                </TabsTrigger>
                <TabsTrigger value="water" className="flex-1 flex items-center justify-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Droplets className="h-4 w-4" />
                  <span>Water</span>
                </TabsTrigger>
                <TabsTrigger value="food" className="flex-1 flex items-center justify-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Leaf className="h-4 w-4" />
                  <span>Food</span>
                </TabsTrigger>
                <TabsTrigger value="shelter" className="flex-1 flex items-center justify-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <HomeIcon className="h-4 w-4" />
                  <span>Shelter</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {resources.map((category, index) => (
              <TabsContent key={index} value={category.category.toLowerCase().split(' ')[0]}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, itemIndex) => (
                    <Link key={itemIndex} to={item.link} className="block h-full">
                      <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-border">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <BookOpen className="h-6 w-6 text-primary" />
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <h3 className="font-semibold text-lg font-heading mb-2">{item.title}</h3>
                          <p className="text-muted-foreground text-base">
                            Comprehensive guide and tools for {item.title.toLowerCase()}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading mb-4">Field Builds & Success Stories</h2>
            <p className="text-xl opacity-90">Real-world systems proving it works</p>
          </div>

          <div className="w-full overflow-hidden" data-testid="success-carousel">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {stories.map((story) => (
                  <CarouselItem key={story.id} className="pl-4 md:basis-1/2 lg:basis-1/3" data-testid={`success-card-${story.id}`}>
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white overflow-hidden group hover:bg-white/15 transition-all duration-300 h-full flex flex-col">
                      <div className="h-48 overflow-hidden relative">
                        {/* Single Image - No Nested Carousel */}
                        <img 
                          src={story.image.url} 
                          alt={story.image.alt} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          data-testid={`success-image-${story.id}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                        
                        {/* Overlay Content */}
                        <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10 block">
                          <div className="absolute bottom-4 left-4 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-sm font-bold border border-white/30">
                                {story.title.substring(0, 2)}
                            </div>
                            <div>
                                <CardTitle className="text-white text-lg drop-shadow-md">{story.title}</CardTitle>
                                <CardDescription className="text-white/90 flex items-center gap-1 text-xs font-medium">
                                  <MapPin className="h-3 w-3" /> {story.locationLabel}
                                </CardDescription>
                            </div>
                          </div>
                        </a>
                      </div>

                      <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex flex-col">
                        <CardContent className="pt-4 flex-1 flex flex-col">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {story.tags.map((tag, idx) => (
                              <Badge key={`${story.id}-tag-${idx}`} className={story.badgeColors[idx % story.badgeColors.length]}>
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-white/90 text-base leading-relaxed mb-4 flex-1">
                            {story.summary}
                          </p>
                          <div className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-full w-fit transition-all mt-auto shadow-sm">
                            Read Case Study <ArrowRight className="ml-1 h-3 w-3" />
                          </div>
                        </CardContent>
                      </a>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-8">
                <CarouselPrevious className="static translate-y-0 bg-white/10 hover:bg-white/20 border-white/20 text-white" />
                <CarouselNext className="static translate-y-0 bg-white/10 hover:bg-white/20 border-white/20 text-white" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Off-Grid Calculator
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Calculate your energy needs, costs, and savings based on your location
            </p>
          </div>
          <AddressCalculator />
        </div>
      </section>

      {/* Shop Preview */}
      <section id="shop" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Off-Grid Equipment Shop
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Top-rated equipment for your self-reliant lifestyle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {products
              .filter(p => ['ecoflow-400w-portable-panel', 'victron-multiplus-24-3000', 'nature-head-composting-toilet', 'victron-smartshunt-500a'].includes(p.id))
              .map((product) => (
                <AffiliateProductCard key={product.id} {...product} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/shop">
              <Button variant="outline" size="lg">
                View Full Catalog
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link to="/articles/battery-maintenance-annual-checklist" className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-border">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                      <Battery className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <CardTitle className="text-2xl font-heading mb-2">Battery Maintenance</CardTitle>
                  <CardDescription className="text-base">
                    Don't let your batteries die early. Use our comprehensive annual checklist to ensure safety, longevity, and peak performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground border-secondary/20">Essential</Badge>
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground border-secondary/20">Checklist</Badge>
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground border-secondary/20">Safety</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* New Resources Section */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading text-foreground mb-4">
              New Resources
            </h2>
            <p className="text-xl text-muted-foreground">
              Explore our latest tools and insights for off-grid living
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/resources/tech-matrix" className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-border">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                      <ListTodo className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <CardTitle className="text-2xl font-heading mb-2">Tech Matrix</CardTitle>
                  <CardDescription className="text-base">
                    Comprehensive comparison of off-grid technologies. Analyze suitability, ROI, and DIY difficulty for water and energy systems.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground border-secondary/20">Interactive Table</Badge>
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground border-secondary/20">ROI Calculator</Badge>
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground border-secondary/20">Climate Data</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/resources/ai-insights" className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-border">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                      <BookOpen className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <CardTitle className="text-2xl font-heading mb-2">AI Insights</CardTitle>
                  <CardDescription className="text-base">
                    Discover the future of off-grid living. Learn about symbiotic technologies, the DIY revolution, and regional adaptability.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground border-secondary/20">Deep Dive</Badge>
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground border-secondary/20">Future Tech</Badge>
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary-foreground border-secondary/20">Sustainability</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading text-foreground mb-4">
              Join the Movement
            </h2>
            <p className="text-xl text-muted-foreground">
              Connect with thousands of others building a sustainable future
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center border-border hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold font-heading mb-2">Community Forums</h3>
                <p className="text-muted-foreground mb-4">
                  Get advice from experienced off-grid dwellers and industry professionals
                </p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">Join Discussion</Button>
              </CardContent>
            </Card>

            <Card className="text-center border-border hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <Calendar className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold font-heading mb-2">Local Meetups</h3>
                <p className="text-muted-foreground mb-4">
                  Connect with off-grid enthusiasts in your area for workshops and tours
                </p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">Find Events</Button>
              </CardContent>
            </Card>

            <Card className="text-center border-border hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold font-heading mb-2">Marketplace</h3>
                <p className="text-muted-foreground mb-4">
                  Buy, sell, and trade equipment with other community members
                </p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">Browse Listings</Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-muted/50 border-border">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold font-heading text-foreground mb-4">Ready to Start Your Off-Grid Journey?</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Join our community and get access to exclusive resources, expert advice, and special offers
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
