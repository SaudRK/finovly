
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { TrendingUp, DollarSign, Percent, Calendar, Share2, RotateCcw, Home, Scale, PiggyBank } from 'lucide-react';
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
  { icon: TrendingUp, title: 'Compound Interest', description: 'Compound growth projections.', link: '/compound-interest-calculator' },
  { icon: PiggyBank, title: '401(k)', description: 'Model employer match.', link: '/401k-calculator' },
  { icon: Home, title: 'Mortgage', description: 'Monthly payment estimates.', link: '/mortgage-calculator' },
];

const faqs = [
  { question: 'How is this different from the compound interest calculator?', answer: 'This uses a simpler model focused on total investment return. The compound interest calculator offers more granular control including compounding frequency.' },
  { question: 'What rate of return should I use?', answer: 'The S&P 500 averages ~10% before inflation (~7% after). Use 6-7% for conservative estimates. Bond-heavy portfolios typically return 3-5%.' },
  { question: 'Does this include taxes or fees?', answer: 'No. This shows gross returns. Account fees and taxes will reduce actual returns. Use tax-advantaged accounts (Roth IRA, 401k) when possible.' },
];

function InvestmentCalculatorPage() {
  const [initial, setInitial] = useState('10000');
  const [monthly, setMonthly] = useState('500');
  const [rate, setRate] = useState('7');
  const [years, setYears] = useState('10');

  const result = useMemo(() => {
    const p = parseFloat(initial) || 0;
    const c = parseFloat(monthly) || 0;
    const r = parseFloat(rate) || 0;
    const t = parseInt(years) || 0;
    if (r <= 0 || t <= 0) return null;

    const mr = r / 100 / 12;
    const n = t * 12;
    const fvInit = p * Math.pow(1 + mr, n);
    const fvContrib = c * ((Math.pow(1 + mr, n) - 1) / mr);
    const totalValue = fvInit + fvContrib;
    const totalContrib = p + c * n;
    const totalInterest = totalValue - totalContrib;

    const chartData = [];
    for (let y = 0; y <= t; y++) {
      const months = y * 12;
      const fv1 = p * Math.pow(1 + mr, months);
      const fv2 = months > 0 ? c * ((Math.pow(1 + mr, months) - 1) / mr) : 0;
      chartData.push({ year: y, value: fv1 + fv2 });
    }

    return { totalValue, totalContrib, totalInterest, chartData };
  }, [initial, monthly, rate, years]);

  const fmt = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

  return (
    <>
      <Helmet>
        <title>Free Investment Calculator 2025 | Portfolio Growth Simulator | Finovly</title>
        <meta name="description" content="Calculate potential investment returns with monthly contributions. Free investment calculator with real-time charts. No sign-up." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://finovly.com/investment-calculator" />
        <meta property="og:title" content="Free Investment Calculator | Finovly" />
        <meta property="og:url" content="https://finovly.com/investment-calculator" />
        <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"SoftwareApplication","name":"Investment Calculator","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}`}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background grain-overlay">
        <Header />
        <main className="flex-1 py-8 md:py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <Breadcrumb items={[{ label: 'Calculators', href: '/calculators' }, { label: 'Investment' }]} />

            <div className="mb-10">
              <span className="section-label">// investment</span>
              <h1 className="text-[32px] md:text-[42px] font-extrabold text-foreground mb-3" style={{ letterSpacing: '-0.04em', lineHeight: '1.05' }}>Investment calculator</h1>
              <p className="text-base text-muted-foreground max-w-xl">Simulate portfolio growth with regular contributions over any time horizon.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
              <div className="lg:col-span-2">
                <div className="card-bento sticky top-20 space-y-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg border border-border flex items-center justify-center"><TrendingUp className="w-4 h-4 text-foreground" /></div>
                    <div><div className="text-sm font-bold text-foreground">Investment Details</div><div className="text-[11px] font-mono text-muted-foreground">Real-time projections</div></div>
                  </div>

                  {[
                    { label: 'Initial Investment', value: initial, set: setInitial, max: 500000, step: 1000, icon: DollarSign, suffix: '' },
                    { label: 'Monthly Contribution', value: monthly, set: setMonthly, max: 10000, step: 50, icon: DollarSign, suffix: '' },
                    { label: 'Annual Return', value: rate, set: setRate, max: 25, step: 0.1, icon: Percent, suffix: '%' },
                    { label: 'Time Period', value: years, set: setYears, max: 50, step: 1, icon: Calendar, suffix: ' years' },
                  ].map((f, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-1.5">
                        <Label className="text-sm font-semibold">{f.label}</Label>
                        <span className="text-sm font-bold num-display" style={{ color: 'hsl(var(--accent))' }}>{f.icon === DollarSign ? fmt(parseFloat(f.value) || 0) : `${f.value}${f.suffix}`}</span>
                      </div>
                      <Slider value={[parseFloat(f.value) || 0]} onValueChange={([v]) => f.set(String(v))} max={f.max} step={f.step} className="mb-2" />
                      <div className="relative">
                        <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input type="number" value={f.value} onChange={e => f.set(e.target.value)} className="pl-9 h-10 text-sm" step={f.step} />
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-2 pt-1">
                    <Button onClick={() => { setInitial('10000'); setMonthly('500'); setRate('7'); setYears('10'); }} variant="outline" size="sm" className="flex-1 gap-1.5 text-xs rounded-full"><RotateCcw className="w-3.5 h-3.5" /> Reset</Button>
                    <Button onClick={() => navigator.clipboard?.writeText(window.location.href)} variant="outline" size="sm" className="flex-1 gap-1.5 text-xs rounded-full"><Share2 className="w-3.5 h-3.5" /> Share</Button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3 space-y-4">
                {result ? (
                  <>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="card-bento text-center py-5" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
                        <p className="text-[10px] font-mono uppercase tracking-wider opacity-60 mb-0.5">Future Value</p>
                        <p className="text-xl md:text-2xl font-extrabold num-display">{fmt(result.totalValue)}</p>
                      </div>
                      <div className="card-bento text-center py-5">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5">Contributed</p>
                        <p className="text-xl md:text-2xl font-extrabold num-display text-foreground">{fmt(result.totalContrib)}</p>
                      </div>
                      <div className="card-bento text-center py-5">
                        <p className="text-[10px] font-mono uppercase tracking-wider mb-0.5" style={{ color: 'hsl(var(--accent))' }}>Interest Earned</p>
                        <p className="text-xl md:text-2xl font-extrabold num-display text-foreground">{fmt(result.totalInterest)}</p>
                      </div>
                    </div>
                    <div className="card-bento">
                      <h3 className="text-sm font-bold text-foreground mb-1">Growth Trajectory</h3>
                      <p className="text-[11px] font-mono text-muted-foreground mb-3">Projected over {years} years</p>
                      <GrowthChart data={result.chartData} />
                    </div>
                  </>
                ) : (
                  <div className="card-bento text-center py-20">
                    <TrendingUp className="w-10 h-10 mx-auto mb-3 text-muted-foreground/20" />
                    <p className="text-sm text-muted-foreground">Enter values to see projections</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <FAQSection faqs={faqs} title="Investment FAQ" />
          <RelatedCalculators current="/investment-calculator" calculators={relatedCalcs} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default InvestmentCalculatorPage;
