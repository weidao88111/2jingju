import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/layout/AdminLayout';
import Card, { CardBody, CardHeader } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

// 模拟内容数据
const MOCK_ARTICLES = [
  { id: 1, title: '京剧的起源与发展', category: '京剧历史', author: '京剧爱好者', status: 'published', date: '2023-10-15' },
  { id: 2, title: '梅兰芳的艺术成就', category: '名家介绍', author: '京剧爱好者', status: 'published', date: '2023-10-20' },
  { id: 3, title: '京剧脸谱的色彩象征', category: '京剧元素', author: '清音悠扬', status: 'published', date: '2023-11-05' },
  { id: 4, title: '京剧常见角色类型', category: '京剧知识', author: '京剧爱好者', status: 'draft', date: '2023-11-10' },
  { id: 5, title: '京剧经典剧目介绍', category: '剧目赏析', author: '戏迷小王', status: 'draft', date: '2023-11-15' },
  { id: 6, title: '京剧表演技巧分析', category: '表演艺术', author: '京剧爱好者', status: 'review', date: '2023-11-20' },
  { id: 7, title: '京剧音乐特点探究', category: '京剧音乐', author: '京韵悠长', status: 'published', date: '2023-11-25' },
  { id: 8, title: '京剧服装的历史变迁', category: '京剧元素', author: '京剧爱好者', status: 'draft', date: '2023-12-01' },
];

const ContentPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState(MOCK_ARTICLES);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  // 筛选文章
  const filteredArticles = articles.filter(article => {
    // 搜索标题
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 状态筛选
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // 计算分页
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredArticles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

  // 处理文章状态变更
  const handleStatusChange = (id: number, newStatus: string) => {
    setArticles(prevArticles => 
      prevArticles.map(article => 
        article.id === id ? { ...article, status: newStatus } : article
      )
    );
  };

  // 处理文章删除
  const handleDelete = (id: number) => {
    if (window.confirm('确定要删除这篇文章吗？')) {
      setArticles(prevArticles => prevArticles.filter(article => article.id !== id));
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-gray-500 dark:text-gray-400">加载中...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Head>
        <title>内容管理 - 京剧艺术网</title>
        <meta name="description" content="管理京剧艺术网的文章、分类和其他内容" />
      </Head>

      {/* 页面标题 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">内容管理</h1>
        <Link href="/admin">
          <Button variant="outline" size="sm">
            返回控制台
          </Button>
        </Link>
      </div>

      {/* 操作栏 */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-auto flex items-center gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="搜索文章..."
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
              <select
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">所有状态</option>
                <option value="published">已发布</option>
                <option value="draft">草稿</option>
                <option value="review">审核中</option>
              </select>
            </div>
            <div className="w-full md:w-auto">
              <Link href="/admin/content/articles/new">
                <Button>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  新建文章
                </Button>
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* 内容列表 */}
      <Card>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    标题
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    分类
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    作者
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    状态
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    日期
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {currentItems.length > 0 ? (
                  currentItems.map((article) => (
                    <tr key={article.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900 dark:text-white">{article.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-500 dark:text-gray-400">{article.category}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-500 dark:text-gray-400">{article.author}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {article.status === 'published' && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                            已发布
                          </span>
                        )}
                        {article.status === 'draft' && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                            草稿
                          </span>
                        )}
                        {article.status === 'review' && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                            审核中
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-500 dark:text-gray-400">{article.date}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/content/articles/${article.id}`}>
                            <Button variant="ghost" size="sm">
                              编辑
                            </Button>
                          </Link>
                          {article.status !== 'published' ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleStatusChange(article.id, 'published')}
                            >
                              发布
                            </Button>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleStatusChange(article.id, 'draft')}
                            >
                              下架
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-600 dark:text-red-400 border-red-600 dark:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                            onClick={() => handleDelete(article.id)}
                          >
                            删除
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                      没有找到匹配的文章
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 分页控制 */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                显示 {filteredArticles.length} 条中的 {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredArticles.length)} 条
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                >
                  上一页
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  下一页
                </Button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* 快速链接 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold">分类管理</h2>
          </CardHeader>
          <CardBody>
            <p className="text-gray-500 dark:text-gray-400 mb-4">管理文章分类和标签，组织内容结构。</p>
            <Link href="/admin/content/categories">
              <Button variant="outline" fullWidth>
                管理分类
              </Button>
            </Link>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold">资源管理</h2>
          </CardHeader>
          <CardBody>
            <p className="text-gray-500 dark:text-gray-400 mb-4">上传和管理音频、视频和图片等资源文件。</p>
            <Link href="/admin/content/resources">
              <Button variant="outline" fullWidth>
                管理资源
              </Button>
            </Link>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold">评论管理</h2>
          </CardHeader>
          <CardBody>
            <p className="text-gray-500 dark:text-gray-400 mb-4">审核和管理用户对内容的评论和反馈。</p>
            <Link href="/admin/content/comments">
              <Button variant="outline" fullWidth>
                管理评论
              </Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ContentPage; 