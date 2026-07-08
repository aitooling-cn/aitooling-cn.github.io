import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AITooling - AI工具评测与使用指南',
  description: '发现最好用的AI工具，提升你的工作效率。深度评测ChatGPT、Claude、Midjourney等热门AI工具。',
  openGraph: {
    title: 'AITooling - AI工具评测与使用指南',
    description: '发现最好用的AI工具，提升你的工作效率。深度评测ChatGPT、Claude、Midjourney等热门AI工具。',
    type: 'website',
    siteName: 'AITooling',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AITooling - AI工具评测与使用指南',
    description: '发现最好用的AI工具，提升你的工作效率。',
  },
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const mode = localStorage.getItem('darkMode');
                  if (mode === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        {/* Google AdSense placeholder */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
}
