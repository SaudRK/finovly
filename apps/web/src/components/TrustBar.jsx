
import React from 'react';
import { Calculator, ShieldCheck, Star, Users } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter.jsx';

function TrustBar() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: Calculator, value: 2, suffix: 'M+', label: 'Calculations' },
          { icon: Users, value: 150, suffix: 'K+', label: 'Users / mo' },
          { icon: Star, value: 4.8, suffix: '', label: 'Avg rating', decimals: 1 },
          { icon: ShieldCheck, value: 0, suffix: 'Zero', label: 'Data stored', isText: true },
        ].map((stat, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg border border-border flex items-center justify-center flex-shrink-0">
              <stat.icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <div className="text-base font-bold text-foreground leading-tight num-display">
                {stat.isText ? 'Zero' : <AnimatedCounter end={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />}
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrustBar;
