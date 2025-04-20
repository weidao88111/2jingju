# 京剧艺术网用户系统

## 简介

用户系统是京剧艺术网的重要组成部分，为用户提供注册、登录、个人资料管理和收藏功能。当前实现是基于客户端存储的简单版本，适合演示和开发阶段使用。

## 功能特点

1. **用户注册**：用户可以通过用户名、邮箱和密码注册新账号
2. **用户登录**：已注册用户可以通过邮箱和密码登录系统
3. **个人资料页**：用户可以查看自己的基本信息
4. **收藏管理**：用户可以管理自己收藏的内容
5. **个人头像**：使用首字母或上传的头像展示用户身份

## 技术实现

- 使用React Context API进行状态管理
- 使用localStorage存储用户数据
- 使用TypeScript确保类型安全
- 遵循项目现有UI设计风格，保持一致性

## 文件结构

```
src/
├── lib/
│   └── context/
│       └── UserContext.tsx    # 用户状态管理Context
├── pages/
│   └── user/
│       ├── login.tsx          # 登录页面
│       ├── register.tsx       # 注册页面
│       └── profile.tsx        # 个人资料页面
└── components/
    └── layout/
        └── UserMenu.tsx       # 导航栏用户菜单组件
```

## 数据模型

```typescript
interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  favorites: string[];
}
```

## 使用方法

### 在组件中使用用户状态

```typescript
import { useUser } from '../lib/context/UserContext';

const MyComponent = () => {
  const { user, isLoading, login, logout } = useUser();
  
  // 根据用户登录状态渲染不同内容
  if (isLoading) return <div>加载中...</div>;
  
  if (user) {
    return (
      <div>
        <h1>欢迎, {user.username}!</h1>
        <button onClick={logout}>退出登录</button>
      </div>
    );
  }
  
  return <div>请<a href="/user/login">登录</a>继续</div>;
};
```

### 添加到收藏夹

```typescript
const { user, addToFavorites } = useUser();

// 将内容添加到收藏夹
const handleAddToFavorites = (itemId) => {
  if (user) {
    addToFavorites(itemId);
  } else {
    // 提示用户登录
    router.push('/user/login');
  }
};
```

## 未来扩展

1. 实现真实的后端API和数据库存储
2. 添加用户头像上传功能
3. 实现用户信息编辑功能
4. 增加社交功能，如关注其他用户
5. 添加第三方登录（微信、微博等）
6. 实现用户权限管理

## 演示提示

在当前版本中，用户可以使用任意邮箱和密码进行注册和登录（只要符合基本格式要求）。这是为了方便演示，在实际部署前需要实现真实的后端验证。 