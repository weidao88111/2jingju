import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import Card, { CardHeader, CardBody, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { forumPosts, initPosts } from '../../data/posts';

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
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'questions' | 'groups' | 'posts'>('questions');

  // 初始化帖子数据
  useEffect(() => {
    initPosts();
  }, []);

  // 从URL参数中获取tab并设置activeTab
  useEffect(() => {
    const { tab } = router.query;
    if (tab === 'posts') {
      setActiveTab('posts');
    } else if (tab === 'groups') {
      setActiveTab('groups');
    } else if (tab === 'questions') {
      setActiveTab('questions');
    }
  }, [router.query]);

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
          {activeTab === 'questions' && (
            <Button href="/community/ask" className="whitespace-nowrap">
              提问问题
            </Button>
          )}
          {activeTab === 'posts' && (
            <Button href="/community/post/create" className="whitespace-nowrap">
              发布帖子
            </Button>
          )}
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
          <button
            className={`pb-4 font-medium text-sm cursor-pointer relative ${
              activeTab === 'posts'
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('posts')}
          >
            帖子讨论
            {activeTab === 'posts' && (
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

      {/* 帖子列表 */}
      {activeTab === 'posts' && (
        <div className="space-y-4">
          {forumPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardBody>
                <div className="flex flex-col">
                  <Link href={`/community/post/${post.id}`}>
                    <h3 className="text-lg font-semibold mb-2 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {post.content}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <span className="mr-4">由 {post.author} 发布</span>
                      <span>{post.date}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>{post.views}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>{Array.isArray(post.comments) ? post.comments.length : post.comments}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>{post.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
          
          <div className="text-center mt-6">
            <Button href="/community/posts" variant="outline">
              查看更多帖子
            </Button>
          </div>
        </div>
      )}

      {/* 社区指南 */}
      <div className="mt-16 p-6 bg-gradient-to-r from-red-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
        <h2 className="text-xl font-bold mb-4">社区指南</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold mb-2">尊重与包容</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              尊重每一位社区成员，包容不同的意见和见解。不发表具有歧视、攻击性或冒犯性的言论。
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">专注与相关</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              保持帖子和讨论与京剧相关。避免发布与社区主题无关的内容或广告。
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">互助与分享</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              鼓励知识分享和互助精神。回答问题时提供有建设性的建议，分享您的经验和见解。
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CommunityPage; 