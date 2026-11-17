import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/home/HomePage';
import AboutPage from './pages/about/AboutPage';
import ServicesPage from './pages/ServicesPage';
import DevelopmentsPage from './pages/DevelopmentsPage';
import DevelopmentDetailPage from './pages/DevelopmentDetailPage';
import InsightsPage from './pages/InsightsPage';
import ContactPage from './pages/ContactPage';
import OwnAPiecePage from './pages/OwnAPiecePage';
import LegalPage from './pages/LegalPage';
import NotFoundPage from './pages/NotFoundPage';

/** Route table. The router itself is provided by main.jsx (BrowserRouter) or tests (MemoryRouter). */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="developments" element={<DevelopmentsPage />} />
        <Route path="developments/:slug" element={<DevelopmentDetailPage />} />
        <Route path="insights" element={<InsightsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="own-a-piece" element={<OwnAPiecePage />} />
        <Route path="privacy-policy" element={<LegalPage kind="privacy" />} />
        <Route path="terms" element={<LegalPage kind="terms" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
