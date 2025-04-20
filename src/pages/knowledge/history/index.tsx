import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../../components/layout/Layout';
import Card, { CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

const HistoryPage = () => {
  return (
    <Layout>
      <Head>
        <title>京剧的历史起源 - 京剧艺术网</title>
        <meta name="description" content="了解京剧的起源与发展历史，探索这一中国传统戏曲艺术的形成过程。" />
      </Head>

      <div className="mb-6">
        <Link 
          href="/knowledge" 
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回知识库
        </Link>
      </div>

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">京剧的历史起源</h1>
        <div className="text-gray-600 dark:text-gray-300 mb-2">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 mr-2">
            历史
          </span>
          <span>发布时间: 2023年3月15日</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="prose prose-lg dark:prose-invert prose-red max-w-none">
            <div className="relative w-full h-72 md:h-96 mb-8 overflow-hidden rounded-xl">
              <Image 
                src="/media/images/history.png" 
                alt="京剧历史照片" 
                fill
                className="object-cover"
              />
            </div>
            
            <h2>京剧的起源</h2>
            <p>
              京剧形成于清朝乾隆、嘉庆年间（约1790年前后），是在北京形成的戏曲剧种，故称"京剧"。它的前身主要是徽剧（皖江流域的安徽、江苏一带的地方戏曲）。
            </p>
            <p>
              1790年前后，来自安徽的三大徽班（三庆、四喜、春台）进入北京，为乾隆皇帝八十大寿祝寿演出，此后长期留在北京演出。这些徽班在北京演出的过程中，不断吸收昆曲、汉剧等剧种的艺术特点，逐渐形成了京剧这一新的剧种。
            </p>
            
            <h2>京剧的形成与发展</h2>
            <p>
              京剧在形成初期，主要由以下几种戏曲元素融合而成：
            </p>
            <ul>
              <li><strong>徽剧</strong>：提供了基本的表演形式和剧目</li>
              <li><strong>汉剧</strong>：贡献了丰富的表演技巧和唱腔</li>
              <li><strong>昆曲</strong>：影响了京剧的文雅风格和部分表演程式</li>
              <li><strong>秦腔</strong>：为京剧的武戏提供了表演元素</li>
            </ul>
            <p>
              19世纪中后期，京剧开始在全国范围内流行。特别是同治、光绪年间（1862-1908年），京剧艺术蓬勃发展，涌现出了许多杰出的表演艺术家，如谭鑫培、孙菊仙、杨小楼等。这一时期被称为京剧的"黄金时代"。
            </p>
            
            <h2>近现代京剧的转型</h2>
            <p>
              20世纪初，随着社会变革，京剧也开始了现代化转型。梅兰芳、程砚秋、尚小云、荀慧生等"四大名旦"推动了京剧表演艺术的革新，创作了许多新编历史剧和现代戏。
            </p>
            <p>
              新中国成立后，京剧继续发展，并创作了一批革命历史题材的现代京剧。改革开放以来，京剧艺术在传承传统的同时，也在不断创新，寻求与当代社会和观众的连接。
            </p>
            
            <h2>京剧的艺术特点</h2>
            <p>
              京剧作为中国传统戏曲的代表，具有以下艺术特点：
            </p>
            <ul>
              <li>
                <strong>综合性表演</strong>：京剧是一门综合性的表演艺术，包含唱、念、做、打四种基本功。唱是歌唱，念是台词，做是表演动作，打是武打技巧。
              </li>
              <li>
                <strong>程式化表演</strong>：京剧的表演高度程式化，各种动作、表情都有固定的程式和规范。
              </li>
              <li>
                <strong>角色行当</strong>：京剧角色分为生（男性角色）、旦（女性角色）、净（性格刚烈的男性角色）、丑（滑稽角色）四大行当，每个行当又有细分。
              </li>
              <li>
                <strong>脸谱艺术</strong>：京剧中的净和部分丑角有绘制脸谱的传统，不同颜色和图案代表不同的性格特点。
              </li>
            </ul>
            
            <h2>京剧的当代价值</h2>
            <p>
              作为中国的国粹艺术，京剧承载着丰富的中华传统文化。在当代，京剧不仅是一种艺术形式，更是中华文化的重要载体，对于弘扬中华传统文化、增强文化自信具有重要意义。
            </p>
            <p>
              同时，京剧也面临着如何适应现代社会、吸引年轻观众的挑战。近年来，京剧艺术家们通过创新表演形式、融入现代元素等方式，努力使这一传统艺术焕发新的生机。
            </p>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardBody>
              <h3 className="text-xl font-bold mb-4">相关知识推荐</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-4 border-b dark:border-gray-700">
                  <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                    <Image 
                      src="/media/images/生旦净丑.png"
                      alt="生旦净丑"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">生旦净丑 - 京剧角色行当</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      了解京剧四大行当的特点与表演技巧
                    </p>
                    <Link 
                      href="/knowledge/roles"
                      className="inline-flex items-center text-sm text-red-600 dark:text-red-400 mt-1"
                    >
                      查看详情
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 pb-4 border-b dark:border-gray-700">
                  <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                    <Image 
                      src="/media/images/meipai.png"
                      alt="梅兰芳"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">梅兰芳与"梅派"艺术</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      探索京剧大师梅兰芳的艺术成就与影响
                    </p>
                    <Link 
                      href="/knowledge/masters/meilanfang"
                      className="inline-flex items-center text-sm text-red-600 dark:text-red-400 mt-1"
                    >
                      查看详情
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                    <Image 
                      src="/media/images/masks.png"
                      alt="京剧脸谱"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">京剧脸谱艺术</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      了解京剧脸谱的色彩象征与艺术魅力
                    </p>
                    <Link 
                      href="/knowledge/culture/masks"
                      className="inline-flex items-center text-sm text-red-600 dark:text-red-400 mt-1"
                    >
                      查看详情
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t dark:border-gray-700">
                <Button href="/knowledge" variant="outline" className="w-full">
                  返回知识库
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default HistoryPage; 