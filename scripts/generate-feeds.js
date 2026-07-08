const SITE_URL = 'https://aitooling-cn.github.io';
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDir = path.join(__dirname, '..', 'content/articles');
const publicDir = path.join(__dirname, '..', 'public');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));

const articles = files.map(f => {
  const raw = fs.readFileSync(path.join(articlesDir, f), 'utf-8');
  const { data } = matter(raw);
  return {
    slug: f.replace('.md', ''),
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    category: data.category || '',
    tags: data.tags || [],
  };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// Generate sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>
  <url><loc>${SITE_URL}/about/</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>${SITE_URL}/categories/writing/</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>
  <url><loc>${SITE_URL}/categories/image/</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>
  <url><loc>${SITE_URL}/categories/coding/</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>
  <url><loc>${SITE_URL}/categories/video/</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>
  <url><loc>${SITE_URL}/categories/productivity/</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>
  ${articles.map(a => `
  <url><loc>${SITE_URL}/articles/${a.slug}/</loc><lastmod>${a.date}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join('')}
</urlset>`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

// Generate rss.xml
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AITooling - AI工具评测与使用指南</title>
    <link>${SITE_URL}</link>
    <description>发现最好用的AI工具，提升你的工作效率。</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${articles.map(a => `
    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${SITE_URL}/articles/${a.slug}/</link>
      <guid>${SITE_URL}/articles/${a.slug}/</guid>
      <description><![CDATA[${a.description}]]></description>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <category>${a.category}</category>
    </item>`).join('')}
  </channel>
</rss>`;

fs.writeFileSync(path.join(publicDir, 'rss.xml'), rss);

console.log(`✅ Generated sitemap.xml (${articles.length} articles)`);
console.log(`✅ Generated rss.xml (${articles.length} articles)`);
