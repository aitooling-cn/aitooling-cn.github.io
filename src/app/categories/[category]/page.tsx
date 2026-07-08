import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { getArticlesByCategory, categories } from '@/lib/articles';

export async function generateStaticParams() {
  return categories.map(cat => ({ category: cat.slug }));
}
import { generatePageMetadata } from '@/components/SEO';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const catInfo = categories.find(c => c.slug === category);
  if (!catInfo) return { title: '分类未找到' };

  return generatePageMetadata({
    title: `${catInfo.name} - AI工具评测`,
    description: catInfo.description,
    path: `/categories/${category}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const catInfo = categories.find(c => c.slug === category);

  if (!catInfo) {
    notFound();
  }

  const articles = getArticlesByCategory(category);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              {catInfo.name}
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              {catInfo.description}
            </p>
          </div>

          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-gray-500 dark:text-gray-400">该分类暂无文章</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">我们正在准备相关内容，敬请期待！</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
