
import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function EditorialDisclosurePage() {
  return (
    <>
      <Helmet>
        <title>Editorial Disclosure | SmartMoneyHub</title>
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate">
            <Breadcrumb items={[{ label: 'Editorial Disclosure' }]} />
            <h1 className="text-4xl font-bold mb-6">Editorial & Advertiser Disclosure</h1>
            <p>Transparency is core to our mission at SmartMoneyHub.</p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Affiliate Relationships</h2>
            <p>Some of the links on our site are affiliate links. This means that if you click on the link and purchase an item or open an account, we may receive an affiliate commission at no extra cost to you.</p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Editorial Independence</h2>
            <p>Our editorial content is not influenced by our advertisers. We maintain a strict separation between our editorial team and our revenue team. Ratings and reviews are based entirely on objective criteria and the expert opinions of our writers.</p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default EditorialDisclosurePage;
