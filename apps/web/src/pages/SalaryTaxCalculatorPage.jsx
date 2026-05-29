
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { DollarSign, Share2, RotateCcw, TrendingUp, Home, Scale, PiggyBank } from 'lucide-react';
import { Label } from '@/components/ui/label.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Slider } from '@/components/ui/slider.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import FAQSection from '@/components/FAQSection.jsx';
import RelatedCalculators from '@/components/RelatedCalculators.jsx';

const relatedCalcs = [
  { icon: TrendingUp, title: 'Compound Interest', description: 'Project wealth growth with compounding.', link: '/compound-interest-calculator' },
  { icon: Home, title: 'Mortgage', description: 'Monthly mortgage payment estimates.', link: '/mortgage-calculator' },
  { icon: PiggyBank, title: '401(k)', description: 'Model employer match and retirement.', link: '/401k-calculator' },
];

const faqs = [
  { question: 'What taxes are included?', answer: 'Federal income tax (2024 brackets, single filer) and FICA (Social Security at 6.2% up to $168,600 + Medicare at 1.45%). State and local taxes are not included.' },
  { question: 'Why is my actual paycheck different?', answer: 'Actual pay varies based on filing status, deductions, credits, state/local taxes, pre-tax benefits (401k, health insurance), and employer withholding choices.' },
  { question: 'What is FICA?', answer: 'FICA stands for Federal Insurance Contributions Act. It funds Social Security (6.2%) and Medicare (1.45%). Both you and your employer pay these taxes.' },
];

function SalaryTaxCalculatorPage() {
  const [salary, setSalary] = useState('75000');

  const result = useMemo(() => {
    const gross = parseFloat(salary) || 0;
    if (gross <= 0) return null;

    const standardDeduction = 14600;
    let taxableIncome = Math.max(0, gross - standardDeduction);
    let federalTax = 0;

    const brackets = [
      { limit: 11600, rate: 0.10 },
      { limit: 47150, rate: 0.12 },
      { limit: 100525, rate: 0.22 },
      { limit: 191950, rate: 0.24 },
      { limit: 243725, rate: 0.32 },
      { limit: 609350, rate: 0.35 },
      { limit: Infinity, rate: 0.37 }
    ];

    let prev = 0;
    for (const b of brackets) {
      if (taxableIncome > prev) {
        federalTax += (Math.min(taxableIncome, b.limit) - prev) * b.rate;
        prev = b.limit;
      } else break;
    }

    const ss = Math.min(gross, 168600) * 0.062;
    const medicare = gross * 0.0145;
    const fica = ss + medicare;
    const totalTax = federalTax + fica;
    const netPay = gross - totalTax;

    return { gross, federalTax, fica, totalTax, netPay, monthlyNet: netPay / 12, biweeklyNet: netPay / 26, effectiveRate: (totalTax / gross) * 100 };
  }, [salary]);

  const fmt = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

  return (
    <>
      <Helmet>
        <title>Free Salary & Tax Calculator 2026 | Take-Home Pay Estimator | Finovly</title>
        <meta name="description" content="Calculate your take-home pay after federal taxes and FICA deductions. Free salary calculator with real-time results. No sign-up required." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://finovly.com/salary-tax-calculator" />
        <meta property="og:title" content="Free Salary & Tax Calculator | Finovly" />
        <meta property="og:url" content="https://finovly.com/salary-tax-calculator" />
        <meta property="og:image" content="https://finovly.com/og-image.png" />
        <meta name="twitter:image" content="https://finovly.com/og-image.png" />
        <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Salary Tax Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}`}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background grain-overlay">
        <Header />
        <main className="flex-1 py-8 md:py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <Breadcrumb items={[{ label: 'Calculators', href: '/calculators' }, { label: 'Salary & Tax' }]} />

            <div className="mb-10">
              <span className="section-label">// salary & tax</span>
              <h1 className="text-[32px] md:text-[42px] font-extrabold text-foreground mb-3" style={{ letterSpacing: '-0.04em', lineHeight: '1.05' }}>
                Salary & tax calculator
              </h1>
              <p className="text-base text-muted-foreground max-w-xl">
                Estimate your take-home pay after federal income tax and payroll deductions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
              {/* Input */}
              <div className="lg:col-span-2">
                <div className="card-bento sticky top-20 space-y-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg border border-border flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">Income Details</div>
                      <div className="text-[11px] font-mono text-muted-foreground">2024 federal brackets, single filer</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5">
                      <Label className="text-sm font-semibold">Gross Annual Salary</Label>
                      <span className="text-sm font-bold num-display" style={{ color: 'hsl(var(--accent))' }}>{fmt(parseFloat(salary) || 0)}</span>
                    </div>
                    <Slider value={[parseFloat(salary) || 0]} onValueChange={([v]) => setSalary(String(v))} max={500000} step={1000} className="mb-2" />
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type="number" value={salary} onChange={e => setSalary(e.target.value)} className="pl-9 h-10 text-sm" />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <Button onClick={() => setSalary('75000')} variant="outline" size="sm" className="flex-1 gap-1.5 text-xs rounded-full"><RotateCcw className="w-3.5 h-3.5" /> Reset</Button>
                    <Button onClick={() => navigator.clipboard?.writeText(window.location.href)} variant="outline" size="sm" className="flex-1 gap-1.5 text-xs rounded-full"><Share2 className="w-3.5 h-3.5" /> Share</Button>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="lg:col-span-3 space-y-4">
                {result ? (
                  <>
                    <div className="card-bento text-center py-8" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
                      <p className="text-[11px] font-mono uppercase tracking-wider opacity-60 mb-1">Estimated Annual Take-Home</p>
                      <p className="text-4xl md:text-5xl font-extrabold num-display" style={{ letterSpacing: '-0.03em' }}>{fmt(result.netPay)}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="card-bento text-center py-4">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5">Monthly</p>
                        <p className="text-lg font-bold num-display text-foreground">{fmt(result.monthlyNet)}</p>
                      </div>
                      <div className="card-bento text-center py-4">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5">Bi-weekly</p>
                        <p className="text-lg font-bold num-display text-foreground">{fmt(result.biweeklyNet)}</p>
                      </div>
                    </div>

                    <div className="card-bento">
                      <h3 className="text-sm font-bold text-foreground mb-4">Tax Breakdown</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">Gross Income</span><span className="font-semibold num-display text-foreground">{fmt(result.gross)}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Federal Income Tax</span><span className="font-semibold num-display text-destructive">{fmt(result.federalTax)}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">FICA (SS + Medicare)</span><span className="font-semibold num-display text-destructive">{fmt(result.fica)}</span></div>
                        <div className="flex justify-between pt-2 border-t border-border"><span className="font-bold text-foreground">Total Tax</span><span className="font-bold num-display text-destructive">{fmt(result.totalTax)}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Effective Rate</span><span className="font-semibold num-display" style={{ color: 'hsl(var(--accent))' }}>{result.effectiveRate.toFixed(1)}%</span></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="card-bento text-center py-20">
                    <DollarSign className="w-10 h-10 mx-auto mb-3 text-muted-foreground/20" />
                    <p className="text-sm text-muted-foreground">Enter a salary to see your take-home estimate</p>
                  </div>
                )}
              </div>
            </div>

            <article className="mt-16 card-bento">
              <h2 className="text-xl font-bold text-foreground mb-4">How to use this calculator</h2>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p>Enter your gross annual salary. Results update automatically. This uses 2024 federal tax brackets for single filers with standard deduction ($14,600).</p>
                <p>For a more complete picture, account for state taxes, pre-tax deductions (401k, health insurance), and tax credits which can significantly change your take-home pay.</p>
                <p>Compare with our <Link to="/compound-interest-calculator" className="font-semibold hover:underline" style={{ color: 'hsl(var(--accent))' }}>Compound Interest Calculator</Link> to see how investing a portion of your take-home can grow over time.</p>
              </div>
            </article>
          </div>

          <FAQSection faqs={faqs} title="Salary tax FAQ" />
          <RelatedCalculators current="/salary-tax-calculator" calculators={relatedCalcs} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default SalaryTaxCalculatorPage;
