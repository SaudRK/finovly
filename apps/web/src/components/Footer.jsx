
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

function Footer() {
  const y = new Date().getFullYear();

  const cols = [
    { title: 'Calculators', links: [
      { name: 'Substantial Presence Test', path: '/substantial-presence-test-calculator' },
      { name: 'H1B Tax Estimator', path: '/h1b-tax-calculator' },
      { name: 'F1 OPT Tax', path: '/f1-opt-tax-calculator' },
      { name: 'Remittance Fee Calculator', path: '/remittance-fee-calculator' },
      { name: 'All Tools', path: '/calculators' },
    ]},
    { title: 'Learn', links: [
      { name: 'Guides', path: '/blog' },
    ]},
    { title: 'Company', links: [
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Privacy', path: '/privacy' },
      { name: 'Terms', path: '/terms' },
    ]},
  ];

  return (
    <footer className="border-t border-border bg-card" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-14">
          <div className="col-span-2 md:col-span-1">
            <Link to="/">
              <img src="/finovly-logo-dark.svg" alt="Finovly – Immigrant Finance Calculators" className="h-7 w-auto mb-4" loading="lazy" />
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
              Free financial tools for immigrants navigating the US financial system.
            </p>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <h3 className="text-[11px] font-mono font-medium uppercase tracking-[0.15em] text-muted-foreground mb-4">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map(l => (
                  <li key={l.path}>
                    <Link to={l.path} className="text-[13px] text-foreground/60 hover:text-foreground transition-colors">{l.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[11px] font-mono text-muted-foreground">&copy; {y} Finovly. Not financial advice.</p>
          <div className="flex gap-4 text-[11px] font-mono text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
