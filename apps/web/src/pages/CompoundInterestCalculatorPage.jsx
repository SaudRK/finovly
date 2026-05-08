
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Info, TrendingUp, Home, Scale, DollarSign, PiggyBank, BarChart3, CreditCard } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import CompoundInterestCalculator from '@/components/CompoundInterestCalculator.jsx';
import FAQSection from '@/components/FAQSection.jsx';
import RelatedCalculators from '@/components/RelatedCalculators.jsx';

const relatedCalcs = [
  { icon: Home, title: 'Mortgage', description: 'Calculate monthly mortgage payments.', link: '/mortgage-calculator' },
  { icon: Scale, title: 'Loan Comparison', description: 'Compare loan options side by side.', link: '/loan-comparison-calculator' },
  { icon: PiggyBank, title: '401(k)', description: 'Plan your retirement contributions.', link: '/401k-calculator' },
  { icon: BarChart3, title: 'Investment', description: 'Calculate potential returns.', link: '/investment-calculator' },
];

const faqs = [
  { question: 'What is compound interest?', answer: 'Compound interest is interest calculated on both the initial principal and accumulated interest from previous periods. It makes investments grow exponentially rather than linearly over time.' },
  { question: 'How is compound interest different from simple interest?', answer: 'Simple interest is calculated only on the original principal. Compound interest is calculated on principal plus all previously earned interest, producing significantly higher returns over long periods.' },
  { question: 'What compounding frequency should I use?', answer: 'Monthly compounding is the most common for savings accounts. More frequent compounding (daily) produces slightly higher returns, but the difference decreases as frequency increases.' },
  { question: 'What is a realistic rate of return?', answer: 'The S&P 500 averages ~10% annually before inflation (~7% after). For savings accounts, 4-5% APY is typical. Use the rate appropriate for your specific investment type.' },
  { question: 'How does the Rule of 72 work?', answer: 'Divide 72 by your annual rate to estimate doubling time. At 8%, money doubles in ~9 years (72/8=9).' },
  { question: 'Does this account for taxes?', answer: 'No, this shows pre-tax returns. Actual returns depend on account type (taxable, Roth IRA, 401k) and your tax bracket.' },
];

function CompoundInterestCalculatorPage() {
  return (
    <>
      <Helmet>
        <title>Free Compound Interest Calculator 2025 | Finovly</title>
        <meta name="description" content="Calculate how investments grow over time with compound interest. Interactive sliders, real-time charts, and year-by-year breakdowns. Free, no sign-up." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://finovly.com/compound-interest-calculator" />
        <meta property="og:title" content="Free Compound Interest Calculator | Finovly" />
        <meta property="og:url" content="https://finovly.com/compound-interest-calculator" />
        <meta name="twitter:card" content="summary" />
        <script type="application/ld+json">{`{
          "@context":"https://schema.org","@type":"SoftwareApplication","name":"Compound Interest Calculator",
          "applicationCategory":"FinanceApplication","operatingSystem":"Web",
          "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},
          "aggregateRating":{"@type":"AggregateRating","ratingValue":"4.8","ratingCount":"2450"}
        }`}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background grain-overlay">
        <Header />
        <main className="flex-1 py-8 md:py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <Breadcrumb items={[{ label: 'Calculators', href: '/calculators' }, { label: 'Compound Interest' }]} />

            <div className="mb-10">
              <span className="section-label">// compound interest</span>
              <h1 className="text-[32px] md:text-[42px] font-extrabold text-foreground mb-3" style={{ letterSpacing: '-0.04em', lineHeight: '1.05' }}>
                Compound interest calculator
              </h1>
              <p className="text-base text-muted-foreground max-w-xl">
                See how consistent investing turns into significant wealth through the power of compounding.
              </p>
            </div>

            <CompoundInterestCalculator />

            <article className="mt-16 space-y-8">
              <section className="card-bento">
                <h2 className="text-xl font-bold text-foreground mb-4">How to use this calculator</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground leading-relaxed">
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-2">The basics</h3>
                    <p className="mb-2"><strong className="text-foreground">Initial Investment:</strong> Amount you invest right now.</p>
                    <p className="mb-2"><strong className="text-foreground">Monthly Contribution:</strong> What you add every month. Consistency matters most.</p>
                    <p><strong className="text-foreground">Time Period:</strong> How long you invest. Longer = more powerful compounding.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-2">Advanced</h3>
                    <p className="mb-2"><strong className="text-foreground">Interest Rate:</strong> Expected annual return. Stock market averages 7-10% before inflation.</p>
                    <p><strong className="text-foreground">Compounding Frequency:</strong> How often interest is calculated. Monthly is most common.</p>
                  </div>
                </div>
              </section>

              <section className="card-bento">
                <h2 className="text-xl font-bold text-foreground mb-4">Understanding compound interest</h2>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                  <p>The compound interest formula is <code className="font-mono text-foreground bg-muted px-1.5 py-0.5 rounded text-xs">A = P(1 + r/n)^(nt)</code> where P is principal, r is annual rate, n is compounding frequency, and t is time in years.</p>
                  <p>$10,000 invested at 7% for 30 years grows to ~$76,123 without contributions. Add $500/month and it becomes over $680,000. Start early.</p>
                </div>
              </section>

              <section className="card-bento">
                <h2 className="text-xl font-bold text-foreground mb-3">Next steps</h2>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
                  <p>Read <Link to="/blog/start-investing-100" className="font-semibold hover:underline" style={{ color: 'hsl(var(--accent))' }}>How to Start Investing with $100</Link> for actionable tips.</p>
                  <p>Try our <Link to="/retirement-calculator" className="font-semibold hover:underline" style={{ color: 'hsl(var(--accent))' }}>Retirement Calculator</Link> or <Link to="/401k-calculator" className="font-semibold hover:underline" style={{ color: 'hsl(var(--accent))' }}>401(k) Calculator</Link> to plan ahead.</p>
                </div>
              </section>
            </article>
          </div>

          <FAQSection faqs={faqs} subtitle="About compound interest and this calculator." />
          <RelatedCalculators current="/compound-interest-calculator" calculators={relatedCalcs} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default CompoundInterestCalculatorPage;
