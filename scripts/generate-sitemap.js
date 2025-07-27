// Script to generate sitemap with dynamic content
// Run this if you add new pages or dynamic routes

const fs = require("fs");
const path = require("path");

const baseUrl = "https://nightreign-relic-browser.netlify.app";
const currentDate = new Date().toISOString().split("T")[0];

const urls = [
  {
    loc: "/",
    lastmod: currentDate,
    changefreq: "weekly",
    priority: "1.0",
  },
  // Add more URLs here if you create additional pages
  // {
  //   loc: '/about',
  //   lastmod: currentDate,
  //   changefreq: 'monthly',
  //   priority: '0.8'
  // }
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

fs.writeFileSync(path.join(__dirname, "../public/sitemap.xml"), sitemap);
console.log("Sitemap generated successfully!");
