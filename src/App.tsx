import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { SolarGuide } from './pages/SolarGuide';
import { SolarDIYInstalls } from './pages/SolarDIYInstalls';
import { EnergyStorageGuide } from './pages/EnergyStorageGuide';
import { WindGuide } from './pages/WindGuide';
import { WaterGuide } from './pages/WaterGuide';
import { FoodGuide } from './pages/FoodGuide';
import { ShelterGuide } from './pages/ShelterGuide';
import { ProductDetail } from './pages/ProductDetail';
import { ProposalReport } from './pages/ProposalReport';
import TechMatrix from './pages/TechMatrix';
import AiInsights from './pages/AiInsights';
import About from './pages/About';
import UrbanGuide from './pages/UrbanGuide';
import { BatteryMaintenanceGuide } from './pages/articles/battery-maintenance-annual-checklist';
import { WizardProvider } from '@/contexts/WizardContext';
import ScrollToTop from '@/components/ScrollToTop';
import './App.css';

function App() {
  return (
    <WizardProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="resources/urban" element={<UrbanGuide />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:slug" element={<ProductDetail />} />
          <Route path="resources/tech-matrix" element={<TechMatrix />} />
          <Route path="resources/ai-insights" element={<AiInsights />} />
          <Route path="resources/energy/diy-installs" element={<SolarDIYInstalls />} />
          <Route path="resources/energy-storage" element={<EnergyStorageGuide />} />
          <Route path="resources/energy" element={<SolarGuide />} />
          <Route path="resources/wind" element={<WindGuide />} />
          <Route path="resources/water" element={<WaterGuide />} />
          <Route path="resources/food" element={<FoodGuide />} />
          <Route path="resources/shelter" element={<ShelterGuide />} />
          <Route path="articles/battery-maintenance-annual-checklist" element={<BatteryMaintenanceGuide />} />
          <Route path="proposal" element={<ProposalReport />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  </WizardProvider>
);
}

export default App;
