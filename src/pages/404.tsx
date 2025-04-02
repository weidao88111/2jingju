import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  return (
    <Layout>
      <Head>
        <title>页面未找到 - 京剧艺术网</title>
        <meta name="description" content="抱歉，您访问的页面不存在或正在建设中。" />
      </Head>

      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center py-16">
        <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
          <div className="absolute w-full h-full bg-red-100 dark:bg-red-900/20 rounded-full animate-ping-slow opacity-50"></div>
          <div className="relative w-40 h-40">
            <Image 
              src="/images/opera-mask.svg" 
              alt="京剧脸谱" 
              width={160} 
              height={160} 
              className="transform rotate-12 drop-shadow-xl"
            />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-red-600 dark:text-red-400 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">页面未找到</h2>
        
        <div className="max-w-lg mb-8">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            抱歉，您访问的页面不存在或正在建设中。
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            京剧艺术网正在不断完善，部分功能和页面仍在建设中。
            感谢您的耐心等待！
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/" size="lg" className="px-8">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            返回首页
          </Button>
          <Button href="/knowledge" variant="outline" size="lg" className="px-8">
            探索知识库
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.3;
          }
          100% {
            transform: scale(1);
            opacity: 0.5;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </Layout>
  );
};

export default NotFoundPage; 