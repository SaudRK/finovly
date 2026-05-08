
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, DollarSign, Percent, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function LoanComparisonCalculatorPage() {
  const [loanA, setLoanA] = useState({ amount: '25000', rate: '7.5', term: '60' });
  const [loanB, setLoanB] = useState({ amount: '25000', rate: '5.9', term: '48' });
  const [results, setResults] = useState(null);

  const handleInputChange = (loan, field, value) => {
    if (loan === 'A') {
      setLoanA({ ...loanA, [field]: value });
    } else {
      setLoanB({ ...loanB, [field]: value });
    }
  };

  const calculateLoan = (loan) => {
    const p = parseFloat(loan.amount) || 0;
    const r = parseFloat(loan.rate) || 0;
    const t = parseInt(loan.term) || 0;

    if (p <= 0 || r <= 0 || t <= 0) return { payment: 0, totalInterest: 0, totalCost: 0 };

    const monthlyRate = r / 100 / 12;
    const payment = p * (monthlyRate * Math.pow(1 + monthlyRate, t)) / (Math.pow(1 + monthlyRate, t) - 1);
    const totalCost = payment * t;
    const totalInterest = totalCost - p;

    return { payment, totalInterest, totalCost };
  };

  const calculateComparison = () => {
    const resA = calculateLoan(loanA);
    const resB = calculateLoan(loanB);
    setResults({ A: resA, B: resB });
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <>
      <Helmet>
        <title>Loan Comparison Calculator | Finovly</title>
        <meta name="description" content="Compare two different loans side-by-side to find the best rates, lowest monthly payments, and cheapest total cost." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://finovly.com/loan-comparison-calculator" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Loan Comparison Calculator | Finovly" />
        <meta property="og:description" content="Compare two different loans side-by-side to find the best rates, lowest monthly payments, and cheapest total cost." />
        <meta property="og:url" content="https://finovly.com/loan-comparison-calculator" />
        <meta property="og:image" content="https://finovly.com/images/loan-comparison-og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Loan Comparison Calculator | Finovly" />
        <meta name="twitter:description" content="Compare two different loans side-by-side to find the best rates, lowest monthly payments, and cheapest total cost." />
        <meta name="twitter:image" content="https://finovly.com/images/loan-comparison-og.png" />
        <script type="application/ld+json">{`{
          "@context": "https://schema.org",
          "@type": "FinancialService",
          "serviceType": "LoanComparisonCalculator",
          "name": "Loan Comparison Calculator",
          "provider": {
            "@type": "Organization",
            "name": "Finovly"
          }
        }`}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background grain-overlay">
        <Header />

        <main className="flex-1 py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <Link to="/calculators" className="inline-flex items-center text-[hsl(var(--accent))] font-medium hover:underline mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Calculators
            </Link>

            <div className="mb-10">
              <h1 className="text-[36px] md:text-[44px] font-extrabold text-foreground mb-4 tracking-tight">
                Loan Comparison
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Compare two loan offers side-by-side to see which one actually saves you more money.
              </p>
            </div>

            <Card className="shadow-lg border-border mb-16">
              <CardHeader className="bg-muted border-b border-border rounded-t-xl pb-6">
                <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Scale className="w-6 h-6 text-primary" /> Compare Loans
                </CardTitle>
                <CardDescription className="text-[15px]">
                  Input the details for two different loans to see a direct comparison.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Loan A */}
                  <div className="bg-card p-6 border border-border rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold text-foreground mb-6 border-b border-border pb-2">Loan Option A</h3>
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label className="text-[14px] font-semibold text-foreground">Loan Amount</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="number"
                            value={loanA.amount}
                            onChange={(e) => handleInputChange('A', 'amount', e.target.value)}
                            className="pl-9 text-foreground border-border"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[14px] font-semibold text-foreground">Interest Rate (%)</Label>
                        <div className="relative">
                          <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="number"
                            step="0.1"
                            value={loanA.rate}
                            onChange={(e) => handleInputChange('A', 'rate', e.target.value)}
                            className="pl-9 text-foreground border-border"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[14px] font-semibold text-foreground">Loan Term (Months)</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="number"
                            value={loanA.term}
                            onChange={(e) => handleInputChange('A', 'term', e.target.value)}
                            className="pl-9 text-foreground border-border"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Loan B */}
                  <div className="bg-background grain-overlay p-6 border border-border rounded-xl shadow-sm">
                    <h3 className="text-xl font-bold text-foreground mb-6 border-b border-border pb-2">Loan Option B</h3>
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <Label className="text-[14px] font-semibold text-foreground">Loan Amount</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="number"
                            value={loanB.amount}
                            onChange={(e) => handleInputChange('B', 'amount', e.target.value)}
                            className="pl-9 text-foreground bg-card border-border"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[14px] font-semibold text-foreground">Interest Rate (%)</Label>
                        <div className="relative">
                          <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="number"
                            step="0.1"
                            value={loanB.rate}
                            onChange={(e) => handleInputChange('B', 'rate', e.target.value)}
                            className="pl-9 text-foreground bg-card border-border"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[14px] font-semibold text-foreground">Loan Term (Months)</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="number"
                            value={loanB.term}
                            onChange={(e) => handleInputChange('B', 'term', e.target.value)}
                            className="pl-9 text-foreground bg-card border-border"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={calculateComparison} 
                  className="w-full btn-primary h-14 text-lg font-bold"
                >
                  Compare Loans
                </Button>

                {results && (
                  <div className="mt-8 rounded-xl overflow-hidden border border-border">
                    <table className="w-full text-left bg-card">
                      <thead className="bg-[#1B3E6F] text-card-foreground">
                        <tr>
                          <th className="p-4 font-bold">Metric</th>
                          <th className="p-4 font-bold border-l border-white/20">Option A</th>
                          <th className="p-4 font-bold border-l border-white/20">Option B</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr>
                          <td className="p-4 font-medium text-foreground/80 bg-muted">Monthly Payment</td>
                          <td className={`p-4 font-bold border-l border-border ${results.A.payment < results.B.payment ? 'text-primary' : 'text-foreground'}`}>
                            {formatCurrency(results.A.payment)}
                          </td>
                          <td className={`p-4 font-bold border-l border-border ${results.B.payment < results.A.payment ? 'text-primary' : 'text-foreground'}`}>
                            {formatCurrency(results.B.payment)}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-4 font-medium text-foreground/80 bg-muted">Total Interest</td>
                          <td className={`p-4 font-bold border-l border-border ${results.A.totalInterest < results.B.totalInterest ? 'text-primary' : 'text-foreground'}`}>
                            {formatCurrency(results.A.totalInterest)}
                          </td>
                          <td className={`p-4 font-bold border-l border-border ${results.B.totalInterest < results.A.totalInterest ? 'text-primary' : 'text-foreground'}`}>
                            {formatCurrency(results.B.totalInterest)}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-4 font-medium text-foreground/80 bg-muted">Total Cost of Loan</td>
                          <td className={`p-4 font-bold border-l border-border ${results.A.totalCost < results.B.totalCost ? 'text-primary' : 'text-foreground'}`}>
                            {formatCurrency(results.A.totalCost)}
                          </td>
                          <td className={`p-4 font-bold border-l border-border ${results.B.totalCost < results.A.totalCost ? 'text-primary' : 'text-foreground'}`}>
                            {formatCurrency(results.B.totalCost)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
              <h2 className="text-[24px] font-bold text-foreground mb-6">When to Compare Loans</h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  Compare loans when rates, terms, or fees differ. A lower monthly payment is not always the best deal if the loan lasts much longer. For housing costs, pair this with our <Link to="/mortgage-calculator" className="text-[hsl(var(--accent))] font-semibold hover:underline">mortgage calculator</Link> to estimate total ownership cost.
                </p>
                <p>
                  This tool is most useful for auto loans, personal loans, student loans, and refinance offers where you need to see both payment and total interest.
                </p>
                <p>
                  If you are shopping multiple lenders, make a note of APR, origination fees, prepayment penalties, and the total term before choosing.
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default LoanComparisonCalculatorPage;
