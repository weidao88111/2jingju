import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../../components/layout/Layout';
import Card, { CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

const RolesPage = () => {
  // 角色数据
  const roleTypes = [
    {
      name: '生',
      description: '男性角色',
      subTypes: [
        { name: '老生', description: '成熟男性，如关羽、包拯等' },
        { name: '小生', description: '年轻男性，如梁山伯、崔莺莺等' },
        { name: '武生', description: '擅长武艺的男性角色，如杨家将等' }
      ]
    },
    {
      name: '旦',
      description: '女性角色',
      subTypes: [
        { name: '青衣', description: '端庄、大方的成年女性，如薛宝钗、王宝钏等' },
        { name: '花旦', description: '活泼、开朗的年轻女性，如林黛玉等' },
        { name: '武旦', description: '擅长武艺的女性角色，如穆桂英等' },
        { name: '老旦', description: '年长女性，如王熙凤等' }
      ]
    },
    {
      name: '净',
      description: '性格刚烈的男性角色，脸上有脸谱',
      subTypes: [
        { name: '铜锤花脸', description: '重要人物，如曹操、杨国忠等' },
        { name: '架子花脸', description: '威严正直的角色，如包拯等' },
        { name: '武净', description: '强调武艺的角色，如典韦、许褚等' }
      ]
    },
    {
      name: '丑',
      description: '滑稽、诙谐的角色',
      subTypes: [
        { name: '文丑', description: '以表演相声、滑稽为主的丑角，如唐僧等' },
        { name: '武丑', description: '擅长武艺的丑角，如孙悟空等' },
        { name: '彩旦', description: '滑稽的女性角色，如王婆等' }
      ]
    }
  ];

  return (
    <Layout>
      <Head>
        <title>生旦净丑 - 京剧角色行当 - 京剧艺术网</title>
        <meta name="description" content="了解京剧生旦净丑四大行当的特点与表演技巧，探索京剧角色体系的艺术魅力。" />
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
        <h1 className="text-3xl md:text-4xl font-bold mb-4">生旦净丑 - 京剧角色行当</h1>
        <div className="text-gray-600 dark:text-gray-300 mb-2">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 mr-2">
            行当
          </span>
          <span>发布时间: 2023年4月10日</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="prose prose-lg dark:prose-invert prose-red max-w-none">
            <div className="relative w-full h-72 md:h-96 mb-8 overflow-hidden rounded-xl">
              <Image 
                src="/media/images/生旦净丑.png" 
                alt="京剧角色行当" 
                fill
                className="object-cover"
              />
            </div>
            
            <h2>京剧角色行当概述</h2>
            <p>
              在京剧表演中，角色按照性别、年龄、性格等特点被划分为不同的行当。这种分类方式不仅便于演员专业化培养，也使得表演更加程式化和艺术化。京剧的角色主要分为四大行当：生、旦、净、丑，每个行当又有各自的细分类型。
            </p>
            
            {roleTypes.map((role, index) => (
              <div key={index} className="my-8">
                <h3 className="text-2xl font-bold mb-3">{role.name}角</h3>
                <p className="mb-4">{role.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  {role.subTypes.map((subType, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="font-bold text-lg mb-2">{subType.name}</h4>
                      <p className="text-gray-700 dark:text-gray-300">{subType.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <h2>角色行当的艺术特点</h2>
            <p>
              京剧角色行当的划分不仅是对剧中人物的分类，更是对表演艺术的系统化和程式化。每个行当都有其独特的表演程式、唱腔特点、身段要求和扮相特征。
            </p>
            
            <h3>表演程式</h3>
            <p>
              京剧的表演高度程式化，每个行当都有一套固定的表演程式，包括步伐、手势、眼神等。这些程式是长期艺术实践中形成的，具有高度的艺术概括性和表现力。
            </p>
            
            <h3>唱腔特点</h3>
            <p>
              不同行当有不同的唱腔要求：生角多用真声，音域较低；旦角多用假声，音色清亮；净角嗓音洪亮有力；丑角则灵活多变。这些不同的唱腔风格丰富了京剧的艺术表现。
            </p>
            
            <h3>身段要求</h3>
            <p>
              京剧中的"身段"指表演者的身体动作和姿态。如老生要稳重大方，青衣要端庄文雅，花旦要活泼俏丽，武生和武旦要矫健有力，净角要威风凛凛，丑角则要诙谐幽默。
            </p>
            
            <h3>扮相特征</h3>
            <p>
              每个行当都有独特的扮相要求。生角多素面，旦角要精致妆容，净角有鲜明的脸谱，丑角常有白鼻梁。这些扮相特征使观众能够快速识别角色类型。
            </p>
            
            <h2>行当的历史发展</h2>
            <p>
              京剧角色行当的划分源于古代戏曲，但在京剧发展过程中不断完善。早期的角色分类较为粗略，随着艺术的发展，逐渐细化为今天的复杂体系。同时，各个行当也在不断创新和发展，演变出了众多流派和表演风格。
            </p>
            
            <h2>当代挑战与传承</h2>
            <p>
              在现代社会，京剧行当的传承面临一些挑战。年轻演员需要经过长期专业训练才能掌握行当的表演技巧，而现代观众对传统程式化表演的理解也面临障碍。然而，这一独特的角色体系是京剧艺术的重要组成部分，值得珍视和传承。
            </p>
            <p>
              当代京剧表演在尊重传统行当划分的基础上，也在进行着创新尝试，如跨行当表演、新编历史剧目等，为这一古老艺术注入新的活力。
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
                      src="/media/images/history.png"
                      alt="京剧历史"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">京剧的历史起源</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      了解京剧的起源与发展历程
                    </p>
                    <Link 
                      href="/knowledge/history"
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
                
                <div className="flex items-start gap-3">
                  <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                    <Image 
                      src="/media/images/bawangbieji.png"
                      alt="霸王别姬"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">《霸王别姬》剧目解析</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      了解经典京剧《霸王别姬》的艺术特色
                    </p>
                    <Link 
                      href="/knowledge/plays/bawangbieji"
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

export default RolesPage; 