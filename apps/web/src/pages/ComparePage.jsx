
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ComparisonTable from '@/components/ComparisonTable.jsx';

function ComparePage() {
  const bankAccounts = [
    { name: 'Chase College Checking', featureValue: '$0', featureLabel: 'Monthly Fee', details: ['Ages 17-24 (waived)', 'No SSN required in-branch', 'Large branch network'], bestPick: true },
    { name: 'Bank of America Advantage', featureValue: '$0', featureLabel: 'Monthly Fee', details: ['Under 25 (waived)', 'No SSN required in-branch', 'Zelle integration'], bestPick: false },
    { name: 'Sable / Revolut / Fintechs', featureValue: '$0', featureLabel: 'Monthly Fee', details: ['Open with passport/visa', 'No SSN required online', 'Free foreign transactions'], bestPick: false },
  ];

  const creditCards = [
    { name: 'Deserve Edu Mastercard', featureValue: '1%', featureLabel: 'Cash Back', details: ['No SSN required', '$0 Annual Fee', '1 yr Amazon Prime Student'], bestPick: true },
    { name: 'Capital One Platinum Secured', featureValue: '$200', featureLabel: 'Min Deposit', details: ['ITIN accepted', '$0 Annual Fee', 'Builds credit history'], bestPick: false },
    { name: 'Discover it Student Cash Back', featureValue: '5%', featureLabel: 'Cash Back', details: ['SSN usually required', '$0 Annual Fee', 'Good grades reward'], bestPick: false },
  ];

  return (
    <>
      <Helmet>
        <title>Compare Financial Products | Finovly</title>
        <meta name="description" content="Compare the best savings accounts, credit cards, and investment platforms side-by-side." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://finovly.com/compare" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Compare Financial Products | Finovly" />
        <meta property="og:description" content="Compare the best savings accounts, credit cards, and investment platforms side-by-side." />
        <meta property="og:url" content="https://finovly.com/compare" />
        <meta property="og:image" content="https://finovly.com/finovly-logo-dark.svg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Compare Financial Products | Finovly" />
        <meta name="twitter:description" content="Compare the best savings accounts, credit cards, and investment platforms side-by-side." />
        <meta name="twitter:image" content="https://finovly.com/finovly-logo-dark.svg" />
        <script type="application/ld+json">{`{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Compare Financial Products",
          "description": "Compare the best savings accounts, credit cards, and investment platforms side-by-side.",
          "url": "https://finovly.com/compare"
        }`}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background grain-overlay">
        <Header />

        <main className="flex-1 py-12 px-4">
          <div className="max-w-5xl mx-auto">
            
            <Breadcrumb items={[{ label: 'Compare' }]} />

            <div className="mb-12">
              <h1 className="text-[40px] font-extrabold text-foreground mb-4">Compare Products</h1>
              <p className="text-xl text-muted-foreground">
                Find the best rates, lowest fees, and top rewards side-by-side.
              </p>
            </div>

            <div className="space-y-12">
              <section>
                <h2 className="text-[28px] font-bold text-foreground mb-6">Non-Resident Friendly Checking Accounts</h2>
                <ComparisonTable products={bankAccounts} />
              </section>

              <section>
                <h2 className="text-[28px] font-bold text-foreground mb-6">Immigrant-Friendly Credit Cards (No SSN)</h2>
                <ComparisonTable products={creditCards} />
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default ComparePage;
