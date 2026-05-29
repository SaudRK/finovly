
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, MessageCircle, ShieldCheck } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import Breadcrumb from '@/components/Breadcrumb.jsx';

function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Finovly | Questions & Feedback</title>
        <meta name="description" content="Contact Finovly for editorial corrections, partnership requests, and general questions about our financial tools." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://finovly.com/contact" />
        <meta property="og:title" content="Contact Finovly" />
        <meta property="og:url" content="https://finovly.com/contact" />
        <meta property="og:image" content="https://finovly.com/og-image.png" />
        <meta name="twitter:image" content="https://finovly.com/og-image.png" />
        <script type="application/ld+json">{`{"@context":"https://schema.org","@type":"ContactPage","name":"Contact Finovly","url":"https://finovly.com/contact"}`}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background grain-overlay">
        <Header />
        <main className="flex-1 py-8 md:py-14 px-4">
          <div className="max-w-2xl mx-auto">
            <Breadcrumb items={[{ label: 'Contact' }]} />

            <div className="mb-12">
              <span className="section-label">// contact</span>
              <h1 className="text-[36px] md:text-[48px] font-extrabold text-foreground mb-4" style={{ letterSpacing: '-0.04em', lineHeight: '1.05' }}>Get in touch</h1>
              <p className="text-base text-muted-foreground">Editorial corrections, partnership requests, and general questions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Mail, title: 'Email', desc: 'For support and editorial questions, reach us at hello@finovly.com.' },
                { icon: MessageCircle, title: 'Feedback', desc: 'Spotted outdated info? Send corrections and we will update promptly.' },
                { icon: ShieldCheck, title: 'Trust', desc: 'Editorial decisions are always independent of business partnerships.' },
              ].map((item, i) => (
                <div key={i} className="card-bento">
                  <item.icon className="w-5 h-5 text-foreground mb-3" />
                  <h2 className="text-base font-bold text-foreground mb-1.5">{item.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default ContactPage;