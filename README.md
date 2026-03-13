# 灵活用工资讯 (FlexJob Insights)

面向人力资源公司和劳务公司的灵活用工行业资讯聚合与辅助创作平台。

## 功能特性

- 📰 每日自动抓取灵活用工行业资讯
- 🔥 按热度/时间排序展示
- 🔍 关键词搜索和多来源筛选
- ⭐ 文章收藏功能
- ✍️ 洗稿辅助工具（摘要提取、要点归纳、标题建议）

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- CSS Modules

## 本地开发

```bash
# 安装依赖
npm install --legacy-peer-deps

# 启动开发服务器
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看。

## 部署到 Vercel

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量（如果需要）
4. 部署完成

## 定时数据更新

项目配置了 GitHub Actions 定时任务，每天自动运行爬虫更新数据。

### 手动触发更新

1. 打开 GitHub 仓库的 Actions 页面
2. 选择 "每日抓取灵活用工资讯" 工作流
3. 点击 "Run workflow" 手动触发

## 扩展爬虫

修改 `scripts/crawler.js` 添加实际的爬取逻辑：

```javascript
// 示例: 添加真实爬取逻辑
async function crawlFromWeixin() {
  // 使用搜狗微信搜索 API 或其他方式
}

async function crawlFromToutiao() {
  // 今日头条 API
}
```

## 目录结构

```
flexjob-insights/
├── src/
│   ├── app/              # Next.js 页面
│   │   ├── page.tsx      # 首页（全部文章）
│   │   ├── popular/      # 热门推荐
│   │   ├── favorites/    # 收藏页面
│   │   └── article/      # 文章详情
│   ├── components/       # React 组件
│   └── data/             # 文章数据
├── scripts/              # 爬虫脚本
└── public/               # 静态资源
```

## License

仅供个人学习使用。
