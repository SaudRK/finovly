import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Compass } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

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

function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Finovly</title>
        <meta name="description" content="The page you are looking for could not be found." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background grain-overlay">
        <Header />

        <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden" style={{ background: 'hsl(var(--header-bg))' }}>
          {/* Animated grid lines */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(hsl(0 0% 100% / 0.03) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 0.03) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
            {/* Floating accent orbs */}
            <motion.div
              animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[30%] right-[20%] w-64 h-64 rounded-full opacity-[0.05]"
              style={{ background: 'radial-gradient(circle, hsl(var(--destructive, 0 84.2% 60.2%)), transparent)' }}
            />
            <motion.div
              animate={{ y: [0, 20, 0], x: [0, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-[20%] left-[20%] w-48 h-48 rounded-full opacity-[0.04]"
              style={{ background: 'radial-gradient(circle, hsl(var(--accent, 220 90% 50%)), transparent)' }}
            />
          </div>

          <div className="relative z-10 w-full max-w-2xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-medium tracking-wider uppercase border mb-8" style={{ color: 'hsl(var(--muted-foreground))', borderColor: 'hsl(0 0% 100% / 0.1)', background: 'hsl(0 0% 100% / 0.03)' }}>
                <span className="relative flex h-1.5 w-1.5"><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500/80" /></span>
                Error 404
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[80px] sm:text-[120px] md:text-[160px] font-extrabold text-white leading-none mb-4 tracking-tighter"
            >
              404
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
                Lost in the ledger.
              </h2>
              <p className="text-base text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
                The page you're looking for doesn't exist, has been moved, or is temporarily unavailable. 
                Let's get your calculations back on track.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <MagneticLink to="/" className="btn-accent inline-flex items-center gap-2 text-sm w-full sm:w-auto justify-center">
                <Home className="w-4 h-4" /> Return Home
              </MagneticLink>
              <MagneticLink to="/calculators" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/25 rounded-full transition-all w-full sm:w-auto justify-center">
                <Compass className="w-4 h-4" /> All Tools
              </MagneticLink>
            </motion.div>
            
            {/* Helpful quick links */}
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.6, delay: 0.6 }}
               className="mt-16 pt-8 border-t border-white/5"
            >
               <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">Popular Tools</p>
               <div className="flex flex-wrap justify-center gap-3">
                 <Link to="/compound-interest-calculator" className="text-sm text-white/50 hover:text-white transition-colors hover:underline decoration-white/20 underline-offset-4">Compound Interest</Link>
                 <span className="text-white/20">•</span>
                 <Link to="/mortgage-calculator" className="text-sm text-white/50 hover:text-white transition-colors hover:underline decoration-white/20 underline-offset-4">Mortgage</Link>
                 <span className="text-white/20">•</span>
                 <Link to="/salary-tax-calculator" className="text-sm text-white/50 hover:text-white transition-colors hover:underline decoration-white/20 underline-offset-4">Salary & Tax</Link>
               </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default NotFoundPage;
