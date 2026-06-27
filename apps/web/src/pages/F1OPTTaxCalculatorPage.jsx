
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { GraduationCap, DollarSign, Share2, RotateCcw, Globe, Briefcase, FileText, Info } from 'lucide-react';
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
  'OH': { label: 'Ohio', rate: 0.04 },
  'AZ': { label: 'Arizona', rate: 0.025 },
  'CO': { label: 'Colorado', rate: 0.044 },
  'MN': { label: 'Minnesota', rate: 0.0685 },
  'OR': { label: 'Oregon', rate: 0.09 },
};

const NR_BRACKETS_2024 = [
  { limit: 11600, rate: 0.10 },
  { limit: 47150, rate: 0.12 },
  { limit: 100525, rate: 0.22 },
  { limit: 191950, rate: 0.24 },
  { limit: 243725, rate: 0.32 },
  { limit: 609350, rate: 0.35 },
  { limit: Infinity, rate: 0.37 },
];

const TREATY_COUNTRIES = [
  { value: 'none', label: 'No Treaty / Not Applicable', exemption: 0 },
  { value: 'india', label: 'India (Article 21 — $5,000 standard)', exemption: 5000 },
  { value: 'china', label: 'China (Article 20 — $5,000 standard)', exemption: 5000 },
  { value: 'south_korea', label: 'South Korea (Article 21 — $2,000)', exemption: 2000 },
  { value: 'japan', label: 'Japan (Article 20 — exempt if under threshold)', exemption: 2000 },
  { value: 'germany', label: 'Germany (Article 20 — $9,000)', exemption: 9000 },
  { value: 'france', label: 'France (Article 21 — $5,000)', exemption: 5000 },
  { value: 'other', label: 'Other Country (check treaty)', exemption: 0 },
];

const relatedCalcs = [
  { icon: Globe, title: 'Substantial Presence Test', description: 'Check your IRS tax residency status.', link: '/substantial-presence-test-calculator' },
  { icon: Briefcase, title: 'H1B Tax Calculator', description: 'Tax estimator for H1B visa holders.', link: '/h1b-tax-calculator' },
  { icon: FileText, title: 'Remittance Fee Calculator', description: 'Compare transfer fees and exchange rates.', link: '/remittance-fee-calculator' },
];

const faqs = [
  { question: 'Do F1 students on OPT pay FICA taxes?', answer: 'No — F1 students are generally exempt from FICA (Social Security and Medicare) taxes during their first 5 calendar years in the U.S. This is one of the biggest tax advantages of F1 status. After 5 years, or if you change to a different visa, you begin paying FICA.' },
  { question: 'What tax form do F1 students file?', answer: 'F1 students who are nonresident aliens file Form 1040-NR (nonresident alien return). They must also file Form 8843 even if they had no income. Nonresidents cannot use standard Form 1040 or claim the standard deduction.' },
  { question: 'Can F1 students claim the standard deduction?', answer: 'No. Nonresident aliens cannot claim the standard deduction ($14,600 for 2024). However, students from India can claim a $1 personal exemption under the U.S.-India tax treaty. Otherwise, your gross income is essentially your taxable income.' },
  { question: 'What are tax treaty benefits for students?', answer: 'Some countries have tax treaties with the U.S. that exempt a portion of student income. For example, students from India and China may exclude up to $5,000 of earned income. South Korea offers a $2,000 exemption. Not all countries have student-specific provisions.' },
  { question: 'Do I need to pay estimated quarterly taxes on OPT?', answer: 'If your employer is not withholding enough federal tax (which can happen since F1 workers are exempt from FICA, so withholding calculations may differ), you may need to make estimated quarterly tax payments using Form 1040-ES(NR) to avoid penalties.' },
  { question: 'What happens to my tax status after 5 years on F1?', answer: 'After 5 calendar years on F1, you may no longer be an "exempt individual" for the Substantial Presence Test. If your weighted days meet 183, you become a resident alien and must pay FICA, file Form 1040, and report worldwide income.' },
];

function F1OPTTaxCalculatorPage() {
  const [income, setIncome] = useState('55000');
  const [state, setState] = useState('none');
  const [yearsInF1, setYearsInF1] = useState('2');
  const [treatyCountry, setTreatyCountry] = useState('none');

  const result = useMemo(() => {
    const gross = parseFloat(income) || 0;
    if (gross <= 0) return null;

    const years = parseInt(yearsInF1) || 0;
    const ficaExempt = years <= 5;

    const treaty = TREATY_COUNTRIES.find(t => t.value === treatyCountry);
    const treatyExemption = treaty?.exemption || 0;

    // NR aliens cannot claim standard deduction
    const taxableIncome = Math.max(0, gross - treatyExemption);

    // Federal tax using NR brackets (single rate schedule)
    let federalTax = 0;
    let prev = 0;
    for (const b of NR_BRACKETS_2024) {
      if (taxableIncome > prev) {
        federalTax += (Math.min(taxableIncome, b.limit) - prev) * b.rate;
        prev = b.limit;
      } else break;
    }

    // FICA — exempt if within 5 years
    let fica = 0;
    let ss = 0;
    let medicare = 0;
    if (!ficaExempt) {
      ss = Math.min(gross, 168600) * 0.062;
      medicare = gross * 0.0145;
      fica = ss + medicare;
    }

    // State tax
    const stateInfo = STATE_TAXES[state];
    const stateTax = taxableIncome * (stateInfo?.rate || 0);

    const totalTax = federalTax + fica + stateTax;
    const netAnnual = gross - totalTax;
    const effectiveRate = (totalTax / gross) * 100;

    return {
      gross,
      taxableIncome,
      treatyExemption,
      federalTax,
      fica,
      ss,
      medicare,
      ficaExempt,
      stateTax,
      totalTax,
      netAnnual,
      monthlyNet: netAnnual / 12,
      effectiveRate,
    };
  }, [income, state, yearsInF1, treatyCountry]);

  const fmt = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

  const handleReset = () => {
    setIncome('55000');
    setState('none');
    setYearsInF1('2');
    setTreatyCountry('none');
  };

  return (
    <>
      <Helmet>
        <title>Free F1 OPT Tax Calculator 2026 | Student Visa Tax Estimator | Finovly</title>
        <meta name="description" content="Estimate your taxes as an F1 student on OPT or CPT. Includes FICA exemption, treaty benefits, and state taxes. Free calculator, no sign-up." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://finovly.com/f1-opt-tax-calculator" />
        <meta property="og:title" content="Free F1 OPT Tax Calculator | Finovly" />
        <meta property="og:description" content="F1 visa tax calculator with FICA exemption and treaty benefits." />
        <meta property="og:url" content="https://finovly.com/f1-opt-tax-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://finovly.com/finovly-logo-dark.svg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Free F1 OPT Tax Calculator | Finovly" />
        <meta name="twitter:description" content="F1 visa tax calculator with FICA exemption and treaty benefits." />
        <meta name="twitter:image" content="https://finovly.com/finovly-logo-dark.svg" />
        <script type="application/ld+json">{`{
          "@context":"https://schema.org","@type":"SoftwareApplication","name":"F1 OPT Tax Calculator",
          "applicationCategory":"FinanceApplication","operatingSystem":"Web",
          "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},
          "description":"Free tax calculator for F1 visa students on OPT/CPT. Includes FICA exemption and treaty benefits."
        }`}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background grain-overlay">
        <Header />
        <main className="flex-1 py-8 md:py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <Breadcrumb items={[{ label: 'Calculators', href: '/calculators' }, { label: 'F1 OPT Tax Calculator' }]} />

            <div className="mb-10">
              <span className="section-label">// f1 student taxes</span>
              <h1 className="text-[32px] md:text-[42px] font-extrabold text-foreground mb-3" style={{ letterSpacing: '-0.04em', lineHeight: '1.05' }}>
                F1 OPT tax calculator
              </h1>
              <p className="text-base text-muted-foreground max-w-xl">
                Estimate your tax liability as an F1 student on OPT or CPT, including FICA exemptions and treaty benefits.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
              {/* Inputs */}
              <div className="lg:col-span-2">
                <div className="card-bento sticky top-20 space-y-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg border border-border flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">F1 OPT Income</div>
                      <div className="text-[11px] font-mono text-muted-foreground">Nonresident alien rates</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5">
                      <Label className="text-sm font-semibold">Annual OPT/CPT Income</Label>
                      <span className="text-sm font-bold num-display" style={{ color: 'hsl(var(--accent))' }}>{fmt(parseFloat(income) || 0)}</span>
                    </div>
                    <Slider value={[parseFloat(income) || 0]} onValueChange={([v]) => setIncome(String(v))} max={200000} step={1000} className="mb-2" />
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type="number" value={income} onChange={e => setIncome(e.target.value)} className="pl-9 h-10 text-sm" />
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
                    <div className="flex justify-between mb-1.5">
                      <Label className="text-sm font-semibold">Years in F1 Status</Label>
                      <span className="text-sm font-bold num-display" style={{ color: 'hsl(var(--accent))' }}>{yearsInF1} yr{yearsInF1 !== '1' ? 's' : ''}</span>
                    </div>
                    <Slider value={[parseInt(yearsInF1) || 0]} onValueChange={([v]) => setYearsInF1(String(v))} max={10} step={1} min={1} className="mb-2" />
                    {parseInt(yearsInF1) > 5 && (
                      <p className="text-[11px] font-mono mt-1 px-2 py-1.5 rounded-lg" style={{ color: 'hsl(0, 72%, 55%)', background: 'hsl(0, 72%, 55%, 0.08)' }}>
                        ⚠ After 5 calendar years, FICA exemption may no longer apply. You would owe Social Security + Medicare taxes.
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-1.5 block">Tax Treaty Benefits</Label>
                    <Select value={treatyCountry} onValueChange={setTreatyCountry}>
                      <SelectTrigger className="h-10 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TREATY_COUNTRIES.map(t => (
                          <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                        <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5">FICA Status</p>
                        <p className="text-lg font-bold num-display" style={{ color: result.ficaExempt ? 'hsl(var(--accent))' : 'hsl(var(--destructive))' }}>
                          {result.ficaExempt ? 'Exempt' : fmt(result.fica)}
                        </p>
                      </div>
                    </div>

                    {result.ficaExempt && (
                      <div className="card-bento flex gap-3 items-start" style={{ background: 'hsl(var(--accent) / 0.06)', borderColor: 'hsl(var(--accent) / 0.15)' }}>
                        <Info className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'hsl(var(--accent))' }} />
                        <div className="text-sm text-muted-foreground leading-relaxed">
                          <strong className="text-foreground">FICA Exempt:</strong> As an F1 student within your first 5 calendar years, you save <strong className="text-foreground">{fmt(Math.min(result.gross, 168600) * 0.062 + result.gross * 0.0145)}</strong> compared to H1B holders by not paying Social Security and Medicare taxes.
                        </div>
                      </div>
                    )}

                    <div className="card-bento">
                      <h3 className="text-sm font-bold text-foreground mb-4">Tax Breakdown</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">Gross OPT Income</span><span className="font-semibold num-display text-foreground">{fmt(result.gross)}</span></div>
                        {result.treatyExemption > 0 && (
                          <div className="flex justify-between"><span className="text-muted-foreground">Treaty Exemption</span><span className="font-semibold num-display" style={{ color: 'hsl(var(--accent))' }}>−{fmt(result.treatyExemption)}</span></div>
                        )}
                        <div className="flex justify-between"><span className="text-muted-foreground">Taxable Income</span><span className="font-semibold num-display text-foreground">{fmt(result.taxableIncome)}</span></div>
                        <div className="border-t border-border pt-2"></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Federal Income Tax</span><span className="font-semibold num-display text-destructive">{fmt(result.federalTax)}</span></div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">FICA (SS + Medicare)</span>
                          <span className="font-semibold num-display" style={{ color: result.ficaExempt ? 'hsl(var(--accent))' : 'hsl(var(--destructive))' }}>
                            {result.ficaExempt ? '$0 (Exempt)' : fmt(result.fica)}
                          </span>
                        </div>
                        {result.stateTax > 0 && (
                          <div className="flex justify-between"><span className="text-muted-foreground">State Tax</span><span className="font-semibold num-display text-destructive">{fmt(result.stateTax)}</span></div>
                        )}
                        <div className="flex justify-between pt-2 border-t border-border"><span className="font-bold text-foreground">Total Tax</span><span className="font-bold num-display text-destructive">{fmt(result.totalTax)}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Effective Rate</span><span className="font-semibold num-display" style={{ color: 'hsl(var(--accent))' }}>{result.effectiveRate.toFixed(1)}%</span></div>
                      </div>
                    </div>

                    <p className="text-[11px] font-mono text-muted-foreground text-center">
                      * Estimate only. NR aliens cannot claim the standard deduction. Consult a tax professional for filing.
                    </p>
                  </>
                ) : (
                  <div className="card-bento text-center py-20">
                    <GraduationCap className="w-10 h-10 mx-auto mb-3 text-muted-foreground/20" />
                    <p className="text-sm text-muted-foreground">Enter your OPT income to see your tax estimate</p>
                  </div>
                )}
              </div>
            </div>

            <article className="mt-16 space-y-8">
              <section className="card-bento">
                <h2 className="text-xl font-bold text-foreground mb-4">Understanding F1 OPT taxes</h2>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                  <p>If you're an international student on an <strong className="text-foreground">F1 visa</strong> working under OPT (Optional Practical Training) or CPT (Curricular Practical Training), your tax situation is different from H1B workers and U.S. citizens in important ways.</p>
                  <p>The biggest difference: during your first 5 calendar years on F1 status, you are classified as a <strong className="text-foreground">nonresident alien</strong> and are <strong className="text-foreground">exempt from FICA taxes</strong> (Social Security at 6.2% and Medicare at 1.45%). On a $55,000 salary, this saves you approximately $4,208 per year compared to an H1B holder.</p>
                  <p>However, as a nonresident alien, you <strong className="text-foreground">cannot claim the standard deduction</strong> ($14,600 in 2024), which means your taxable income is higher. You also file using Form 1040-NR instead of the standard Form 1040.</p>
                  <p>Check whether you qualify as a nonresident with our <Link to="/substantial-presence-test-calculator" className="font-semibold hover:underline" style={{ color: 'hsl(var(--accent))' }}>Substantial Presence Test Calculator</Link>, or compare with H1B take-home pay using our <Link to="/h1b-tax-calculator" className="font-semibold hover:underline" style={{ color: 'hsl(var(--accent))' }}>H1B Tax Calculator</Link>.</p>
                </div>
              </section>
            </article>
          </div>

          <FAQSection faqs={faqs} title="F1 OPT Tax FAQ" subtitle="Common tax questions for international students." />
          <RelatedCalculators current="/f1-opt-tax-calculator" calculators={relatedCalcs} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default F1OPTTaxCalculatorPage;
