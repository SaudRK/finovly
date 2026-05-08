
import React from 'react';
import { Helmet } from 'react-helmet';
import { Calculator, Home, Scale, DollarSign, TrendingUp, BarChart3, CreditCard, Car, PiggyBank } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import CalculatorCard from '@/components/CalculatorCard.jsx';
import FAQSection from '@/components/FAQSection.jsx';

function CalculatorsPage() {
  const allCalcs = [
    { icon: TrendingUp, title: 'Compound Interest', description: 'Project wealth growth with compounding.', link: '/compound-interest-calculator', tag: 'Popular' },
    { icon: Home, title: 'Mortgage', description: 'Monthly payments and total interest.', link: '/mortgage-calculator', tag: 'Essential' },
    { icon: Scale, title: 'Loan Comparison', description: 'Compare rates and terms side by side.', link: '/loan-comparison-calculator' },
    { icon: DollarSign, title: 'Salary & Tax', description: 'Take-home pay after deductions.', link: '/salary-tax-calculator' },
    { icon: BarChart3, title: 'Investment', description: 'Simulate portfolio growth.', link: '/investment-calculator' },
    { icon: Calculator, title: 'Retirement', description: 'Are you on track to retire?', link: '/retirement-calculator' },
    { icon: PiggyBank, title: '401(k)', description: 'Employer match and projections.', link: '/401k-calculator' },
    { icon: Car, title: 'Auto Loan', description: 'Monthly car payment estimates.', link: '/auto-loan-calculator' },
    { icon: CreditCard, title: 'Credit Card Payoff', description: 'Build a payoff strategy.', link: '/credit-card-payoff-calculator' },
  ];

  const faqs = [
    { question: 'Are these calculators free?', answer: 'Yes. Every tool is free with no registration required.' },
    { question: 'How accurate are results?', answer: 'We use standard financial formulas. Results are estimates for planning purposes.' },
    { question: 'Is my data stored?', answer: 'No. Everything runs in your browser.' },
  ];

  return (
    <>
      <Helmet>
        <title>Free Financial Calculators & Tools | Finovly</title>
        <meta name="description" content="9+ free financial calculators: compound interest, mortgage, loans, investments, retirement, taxes, and more. No sign-up required." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://finovly.com/calculators" />
        <meta property="og:title" content="Free Financial Calculators | Finovly" />
        <meta property="og:url" content="https://finovly.com/calculators" />
        <meta name="twitter:card" content="summary" />
        <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"CollectionPage","name":"Financial Calculators","url":"https://finovly.com/calculators"}`}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background grain-overlay">
        <Header />
        <main className="flex-1 py-8 md:py-14 px-4">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb items={[{ label: 'Calculators' }]} />

            <div className="mb-14">
              <span className="section-label">// tools</span>
              <h1 className="text-[36px] md:text-[48px] font-extrabold text-foreground mb-3" style={{ letterSpacing: '-0.04em', lineHeight: '1.05' }}>
                Financial calculators
              </h1>
              <p className="text-base text-muted-foreground max-w-lg">
                Precision tools for every financial decision. No accounts, no paywalls.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allCalcs.map((calc, idx) => (
                <div key={idx} className={idx === 0 ? 'lg:row-span-2' : idx === 1 ? 'lg:row-span-2' : ''}>
                  <CalculatorCard {...calc} />
                </div>
              ))}
            </div>
          </div>

          <FAQSection faqs={faqs} title="Questions" subtitle="About our financial tools." />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default CalculatorsPage;
