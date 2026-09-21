// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/private/',
        '/dashboard/',
      ],
    },
    sitemap: 'https://www.TeachersDoor.in/sitemap.xml',
    host: 'https://www.TeachersDoor.in',
  }
}