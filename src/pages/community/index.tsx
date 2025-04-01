import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import Card, { CardHeader, CardBody, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// 模拟数据 - 热门问题
const popularQuestions = [
  {
    id: 'q1',
    title: '初学者如何选择适合自己的京剧剧目进行学习？',
    author: '青衣爱好者',
    date: '2023-12-05',
    views: 342,
    answers: 15,
    solved: true,
  },
  {
    id: 'q2',
    title: '如何区分京剧中的西皮和二黄两种板式？',
    author: '京剧小白',
    date: '2023-12-12',
    views: 287,
    answers: 8,
    solved: true,
  },
  {
    id: 'q3',
    title: '梅兰芳和程砚秋的唱腔有什么明显区别？',
    author: '戏迷阿飞',
    date: '2023-12-20',
    views: 395,
    answers: 12,
    solved: false,
  },
  {
    id: 'q4',
    title: '京剧脸谱中的颜色分别代表什么性格特点？',
    author: '文化研究者',
    date: '2024-01-08',
    views: 421,
    answers: 18,
    solved: true,
  },
  {
    id: 'q5',
    title: '练习京剧身段基本功的正确方法是什么？',
    author: '京剧学徒',
    date: '2024-01-15',
    views: 310,
    answers: 7,
    solved: false,
  },
];

// 模拟数据 - 讨论组
const discussionGroups = [
  {
    id: 'g1',
    title: '流派研究',
    description: '专注于梅、程、荀、尚等京剧流派的研究与交流',
    members: 1240,
    posts: 358,
    lastActivity: '刚刚',
  },
  {
    id: 'g2',
    title: '京剧入门',
    description: '零基础京剧爱好者互助学习小组',
    members: 2150,
    posts: 892,
    lastActivity: '10分钟前',
  },
  {
    id: 'g3',
    title: '行当交流',
    description: '交流各行当表演技巧和学习心得',
    members: 986,
    posts: 425,
    lastActivity: '1小时前',
  },
];

const CommunityPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'questions' | 'groups'>('questions');

  return (
    <Layout>
      <Head>
        <title>社区交流 - 京剧艺术网</title>
        <meta name="description" content="加入京剧爱好者社区，提问、解答、交流，共同探讨京剧艺术的魅力" />
      </Head>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">京剧社区</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          京剧爱好者的集中营地，在这里您可以提问、回答、分享和讨论一切关于京剧艺术的话题。
          无论您是资深戏迷还是初学者，都能在这里找到志同道合的伙伴。
        </p>
      </div>

      {/* 搜索和功能区 */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-grow">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索问题或讨论组..."
              className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-3 top-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button href="/community/ask" className="whitespace-nowrap">
            提问问题
          </Button>
          <Button href="/community/ai" variant="outline" className="whitespace-nowrap">
            AI助手
          </Button>
        </div>
      </div>

      {/* 标签切换 */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex space-x-8">
          <button
            className={`pb-4 font-medium text-sm cursor-pointer relative ${
              activeTab === 'questions'
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('questions')}
          >
            热门问题
            {activeTab === 'questions' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400"></span>
            )}
          </button>
          <button
            className={`pb-4 font-medium text-sm cursor-pointer relative ${
              activeTab === 'groups'
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('groups')}
          >
            讨论组
            {activeTab === 'groups' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400"></span>
            )}
          </button>
        </div>
      </div>

      {/* 问题列表 */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          {popularQuestions.map((question) => (
            <Card key={question.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardBody className="flex flex-col md:flex-row gap-4">
                <div className="md:w-16 flex flex-row md:flex-col items-center justify-center space-y-0 md:space-y-2 space-x-4 md:space-x-0">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">{question.answers}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">回答</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">{question.views}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">浏览</span>
                  </div>
                </div>
                
                <div className="flex-grow">
                  <Link href={`/community/question/${question.id}`}>
                    <h3 className="text-lg font-semibold mb-2 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                      {question.solved && (
                        <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs px-2 py-0.5 rounded-full mr-2">
                          已解决
                        </span>
                      )}
                      {question.title}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="mr-4">由 {question.author} 提问</span>
                    <span>{question.date}</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
          
          <div className="text-center mt-6">
            <Button href="/community/questions" variant="outline">
              查看更多问题
            </Button>
          </div>
        </div>
      )}

      {/* 讨论组列表 */}
      {activeTab === 'groups' && (
        <div className="space-y-4">
          {discussionGroups.map((group) => (
            <Card key={group.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardBody>
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex-grow">
                    <Link href={`/community/group/${group.id}`}>
                      <h3 className="text-lg font-semibold mb-1 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                        {group.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {group.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="mr-4">{group.members} 位成员</span>
                      <span className="mr-4">{group.posts} 篇帖子</span>
                      <span>最近活动: {group.lastActivity}</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Button href={`/community/group/${group.id}`} variant="outline" size="sm">
                      加入小组
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
          
          <div className="text-center mt-6">
            <Button href="/community/groups" variant="outline">
              浏览所有讨论组
            </Button>
          </div>
        </div>
      )}

      {/* 社区指南 */}
      <Card className="mt-12 bg-gray-50 dark:bg-gray-800/50 border-0">
        <CardHeader>
          <h2 className="text-xl font-bold">社区指南</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">尊重彼此</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                尊重社区中的每一位成员，不攻击、侮辱他人，保持友善的交流氛围。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">专注京剧</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                讨论内容应与京剧艺术相关，避免发布与京剧无关的主题或垃圾信息。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">互助学习</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                鼓励分享知识和经验，对他人的问题提供有建设性的回答和建议。
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default CommunityPage; 