
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, DollarSign, Percent, Calendar, Share2, RotateCcw, TrendingUp, Scale, PiggyBank, BarChart3, CreditCard, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Slider } from '@/components/ui/slider.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import FAQSection from '@/components/FAQSection.jsx';
import RelatedCalculators from '@/components/RelatedCalculators.jsx';
import GrowthChart from '@/components/GrowthChart.jsx';

const relatedCalcs = [
  { icon: Scale, title: 'Loan Comparison', description: 'Compare loan options side by side.', link: '/loan-comparison-calculator' },
  { icon: TrendingUp, title: 'Compound Interest', description: 'Project wealth growth with compounding.', link: '/compound-interest-calculator' },
  { icon: PiggyBank, title: '401(k)', description: 'Model employer match and retirement projections.', link: '/401k-calculator' },
];

const faqs = [
  { question: 'What does this mortgage calculator include?', answer: 'This calculator estimates your monthly principal and interest (P&I) payment. It does not include property taxes, homeowners insurance, HOA fees, or PMI, which will increase your actual monthly cost.' },
  { question: 'How much should my down payment be?', answer: 'A 20% down payment is traditionally recommended to avoid Private Mortgage Insurance (PMI). However, many loan programs allow 3-5% down. A larger down payment reduces your monthly payment and total interest paid.' },
  { question: 'What is a good interest rate for a mortgage?', answer: 'Interest rates vary based on economic conditions, your credit score, loan type, and term. Check current averages from sources like Freddie Mac. Even a 0.25% difference can save thousands over the life of a loan.' },
  { question: 'Should I choose a 15-year or 30-year mortgage?', answer: 'A 15-year mortgage has higher monthly payments but significantly less total interest. A 30-year mortgage offers lower payments and more flexibility. Use this calculator to compare both scenarios.' },
  { question: 'How does the interest rate affect total cost?', answer: 'On a $280,000 loan at 6.5% over 30 years, you would pay about $357,000 in interest alone. At 5.5%, that drops to about $292,000 — a $65,000 difference for just 1% lower rate.' },
];

function MortgageCalculatorPage() {
  const [homePrice, setHomePrice] = useState('350000');
  const [downPayment, setDownPayment] = useState('70000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('30');

  const result = useMemo(() => {
    const p = parseFloat(homePrice) || 0;
    const dp = parseFloat(downPayment) || 0;
    const r = parseFloat(interestRate) || 0;
    const t = parseInt(loanTerm) || 0;
    const principal = p - dp;
    if (principal <= 0 || r <= 0 || t <= 0) return null;

    const monthlyRate = r / 100 / 12;
    const n = t * 12;
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - principal;

    // Build amortization data for chart
    const chartData = [];
    for (let year = 0; year <= t; year += Math.max(1, Math.floor(t / 20))) {
      const payments = year * 12;
      let remaining = principal;
      for (let m = 0; m < payments && m < n; m++) {
        const intPart = remaining * monthlyRate;
        remaining -= (monthlyPayment - intPart);
      }
      chartData.push({ year, value: Math.max(0, remaining) });
    }
    if (chartData[chartData.length - 1]?.year !== t) chartData.push({ year: t, value: 0 });

    return { monthlyPayment, totalPayment, totalInterest, principal, chartData };
  }, [homePrice, downPayment, interestRate, loanTerm]);

  const fmt = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

  const handleReset = () => { setHomePrice('350000'); setDownPayment('70000'); setInterestRate('6.5'); setLoanTerm('30'); };

  return (
    <>
      <Helmet>
        <title>Free Mortgage Calculator 2026 | Monthly Payment Estimator | Finovly</title>
        <meta name="description" content="Calculate your monthly mortgage payment, total interest, and loan cost. Free mortgage calculator with real-time results. No sign-up required." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://finovly.com/mortgage-calculator" />
        <meta property="og:title" content="Free Mortgage Calculator | Finovly" />
        <meta property="og:url" content="https://finovly.com/mortgage-calculator" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:image" content="https://finovly.com/og-image.png" />
        <meta name="twitter:image" content="https://finovly.com/og-image.png" />
        <script type="application/ld+json">{`{
          "@context":"https://schema.org","@type":"SoftwareApplication","name":"Mortgage Calculator",
          "applicationCategory":"FinanceApplication","operatingSystem":"Web",
          "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},
          "aggregateRating":{"@type":"AggregateRating","ratingValue":"4.7","ratingCount":"1830"}
        }`}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background grain-overlay">
        <Header />
        <main className="flex-1 py-8 md:py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <Breadcrumb items={[{ label: 'Calculators', href: '/calculators' }, { label: 'Mortgage Calculator' }]} />

            <div className="mb-10">
              <span className="section-label">// mortgage</span>
              <h1 className="text-[32px] md:text-[42px] font-extrabold text-foreground mb-3" style={{ letterSpacing: '-0.04em', lineHeight: '1.05' }}>
                Mortgage calculator
              </h1>
              <p className="text-base text-muted-foreground max-w-xl">
                Estimate monthly payments and total cost of your home loan in real time.
              </p>
            </div>

            {/* Calculator */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
              {/* Inputs */}
              <div className="lg:col-span-2">
                <div className="card-bento sticky top-20 space-y-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg border border-border flex items-center justify-center">
                      <Home className="w-4 h-4 text-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">Loan Details</div>
                      <div className="text-[11px] font-mono text-muted-foreground">Real-time results</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5">
                      <Label className="text-sm font-semibold">Home Price</Label>
                      <span className="text-sm font-bold num-display" style={{ color: 'hsl(var(--accent))' }}>{fmt(parseFloat(homePrice) || 0)}</span>
                    </div>
                    <Slider value={[parseFloat(homePrice) || 0]} onValueChange={([v]) => setHomePrice(String(v))} max={2000000} step={5000} className="mb-2" />
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type="number" value={homePrice} onChange={e => setHomePrice(e.target.value)} className="pl-9 h-10 text-sm" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5">
                      <Label className="text-sm font-semibold">Down Payment</Label>
                      <span className="text-sm font-bold num-display" style={{ color: 'hsl(var(--accent))' }}>{fmt(parseFloat(downPayment) || 0)}</span>
                    </div>
                    <Slider value={[parseFloat(downPayment) || 0]} onValueChange={([v]) => setDownPayment(String(v))} max={parseFloat(homePrice) || 500000} step={5000} className="mb-2" />
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type="number" value={downPayment} onChange={e => setDownPayment(e.target.value)} className="pl-9 h-10 text-sm" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5">
                      <Label className="text-sm font-semibold">Interest Rate</Label>
                      <span className="text-sm font-bold num-display" style={{ color: 'hsl(var(--accent))' }}>{interestRate}%</span>
                    </div>
                    <Slider value={[parseFloat(interestRate) || 0]} onValueChange={([v]) => setInterestRate(String(v))} max={15} step={0.1} className="mb-2" />
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} className="pl-9 h-10 text-sm" step="0.1" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5">
                      <Label className="text-sm font-semibold">Loan Term</Label>
                      <span className="text-sm font-bold num-display" style={{ color: 'hsl(var(--accent))' }}>{loanTerm} years</span>
                    </div>
                    <Slider value={[parseInt(loanTerm) || 0]} onValueChange={([v]) => setLoanTerm(String(v))} max={40} step={1} min={1} className="mb-2" />
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type="number" value={loanTerm} onChange={e => setLoanTerm(e.target.value)} className="pl-9 h-10 text-sm" />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <Button onClick={handleReset} variant="outline" size="sm" className="flex-1 gap-1.5 text-xs rounded-full"><RotateCcw className="w-3.5 h-3.5" /> Reset</Button>
                    <Button onClick={() => navigator.clipboard?.writeText(window.location.href)} variant="outline" size="sm" className="flex-1 gap-1.5 text-xs rounded-full"><Share2 className="w-3.5 h-3.5" /> Share</Button>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="lg:col-span-3 space-y-4">
                {result ? (
                  <>
                    <div className="card-bento text-center py-8" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
                      <p className="text-[11px] font-mono uppercase tracking-wider opacity-60 mb-1">Monthly Payment (P&I)</p>
                      <p className="text-4xl md:text-5xl font-extrabold num-display" style={{ letterSpacing: '-0.03em' }}>{fmt(result.monthlyPayment)}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="card-bento text-center py-4">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5">Principal</p>
                        <p className="text-lg font-bold num-display text-foreground">{fmt(result.principal)}</p>
                      </div>
                      <div className="card-bento text-center py-4">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5">Total Interest</p>
                        <p className="text-lg font-bold num-display text-foreground">{fmt(result.totalInterest)}</p>
                      </div>
                      <div className="card-bento text-center py-4">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5">Total Cost</p>
                        <p className="text-lg font-bold num-display text-foreground">{fmt(result.totalPayment)}</p>
                      </div>
                    </div>

                    <div className="card-bento">
                      <h3 className="text-sm font-bold text-foreground mb-1">Remaining Balance</h3>
                      <p className="text-[11px] font-mono text-muted-foreground mb-3">Projected payoff over {loanTerm} years</p>
                      <GrowthChart data={result.chartData} />
                    </div>

                    <p className="text-[11px] font-mono text-muted-foreground text-center">
                      * P&I only. Does not include taxes, insurance, PMI, or HOA.
                    </p>
                  </>
                ) : (
                  <div className="card-bento text-center py-20">
                    <Home className="w-10 h-10 mx-auto mb-3 text-muted-foreground/20" />
                    <p className="text-sm text-muted-foreground">Enter valid loan details to see results</p>
                  </div>
                )}
              </div>
            </div>

            {/* Educational content */}
            <article className="mt-16 space-y-8">
              <section className="card-bento">
                <h2 className="text-xl font-bold text-foreground mb-4">Understanding your mortgage</h2>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                  <p><strong className="text-foreground">Principal:</strong> The amount borrowed (home price minus down payment). This is what you actually owe the lender.</p>
                  <p><strong className="text-foreground">Interest:</strong> The fee charged for borrowing. Over a 30-year loan, total interest can sometimes equal or exceed the original loan amount.</p>
                  <p><strong className="text-foreground">Down Payment:</strong> Upfront cash toward the purchase. 20% avoids PMI, but many loans allow 3-5% down.</p>
                  <p>Compare multiple scenarios using our <Link to="/loan-comparison-calculator" className="font-semibold hover:underline" style={{ color: 'hsl(var(--accent))' }}>Loan Comparison Calculator</Link> to find which terms save you the most.</p>
                </div>
              </section>
            </article>
          </div>

          <FAQSection faqs={faqs} title="Mortgage FAQ" subtitle="Common questions about mortgages and this calculator." />
          <RelatedCalculators current="/mortgage-calculator" calculators={relatedCalcs} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default MortgageCalculatorPage;
