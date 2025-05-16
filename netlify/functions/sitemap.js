const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Only initialize once
let app;
if (!app) {
  app = initializeApp({
    credential: applicationDefault(),
    projectId: 'silicon-articles'
  });
}
const db = getFirestore();

exports.handler = async function(event, context) {
  // Fetch all articles
  const articlesSnapshot = await db.collection('articles').get();

  // Build sitemap XML
  const baseUrl = 'https://thesilicon.uk';
  let urls = `
  <url>
    <loc>${baseUrl}/about</loc>
  </url>

  <url>
    <loc>${baseUrl}/about/badie</loc>
  </url>

  <url>
    <loc>${baseUrl}/about/charles</loc>
  </url>

  <url>
    <loc>${baseUrl}/about/rohan</loc>
  </url>

  <url>
    <loc>${baseUrl}/wallpapers</loc>
  </url>

  <url>
    <loc>${baseUrl}/wallpapers/abstract</loc>
  </url>

  <url>
    <loc>${baseUrl}/wallpapers/natural</loc>
  </url>

  <url>
    <loc>${baseUrl}/login</loc>
  </url>

  <url>
    <loc>${baseUrl}/signup</loc>
  </url>
`;
  articlesSnapshot.forEach(doc => {
    const data = doc.data();
    if (data.slug) {
      urls += `
  <url>
    <loc>${baseUrl}/articles/${data.slug}</loc>
    <lastmod>${data.createdAt && data.createdAt.toDate ? data.createdAt.toDate().toISOString().split('T')[0] : ''}</lastmod>
  </url>`;
    }
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
  </url>
  ${urls}
</urlset>`;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/xml'
    },
    body: xml
  };
};