"use client";
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { fetchFromStrapi } from '@/lib/strapi';
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import './posts.css';
import HomeIcon from '@/components/icons/HomeIcon';



function renderBody(body: any) {
  if (!body) return <span className="text-gray-400 italic">No preview available.</span>;
  // 只显示前 5 行内容
  let preview = '';
  if (typeof body === 'string') {
    const lines = body.split(/\r?\n/).filter(l => l.trim() !== '');
    preview = lines.slice(0, 5).join('\n');
  }
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        img: ({node, ...props}) => (
          <img {...props} className="preview-img" />
        )
      }}
    >{preview}</ReactMarkdown>
  );
}

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    fetchFromStrapi('posts').then(res => {
      // 按时间倒序排列
      const sorted = (res.data || []).slice().sort((a: any, b: any) => {
        const getDate = (post: any) => post.date || post.publishedAt || post.createdAt || '';
        return new Date(getDate(b)).getTime() - new Date(getDate(a)).getTime();
      });
      setPosts(sorted);
    });
  }, []);
  const filteredPosts = posts.filter((post: any) => {
    const keyword = search.toLowerCase();
    return (
      post.title?.toLowerCase().includes(keyword) ||
      (typeof post.body === 'string' ? post.body.toLowerCase().includes(keyword) : false)
    );
  });
  return (
    <>
      <div className="fancy-bg-dynamic fixed inset-0 -z-10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="flex items-center mb-8">
          <Link href="/" className="hover:text-blue-800 p-2 rounded-full transition-colors" title="Back to Home">
            <HomeIcon className="w-7 h-7" />
          </Link>
          <h2 className="text-3xl font-bold text-gray-800 ml-4">All Posts</h2>
        </header>
        <main>
          <section>
            <div className="mb-8">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search posts..."
                className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="flex flex-col gap-8">
              {filteredPosts.length > 0 ? filteredPosts.map((post: any) => (
                <article key={post.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                  <header>
                    <h3 className="text-2xl font-bold mb-2">
                      <Link href={`/posts/${post.id}`} className="text-gray-900 hover:text-blue-600 transition-colors">
                        {post.title ? post.title : "Untitled Post"}
                      </Link>
                    </h3>
                  </header>
                  <div className="text-gray-700 preview-outer">
                    <div className="preview-content">{renderBody(post.body)}</div>
                  </div>
                  <footer className="mt-4">
                    <Link href={`/posts/${post.id}`} className="text-blue-600 hover:underline font-semibold">
                      Read more
                    </Link>
                  </footer>
                </article>
              )) : (
                <div className="text-gray-400 italic">No posts found.</div>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}