# Home_Page

这是一个基于 Next.js + Tailwind CSS 的个人博客与主页项目，支持动态内容、Obsidian Style Markdown 渲染、粒子特效背景、Strapi 后端集成。


## 功能
- Next.js 14 App Router
- Tailwind CSS 美化
- Markdown/HTML 渲染
- 粒子与渐变炫酷背景
- Strapi 内容管理
- 支持自定义按钮、图片、SVG 图标
- 搜索、导航、响应式布局

## 项目结构

```
/
├── app/                      # Next.js App Router 核心目录
│   ├── posts/                # 帖子相关页面
│   │   ├── [slug]/page.tsx   # 单个帖子详情页 (动态路由)
│   │   └── page.tsx          # 帖子列表页
│   ├── globals.css           # 全局 CSS 样式
│   ├── layout.tsx            # 根布局
│   └── page.tsx              # 网站主页 (/)
│
├── components/               # 可重用 React 组件
│   ├── icons/                # SVG 图标组件
│   ├── Profile.tsx           # 个人资料组件
│   ├── FancyParticlesBG.tsx  # 粒子背景组件
│   └── MarkdownRenderer.tsx  # Markdown 渲染器
│
├── lib/                      # 辅助函数和库
│   └── strapi.ts             # 与 Strapi API 交互的函数
│
├── public/                   # 静态资源目录
│   └── favicon.svg           
│
├── .gitignore                # Git 忽略文件配置
├── next.config.mjs           # Next.js 配置文件
├── package.json              # 项目依赖和脚本
├── postcss.config.js         # PostCSS 配置文件
├── README.md                 # 项目说明文件
└── tailwind.config.ts        # Tailwind CSS 配置文件
```

## 本地开发
```bash
npm install
npm run dev
```

## 生产部署（Linux服务器）
1. 上传项目到服务器
2. 安装依赖并构建：
   ```bash
   npm install
   npm run build
   npm start
   ```
3. 推荐用 Nginx 反向代理到 127.0.0.1:3000：
   ```nginx
   location / {
       proxy_pass http://127.0.0.1:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection "upgrade";
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
   }
   ```
4. 其它静态资源和 API 可按需配置 Nginx location。

## 环境要求
- Node.js >= 18
- 推荐 Linux 服务器

## 常见问题
- 端口冲突：如 3000 被占用，可在 `package.json` 的 `start` 命令中指定其它端口。
- Nginx 配置问题：请参考上方 location 配置。

## License
MIT
