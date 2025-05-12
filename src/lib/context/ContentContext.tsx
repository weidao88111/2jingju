import React, { createContext, useContext, useState, useEffect } from 'react';

// 定义文章类型
export interface Article {
  id: number;
  title: string;
  category: string;
  author: string;
  status: 'published' | 'draft' | 'review';
  date: string;
}

// 定义知识项类型
export interface KnowledgeItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  readMoreUrl: string;
}

// 模拟文章数据
const MOCK_ARTICLES: Article[] = [
  { id: 1, title: '京剧的历史起源', category: '历史', author: '京剧研究者', status: 'published', date: '2023-10-15' },
  { id: 2, title: '生旦净丑 - 京剧角色行当', category: '行当', author: '京剧爱好者', status: 'published', date: '2023-10-20' },
  { id: 3, title: '梅兰芳与"梅派"艺术', category: '名家', author: '戏曲专家', status: 'published', date: '2023-11-05' },
  { id: 4, title: '《霸王别姬》剧目解析', category: '剧目', author: '京剧评论家', status: 'published', date: '2023-11-10' },
  { id: 5, title: '京剧脸谱艺术', category: '文化', author: '清音悠扬', status: 'published', date: '2023-11-15' },
  { id: 6, title: '程派艺术特色', category: '流派', author: '京韵悠长', status: 'published', date: '2023-11-20' },
  { id: 7, title: '京剧常见角色类型', category: '京剧知识', author: '京剧爱好者', status: 'draft', date: '2023-11-25' },
  { id: 8, title: '京剧经典剧目介绍', category: '剧目赏析', author: '戏迷小王', status: 'draft', date: '2023-12-01' },
  { id: 9, title: '京剧表演技巧分析', category: '表演艺术', author: '京剧爱好者', status: 'review', date: '2023-12-05' },
  { id: 10, title: '京剧服装的历史变迁', category: '京剧元素', author: '京剧爱好者', status: 'draft', date: '2023-12-10' },
];

// 模拟知识库数据
const MOCK_KNOWLEDGE_ITEMS: KnowledgeItem[] = [
  {
    id: '1',
    title: '京剧的历史起源',
    description: '京剧形成于清朝乾隆年间，起源于安徽徽班进京，逐渐融合了汉调、昆曲等多种艺术形式，是中国传统戏曲中最具代表性的剧种之一。通过近两百年的发展，京剧已成为中国国粹，代表着中华文化的精髓。',
    imageUrl: '/media/images/history.png',
    category: '历史',
    readMoreUrl: '/knowledge/history',
  },
  {
    id: '2',
    title: '生旦净丑 - 京剧角色行当',
    description: '京剧角色可分为生、旦、净、丑四大行当，每个行当又有多种细分。生为男性角色；旦为女性角色；净为性格刚烈、豪爽的男性角色，脸上画有脸谱；丑则是滑稽诙谐的角色。不同行当有各自独特的表演技巧和艺术特点。',
    imageUrl: '/media/images/生旦净丑.png',
    category: '行当',
    readMoreUrl: '/knowledge/roles',
  },
  {
    id: '3',
    title: '梅兰芳与"梅派"艺术',
    description: '梅兰芳（1894-1961）是中国京剧表演艺术大师，创立了独具特色的"梅派"表演风格。他擅长青衣和刀马旦，代表作品包括《贵妃醉酒》《霸王别姬》等。梅兰芳艺术精湛，表演细腻，对京剧发展有深远影响，也是京剧走向世界的重要使者。',
    imageUrl: '/media/images/meipai.png',
    category: '名家',
    readMoreUrl: '/knowledge/masters/meilanfang',
  },
  {
    id: '4',
    title: '《霸王别姬》剧目解析',
    description: '《霸王别姬》是京剧经典剧目之一，讲述西楚霸王项羽与虞姬的爱情故事。剧中通过项羽兵败乌江、虞姬自刎的悲剧，表现了壮烈的爱情和悲壮的历史。该剧集中体现了京剧艺术的唱、念、做、打等综合表演艺术特色。',
    imageUrl: '/media/images/bawangbieji.png',
    category: '剧目',
    readMoreUrl: '/knowledge/plays/bawangbieji',
  },
  {
    id: '5',
    title: '京剧脸谱艺术',
    description: '京剧脸谱是京剧艺术中的重要组成部分，通过不同的色彩和图案表现人物性格和特点。红色代表忠勇，黑色代表刚直，白色代表奸诈，黄色代表勇猛。脸谱设计融合了绘画艺术与戏剧表演，是中国传统文化的瑰宝。',
    imageUrl: '/media/images/masks.png',
    category: '文化',
    readMoreUrl: '/knowledge/culture/masks',
  },
  {
    id: '6',
    title: '程派艺术特色',
    description: '程派是由程砚秋创立的京剧艺术流派，以表演青衣角色见长。程派艺术特点是声音圆润、行腔流畅、表演细腻，注重人物内心情感的刻画，代表作品有《锁麟囊》《春闺梦》等。程派艺术对京剧青衣表演艺术发展有深远影响。',
    imageUrl: '/media/images/chengpai.png',
    category: '流派',
    readMoreUrl: '/knowledge/schools/chengpai',
  },
];

// 创建Context类型
interface ContentContextType {
  articles: Article[];
  knowledgeItems: KnowledgeItem[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  setKnowledgeItems: React.Dispatch<React.SetStateAction<KnowledgeItem[]>>;
  handleStatusChange: (id: number, newStatus: 'published' | 'draft' | 'review') => void;
  handleDelete: (id: number) => void;
}

// 创建Context
const ContentContext = createContext<ContentContextType | undefined>(undefined);

// 创建Provider组件
export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 状态管理
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>(MOCK_KNOWLEDGE_ITEMS);

  // 处理文章状态变更
  const handleStatusChange = (id: number, newStatus: 'published' | 'draft' | 'review') => {
    console.log(`Changing article ${id} status to ${newStatus}`);
    
    // 更新文章状态
    const updatedArticles = articles.map(article => 
      article.id === id ? { ...article, status: newStatus } : article
    );
    
    setArticles(updatedArticles);
    
    // 保存到localStorage
    try {
      localStorage.setItem('jingjuArticles', JSON.stringify(updatedArticles));
    } catch (error) {
      console.error('Failed to save articles to localStorage', error);
    }
    
    console.log('Updated articles:', updatedArticles);
  };

  // 处理文章删除
  const handleDelete = (id: number) => {
    console.log(`Deleting article ${id}`);
    
    // 删除文章
    const updatedArticles = articles.filter(article => article.id !== id);
    
    setArticles(updatedArticles);
    
    // 保存到localStorage
    try {
      localStorage.setItem('jingjuArticles', JSON.stringify(updatedArticles));
    } catch (error) {
      console.error('Failed to save articles to localStorage', error);
    }
    
    console.log('Updated articles after deletion:', updatedArticles);
  };

  // 初始化时从localStorage加载数据
  useEffect(() => {
    try {
      const savedArticles = localStorage.getItem('jingjuArticles');
      if (savedArticles) {
        const parsedArticles = JSON.parse(savedArticles);
        // 确保数据符合Article类型
        const validArticles = parsedArticles.map((article: any) => ({
          ...article,
          status: article.status as 'published' | 'draft' | 'review'
        }));
        setArticles(validArticles);
      }
    } catch (error) {
      console.error('Failed to load articles from localStorage', error);
    }
  }, []);

  return (
    <ContentContext.Provider value={{ 
      articles, 
      knowledgeItems, 
      setArticles, 
      setKnowledgeItems,
      handleStatusChange,
      handleDelete
    }}>
      {children}
    </ContentContext.Provider>
  );
};

// 创建自定义Hook
export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}; 