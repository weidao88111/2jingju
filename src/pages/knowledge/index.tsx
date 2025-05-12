import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import KnowledgeCard from '../../components/knowledge/KnowledgeCard';
import Button from '../../components/ui/Button';
import Card, { CardBody } from '../../components/ui/Card';
import { useContent } from '../../lib/context/ContentContext';
import DebugPanel from '../../components/ui/DebugPanel';

// Mock data
const knowledgeCategories = [
  { id: 'history', name: '京剧历史', icon: '📜' },
  { id: 'schools', name: '流派介绍', icon: '🎭' },
  { id: 'roles', name: '角色行当', icon: '👥' },
  { id: 'plays', name: '经典剧目', icon: '📚' },
  { id: 'masters', name: '名家介绍', icon: '⭐' },
  { id: 'culture', name: '京剧文化', icon: '🏮' },
];

const KnowledgePage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { articles, knowledgeItems } = useContent();

  // 根据管理系统中的文章状态过滤知识库内容
  const filteredKnowledgeItems = useMemo(() => {
    console.log('Filtering knowledge items based on articles:', articles);
    return knowledgeItems.filter(item => {
      // 查找对应的文章
      const matchingArticle = articles.find(article => article.title === item.title);
      
      // 如果找到对应文章且状态不是published，则隐藏
      if (matchingArticle && matchingArticle.status !== 'published') {
        console.log(`Hiding item: ${item.title} because article status is ${matchingArticle.status}`);
        return false;
      }
      
      return true;
    });
  }, [knowledgeItems, articles]);

  // 根据搜索词和分类过滤内容
  const displayedItems = filteredKnowledgeItems.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || 
      item.category.toLowerCase() === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  console.log('Displayed items:', displayedItems);

  return (
    <Layout>
      <Head>
        <title>京剧知识库 - 京剧艺术网</title>
        <meta name="description" content="探索京剧的历史、流派、角色行当以及经典剧目，了解中国传统京剧文化" />
      </Head>

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">京剧知识库</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          探索京剧的历史文化、流派特点、角色行当和经典剧目，了解这一中国传统艺术瑰宝的魅力与精髓。
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="搜索京剧知识..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory(null);
              }}
              variant="outline"
              disabled={searchTerm === '' && selectedCategory === null}
            >
              重置筛选
            </Button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {knowledgeCategories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.name.toLowerCase()
                  ? 'bg-red-700 text-white'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => setSelectedCategory(
                selectedCategory === category.name.toLowerCase() ? null : category.name.toLowerCase()
              )}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {displayedItems.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedItems.map((item) => (
            <KnowledgeCard key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardBody>
            <p className="text-gray-500 dark:text-gray-400 mb-4">没有找到符合条件的内容</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setSelectedCategory(null);
            }}>
              重置筛选
            </Button>
          </CardBody>
        </Card>
      )}
      
      {/* Debug Panel */}
      <DebugPanel />
    </Layout>
  );
};

export default KnowledgePage; 