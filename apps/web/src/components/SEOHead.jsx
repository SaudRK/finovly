import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * Shared SEO head component. Ensures every page gets:
 * - Unique title and description
 * - Canonical URL
 * - Open Graph tags
 * - Twitter card tags
 * - Robots directive
 * - Optional structured data
 */
export default function SEOHead({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = 'https://finovly.com/og-image.png',
  noindex = false,
  schema = null,
  children,
}) {
  const fullCanonical = canonical
    ? `https://finovly.com${canonical.startsWith('/') ? canonical : `/${canonical}`}`
    : 'https://finovly.com/';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="finovly.com" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}

      {children}
    </Helmet>
  );
}
