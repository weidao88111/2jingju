import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import Card, { CardHeader, CardBody, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import FormField from '../../components/ui/FormField';
import { useUser } from '../../lib/context/UserContext';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  
  const router = useRouter();
  const { register } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors: {
      username?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
      general?: string;
    } = {};
    
    if (!username) newErrors.username = '请输入用户名';
    if (!email) newErrors.email = '请输入邮箱';
    if (!password) newErrors.password = '请输入密码';
    else if (password.length < 6) newErrors.password = '密码长度至少为6位';
    
    if (!confirmPassword) newErrors.confirmPassword = '请确认密码';
    else if (password !== confirmPassword) newErrors.confirmPassword = '两次输入的密码不一致';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const success = register(username, email, password);
    if (success) {
      console.log('Register successful, redirecting...');
      router.push('/user/profile');
    } else {
      setErrors({ general: '注册信息不完整或格式错误' }); // Update error message
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">注册账号</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              加入京剧艺术网，探索更多京剧艺术
            </p>
          </div>

          <Card>
            <CardHeader>
              <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-gray-200">
                创建新账号
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
                  label="用户名"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="请输入您的用户名"
                  error={errors.username}
                  autoComplete="username"
                />

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
                  placeholder="请设置密码（至少6位）"
                  error={errors.password}
                  autoComplete="new-password"
                />

                <FormField
                  label="确认密码"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="请再次输入密码"
                  error={errors.confirmPassword}
                  autoComplete="new-password"
                />

                <div className="mt-6">
                  <Button 
                    type="submit" 
                    fullWidth
                  >
                    注册
                  </Button>
                </div>
              </form>
            </CardBody>
            
            <CardFooter className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                已有账号？
                <Link href="/user/login" className="ml-1 text-red-600 dark:text-red-400 hover:underline">
                  立即登录
                </Link>
              </p>
            </CardFooter>
          </Card>
          
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              提示：任意非空输入即可注册
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage; 