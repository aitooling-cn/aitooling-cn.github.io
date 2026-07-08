import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { generatePageMetadata } from '@/components/SEO';
import type { Metadata } from 'next';
import { Zap, Target, Users, Shield } from 'lucide-react';

export const metadata: Metadata = generatePageMetadata({
  title: '关于我们',
  description: '了解AITooling - 专业的AI工具评测与使用指南平台。我们帮助用户找到最适合的AI工具。',
  path: '/about',
});

const values = [
  {
    icon: Zap,
    title: '高效',
    description: '我们帮你快速找到最合适的AI工具，节省宝贵时间。',
  },
  {
    icon: Target,
    title: '专业',
    description: '深度评测，真实体验，提供专业的使用建议。',
  },
  {
    icon: Users,
    title: '客观',
    description: '不受厂商影响，独立公正地评测每一款AI工具。',
  },
  {
    icon: Shield,
    title: '可靠',
    description: '只推荐经过验证的优质AI工具，确保你的使用体验。',
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            关于 AITooling
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            AITooling 是一个专业的AI工具评测与使用指南平台。我们的使命是帮助每个人找到最适合自己的AI工具，提升工作效率和创造力。
          </p>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {values.map(v => (
              <div
                key={v.title}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <v.icon className="text-blue-600 dark:text-blue-400 mb-3" size={28} />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{v.description}</p>
              </div>
            ))}
          </div>

          {/* What we do */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">我们做什么</h2>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <p>🔍 <strong>深度评测</strong>：我们亲自测试每一款AI工具，从功能、价格、易用性等多个维度进行评估。</p>
              <p>📊 <strong>横向对比</strong>：将同类AI工具进行横向对比，帮你一目了然地看出差异。</p>
              <p>📝 <strong>使用指南</strong>：提供详细的使用教程和最佳实践，让你快速上手。</p>
              <p>🆕 <strong>行业动态</strong>：跟踪AI行业最新动态，及时更新工具信息和推荐。</p>
            </div>
          </section>

          {/* Monetization */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">盈利模式</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              AITooling 通过以下方式维持运营：
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li><strong>联盟营销</strong>：部分产品链接为联盟链接，通过我们的链接购买我们可能获得佣金（不影响你的价格）。</li>
              <li><strong>广告收入</strong>：网站展示Google AdSense广告。</li>
              <li><strong>赞助内容</strong>：接受AI工具厂商的赞助评测（会明确标注）。</li>
            </ul>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">联系我们</h2>
            <p className="text-gray-600 dark:text-gray-400">
              如有任何问题或合作意向，欢迎通过以下方式联系我们：
            </p>
            <div className="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400">📧 邮箱：contact@aitooling.com</p>
              <p className="text-gray-600 dark:text-gray-400 mt-2">🐦 Twitter：@aitooling</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
