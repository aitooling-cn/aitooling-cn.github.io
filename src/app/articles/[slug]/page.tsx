import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getArticleBySlug, getAllArticles } from '@/lib/articles';
import { generateArticleMetadata, JsonLdArticle } from '@/components/SEO';
import { Calendar, Clock, Tag, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map(article => ({ slug: article.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: '文章未找到' };

  return generateArticleMetadata({
    title: article.meta.title,
    description: article.meta.description,
    date: article.meta.date,
    tags: article.meta.tags,
    slug: article.meta.slug,
  });
}

const mdxComponents = {
  h2: (props: any) => <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3" {...props} />,
  p: (props: any) => <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700 dark:text-gray-300" {...props} />,
  li: (props: any) => <li className="ml-4" {...props} />,
  a: (props: any) => (
    <a
      className="text-blue-600 dark:text-blue-400 hover:underline"
      target="_blank"
      rel="noopener noreferrer nofollow"
      {...props}
    />
  ),
  strong: (props: any) => <strong className="font-semibold text-gray-900 dark:text-white" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 my-4 text-gray-600 dark:text-gray-400 italic" {...props} />
  ),
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <JsonLdArticle
        article={{
          title: article.meta.title,
          description: article.meta.description,
          date: article.meta.date,
          slug: article.meta.slug,
          author: article.meta.author,
        }}
      />
      <Header />
      <main className="flex-1">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            返回首页
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
              <span className="flex items-center space-x-1">
                <Calendar size={14} />
                <time>{article.meta.date}</time>
              </span>
              <span className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{article.readingTime} 分钟阅读</span>
              </span>
              <Link
                href={`/categories/${article.meta.category}`}
                className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
              >
                {article.meta.category}
              </Link>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
              {article.meta.title}
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {article.meta.description}
            </p>

            {/* Tags */}
            {article.meta.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {article.meta.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full"
                  >
                    <Tag size={10} className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Ad Banner Top */}
          <div className="my-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Advertisement</p>
            <div className="h-24 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm border border-dashed border-gray-300 dark:border-gray-600 rounded">
              广告位 - Google AdSense
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <MDXRemote source={article.content} components={mdxComponents} />
          </div>

          {/* Affiliate Links */}
          {article.meta.affiliateLinks && article.meta.affiliateLinks.length > 0 && (
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                <ExternalLink size={18} className="mr-2 text-blue-600" />
                推荐链接
              </h3>
              <ul className="space-y-2">
                {article.meta.affiliateLinks.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      {link.name}
                      {link.price && <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 font-normal">({link.price})</span>}
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ad Banner Bottom */}
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Advertisement</p>
            <div className="h-24 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm border border-dashed border-gray-300 dark:border-gray-600 rounded">
              广告位 - Google AdSense
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
