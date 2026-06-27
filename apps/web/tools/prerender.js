import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { createServer } from 'http';
import handler from 'serve-handler';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '../dist');
const PRODUCTION_DOMAIN = 'https://finovly.com';
const PORT = 4173;
const CONCURRENCY = 4; // pages rendered in parallel

const routes = [
  '/',
  '/calculators',
  '/substantial-presence-test-calculator',
  '/h1b-tax-calculator',
  '/f1-opt-tax-calculator',
  '/remittance-fee-calculator',
  '/blog',
  '/blog/build-us-credit-without-ssn',
  '/blog/f1-student-bank-accounts',
  '/blog/h1b-tax-guide',
  '/blog/f1-opt-tax-exemptions',
  '/blog/understanding-substantial-presence-test',
  '/blog/best-remittance-services',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/compare',
  '/disclaimer',
  '/editorial-disclosure',
];

// ── Domains to block (analytics, tracking, ads) ──
const BLOCKED_DOMAINS = [
  'google-analytics.com',
  'googletagmanager.com',
  'clarity.ms',
  'facebook.net',
  'fbcdn.net',
  'hotjar.com',
  'mixpanel.com',
  'segment.com',
  'amplitude.com',
  'doubleclick.net',
  'ads.twitter.com',
  'analytics.tiktok.com',
  'pagead2.googlesyndication.com',
  'googlesyndication.com',
];

const BLOCKED_RESOURCE_TYPES = ['image', 'font', 'media'];

// ── Utility: run N async tasks with a concurrency limit ──
async function pLimit(tasks, concurrency) {
  const results = [];
  let idx = 0;
  async function run() {
    while (idx < tasks.length) {
      const i = idx++;
      results[i] = await tasks[i]();
    }
  }
  const workers = Array.from({ length: Math.min(concurrency, tasks.length) }, run);
  await Promise.all(workers);
  return results;
}

// ── SEO validation per page ──
async function validateSEO(page, route) {
  const warnings = [];
  const errors = [];

  const title = await page.$eval('title', el => el.textContent.trim()).catch(() => '');
  const description = await page.$eval('meta[name="description"]', el => el.getAttribute('content') || '').catch(() => '');
  const canonical = await page.$eval('link[rel="canonical"]', el => el.getAttribute('href') || '').catch(() => '');
  const ogTitle = await page.$eval('meta[property="og:title"]', el => el.getAttribute('content') || '').catch(() => '');
  const ogImage = await page.$eval('meta[property="og:image"]', el => el.getAttribute('content') || '').catch(() => '');
  const robots = await page.$eval('meta[name="robots"]', el => el.getAttribute('content') || '').catch(() => 'index,follow');
  const hasSchema = await page.$$eval('script[type="application/ld+json"]', els => els.length > 0).catch(() => false);
  const h1Count = await page.$$eval('h1', els => els.length).catch(() => 0);
  const htmlLength = (await page.content()).length;

  // ── Title ──
  if (!title) errors.push('Missing <title>');
  else if (title.length < 10) errors.push(`Title too short (${title.length} chars): "${title}"`);
  else if (title.length > 70) warnings.push(`Title too long (${title.length} chars, max 70): "${title}"`);

  // ── Description ──
  if (!description) errors.push('Missing meta description');
  else if (description.length < 50) warnings.push(`Description too short (${description.length} chars)`);
  else if (description.length > 160) warnings.push(`Description too long (${description.length} chars, max 160)`);

  // ── Canonical ──
  if (!canonical) {
    errors.push('Missing canonical URL');
  } else if (canonical.includes('localhost') || canonical.includes('127.0.0.1')) {
    errors.push(`Canonical points to localhost: "${canonical}"`);
  } else if (!canonical.startsWith(PRODUCTION_DOMAIN)) {
    errors.push(`Canonical does not point to production domain: "${canonical}"`);
  }

  // ── Open Graph ──
  if (!ogTitle) warnings.push('Missing og:title');
  if (!ogImage) warnings.push('Missing og:image');

  // ── Robots ──
  const allowedNoIndexRoutes = ['/privacy', '/terms', '/disclaimer', '/editorial-disclosure'];
  if (robots.includes('noindex') && !allowedNoIndexRoutes.includes(route)) {
    errors.push(`Page has noindex directive: "${robots}" — this will prevent Google from indexing it`);
  }

  // ── Structured Data ──
  if (!hasSchema && !route.startsWith('/blog/') && route !== '/privacy' && route !== '/terms' && route !== '/disclaimer') {
    warnings.push('No JSON-LD structured data found');
  }

  // ── H1 ──
  if (h1Count === 0) errors.push('No <h1> found on page');
  else if (h1Count > 1) errors.push(`Multiple <h1> tags found (${h1Count}) — only one is allowed`);

  // ── HTML sanity check ──
  if (htmlLength < 2000) errors.push(`Suspiciously small HTML output (${htmlLength} bytes) — page may not have rendered`);

  // ── Legacy Brand Check ──
  const rawHtml = await page.content();
  if (rawHtml.match(/smart\s*money\s*hub/i)) {
    errors.push(`Legacy brand name "Smart Money Hub" found in HTML.`);
  }

  // ── Broken Internal Links ──
  const internalLinks = await page.$$eval('a', els => els.map(el => el.getAttribute('href')).filter(href => href && href.startsWith('/')));
  const uniqueLinks = [...new Set(internalLinks)];
  uniqueLinks.forEach(link => {
    const cleanLink = link.split('#')[0].split('?')[0];
    if (cleanLink && cleanLink !== '/' && !routes.includes(cleanLink)) {
      errors.push(`Broken internal link found: "${link}"`);
    }
  });

  return { title, description, canonical, warnings, errors };
}

// ── Process a single route ──
async function renderRoute(browser, route) {
  const page = await browser.newPage();
  const failedRequests = [];

  // Log failed requests with details
  page.on('requestfailed', req => {
    const isBlocked = BLOCKED_RESOURCE_TYPES.includes(req.resourceType()) ||
      BLOCKED_DOMAINS.some(d => req.url().includes(d));
    if (!isBlocked) {
      failedRequests.push({ url: req.url(), type: req.resourceType(), reason: req.failure()?.errorText });
    }
  });

  // Log all console errors to debug hydration crashes
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      const text = msg.text();
      if (!text.includes('net::ERR_FAILED') && !text.includes('Ignoring Event')) {
        console.log(`  [page ${msg.type()}] ${text}`);
      }
    }
  });
  page.on('pageerror', err => {
    console.log(`  [page exception] ${err.toString()}`);
  });

  /*
  await page.setRequestInterception(true);
  page.on('request', req => {
    const url = req.url();
    const type = req.resourceType();
    const isBlockedType = BLOCKED_RESOURCE_TYPES.includes(type);
    const isBlockedDomain = BLOCKED_DOMAINS.some(d => url.includes(d));
    if (isBlockedType || isBlockedDomain) {
      req.abort();
    } else {
      req.continue();
    }
  });
  */

  // Mock requestAnimationFrame because headless Chromium can throttle/skip it,
  // causing react-helmet-async to hang indefinitely waiting to flush DOM updates.
  await page.evaluateOnNewDocument(() => {
    window.requestAnimationFrame = (cb) => setTimeout(cb, 0);
    window.cancelAnimationFrame = (id) => clearTimeout(id);
  });

  try {
    const response = await page.goto(`http://localhost:${PORT}${route}`, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    // Wait for the JS bundle to be parsed and initial render to begin.
    // We need networkidle2 semantics without blocking on external scripts.
    await page.waitForFunction(
      () => typeof window.__reactFiberRef !== 'undefined' || document.readyState === 'complete',
      { timeout: 5000 }
    ).catch(() => {});
    await new Promise(r => setTimeout(r, 300));

    const status = response?.status() ?? 0;

    // Fail the build if route returned non-200
    if (status !== 200) {
      await page.close();
      return {
        route,
        success: false,
        error: `HTTP ${status} — non-200 response. Build aborted to prevent deploying a broken page.`,
        warnings: [],
        htmlSize: 0,
        title: '',
      };
    }

    // Phase 1: Wait for React to mount (#root must have children)
    await page.waitForFunction(
      () => {
        const root = document.querySelector('#root');
        return root && root.children.length > 0;
      },
      { timeout: 20000 }
    ).catch(() => {
      console.warn(`  \u26a0\ufe0f  React mount timed out on ${route}`);
    });

    // Allow React 18's concurrent commit phase to flush (useEffect/Helmet injection)
    // Helmet injects during useEffect, which fires asynchronously after paint.
    // Giving it 2s ensures even heavy pages (framer-motion) complete their first paint.
    await new Promise(r => setTimeout(r, 2000));

    // Phase 2: Wait for Helmet to inject per-page metadata.
    // We check that the title has changed from the bare 'Finovly' default
    // and that a meta description has been injected.
    await page.waitForFunction(
      () => {
        const titleReady = document.title && document.title.length > 7;
        const descReady = !!document.querySelector('meta[name="description"]');
        return titleReady && descReady;
      },
      { timeout: 12000 }
    ).catch(async () => {
      const currentTitle = await page.title();
      const descCount = await page.evaluate(() => document.querySelectorAll('meta[name="description"]').length);
      console.warn(`  \u26a0\ufe0f  Helmet hydration timed out on ${route} (title: "${currentTitle}", descCount: ${descCount})`);
    });

    // Settle: give Helmet time to flush any remaining tags (canonical, og:*, schema)
    await new Promise(r => setTimeout(r, 300));

    // Run SEO validation
    const seo = await validateSEO(page, route);

    const html = await page.content();
    const htmlSize = html.length;

    // Write output
    let outPath = path.join(distPath, route);
    if (route === '/') {
      outPath = path.join(distPath, 'index.html');
    } else {
      if (!fs.existsSync(outPath)) fs.mkdirSync(outPath, { recursive: true });
      outPath = path.join(outPath, 'index.html');
    }
    fs.writeFileSync(outPath, html, 'utf-8');

    return {
      route,
      success: seo.errors.length === 0,
      error: seo.errors.length > 0 ? seo.errors.join('; ') : null,
      warnings: seo.warnings,
      htmlSize,
      title: seo.title,
      description: seo.description,
      canonical: seo.canonical,
      failedRequests: failedRequests.filter(r => !r.url.includes('localhost')),
    };
  } catch (err) {
    return {
      route,
      success: false,
      error: err.message,
      warnings: [],
      htmlSize: 0,
      title: '',
    };
  } finally {
    await page.close();
  }
}

// ── Main ──
(async () => {
  const startTime = Date.now();
  console.log('\n🚀 Starting prerender...\n');

  const indexHtmlPath = path.join(distPath, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('❌ index.html not found in dist. Run vite build first.');
    process.exit(1);
  }

  // Validate sitemap alignment
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const sitemapXml = fs.readFileSync(sitemapPath, 'utf-8');
    const sitemapRoutes = [...sitemapXml.matchAll(/<loc>https:\/\/finovly\.com([^<]*)<\/loc>/g)]
      .map(m => m[1] || '/');
    const missingFromSitemap = routes.filter(r => !sitemapRoutes.includes(r));
    const missingFromRoutes = sitemapRoutes.filter(r => !routes.includes(r));
    if (missingFromSitemap.length > 0) {
      console.warn(`⚠️  Routes missing from sitemap.xml:\n  ${missingFromSitemap.join('\n  ')}`);
    }
    if (missingFromRoutes.length > 0) {
      console.warn(`⚠️  Sitemap.xml contains routes not in prerender list:\n  ${missingFromRoutes.join('\n  ')}`);
    }
  }

  const server = createServer((req, res) => handler(req, res, {
    public: distPath,
    rewrites: [{ source: '**', destination: '/index.html' }],
  }));

  server.on('error', err => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n❌ Port ${PORT} is already in use. Stop any other servers and retry.\n`);
      process.exit(1);
    }
    throw err;
  });

  await new Promise(resolve => server.listen(PORT, resolve));
  console.log(`🌐 Static server on port ${PORT} | Concurrency: ${CONCURRENCY}\n`);

  const browser = await puppeteer.launch({ headless: true });

  const tasks = routes.map(route => () => {
    process.stdout.write(`  ⏳ ${route}\r`);
    return renderRoute(browser, route);
  });

  const results = await pLimit(tasks, CONCURRENCY);

  await browser.close();
  server.close();

  // ── Duplicate title / description detection ──
  const titleMap = {};
  const descMap = {};
  results.forEach(r => {
    if (r.title) {
      if (titleMap[r.title]) titleMap[r.title].push(r.route);
      else titleMap[r.title] = [r.route];
    }
    if (r.description) {
      if (descMap[r.description]) descMap[r.description].push(r.route);
      else descMap[r.description] = [r.route];
    }
  });
  const dupTitles = Object.entries(titleMap).filter(([, pages]) => pages.length > 1);
  const dupDescs = Object.entries(descMap).filter(([, pages]) => pages.length > 1);

  // ── Build Report ──
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  const withWarnings = results.filter(r => r.warnings?.length > 0);
  const avgHtmlSize = Math.round(results.reduce((s, r) => s + (r.htmlSize || 0), 0) / results.length / 1024);

  console.log('\n' + '═'.repeat(60));
  console.log('📊  PRERENDER REPORT');
  console.log('═'.repeat(60));
  console.log(`  Routes:        ${routes.length}`);
  console.log(`  ✅ Passed:     ${successful.length}`);
  console.log(`  ❌ Failed:     ${failed.length}`);
  console.log(`  ⚠️  Warnings:  ${withWarnings.length} pages`);
  console.log(`  📄 Avg HTML:   ~${avgHtmlSize} KB`);
  console.log(`  ⏱  Build time: ${elapsed}s`);
  console.log('─'.repeat(60));

  // Print per-route results
  results.forEach(r => {
    const icon = r.success ? '✅' : '❌';
    const warn = r.warnings?.length > 0 ? ` (${r.warnings.length} warning${r.warnings.length > 1 ? 's' : ''})` : '';
    console.log(`  ${icon} ${r.route}${warn}`);
    if (!r.success && r.error) {
      console.log(`       → ${r.error}`);
    }
    if (r.warnings?.length > 0) {
      r.warnings.forEach(w => console.log(`       ⚠️  ${w}`));
    }
    if (r.failedRequests?.length > 0) {
      r.failedRequests.forEach(f => console.log(`       🔴 FAILED REQUEST: [${f.type}] ${f.url} — ${f.reason}`));
    }
  });

  // Duplicate title warnings
  if (dupTitles.length > 0) {
    console.log('\n⚠️  DUPLICATE TITLES DETECTED:');
    dupTitles.forEach(([title, pages]) => {
      console.log(`  "${title}"\n    → ${pages.join(', ')}`);
    });
  }

  if (dupDescs.length > 0) {
    console.log('\n⚠️  DUPLICATE DESCRIPTIONS DETECTED:');
    dupDescs.forEach(([desc, pages]) => {
      console.log(`  "${desc.slice(0, 80)}..."\n    → ${pages.join(', ')}`);
    });
  }

  console.log('═'.repeat(60));

  if (failed.length > 0) {
    console.error(`\n❌ BUILD FAILED: ${failed.length} route(s) did not pass SEO validation.`);
    console.error('   Fix the errors above before deploying.\n');
    process.exit(1);
  }

  console.log(`\n✅ Prerender complete — ${routes.length} routes in ${elapsed}s\n`);
  process.exit(0);
})();
