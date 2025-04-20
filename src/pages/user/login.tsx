import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import Card, { CardHeader, CardBody, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import FormField from '../../components/ui/FormField';
import { useUser } from '../../lib/context/UserContext';

type Role = 'user' | 'admin';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('user');
  const [errors, setErrors] = useState<{email?: string; password?: string; general?: string}>({});
  
  const router = useRouter();
  const { login } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors: {email?: string; password?: string; general?: string} = {};
    if (!email) newErrors.email = '请输入邮箱';
    if (!password) newErrors.password = '请输入密码';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const success = login(email, password);
    if (success) {
      console.log(`Login successful as ${role}, redirecting...`);
      if (role === 'admin') {
        // Set admin token when logging in as admin from user login page
        localStorage.setItem('admin_token', 'demo_token_' + Date.now());
        router.push('/admin'); // Redirect to admin dashboard
      } else {
        router.push('/user/profile'); // Redirect to user profile
      }
    } else {
      setErrors({ general: '登录信息不正确' });
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">欢迎回来</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              登录您的京剧艺术网账号
            </p>
          </div>

          <Card>
            <CardHeader>
              <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-gray-200">
                用户登录
              </h2>
            </CardHeader>
            
            <CardBody>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {errors.general && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm rounded-md border border-red-200 dark:border-red-800/50">
                    {errors.general}
                  </div>
                )}

                <FormField
                  label="邮箱"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="请输入您的邮箱"
                  error={errors.email}
                  autoComplete="email"
                />

                <FormField
                  label="密码"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入您的密码"
                  error={errors.password}
                  autoComplete="current-password"
                />

                {/* Role Selection */}
                <div className="pt-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    选择角色
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value="user"
                        checked={role === 'user'}
                        onChange={() => setRole('user')}
                        className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500 dark:border-gray-700 dark:focus:ring-red-700"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">用户</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value="admin"
                        checked={role === 'admin'}
                        onChange={() => setRole('admin')}
                        className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500 dark:border-gray-700 dark:focus:ring-red-700"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">管理员</span>
                    </label>
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <Button 
                    type="submit" 
                    fullWidth
                  >
                    登录
                  </Button>
                </div>
              </form>
            </CardBody>
            
            <CardFooter className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                还没有账号？
                <Link href="/user/register" className="ml-1 text-red-600 dark:text-red-400 hover:underline">
                  立即注册
                </Link>
              </p>
            </CardFooter>
          </Card>
          
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              提示：任意非空输入即可登录。
              {role === 'admin' ? '管理员将跳转至管理后台。' : '用户将跳转至个人中心。'}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage; 