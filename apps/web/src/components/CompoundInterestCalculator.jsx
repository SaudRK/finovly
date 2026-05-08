
import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import GrowthChart from '@/components/GrowthChart.jsx';
import { Calculator, TrendingUp, DollarSign, Percent, RotateCcw, Share2, Download } from 'lucide-react';

function CompoundInterestCalculator() {
  const [initialInvestment, setInitialInvestment] = useState('10000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [annualRate, setAnnualRate] = useState('7');
  const [years, setYears] = useState('20');
  const [compoundingFrequency, setCompoundingFrequency] = useState('12');

  const results = useMemo(() => {
    const P = parseFloat(initialInvestment) || 0;
    const PMT = parseFloat(monthlyContribution) || 0;
    const r = (parseFloat(annualRate) || 0) / 100;
    const n = parseInt(compoundingFrequency);
    const t = parseFloat(years) || 0;

    if (t <= 0) return null;

    const yearlyData = [];
    for (let year = 0; year <= t; year++) {
      let futureValue;
      if (r === 0) {
        futureValue = P + (PMT * 12 * year);
      } else {
        const compoundGrowth = P * Math.pow(1 + r / n, n * year);
        const contributionGrowth = PMT * ((Math.pow(1 + r / n, n * year) - 1) / (r / n));
        futureValue = compoundGrowth + contributionGrowth;
      }
      yearlyData.push({ year, value: futureValue });
    }

    const finalValue = yearlyData[yearlyData.length - 1].value;
    const totalInvested = P + (PMT * 12 * t);
    const totalInterest = finalValue - totalInvested;

    return { futureValue: finalValue, totalInterest, totalInvested, chartData: yearlyData };
  }, [initialInvestment, monthlyContribution, annualRate, years, compoundingFrequency]);

  const handleReset = () => {
    setInitialInvestment('10000');
    setMonthlyContribution('500');
    setAnnualRate('7');
    setYears('20');
    setCompoundingFrequency('12');
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: 'Compound Interest Calculator - Finovly', url });
    } else {
      navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Inputs Panel */}
        <div className="lg:col-span-2">
          <div className="card-bento sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'hsl(var(--accent) / 0.1)' }}>
                <Calculator className="w-4.5 h-4.5" style={{ color: 'hsl(var(--accent))' }} />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">Input Values</h3>
                <p className="text-xs text-muted-foreground">Adjust to see real-time results</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Initial Investment */}
              <div>
                <div className="flex justify-between items-baseline mb-1.5">
                  <Label htmlFor="initial" className="text-sm font-semibold text-foreground">Initial Investment</Label>
                  <span className="text-sm font-bold" style={{ color: 'hsl(var(--accent))' }}>{formatCurrency(parseFloat(initialInvestment) || 0)}</span>
                </div>
                <Slider
                  value={[parseFloat(initialInvestment) || 0]}
                  onValueChange={([v]) => setInitialInvestment(String(v))}
                  max={500000}
                  step={1000}
                  className="mb-2"
                />
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="initial"
                    type="number"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(e.target.value)}
                    className="pl-9 h-10 text-sm"
                    min="0"
                  />
                </div>
              </div>

              {/* Monthly Contribution */}
              <div>
                <div className="flex justify-between items-baseline mb-1.5">
                  <Label htmlFor="monthly" className="text-sm font-semibold text-foreground">Monthly Contribution</Label>
                  <span className="text-sm font-bold" style={{ color: 'hsl(var(--accent))' }}>{formatCurrency(parseFloat(monthlyContribution) || 0)}</span>
                </div>
                <Slider
                  value={[parseFloat(monthlyContribution) || 0]}
                  onValueChange={([v]) => setMonthlyContribution(String(v))}
                  max={10000}
                  step={50}
                  className="mb-2"
                />
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="monthly"
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(e.target.value)}
                    className="pl-9 h-10 text-sm"
                    min="0"
                  />
                </div>
              </div>

              {/* Annual Rate */}
              <div>
                <div className="flex justify-between items-baseline mb-1.5">
                  <Label htmlFor="rate" className="text-sm font-semibold text-foreground">Annual Interest Rate</Label>
                  <span className="text-sm font-bold" style={{ color: 'hsl(var(--accent))' }}>{annualRate}%</span>
                </div>
                <Slider
                  value={[parseFloat(annualRate) || 0]}
                  onValueChange={([v]) => setAnnualRate(String(v))}
                  max={25}
                  step={0.1}
                  className="mb-2"
                />
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="rate"
                    type="number"
                    value={annualRate}
                    onChange={(e) => setAnnualRate(e.target.value)}
                    className="pl-9 h-10 text-sm"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              {/* Years */}
              <div>
                <div className="flex justify-between items-baseline mb-1.5">
                  <Label htmlFor="years" className="text-sm font-semibold text-foreground">Time Period</Label>
                  <span className="text-sm font-bold" style={{ color: 'hsl(var(--accent))' }}>{years} years</span>
                </div>
                <Slider
                  value={[parseFloat(years) || 0]}
                  onValueChange={([v]) => setYears(String(v))}
                  max={50}
                  step={1}
                  className="mb-2"
                />
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="years"
                    type="number"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    className="pl-9 h-10 text-sm"
                    min="1"
                  />
                </div>
              </div>

              {/* Compounding Frequency */}
              <div>
                <Label htmlFor="frequency" className="text-sm font-semibold text-foreground">Compounding Frequency</Label>
                <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
                  <SelectTrigger id="frequency" className="mt-1.5 h-10 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">Monthly</SelectItem>
                    <SelectItem value="4">Quarterly</SelectItem>
                    <SelectItem value="1">Annually</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button onClick={handleReset} variant="outline" size="sm" className="flex-1 gap-1.5 text-xs">
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </Button>
                <Button onClick={handleShare} variant="outline" size="sm" className="flex-1 gap-1.5 text-xs">
                  <Share2 className="w-3.5 h-3.5" /> Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-3 space-y-5">
          {results ? (
            <>
              {/* Result Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="card-bento text-center" style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}>
                  <p className="text-xs font-medium opacity-70 mb-1">Future Value</p>
                  <p className="text-2xl md:text-3xl font-extrabold tracking-tight">{formatCurrency(results.futureValue)}</p>
                </div>
                <div className="card-bento text-center" style={{ background: 'hsl(var(--accent) / 0.08)' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: 'hsl(var(--accent))' }}>Interest Earned</p>
                  <p className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">{formatCurrency(results.totalInterest)}</p>
                </div>
                <div className="card-bento text-center">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Total Invested</p>
                  <p className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">{formatCurrency(results.totalInvested)}</p>
                </div>
              </div>

              {/* Chart */}
              <div className="card-bento">
                <h3 className="text-base font-bold text-foreground mb-1">Growth Trajectory</h3>
                <p className="text-xs text-muted-foreground mb-4">Projected growth over {years} years</p>
                <GrowthChart data={results.chartData} />
              </div>

              {/* Breakdown Table */}
              <div className="card-bento">
                <h3 className="text-base font-bold text-foreground mb-4">Year-by-Year Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 font-semibold text-muted-foreground">Year</th>
                        <th className="text-right py-2 font-semibold text-muted-foreground">Balance</th>
                        <th className="text-right py-2 font-semibold text-muted-foreground">Contributed</th>
                        <th className="text-right py-2 font-semibold text-muted-foreground">Interest</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.chartData.filter((_, i) => i > 0 && (i % 5 === 0 || i === results.chartData.length - 1)).map((d) => {
                        const contributed = (parseFloat(initialInvestment) || 0) + (parseFloat(monthlyContribution) || 0) * 12 * d.year;
                        return (
                          <tr key={d.year} className="border-b border-border/50">
                            <td className="py-2 font-medium text-foreground">{d.year}</td>
                            <td className="py-2 text-right font-semibold text-foreground">{formatCurrency(d.value)}</td>
                            <td className="py-2 text-right text-muted-foreground">{formatCurrency(contributed)}</td>
                            <td className="py-2 text-right font-medium" style={{ color: 'hsl(var(--accent))' }}>{formatCurrency(d.value - contributed)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="card-bento text-center py-20">
              <Calculator className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-muted-foreground font-medium">Enter values to see your projected growth</p>
              <p className="text-sm text-muted-foreground/60 mt-1">Results update in real time</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompoundInterestCalculator;
