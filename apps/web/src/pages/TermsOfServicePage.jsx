
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function TermsOfServicePage() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Finovly</title>
        <meta name="description" content="Read the Terms of Service and user agreements for using Finovly's financial tools and calculators." />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href="https://finovly.com/terms" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Terms of Service | Finovly" />
        <meta property="og:description" content="Read the Terms of Service and user agreements for using Finovly's financial tools and calculators." />
        <meta property="og:url" content="https://finovly.com/terms" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background grain-overlay">
        <Header />

        <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-card p-8 md:p-12 rounded-2xl shadow-sm border border-border">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
            <p className="text-sm text-muted-foreground mb-8 font-medium">Last Updated: May 4, 2026</p>

            <div className="space-y-8 text-[#334155] leading-relaxed">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction and Acceptance of Terms</h2>
                <p>
                  By accessing and using Finovly ("the Website"), you accept and agree to be bound by the terms and provision 
                  of this agreement. In addition, when using this Website's particular services, you shall be subject to any 
                  posted guidelines or rules applicable to such services. Any participation in this service will constitute 
                  acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">2. Disclaimer of Warranties (Not Financial Advice)</h2>
                <p>
                  The content, calculators, and tools provided on Finovly are for informational and educational purposes only 
                  and do not constitute financial, investment, tax, or legal advice. We do not guarantee the accuracy, completeness, 
                  or usefulness of any information on the site. You should consult with a qualified financial advisor or professional 
                  before making any financial decisions based on the results of our calculators.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">3. User Responsibilities</h2>
                <p>
                  As a user of this Website, you agree to use the services responsibly and legally. You are solely responsible 
                  for the accuracy of the data you input into our calculators and the decisions you make based on the outputs. 
                  You agree not to use the Website for any unlawful purpose or in any way that could damage, disable, overburden, 
                  or impair the site.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">4. Intellectual Property Rights</h2>
                <p>
                  The Website and its original content, features, and functionality are owned by Finovly and are protected by 
                  international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. 
                  You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, 
                  republish, download, store, or transmit any of the material on our Website without our prior written consent.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">5. Limitation of Liability</h2>
                <p>
                  In no event shall Finovly, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable 
                  for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of 
                  profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability 
                  to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content 
                  obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">6. Service Availability and Modifications</h2>
                <p>
                  We reserve the right to withdraw or amend our Website, and any service or material we provide on the Website, 
                  in our sole discretion without notice. We will not be liable if for any reason all or any part of the Website 
                  is unavailable at any time or for any period. From time to time, we may restrict access to some parts of the 
                  Website, or the entire Website, to users.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">7. Prohibited Activities</h2>
                <p className="mb-2">You may use the Website only for lawful purposes and in accordance with these Terms. You agree not to use the Website:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
                  <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter", "spam", or any other similar solicitation.</li>
                  <li>To impersonate or attempt to impersonate Finovly, a Finovly employee, another user, or any other person or entity.</li>
                  <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Website.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">8. Indemnification</h2>
                <p>
                  You agree to defend, indemnify, and hold harmless Finovly, its affiliates, licensors, and service providers, 
                  and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, 
                  and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees 
                  (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms of Service or 
                  your use of the Website.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">9. Governing Law and Jurisdiction</h2>
                <p>
                  All matters relating to the Website and these Terms of Service and any dispute or claim arising therefrom or 
                  related thereto shall be governed by and construed in accordance with the internal laws of the State of New York 
                  without giving effect to any choice or conflict of law provision or rule.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">10. Contact Information</h2>
                <p>
                  To ask questions or comment about these Terms of Service, contact us at:
                  <br /><br />
                  <strong>Email:</strong> legal@finovly.com<br />
                  <strong>Address:</strong> 100 Financial Way, Suite 400, New York, NY 10004
                </p>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default TermsOfServicePage;
