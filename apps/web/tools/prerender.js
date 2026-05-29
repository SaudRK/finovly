import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { createServer } from 'http';
import handler from 'serve-handler';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '../dist');

const routes = [
	'/',
	'/calculators',
	'/compound-interest-calculator',
	'/mortgage-calculator',
	'/loan-comparison-calculator',
	'/salary-tax-calculator',
	'/401k-calculator',
	'/retirement-calculator',
	'/investment-calculator',
	'/credit-card-payoff-calculator',
	'/auto-loan-calculator',
	'/blog',
	'/blog/start-investing-100',
	'/blog/building-emergency-fund',
	'/blog/understanding-credit-scores',
	'/blog/first-time-homebuyer',
	'/blog/top-5-side-hustles',
	'/blog/retirement-planning-30s',
	'/blog/budgeting-strategies',
	'/blog/truth-about-credit-card-debt',
	'/blog/real-estate-investment',
	'/blog/passive-income-streams',
	'/blog/tax-advantaged-accounts',
	'/blog/negotiate-your-salary',
	'/about',
	'/contact',
	'/privacy',
	'/terms',
	'/compare',
	'/disclaimer',
	'/editorial-disclosure'
];

(async () => {
    console.log('Starting prerender script...');
    
    // Fallback index html
    const indexHtmlPath = path.join(distPath, 'index.html');
    if (!fs.existsSync(indexHtmlPath)) {
        console.error('index.html not found in dist. Ensure build ran successfully.');
        process.exit(1);
    }

    const server = createServer((request, response) => {
        return handler(request, response, {
            public: distPath,
            rewrites: [
                { source: '**', destination: '/index.html' }
            ]
        });
    });

    server.listen(3000, async () => {
        console.log('Server started on port 3000. Launching browser...');
        const browser = await puppeteer.launch({ headless: true });
        
        for (const route of routes) {
            const page = await browser.newPage();
            
            page.on('console', msg => console.log('PAGE LOG:', msg.text()));
            page.on('pageerror', err => console.error('PAGE ERROR:', err));
            
            // Speed up rendering by blocking non-essential resources
            await page.setRequestInterception(true);
            page.on('request', (req) => {
                const resourceType = req.resourceType();
                if (['image', 'font', 'media'].includes(resourceType)) {
                    req.abort();
                } else {
                    req.continue();
                }
            });

            // Navigate to route
            const url = `http://localhost:3000${route}`;
            await page.goto(url, { waitUntil: 'networkidle0' });
            
            // Give react-helmet a small moment to inject the meta tags into <head>
            await new Promise(r => setTimeout(r, 1000));
            
            let html = await page.content();
            
            // Clean up html to avoid react-helmet duplicate issues on hydration if necessary
            // Save html
            let outPath = path.join(distPath, route);
            if (route === '/') {
                outPath = path.join(distPath, 'index.html');
            } else {
                if (!fs.existsSync(outPath)) {
                    fs.mkdirSync(outPath, { recursive: true });
                }
                outPath = path.join(outPath, 'index.html');
            }
            
            fs.writeFileSync(outPath, html, 'utf-8');
            console.log(`Prerendered: ${route}`);
            
            await page.close();
        }

        await browser.close();
        server.close();
        console.log('Prerendering complete!');
        process.exit(0);
    });
})();
