import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Card, { CardHeader, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Link from 'next/link';

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 检查是否已登录
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 简单的用户名密码验证，实际应用中应该使用加密和服务器验证
      if (username === 'admin' && password === 'jingju123') {
        // 设置登录状态
        localStorage.setItem('admin_token', 'demo_token_' + Date.now());
        router.push('/admin');
      } else {
        setError('用户名或密码不正确');
      }
    } catch (err) {
      setError('登录失败，请稍后再试');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>管理员登录 - 京剧艺术网</title>
        <meta name="description" content="京剧艺术网管理员登录" />
      </Head>

      <div className="py-8 px-4">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-red-600 dark:text-red-400" fill="currentColor">
              <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16zm0 3a.75.75 0 01.75.75v3.5h3.5a.75.75 0 010 1.5h-3.5v3.5a.75.75 0 01-1.5 0v-3.5h-3.5a.75.75 0 010-1.5h3.5v-3.5A.75.75 0 0112 7z"/>
            </svg>
            <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">京剧艺术网</span>
          </Link>
          <h2 className="mt-2 text-gray-600 dark:text-gray-400">管理控制台</h2>
        </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <h1 className="text-2xl font-bold text-center">管理员登录</h1>
            </CardHeader>
            <CardBody>
              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
                  {error}
                </div>
              )}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    用户名
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                    required
                    autoComplete="username"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    密码
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                    required
                    autoComplete="current-password"
                  />
                </div>
                <div>
                  <Button 
                    type="submit" 
                    fullWidth
                    disabled={isLoading}
                  >
                    {isLoading ? '登录中...' : '登录'}
                  </Button>
                </div>
              </form>
              <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>演示用户名: admin</p>
                <p>演示密码: jingju123</p>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400">
            &larr; 返回网站首页
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 