"use client";
export const dynamic = 'force-dynamic';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import './posts/posts.css';
import Link from 'next/link';
import { fetchFromStrapi } from '@/lib/strapi';
import Profile from '@/components/Profile';
import PostsIcon from '@/components/icons/PostsIcon';
import AdminIcon from '@/components/icons/AdminIcon';
import LivestreamIcon from '@/components/icons/LivestreamIcon';
import FancyParticlesBG from '@/components/FancyParticlesBG';

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
        a: ({node, ...props}) => {
          const className = props.className || '';
          if (className.includes('bluewhite-button')) {
            return <a {...props} className="bluewhite-button" />;
          }
          if (className.includes('github-link')) {
            return <a {...props} className="github-link" />;
          }
          return <a {...props} />;
        },
        img: ({node, ...props}) => (
          <img {...props} className="preview-img" />
        )
      }}
    >{preview}</ReactMarkdown>
  );
}

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let mounted = true;
    fetchFromStrapi('posts').then(allPostsData => {
      if (!mounted) return;
      const sorted = (allPostsData.data || []).slice().sort((a: any, b: any) => {
        const getDate = (post: any) => post.date || post.publishedAt || post.createdAt || '';
        return new Date(getDate(b)).getTime() - new Date(getDate(a)).getTime();
      }).slice(0, 4);
      setPosts(sorted);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  return (
    <>
      <FancyParticlesBG />
      <div className="fancy-bg fixed inset-0 -z-10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="flex justify-end space-x-4 mb-8">
          <Link href="/live" className="text-gray-600 hover:text-pink-600 font-semibold flex items-center" title="Go to Live">
            <LivestreamIcon className='w-6 h-6' />
          </Link>
          <Link href="/posts" className="text-gray-600 hover:text-blue-600 font-semibold flex items-center" title="Go to Posts">
            <PostsIcon className="w-6 h-6" />
          </Link>
          <Link href="http://admin.ecokayizasweb.xyz" className="text-gray-600 hover:text-blue-600 font-semibold flex items-center" title='Go to Admin'>
            <AdminIcon className="w-6 h-6" />
          </Link>
        </header>

        {/* Profile */}
        <Profile />

        <main className="mt-12">
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Recent Posts</h2>
            <div className="grid gap-8 lg:grid-cols-2">
              {loading ? (
                <div className="text-gray-400">Loading...</div>
              ) : posts.length === 0 ? (
                <div className="text-gray-400">No posts found.</div>
              ) : (
                posts.map((post: any) => (
                  <article key={post.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                    <header>
                      <h3 className="text-2xl font-bold mb-2">
                        <Link href={`/posts/${post.id}`} className="text-gray-900 hover:text-blue-600 transition-colors">
                          {post.title ? post.title : "Untitled Post"}
                        </Link>
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">
                        {post.date
                          ? new Date(post.date).toLocaleDateString()
                          : post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString()
                            : post.createdAt
                              ? new Date(post.createdAt).toLocaleDateString()
                              : ''}
                      </p>
                    </header>
                    <div className="text-gray-700">
                      <div className="preview-content">{renderBody(post.body)}</div>
                    </div>
                    <footer className="mt-4">
                      <Link href={`/posts/${post.id}`} className="text-blue-600 hover:underline font-semibold">
                        Read more
                      </Link>
                    </footer>
                  </article>
                ))
              )}
            </div>
          </section>
        </main>

        <footer className="text-center py-10 mt-12 text-gray-500">
          <p>&copy; {new Date().getFullYear()} Ecokayiza. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
