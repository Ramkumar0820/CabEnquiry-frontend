// /** @type {import('next-sitemap').IConfig} */
// module.exports = {
//   siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://www.nexcodez.com', // your domain
//   generateRobotsTxt: true, // also generates robots.txt
//   sitemapSize: 5000,
//   changefreq: 'daily',
//   priority: 0.7,
//   exclude: ['/admin/*', '/private/*'], // optional: exclude paths
//   transform: async (config, path) => {
//     // You can customize priority for certain pages
//     if (path === '/') {
//       return { loc: path, changefreq: 'daily', priority: 1.0, lastmod: new Date().toISOString() };
//     }
//     return { loc: path, changefreq: config.changefreq, priority: config.priority, lastmod: new Date().toISOString() };
//   },
// };

// /** @type {import('next-sitemap').IConfig} */
// module.exports = {
//   siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://www.nexcodez.com',
//   generateRobotsTxt: true,
//   sitemapSize: 5000,
//   changefreq: 'daily',
//   priority: 0.7,
//   exclude: ['/admin/*', '/private/*'], // Exclude sensitive routes if any

//   // Custom Robots.txt rules
//   robotsTxtOptions: {
//     policies: [
//       { userAgent: '*', allow: '/' }, // Allow all pages
//       { userAgent: '*', disallow: ['/admin', '/private'] }, // Block admin/private
//     ],
//     additionalSitemaps: [
//       'https://www.nexcodez.com/sitemap.xml', // Main sitemap
//     ],
//   },

//   // Add extra custom paths or dynamic routes (e.g., blog posts)
//   additionalPaths: async (config) => {
//     const paths = [];

//     // Example static routes not automatically included
//     const staticPages = [
//       '/contact-us',
//       '/solutions/exchange/centralized-crypto-exchange-development',
//       '/solutions/cryptoCurrency',
//       '/solutions/decentralized-crypto',
//       '/solutions/wallet',
//     ];

//     staticPages.forEach((page) => {
//       paths.push({
//         loc: page,
//         changefreq: 'monthly',
//         priority: 0.8,
//         lastmod: new Date().toISOString(),
//       });
//     });

//     // Example dynamic blog routes (replace with API call if needed)
//     // const blogs = [
//     //   { slug: 'nextjs-guide' },
//     //   { slug: 'seo-tips' },
//     // ];

//     // blogs.forEach((blog) => {
//     //   paths.push({
//     //     loc: `/blog/${blog.slug}`,
//     //     changefreq: 'weekly',
//     //     priority: 0.8,
//     //     lastmod: new Date().toISOString(),
//     //   });
//     // });

//     return paths;
//   },
// };

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://www.nexcodez.com',
  generateRobotsTxt: true,
  sitemapSize: 50000,
  outDir: './public',
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*', '/private/*'],

  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/private'] },
    ],
  },

  additionalPaths: async (config) => {
    const paths = [
      '/contact-us',
    ].map((page) => ({
      loc: page,
      changefreq: 'monthly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));

    return paths;
  },
};