
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Target, User, Users, DollarSign, Percent, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function RetirementCalculatorPage() {
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('65');
  const [currentSavings, setCurrentSavings] = useState('50000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [interestRate, setInterestRate] = useState('7');
  const [result, setResult] = useState(null);

  const calculateRetirement = () => {
    const age = parseInt(currentAge) || 0;
    const retAge = parseInt(retirementAge) || 0;
    const p = parseFloat(currentSavings) || 0;
    const c = parseFloat(monthlyContribution) || 0;
    const r = parseFloat(interestRate) || 0;

    const yearsToGrow = retAge - age;
    if (yearsToGrow <= 0 || r <= 0) {
      setResult(null);
      return;
    }

    const monthlyRate = r / 100 / 12;
    const totalMonths = yearsToGrow * 12;

    const futureValueInitial = p * Math.pow(1 + monthlyRate, totalMonths);
    const futureValueContributions = c * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    
    const totalValue = futureValueInitial + futureValueContributions;

    setResult({
      totalValue,
      yearsToGrow
    });
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <>
      <Helmet>
        <title>Retirement Calculator | Finovly</title>
        <meta name="description" content="Plan for your retirement and see if you are on track with our free retirement calculator." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://finovly.com/retirement-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Retirement Calculator | Finovly" />
        <meta property="og:description" content="Plan for your retirement and see if you are on track with our free retirement calculator." />
        <meta property="og:url" content="https://finovly.com/retirement-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{`{
          "@context":"https://schema.org",
          "@type":"SoftwareApplication","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},
          "name":"Retirement Calculator - Finovly",
          "url":"https://finovly.com/retirement-calculator",
          "description":"Plan for your retirement and see if you are on track with our free retirement calculator."
        }`}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background grain-overlay">
        <Header />

        <main className="flex-1 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            

            <Breadcrumb items={[{ label: 'Calculators', href: '/calculators' }, { label: 'Retirement' }]} />

            <div className="mb-10">
              <h1 className="text-[36px] md:text-[44px] font-extrabold text-foreground mb-4 tracking-tight">
                Retirement Calculator
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Are you saving enough for retirement? Project your savings and see if you're on track.
              </p>
            </div>

            <Card className="shadow-lg border-border mb-16">
              <CardHeader className="bg-muted border-b border-border rounded-t-xl pb-6">
                <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Target className="w-6 h-6 text-primary" /> Your Retirement Plan
                </CardTitle>
                <CardDescription className="text-[15px]">
                  Fill in your details to estimate your retirement savings.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <Label htmlFor="currentAge" className="text-[15px] font-semibold text-foreground">Current Age</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input id="currentAge" type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} placeholder="e.g., 30" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retirementAge" className="text-[15px] font-semibold text-foreground">Retirement Age</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input id="retirementAge" type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} placeholder="e.g., 65" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentSavings" className="text-[15px] font-semibold text-foreground">Current Savings</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input id="currentSavings" type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} placeholder="e.g., 50000" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyContribution" className="text-[15px] font-semibold text-foreground">Monthly Contribution</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input id="monthlyContribution" type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} placeholder="e.g., 500" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2 col-span-full">
                    <Label htmlFor="interestRate" className="text-[15px] font-semibold text-foreground">Annual Rate of Return</Label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input id="interestRate" type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="e.g., 7" className="pl-10" />
                    </div>
                  </div>
                </div>
                <Button onClick={calculateRetirement} className="w-full text-lg py-6">Calculate</Button>
              </CardContent>
            </Card>

            {result && (
              <Card className="shadow-lg border-border">
                <CardHeader className="bg-muted border-b border-border rounded-t-xl pb-6">
                  <CardTitle className="text-2xl font-bold text-foreground">Retirement Projection</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-8 text-center">
                  <p className="text-lg text-foreground/80 mb-2">At age {retirementAge}, you could have:</p>
                  <p className="text-4xl font-extrabold text-primary mb-4">{formatCurrency(result.totalValue)}</p>
                  <p className="text-md text-muted-foreground">This is a projection based on your inputs over {result.yearsToGrow} years.</p>
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

export default RetirementCalculatorPage;
