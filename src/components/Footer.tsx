import Link from 'next/link';

const categories = [
  { name: 'AI Writing', slug: 'writing' },
  { name: 'AI Image', slug: 'image' },
  { name: 'AI Coding', slug: 'coding' },
  { name: 'AI Video', slug: 'video' },
  { name: 'AI Productivity', slug: 'productivity' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AITooling
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              发现最好用的AI工具，提升你的工作效率。
            </p>
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
              © {new Date().getFullYear()} AITooling. All rights reserved.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">分类</h3>
            <ul className="space-y-2">
              {categories.map(cat => (
                <li key={cat.slug}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="/rss.xml" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  RSS Feed
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">声明</h3>
            <p className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed">
              本站部分链接为联盟链接。通过我们的链接购买产品，我们可能会获得少量佣金，这不会影响您的购买价格。我们只推荐我们真正认可的产品。
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
