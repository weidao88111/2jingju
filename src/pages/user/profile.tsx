import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import Card, { CardHeader, CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useUser } from '../../lib/context/UserContext';

const ProfilePage = () => {
  const router = useRouter();
  const { user, logout } = useUser();

  // 如果用户未登录，则重定向到登录页面
  useEffect(() => {
    if (!user) {
      router.push('/user/login');
    }
  }, [user, router]);

  // 如果没有用户数据（可能在重定向前），显示加载或不显示任何内容
  if (!user) {
    // 可以返回null或一个简单的加载指示器
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">正在检查登录状态...</p>
        </div>
      </Layout>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/'); // Logout 后跳转回首页
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">个人中心</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              管理您的账号和收藏
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 左侧用户信息卡片 */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    用户信息
                  </h2>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4 border-2 border-red-100 dark:border-red-900">
                      <Image
                        src={user.avatar || "/images/user-avatar.svg"}
                        alt={user.username}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                      {user.username}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {user.email}
                    </p>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleLogout}
                      className="mt-2"
                    >
                      退出登录
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* 右侧收藏内容和其他信息 */}
            <div className="md:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                    <span>我的收藏</span>
                    <span className="ml-2 text-sm bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full">
                      {user.favorites.length}
                    </span>
                  </h2>
                </CardHeader>
                <CardBody>
                  {user.favorites.length > 0 ? (
                    <div className="space-y-3">
                      {user.favorites.map((item, index) => (
                        <div 
                          key={index}
                          className="p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                          <p className="text-gray-900 dark:text-gray-200">{item}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 dark:text-gray-400">暂无收藏内容</p>
                      <Button 
                        href="/"
                        variant="outline"
                        size="sm"
                        className="mt-3"
                      >
                        浏览内容
                      </Button>
                    </div>
                  )}
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    活动历史
                  </h2>
                </CardHeader>
                <CardBody>
                  {user.activities && user.activities.length > 0 ? (
                    <div className="space-y-4">
                      {user.activities.map((activity) => (
                        <div 
                          key={activity.id}
                          className="flex items-start"
                        >
                          <div className="min-w-[100px] text-sm text-gray-500 dark:text-gray-400">
                            {activity.timestamp}
                          </div>
                          <div className="flex-grow">
                            {activity.link ? (
                              <Link 
                                href={activity.link}
                                className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                              >
                                {activity.action}
                              </Link>
                            ) : (
                              <span className="text-gray-700 dark:text-gray-300">
                                {activity.action}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 dark:text-gray-400">暂无活动记录</p>
                    </div>
                  )}
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage; 