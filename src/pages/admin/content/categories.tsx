import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout/Layout';
import Card, { CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

// 模拟分类数据
const MOCK_CATEGORIES = [
  { id: 1, name: '京剧历史', slug: 'history', count: 12, description: '京剧的起源与历史发展' },
  { id: 2, name: '名家介绍', slug: 'masters', count: 8, description: '京剧名家和流派艺术特点' },
  { id: 3, name: '京剧元素', slug: 'elements', count: 10, description: '京剧服装、脸谱、道具等元素' },
  { id: 4, name: '京剧知识', slug: 'knowledge', count: 15, description: '京剧基础知识与鉴赏' },
  { id: 5, name: '剧目赏析', slug: 'plays', count: 20, description: '经典剧目与剧情分析' },
  { id: 6, name: '表演艺术', slug: 'performance', count: 7, description: '京剧表演技巧与特点' },
  { id: 7, name: '京剧音乐', slug: 'music', count: 5, description: '京剧音乐与唱腔分析' },
];

const CategoriesPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', slug: '', description: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: '', slug: '', description: '' });

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

  // 筛选分类
  const filteredCategories = categories.filter(category => {
    // 搜索名称、别名或描述
    return category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           category.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
           category.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // 添加新分类
  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.slug) return;
    
    // 生成新的ID (实际应用中由后端生成)
    const newId = Math.max(...categories.map(c => c.id)) + 1;
    
    setCategories([
      ...categories,
      {
        id: newId,
        name: newCategory.name,
        slug: newCategory.slug,
        description: newCategory.description,
        count: 0 // 新分类文章数为0
      }
    ]);
    
    // 重置表单
    setNewCategory({ name: '', slug: '', description: '' });
    setShowAddForm(false);
  };

  // 开始编辑分类
  const handleStartEdit = (category: typeof MOCK_CATEGORIES[0]) => {
    setEditingId(category.id);
    setEditForm({
      name: category.name,
      slug: category.slug,
      description: category.description
    });
  };

  // 保存编辑后的分类
  const handleSaveEdit = () => {
    if (!editingId || !editForm.name || !editForm.slug) return;
    
    setCategories(prevCategories => 
      prevCategories.map(category => 
        category.id === editingId 
          ? { ...category, name: editForm.name, slug: editForm.slug, description: editForm.description } 
          : category
      )
    );
    
    // 重置编辑状态
    setEditingId(null);
  };

  // 删除分类
  const handleDelete = (id: number) => {
    if (window.confirm('确定要删除这个分类吗？分类下的文章将变为未分类状态。')) {
      setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
    }
  };

  // 生成分类别名
  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/[\s，。：；''""《》？！【】（）、]/g, '-') // 将中文标点和空格替换为连字符
      .replace(/-+/g, '-') // 将多个连字符替换为单个
      .replace(/^-|-$/g, ''); // 移除开头和结尾的连字符
  };

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
        <title>分类管理 - 京剧艺术网</title>
        <meta name="description" content="管理京剧艺术网的内容分类" />
      </Head>

      {/* 页面标题 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">分类管理</h1>
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

      {/* 操作栏 */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-64 relative">
              <input
                type="text"
                placeholder="搜索分类..."
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
            <Button onClick={() => setShowAddForm(true)}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              添加分类
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* 添加分类表单 */}
      {showAddForm && (
        <Card className="mb-6">
          <CardBody>
            <h2 className="text-xl font-semibold mb-4">添加新分类</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  分类名称 <span className="text-red-500">*</span>
                </label>
                <input
                  id="categoryName"
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                  value={newCategory.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setNewCategory({
                      ...newCategory,
                      name,
                      slug: generateSlug(name)
                    });
                  }}
                  required
                />
              </div>
              <div>
                <label htmlFor="categorySlug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  分类别名 <span className="text-red-500">*</span>
                </label>
                <input
                  id="categorySlug"
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                  required
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">用于URL，只能包含字母、数字和连字符</p>
              </div>
              <div>
                <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  分类描述
                </label>
                <textarea
                  id="categoryDescription"
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  取消
                </Button>
                <Button onClick={handleAddCategory}>
                  添加分类
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* 分类列表 */}
      <Card>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    分类名称
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    别名
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    描述
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    文章数
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <tr key={category.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === category.id ? (
                          <input
                            type="text"
                            className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-red-500 dark:text-white"
                            value={editForm.name}
                            onChange={(e) => {
                              const name = e.target.value;
                              setEditForm({
                                ...editForm,
                                name,
                                // 当名称改变时，自动生成新的别名
                                ...(editForm.slug === category.slug ? { slug: generateSlug(name) } : {})
                              });
                            }}
                          />
                        ) : (
                          <div className="font-medium text-gray-900 dark:text-white">{category.name}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === category.id ? (
                          <input
                            type="text"
                            className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-red-500 dark:text-white"
                            value={editForm.slug}
                            onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                          />
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400">{category.slug}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingId === category.id ? (
                          <textarea
                            className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-red-500 dark:text-white"
                            value={editForm.description}
                            onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                            rows={2}
                          />
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400">{category.description || '-'}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link href={`/admin/content?category=${category.slug}`} className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                          {category.count}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          {editingId === category.id ? (
                            <>
                              <Button variant="ghost" size="sm" onClick={handleSaveEdit}>
                                保存
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}>
                                取消
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button variant="ghost" size="sm" onClick={() => handleStartEdit(category)}>
                                编辑
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-red-600 dark:text-red-400 border-red-600 dark:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                onClick={() => handleDelete(category.id)}
                              >
                                删除
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                      没有找到匹配的分类
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default CategoriesPage; 