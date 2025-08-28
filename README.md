This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
### Project Structure
```
* app/: This directory contains the layout and pages for your site.
    * app/page.tsx: The code for your homepage.
    * app/posts/[slug]/page.tsx: The template for individual blog post pages.
* components/: This holds reusable parts of your UI, like the Profile.tsx component and the icons.
* lib/: Contains the logic for fetching your post data (posts.ts).
* public/: All your static assets, like images, are stored here.
* `posts/`: This is where you add your blog posts.

How to Add a New Post

To create a new blog post, simply add a new Markdown file (e.g., my-new-post.md) inside the posts/ directory. Make sure to include the title and date at the
top, followed by a --- separator for the preview, like this:

1 ---
2 title: 'My New Post'
3 date: '2024-08-26'
4 ---
5
6 This is the preview of my new post.
7 ---
8
9 This is the rest of the content of my new post.
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
