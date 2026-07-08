import type { Metadata } from 'next';
import Script from 'next/script';

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  tags?: string[];
  canonicalUrl?: string;
}

const SITE_NAME = 'AITooling - AI工具评测与使用指南';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aitooling.com';

export function generateArticleMetadata(article: {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
}): Metadata {
  return {
    title: `${article.title} - AITooling`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      tags: article.tags,
      url: `${SITE_URL}/articles/${article.slug}`,
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
    alternates: {
      canonical: `${SITE_URL}/articles/${article.slug}`,
    },
  };
}

export function generatePageMetadata(page: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  return {
    title: page.title.includes('AITooling') ? page.title : `${page.title} - AITooling`,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'website',
      url: `${SITE_URL}${page.path || ''}`,
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
    },
    alternates: {
      canonical: `${SITE_URL}${page.path || ''}`,
    },
  };
}

export function JsonLdArticle({ article }: { article: { title: string; description: string; date: string; slug: string; author: string } }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/articles/${article.slug}`,
    },
  };

  return (
    <Script
      id="article-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function JsonLdOrganization() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: '发现最好用的AI工具，提升你的工作效率。专业的AI工具评测与使用指南平台。',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
