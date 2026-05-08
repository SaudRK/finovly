
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Finovly</title>
        <meta name="description" content="Learn how Finovly collects, uses, and protects your personal data and information." />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href="https://finovly.com/privacy" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Privacy Policy | Finovly" />
        <meta property="og:description" content="Learn how Finovly collects, uses, and protects your personal data and information." />
        <meta property="og:url" content="https://finovly.com/privacy" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background grain-overlay">
        <Header />

        <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-card p-8 md:p-12 rounded-2xl shadow-sm border border-border">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground mb-8 font-medium">Last Updated: May 4, 2026</p>

            <div className="space-y-8 text-[#334155] leading-relaxed">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
                <p>
                  Welcome to Finovly. We respect your privacy and are committed to protecting your personal data. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
                  visit our website and use our financial calculators and tools. Please read this policy carefully to 
                  understand our views and practices regarding your personal data.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">2. Data Collection</h2>
                <p className="mb-2">We may collect and process the following data about you:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Information you provide:</strong> Data entered into our calculators (e.g., loan amounts, interest rates, income). This data is processed locally in your browser and is not stored on our servers unless explicitly saved to an account.</li>
                  <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                  <li><strong>Usage Data:</strong> Information about how you use our website, products, and services.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">3. Data Usage</h2>
                <p className="mb-2">We use the information we collect in the following ways:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>To provide, operate, and maintain our website and calculators.</li>
                  <li>To improve, personalize, and expand our website's functionality.</li>
                  <li>To understand and analyze how you use our website.</li>
                  <li>To develop new products, services, features, and functionality.</li>
                  <li>To communicate with you, either directly or through one of our partners, including for customer service and updates.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">4. Data Storage and Security</h2>
                <p>
                  We have implemented appropriate security measures to prevent your personal data from being accidentally lost, 
                  used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal 
                  data to those employees, agents, contractors, and other third parties who have a business need to know. 
                  They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">5. User Rights</h2>
                <p className="mb-2">Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Request access to your personal data.</li>
                  <li>Request correction of your personal data.</li>
                  <li>Request erasure of your personal data.</li>
                  <li>Object to processing of your personal data.</li>
                  <li>Request restriction of processing your personal data.</li>
                  <li>Request transfer of your personal data.</li>
                  <li>Right to withdraw consent.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">6. Cookies and Tracking</h2>
                <p>
                  Our website uses cookies to distinguish you from other users of our website. This helps us to provide you 
                  with a good experience when you browse our website and also allows us to improve our site. You can set your 
                  browser to refuse all or some browser cookies, or to alert you when websites set or access cookies.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">7. Third-party Services</h2>
                <p>
                  We may share your data with third-party vendors, service providers, contractors, or agents who perform services 
                  for us or on our behalf and require access to such information to do that work. Examples include: data analysis, 
                  email delivery, hosting services, customer service, and marketing efforts.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">8. Data Retention</h2>
                <p>
                  We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected 
                  it for, including for the purposes of satisfying any legal, regulatory, tax, accounting, or reporting requirements.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-3">9. Contact Information</h2>
                <p>
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
                  <br /><br />
                  <strong>Email:</strong> privacy@finovly.com<br />
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

export default PrivacyPage;
