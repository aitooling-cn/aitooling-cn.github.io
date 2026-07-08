import Link from 'next/link';
import { ArrowRight, Star, TrendingUp, Zap, Sparkles } from 'lucide-react';
import ArticleCard from '@/components/ArticleCard';
import { getRecentArticles, getFeaturedArticles, getAllCategories } from '@/lib/articles';

export default function HomePage() {
  const recentArticles = getRecentArticles(10);
  const featuredArticles = getFeaturedArticles();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
              <Sparkles size={14} className="mr-1" />
              2025年最佳AI工具评测
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
              发现最好用的
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> AI工具</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
              我们深度评测市面上最热门的AI工具，帮你节省时间、提高效率。
              从写作到编程，从图像到视频，找到最适合你的AI助手。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/categories/writing"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-600/25"
              >
                开始探索
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
              >
                了解更多
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 mb-8">
            <Star className="text-yellow-500" size={24} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">精选评测</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 mb-8">
            <TrendingUp className="text-green-500" size={24} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">浏览分类</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map(cat => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {cat.count} 篇文章
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 mb-8">
          <Zap className="text-blue-500" size={24} />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">最新评测</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentArticles.map(article => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        {recentArticles.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p className="text-lg">暂无文章</p>
            <p className="text-sm mt-2">我们正在准备精彩的AI工具评测内容，敬请期待！</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            不想错过最新的AI工具？
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            订阅我们的RSS Feed，第一时间获取最新AI工具评测和使用技巧。
          </p>
          <Link
            href="/rss.xml"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
          >
            订阅 RSS
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
