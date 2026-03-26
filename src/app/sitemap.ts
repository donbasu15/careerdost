import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || 'https://careerdost.online'

  // Get all active jobs
  const jobs = await prisma.job.findMany({
    where: { isActive: true },
    select: { slug: true, updatedAt: true },
  })

  // Get all active scholarships
  const scholarships = await prisma.scholarship.findMany({
    where: { isActive: true },
    select: { slug: true, updatedAt: true },
  })

  // Map job dynamic routes
  const jobUrls = jobs.map((job) => ({
    url: `${baseUrl}/jobs/${job.slug}`,
    lastModified: job.updatedAt,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  // Map scholarship dynamic routes
  const scholarshipUrls = scholarships.map((scholarship) => ({
    url: `${baseUrl}/scholarships/${scholarship.slug}`,
    lastModified: scholarship.updatedAt,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  // Static routes
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/scholarships`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }
  ]

  return [...staticUrls, ...jobUrls, ...scholarshipUrls]
}
