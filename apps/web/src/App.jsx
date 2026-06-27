
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import CalculatorsPage from './pages/CalculatorsPage.jsx';
import SubstantialPresenceTestPage from './pages/SubstantialPresenceTestPage.jsx';
import H1BTaxCalculatorPage from './pages/H1BTaxCalculatorPage.jsx';
import F1OPTTaxCalculatorPage from './pages/F1OPTTaxCalculatorPage.jsx';
import RemittanceFeeCalculatorPage from './pages/RemittanceFeeCalculatorPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import BlogPostPage from './pages/BlogPostPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import TermsOfServicePage from './pages/TermsOfServicePage.jsx';
import ComparePage from './pages/ComparePage.jsx';
import DisclaimerPage from './pages/DisclaimerPage.jsx';
import EditorialDisclosurePage from './pages/EditorialDisclosurePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Calculators Hub */}
        <Route path="/calculators" element={<CalculatorsPage />} />

        {/* Immigrant Finance Calculators */}
        <Route path="/substantial-presence-test-calculator" element={<SubstantialPresenceTestPage />} />
        <Route path="/h1b-tax-calculator" element={<H1BTaxCalculatorPage />} />
        <Route path="/f1-opt-tax-calculator" element={<F1OPTTaxCalculatorPage />} />
        <Route path="/remittance-fee-calculator" element={<RemittanceFeeCalculatorPage />} />

        {/* Blog Routes */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />

        {/* Legal & Info Routes */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/editorial-disclosure" element={<EditorialDisclosurePage />} />

        {/* Fallback 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
