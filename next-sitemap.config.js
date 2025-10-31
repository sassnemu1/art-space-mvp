/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://art-space.site", // основной домен
  generateRobotsTxt: true, // создаёт robots.txt автоматически
  sitemapSize: 5000, // стандартное ограничение Google
  changefreq: "weekly", // сайт обновляется примерно раз в неделю
  priority: 0.8, // базовый приоритет страниц
  exclude: ["/404", "/server-error"], // исключаем системные страницы
  generateIndexSitemap: true, // создаёт index sitemap, если их несколько
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Yandex",
        allow: "/",
      },
    ],
    additionalSitemaps: [
      "https://art-space.site/sitemap.xml", // основной sitemap
    ],
  },
};
