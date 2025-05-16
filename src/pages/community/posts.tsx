import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { forumPosts, initPosts } from '../../data/posts';

// 提取所有标签（去重）
const getAllTags = () => {
  return Array.from(new Set(
    forumPosts.flatMap(post => post.tags)
  )).sort();
};

type SortOption = 'latest' | 'popular' | 'comments' | 'likes';

const PostsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [allTags, setAllTags] = useState<string[]>([]);

  // 初始化帖子数据
  useEffect(() => {
    initPosts();
    setAllTags(getAllTags());
  }, []);

  // 根据条件筛选帖子
  const filteredPosts = forumPosts.filter(post => {
    // 搜索标题或内容
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 标签过滤
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => post.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  }).sort((a, b) => {
    // 排序
    switch (sortBy) {
      case 'latest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'popular':
        return b.views - a.views;
      case 'comments':
        const commentsA = Array.isArray(a.comments) ? a.comments.length : (typeof a.comments === 'number' ? a.comments : 0);
        const commentsB = Array.isArray(b.comments) ? b.comments.length : (typeof b.comments === 'number' ? b.comments : 0);
        return commentsB - commentsA;
      case 'likes':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  return (
    <Layout>
      <Head>
        <title>帖子讨论 - 京剧艺术网</title>
        <meta name="description" content="京剧艺术网的社区帖子，分享京剧相关的心得体会、交流讨论和经验分享" />
      </Head>

      <div className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">帖子讨论</h1>
            <p className="text-gray-600 dark:text-gray-300">
              京剧爱好者的交流平台，分享心得、经验和思考
            </p>
          </div>
          <Button href="/community/post/create">
            发布帖子
          </Button>
        </div>

        {/* 搜索和筛选区 */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索帖子..."
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

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">标签筛选</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`
                      text-xs px-3 py-1.5 rounded-full transition-colors 
                      ${selectedTags.includes(tag) 
                        ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}
                    `}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="md:w-64">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">排序方式</h3>
              <select 
                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="latest">最新发布</option>
                <option value="popular">最多浏览</option>
                <option value="comments">最多评论</option>
                <option value="likes">最多点赞</option>
              </select>
            </div>
          </div>
        </div>

        {/* 帖子列表 */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">没有找到符合条件的帖子</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTags([]);
                }}
              >
                清除筛选条件
              </Button>
            </div>
          ) : (
            filteredPosts.map(post => (
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
            ))
          )}
        </div>

        {/* 分页 */}
        {filteredPosts.length > 0 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center space-x-1">
              <button className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                上一页
              </button>
              
              <button className="px-3 py-2 rounded-md bg-red-600 text-white">
                1
              </button>
              
              <button className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                2
              </button>
              
              <button className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                3
              </button>
              
              <button className="px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                下一页
              </button>
            </nav>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PostsPage; 