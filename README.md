# 轻语 (QingYu)

一个基于 Next.js 和 Nest.js 构建的现代化后台管理系统。

## 🚀 特性

- 📱 响应式设计，支持移动端和桌面端
- 🔐 完整的用户认证和授权系统
- 🎨 美观的 UI 设计，基于 Shadcn UI
- 🔄 实时数据更新
- 📊 数据可视化
- 📝 完整的 CRUD 操作
- 📤 文件上传
- 📧 邮件通知
- 📝 操作日志
- ⚙️ 系统设置

## 🛠 技术栈

### 前端
- Next.js 14
- React Query
- Tailwind CSS
- Shadcn UI
- TypeScript

### 后端
- Nest.js
- TypeORM
- MySQL
- Redis
- TypeScript

## 📋 环境要求

- Node.js 18+
- pnpm 8+
- MySQL 8+
- Redis 6+

## 🚀 快速开始

1. 克隆项目
```bash
git clone https://github.com/HarryQQ/qingyu.git
cd qingyu
```

2. 安装依赖
```bash
pnpm install
```

3. 配置环境变量

后端配置：
```bash
cd packages/backend
cp .env.example .env
# 编辑 .env 文件，填写正确的配置信息
```

前端配置：
```bash
cd ../frontend
cp .env.example .env
# 编辑 .env 文件，填写正确的配置信息
```

4. 初始化数据库
```bash
cd ../backend
pnpm run migration:run
```

5. 启动开发服务器
```bash
# 在项目根目录下
pnpm run dev
```

现在你可以访问：
- 前端页面：http://localhost:3000
- 后端 API：http://localhost:3001
- API 文档：http://localhost:3001/api

## 📁 项目结构

```
├── packages/
│   ├── frontend/        # 前端项目
│   │   ├── src/
│   │   │   ├── app/     # 页面
│   │   │   ├── components/  # 组件
│   │   │   └── lib/     # 工具函数
│   │   └── public/      # 静态资源
│   │
│   └── backend/         # 后端项目
│       ├── src/
│       │   ├── modules/ # 功能模块
│       │   ├── common/  # 公共代码
│       │   └── main.ts  # 入口文件
│       └── test/        # 测试文件
```

## 🔨 开发命令

```bash
# 启动开发服务器
pnpm run dev

# 构建项目
pnpm run build

# 运行生产环境
pnpm run start

# 运行测试
pnpm run test

# 代码格式化
pnpm run format

# 代码检查
pnpm run lint
```

## 🚢 CI/CD

项目使用 GitHub Actions 进行持续集成和部署，包含以下阶段：

1. 测试阶段
   - 运行单元测试
   - 代码风格检查
   - 类型检查

2. 构建阶段
   - 构建前端项目
   - 构建后端项目

3. 部署阶段
   - 自动部署到生产环境

## 📝 环境变量

### 后端环境变量

```env
# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=qingyu

# Redis 配置
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT 配置
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=1d

# 邮件配置
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password

# 文件上传配置
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880 # 5MB
```

### 前端环境变量

```env
# API 配置
NEXT_PUBLIC_API_URL=http://localhost:3001

# 认证配置
NEXT_PUBLIC_JWT_COOKIE_NAME=qingyu_token

# 应用配置
NEXT_PUBLIC_APP_NAME=轻语
NEXT_PUBLIC_APP_DESCRIPTION=现代化的后台管理系统
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

[MIT](LICENSE) 