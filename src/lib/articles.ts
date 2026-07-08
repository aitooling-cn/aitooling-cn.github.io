import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  image?: string;
  author: string;
  featured?: boolean;
  affiliateLinks?: { name: string; url: string; price?: string }[];
}

export interface Article {
  meta: ArticleMeta;
  content: string;
  readingTime: number;
}

const articlesDir = path.join(process.cwd(), 'content/articles');

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(articlesDir)) return [];

  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));

  const articles = files.map(filename => {
    const filePath = path.join(articlesDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    const slug = filename.replace(/\.(mdx|md)$/, '');

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || new Date().toISOString().split('T')[0],
      category: data.category || 'uncategorized',
      tags: data.tags || [],
      image: data.image || undefined,
      author: data.author || 'AI Tooling',
      featured: data.featured || false,
      affiliateLinks: data.affiliateLinks || [],
    } as ArticleMeta;
  });

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string): Article | null {
  const extensions = ['.mdx', '.md'];
  let filePath = '';

  for (const ext of extensions) {
    const p = path.join(articlesDir, `${slug}${ext}`);
    if (fs.existsSync(p)) {
      filePath = p;
      break;
    }
  }

  if (!filePath) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);

  return {
    meta: {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || new Date().toISOString().split('T')[0],
      category: data.category || 'uncategorized',
      tags: data.tags || [],
      image: data.image || undefined,
      author: data.author || 'AI Tooling',
      featured: data.featured || false,
      affiliateLinks: data.affiliateLinks || [],
    },
    content,
    readingTime: Math.ceil(stats.minutes),
  };
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return getAllArticles().filter(
    a => a.category.toLowerCase() === category.toLowerCase()
  );
}

export function getFeaturedArticles(): ArticleMeta[] {
  return getAllArticles().filter(a => a.featured);
}

export function getRecentArticles(count: number = 5): ArticleMeta[] {
  return getAllArticles().slice(0, count);
}

export function getAllCategories(): { name: string; slug: string; count: number }[] {
  const articles = getAllArticles();
  const categoryMap = new Map<string, number>();

  articles.forEach(a => {
    const cat = a.category;
    categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
  });

  return Array.from(categoryMap.entries()).map(([name, count]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    slug: name,
    count,
  }));
}

export function getAllTags(): { name: string; count: number }[] {
  const articles = getAllArticles();
  const tagMap = new Map<string, number>();

  articles.forEach(a => {
    a.tags.forEach(tag => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export const categories = [
  { name: 'AI Writing', slug: 'writing', description: 'AI写作工具评测与使用指南' },
  { name: 'AI Image', slug: 'image', description: 'AI图像生成与编辑工具' },
  { name: 'AI Coding', slug: 'coding', description: 'AI编程辅助工具' },
  { name: 'AI Video', slug: 'video', description: 'AI视频生成与编辑工具' },
  { name: 'AI Productivity', slug: 'productivity', description: 'AI效率工具' },
];
