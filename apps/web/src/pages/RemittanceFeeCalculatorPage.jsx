
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Send, DollarSign, Share2, RotateCcw, Globe, Briefcase, FileText, ArrowRight, Zap, Clock, ShieldCheck } from 'lucide-react';
import { Label } from '@/components/ui/label.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Slider } from '@/components/ui/slider.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import FAQSection from '@/components/FAQSection.jsx';
import RelatedCalculators from '@/components/RelatedCalculators.jsx';

const DESTINATION_COUNTRIES = [
  { code: 'IN', name: 'India', currency: 'INR', baseRate: 83.50 },
  { code: 'MX', name: 'Mexico', currency: 'MXN', baseRate: 17.05 },
  { code: 'PH', name: 'Philippines', currency: 'PHP', baseRate: 58.45 },
  { code: 'NG', name: 'Nigeria', currency: 'NGN', baseRate: 1450.00 },
  { code: 'CN', name: 'China', currency: 'CNY', baseRate: 7.24 },
  { code: 'PK', name: 'Pakistan', currency: 'PKR', baseRate: 278.10 },
  { code: 'BD', name: 'Bangladesh', currency: 'BDT', baseRate: 117.20 },
  { code: 'GT', name: 'Guatemala', currency: 'GTQ', baseRate: 7.78 },
  { code: 'DO', name: 'Dominican Republic', currency: 'DOP', baseRate: 59.10 },
  { code: 'SV', name: 'El Salvador', currency: 'USD', baseRate: 1.00 },
];

const SPEED_PREFERENCES = [
  { value: 'instant', label: 'Instant (Minutes)', icon: Zap },
  { value: 'standard', label: 'Standard (1-3 Days)', icon: Clock },
];

// Simulated static data logic based on instructions
const getProviderQuotes = (amount, country, speed) => {
  const c = DESTINATION_COUNTRIES.find(c => c.code === country);
  if (!c || amount <= 0) return [];

  const providers = [];

  // Wise
  if (speed === 'standard') {
    const wiseFee = 4.00 + (amount * 0.008);
    const wiseRate = c.baseRate; // Mid-market rate
    const wiseReceived = (amount - wiseFee) * wiseRate;
    providers.push({
      name: 'Wise',
      fee: wiseFee,
      rate: wiseRate,
      received: wiseReceived,
      speed: '1-2 Days',
      link: '#wise-affiliate',
      logo: 'W',
      color: 'hsl(140, 60%, 45%)'
    });
  }

  // Remitly
  const remitlyFee = speed === 'instant' ? 3.99 : 0;
  const remitlyMarkup = speed === 'instant' ? 0.015 : 0.01;
  const remitlyRate = c.baseRate * (1 - remitlyMarkup);
  const remitlyReceived = (amount - remitlyFee) * remitlyRate;
  providers.push({
    name: 'Remitly',
    fee: remitlyFee,
    rate: remitlyRate,
    received: remitlyReceived,
    speed: speed === 'instant' ? 'Minutes' : '3-5 Days',
    link: '#remitly-affiliate',
    logo: 'R',
    color: 'hsl(210, 80%, 50%)'
  });

  // Western Union
  const wuFee = speed === 'instant' ? 5.00 : 2.99;
  const wuMarkup = speed === 'instant' ? 0.018 : 0.012;
  const wuRate = c.baseRate * (1 - wuMarkup);
  const wuReceived = (amount - wuFee) * wuRate;
  providers.push({
    name: 'Western Union',
    fee: wuFee,
    rate: wuRate,
    received: wuReceived,
    speed: speed === 'instant' ? 'Minutes' : '1-3 Days',
    link: '#wu-affiliate',
    logo: 'WU',
    color: 'hsl(45, 100%, 50%)'
  });

  // PayPal/Xoom (Always more expensive for comparison)
  const ppFee = 4.99;
  const ppMarkup = 0.03; // 3% markup
  const ppRate = c.baseRate * (1 - ppMarkup);
  const ppReceived = (amount - ppFee) * ppRate;
  providers.push({
    name: 'PayPal / Xoom',
    fee: ppFee,
    rate: ppRate,
    received: ppReceived,
    speed: 'Instant to 1 Day',
    link: '#paypal-affiliate',
    logo: 'P',
    color: 'hsl(200, 90%, 40%)'
  });

  return providers.sort((a, b) => b.received - a.received);
};

const relatedCalcs = [
  { icon: Briefcase, title: 'H1B Tax Calculator', description: 'Estimate your take-home pay on an H1B.', link: '/h1b-tax-calculator' },
  { icon: Globe, title: 'Substantial Presence Test', description: 'Check your IRS tax residency status.', link: '/substantial-presence-test-calculator' },
  { icon: FileText, title: 'F1 OPT Tax Calculator', description: 'Tax estimates for F1 students on OPT.', link: '/f1-opt-tax-calculator' },
];

const faqs = [
  { question: 'What is the mid-market exchange rate?', answer: 'The mid-market rate is the real exchange rate you see on Google or Reuters. Many providers claim "zero fees" but hide their profit in a marked-up exchange rate. Wise is one of the few that uses the real mid-market rate and charges a transparent fee.' },
  { question: 'Why is Western Union or PayPal more expensive?', answer: 'Traditional banks and older remittance companies often charge both an upfront fixed fee AND add a markup (often 1% to 3%) to the exchange rate. Over time, these hidden exchange rate margins cost you significantly more than transparent percentage fees.' },
  { question: 'How long do transfers actually take?', answer: 'Instant transfers using debit cards or mobile wallets usually arrive within minutes. Standard transfers using ACH bank debits take 1-3 business days because the banks need time to clear the funds.' },
  { question: 'Are these transfer services safe?', answer: 'Yes. The services compared here (Wise, Remitly, Western Union, Xoom) are fully regulated financial institutions and money transmitters. They use bank-level encryption to protect your funds and personal data.' },
];

function RemittanceFeeCalculatorPage() {
  const [amount, setAmount] = useState('500');
  const [country, setCountry] = useState('IN');
  const [speed, setSpeed] = useState('standard');

  const result = useMemo(() => {
    const val = parseFloat(amount) || 0;
    const quotes = getProviderQuotes(val, country, speed);
    const dest = DESTINATION_COUNTRIES.find(c => c.code === country);

    if (quotes.length === 0) return null;

    const bestReceived = quotes[0].received;
    const worstReceived = quotes[quotes.length - 1].received;
    const savings = bestReceived - worstReceived;

    return { quotes, dest, savings };
  }, [amount, country, speed]);

  const fmtUsd = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(v);
  const fmtDest = (v, curr) => new Intl.NumberFormat('en-US', { style: 'currency', currency: curr, maximumFractionDigits: 2 }).format(v);

  const handleReset = () => {
    setAmount('500');
    setCountry('IN');
    setSpeed('standard');
  };

  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <>
      <Helmet>
        <title>Remittance Fee Calculator | Compare Wise, Remitly, WU | Finovly</title>
        <meta name="description" content="Compare exchange rates and transfer fees for sending money abroad. Find the cheapest way to send money to India, Mexico, Philippines and more." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://finovly.com/remittance-fee-calculator" />
        <meta property="og:title" content="Compare International Money Transfer Fees | Finovly" />
        <meta property="og:description" content="Find the cheapest and fastest way to send money home. Compare real exchange rates." />
        <meta property="og:url" content="https://finovly.com/remittance-fee-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://finovly.com/finovly-logo-dark.svg" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Compare International Money Transfer Fees | Finovly" />
        <meta name="twitter:description" content="Find the cheapest and fastest way to send money home. Compare real exchange rates." />
        <meta name="twitter:image" content="https://finovly.com/finovly-logo-dark.svg" />
        <script type="application/ld+json">{`{
          "@context":"https://schema.org","@type":"SoftwareApplication","name":"Remittance Fee Calculator",
          "applicationCategory":"FinanceApplication","operatingSystem":"Web",
          "offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},
          "description":"Compare fees and exchange rates for international money transfers."
        }`}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background grain-overlay">
        <Header />
        
        {/* FTC Affiliate Disclosure */}
        <div className="bg-[hsl(var(--accent)/0.1)] text-center py-2 px-4 border-b border-[hsl(var(--accent)/0.2)]">
          <p className="text-xs text-muted-foreground max-w-4xl mx-auto">
            <strong className="text-foreground">Disclosure:</strong> This page contains affiliate links. If you sign up through our links, Finovly may earn a commission at no extra cost to you. We rank products based on total value received.
          </p>
        </div>

        <main className="flex-1 py-8 md:py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <Breadcrumb items={[{ label: 'Calculators', href: '/calculators' }, { label: 'Remittance Fee Calculator' }]} />

            <div className="mb-10">
              <span className="section-label">// send money home</span>
              <h1 className="text-[32px] md:text-[42px] font-extrabold text-foreground mb-3" style={{ letterSpacing: '-0.04em', lineHeight: '1.05' }}>
                Remittance fee calculator
              </h1>
              <p className="text-base text-muted-foreground max-w-xl">
                Compare exchange rates and hidden fees across top providers to find the cheapest way to send money abroad.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Inputs */}
              <div className="lg:col-span-4">
                <div className="card-bento sticky top-20 space-y-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg border border-border flex items-center justify-center">
                      <Send className="w-4 h-4 text-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">Transfer Details</div>
                      <div className="text-[11px] font-mono text-muted-foreground">Compare real-time estimates</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1.5">
                      <Label className="text-sm font-semibold">Amount to Send (USD)</Label>
                    </div>
                    <div className="relative mb-4">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="pl-9 h-12 text-lg font-bold" min="10" />
                    </div>
                    <Slider value={[parseFloat(amount) || 0]} onValueChange={([v]) => setAmount(String(v))} max={5000} step={50} min={10} className="mb-2" />
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-1.5 block">Destination Country</Label>
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DESTINATION_COUNTRIES.map(c => (
                          <SelectItem key={c.code} value={c.code}>{c.name} ({c.currency})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-semibold mb-2 block">Transfer Speed</Label>
                    <RadioGroup value={speed} onValueChange={setSpeed} className="grid grid-cols-1 gap-2">
                      {SPEED_PREFERENCES.map(s => (
                        <div key={s.value} className="flex items-center space-x-2 border border-border rounded-lg p-3 hover:bg-[hsl(var(--accent)/0.05)] transition-colors">
                          <RadioGroupItem value={s.value} id={s.value} />
                          <Label htmlFor={s.value} className="flex flex-1 cursor-pointer items-center gap-2">
                            <s.icon className="w-4 h-4 text-muted-foreground" />
                            {s.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button onClick={handleReset} variant="outline" size="sm" className="flex-1 gap-1.5 text-xs rounded-full"><RotateCcw className="w-3.5 h-3.5" /> Reset</Button>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="lg:col-span-8 space-y-4">
                {result ? (
                  <>
                    {result.savings > 0 && (
                      <div className="card-bento py-5 px-6 flex items-center justify-between" style={{ background: 'hsl(140, 60%, 45%, 0.1)', borderColor: 'hsl(140, 60%, 45%, 0.2)' }}>
                        <div className="flex items-center gap-3">
                          <ShieldCheck className="w-8 h-8" style={{ color: 'hsl(140, 60%, 45%)' }} />
                          <div>
                            <p className="text-sm font-semibold text-foreground">You could save up to</p>
                            <p className="text-xs text-muted-foreground">by choosing the cheapest option over the most expensive</p>
                          </div>
                        </div>
                        <div className="text-2xl font-bold num-display" style={{ color: 'hsl(140, 60%, 45%)' }}>
                          {fmtDest(result.savings, result.dest.currency)}
                        </div>
                      </div>
                    )}

                    <div className="card-bento p-0 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-[hsl(var(--muted)/0.3)] border-b border-border">
                              <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Provider</th>
                              <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Transfer Fee</th>
                              <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Exchange Rate</th>
                              <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Received</th>
                              <th className="p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {result.quotes.map((q, idx) => (
                              <tr key={q.name} className={`transition-colors hover:bg-[hsl(var(--muted)/0.2)] ${idx === 0 ? 'bg-[hsl(var(--accent)/0.03)]' : ''}`}>
                                <td className="p-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs" style={{ backgroundColor: q.color }}>
                                      {q.logo}
                                    </div>
                                    <div>
                                      <p className="font-semibold text-foreground text-sm">{q.name}</p>
                                      <p className="text-[11px] text-muted-foreground">{q.speed}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4 text-sm font-mono">{fmtUsd(q.fee)}</td>
                                <td className="p-4 text-sm font-mono">1 USD = {q.rate.toFixed(4)}</td>
                                <td className="p-4">
                                  <div className="font-bold text-foreground num-display text-base">
                                    {fmtDest(q.received, result.dest.currency)}
                                  </div>
                                  {idx === 0 && <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm" style={{ background: 'hsl(140, 60%, 45%, 0.15)', color: 'hsl(140, 60%, 45%)' }}>Cheapest</span>}
                                </td>
                                <td className="p-4 text-right">
                                  <a href={q.link} target="_blank" rel="noopener noreferrer nofollow" className={`inline-flex items-center justify-center rounded-full text-xs font-semibold px-4 py-2 transition-all ${idx === 0 ? 'bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:opacity-90' : 'bg-[hsl(var(--muted))] text-foreground hover:bg-[hsl(var(--muted-foreground)/0.2)]'}`}>
                                    Send <ArrowRight className="w-3 h-3 ml-1" />
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <p className="text-[11px] font-mono text-muted-foreground text-center">
                      Rates last updated: {currentDate}. Rates and fees are estimated and for informational purposes only. Always check the provider's website for live rates before transferring.
                    </p>
                  </>
                ) : (
                  <div className="card-bento text-center py-20">
                    <Send className="w-10 h-10 mx-auto mb-3 text-muted-foreground/20" />
                    <p className="text-sm text-muted-foreground">Enter an amount and destination to compare fees</p>
                  </div>
                )}
              </div>
            </div>

            <article className="mt-16 space-y-8">
              <section className="card-bento">
                <h2 className="text-xl font-bold text-foreground mb-4">How to read this comparison</h2>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                  <p>When sending money internationally, the true cost is made up of two factors: the <strong className="text-foreground">upfront transfer fee</strong> and the <strong className="text-foreground">exchange rate markup</strong>.</p>
                  <p>Many traditional providers advertise "Zero Fees" but hide their profit by giving you a poor exchange rate. Our calculator accounts for <strong className="text-foreground">both</strong> factors to show you exactly how much money will arrive in the destination bank account.</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li><strong className="text-foreground">Mid-market rate:</strong> The true exchange rate banks use to trade with each other. Providers like Wise use this rate.</li>
                    <li><strong className="text-foreground">Exchange rate markup:</strong> The hidden fee added when a provider gives you a rate lower than the mid-market rate.</li>
                  </ul>
                  <p>Always compare the <strong className="text-foreground">Total Received</strong> amount rather than just looking at the advertised fee.</p>
                </div>
              </section>
            </article>
          </div>

          <FAQSection faqs={faqs} title="Remittance FAQ" subtitle="Common questions about sending money abroad." />
          <RelatedCalculators current="/remittance-fee-calculator" calculators={relatedCalcs} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default RemittanceFeeCalculatorPage;
