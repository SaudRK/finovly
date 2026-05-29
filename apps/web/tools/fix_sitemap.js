import fs from 'fs';
import path from 'path';

// Parse blog data manually since we can't easily import ES modules dynamically without setup sometimes
const sitemapPath = path.join(process.cwd(), 'public/sitemap.xml');
let sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');

// Replace all lastmod dates
const today = new Date().toISOString().split('T')[0];
sitemapContent = sitemapContent.replace(/<lastmod>.*?<\/lastmod>/g, `<lastmod>${today}</lastmod>`);

// Add blog posts
const blogPostsFile = fs.readFileSync(path.join(process.cwd(), 'src/data/blogPosts.js'), 'utf-8');
const slugRegex = /id:\s*["']([^"']+)["']/g;
let match;
let blogUrls = '';

while ((match = slugRegex.exec(blogPostsFile)) !== null) {
  const slug = match[1];
  blogUrls += `  <url>
    <loc>https://finovly.com/blog/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
}

// Insert before </urlset>
sitemapContent = sitemapContent.replace('</urlset>', blogUrls + '</urlset>');

fs.writeFileSync(sitemapPath, sitemapContent, 'utf-8');
console.log('Sitemap updated.');
