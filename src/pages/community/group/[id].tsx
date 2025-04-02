import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../../components/layout/Layout';
import Card, { CardBody, CardFooter } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

// 模拟讨论组数据
const groupDetails = {
  id: 'g1',
  title: '流派研究',
  description: '专注于梅、程、荀、尚等京剧流派的研究与交流，探讨各流派的艺术特点、代表人物和经典剧目，分享欣赏心得。欢迎热爱京剧流派艺术的爱好者加入交流！',
  members: 1240,
  posts: 358,
  createdAt: '2022-06-15',
  isJoined: false,
  admins: ['京剧研究者', '梅派传人'],
  rules: [
    '尊重每位流派艺术家，不得贬低任何流派',
    '分享内容需注明出处，尊重原创',
    '发布内容应与京剧流派相关',
    '鼓励理性讨论，文明交流'
  ]
};

// 模拟帖子数据
const posts = [
  {
    id: 'p1',
    title: '梅派与程派青衣的演唱技巧差异分析',
    content: '梅派和程派作为京剧艺术中最具代表性的两大青衣流派，在演唱技巧上有明显区别。梅派以声音圆润、行腔流畅见长，注重细腻的表情与身段；程派则以声音高亢、韵味独特著称，强调内心情感的表达...',
    author: '青衣爱好者',
    date: '2024-01-15',
    views: 342,
    likes: 56,
    comments: 23,
    isPinned: true,
  },
  {
    id: 'p2',
    title: '荀派与尚派在《游园惊梦》中的表演对比',
    content: '荀慧生和尚小云两位大师在《游园惊梦》中的杜丽娘一角有着截然不同的诠释。荀派注重细腻的情感表达，尚派则更加突出形体的美感...',
    author: '京剧研究者',
    date: '2023-12-28',
    views: 287,
    likes: 42,
    comments: 18,
    isPinned: false,
  },
  {
    id: 'p3',
    title: '马连良与谭富英唱腔对比：以《赵氏孤儿》为例',
    content: '马派和谭派是京剧老生中的两大流派，两位大师在《赵氏孤儿》中的程婴一角有着不同风格的演绎...',
    author: '老生迷',
    date: '2023-12-20',
    views: 248,
    likes: 37,
    comments: 15,
    isPinned: false,
  },
  {
    id: 'p4',
    title: '杨派与裘派武生表演技巧研究',
    content: '杨小楼与裘盛戎分别代表了京剧武生艺术的两种风格。杨派以气势恢宏、沉稳大方著称，裘派则以细腻精准、行云流水见长...',
    author: '武生爱好者',
    date: '2023-12-18',
    views: 236,
    likes: 34,
    comments: 12,
    isPinned: false,
  },
];

const DiscussionGroupPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isJoined, setIsJoined] = useState(groupDetails.isJoined);
  const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');
  const [searchQuery, setSearchQuery] = useState('');

  // 加入或退出讨论组
  const handleToggleJoin = () => {
    // 在实际项目中，这里应该调用API来处理加入/退出操作
    setIsJoined(!isJoined);
  };

  // 帖子过滤
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 置顶帖子排序
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <Layout>
      <Head>
        <title>{groupDetails.title} - 京剧社区 - 京剧艺术网</title>
        <meta name="description" content={`${groupDetails.title} - 京剧社区讨论组`} />
      </Head>

      <div className="mb-6">
        <Link
          href="/community"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回社区
        </Link>
      </div>

      {/* 讨论组头部信息 */}
      <Card className="mb-8">
        <CardBody>
          <div className="mb-4">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{groupDetails.title}</h1>
            <p className="text-gray-600 dark:text-gray-300">{groupDetails.description}</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>{groupDetails.members} 位成员</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <span>{groupDetails.posts} 篇帖子</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>创建于 {groupDetails.createdAt}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={handleToggleJoin}
              variant={isJoined ? "outline" : "primary"}
              className={isJoined ? "border-red-500 text-red-600 dark:border-red-400 dark:text-red-400" : ""}
            >
              {isJoined ? '已加入' : '加入小组'}
            </Button>
            
            {isJoined && (
              <Button href="/community/group/post/new?groupId=g1" variant="outline">
                发布帖子
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      {/* 标签页切换 */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex space-x-8">
          <button
            className={`pb-4 font-medium text-sm cursor-pointer relative ${
              activeTab === 'posts'
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('posts')}
          >
            全部帖子
            {activeTab === 'posts' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400"></span>
            )}
          </button>
          <button
            className={`pb-4 font-medium text-sm cursor-pointer relative ${
              activeTab === 'about'
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('about')}
          >
            小组信息
            {activeTab === 'about' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 dark:bg-red-400"></span>
            )}
          </button>
        </div>
      </div>

      {/* 帖子列表 */}
      {activeTab === 'posts' && (
        <>
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索帖子..."
                className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-3 top-2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {sortedPosts.length > 0 ? (
              sortedPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardBody>
                    <Link href={`/community/group/post/${post.id}`}>
                      <h3 className="text-lg font-semibold mb-2 hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center">
                        {post.isPinned && (
                          <span className="inline-block bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 text-xs px-2 py-0.5 rounded-full mr-2">
                            置顶
                          </span>
                        )}
                        {post.title}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {post.content}
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <span className="mr-4">作者：{post.author}</span>
                        <span className="mr-4">发布于：{post.date}</span>
                        <span className="mr-4">阅读：{post.views}</span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          {post.likes}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                          {post.comments}
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))
            ) : (
              <Card>
                <CardBody className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">没有找到符合条件的帖子</p>
                  {searchQuery && (
                    <Button 
                      variant="outline" 
                      onClick={() => setSearchQuery('')}
                    >
                      清除搜索
                    </Button>
                  )}
                </CardBody>
              </Card>
            )}
          </div>
          
          {isJoined && (
            <div className="text-center mb-8">
              <Button href="/community/group/post/new?groupId=g1">
                发布新帖子
              </Button>
            </div>
          )}
        </>
      )}

      {/* 小组信息 */}
      {activeTab === 'about' && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardBody>
                <h3 className="text-xl font-bold mb-4">小组介绍</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {groupDetails.description}
                </p>
                
                <h4 className="font-bold mb-3">小组规则</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 mb-6">
                  {groupDetails.rules.map((rule, index) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
                
                <h4 className="font-bold mb-3">加入我们</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  如果您对京剧流派研究感兴趣，欢迎加入我们的讨论组。在这里，您可以与其他京剧爱好者交流学习心得，分享观看体验，参与专业讨论。
                </p>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody>
                <h3 className="text-xl font-bold mb-4">成员概况</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="block text-gray-600 dark:text-gray-400">成员总数</span>
                    <span className="text-2xl font-bold">{groupDetails.members}</span>
                  </div>
                  <div>
                    <span className="block text-gray-600 dark:text-gray-400">帖子总数</span>
                    <span className="text-2xl font-bold">{groupDetails.posts}</span>
                  </div>
                  <div>
                    <span className="block text-gray-600 dark:text-gray-400">创建时间</span>
                    <span className="font-semibold">{groupDetails.createdAt}</span>
                  </div>
                  <div>
                    <span className="block text-gray-600 dark:text-gray-400">本周活跃度</span>
                    <span className="font-semibold">较高</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardBody>
                <h3 className="text-xl font-bold mb-4">小组管理员</h3>
                <div className="space-y-4">
                  {groupDetails.admins.map((admin, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium">
                        {admin.charAt(0)}
                      </div>
                      <div>
                        <span className="font-medium block">{admin}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">管理员</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
            
            <Card>
              <CardBody>
                <h3 className="text-xl font-bold mb-4">相关小组</h3>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      href="/community/group/g2" 
                      className="block text-gray-800 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400"
                    >
                      京剧入门
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/community/group/g3" 
                      className="block text-gray-800 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400"
                    >
                      行当交流
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/community/group/g4" 
                      className="block text-gray-800 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400"
                    >
                      京剧票友会
                    </Link>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DiscussionGroupPage; 