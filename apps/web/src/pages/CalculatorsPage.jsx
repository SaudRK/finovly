
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Globe, Briefcase, GraduationCap, Send } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import CalculatorCard from '@/components/CalculatorCard.jsx';
import FAQSection from '@/components/FAQSection.jsx';

function CalculatorsPage() {
  const allCalcs = [
    {
      icon: Globe,
      title: 'Substantial Presence Test',
      description: 'Check if the IRS considers you a U.S. tax resident using the official 183-day formula.',
      link: '/substantial-presence-test-calculator',
      tag: 'Essential',
    },
    {
      icon: Briefcase,
      title: 'H1B Tax Estimator',
      description: 'Estimate your federal, state, and FICA taxes as an H1B visa holder. Includes 401(k) deductions.',
      link: '/h1b-tax-calculator',
      tag: 'Popular',
    },
    {
      icon: GraduationCap,
      title: 'F1 OPT Tax Calculator',
      description: 'Tax estimates for F1 international students on OPT or CPT. Includes FICA exemption and treaty benefits.',
      link: '/f1-opt-tax-calculator',
    },
    {
      icon: Send,
      title: 'Remittance Fee Calculator',
      description: 'Compare exchange rates and hidden fees across Wise, Remitly, and Western Union.',
      link: '/remittance-fee-calculator',
    },
  ];

  const faqs = [
    { question: 'Are these calculators free?', answer: 'Yes. Every tool is completely free with no registration required.' },
    { question: 'How accurate are the results?', answer: 'We use official IRS formulas and real-world fee data. Results are estimates for planning purposes — always consult a tax professional for filing decisions.' },
    { question: 'Is my data stored?', answer: 'No. All calculations run directly in your browser. We never collect or store your financial inputs.' },
    { question: 'Who are these calculators built for?', answer: 'These tools are built specifically for immigrants and international residents in the United States — including H1B and L1 workers, F1 and J1 students, and anyone sending money home.' },
  ];

  return (
    <>
      <Helmet>
        <title>Free Immigrant Finance Calculators & Tools | Finovly</title>
        <meta name="description" content="Free financial calculators for immigrants: Substantial Presence Test, H1B Tax Estimator, F1 OPT Tax Calculator, and Remittance Fees. No sign-up." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://finovly.com/calculators" />
        <meta property="og:title" content="Free Immigrant Finance Calculators | Finovly" />
        <meta property="og:description" content="Free financial tools built for immigrants navigating the US financial system." />
        <meta property="og:url" content="https://finovly.com/calculators" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Free Immigrant Finance Calculators & Tools | Finovly" />
        <meta name="twitter:description" content="Free financial tools built for immigrants navigating the US financial system." />
        <meta property="og:image" content="https://finovly.com/finovly-logo-dark.svg" />
        <meta name="twitter:image" content="https://finovly.com/finovly-logo-dark.svg" />
        <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"CollectionPage","name":"Immigrant Finance Calculators","url":"https://finovly.com/calculators","description":"Free financial calculators for immigrants and international residents in the US."}`}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background grain-overlay">
        <Header />
        <main className="flex-1 py-8 md:py-14 px-4">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb items={[{ label: 'Calculators' }]} />

            <div className="mb-14">
              <span className="section-label">// tools for immigrants</span>
              <h1 className="text-[36px] md:text-[48px] font-extrabold text-foreground mb-3" style={{ letterSpacing: '-0.04em', lineHeight: '1.05' }}>
                Immigrant finance calculators
              </h1>
              <p className="text-base text-muted-foreground max-w-lg">
                Free tools built for H1B holders, F1 students, and everyone navigating the US financial system. No accounts, no paywalls.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allCalcs.map((calc, idx) => (
                <div key={idx} className={idx < 2 ? 'md:col-span-1' : ''}>
                  <CalculatorCard {...calc} />
                </div>
              ))}
            </div>
          </div>

          <FAQSection faqs={faqs} title="Questions" subtitle="About our immigrant finance tools." />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default CalculatorsPage;
