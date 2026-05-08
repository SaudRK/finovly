
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function GrowthChart({ data }) {
  const formatCurrency = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="card-glass rounded-xl p-3 shadow-xl" style={{ minWidth: '140px' }}>
          <p className="text-xs font-medium text-muted-foreground mb-0.5">Year {payload[0].payload.year}</p>
          <p className="text-base font-bold text-foreground">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[360px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.25} />
              <stop offset="100%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis
            dataKey="year"
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '11px' }}
            axisLine={false}
            tickLine={false}
            tickMargin={8}
          />
          <YAxis
            tickFormatter={formatCurrency}
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '11px' }}
            axisLine={false}
            tickLine={false}
            tickMargin={8}
            width={55}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--accent))', strokeWidth: 1, strokeDasharray: '4 4' }} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(160, 84%, 39%)"
            strokeWidth={2.5}
            fill="url(#chartGradient)"
            dot={false}
            activeDot={{ r: 5, fill: 'hsl(160, 84%, 39%)', stroke: 'hsl(var(--card))', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GrowthChart;
