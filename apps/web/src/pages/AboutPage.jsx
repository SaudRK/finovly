
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';

function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Finovly | Free Financial Tools & Guides</title>
        <meta name="description" content="Learn about Finovly's mission to help people make confident financial decisions with free, unbiased tools and guides." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://finovly.com/about" />
        <meta property="og:title" content="About Finovly" />
        <meta property="og:url" content="https://finovly.com/about" />
        <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"AboutPage","name":"About Finovly","url":"https://finovly.com/about"}`}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background grain-overlay">
        <Header />
        <main className="flex-1 py-8 md:py-14 px-4">
          <div className="max-w-2xl mx-auto">
            <Breadcrumb items={[{ label: 'About' }]} />

            <div className="mb-12">
              <span className="section-label">// about</span>
              <h1 className="text-[36px] md:text-[48px] font-extrabold text-foreground mb-4" style={{ letterSpacing: '-0.04em', lineHeight: '1.05' }}>
                Built for clarity,<br />not complexity
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                We help people make confident financial decisions with free, unbiased tools and expert guides.
              </p>
            </div>

            <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">
              <section className="card-bento">
                <h2 className="text-lg font-bold text-foreground mb-3">Our mission</h2>
                <p>Personal finance shouldn't require a degree. We build clear, accurate, and easy-to-use tools that empower you to take control of your financial future. No jargon, no paywalls, no data harvesting.</p>
              </section>

              <section className="card-bento">
                <h2 className="text-lg font-bold text-foreground mb-3">Editorial standards</h2>
                <p>Trust is our most valuable asset. Our editorial team operates independently from business operations. Every article, review, and calculator is fact-checked and updated regularly. Advertiser relationships never dictate our recommendations.</p>
              </section>

              <section className="card-bento">
                <h2 className="text-lg font-bold text-foreground mb-3">How we make money</h2>
                <p className="mb-3">Finovly is free for everyone. To sustain operations:</p>
                <ul className="space-y-2 pl-4">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-foreground mt-2 flex-shrink-0" />
                    <span><strong className="text-foreground">Affiliate partnerships:</strong> If you click a partner link and open an account, we may receive a commission. These are clearly disclosed.</span>
                  </li>
                </ul>
              </section>

              <section className="card-bento">
                <h2 className="text-lg font-bold text-foreground mb-3">Popular tools</h2>
                <ul className="space-y-2">
                  {[
                    { to: '/compound-interest-calculator', label: 'Compound Interest Calculator', desc: 'for long-term investing' },
                    { to: '/mortgage-calculator', label: 'Mortgage Calculator', desc: 'for home buying' },
                    { to: '/blog/start-investing-100', label: 'How to Start Investing with $100', desc: 'for beginners' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[hsl(var(--accent))] mt-2 flex-shrink-0" />
                      <span>
                        <Link to={item.to} className="font-semibold text-foreground hover:underline" style={{ color: 'hsl(var(--accent))' }}>{item.label}</Link>
                        {' '}<span className="text-muted-foreground">{item.desc}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default AboutPage;
