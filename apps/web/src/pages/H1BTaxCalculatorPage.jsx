
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { DollarSign, Share2, RotateCcw, Globe, Calculator, FileText, Briefcase } from 'lucide-react';
import { Label } from '@/components/ui/label.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Slider } from '@/components/ui/slider.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import FAQSection from '@/components/FAQSection.jsx';
import RelatedCalculators from '@/components/RelatedCalculators.jsx';

const STATE_TAXES = {
  'none': { label: 'No State Tax (TX, FL, WA, etc.)', rate: 0 },
  'CA': { label: 'California', rate: 0.0725 },
  'NY': { label: 'New York', rate: 0.0685 },
  'NJ': { label: 'New Jersey', rate: 0.0637 },
  'IL': { label: 'Illinois', rate: 0.0495 },
  'PA': { label: 'Pennsylvania', rate: 0.0307 },
  'MA': { label: 'Massachusetts', rate: 0.05 },
  'GA': { label: 'Georgia', rate: 0.055 },
  'VA': { label: 'Virginia', rate: 0.0575 },
  'NC': { label: 'North Carolina', rate: 0.0475 },
  'MI': { label: 'Michigan', rate: 0.0425 },
  'OH': { label: 'Ohio', rate: 0.04 },
  'AZ': { label: 'Arizona', rate: 0.025 },
  'CO': { label: 'Colorado', rate: 0.044 },
  'MN': { label: 'Minnesota', rate: 0.0685 },
  'WI': { label: 'Wisconsin', rate: 0.0533 },
  'MD': { label: 'Maryland', rate: 0.0575 },
  'CT': { label: 'Connecticut', rate: 0.06 },
  'OR': { label: 'Oregon', rate: 0.09 },
  'IN': { label: 'Indiana', rate: 0.0305 },
  'MO': { label: 'Missouri', rate: 0.048 },
};

const FILING_STATUS = [
  { value: 'single', label: 'Single' },
  { value: 'mfj', label: 'Married Filing Jointly' },
  { value: 'mfs', label: 'Married Filing Separately' },
];

const BRACKETS_2024 = {
  single: [
    { limit: 11600, rate: 0.10 },
    { limit: 47150, rate: 0.12 },
    { limit: 100525, rate: 0.22 },
    { limit: 191950, rate: 0.24 },
    { limit: 243725, rate: 0.32 },
    { limit: 609350, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ],
  mfj: [
    { limit: 23200, rate: 0.10 },
    { limit: 94300, rate: 0.12 },
    { limit: 201050, rate: 0.22 },
    { limit: 383900, rate: 0.24 },
    { limit: 487450, rate: 0.32 },
    { limit: 731200, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ],
  mfs: [
    { limit: 11600, rate: 0.10 },
    { limit: 47150, rate: 0.12 },
    { limit: 100525, rate: 0.22 },
    { limit: 191950, rate: 0.24 },
    { limit: 243725, rate: 0.32 },
    { limit: 365600, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ],
};

const STD_DEDUCTION = { single: 14600, mfj: 29200, mfs: 14600 };

const relatedCalcs = [
  { icon: Globe, title: 'Substantial Presence Test', description: 'Check your IRS tax residency status.', link: '/substantial-presence-test-calculator' },
  { icon: Calculator, title: 'F1 OPT Tax Calculator', description: 'Tax estimates for F1 students on OPT.', link: '/f1-opt-tax-calculator' },
  { icon: FileText, title: 'Remittance Fee Calculator', description: 'Compare transfer fees and exchange rates.', link: '/remittance-fee-calculator' },
];

const faqs = [
  { question: 'Do H1B visa holders pay the same taxes as U.S. citizens?', answer: 'Yes. H1B holders who meet the Substantial Presence Test are treated as resident aliens and taxed on worldwide income at the same federal rates as U.S. citizens. They pay federal income tax, Social Security (6.2%), and Medicare (1.45%).' },
  { question: 'Can H1B holders claim the standard deduction?', answer: 'Yes. As resident aliens, H1B holders can claim the full standard deduction ($14,600 for single filers in 2024). They can also itemize deductions if that results in a lower tax liability.' },
  { question: 'Are H1B holders exempt from FICA taxes?', answer: 'No. Unlike F1 students, H1B visa holders are NOT exempt from FICA (Social Security and Medicare) taxes. Both the employee and employer share pays these taxes.' },
  { question: 'What about state income taxes?', answer: 'State taxes depend on where you live and work. States like Texas, Florida, and Washington have no state income tax. Others like California and New York have rates exceeding 6-9%. This calculator includes estimated state tax for the most common states.' },
  { question: 'Should I contribute to a 401(k) on H1B?', answer: 'Generally yes. 401(k) contributions are pre-tax, reducing your taxable income. If your employer offers a match, contributing at least enough to get the full match is usually recommended. However, consider your long-term plans — if you may leave the U.S., understand the implications for your 401(k) balance.' },
  { question: 'Can I use tax treaty benefits on H1B?', answer: 'Most tax treaty benefits are for nonresident aliens. Since H1B holders typically qualify as resident aliens, treaty benefits are usually limited. However, some treaties (e.g., India, China) have specific provisions that may still apply. Consult a tax professional for treaty-specific advice.' },
];

function H1BTaxCalculatorPage() {
  const [salary, setSalary] = useState('110000');
  const [state, setState] = useState('none');
  const [filing, setFiling] = useState('single');
  const [dependents, setDependents] = useState('0');
  const [preTax401k, setPreTax401k] = useState('0');

  const result = useMemo(() => {
    const gross = parseFloat(salary) || 0;
    if (gross <= 0) return null;

    const contrib401k = Math.min(parseFloat(preTax401k) || 0, 23000);
    const stdDeduction = STD_DEDUCTION[filing];
    const taxableIncome = Math.max(0, gross - stdDeduction - contrib401k);

    // Federal tax
    let federalTax = 0;
    const brackets = BRACKETS_2024[filing];
    let prev = 0;
    for (const b of brackets) {
      if (taxableIncome > prev) {
        federalTax += (Math.min(taxableIncome, b.limit) - prev) * b.rate;
        prev = b.limit;
      } else break;
    }

    // FICA
    const ss = Math.min(gross, 168600) * 0.062;
    const medicare = gross * 0.0145;
    const additionalMedicare = gross > 200000 ? (gross - 200000) * 0.009 : 0;
    const fica = ss + medicare + additionalMedicare;

    // State tax (simplified)
    const stateInfo = STATE_TAXES[state];
    const stateTax = taxableIncome * (stateInfo?.rate || 0);

    const totalTax = federalTax + fica + stateTax;
    const netAnnual = gross - totalTax - contrib401k;
    const effectiveRate = (totalTax / gross) * 100;

    return {
      gross,
      taxableIncome,
      federalTax,
      fica,
      ss,
      medicare: medicare + additionalMedicare,
      stateTax,
      totalTax,
      netAnnual,
      monthlyNet: netAnnual / 12,
      biweeklyNet: netAnnual / 26,
      effectiveRate,
      contrib401k,
    };
  }, [salary, state, filing, dependents, preTax401k]);

  const fmt = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

  const handleReset = () => {
    setSalary('110000');
    setState('none');
    setFiling('single');
    setDependents('0');
    setPreTax401k('0');
  };

  return (
    <>
      <Helmet>
        <title>Free H1B Tax Calculator 2026 | Visa Holder Tax Estimator | Finovly</title>
        <meta name="description" content="Estimate your federal, state, and FICA taxes as an H1B visa holder. Free H1B tax calculator with real-time results. Includes 401(k) deductions." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://finovly.com/h1b-tax-calculator" />
        <meta property="og:title" content="Free H1B Tax Calculator | Finovly" />
        <meta property="og:description" content="Calculate your take-home pay as an H1B visa holder. Includes federal, state, and FICA taxes." />
        <meta property="og:url" content="https://finovly.com/h1b-tax-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://finovly.com/finovly-logo-dark.svg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Free H1B Tax Calculator | Finovly" />
        <meta name="twitter:description" content="Calculate your take-home pay as an H1B visa holder. Includes federal, state, and FICA taxes." />
        <meta name="twitter:image" content="https://finovly.com/finovly-logo-dark.svg" />
        <script type="application/ld+json">{`{
          "@context":"https://schema.org","@type":"SoftwareApplication","name":"H1B Tax Calculator",
          "applicationCategory":"FinanceApplication","operatingSystem":"Web",
          "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},
          "description":"Free tax calculator for H1B visa holders. Estimates federal, state, and FICA taxes."
        }`}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background grain-overlay">
        <Header />
        <main className="flex-1 py-8 md:py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <Breadcrumb items={[{ label: 'Calculators', href: '/calculators' }, { label: 'H1B Tax Calculator' }]} />

            <div className="mb-10">
              <span className="section-label">// h1b taxes</span>
              <h1 className="text-[32px] md:text-[42px] font-extrabold text-foreground mb-3" style={{ letterSpacing: '-0.04em', lineHeight: '1.05' }}>
                H1B tax calculator
              </h1>
              <p className="text-base text-muted-foreground max-w-xl">
                Estimate your take-home pay as an H1B visa holder after federal, state, and FICA taxes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
              {/* Inputs */}
              <div className="lg:col-span-2">
                <div className="card-bento sticky top-20 space-y-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg border border-border flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">H1B Income Details</div>
                      <div className="text-[11px] font-mono text-muted-foreground">2024 federal brackets</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5">
                      <Label className="text-sm font-semibold">Annual Gross Salary</Label>
                      <span className="text-sm font-bold num-display" style={{ color: 'hsl(var(--accent))' }}>{fmt(parseFloat(salary) || 0)}</span>
                    </div>
                    <Slider value={[parseFloat(salary) || 0]} onValueChange={([v]) => setSalary(String(v))} max={500000} step={1000} className="mb-2" />
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type="number" value={salary} onChange={e => setSalary(e.target.value)} className="pl-9 h-10 text-sm" />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-1.5 block">State of Employment</Label>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger className="h-10 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(STATE_TAXES).map(([key, val]) => (
                          <SelectItem key={key} value={key}>{val.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-1.5 block">Filing Status</Label>
                    <Select value={filing} onValueChange={setFiling}>
                      <SelectTrigger className="h-10 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {FILING_STATUS.map(s => (
                          <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5">
                      <Label className="text-sm font-semibold">401(k) Contribution</Label>
                      <span className="text-sm font-bold num-display" style={{ color: 'hsl(var(--accent))' }}>{fmt(parseFloat(preTax401k) || 0)}</span>
                    </div>
                    <Slider value={[parseFloat(preTax401k) || 0]} onValueChange={([v]) => setPreTax401k(String(v))} max={23000} step={500} className="mb-2" />
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type="number" value={preTax401k} onChange={e => setPreTax401k(e.target.value)} className="pl-9 h-10 text-sm" />
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
                      <p className="text-[11px] font-mono uppercase tracking-wider opacity-60 mb-1">Estimated Annual Take-Home</p>
                      <p className="text-4xl md:text-5xl font-extrabold num-display" style={{ letterSpacing: '-0.03em' }}>{fmt(result.netAnnual)}</p>
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
                        {result.contrib401k > 0 && (
                          <div className="flex justify-between"><span className="text-muted-foreground">401(k) Contribution</span><span className="font-semibold num-display" style={{ color: 'hsl(var(--accent))' }}>−{fmt(result.contrib401k)}</span></div>
                        )}
                        <div className="flex justify-between"><span className="text-muted-foreground">Taxable Income</span><span className="font-semibold num-display text-foreground">{fmt(result.taxableIncome)}</span></div>
                        <div className="border-t border-border pt-2"></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Federal Income Tax</span><span className="font-semibold num-display text-destructive">{fmt(result.federalTax)}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Social Security (6.2%)</span><span className="font-semibold num-display text-destructive">{fmt(result.ss)}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Medicare (1.45%)</span><span className="font-semibold num-display text-destructive">{fmt(result.medicare)}</span></div>
                        {result.stateTax > 0 && (
                          <div className="flex justify-between"><span className="text-muted-foreground">State Tax</span><span className="font-semibold num-display text-destructive">{fmt(result.stateTax)}</span></div>
                        )}
                        <div className="flex justify-between pt-2 border-t border-border"><span className="font-bold text-foreground">Total Tax</span><span className="font-bold num-display text-destructive">{fmt(result.totalTax)}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Effective Tax Rate</span><span className="font-semibold num-display" style={{ color: 'hsl(var(--accent))' }}>{result.effectiveRate.toFixed(1)}%</span></div>
                      </div>
                    </div>

                    <p className="text-[11px] font-mono text-muted-foreground text-center">
                      * Estimate only. Does not include local taxes, itemized deductions, or tax credits. Consult a tax professional.
                    </p>
                  </>
                ) : (
                  <div className="card-bento text-center py-20">
                    <DollarSign className="w-10 h-10 mx-auto mb-3 text-muted-foreground/20" />
                    <p className="text-sm text-muted-foreground">Enter your salary to see your H1B tax estimate</p>
                  </div>
                )}
              </div>
            </div>

            <article className="mt-16 space-y-8">
              <section className="card-bento">
                <h2 className="text-xl font-bold text-foreground mb-4">Understanding H1B visa taxes</h2>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                  <p>As an H1B visa holder, the U.S. tax system treats you as a <strong className="text-foreground">resident alien</strong> once you meet the Substantial Presence Test. This means you pay the same federal income taxes as American citizens — including Social Security and Medicare (FICA) contributions.</p>
                  <p>Your tax liability depends on several factors: your gross salary, filing status, state of employment, and any pre-tax deductions like 401(k) contributions or HSA accounts. Understanding your effective tax rate helps you plan your finances, especially when considering how much to save, invest, or send home.</p>
                  <p>Not sure if you qualify as a resident alien? Use our <Link to="/substantial-presence-test-calculator" className="font-semibold hover:underline" style={{ color: 'hsl(var(--accent))' }}>Substantial Presence Test Calculator</Link> to check your tax residency status based on your days in the U.S.</p>
                </div>
              </section>

              <section className="card-bento">
                <h2 className="text-xl font-bold text-foreground mb-4">H1B tax tips to maximize take-home pay</h2>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                  <p><strong className="text-foreground">Maximize 401(k) contributions:</strong> The 2024 limit is $23,000. Every dollar contributed reduces your taxable income dollar-for-dollar, and if your employer matches, that's free money.</p>
                  <p><strong className="text-foreground">Consider your state:</strong> Moving from California (7.25% state tax) to Texas (0% state tax) on a $120,000 salary could save you over $6,000 per year in state taxes alone.</p>
                  <p><strong className="text-foreground">HSA contributions:</strong> If your employer offers a High Deductible Health Plan, you can contribute up to $4,150 (single) pre-tax to a Health Savings Account, further reducing your taxable income.</p>
                </div>
              </section>
            </article>
          </div>

          <FAQSection faqs={faqs} title="H1B Tax FAQ" subtitle="Common tax questions for H1B visa holders." />
          <RelatedCalculators current="/h1b-tax-calculator" calculators={relatedCalcs} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default H1BTaxCalculatorPage;
