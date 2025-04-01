import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout/Layout';
import Card, { CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

// 评论状态枚举
enum CommentStatus {
  Pending = 'pending',
  Approved = 'approved',
  Spam = 'spam',
  Trash = 'trash'
}

// 模拟评论数据
const MOCK_COMMENTS = [
  { 
    id: 1, 
    content: '梅兰芳先生的表演真是令人叹为观止，这篇文章详细介绍了他的艺术成就，让我对京剧有了更深的理解。', 
    author: '京剧爱好者', 
    email: 'fan@example.com',
    articleTitle: '梅兰芳的艺术成就与创新',
    articleUrl: '/articles/mei-lanfang-achievements',
    date: '2023-11-10 15:30',
    status: CommentStatus.Approved,
    replyCount: 1
  },
  { 
    id: 2, 
    content: '这个表演视频的画质不够清晰，希望能提供更高清的版本。', 
    author: '清音悠扬', 
    email: 'qingyin@example.com',
    articleTitle: '经典唱段视频：《贵妃醉酒》',
    articleUrl: '/resources/video/guifei',
    date: '2023-11-12 09:45',
    status: CommentStatus.Pending,
    replyCount: 0
  },
  { 
    id: 3, 
    content: '京剧的历史比文章说的要更早，应该更正一下相关内容。', 
    author: '剧史研究者', 
    email: 'researcher@example.com',
    articleTitle: '京剧的起源与发展',
    articleUrl: '/articles/jingju-history',
    date: '2023-11-11 20:15',
    status: CommentStatus.Approved,
    replyCount: 2
  },
  { 
    id: 4, 
    content: '购买广告位联系QQ123456789，全网推广，效果显著。', 
    author: '网络推广', 
    email: 'spam@example.com',
    articleTitle: '京剧名家访谈实录',
    articleUrl: '/articles/master-interviews',
    date: '2023-11-13 07:22',
    status: CommentStatus.Spam,
    replyCount: 0
  },
  { 
    id: 5, 
    content: '这个脸谱的寓意解释得很到位，学习了！希望以后能有更多关于脸谱色彩象征意义的内容。', 
    author: '戏曲新手', 
    email: 'newbie@example.com',
    articleTitle: '京剧脸谱的艺术特色与象征',
    articleUrl: '/articles/facial-makeup',
    date: '2023-11-13 14:36',
    status: CommentStatus.Pending,
    replyCount: 0
  },
  { 
    id: 6, 
    content: '文章中提到的剧目年代有误，应该核实一下历史资料。', 
    author: '京韵悠长', 
    email: 'jingOpera@example.com',
    articleTitle: '经典剧目年表',
    articleUrl: '/articles/classic-plays',
    date: '2023-11-09 16:50',
    status: CommentStatus.Trash,
    replyCount: 0
  },
];

const CommentsPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [activeStatus, setActiveStatus] = useState<CommentStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [replyForm, setReplyForm] = useState({ id: 0, content: '' });

  // 检查用户是否已经登录
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        router.push('/admin/login');
      } else {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);

  // 统计各状态的评论数量
  const commentCounts = {
    all: comments.length,
    pending: comments.filter(c => c.status === CommentStatus.Pending).length,
    approved: comments.filter(c => c.status === CommentStatus.Approved).length,
    spam: comments.filter(c => c.status === CommentStatus.Spam).length,
    trash: comments.filter(c => c.status === CommentStatus.Trash).length
  };

  // 筛选评论
  const filteredComments = comments.filter(comment => {
    // 按状态筛选
    if (activeStatus !== 'all' && comment.status !== activeStatus) return false;
    
    // 按搜索词筛选
    if (searchTerm && 
        !comment.content.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !comment.author.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !comment.articleTitle.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // 更改评论状态
  const handleStatusChange = (id: number, newStatus: CommentStatus) => {
    setComments(prevComments => 
      prevComments.map(comment => 
        comment.id === id ? { ...comment, status: newStatus } : comment
      )
    );
  };

  // 删除评论
  const handleDelete = (id: number) => {
    if (window.confirm('确定要彻底删除这条评论吗？此操作不可撤销。')) {
      setComments(prevComments => prevComments.filter(comment => comment.id !== id));
    }
  };

  // 回复评论
  const handleReply = () => {
    if (!replyForm.content || !replyForm.id) return;
    
    // 在实际应用中，这里应该发送API请求保存回复
    alert(`已回复ID为 ${replyForm.id} 的评论：${replyForm.content}`);
    
    // 更新回复计数
    setComments(prevComments => 
      prevComments.map(comment => 
        comment.id === replyForm.id 
          ? { ...comment, replyCount: comment.replyCount + 1 } 
          : comment
      )
    );
    
    // 重置表单
    setReplyForm({ id: 0, content: '' });
  };

  // 批量操作（实际应用中可以添加批量操作功能）
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-gray-500 dark:text-gray-400">加载中...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>评论管理 - 京剧艺术网</title>
        <meta name="description" content="管理京剧艺术网的文章评论" />
      </Head>

      {/* 页面标题 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">评论管理</h1>
        <div className="flex gap-2">
          <Link href="/admin/content">
            <Button variant="outline" size="sm">
              返回内容管理
            </Button>
          </Link>
          <Link href="/admin">
            <Button variant="outline" size="sm">
              返回控制台
            </Button>
          </Link>
        </div>
      </div>

      {/* 评论筛选 */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={activeStatus === 'all' ? 'primary' : 'ghost'} 
                size="sm"
                onClick={() => setActiveStatus('all')}
              >
                全部评论 <span className="ml-1 text-gray-500">({commentCounts.all})</span>
              </Button>
              <Button 
                variant={activeStatus === CommentStatus.Pending ? 'primary' : 'ghost'} 
                size="sm"
                onClick={() => setActiveStatus(CommentStatus.Pending)}
              >
                待审核 <span className="ml-1 text-gray-500">({commentCounts.pending})</span>
              </Button>
              <Button 
                variant={activeStatus === CommentStatus.Approved ? 'primary' : 'ghost'} 
                size="sm"
                onClick={() => setActiveStatus(CommentStatus.Approved)}
              >
                已批准 <span className="ml-1 text-gray-500">({commentCounts.approved})</span>
              </Button>
              <Button 
                variant={activeStatus === CommentStatus.Spam ? 'primary' : 'ghost'} 
                size="sm"
                onClick={() => setActiveStatus(CommentStatus.Spam)}
              >
                垃圾评论 <span className="ml-1 text-gray-500">({commentCounts.spam})</span>
              </Button>
              <Button 
                variant={activeStatus === CommentStatus.Trash ? 'primary' : 'ghost'} 
                size="sm"
                onClick={() => setActiveStatus(CommentStatus.Trash)}
              >
                回收站 <span className="ml-1 text-gray-500">({commentCounts.trash})</span>
              </Button>
            </div>
            <div className="w-full md:w-64 relative">
              <input
                type="text"
                placeholder="搜索评论..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* 评论列表 */}
      {filteredComments.length > 0 ? (
        <div className="space-y-4">
          {filteredComments.map(comment => (
            <Card key={comment.id} className={`
              ${comment.status === CommentStatus.Pending ? 'border-l-4 border-l-yellow-400' : ''}
              ${comment.status === CommentStatus.Spam ? 'border-l-4 border-l-red-400' : ''}
              ${comment.status === CommentStatus.Trash ? 'opacity-70' : ''}
            `}>
              <CardBody>
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex-grow">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-lg">
                          {comment.author.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">{comment.author}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{comment.email}</div>
                        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          评论于：<Link href={comment.articleUrl} className="hover:text-red-600 dark:hover:text-red-400">{comment.articleTitle}</Link>
                        </div>
                        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">{comment.date}</div>
                      </div>
                    </div>
                    <div className="mt-3 text-gray-700 dark:text-gray-300">
                      {comment.content}
                    </div>
                    
                    {/* 回复表单 */}
                    {replyForm.id === comment.id && (
                      <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                        <textarea
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                          rows={3}
                          placeholder="回复此评论..."
                          value={replyForm.content}
                          onChange={(e) => setReplyForm({ ...replyForm, content: e.target.value })}
                        />
                        <div className="flex justify-end mt-2 space-x-2">
                          <Button variant="outline" size="sm" onClick={() => setReplyForm({ id: 0, content: '' })}>
                            取消
                          </Button>
                          <Button size="sm" onClick={handleReply}>
                            发送回复
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    {/* 评论信息底部 */}
                    <div className="mt-3 text-sm">
                      {comment.replyCount > 0 && (
                        <span className="text-gray-500 dark:text-gray-400 mr-2">
                          {comment.replyCount} 条回复
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* 操作按钮 */}
                  <div className="mt-4 md:mt-0 md:ml-4 flex md:flex-col gap-2 flex-wrap">
                    {comment.status !== CommentStatus.Approved && (
                      <Button variant="ghost" size="sm" onClick={() => handleStatusChange(comment.id, CommentStatus.Approved)}>
                        批准
                      </Button>
                    )}
                    {comment.status !== CommentStatus.Spam && (
                      <Button variant="ghost" size="sm" onClick={() => handleStatusChange(comment.id, CommentStatus.Spam)}>
                        标为垃圾
                      </Button>
                    )}
                    {comment.status !== CommentStatus.Trash && (
                      <Button variant="ghost" size="sm" onClick={() => handleStatusChange(comment.id, CommentStatus.Trash)}>
                        移至回收站
                      </Button>
                    )}
                    {comment.status === CommentStatus.Trash && (
                      <Button variant="outline" size="sm" className="text-red-600 dark:text-red-400" onClick={() => handleDelete(comment.id)}>
                        彻底删除
                      </Button>
                    )}
                    {replyForm.id !== comment.id && comment.status === CommentStatus.Approved && (
                      <Button variant="ghost" size="sm" onClick={() => setReplyForm({ id: comment.id, content: '' })}>
                        回复
                      </Button>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardBody>
            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
              没有找到匹配的评论
            </div>
          </CardBody>
        </Card>
      )}
    </Layout>
  );
};

export default CommentsPage; 