export const dynamic = 'force-dynamic';
import { fetchFromStrapi } from '@/lib/strapi';
import Link from 'next/link';
import React from 'react';
import '../post.css'; // 导入帖子专用样式
import HomeIcon from '@/components/icons/HomeIcon';
import PostsIcon from '@/components/icons/PostsIcon';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export async function generateStaticParams() {
  const posts = await fetchFromStrapi('posts');
  return (posts.data || []).map((post: any) => ({
    slug: post.id.toString(),
  }));
}

async function getPostData(slug: string) {
  const postRes = await fetchFromStrapi('posts', { filters: { id: { $eq: slug } } });
  const post = postRes.data && postRes.data[0];
  if (!post) {
    return null;
  }
  return post;
}

export default async function Post({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);

  // 如果找不到帖子，显示一个友好的未找到页面
  if (!postData) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Post Not Found</h1>
        <p className="mt-4 text-gray-600">Sorry, we couldn't find the post you were looking for.</p>
        <div className="mt-8">
          <Link href="/posts" className="bluewhite-button">
            Back to All Posts
          </Link>
        </div>
      </div>
    );
  }

  const publishedDate = new Date(postData.publishedAt || postData.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    // 使用 Tailwind 的 container 类来居中和约束内容宽度
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <main className="max-w-4xl mx-auto">
        {/* 导航 */}
        <nav className="flex items-center gap-6 mb-8 text-gray-500">
          <Link href="/" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <HomeIcon className="w-7 h-7" />
            <span>Home</span>
          </Link>
          <Link href="/posts" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <PostsIcon className="w-6 h-6" />
            <span>All Posts</span>
          </Link>
        </nav>

        <article>
          {/* 文章标题和元信息 */}
          <header className="mb-12 border-b pb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              {postData.title}
            </h1>
            <p className="text-gray-500">
              Published on {publishedDate}
            </p>
          </header>

          {/* 
            文章内容
            MarkdownRenderer 组件会渲染 Markdown，并应用来自 post.css 的 .post-content 样式
          */}
          <MarkdownRenderer
            content={postData.body || ''}
            className="post-content"
          />

          {/* 页脚 */}
          <footer className="text-center py-10 mt-16 text-gray-500 border-t">
            <p>&copy; {new Date().getFullYear()} Ecokayiza. All rights reserved.</p>
          </footer>
        </article>
      </main>
    </div>
  );
}