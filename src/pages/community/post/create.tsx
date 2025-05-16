import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout/Layout';
import Button from '../../../components/ui/Button';
import Card, { CardBody, CardHeader, CardFooter } from '../../../components/ui/Card';
import FormField from '../../../components/ui/FormField';

// 导入模拟的帖子数据
import { forumPosts, Post } from '../../../data/posts';

const CreatePostPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
  });
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
    tags?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = '请输入帖子标题';
    } else if (formData.title.length > 100) {
      newErrors.title = '标题不能超过100个字符';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = '请输入帖子内容';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 这里模拟提交到服务器的过程
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 生成一个新的帖子ID（简单地基于当前时间）
      const newPostId = `p${Date.now()}`;
      
      // 解析标签，分割逗号分隔的标签
      const postTags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      // 创建新帖子对象
      const newPost: Post = {
        id: newPostId,
        title: formData.title,
        content: formData.content,
        author: '当前用户', // 实际应用中应该使用登录用户
        date: new Date().toISOString().split('T')[0], // 格式化日期为YYYY-MM-DD
        views: 1,
        comments: [], // 初始化空评论数组
        likes: 0,
        tags: postTags.length > 0 ? postTags : ['未分类']
      };
      
      // 将新帖子添加到本地存储，持久化数据
      try {
        // 获取现有帖子或创建新数组
        const savedPosts = localStorage.getItem('forumPosts');
        const postsArray = savedPosts ? JSON.parse(savedPosts) : [];
        
        // 添加新帖子到数组开头（最新的帖子显示在前面）
        postsArray.unshift(newPost);
        
        // 保存回本地存储
        localStorage.setItem('forumPosts', JSON.stringify(postsArray));
        
        // 将新帖子添加到内存中的数组
        forumPosts.unshift(newPost);
      } catch (error) {
        console.error('保存到本地存储失败:', error);
        // 继续执行，即使本地存储失败
      }
      
      // 成功后跳转到帖子详情页
      router.push(`/community/post/${newPostId}`);
    } catch (error) {
      console.error('提交帖子失败:', error);
      alert('发布帖子失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>发布帖子 - 京剧艺术网</title>
        <meta name="description" content="在京剧艺术网社区发布您的帖子，分享京剧相关的经验、感想和讨论话题" />
      </Head>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">发布帖子</h1>
        <p className="text-gray-600 dark:text-gray-300">
          在社区中分享您的京剧经验、见解或提出讨论话题
        </p>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <h2 className="text-xl font-semibold">帖子内容</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <FormField
              label="标题"
              name="title"
              placeholder="请输入帖子标题（100字以内）"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
              required
            />
            
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                内容
              </label>
              <textarea
                id="content"
                name="content"
                rows={8}
                className={`
                  w-full px-3 py-2 
                  bg-white dark:bg-gray-800 
                  border border-gray-300 dark:border-gray-700 
                  rounded-md shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 
                  dark:focus:ring-red-700 dark:focus:border-red-700
                  ${errors.content ? 'border-red-500 dark:border-red-500' : ''}
                `}
                placeholder="请输入帖子内容，分享您的经验、想法或疑问..."
                value={formData.content}
                onChange={handleChange}
                required
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.content}</p>
              )}
            </div>

            <FormField
              label="标签"
              name="tags"
              placeholder="用逗号分隔多个标签，如：梅派,名段赏析"
              value={formData.tags}
              onChange={handleChange}
              error={errors.tags}
              className="mb-6"
            />

            <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.back()}
              >
                取消
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? '发布中...' : '发布帖子'}
              </Button>
            </div>
          </form>
        </CardBody>
        <CardFooter>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            发布帖子即表示您同意我们的<a href="#" className="text-red-600 dark:text-red-400 hover:underline">社区规则</a>，
            请确保内容遵循社区指南，与京剧主题相关且尊重他人。
          </p>
        </CardFooter>
      </Card>
    </Layout>
  );
};

export default CreatePostPage; 