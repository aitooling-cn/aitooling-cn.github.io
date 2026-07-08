import Link from 'next/link';
import { Calendar, Clock, Tag } from 'lucide-react';
import type { ArticleMeta } from '@/lib/articles';

interface ArticleCardProps {
  article: ArticleMeta;
  readingTime?: number;
}

export default function ArticleCard({ article, readingTime }: ArticleCardProps) {
  return (
    <article className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
      <Link href={`/articles/${article.slug}`}>
        {article.image && (
          <div className="aspect-video overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span className="flex items-center space-x-1">
              <Calendar size={12} />
              <time>{article.date}</time>
            </span>
            {readingTime && (
              <span className="flex items-center space-x-1">
                <Clock size={12} />
                <span>{readingTime} min read</span>
              </span>
            )}
            <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium">
              {article.category}
            </span>
          </div>

          <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
            {article.title}
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
            {article.description}
          </p>

          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {article.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full"
                >
                  <Tag size={10} className="mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
