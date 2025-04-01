import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// 仪表盘卡片组件
const DashboardCard = ({ icon, title, value, desc, link, linkText, color = 'red' }: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  desc?: string;
  link?: string;
  linkText?: string;
  color?: 'red' | 'amber' | 'blue' | 'green' | 'purple';
}) => {
  const colorClasses = {
    red: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
    amber: 'bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
    blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  };

  return (
    <Card className="h-full">
      <CardBody className="flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
            {icon}
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-gray-600 dark:text-gray-300">{title}</h3>
          </div>
        </div>
        <div className="mb-2">
          <div className="text-2xl font-bold">{value}</div>
          {desc && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{desc}</p>}
        </div>
        {link && linkText && (
          <div className="mt-auto pt-4">
            <Link 
              href={link} 
              className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
            >
              {linkText} &rarr;
            </Link>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

const AdminPage = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 检查用户是否已经登录
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('admin_token');
      if (token) {
        // 在实际应用中，应该验证token的有效性
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        // 未登录则重定向到登录页
        router.push('/admin/login');
      }
    };
    
    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-gray-500 dark:text-gray-400">加载中...</p>
        </div>
      </Layout>
    );
  }

  // 已登录状态显示管理控制台
  return (
    <Layout>
      <Head>
        <title>管理控制台 - 京剧艺术网</title>
        <meta name="description" content="京剧艺术网管理控制台，管理网站内容、用户和统计数据" />
      </Head>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">管理控制台</h1>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            管理员：<span className="font-medium">京剧爱好者</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            退出登录
          </Button>
        </div>
      </div>

      {/* 快速统计 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 14.094A5.973 5.973 0 004 17v1H1v-1a3 3 0 013.75-2.906z" />
          </svg>}
          title="用户数量"
          value="1,256"
          desc="本月新增 85 位用户"
          link="/admin/users"
          linkText="查看用户列表"
        />
        <DashboardCard 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
          </svg>}
          title="社区问题"
          value="458"
          desc="待回复问题 32 个"
          link="/admin/community"
          linkText="管理社区内容"
          color="blue"
        />
        <DashboardCard 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>}
          title="知识库文章"
          value="75"
          desc="草稿状态 8 篇"
          link="/admin/content"
          linkText="管理内容"
          color="amber"
        />
        <DashboardCard 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>}
          title="系统配置"
          value="系统设置"
          desc="管理网站配置和外观"
          link="/admin/settings"
          linkText="系统设置"
          color="green"
        />
      </div>

      {/* 管理区域 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardBody>
            <h2 className="text-xl font-bold mb-4">内容管理</h2>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/admin/content" 
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                >
                  <span className="w-8">📝</span>
                  <span>内容管理</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/content/categories" 
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                >
                  <span className="w-8">📁</span>
                  <span>分类管理</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/content/resources" 
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                >
                  <span className="w-8">🎵</span>
                  <span>资源管理</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/content/comments" 
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                >
                  <span className="w-8">💬</span>
                  <span>评论管理</span>
                </Link>
              </li>
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="text-xl font-bold mb-4">用户管理</h2>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/admin/users" 
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                >
                  <span className="w-8">👥</span>
                  <span>用户管理</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/users/roles" 
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                >
                  <span className="w-8">🔑</span>
                  <span>角色权限</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/users/activity" 
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                >
                  <span className="w-8">📊</span>
                  <span>活动日志</span>
                </Link>
              </li>
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="text-xl font-bold mb-4">系统设置</h2>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/admin/settings" 
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                >
                  <span className="w-8">⚙️</span>
                  <span>系统设置</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/stats" 
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                >
                  <span className="w-8">📈</span>
                  <span>网站统计</span>
                </Link>
              </li>
            </ul>
          </CardBody>
        </Card>
      </div>

      {/* 最近活动 */}
      <Card className="mt-8">
        <CardBody>
          <h2 className="text-xl font-bold mb-4">最近活动</h2>
          <div className="space-y-4">
            {[
              { time: '今天 14:30', action: '用户 戏迷小王 发布了新问题', link: '/community/question/new1' },
              { time: '今天 12:15', action: '管理员 京剧爱好者 添加了新资源', link: '/resources/audio/new1' },
              { time: '昨天 18:40', action: '用户 清音悠扬 回答了问题', link: '/community/question/q2' },
              { time: '昨天 10:20', action: '管理员 京剧爱好者 更新了京剧流派介绍', link: '/knowledge/schools/mei' },
              { time: '前天 09:15', action: '用户 京韵悠长 上传了新视频', link: '/resources/video/new2' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start">
                <div className="w-20 flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">
                  {activity.time}
                </div>
                <div className="flex-grow">
                  <Link 
                    href={activity.link}
                    className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                  >
                    {activity.action}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link 
              href="/admin/users/activity" 
              className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
            >
              查看所有活动记录
            </Link>
          </div>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default AdminPage;