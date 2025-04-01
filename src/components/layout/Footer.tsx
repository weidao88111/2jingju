import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {/* 顶部装饰线 */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* 网站信息 */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center mb-4 group">
              <div className="flex items-center">
                <div className="w-8 h-8 mr-2 bg-red-50 dark:bg-red-900/30 rounded-full flex items-center justify-center overflow-hidden">
                  <div className="w-6 h-6 relative">
                    <Image
                      src="/images/opera-mask.svg"
                      alt="Beijing Opera Mask"
                      width={24}
                      height={24}
                      className="w-full h-full"
                    />
                  </div>
                </div>
                <span className="font-bold text-xl flex items-center">
                  <span className="text-red-700 dark:text-red-500">京</span>
                  <span className="text-red-600 dark:text-red-400 mx-0.5">剧</span>
                  <span className="text-red-500 dark:text-red-300">艺</span>
                  <span className="text-red-600 dark:text-red-400 mx-0.5">术</span>
                  <span className="text-red-700 dark:text-red-500">网</span>
                </span>
              </div>
            </Link>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left">
              传承国粹文化，领略戏曲之美
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-xs mt-6 text-center md:text-left">
              © {currentYear} 京剧艺术网. 保留所有权利.
            </p>
          </div>
          
          {/* 链接区域 */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-4 text-center md:text-left">网站导航</h3>
              <ul className="space-y-2 text-center md:text-left">
                <li>
                  <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 text-sm">
                    首页
                  </Link>
                </li>
                <li>
                  <Link href="/knowledge" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 text-sm">
                    知识库
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 text-sm">
                    社区
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 text-sm">
                    资源
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-4 text-center md:text-left">关于我们</h3>
              <ul className="space-y-2 text-center md:text-left">
                <li>
                  <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 text-sm">
                    关于本站
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 text-sm">
                    联系我们
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 text-sm">
                    隐私政策
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 text-sm">
                    使用条款
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* 装饰图案 */}
          <div className="hidden md:flex justify-end items-center">
            <div className="w-32 h-32 opacity-10 text-red-600 dark:text-red-400">
              <div className="relative w-full h-full">
                <Image
                  src="/images/ornament-left.svg"
                  alt="Traditional Pattern"
                  width={128}
                  height={128}
                  className="absolute -top-6 -left-6 w-24 h-24 transform rotate-45"
                />
                <Image
                  src="/images/ornament-right.svg"
                  alt="Traditional Pattern"
                  width={128}
                  height={128}
                  className="absolute -bottom-6 -right-6 w-24 h-24 transform -rotate-45"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 底部装饰线 */}
      <div className="h-1.5 w-full bg-gradient-to-r from-red-700 via-amber-500 to-red-700"></div>
    </footer>
  );
};

export default Footer; 