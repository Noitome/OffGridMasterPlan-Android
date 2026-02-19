import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Leaf, 
  Menu, 
  X,
  Mail,
  Phone
} from 'lucide-react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useWizard } from '@/contexts/WizardContext';
import { EnergyWizard } from '@/components/EnergyWizard';

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { openWizard } = useWizard();

  const isHome = location.pathname === '/';

  const handleGetStarted = () => {
    openWizard();
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!isHome) return;
    const targetId = location.hash ? location.hash.replace('#', '') : '';
    if (!targetId) return;
    const element = document.getElementById(targetId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }, [isHome, location.hash]);

  const scrollToSection = (id: string) => {
    if (!isHome) {
      // If not on home, we can't scroll to section easily without hash routing or redirect
      // For now, we will just use Link to with hash
      return; 
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold font-heading text-foreground tracking-tight">OffGridMasterPlan</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              {isHome ? (
                <>
                  <button onClick={() => scrollToSection('home')} className="text-muted-foreground hover:text-primary transition-colors font-medium">Home</button>
                  <button onClick={() => scrollToSection('resources')} className="text-muted-foreground hover:text-primary transition-colors font-medium">Resources</button>
                  <button onClick={() => scrollToSection('calculator')} className="text-muted-foreground hover:text-primary transition-colors font-medium">Calculator</button>
                  <button onClick={() => scrollToSection('community')} className="text-muted-foreground hover:text-primary transition-colors font-medium">Community</button>
                  <button onClick={() => scrollToSection('shop')} className="text-muted-foreground hover:text-primary transition-colors font-medium">Shop</button>
                </>
              ) : (
                <>
                   <Link to="/" className="text-muted-foreground hover:text-primary transition-colors font-medium">Home</Link>
                   <Link to="/#resources" className="text-muted-foreground hover:text-primary transition-colors font-medium">Resources</Link>
                   <Link to="/#calculator" className="text-muted-foreground hover:text-primary transition-colors font-medium">Calculator</Link>
                   <Link to="/#community" className="text-muted-foreground hover:text-primary transition-colors font-medium">Community</Link>
                   <Link to="/#shop" className="text-muted-foreground hover:text-primary transition-colors font-medium">Shop</Link>
                </>
              )}
              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">Sign In</Button>
              <Button size="sm" onClick={handleGetStarted} className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold">Get Started</Button>
              <LanguageSwitcher />
            </div>

            <div className="md:hidden flex items-center gap-2">
              <LanguageSwitcher />
              <Button 
                variant="outline"
                size="icon"
                className="text-foreground border-primary hover:bg-primary/10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t border-border fixed w-full left-0 z-40 overflow-y-auto max-h-[calc(100vh-4rem)]">
            <div className="px-4 py-2 space-y-2 pb-20">
              <Link to="/" className="block py-2 text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/#resources" className="block py-2 text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>Resources</Link>
              <Link to="/#calculator" className="block py-2 text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>Calculator</Link>
              <Link to="/#community" className="block py-2 text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>Community</Link>
              <Link to="/#shop" className="block py-2 text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>Shop</Link>
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="w-full">Sign In</Button>
                <Button size="sm" onClick={handleGetStarted} className="w-full bg-secondary text-secondary-foreground">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <Outlet />

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* ... footer content ... */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-8 w-8 text-secondary" />
                <span className="text-2xl font-bold font-heading">OffGridMasterPlan</span>
              </div>
              <p className="text-primary-foreground/80 mb-4">
                Your complete resource for off-grid living, from planning to execution.
              </p>
              <div className="flex space-x-4">
                <Mail className="h-5 w-5 text-primary-foreground/70 hover:text-white cursor-pointer transition-colors" />
                <Phone className="h-5 w-5 text-primary-foreground/70 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4 font-heading text-secondary">Resources</h4>
              <ul className="space-y-2 text-primary-foreground/70">
                <li><Link to="/resources/energy" className="hover:text-white transition-colors">Energy Guides</Link></li>
                <li><Link to="/resources/energy/diy-installs" className="hover:text-white transition-colors">DIY Solar Installs</Link></li>
                <li><Link to="/resources/energy-storage" className="hover:text-white transition-colors">Battery Storage</Link></li>
                <li><Link to="/articles/battery-maintenance-annual-checklist" className="hover:text-white transition-colors">Battery Maintenance</Link></li>
                <li><Link to="/resources/water" className="hover:text-white transition-colors">Water Systems</Link></li>
                <li><Link to="/resources/food" className="hover:text-white transition-colors">Food Production</Link></li>
                <li><Link to="/resources/shelter" className="hover:text-white transition-colors">Building Plans</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4 font-heading text-secondary">Community</h4>
              <ul className="space-y-2 text-primary-foreground/70">
                <li><Link to="/community/forums" className="hover:text-white transition-colors">Forums</Link></li>
                <li><Link to="/community/events" className="hover:text-white transition-colors">Events</Link></li>
                <li><Link to="/community/stories" className="hover:text-white transition-colors">Success Stories</Link></li>
                <li><Link to="/community/experts" className="hover:text-white transition-colors">Expert Network</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4 font-heading text-secondary">Support</h4>
              <ul className="space-y-2 text-primary-foreground/70">
                <li><Link to="/support/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/support/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/support/installation" className="hover:text-white transition-colors">Installation Services</Link></li>
                <li><Link to="/support/warranty" className="hover:text-white transition-colors">Warranty Info</Link></li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-primary-foreground/20" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-primary-foreground/60 text-sm flex flex-col gap-1">
              <p>© 2024 OffGridMasterPlan.com. All rights reserved.</p>
              <p className="text-xs text-primary-foreground/40">
                As an Amazon Associate I earn from qualifying purchases.
              </p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-primary-foreground/60 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-primary-foreground/60 hover:text-white text-sm transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="text-primary-foreground/60 hover:text-white text-sm transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
      <EnergyWizard />
    </div>
  );
}
