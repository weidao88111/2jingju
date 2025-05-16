import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout/Layout';
import Card, { CardBody, CardFooter } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { forumPosts, Comment, Post, initPosts } from '../../../data/posts';

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // 初始化帖子数据并查找当前帖子
  useEffect(() => {
    // 初始化帖子数据
    initPosts();
    
    if (id) {
      // 根据ID查找帖子
      const foundPost = forumPosts.find(p => p.id === id);
      setPost(foundPost || null);
      setIsLoading(false);
    }
  }, [id]);
  
  // 如果帖子不存在，显示错误信息
  if (!isLoading && !post) {
    return (
      <Layout>
        <Head>
          <title>帖子不存在 - 京剧艺术网</title>
        </Head>
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">帖子不存在</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            您查找的帖子可能已被删除或从未存在
          </p>
          <Button href="/community?tab=posts">
            返回帖子列表
          </Button>
        </div>
      </Layout>
    );
  }
  
  // 如果正在加载，显示加载状态
  if (isLoading || !post) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      </Layout>
    );
  }
  
  const comments = Array.isArray(post.comments) ? post.comments : [];
  
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 这里模拟提交评论到服务器的过程
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 创建新评论
      const newCommentObj: Comment = {
        id: `c${Date.now()}`,
        author: '当前用户', // 实际应用中应该使用登录用户
        content: newComment,
        date: new Date().toISOString().split('T')[0], // 格式化日期为YYYY-MM-DD
        likes: 0
      };
      
      // 将新评论添加到帖子
      if (Array.isArray(post.comments)) {
        post.comments.push(newCommentObj);
        
        // 更新本地存储
        try {
          const savedPosts = localStorage.getItem('forumPosts');
          if (savedPosts) {
            const postsArray = JSON.parse(savedPosts) as Post[];
            const postIndex = postsArray.findIndex(p => p.id === post.id);
            
            if (postIndex !== -1) {
              postsArray[postIndex] = post;
              localStorage.setItem('forumPosts', JSON.stringify(postsArray));
            }
          }
        } catch (error) {
          console.error('更新本地存储失败:', error);
        }
      }
      
      // 清空评论输入框
      setNewComment('');
      
      // 强制组件更新以显示新评论
      setPost({...post});
    } catch (error) {
      console.error('提交评论失败:', error);
      alert('评论提交失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>{post.title} - 京剧艺术网</title>
        <meta name="description" content={`${post.content.substring(0, 150)}...`} />
      </Head>

      <div className="mb-4">
        <Button 
          variant="ghost" 
          onClick={() => router.push('/community?tab=posts')}
          className="mb-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回帖子列表
        </Button>
        
        <Card className="mb-6">
          <CardBody>
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{post.title}</h1>
              
              <div className="flex items-center mb-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="mr-4">作者: {post.author}</span>
                <span className="mr-4">发布于: {post.date}</span>
                <span>浏览: {post.views}</span>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-6">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="prose prose-red dark:prose-invert max-w-none">
                {post.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < paragraph.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-4">
                <button className="flex items-center text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  点赞 ({post.likes})
                </button>
                
                <button className="flex items-center text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  分享
                </button>
              </div>
              
              <div>
                <button className="flex items-center text-gray-500 hover:text-yellow-600 dark:text-gray-400 dark:hover:text-yellow-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  收藏
                </button>
              </div>
            </div>
          </CardBody>
        </Card>
        
        {/* 评论区 */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">评论 ({comments.length})</h2>
          
          {/* 评论列表 */}
          <div className="space-y-4 mb-8">
            {comments.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                暂无评论，快来发表第一条评论吧！
              </p>
            ) : (
              comments.map(comment => (
                <Card key={comment.id} className="bg-gray-50 dark:bg-gray-800/50 border-0">
                  <CardBody>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 font-semibold">
                          {comment.author.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{comment.author}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{comment.date}</span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-200 mb-2">{comment.content}</p>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <button className="flex items-center hover:text-red-600 dark:hover:text-red-400 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            赞同 ({comment.likes})
                          </button>
                          <button className="flex items-center ml-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            </svg>
                            回复
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))
            )}
          </div>
          
          {/* 发表评论 */}
          <Card>
            <CardBody>
              <h3 className="text-lg font-semibold mb-4">发表评论</h3>
              <form onSubmit={handleSubmitComment}>
                <div className="mb-4">
                  <textarea
                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    rows={4}
                    placeholder="写下您的评论..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !newComment.trim()}
                  >
                    {isSubmitting ? '提交中...' : '发表评论'}
                  </Button>
                </div>
              </form>
            </CardBody>
            <CardFooter>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                请遵循社区规则，保持友善和尊重。禁止发布广告、攻击性言论或与主题无关的内容。
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PostPage; 