# 京剧艺术网 (Jingju Art Website)

这是一个基于 [Next.js](https://nextjs.org/) 搭建的中国传统京剧介绍网站，使用 [`c3`](https://developers.cloudflare.com/pages/get-started/c3) 引导创建。

## 项目简介

京剧艺术网是一个致力于传播和推广中国传统京剧文化的平台。网站提供丰富的京剧知识、音视频资源和互动社区，为京剧爱好者和研究者提供一个学习和交流的空间。

## 网站功能

### 用户端功能

1. **首页**
   - 网站概览和导航
   - 精选内容展示
   - 最新活动和资讯
   - 网站管理员入口

2. **知识库**
   - 京剧历史沿革
   - 流派介绍
   - 角色行当分类（生旦净丑）
   - 代表性剧目介绍
   - 名家介绍
   - 京剧文化知识

3. **试听资源**
   - 经典唱段音频
   - 表演视频集锦
   - 按流派/演员分类浏览
   - 资源收藏功能

4. **问答社区**
   - 用户讨论区
   - 问题提问与回答
   - 京剧学习心得分享
   - 用户评论系统
   - AI智能问答功能（京剧知识解答）

5. **用户系统**
   - 用户注册与登录
   - 个人资料管理
   - 收藏夹
   - 互动记录

### 管理员功能

1. **管理员入口**
   - 位于首页，需要管理员权限登录

2. **内容管理**
   - 知识库内容编辑
   - 资源上传与管理
   - 用户评论审核

3. **用户管理**
   - 用户账号管理
   - 权限设置

4. **数据统计**
   - 网站访问数据
   - 内容热度统计

5. **AI问答管理**
   - 训练数据管理
   - 问答质量监控

## 项目结构

```
my-jingju-app/
├── app/                      # Next.js 应用主目录
│   ├── api/                  # API 路由
│   ├── admin/                # 管理员页面
│   │   ├── dashboard/        # 管理员控制台
│   │   ├── content/          # 内容管理
│   │   ├── users/            # 用户管理
│   │   └── stats/            # 数据统计
│   ├── knowledge/            # 知识库页面
│   ├── resources/            # 试听资源页面
│   ├── community/            # 问答社区页面
│   ├── user/                 # 用户相关页面
│   └── page.tsx              # 首页
├── components/               # 可复用组件
│   ├── layout/               # 布局组件
│   │   ├── Header.tsx        # 页头组件
│   │   ├── Footer.tsx        # 页脚组件
│   │   ├── Sidebar.tsx       # 侧边栏组件
│   │   └── Layout.tsx        # 主布局组件
│   ├── ui/                   # UI 通用组件
│   │   ├── Button.tsx        # 按钮组件
│   │   ├── Card.tsx          # 卡片组件
│   │   ├── Modal.tsx         # 模态框组件
│   │   └── ...
│   ├── knowledge/            # 知识库相关组件
│   ├── resources/            # 资源相关组件
│   └── community/            # 社区相关组件
├── lib/                      # 工具库和辅助函数
│   ├── db/                   # 数据库相关
│   ├── auth/                 # 认证相关
│   └── utils/                # 通用工具函数
├── public/                   # 静态资源
│   ├── images/               # 图片资源
│   ├── audios/               # 音频资源
│   └── videos/               # 视频资源
├── styles/                   # 样式文件
├── types/                    # TypeScript 类型定义
└── ...
```

## 组件复用策略

### 布局组件

- **Layout**: 提供全站统一的布局框架
- **Header/Footer**: 全站统一的页头和页脚
- **Sidebar**: 根据页面类型显示不同的侧边栏内容

### 内容展示组件

- **KnowledgeCard**: 知识点卡片，用于展示京剧知识
- **ResourcePlayer**: 音视频播放器，支持音频和视频资源
- **ArticleList/ArticleDetail**: 文章列表和详情页
- **CommentSection**: 评论区组件，可在多处复用
- **AIChat**: AI对话组件，用于京剧知识问答

### 交互组件

- **SearchBar**: 全站搜索组件
- **Pagination**: 分页组件
- **UserAvatar**: 用户头像组件
- **RatingSystem**: 评分组件

## 数据管理

- 使用 Next.js API Routes 构建后端 API
- 可考虑使用 MongoDB、PostgreSQL 或 Firebase 作为数据库
- 用户认证可使用 NextAuth.js
- AI问答功能可考虑接入OpenAI API

## 开发指南

### 环境搭建

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

### 开发规范

1. **代码风格**
   - 使用 ESLint 和 Prettier 保持代码风格一致
   - 遵循 TypeScript 类型定义

2. **组件开发**
   - 采用函数式组件和 React Hooks
   - 组件职责单一，提高复用性

3. **状态管理**
   - 局部状态：React useState
   - 全局状态：考虑使用 Context API 或 Redux

4. **路由规范**
   - 遵循 Next.js App Router 规范
   - 采用层级清晰的路由结构

## 部署方案

- 可部署在 Vercel、Cloudflare Pages 等平台
- 根据需要可配置 CI/CD 管道

## 版本计划

### V1.0 (基础版)
- 完成网站基本架构
- 实现知识库核心功能
- 基础用户系统

### V2.0 (完善版)
- 添加试听资源功能
- 完善问答社区
- 增强管理员功能

### V3.0 (增强版)
- 增加用户互动功能
- 优化移动端体验
- 添加数据分析功能

## 贡献指南

欢迎对项目进行贡献，请遵循以下步骤：
1. Fork 仓库
2. 创建新分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 许可证

[MIT](https://choosealicense.com/licenses/mit/)

## Cloudflare integration

Besides the `dev` script mentioned above `c3` has added a few extra scripts that allow you to integrate the application with the [Cloudflare Pages](https://pages.cloudflare.com/) environment, these are:
  - `pages:build` to build the application for Pages using the [`@cloudflare/next-on-pages`](https://github.com/cloudflare/next-on-pages) CLI
  - `preview` to locally preview your Pages application using the [Wrangler](https://developers.cloudflare.com/workers/wrangler/) CLI
  - `deploy` to deploy your Pages application using the [Wrangler](https://developers.cloudflare.com/workers/wrangler/) CLI

> __Note:__ while the `dev` script is optimal for local development you should preview your Pages application as well (periodically or before deployments) in order to make sure that it can properly work in the Pages environment (for more details see the [`@cloudflare/next-on-pages` recommended workflow](https://github.com/cloudflare/next-on-pages/blob/main/internal-packages/next-dev/README.md#recommended-development-workflow))

### Bindings

Cloudflare [Bindings](https://developers.cloudflare.com/pages/functions/bindings/) are what allows you to interact with resources available in the Cloudflare Platform.

You can use bindings during development, when previewing locally your application and of course in the deployed application:

- To use bindings in dev mode you need to define them in the `next.config.js` file under `setupDevBindings`, this mode uses the `next-dev` `@cloudflare/next-on-pages` submodule. For more details see its [documentation](https://github.com/cloudflare/next-on-pages/blob/05b6256/internal-packages/next-dev/README.md).

- To use bindings in the preview mode you need to add them to the `pages:preview` script accordingly to the `wrangler pages dev` command. For more details see its [documentation](https://developers.cloudflare.com/workers/wrangler/commands/#dev-1) or the [Pages Bindings documentation](https://developers.cloudflare.com/pages/functions/bindings/).

- To use bindings in the deployed application you will need to configure them in the Cloudflare [dashboard](https://dash.cloudflare.com/). For more details see the  [Pages Bindings documentation](https://developers.cloudflare.com/pages/functions/bindings/).

#### KV Example

`c3` has added for you an example showing how you can use a KV binding.

In order to enable the example:
- Search for javascript/typescript lines containing the following comment:
  ```ts
  // KV Example:
  ```
  and uncomment the commented lines below it (also uncomment the relevant imports).
- In the `wrangler.jsonc` file add the following configuration line:
  ```
  "kv_namespaces": [{ "binding": "MY_KV_NAMESPACE", "id": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" }],
  ```
- If you're using TypeScript run the `cf-typegen` script to update the `env.d.ts` file:
  ```bash
  npm run cf-typegen
  # or
  yarn cf-typegen
  # or
  pnpm cf-typegen
  # or
  bun cf-typegen
  ```

After doing this you can run the `dev` or `preview` script and visit the `/api/hello` route to see the example in action.

Finally, if you also want to see the example work in the deployed application make sure to add a `MY_KV_NAMESPACE` binding to your Pages application in its [dashboard kv bindings settings section](https://dash.cloudflare.com/?to=/:account/pages/view/:pages-project/settings/functions#kv_namespace_bindings_section). After having configured it make sure to re-deploy your application.
