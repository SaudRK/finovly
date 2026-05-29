
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Car, DollarSign, Percent, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function AutoLoanCalculatorPage() {
  const [vehiclePrice, setVehiclePrice] = useState('30000');
  const [downPayment, setDownPayment] = useState('5000');
  const [interestRate, setInterestRate] = useState('5.0');
  const [loanTerm, setLoanTerm] = useState('60');
  const [result, setResult] = useState(null);

  const calculateLoan = () => {
    const p = parseFloat(vehiclePrice) || 0;
    const dp = parseFloat(downPayment) || 0;
    const r = parseFloat(interestRate) || 0;
    const t = parseInt(loanTerm) || 0;

    const principal = p - dp;
    
    if (principal <= 0 || r <= 0 || t <= 0) {
      setResult({ monthlyPayment: 0, totalPayment: 0, totalInterest: 0, principal });
      return;
    }

    const monthlyRate = r / 100 / 12;
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, t)) / (Math.pow(1 + monthlyRate, t) - 1);
    const totalPayment = monthlyPayment * t;
    const totalInterest = totalPayment - principal;

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      principal
    });
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <>
      <Helmet>
        <title>Auto Loan Calculator | Finovly</title>
        <meta name="description" content="Estimate your monthly car loan payments with our free auto loan calculator." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://finovly.com/auto-loan-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Auto Loan Calculator | Finovly" />
        <meta property="og:description" content="Estimate your monthly car loan payments with our free auto loan calculator." />
        <meta property="og:url" content="https://finovly.com/auto-loan-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image" content="https://finovly.com/og-image.png" />
        <meta name="twitter:image" content="https://finovly.com/og-image.png" />
        <script type="application/ld+json">{`{
          "@context":"https://schema.org",
          "@type":"SoftwareApplication","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},
          "name":"Auto Loan Calculator - Finovly",
          "url":"https://finovly.com/auto-loan-calculator",
          "description":"Estimate your monthly car loan payments with our free auto loan calculator."
        }`}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background grain-overlay">
        <Header />

        <main className="flex-1 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            

            <Breadcrumb items={[{ label: 'Calculators', href: '/calculators' }, { label: 'Auto Loan' }]} />

            <div className="mb-10">
              <h1 className="text-[36px] md:text-[44px] font-extrabold text-foreground mb-4 tracking-tight">
                Auto Loan Calculator
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Estimate your monthly car payments and see how much you can afford.
              </p>
            </div>

            <Card className="shadow-lg border-border mb-16">
              <CardHeader className="bg-muted border-b border-border rounded-t-xl pb-6">
                <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Car className="w-6 h-6 text-primary" /> Loan Details
                </CardTitle>
                <CardDescription className="text-[15px]">
                  Enter your loan information to calculate your monthly payment.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <Label htmlFor="vehiclePrice" className="text-[15px] font-semibold text-foreground">Vehicle Price</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="vehiclePrice"
                        type="number"
                        value={vehiclePrice}
                        onChange={(e) => setVehiclePrice(e.target.value)}
                        placeholder="e.g., 30000"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="downPayment" className="text-[15px] font-semibold text-foreground">Down Payment</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="downPayment"
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(e.target.value)}
                        placeholder="e.g., 5000"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interestRate" className="text-[15px] font-semibold text-foreground">Interest Rate</Label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="interestRate"
                        type="number"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="e.g., 5.0"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loanTerm" className="text-[15px] font-semibold text-foreground">Loan Term (Months)</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="loanTerm"
                        type="number"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        placeholder="e.g., 60"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
                <Button onClick={calculateLoan} className="w-full text-lg py-6">Calculate</Button>
              </CardContent>
            </Card>

            {result && (
              <Card className="shadow-lg border-border">
                <CardHeader className="bg-muted border-b border-border rounded-t-xl pb-6">
                  <CardTitle className="text-2xl font-bold text-foreground">Results</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-foreground/80">Monthly Payment</span>
                      <span className="text-2xl font-bold text-primary">{formatCurrency(result.monthlyPayment)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-foreground/80">Total Principal</span>
                      <span className="text-lg font-semibold text-foreground">{formatCurrency(result.principal)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-foreground/80">Total Interest</span>
                      <span className="text-lg font-semibold text-foreground">{formatCurrency(result.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-foreground/80">Total Cost</span>
                      <span className="text-lg font-semibold text-foreground">{formatCurrency(result.totalPayment)}</span>
                    </div>
                  </div>
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

export default AutoLoanCalculatorPage;
