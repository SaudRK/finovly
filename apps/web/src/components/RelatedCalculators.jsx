import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Related calculators grid for internal linking and engagement.
 */
export default function RelatedCalculators({ current, calculators }) {
  const filtered = calculators.filter(c => c.link !== current).slice(0, 3);

  return (
    <section className="py-16 md:py-20" aria-labelledby="related-tools-heading">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <span className="section-label">Related Tools</span>
          <h2 id="related-tools-heading" className="text-2xl md:text-3xl font-bold text-foreground">
            Explore More Calculators
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filtered.map((calc, idx) => (
            <Link
              key={idx}
              to={calc.link}
              className="group card-bento flex flex-col"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: 'hsl(var(--accent) / 0.1)' }}>
                <calc.icon className="w-5 h-5" style={{ color: 'hsl(var(--accent))' }} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{calc.title}</h3>
              <p className="text-sm text-muted-foreground flex-1 mb-4 leading-relaxed">{calc.description}</p>
              <span className="inline-flex items-center text-sm font-semibold gap-1 group-hover:gap-2 transition-all" style={{ color: 'hsl(var(--accent))' }}>
                Use Calculator <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
