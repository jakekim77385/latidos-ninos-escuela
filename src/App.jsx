import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SectionNav   from './components/SectionNav';
import Home          from './pages/Home';
import ChecklistPage from './pages/ChecklistPage';
import AdminPage     from './pages/AdminPage';
import HealthPage    from './pages/HealthPage';
import EmotionalPage from './pages/EmotionalPage';
import AcademicPage  from './pages/AcademicPage';
import RefugeePage   from './pages/RefugeePage';
import ResourcesPage from './pages/ResourcesPage';
import FAQPage       from './pages/FAQPage';
import NotFoundPage  from './pages/NotFoundPage';
import FullGuide     from './pages/FullGuide';
import DocumentsPage from './pages/DocumentsPage';

function AppContent() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/checklist" element={<ChecklistPage />} />
          <Route path="/admin"     element={<AdminPage />} />
          <Route path="/health"    element={<HealthPage />} />
          <Route path="/emotional" element={<EmotionalPage />} />
          <Route path="/academic"  element={<AcademicPage />} />
          <Route path="/refugee"   element={<RefugeePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/faq"       element={<FAQPage />} />
          <Route path="/guide"     element={<FullGuide />} />
          <Route path="/docs"      element={<DocumentsPage />} />
          <Route path="*"          element={<NotFoundPage />} />
        </Routes>
        <SectionNav />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

