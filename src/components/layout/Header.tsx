import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import UserMenu from './UserMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // 检测滚动以添加背景效果
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (pathname: string) => {
    return router.pathname === pathname || router.pathname.startsWith(`${pathname}/`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: '/', label: '首页', excludePaths: ['/knowledge', '/community', '/resources'] },
    { path: '/knowledge', label: '知识库' },
    { path: '/community', label: '社区' },
    { path: '/resources', label: '资源' },
    // { path: '/admin', label: '管理' } // Removed Admin link
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      {/* 顶部装饰边框 */}
      <div className="h-1.5 w-full bg-gradient-to-r from-red-700 via-amber-500 to-red-700"></div>
      
      {/* 主要内容区 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* 古典花纹装饰元素 - 左侧 */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 hidden lg:block">
          <div className="w-12 h-12 opacity-20 dark:opacity-10 text-red-700 dark:text-red-400">
            <Image
              src="/images/ornament-left.svg"
              alt="Decorative ornament"
              width={48}
              height={48}
              className="w-full h-full"
            />
          </div>
        </div>
        
        {/* 古典花纹装饰元素 - 右侧 */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 hidden lg:block">
          <div className="w-12 h-12 opacity-20 dark:opacity-10 text-red-700 dark:text-red-400">
            <Image
              src="/images/ornament-right.svg"
              alt="Decorative ornament"
              width={48}
              height={48}
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              {/* Logo and Title */}
              <div className="relative">
                {/* 京剧脸谱图标 */}
                <div className="w-10 h-10 mr-3 bg-red-50 dark:bg-red-900/30 rounded-full flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow transition-all">
                  <div className="w-8 h-8 relative">
                    <Image
                      src="/images/opera-mask.svg"
                      alt="Beijing Opera Mask"
                      width={32}
                      height={32}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                {/* 站名 */}
                <span className="font-bold text-2xl flex items-center relative group-hover:transform group-hover:scale-105 transition-transform">
                  <span className="text-red-700 dark:text-red-500">京</span>
                  <span className="text-red-600 dark:text-red-400 mx-0.5">剧</span>
                  <span className="text-red-500 dark:text-red-300">艺</span>
                  <span className="text-red-600 dark:text-red-400 mx-0.5">术</span>
                  <span className="text-red-700 dark:text-red-500">网</span>
                  
                  {/* 底部装饰线 */}
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-red-700 via-amber-500 to-red-700"></span>
                  
                  {/* 装饰性笔触效果 */}
                  <span className="absolute -bottom-1 right-0 w-2 h-2 bg-red-500 rounded-full opacity-80 hidden group-hover:block"></span>
                  <span className="absolute -bottom-1 left-0 w-2 h-2 bg-amber-500 rounded-full opacity-80 hidden group-hover:block"></span>
                </span>
                
                {/* 装饰性印章效果 */}
                <span className="absolute -right-6 -top-2 transform rotate-12 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="block w-5 h-5 rounded-sm border border-red-300 dark:border-red-700 opacity-40"></span>
                </span>
              </div>
            </Link>
          </div>

          {/* 桌面菜单 */}
          <nav className="hidden md:flex space-x-1 items-center">
            {navItems.map((item) => {
              const active = item.excludePaths 
                ? isActive(item.path) && !item.excludePaths.some(p => isActive(p))
                : isActive(item.path);
              
              return (
                <Link 
                  key={item.path}
                  href={item.path} 
                  className={`
                    relative px-4 py-2 font-medium transition-all group
                    ${active 
                      ? 'text-red-600 dark:text-red-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400'}
                  `}
                >
                  {/* 菜单项名称 */}
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* 活动状态装饰 */}
                  {active && (
                    <span className="absolute inset-0 bg-red-50 dark:bg-red-900/20 rounded-lg -z-0"></span>
                  )}
                  
                  {/* 悬停状态装饰 */}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-red-500 group-hover:w-1/2 transition-all duration-300"></span>
                  
                  {/* 活动状态额外装饰 */}
                  {active && (
                    <>
                      <span className="absolute top-0 left-0 w-1 h-1 border-t border-l border-red-300 dark:border-red-700"></span>
                      <span className="absolute top-0 right-0 w-1 h-1 border-t border-r border-red-300 dark:border-red-700"></span>
                      <span className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-red-300 dark:border-red-700"></span>
                      <span className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-red-300 dark:border-red-700"></span>
                    </>
                  )}
                </Link>
              );
            })}
            
            {/* 用户菜单组件 */}
            <div className="ml-4">
              <UserMenu />
            </div>
          </nav>

          {/* 移动端菜单按钮和用户菜单 */}
          <div className="md:hidden flex items-center space-x-2">
            <div className="mr-2">
              <UserMenu />
            </div>
            
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 focus:outline-none border border-transparent hover:border-red-200 dark:hover:border-red-800 transition-colors"
              aria-label="菜单"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-b border-gray-100 dark:border-gray-800">
          <div className="px-4 pt-2 pb-3 space-y-1.5 max-w-7xl mx-auto">
            {navItems.map((item) => {
              const active = item.excludePaths 
                ? isActive(item.path) && !item.excludePaths.some(p => isActive(p))
                : isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block px-3 py-2.5 rounded-lg font-medium ${
                    active
                      ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
      
      {/* 底部装饰边缘 - 移动端菜单打开时 */}
      {isMenuOpen && (
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30"></div>
      )}
    </header>
  );
};

export default Header; 