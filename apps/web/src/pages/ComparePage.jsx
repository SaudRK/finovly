
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ComparisonTable from '@/components/ComparisonTable.jsx';

function ComparePage() {
  const savingsAccounts = [
    { name: 'Ally Bank High Yield', featureValue: '4.25%', featureLabel: 'APY', details: ['$0 minimum balance', 'No monthly fees', 'FDIC Insured'], bestPick: true },
    { name: 'Marcus by Goldman Sachs', featureValue: '4.40%', featureLabel: 'APY', details: ['$0 minimum balance', 'No monthly fees', 'Same-day transfers'], bestPick: false },
    { name: 'Discover Online Savings', featureValue: '4.25%', featureLabel: 'APY', details: ['$0 minimum balance', 'No monthly fees', 'Large ATM network'], bestPick: false },
  ];

  const creditCards = [
    { name: 'Chase Freedom Unlimited', featureValue: '1.5%', featureLabel: 'Cash Back', details: ['$0 Annual Fee', '0% Intro APR for 15 months', 'Bonus on travel'], bestPick: true },
    { name: 'Citi Double Cash', featureValue: '2.0%', featureLabel: 'Cash Back', details: ['$0 Annual Fee', '1% on purchase, 1% on payment', 'No category tracking'], bestPick: false },
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
        <meta property="og:image" content="https://finovly.com/images/compare-og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Compare Financial Products | Finovly" />
        <meta name="twitter:description" content="Compare the best savings accounts, credit cards, and investment platforms side-by-side." />
        <meta name="twitter:image" content="https://finovly.com/images/compare-og.png" />
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
            
            <div className="mb-12">
              <h1 className="text-[40px] font-extrabold text-foreground mb-4">Compare Products</h1>
              <p className="text-xl text-muted-foreground">
                Find the best rates, lowest fees, and top rewards side-by-side.
              </p>
            </div>

            <div className="space-y-12">
              <section>
                <h2 className="text-[28px] font-bold text-foreground mb-6">Best High-Yield Savings Accounts</h2>
                <ComparisonTable products={savingsAccounts} />
              </section>

              <section>
                <h2 className="text-[28px] font-bold text-foreground mb-6">Best Cash Back Credit Cards</h2>
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
