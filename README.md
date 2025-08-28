# Home_Page

这是一个基于 Next.js + Tailwind CSS 的个人博客与主页项目，支持动态内容、Markdown 渲染、粒子特效背景、Strapi 后端集成。

## 功能
- Next.js 14 App Router
- Tailwind CSS 美化
- Markdown/HTML 渲染
- 粒子与渐变炫酷背景
- Strapi 内容管理
- 支持自定义按钮、图片、SVG 图标
- 搜索、导航、响应式布局

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
- 粒子背景不显示：请确保 `FancyParticlesBG` 组件已引入且 CSS 正确。
- 端口冲突：如 3000 被占用，可在 `package.json` 的 `start` 命令中指定其它端口。
- Nginx 配置问题：请参考上方 location 配置。

## License
MIT
