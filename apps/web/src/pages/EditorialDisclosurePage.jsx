
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function EditorialDisclosurePage() {
  return (
    <>
      <Helmet>
        <title>Editorial & Advertiser Disclosure | Finovly</title>
        <meta name="description" content="Learn about Finovly's editorial guidelines, transparency standards, and affiliate relationships." />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href="https://finovly.com/editorial-disclosure" />
        <meta property="og:title" content="Editorial Disclosure | Finovly" />
        <meta property="og:description" content="Learn about Finovly's editorial guidelines, transparency standards, and affiliate relationships." />
        <meta property="og:url" content="https://finovly.com/editorial-disclosure" />
        <meta property="og:image" content="https://finovly.com/finovly-logo-dark.svg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content="https://finovly.com/finovly-logo-dark.svg" />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate">
            <Breadcrumb items={[{ label: 'Editorial Disclosure' }]} />
            <h1 className="text-4xl font-bold mb-6">Editorial & Advertiser Disclosure</h1>
            <p>Transparency is core to our mission at Finovly.</p>
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
