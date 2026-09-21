import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import { AuthProvider } from '@/src/context/AuthContext';
import { Toaster } from 'react-hot-toast';
import PWAInstallPrompt from '@/src/components/PWAInstallPrompt';

// 👇 Base URL
const BASE_URL = 'https://teachersdoor.in';

// 👇 Site Config
const SITE_NAME = 'TeachersDoor';
const SITE_TAGLINE = "India's #1 Teaching Job Portal";

export const metadata: Metadata = {
  // ============ PRIMARY SEO ============
  title: {
    default: `${SITE_NAME} - ${SITE_TAGLINE} | Find Teaching Jobs & Hire Educators`,
    template: `%s | ${SITE_NAME} - Teaching Jobs in India`,
  },
  description: "India's #1 teaching job portal. Find 10,000+ teacher jobs in schools, colleges & coaching institutes. Hire verified teachers, principals, professors & faculty. Free registration for educators & institutions across Delhi, Mumbai, Bangalore, Hyderabad, Pune & all Indian cities.",
  
  // ============ KEYWORDS (Teacher-Focused) ============
  keywords: [
    'teaching jobs in India',
    'teacher jobs',
    'school teacher jobs',
    'college lecturer jobs',
    'professor jobs',
    'coaching institute jobs',
    'faculty jobs',
    'principal jobs',
    'TGT PGT jobs',
    'PRT teacher jobs',
    'online teaching jobs',
    'private school teacher jobs',
    'CBSE school jobs',
    'ICSE school jobs',
    'math teacher jobs',
    'science teacher jobs',
    'english teacher jobs',
    'computer teacher jobs',
    'nursery teacher jobs',
    'kindergarten teacher jobs',
    'special education teacher jobs',
    'teacher recruitment',
    'hire teachers online',
    'school hiring platform',
    'teacher placement services',
    'education jobs India',
    'teaching career',
    'educator jobs',
    'teachersdoor',
    'teachers door',
    'teacher job portal India',
    'government teacher jobs',
    'private teacher jobs',
    'teacher vacancy',
    'teacher requirements',
    'school vacancies',
    'education sector jobs',
    'academic jobs India',
    'teacher hiring portal',
    'best job portal for teachers',
    'teacher salary India',
    'teaching jobs Delhi',
    'teaching jobs Mumbai',
    'teaching jobs Bangalore',
    'teaching jobs Hyderabad',
    'teaching jobs Pune',
    'teaching jobs Chennai',
    'teaching jobs Kolkata',
    'teacher jobs near me',
  ],

  // ============ AUTHORS & PUBLISHER ============
  authors: [{ name: 'TeachersDoor Team', url: BASE_URL }],
  creator: 'TeachersDoor',
  publisher: 'TeachersDoor Pvt Ltd',
  applicationName: SITE_NAME,

  // ============ CANONICAL & ALTERNATES ============
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: '/',
    languages: {
      'en-IN': '/',
      'hi-IN': '/hi',
      'x-default': '/',
    },
  },

  // ============ OPEN GRAPH (Facebook, WhatsApp, LinkedIn) ============
  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - ${SITE_TAGLINE} | Find Teaching Jobs & Hire Educators`,
    description: "India's #1 teaching job portal. Find 10,000+ teacher jobs in top schools, colleges & coaching institutes. Free for educators & institutions.",
    locale: 'en_IN',
    images: [
      {
        url: `${BASE_URL}/cr.png`,
        width: 1200,
        height: 630,
        alt: 'TeachersDoor - Find Teaching Jobs in India',
        type: 'image/png',
      },
    ],
  },

  // ============ TWITTER CARD ============
  twitter: {
    card: 'summary_large_image',
    site: '@TeachersDoor_in',
    creator: '@TeachersDoor_in',
    title: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description: "Find 10,000+ teaching jobs in India. Connect with top schools, colleges & coaching institutes.",
    images: [`${BASE_URL}/cr.png`],
  },

  // ============ ROBOTS ============
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ============ VERIFICATION (Google Search Console) ============
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE_HERE',
    // yandex: 'YOUR_YANDEX_CODE',
    // bing: 'YOUR_BING_CODE',
  },

  // ============ APP CATEGORY ============
  category: 'Education, Jobs, Career, Recruitment',

  // ============ FORMAT DETECTION ============
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },

  // ============ OTHER ============
  referrer: 'origin-when-cross-origin',
  classification: 'Education Job Portal',
};

// ============ VIEWPORT ============
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2563eb' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
  ],
  colorScheme: 'light',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  
  // ============ 1. WEBSITE SCHEMA ============
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: SITE_NAME,
    alternateName: ['Teachers Door', 'TeachersDoor India', 'TeachersDoor Job Portal'],
    url: BASE_URL,
    description: "India's #1 teaching job portal connecting educators with top schools, colleges & coaching institutes.",
    inLanguage: 'en-IN',
    publisher: {
      '@id': `${BASE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/jobs?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // ============ 2. ORGANIZATION SCHEMA ============
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: 'TeachersDoor India',
    legalName: 'TeachersDoor Pvt Ltd',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/cr.png`,
      width: 512,
      height: 512,
      caption: 'TeachersDoor Logo',
    },
    image: `${BASE_URL}/cr.png`,
    description: "India's leading teaching job portal with verified schools, colleges & coaching institutes.",
    foundingDate: '2024',
    slogan: 'Where Teaching Dreams Take Flight',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Delhi',
      addressLocality: 'Delhi',
      addressRegion: 'Delhi',
      postalCode: '110001',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-9334461083',
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
        contactOption: 'TollFree',
      },
      {
        '@type': 'ContactPoint',
        telephone: '+91-9334461083',
        contactType: 'technical support',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi'],
      },
    ],
    sameAs: [
      'https://twitter.com/TeachersDoor_in',
      'https://www.linkedin.com/company/TeachersDoor',
      'https://www.facebook.com/TeachersDoor.in',
      'https://www.instagram.com/TeachersDoor.in',
      'https://www.youtube.com/@TeachersDoor',
    ],
  };

  // ============ 3. EDUCATIONAL ORGANIZATION (Education-Specific) ============
  const educationalOrgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${BASE_URL}/#educational-org`,
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/cr.png`,
    description: 'India\'s premier teaching job portal connecting educators with top educational institutions.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Delhi',
      addressRegion: 'Delhi',
      postalCode: '110001',
      addressCountry: 'IN',
    },
    areaServed: 'IN',
    knowsAbout: [
      'Teaching Jobs',
      'Teacher Recruitment',
      'Education Careers',
      'School Hiring',
      'College Faculty Hiring',
    ],
  };

  // ============ 4. SERVICE SCHEMA ============
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Teaching Job Portal Services',
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
    },
    description: 'Online platform for finding teaching jobs and hiring qualified educators across India.',
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    serviceType: 'Job Portal',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      description: 'Free job posting and job search for educators and institutions',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Teaching Jobs & Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Find Teaching Jobs',
            description: 'Search 10,000+ teaching jobs across India',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Hire Teachers',
            description: 'Hire verified teachers, professors & faculty',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Resume Builder',
            description: 'Create professional teaching resumes',
          },
        },
      ],
    },
  };

  // ============ 5. WEB APPLICATION SCHEMA ============
  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${BASE_URL}/#webapp`,
    name: SITE_NAME,
    url: BASE_URL,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Job Portal',
    operatingSystem: 'Web, iOS, Android',
    browserRequirements: 'Requires JavaScript',
    description: 'Job search and recruitment platform for teachers and educational institutions in India.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    featureList: [
      'Teaching Job Search',
      'Teacher Profiles',
      'School & College Hiring',
      'Resume Builder for Teachers',
      'Salary Calculator',
      'Career Advice for Educators',
      'Interview Preparation',
      'Verified Institutions',
    ],
    screenshot: `${BASE_URL}/cr.png`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '2500',
      bestRating: '5',
      worstRating: '1',
    },
  };

  // ============ 6. FAQ SCHEMA (Google Rich Results) ============
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find teaching jobs in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Create a free profile on TeachersDoor, upload your resume, and browse 10,000+ verified teaching jobs in schools, colleges, and coaching institutes across India. Filter by subject, location, experience, and salary.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can schools hire qualified teachers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Schools and educational institutions can post job openings for free on TeachersDoor and access a database of verified teachers, professors, principals, and faculty members across India.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is TeachersDoor free for job seekers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! TeachersDoor is 100% free for teachers and educators seeking jobs. Create your profile, apply to unlimited jobs, and connect with institutions without any charges.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which teaching jobs are available on TeachersDoor?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'TeachersDoor lists all types of teaching jobs including TGT, PGT, PRT, professors, lecturers, principals, vice-principals, coordinators, special educators, online tutors, and subject-specific teachers for schools, colleges, and coaching institutes.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the average teacher salary in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Teacher salaries in India range from ₹25,000 to ₹1,00,000+ per month depending on experience, location, institution type (government/private), and subject specialization. Use our salary calculator to get an estimate.',
        },
      },
    ],
  };

  // ============ 7. BREADCRUMB SCHEMA ============
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
    ],
  };

  // ============ 8. LOCAL BUSINESS SCHEMA (India Focus) ============
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EmploymentAgency',
    '@id': `${BASE_URL}/#employment-agency`,
    name: SITE_NAME,
    image: `${BASE_URL}/cr.png`,
    description: 'Teaching job portal and employment agency for educators in India.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Delhi',
      addressLocality: 'Delhi',
      addressRegion: 'Delhi',
      postalCode: '110001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '28.6139',
      longitude: '77.2090',
    },
    url: BASE_URL,
    telephone: '+91-9334461083',
    priceRange: 'Free',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'City', name: 'Delhi' },
      { '@type': 'City', name: 'Mumbai' },
      { '@type': 'City', name: 'Bangalore' },
      { '@type': 'City', name: 'Hyderabad' },
      { '@type': 'City', name: 'Pune' },
      { '@type': 'City', name: 'Chennai' },
      { '@type': 'City', name: 'Kolkata' },
    ],
    sameAs: [
      'https://twitter.com/TeachersDoor_in',
      'https://www.linkedin.com/company/TeachersDoor',
      'https://www.facebook.com/TeachersDoor.in',
      'https://www.instagram.com/TeachersDoor.in',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '2500',
    },
  };

  return (
    <html lang="en-IN" prefix="og: https://ogp.me/ns#">
      <head>
        {/* ============ FONTS ============ */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <style>{`
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
        `}</style>

        {/* ============ STRUCTURED DATA (JSON-LD) ============ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          key="website-schema"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          key="organization-schema"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgJsonLd) }}
          key="educational-org-schema"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
          key="service-schema"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
          key="webapp-schema"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          key="faq-schema"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
          key="breadcrumb-schema"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
          key="local-business-schema"
        />

        {/* ============ PWA META TAGS ============ */}
        <meta name="application-name" content={SITE_NAME} />
        <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#2563eb" />

        {/* ============ GEO META (India-Specific) ============ */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="geo.position" content="20.5937;78.9629" />
        <meta name="ICBM" content="20.5937, 78.9629" />

        {/* ============ LANGUAGE META ============ */}
        <meta httpEquiv="content-language" content="en-IN, hi-IN" />
        <meta name="language" content="English, Hindi" />

        {/* ============ PWA MANIFEST & ICONS ============ */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/cr.png" type="image/png" />
        <link rel="shortcut icon" href="/cr.png" type="image/png" />
        <link rel="apple-touch-icon" href="/cr.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/cr.png" />

        {/* ============ WINDOWS TILES ============ */}
        <meta name="msapplication-TileImage" content="/cr.png" />

        {/* ============ HREFLANG ============ */}
        <link rel="alternate" hrefLang="en-IN" href={BASE_URL} />
        <link rel="alternate" hrefLang="hi-IN" href={`${BASE_URL}/hi`} />
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />

        {/* ============ SERVICE WORKER ============ */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('TeachersDoor SW registered: ', registration.scope);
                    },
                    function(err) {
                      console.log('TeachersDoor SW registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </head>

      <body suppressHydrationWarning={true}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <PWAInstallPrompt />
          </div>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}