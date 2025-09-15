export const dynamic = 'force-dynamic';
import { fetchFromStrapi } from '@/lib/strapi';
import Link from 'next/link';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import '../posts.css';
import PostsIcon from '@/components/icons/PostsIcon';
import FancyParticlesBG from '@/components/FancyParticlesBG';

function renderBody(body: any) {
  if (!body) return <p className="text-gray-400 italic">No content available.</p>;
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeRaw, rehypeKatex]}
      components={{
        h1: ({node, ...props}) => (
          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: 800,
            margin: '1.5rem 0 1rem 0',
            color: '#c47191'
          }} {...props} />
        ),
        h2: ({node, ...props}) => (
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            margin: '1.2rem 0 0.8rem 0',
            color: '#a05c7a'
          }} {...props} />
        ),
        h3: ({node, ...props}) => (
          <h3 style={{
            fontSize: '1.2rem',
            fontWeight: 600,
            margin: '1rem 0 0.6rem 0',
            color: '#6c3c54'
          }} {...props} />
        ),
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
        code: ({node, ...props}) => (
          <code style={{
            background: '#f5f5f5',
            padding: '2px 6px',
            borderRadius: '4px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.95em',
            whiteSpace: 'pre',
            tabSize: '4',
            MozTabSize: '4',
            WebkitTabSize: '4',
          }}>
            {props.children}
          </code>
        ),
        pre: ({node, ...props}) => (
          <pre style={{
            background: '#f5f5f5',
            padding: '12px',
            borderRadius: '6px',
            overflowX: 'auto',
            whiteSpace: 'pre',
            tabSize: '4',
            MozTabSize: '4',
            WebkitTabSize: '4',
          }}>
            {props.children}
          </pre>
        ),
        blockquote: ({node, ...props}) => (
          <blockquote
            style={{
              borderLeft: '4px solid #c47191',
              background: '#f9f6fa',
              padding: '8px 16px',
              margin: '12px 0',
              color: '#a05c7a',
              fontStyle: 'italic',
            }}
            {...props}
          />
        ),
        p: ({node, ...props}) => (
          <p style={{
            whiteSpace: 'pre-line',
            lineHeight: '1.6'
          }} {...props} />
        ),
      }}
    >{body}</ReactMarkdown>
  );
}

export async function generateStaticParams() {
  const posts = await fetchFromStrapi('posts');
  return posts.data.map((post: any) => ({
    slug: post.id.toString(),
  }));
}

async function getPostData(slug: string) {
  // 查询单条 post
  const postRes = await fetchFromStrapi('posts', { filters: { id: { $eq: slug } } });
  const post = postRes.data && postRes.data[0];
  return post
    ? { ...post, contentHtml: renderBody(post.body) }
    : { title: 'Not Found', date: '', body: '', contentHtml: <p>Post not found.</p> };
}

export default async function Post({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);
    return (
    <>
      <FancyParticlesBG />
      <div className="fancy-bg-dynamic fixed inset-0 -z-10" />
      <div className="min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="mb-8 flex items-center justify-between">
              
            <Link href="/" className="text-gray-600 hover:text-pink-600 font-semibold flex items-center" title="Back to Home">
              <img src="/home.svg" alt="Home" className="w-7 h-7" />
            </Link>
            <Link href="/posts" className="text-gray-600 hover:text-pink-600 font-semibold flex items-center" title="Back to All Posts">
              <PostsIcon className="w-6 h-6" />
              </Link>
              
          </header>
        <main>
          <article className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl max-w-3xl mx-auto border border-gray-100">
            <header className="mb-8 text-center border-b pb-8">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                {postData.title}
              </h1>
              <p className="text-gray-400 text-sm mb-2">
                Published: {
                  postData.date
                    ? new Date(postData.date).toLocaleDateString()
                    : postData.publishedAt
                      ? new Date(postData.publishedAt).toLocaleDateString()
                      : postData.createdAt
                        ? new Date(postData.createdAt).toLocaleDateString()
                        : ''
                }
              </p>
            </header>
            <div className="prose prose-lg lg:prose-xl max-w-none text-gray-800 leading-relaxed">
              {postData.contentHtml}
            </div>
            <footer className="mt-12 pt-8 border-t text-center text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Ecokayiza. All rights reserved.
            </footer>
          </article>
        </main>
      </div>
    </div>
    </>
  );
}
