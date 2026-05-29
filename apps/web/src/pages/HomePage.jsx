
import React, { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Calculator, Home, Scale, DollarSign, ChevronRight, TrendingUp, BarChart3, CreditCard, Car, PiggyBank, ArrowRight, ArrowUpRight, Shield, Zap, BookOpen, Star, MousePointer2 } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import TrustBar from '@/components/TrustBar.jsx';
import BlogCard from '@/components/BlogCard.jsx';
import FAQSection from '@/components/FAQSection.jsx';
import AnimatedCounter from '@/components/AnimatedCounter.jsx';
import { blogPosts } from '@/data/blogPosts.js';

/* ── Reveal wrapper ── */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Magnetic button ── */
function MagneticLink({ to, children, className = '' }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    setPos({ x, y });
  };
  const reset = () => setPos({ x: 0, y: 0 });
  return (
    <motion.div animate={{ x: pos.x, y: pos.y }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <Link ref={ref} to={to} onMouseMove={handleMouse} onMouseLeave={reset} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}

/* ── Ticker strip ── */
function TickerStrip() {
  const items = ['Compound Interest', 'Mortgage', 'Loan Comparison', 'Salary & Tax', '401(k)', 'Retirement', 'Investment', 'Credit Card Payoff', 'Auto Loan'];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border py-3 bg-card">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-3 px-6 text-sm font-medium text-muted-foreground whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))]" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Live clock widget ── */
function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="font-mono text-xs tabular-nums text-muted-foreground">
      {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </span>
  );
}

function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const calculators = [
    { icon: TrendingUp, title: 'Compound Interest', desc: 'Project wealth growth with compounding returns over any period.', link: '/compound-interest-calculator', tag: 'Most Popular' },
    { icon: Home, title: 'Mortgage', desc: 'Calculate monthly payments, total interest, and amortization.', link: '/mortgage-calculator', tag: 'Essential' },
    { icon: Scale, title: 'Loan Comparison', desc: 'Compare rates, terms, and total cost across multiple loans.', link: '/loan-comparison-calculator' },
    { icon: DollarSign, title: 'Salary & Tax', desc: 'See your exact take-home pay after all federal and state deductions.', link: '/salary-tax-calculator' },
    { icon: PiggyBank, title: '401(k)', desc: 'Model employer match, contribution limits, and retirement projections.', link: '/401k-calculator' },
    { icon: BarChart3, title: 'Investment', desc: 'Simulate portfolio growth with varying allocations and timelines.', link: '/investment-calculator' },
    { icon: Calculator, title: 'Retirement', desc: 'Determine if your savings rate meets your retirement target.', link: '/retirement-calculator' },
    { icon: CreditCard, title: 'Credit Card Payoff', desc: 'Build a payoff plan and see how extra payments save you money.', link: '/credit-card-payoff-calculator' },
    { icon: Car, title: 'Auto Loan', desc: 'Calculate monthly car payments and total financing cost.', link: '/auto-loan-calculator' },
  ];

  const recentPosts = blogPosts.slice(0, 3);

  const homeFaqs = [
    { question: 'Are all calculators free?', answer: 'Yes. Every tool on Finovly is free with no registration or hidden fees.' },
    { question: 'How accurate are the results?', answer: 'We use industry-standard formulas reviewed regularly. Results are estimates — consult a financial advisor for major decisions.' },
    { question: 'Is my data stored?', answer: 'No. All calculations run locally in your browser. Nothing is stored or transmitted.' },
    { question: 'Can I use these on mobile?', answer: 'Yes. Every page is fully responsive and optimized for mobile, tablet, and desktop.' },
  ];

  return (
    <>
      <Helmet>
        <title>Free Financial Calculators & Money Tools | Finovly</title>
        <meta name="description" content="Free financial calculators for compound interest, mortgages, loans, investments, and more. Trusted by 150K+ monthly users. No sign-up required." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://finovly.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Financial Calculators & Money Tools | Finovly" />
        <meta property="og:description" content="Free financial calculators for compound interest, mortgages, loans, investments, and more." />
        <meta property="og:url" content="https://finovly.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image" content="https://finovly.com/og-image.png" />
        <meta name="twitter:image" content="https://finovly.com/og-image.png" />
        <script type="application/ld+json">{`{
          "@context":"https://schema.org","@type":"Organization","name":"Finovly","url":"https://finovly.com",
          "logo":"https://finovly.com/finovly-icon.svg",
          "description":"Free financial calculators and expert guides for smarter money decisions.",
          "contactPoint":{"@type":"ContactPoint","email":"hello@finovly.com","contactType":"customer support"}
        }`}</script>
        <script type="application/ld+json">{`{
          "@context":"https://schema.org","@type":"WebSite","name":"Finovly","url":"https://finovly.com",
          "potentialAction":{"@type":"SearchAction","target":"https://finovly.com/calculators?q={search_term_string}","query-input":"required name=search_term_string"}
        }`}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background grain-overlay">
        <Header />

        <main className="flex-1">
          {/* ═══ HERO ═══ */}
          <section ref={heroRef} className="relative min-h-[100vh] flex flex-col items-center justify-center px-4 overflow-hidden" style={{ background: 'hsl(var(--header-bg))' }}>
            {/* Animated grid lines */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div style={{ y: heroY }} className="absolute inset-0">
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(hsl(0 0% 100% / 0.03) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 0.03) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
                {/* Floating accent orb */}
                <motion.div
                  animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-[20%] right-[15%] w-64 h-64 rounded-full opacity-[0.07]"
                  style={{ background: 'radial-gradient(circle, hsl(var(--accent)), transparent)' }}
                />
                <motion.div
                  animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-[25%] left-[10%] w-48 h-48 rounded-full opacity-[0.05]"
                  style={{ background: 'radial-gradient(circle, hsl(var(--gold)), transparent)' }}
                />
              </motion.div>
            </div>

            <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-4xl mx-auto text-center">
              {/* Status pill */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-medium tracking-wider uppercase border mb-8" style={{ color: 'hsl(var(--accent))', borderColor: 'hsl(var(--accent) / 0.25)', background: 'hsl(var(--accent) / 0.08)' }}>
                  <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'hsl(var(--accent))' }} /><span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: 'hsl(var(--accent))' }} /></span>
                  150K+ monthly users
                </span>
              </motion.div>

              {/* Main heading */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="text-[42px] sm:text-[56px] md:text-[72px] lg:text-[84px] font-extrabold text-white leading-[0.95] mb-6"
                style={{ letterSpacing: '-0.05em' }}
              >
                Financial tools<br />
                <span className="gradient-text-accent">that respect</span><br />
                your intelligence
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed"
                style={{ color: 'hsl(0 0% 55%)' }}
              >
                No sign-ups. No paywalls. No selling your data. Just precise calculators and honest financial guidance.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3"
              >
                <MagneticLink to="/calculators" className="btn-accent inline-flex items-center gap-2 text-sm">
                  Explore all tools <ArrowRight className="w-4 h-4" />
                </MagneticLink>
                <MagneticLink to="/blog" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/25 rounded-full transition-all">
                  Read guides <ArrowUpRight className="w-3.5 h-3.5" />
                </MagneticLink>
              </motion.div>

              {/* Bottom meta */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-16 flex items-center justify-center gap-6 text-[11px] font-mono uppercase tracking-wider"
                style={{ color: 'hsl(0 0% 35%)' }}
              >
                <span>9 free tools</span>
                <span className="w-1 h-1 rounded-full bg-current" />
                <span>No account needed</span>
                <span className="w-1 h-1 rounded-full bg-current" />
                <LiveClock />
              </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <MousePointer2 className="w-4 h-4 text-white/20" />
              </motion.div>
            </motion.div>
          </section>

          {/* ═══ TICKER ═══ */}
          <TickerStrip />

          <TrustBar />

          {/* ═══ BENTO CALCULATOR GRID ═══ */}
          <section className="py-20 md:py-32 px-4" aria-labelledby="tools-heading">
            <div className="max-w-7xl mx-auto">
              <Reveal>
                <div className="mb-14">
                  <span className="section-label">// tools</span>
                  <h2 id="tools-heading" className="section-title">Every calculator you<br className="hidden md:block" /> actually need</h2>
                </div>
              </Reveal>

              {/* Asymmetric bento grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
                {calculators.map((calc, idx) => {
                  // Vary grid sizes: first 2 are large, rest normal
                  const isLarge = idx < 2;
                  const isMedium = idx === 2 || idx === 5;
                  return (
                    <Reveal key={idx} delay={idx * 0.05} className={`${isLarge ? 'lg:row-span-2' : ''} ${isMedium ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                      <Link to={calc.link} className="block group h-full">
                        <div className={`card-bento h-full flex flex-col ${isLarge ? 'min-h-[280px]' : 'min-h-[180px]'}`}>
                          {calc.tag && <span className="badge-accent mb-3">{calc.tag}</span>}
                          <div className="flex items-start justify-between mb-auto">
                            <div className="w-10 h-10 rounded-xl border border-border flex items-center justify-center group-hover:border-[hsl(var(--accent)/0.4)] group-hover:bg-[hsl(var(--accent)/0.06)] transition-all duration-500">
                              <calc.icon className="w-5 h-5 text-foreground group-hover:text-[hsl(var(--accent))] transition-colors duration-500" />
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </div>
                          <div className="mt-auto pt-6">
                            <h3 className="text-lg font-bold text-foreground mb-1.5 group-hover:text-[hsl(var(--accent))] transition-colors duration-300">{calc.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{calc.desc}</p>
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ═══ STATS SECTION ═══ */}
          <section className="py-16 border-y border-border bg-card">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                {[
                  { value: 2, suffix: 'M+', label: 'Calculations performed' },
                  { value: 150, suffix: 'K', label: 'Monthly active users' },
                  { value: 9, suffix: '', label: 'Free precision tools' },
                  { value: 4.8, suffix: '/5', label: 'Average user rating', decimals: 1 },
                ].map((stat, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-extrabold text-foreground mb-1 num-display">
                        <AnimatedCounter end={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                      </div>
                      <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{stat.label}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ WHY SECTION ═══ */}
          <section className="py-20 md:py-32 px-4" aria-labelledby="why-heading">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <Reveal>
                  <div>
                    <span className="section-label">// why finovly</span>
                    <h2 id="why-heading" className="section-title mb-6">Built different.<br />On purpose.</h2>
                    <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-md">
                      We stripped away everything that doesn't serve you — accounts, paywalls, data harvesting, dark patterns. What's left is pure utility.
                    </p>
                    <MagneticLink to="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-[hsl(var(--accent))] transition-colors group">
                      Learn about our approach <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </MagneticLink>
                  </div>
                </Reveal>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: Shield, title: 'Zero data collection', desc: 'Everything runs in your browser. We never see your numbers.' },
                    { icon: Zap, title: 'Real-time results', desc: 'Calculations update as you type. No submit buttons needed.' },
                    { icon: BookOpen, title: 'Context, not just math', desc: 'Every tool includes guides explaining what the numbers mean.' },
                    { icon: Star, title: 'No dark patterns', desc: 'No tricks, no upsells, no "premium" tiers. Just tools that work.' },
                  ].map((item, i) => (
                    <Reveal key={i} delay={i * 0.08}>
                      <div className="card-bento">
                        <item.icon className="w-5 h-5 mb-3 text-foreground" />
                        <h3 className="text-sm font-bold text-foreground mb-1">{item.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══ GUIDES ═══ */}
          <section className="py-20 md:py-28 px-4 bg-card border-y border-border" aria-labelledby="guides-heading">
            <div className="max-w-7xl mx-auto">
              <Reveal>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                  <div>
                    <span className="section-label">// learn</span>
                    <h2 id="guides-heading" className="section-title">Latest guides</h2>
                  </div>
                  <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group">
                    All articles <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {recentPosts.map((post, i) => (
                  <Reveal key={post.id} delay={i * 0.08}>
                    <BlogCard post={post} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ FAQ ═══ */}
          <FAQSection title="Common questions" subtitle="Quick answers about Finovly." faqs={homeFaqs} />

          {/* ═══ CTA ═══ */}
          <section className="py-20 px-4">
            <Reveal>
              <div className="max-w-3xl mx-auto text-center">
                <span className="section-label">// get started</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-5" style={{ letterSpacing: '-0.04em', lineHeight: '1.05' }}>
                  Your money deserves<br />better tools
                </h2>
                <p className="text-muted-foreground text-base mb-8 max-w-md mx-auto">
                  Pick a calculator, run the numbers, and make your next financial decision with confidence.
                </p>
                <MagneticLink to="/calculators" className="btn-primary inline-flex items-center gap-2 text-sm px-8 py-4">
                  Start calculating <ArrowRight className="w-4 h-4" />
                </MagneticLink>
              </div>
            </Reveal>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default HomePage;
