import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace react-helmet import
  content = content.replace(/from 'react-helmet'/g, "from 'react-helmet-async'");
  
  // Replace 2025 with 2026
  content = content.replace(/2025/g, "2026");
  
  // Add og:image if missing and Helmet exists
  if (content.includes('<Helmet>') && !content.includes('<meta property="og:image"')) {
     const replacement = `<meta property="og:image" content="https://finovly.com/og-image.png" />
        <meta name="twitter:image" content="https://finovly.com/og-image.png" />
        <script`;
     content = content.replace(/<script/, replacement);
  }

  fs.writeFileSync(filePath, content, 'utf-8');
}
console.log('Pages SEO tags updated.');
