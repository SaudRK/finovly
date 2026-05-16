
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCalcOpen, setMobileCalcOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => { setMobileMenuOpen(false); }, [location.pathname]);

  const calculators = [
    { name: 'Compound Interest', path: '/compound-interest-calculator' },
    { name: 'Mortgage', path: '/mortgage-calculator' },
    { name: 'Loan Comparison', path: '/loan-comparison-calculator' },
    { name: 'Salary & Tax', path: '/salary-tax-calculator' },
    { name: 'Investment', path: '/investment-calculator' },
    { name: 'Retirement', path: '/retirement-calculator' },
    { name: '401(k)', path: '/401k-calculator' },
    { name: 'Auto Loan', path: '/auto-loan-calculator' },
    { name: 'Credit Card Payoff', path: '/credit-card-payoff-calculator' },
  ];

  const navLinks = [
    { name: 'Learn', path: '/blog' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (p) => (p !== '/' && location.pathname.startsWith(p)) || (p === '/' && location.pathname === '/');
  const isCalcActive = calculators.some(c => location.pathname === c.path) || location.pathname === '/calculators';

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-500 ${scrolled ? 'backdrop-blur-xl bg-[hsl(var(--header-bg)/0.92)] shadow-sm' : 'bg-[hsl(var(--header-bg))]'}`} style={{ borderBottom: '1px solid hsl(var(--header-border))' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center" aria-label="Finovly Home">
            <img src="/finovly-logo-dark.svg" alt="Finovly – Free Financial Calculators and Money Tools" className="h-7 w-auto" loading="eager" width="120" height="28" />
          </Link>

          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[13px] font-medium transition-all outline-none ${isCalcActive ? 'text-white bg-white/8' : 'text-[hsl(var(--header-link))] hover:text-[hsl(var(--header-link-hover))]'}`}>
                Tools <ChevronDown className="w-3 h-3 opacity-50" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-52 bg-[hsl(var(--header-bg))] border-white/8 text-white shadow-2xl rounded-xl p-1" sideOffset={8}>
                <DropdownMenuItem asChild className="focus:bg-white/8 focus:text-white cursor-pointer rounded-lg text-[13px]">
                  <Link to="/calculators" className="w-full font-semibold border-b border-white/8 pb-2 mb-1">All Tools</Link>
                </DropdownMenuItem>
                {calculators.map(c => (
                  <DropdownMenuItem key={c.path} asChild className="focus:bg-white/8 focus:text-white cursor-pointer rounded-lg text-[13px]">
                    <Link to={c.path} className="w-full">{c.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.map(l => (
              <Link key={l.path} to={l.path} className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-all ${isActive(l.path) ? 'text-white bg-white/8' : 'text-[hsl(var(--header-link))] hover:text-[hsl(var(--header-link-hover))]'}`}>
                {l.name}
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <button className="p-2 text-[hsl(var(--header-link))] rounded-full" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-3 border-t border-white/6" aria-label="Mobile navigation">
            <div className="flex flex-col gap-0.5">
              <button onClick={() => setMobileCalcOpen(!mobileCalcOpen)} className="flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium text-[hsl(var(--header-link))] hover:text-white w-full text-left">
                Tools <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileCalcOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileCalcOpen && (
                <div className="flex flex-col gap-0.5 pl-5 pr-3 py-1 bg-white/3 rounded-lg mx-2 mb-1">
                  <Link to="/calculators" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[13px] font-semibold text-white border-b border-white/8 mb-1">All Tools</Link>
                  {calculators.map(c => (
                    <Link key={c.path} to={c.path} onClick={() => setMobileMenuOpen(false)} className="py-2 text-[13px] text-[hsl(var(--header-link))] hover:text-white">{c.name}</Link>
                  ))}
                </div>
              )}
              {navLinks.map(l => (
                <Link key={l.path} to={l.path} onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg text-[13px] font-medium text-[hsl(var(--header-link))] hover:text-white">{l.name}</Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
