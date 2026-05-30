# 个人艺术博客

一个融合视觉艺术与创意设计的个人博客网站，采用"有机未来主义"设计风格。

## 🎨 特色

- **沉浸式视觉体验**：动态粒子背景、3D卡片交互、优雅的动画效果
- **响应式设计**：完美适配桌面、平板和移动端
- **高性能**：纯静态网站，加载速度快，无需后端
- **艺术感强**：独特的视觉设计，区别于传统博客模板

## 📂 项目结构

```
/
├── index.html          # 首页
├── portfolio.html      # 作品集页面
├── about.html          # 关于页面
├── article.html        # 文章详情页
│
├── css/                # 样式文件
│   ├── main.css        # 主样式表
│   ├── variables.css   # CSS 变量
│   ├── typography.css  # 字体系统
│   ├── components.css  # 组件样式
│   ├── animations.css  # 动画效果
│   └── responsive.css  # 响应式样式
│
├── js/                 # JavaScript 文件
│   ├── main.js         # 主入口
│   ├── particles.js    # 粒子系统
│   ├── animations.js   # 动画控制器
│   ├── navigation.js   # 导航系统
│   └── scroll-effects.js  # 滚动效果
│
└── assets/             # 资源文件
    ├── images/         # 图片资源
    └── icons/          # 图标资源
```

## 🚀 快速开始

### 本地运行

1. **克隆仓库**
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

2. **启动本地服务器**

   **方式一：使用 Python**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **方式二：使用 Node.js**
   ```bash
   npx serve
   ```

   **方式三：使用 VS Code**
   - 安装 "Live Server" 插件
   - 右键点击 `index.html`
   - 选择 "Open with Live Server"

3. **访问网站**
   打开浏览器访问 `http://localhost:8000`

## 🌐 部署到 GitHub Pages

1. **推送代码到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "feat: initial release"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **启用 GitHub Pages**
   - 进入仓库 Settings
   - 找到 Pages 选项
   - Source 选择 `main` branch
   - 点击 Save

3. **访问你的网站**
   - 等待几分钟后访问 `https://yourusername.github.io/your-repo`

## 🎯 主要功能

### 首页
- 全屏艺术 Hero 区域，带动态粒子背景
- 精选作品展示（3D 卡片效果）
- 最新文章动态
- 关于预览
- 联系方式

### 作品集
- 作品画廊展示
- 分类筛选功能
- 悬停交互效果

### 关于页面
- 个人介绍
- 技能展示（动画进度条）
- 创作历程时间轴
- 设计理念

### 文章详情
- 优雅的文章排版
- 代码高亮支持
- 图片灯箱
- 相关推荐
- 评论系统

## 🎨 设计规范

### 色彩系统
- **主色调**：深空蓝 `#0a1628`
- **强调色**：琥珀金 `#d4a574`
- **次要强调**：薄荷绿 `#7dd3c0`
- **背景色**：深邃黑 `#050a12`
- **文字色**：柔和白 `#e8e6e3`

### 字体系统
- **标题**：Playfair Display
- **正文**：Source Sans 3
- **艺术强调**：Cormorant Garamond

## 🛠 技术栈

- **HTML5**：语义化标签
- **CSS3**：CSS Grid、Flexbox、变量、动画
- **JavaScript**：ES6+、Canvas API、Intersection Observer
- **无框架依赖**：纯原生实现，轻量级

## 📱 响应式断点

- **桌面端**：1200px+
- **平板端**：768px - 1199px
- **移动端**：< 768px

## 🔧 自定义

### 修改配色
编辑 `css/variables.css` 中的 CSS 变量：

```css
:root {
  --primary: #your-color;
  --accent: #your-color;
  --secondary: #your-color;
}
```

### 添加新页面
1. 复制现有页面（如 `about.html`）
2. 修改内容和样式
3. 更新导航菜单

### 修改作品集
编辑 `portfolio.html` 中的 `.portfolio-item` 元素

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解更多详情

## 🙏 致谢

- [Google Fonts](https://fonts.google.com/) - 字体资源
- [Unsplash](https://unsplash.com/) - 高质量图片
- 所有开源项目的贡献者

---

💡 **提示**：这是一个静态网站，可以部署到任何静态服务器或 CDN。
