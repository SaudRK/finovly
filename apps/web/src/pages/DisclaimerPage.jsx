
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function DisclaimerPage() {
  return (
    <>
      <Helmet>
        <title>Disclaimer | SmartMoneyHub</title>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate">
            <h1 className="text-4xl font-bold mb-6">Disclaimer</h1>
            <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg mb-8">
              <p className="text-destructive font-semibold m-0">Not Financial Advice</p>
              <p className="text-sm mt-2 mb-0">The content on SmartMoneyHub is for informational and educational purposes only and should not be construed as professional financial advice.</p>
            </div>
            <p>While we strive to provide accurate and up-to-date information, financial markets and products change rapidly. We make no warranties regarding the accuracy or completeness of the information provided.</p>
            <p>Always consult with a certified financial planner, tax professional, or legal counsel before making significant financial decisions.</p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default DisclaimerPage;
