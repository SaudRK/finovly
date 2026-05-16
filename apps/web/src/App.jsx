
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import CalculatorsPage from './pages/CalculatorsPage.jsx';
import CompoundInterestCalculatorPage from './pages/CompoundInterestCalculatorPage.jsx';
import MortgageCalculatorPage from './pages/MortgageCalculatorPage.jsx';
import LoanComparisonCalculatorPage from './pages/LoanComparisonCalculatorPage.jsx';
import SalaryTaxCalculatorPage from './pages/SalaryTaxCalculatorPage.jsx';
import FourZeroOneKCalculatorPage from './pages/FourZeroOneKCalculatorPage.jsx';
import RetirementCalculatorPage from './pages/RetirementCalculatorPage.jsx';
import InvestmentCalculatorPage from './pages/InvestmentCalculatorPage.jsx';
import CreditCardPayoffCalculatorPage from './pages/CreditCardPayoffCalculatorPage.jsx';
import AutoLoanCalculatorPage from './pages/AutoLoanCalculatorPage.jsx';
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
        
        {/* Hub Page */}
        <Route path="/calculators" element={<CalculatorsPage />} />
        
        {/* Dedicated Calculator Pages */}
        <Route path="/compound-interest-calculator" element={<CompoundInterestCalculatorPage />} />
        <Route path="/mortgage-calculator" element={<MortgageCalculatorPage />} />
        <Route path="/loan-comparison-calculator" element={<LoanComparisonCalculatorPage />} />
        <Route path="/salary-tax-calculator" element={<SalaryTaxCalculatorPage />} />
        <Route path="/401k-calculator" element={<FourZeroOneKCalculatorPage />} />
        <Route path="/retirement-calculator" element={<RetirementCalculatorPage />} />
        <Route path="/investment-calculator" element={<InvestmentCalculatorPage />} />
        <Route path="/credit-card-payoff-calculator" element={<CreditCardPayoffCalculatorPage />} />
        <Route path="/auto-loan-calculator" element={<AutoLoanCalculatorPage />} />
        
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
