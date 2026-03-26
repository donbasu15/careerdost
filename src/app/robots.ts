import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.SITE_URL || 'https://careerdost.online'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/login'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
