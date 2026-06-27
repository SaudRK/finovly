
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Globe, Share2, RotateCcw, DollarSign, Calculator, FileText, Info, CheckCircle, XCircle } from 'lucide-react';
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

const EXEMPT_VISA_TYPES = ['F1', 'F2', 'J1', 'J2', 'M1', 'M2', 'Q1', 'Q2'];

const visaOptions = [
  { value: 'H1B', label: 'H1B — Work Visa' },
  { value: 'L1', label: 'L1 — Intracompany Transfer' },
  { value: 'O1', label: 'O1 — Extraordinary Ability' },
  { value: 'F1', label: 'F1 — Student Visa' },
  { value: 'J1', label: 'J1 — Exchange Visitor' },
  { value: 'M1', label: 'M1 — Vocational Student' },
  { value: 'B1B2', label: 'B1/B2 — Tourist / Business' },
  { value: 'OTHER', label: 'Other Visa Type' },
];

const relatedCalcs = [
  { icon: DollarSign, title: 'H1B Tax Estimator', description: 'Estimate your federal and state taxes as an H1B holder.', link: '/h1b-tax-calculator' },
  { icon: Calculator, title: 'F1 OPT Tax Calculator', description: 'Tax estimates for F1 students on OPT/CPT.', link: '/f1-opt-tax-calculator' },
  { icon: FileText, title: 'Remittance Fee Calculator', description: 'Compare transfer fees and exchange rates.', link: '/remittance-fee-calculator' },
];

const faqs = [
  { question: 'What is the Substantial Presence Test?', answer: 'The Substantial Presence Test (SPT) is an IRS calculation used to determine whether a foreign national qualifies as a U.S. tax resident. It uses a weighted formula based on the number of days you were physically present in the U.S. over a 3-year period. If your weighted total is 183 days or more AND you were present at least 31 days in the current year, you meet the test.' },
  { question: 'How does the IRS calculate days for the SPT?', answer: 'The IRS uses a weighted formula: all days present in the current year count fully (×1), days in the prior year count as one-third (×1/3), and days two years ago count as one-sixth (×1/6). The sum of these weighted days must equal 183 or more to meet the test.' },
  { question: 'Are F1 and J1 visa holders exempt?', answer: 'Yes. F1, J1, M1, and Q visa holders (and their dependents on F2, J2, M2, Q2 visas) are generally considered "exempt individuals" for the first 5 calendar years (students) or 2 years (teachers/researchers on J1). During exempt years, days in the U.S. do not count toward the Substantial Presence Test.' },
  { question: 'What happens if I pass the test?', answer: 'If you meet the Substantial Presence Test, the IRS considers you a "resident alien" for tax purposes. This means you are taxed on your worldwide income, similar to a U.S. citizen. You would file taxes using Form 1040.' },
  { question: 'What if I fail the test?', answer: 'If you do not meet the test, you are classified as a "nonresident alien." You are only taxed on U.S.-source income and file using Form 1040-NR. You may also be eligible for tax treaty benefits depending on your home country.' },
  { question: 'Can I use the Closer Connection Exception?', answer: 'Yes. Even if you meet the 183-day threshold, you may still be treated as a nonresident if you were present fewer than 183 actual days in the current year AND you maintained a "closer connection" to a foreign country (tax home abroad). This requires filing IRS Form 8840.' },
];

function SubstantialPresenceTestPage() {
  const [daysCurrentYear, setDaysCurrentYear] = useState('180');
  const [daysPriorYear, setDaysPriorYear] = useState('120');
  const [daysTwoYearsAgo, setDaysTwoYearsAgo] = useState('90');
  const [visaType, setVisaType] = useState('H1B');

  const result = useMemo(() => {
    const current = Math.min(365, Math.max(0, parseInt(daysCurrentYear) || 0));
    const prior = Math.min(365, Math.max(0, parseInt(daysPriorYear) || 0));
    const twoYears = Math.min(365, Math.max(0, parseInt(daysTwoYearsAgo) || 0));

    const isExempt = EXEMPT_VISA_TYPES.includes(visaType);

    if (isExempt) {
      return {
        currentWeighted: 0,
        priorWeighted: 0,
        twoYearsWeighted: 0,
        totalWeighted: 0,
        meetsMinDays: false,
        passes: false,
        isExempt: true,
        current,
        prior,
        twoYears,
      };
    }

    const currentWeighted = current;
    const priorWeighted = Math.round((prior / 3) * 100) / 100;
    const twoYearsWeighted = Math.round((twoYears / 6) * 100) / 100;
    const totalWeighted = Math.round((currentWeighted + priorWeighted + twoYearsWeighted) * 100) / 100;
    const meetsMinDays = current >= 31;
    const passes = totalWeighted >= 183 && meetsMinDays;

    return {
      currentWeighted,
      priorWeighted,
      twoYearsWeighted,
      totalWeighted,
      meetsMinDays,
      passes,
      isExempt: false,
      current,
      prior,
      twoYears,
    };
  }, [daysCurrentYear, daysPriorYear, daysTwoYearsAgo, visaType]);

  const handleReset = () => {
    setDaysCurrentYear('180');
    setDaysPriorYear('120');
    setDaysTwoYearsAgo('90');
    setVisaType('H1B');
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <Helmet>
        <title>{`Substantial Presence Test Calculator ${currentYear} | Finovly`}</title>
        <meta name="description" content={`Determine your US tax residency status with our Substantial Presence Test calculator. Uses the IRS 183-day formula for ${currentYear}. No sign up required.`} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://finovly.com/substantial-presence-test-calculator" />
        <meta property="og:title" content="Free Substantial Presence Test Calculator | Finovly" />
        <meta property="og:description" content="Check if you meet the IRS Substantial Presence Test. Free calculator for H1B, F1, and all visa holders." />
        <meta property="og:url" content="https://finovly.com/substantial-presence-test-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://finovly.com/finovly-logo-dark.svg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Free Substantial Presence Test Calculator | Finovly" />
        <meta name="twitter:description" content="Check if you meet the IRS Substantial Presence Test. Free calculator for H1B, F1, and all visa holders." />
        <meta name="twitter:image" content="https://finovly.com/finovly-logo-dark.svg" />
        <script type="application/ld+json">{`{
          "@context":"https://schema.org","@type":"SoftwareApplication","name":"Substantial Presence Test Calculator",
          "applicationCategory":"FinanceApplication","operatingSystem":"Web",
          "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},
          "description":"Free IRS Substantial Presence Test calculator to determine U.S. tax residency status for visa holders."
        }`}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background grain-overlay">
        <Header />
        <main className="flex-1 py-8 md:py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <Breadcrumb items={[{ label: 'Calculators', href: '/calculators' }, { label: 'Substantial Presence Test' }]} />

            <div className="mb-10">
              <span className="section-label">// tax residency</span>
              <h1 className="text-[32px] md:text-[42px] font-extrabold text-foreground mb-3" style={{ letterSpacing: '-0.04em', lineHeight: '1.05' }}>
                Substantial presence test calculator
              </h1>
              <p className="text-base text-muted-foreground max-w-xl">
                Determine if the IRS considers you a U.S. tax resident based on the 183-day weighted formula.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
              {/* Inputs */}
              <div className="lg:col-span-2">
                <div className="card-bento sticky top-20 space-y-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg border border-border flex items-center justify-center">
                      <Globe className="w-4 h-4 text-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">Presence Details</div>
                      <div className="text-[11px] font-mono text-muted-foreground">IRS 3-year weighted formula</div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-1.5 block">Visa Type</Label>
                    <Select value={visaType} onValueChange={setVisaType}>
                      <SelectTrigger className="h-10 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {visaOptions.map(v => (
                          <SelectItem key={v.value} value={v.value}>{v.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {EXEMPT_VISA_TYPES.includes(visaType) && (
                      <p className="text-[11px] font-mono mt-2 px-2 py-1.5 rounded-lg" style={{ color: 'hsl(var(--accent))', background: 'hsl(var(--accent) / 0.08)' }}>
                        ⓘ {visaType} holders are generally exempt from the SPT during their exempt period.
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5">
                      <Label className="text-sm font-semibold">Days in US — {currentYear} (current)</Label>
                      <span className="text-sm font-bold num-display" style={{ color: 'hsl(var(--accent))' }}>{daysCurrentYear}</span>
                    </div>
                    <Slider value={[parseInt(daysCurrentYear) || 0]} onValueChange={([v]) => setDaysCurrentYear(String(v))} max={365} step={1} className="mb-2" />
                    <Input type="number" value={daysCurrentYear} onChange={e => setDaysCurrentYear(e.target.value)} className="h-10 text-sm" min="0" max="365" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5">
                      <Label className="text-sm font-semibold">Days in US — {currentYear - 1}</Label>
                      <span className="text-sm font-bold num-display" style={{ color: 'hsl(var(--accent))' }}>{daysPriorYear}</span>
                    </div>
                    <Slider value={[parseInt(daysPriorYear) || 0]} onValueChange={([v]) => setDaysPriorYear(String(v))} max={365} step={1} className="mb-2" />
                    <Input type="number" value={daysPriorYear} onChange={e => setDaysPriorYear(e.target.value)} className="h-10 text-sm" min="0" max="365" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5">
                      <Label className="text-sm font-semibold">Days in US — {currentYear - 2}</Label>
                      <span className="text-sm font-bold num-display" style={{ color: 'hsl(var(--accent))' }}>{daysTwoYearsAgo}</span>
                    </div>
                    <Slider value={[parseInt(daysTwoYearsAgo) || 0]} onValueChange={([v]) => setDaysTwoYearsAgo(String(v))} max={365} step={1} className="mb-2" />
                    <Input type="number" value={daysTwoYearsAgo} onChange={e => setDaysTwoYearsAgo(e.target.value)} className="h-10 text-sm" min="0" max="365" />
                  </div>

                  <div className="flex gap-2 pt-1">
                    <Button onClick={handleReset} variant="outline" size="sm" className="flex-1 gap-1.5 text-xs rounded-full"><RotateCcw className="w-3.5 h-3.5" /> Reset</Button>
                    <Button onClick={() => navigator.clipboard?.writeText(window.location.href)} variant="outline" size="sm" className="flex-1 gap-1.5 text-xs rounded-full"><Share2 className="w-3.5 h-3.5" /> Share</Button>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="lg:col-span-3 space-y-4">
                {result.isExempt ? (
                  <div className="card-bento text-center py-10" style={{ background: 'hsl(var(--accent) / 0.08)', border: '1px solid hsl(var(--accent) / 0.2)' }}>
                    <Info className="w-10 h-10 mx-auto mb-3" style={{ color: 'hsl(var(--accent))' }} />
                    <p className="text-lg font-bold text-foreground mb-2">Exempt Visa Type</p>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                      As a <strong className="text-foreground">{visaType}</strong> visa holder, you are generally considered an "exempt individual" by the IRS during your exempt period.
                      Days spent in the U.S. during exempt years <strong className="text-foreground">do not count</strong> toward the Substantial Presence Test.
                    </p>
                    <p className="text-[11px] font-mono text-muted-foreground mt-4">
                      F/M students: exempt for up to 5 calendar years · J researchers: up to 2 years
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="card-bento text-center py-8" style={{ background: result.passes ? 'hsl(152, 60%, 46%)' : 'hsl(0, 72%, 55%)', color: '#fff' }}>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        {result.passes ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                      </div>
                      <p className="text-[11px] font-mono uppercase tracking-wider opacity-70 mb-1">
                        {result.passes ? 'You Meet the Test' : 'You Do Not Meet the Test'}
                      </p>
                      <p className="text-4xl md:text-5xl font-extrabold num-display" style={{ letterSpacing: '-0.03em' }}>
                        {result.totalWeighted.toFixed(1)} days
                      </p>
                      <p className="text-sm opacity-80 mt-1">weighted total (183 needed to pass)</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="card-bento text-center py-4">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5">{currentYear} (×1)</p>
                        <p className="text-lg font-bold num-display text-foreground">{result.currentWeighted}</p>
                        <p className="text-[10px] text-muted-foreground">{result.current} actual days</p>
                      </div>
                      <div className="card-bento text-center py-4">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5">{currentYear - 1} (×⅓)</p>
                        <p className="text-lg font-bold num-display text-foreground">{result.priorWeighted.toFixed(1)}</p>
                        <p className="text-[10px] text-muted-foreground">{result.prior} actual days</p>
                      </div>
                      <div className="card-bento text-center py-4">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-0.5">{currentYear - 2} (×⅙)</p>
                        <p className="text-lg font-bold num-display text-foreground">{result.twoYearsWeighted.toFixed(1)}</p>
                        <p className="text-[10px] text-muted-foreground">{result.twoYears} actual days</p>
                      </div>
                    </div>

                    <div className="card-bento">
                      <h3 className="text-sm font-bold text-foreground mb-4">What This Means</h3>
                      <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                        {result.passes ? (
                          <>
                            <p>Based on your inputs, the IRS would classify you as a <strong className="text-foreground">resident alien</strong> for tax purposes. This means:</p>
                            <ul className="list-disc pl-5 space-y-1.5">
                              <li>You are taxed on your <strong className="text-foreground">worldwide income</strong>, not just U.S.-source income</li>
                              <li>You file taxes using <strong className="text-foreground">Form 1040</strong> (same as U.S. citizens)</li>
                              <li>You may be eligible for standard deductions and most tax credits</li>
                              <li>You must report foreign bank accounts if totals exceed $10,000 (FBAR)</li>
                            </ul>
                            <p>You may still qualify for the <strong className="text-foreground">Closer Connection Exception</strong> if you were present fewer than 183 actual days this year and maintained a tax home abroad. This requires filing Form 8840.</p>
                          </>
                        ) : (
                          <>
                            <p>Based on your inputs, the IRS would classify you as a <strong className="text-foreground">nonresident alien</strong> for tax purposes. This means:</p>
                            <ul className="list-disc pl-5 space-y-1.5">
                              <li>You are only taxed on <strong className="text-foreground">U.S.-source income</strong></li>
                              <li>You file taxes using <strong className="text-foreground">Form 1040-NR</strong></li>
                              <li>You may be eligible for tax treaty benefits from your home country</li>
                              <li>You generally cannot claim the standard deduction</li>
                            </ul>
                            {!result.meetsMinDays && (
                              <p className="px-3 py-2 rounded-lg" style={{ background: 'hsl(var(--accent) / 0.06)' }}>
                                <strong className="text-foreground">Note:</strong> You were present fewer than 31 days in the current year, which automatically means you do not meet the test regardless of the weighted total.
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    <p className="text-[11px] font-mono text-muted-foreground text-center">
                      * This calculator is for informational purposes only. Consult a tax professional for advice specific to your situation.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Educational Content */}
            <article className="mt-16 space-y-8">
              <section className="card-bento">
                <h2 className="text-xl font-bold text-foreground mb-4">How the Substantial Presence Test works</h2>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                  <p>The IRS uses the <strong className="text-foreground">Substantial Presence Test (SPT)</strong> to determine whether a foreign national is treated as a U.S. resident for federal tax purposes. The test uses a weighted 3-year formula based on your physical presence in the United States.</p>
                  <p><strong className="text-foreground">The formula:</strong> Count all days present in the current year, plus one-third of the days in the prior year, plus one-sixth of the days two years ago. If this weighted total reaches <strong className="text-foreground">183 days or more</strong>, and you were present at least 31 days in the current year, you pass the test.</p>
                  <p><strong className="text-foreground">Exempt individuals:</strong> Certain visa holders — including F1 and J1 students and researchers — are considered "exempt individuals" for a limited number of calendar years. During exempt years, their U.S. presence days are <strong className="text-foreground">excluded</strong> from the calculation entirely.</p>
                  <p>Understanding your tax residency status is crucial because it determines which tax form you file, whether you're taxed on worldwide or U.S.-only income, and which deductions and credits you can claim. If you're on an H1B visa, use our <Link to="/h1b-tax-calculator" className="font-semibold hover:underline" style={{ color: 'hsl(var(--accent))' }}>H1B Tax Estimator</Link> to estimate your actual tax liability.</p>
                </div>
              </section>

              <section className="card-bento">
                <h2 className="text-xl font-bold text-foreground mb-4">Who needs to take this test?</h2>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                  <p>Any foreign national who has spent time in the United States should understand the Substantial Presence Test. It applies to all visa types including H1B work visas, L1 transfers, O1 extraordinary ability visas, B1/B2 tourist visas, and more.</p>
                  <p>Even if you are not working in the U.S., extended visits can trigger tax residency. For example, someone who visits the U.S. for 120+ days per year over three years could meet the weighted threshold without ever holding a work visa.</p>
                  <p>If you're an international student on an F1 visa, check our <Link to="/f1-opt-tax-calculator" className="font-semibold hover:underline" style={{ color: 'hsl(var(--accent))' }}>F1 OPT Tax Calculator</Link> to understand how your exempt status affects your tax obligations during Optional Practical Training.</p>
                </div>
              </section>
            </article>
          </div>

          <FAQSection faqs={faqs} title="Substantial Presence Test FAQ" subtitle="Common questions about IRS tax residency for immigrants." />
          <RelatedCalculators current="/substantial-presence-test-calculator" calculators={relatedCalcs} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default SubstantialPresenceTestPage;
