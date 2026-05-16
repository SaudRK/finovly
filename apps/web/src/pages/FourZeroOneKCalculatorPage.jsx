
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Briefcase, DollarSign, Percent, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function FourZeroOneKCalculatorPage() {
  const [currentBalance, setCurrentBalance] = useState('50000');
  const [annualContribution, setAnnualContribution] = useState('10000');
  const [employerMatch, setEmployerMatch] = useState('3');
  const [interestRate, setInterestRate] = useState('7');
  const [years, setYears] = useState('20');
  const [result, setResult] = useState(null);

  const calculate401k = () => {
    const p = parseFloat(currentBalance) || 0;
    const c = parseFloat(annualContribution) || 0;
    const m = parseFloat(employerMatch) || 0;
    const r = parseFloat(interestRate) || 0;
    const t = parseInt(years) || 0;

    if (r <= 0 || t <= 0) {
      setResult(null);
      return;
    }

    let futureValue = p;
    const annualRate = r / 100;
    const totalAnnualContribution = c + (c * (m / 100));

    for (let i = 0; i < t; i++) {
      futureValue = (futureValue + totalAnnualContribution) * (1 + annualRate);
    }

    setResult({
      totalValue: futureValue
    });
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <>
      <Helmet>
        <title>401(k) Calculator | Finovly</title>
        <meta name="description" content="Estimate your 401(k) growth and future value with our free 401(k) calculator." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://finovly.com/401k-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="401(k) Calculator | Finovly" />
        <meta property="og:description" content="Estimate your 401(k) growth and future value with our free 401(k) calculator." />
        <meta property="og:url" content="https://finovly.com/401k-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{`{
          "@context":"https://schema.org",
          "@type":"SoftwareApplication","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},
          "name":"401(k) Calculator - Finovly",
          "url":"https://finovly.com/401k-calculator",
          "description":"Estimate your 401(k) growth and future value with our free 401(k) calculator."
        }`}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background grain-overlay">
        <Header />

        <main className="flex-1 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            

            <Breadcrumb items={[{ label: 'Calculators', href: '/calculators' }, { label: '401(k)' }]} />

            <div className="mb-10">
              <h1 className="text-[36px] md:text-[44px] font-extrabold text-foreground mb-4 tracking-tight">
                401(k) Calculator
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Project your 401(k) balance at retirement and see the impact of your contributions.
              </p>
            </div>

            <Card className="shadow-lg border-border mb-16">
              <CardHeader className="bg-muted border-b border-border rounded-t-xl pb-6">
                <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-primary" /> 401(k) Details
                </CardTitle>
                <CardDescription className="text-[15px]">
                  Enter your 401(k) information to estimate its future value.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <Label htmlFor="currentBalance" className="text-[15px] font-semibold text-foreground">Current Balance</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input id="currentBalance" type="number" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)} placeholder="e.g., 50000" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="annualContribution" className="text-[15px] font-semibold text-foreground">Your Annual Contribution</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input id="annualContribution" type="number" value={annualContribution} onChange={(e) => setAnnualContribution(e.target.value)} placeholder="e.g., 10000" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employerMatch" className="text-[15px] font-semibold text-foreground">Employer Match (%)</Label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input id="employerMatch" type="number" value={employerMatch} onChange={(e) => setEmployerMatch(e.target.value)} placeholder="e.g., 3" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interestRate" className="text-[15px] font-semibold text-foreground">Annual Rate of Return</Label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input id="interestRate" type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="e.g., 7" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2 col-span-full">
                    <Label htmlFor="years" className="text-[15px] font-semibold text-foreground">Years to Grow</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input id="years" type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g., 20" className="pl-10" />
                    </div>
                  </div>
                </div>
                <Button onClick={calculate401k} className="w-full text-lg py-6">Calculate</Button>
              </CardContent>
            </Card>

            {result && (
              <Card className="shadow-lg border-border">
                <CardHeader className="bg-muted border-b border-border rounded-t-xl pb-6">
                  <CardTitle className="text-2xl font-bold text-foreground">401(k) Projection</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-8 text-center">
                  <p className="text-lg text-foreground/80 mb-2">In {years} years, your 401(k) could be worth:</p>
                  <p className="text-4xl font-extrabold text-primary mb-4">{formatCurrency(result.totalValue)}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default FourZeroOneKCalculatorPage;
