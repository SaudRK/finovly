
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { CreditCard, DollarSign, Percent } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import Breadcrumb from '@/components/Breadcrumb.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function CreditCardPayoffCalculatorPage() {
  const [balance, setBalance] = useState('10000');
  const [interestRate, setInterestRate] = useState('18.9');
  const [monthlyPayment, setMonthlyPayment] = useState('250');
  const [result, setResult] = useState(null);

  const calculatePayoff = () => {
    const b = parseFloat(balance) || 0;
    const r = parseFloat(interestRate) || 0;
    const p = parseFloat(monthlyPayment) || 0;

    if (b <= 0 || r <= 0 || p <= 0) {
      setResult(null);
      return;
    }

    const dailyRate = r / 100 / 365;
    const monthlyRate = r / 100 / 12;

    // Check if payment is high enough to ever pay off the debt
    if (p <= b * monthlyRate) {
      setResult({ error: "Monthly payment is too low to ever pay off the balance. It must be greater than the interest accrued each month." });
      return;
    }

    const months = -(Math.log(1 - (b * monthlyRate) / p) / Math.log(1 + monthlyRate));
    const totalPaid = p * months;
    const totalInterest = totalPaid - b;

    setResult({
      months: Math.ceil(months),
      totalInterest,
      totalPaid,
      error: null
    });
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <>
      <Helmet>
        <title>Credit Card Payoff Calculator | Finovly</title>
        <meta name="description" content="Find out how long it will take to pay off your credit card debt with our free credit card payoff calculator." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://finovly.com/credit-card-payoff-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Credit Card Payoff Calculator | Finovly" />
        <meta property="og:description" content="Find out how long it will take to pay off your credit card debt with our free credit card payoff calculator." />
        <meta property="og:url" content="https://finovly.com/credit-card-payoff-calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{`{
          "@context":"https://schema.org",
          "@type":"SoftwareApplication","applicationCategory":"FinanceApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},
          "name":"Credit Card Payoff Calculator - Finovly",
          "url":"https://finovly.com/credit-card-payoff-calculator",
          "description":"Find out how long it will take to pay off your credit card debt with our free credit card payoff calculator."
        }`}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background grain-overlay">
        <Header />

        <main className="flex-1 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            

            <Breadcrumb items={[{ label: 'Calculators', href: '/calculators' }, { label: 'Credit Card Payoff' }]} />

            <div className="mb-10">
              <h1 className="text-[36px] md:text-[44px] font-extrabold text-foreground mb-4 tracking-tight">
                Credit Card Payoff Calculator
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                See how long it will take to become debt-free and how much interest you'll save by paying more.
              </p>
            </div>

            <Card className="shadow-lg border-border mb-16">
              <CardHeader className="bg-muted border-b border-border rounded-t-xl pb-6">
                <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-primary" /> Debt Details
                </CardTitle>
                <CardDescription className="text-[15px]">
                  Enter your credit card information to see your payoff timeline.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="space-y-2">
                    <Label htmlFor="balance" className="text-[15px] font-semibold text-foreground">Card Balance</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input id="balance" type="number" value={balance} onChange={(e) => setBalance(e.target.value)} placeholder="e.g., 10000" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interestRate" className="text-[15px] font-semibold text-foreground">Interest Rate (APR)</Label>
                    <div className="relative">
                      <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input id="interestRate" type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="e.g., 18.9" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyPayment" className="text-[15px] font-semibold text-foreground">Monthly Payment</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input id="monthlyPayment" type="number" value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)} placeholder="e.g., 250" className="pl-10" />
                    </div>
                  </div>
                </div>
                <Button onClick={calculatePayoff} className="w-full text-lg py-6">Calculate Payoff</Button>
              </CardContent>
            </Card>

            {result && (
              <Card className="shadow-lg border-border">
                <CardHeader className="bg-muted border-b border-border rounded-t-xl pb-6">
                  <CardTitle className="text-2xl font-bold text-foreground">Payoff Results</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-8">
                  {result.error ? (
                    <p className="text-red-600 font-semibold">{result.error}</p>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-foreground/80">Payoff Time</span>
                        <span className="text-2xl font-bold text-primary">{result.months} months</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-foreground/80">Total Interest Paid</span>
                        <span className="text-lg font-semibold text-foreground">{formatCurrency(result.totalInterest)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-foreground/80">Total Paid</span>
                        <span className="text-lg font-semibold text-foreground">{formatCurrency(result.totalPaid)}</span>
                      </div>
                    </div>
                  )}
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

export default CreditCardPayoffCalculatorPage;
