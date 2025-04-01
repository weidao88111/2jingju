import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import KnowledgeCard from '../../components/knowledge/KnowledgeCard';
import Button from '../../components/ui/Button';
import Card, { CardBody } from '../../components/ui/Card';

// Mock data
const knowledgeCategories = [
  { id: 'history', name: '京剧历史', icon: '📜' },
  { id: 'schools', name: '流派介绍', icon: '🎭' },
  { id: 'roles', name: '角色行当', icon: '👥' },
  { id: 'plays', name: '经典剧目', icon: '📚' },
  { id: 'masters', name: '名家介绍', icon: '⭐' },
  { id: 'culture', name: '京剧文化', icon: '🏮' },
];

const knowledgeItems = [
  {
    id: '1',
    title: '京剧的历史起源',
    description: '京剧形成于清朝乾隆年间，起源于安徽徽班进京，逐渐融合了汉调、昆曲等多种艺术形式，是中国传统戏曲中最具代表性的剧种之一。通过近两百年的发展，京剧已成为中国国粹，代表着中华文化的精髓。',
    imageUrl: '/images/history.jpg',
    category: '历史',
    readMoreUrl: '/knowledge/history',
  },
  {
    id: '2',
    title: '生旦净丑 - 京剧角色行当',
    description: '京剧角色可分为生、旦、净、丑四大行当，每个行当又有多种细分。生为男性角色；旦为女性角色；净为性格刚烈、豪爽的男性角色，脸上画有脸谱；丑则是滑稽诙谐的角色。不同行当有各自独特的表演技巧和艺术特点。',
    imageUrl: '/images/roles.jpg',
    category: '行当',
    readMoreUrl: '/knowledge/roles',
  },
  {
    id: '3',
    title: '梅兰芳与"梅派"艺术',
    description: '梅兰芳（1894-1961）是中国京剧表演艺术大师，创立了独具特色的"梅派"表演风格。他擅长青衣和刀马旦，代表作品包括《贵妃醉酒》《霸王别姬》等。梅兰芳艺术精湛，表演细腻，对京剧发展有深远影响，也是京剧走向世界的重要使者。',
    imageUrl: '/images/meipai.jpg',
    category: '名家',
    readMoreUrl: '/knowledge/masters/meilanfang',
  },
  {
    id: '4',
    title: '《霸王别姬》剧目解析',
    description: '《霸王别姬》是京剧经典剧目之一，讲述西楚霸王项羽与虞姬的爱情故事。剧中通过项羽兵败乌江、虞姬自刎的悲剧，表现了壮烈的爱情和悲壮的历史。该剧集中体现了京剧艺术的唱、念、做、打等综合表演艺术特色。',
    imageUrl: '/images/bawangbieji.jpg',
    category: '剧目',
    readMoreUrl: '/knowledge/plays/bawangbieji',
  },
  {
    id: '5',
    title: '京剧脸谱艺术',
    description: '京剧脸谱是京剧艺术中的重要组成部分，通过不同的色彩和图案表现人物性格和特点。红色代表忠勇，黑色代表刚直，白色代表奸诈，黄色代表勇猛。脸谱设计融合了绘画艺术与戏剧表演，是中国传统文化的瑰宝。',
    imageUrl: '/images/masks.jpg',
    category: '文化',
    readMoreUrl: '/knowledge/culture/masks',
  },
  {
    id: '6',
    title: '程派艺术特色',
    description: '程派是由程砚秋创立的京剧艺术流派，以表演青衣角色见长。程派艺术特点是声音圆润、行腔流畅、表演细腻，注重人物内心情感的刻画，代表作品有《锁麟囊》《春闺梦》等。程派艺术对京剧青衣表演艺术发展有深远影响。',
    imageUrl: '/images/chengpai.jpg',
    category: '流派',
    readMoreUrl: '/knowledge/schools/chengpai',
  },
];

const KnowledgePage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredItems = knowledgeItems.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || 
      item.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

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
      {filteredItems.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredItems.map((item) => (
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
    </Layout>
  );
};

export default KnowledgePage; 