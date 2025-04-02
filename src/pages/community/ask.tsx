import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import Card, { CardBody } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const AskQuestionPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 问题分类选项
  const categories = [
    { id: 'history', name: '京剧历史' },
    { id: 'roles', name: '角色行当' },
    { id: 'techniques', name: '表演技巧' },
    { id: 'masters', name: '名家名段' },
    { id: 'learning', name: '学习心得' },
    { id: 'others', name: '其他' },
  ];

  // 提交问题
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表单验证
    if (!title.trim()) {
      setError('请输入问题标题');
      return;
    }
    
    if (!content.trim()) {
      setError('请输入问题详情');
      return;
    }
    
    if (!category) {
      setError('请选择问题分类');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // 这里是模拟提交，实际项目中应替换为真实API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟成功后跳转到社区主页
      router.push('/community?success=true');
    } catch (err) {
      setError('提交问题时出错，请稍后再试');
      console.error('提交问题出错:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>提问问题 - 京剧艺术网</title>
        <meta name="description" content="在京剧艺术社区提出你的问题，获得专业解答" />
      </Head>

      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回社区
        </button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">提出问题</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          详细描述你的京剧相关问题，社区中的专业人士和爱好者将为你解答。清晰的问题描述更容易获得精准的回答。
        </p>
      </div>

      <Card className="mb-8">
        <CardBody>
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                {error}
              </div>
            )}
            
            <div className="mb-6">
              <label htmlFor="question-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                问题标题 <span className="text-red-500">*</span>
              </label>
              <input
                id="question-title"
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                placeholder="例如：如何区分京剧中的西皮和二黄两种板式？"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="question-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                问题分类 <span className="text-red-500">*</span>
              </label>
              <select
                id="question-category"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">请选择分类</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-6">
              <label htmlFor="question-content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                问题详情 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="question-content"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[200px] dark:text-white"
                placeholder="详细描述你的问题，提供你已经了解的信息和具体的疑惑..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            
            <div className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                取消
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? '提交中...' : '发布问题'}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
      
      <Card>
        <CardBody>
          <h3 className="text-lg font-bold mb-3">提问小贴士</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
            <li>提供具体、清晰的问题标题，方便其他用户理解你的问题</li>
            <li>在问题详情中提供背景信息和已有认识，有助于更精准的解答</li>
            <li>选择合适的分类，使问题能够被相关领域的专业人士看到</li>
            <li>如果你的问题需要图片或音频辅助说明，可以在详情中提供链接</li>
            <li>发布前检查是否有类似问题已被解答，避免重复提问</li>
          </ul>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default AskQuestionPage; 