import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import ResourcePlayer from '../../components/resources/ResourcePlayer';
import Card, { CardBody, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// 模拟数据
const audioResources = [
  {
    id: 'audio-1',
    title: '《贵妃醉酒》- 梅兰芳演唱',
    description: '《贵妃醉酒》是京剧传统剧目，讲述唐明皇与杨贵妃的爱情故事。这段唱段展现了杨贵妃因皇帝失约而借酒消愁的情景，是梅派艺术的代表作。',
    type: 'audio' as const,
    src: '/resources/audio/guifei.mp3',
    author: '梅兰芳',
    date: '1930年录制',
    playable: true,
  },
  {
    id: 'audio-2',
    title: '《四郎探母》- 言派经典唱段',
    description: '《四郎探母》是京剧传统剧目中的经典，讲述杨四郎与铁镜公主的爱情故事以及他回到大宋与母亲相见的情节。这段唱腔体现了言派艺术风格的特点。',
    type: 'audio' as const,
    src: '/resources/audio/silang.mp3',
    author: '言菊朋',
    date: '1940年录制',
    playable: true,
  },
  {
    id: 'audio-3',
    title: '《玉堂春》经典唱段',
    description: '《玉堂春》是京剧传统剧目之一，这段经典唱段展示了京剧音乐的精髓和独特韵味。',
    type: 'audio' as const,
    src: '/media/audio/玉堂春.mp3',
    author: '京剧名家',
    date: '2000年代',
    playable: true,
  },
  {
    id: 'audio-4',
    title: '戏子多秋，戏梦天涯',
    description: '这段音频展现了京剧艺术家对艺术的理解与情感表达，字字珠玑，韵味悠长。',
    type: 'audio' as const,
    src: '/media/audio/戏子多秋，戏梦天涯.mp3',
    author: '现代京剧艺术家',
    date: '2010年代',
    playable: true,
  },
  {
    id: 'audio-5',
    title: '花旦和青衣的区别',
    description: '这段音频详细讲解了京剧中花旦和青衣两个行当的区别特点，对初学者了解京剧角色体系非常有帮助。',
    type: 'audio' as const,
    src: '/media/audio/花旦和青衣的区别 看看花旦如何表现.mp3',
    author: '京剧理论专家',
    date: '现代录制',
    playable: true,
  },
  {
    id: 'audio-6',
    title: '跟着老师学戏腔',
    description: '京剧戏腔教学音频，循序渐进地教授京剧唱腔的基本技巧，适合京剧爱好者学习。',
    type: 'audio' as const,
    src: '/media/audio/跟着老师学戏腔 跟着老师学戏腔.mp3',
    author: '京剧教育工作者',
    date: '现代录制',
    playable: true,
  },
];

const videoResources = [
  {
    id: 'video-1',
    title: '《霸王别姬》- 梅兰芳、尚小云合演',
    description: '《霸王别姬》讲述了西楚霸王项羽与虞姬的凄美爱情故事。此视频是梅兰芳与尚小云的珍贵历史影像，展现了两位大师的精湛艺术。',
    type: 'video' as const,
    src: '/resources/video/bawang.mp4',
    author: '梅兰芳、尚小云',
    date: '1935年',
    playable: true,
  },
  {
    id: 'video-2',
    title: '《三岔口》- 现代京剧表演',
    description: '《三岔口》是一出以武戏为主的传统京剧，展现了扮演者精湛的武功身手和丰富的舞台表现力。此视频是现代京剧表演艺术家的精彩演绎。',
    type: 'video' as const,
    src: '/resources/video/sancha.mp4',
    author: '李维康、杨赤',
    date: '2010年',
    playable: true,
  },
  {
    id: 'video-3',
    title: '《玉堂春》视频表演',
    description: '《玉堂春》是京剧传统剧目之一，讲述了苏三与王金龙的故事。这段视频展示了完整的表演过程和舞台艺术。',
    type: 'video' as const,
    src: '/media/videos/玉堂春.mp4',
    author: '现代京剧表演艺术家',
    date: '现代表演',
    playable: true,
  },
  {
    id: 'video-4',
    title: '戏子多秋，戏梦天涯',
    description: '这段视频记录了京剧艺术家的心路历程和对京剧艺术的理解，是难得的京剧文化纪录片段。',
    type: 'video' as const,
    src: '/media/videos/戏子多秋，戏梦天涯.mp4',
    author: '京剧艺术记录',
    date: '现代作品',
    playable: true,
  },
  {
    id: 'video-5',
    title: '花旦和青衣的区别 - 视频教学',
    description: '通过实际表演展示花旦和青衣的区别，对京剧角色行当有直观的理解和认识。',
    type: 'video' as const,
    src: '/media/videos/花旦和青衣的区别 看看花旦如何表现.mp4',
    author: '京剧表演艺术家',
    date: '教学视频',
    playable: true,
  },
  {
    id: 'video-6',
    title: '跟着老师学戏腔 - 视频教程',
    description: '专业京剧老师教授戏腔的视频教程，展示了发声、咬字、行腔等技巧的训练方法。',
    type: 'video' as const,
    src: '/media/videos/跟着老师学戏腔 跟着老师学戏腔.mp4',
    author: '京剧教育工作者',
    date: '教学视频',
    playable: true,
  },
];

const ResourcesPage = () => {
  const [activeTab, setActiveTab] = useState<'audio' | 'video'>('audio');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const router = useRouter();
  
  // 根据URL参数自动选择和过滤资源
  useEffect(() => {
    if (router.query.media) {
      const mediaParam = router.query.media as string;
      setSearchTerm(mediaParam);
      setSelectedResource(mediaParam);
      
      // 尝试在视频资源中匹配
      const matchVideo = videoResources.some(
        item => item.title.toLowerCase().includes(mediaParam.toLowerCase())
      );
      
      // 尝试在音频资源中匹配
      const matchAudio = audioResources.some(
        item => item.title.toLowerCase().includes(mediaParam.toLowerCase())
      );
      
      if (matchVideo) {
        setActiveTab('video');
      } else if (matchAudio) {
        setActiveTab('audio');
      }
    }
  }, [router.query.media]);

  // 获取资源并排序，将可播放的视频和音频排在最前面
  const getFilteredResources = () => {
    // 获取资源列表（基于当前标签）
    let resources = activeTab === 'audio' ? audioResources : videoResources;
    
    // 根据搜索词筛选
    const filtered = resources.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // 排序逻辑: 可播放的排在前面
    return filtered.sort((a, b) => {
      // 如果播放状态不同，可播放的优先
      if (a.playable !== b.playable) {
        return a.playable ? -1 : 1;
      }
      
      // 都可播放时，优先展示视频，其次是音频
      if (a.type !== b.type) {
        return a.type === 'video' ? -1 : 1;
      }
      
      // 如果类型相同，保持原有顺序
      return 0;
    });
  };

  // 获取排序后的资源
  const filteredResources = getFilteredResources();

  // 自动滚动到已选中的资源
  useEffect(() => {
    if (selectedResource && filteredResources.length > 0) {
      // 使用setTimeout确保DOM已更新
      setTimeout(() => {
        const resourceElement = document.getElementById(`resource-${filteredResources[0].id}`);
        if (resourceElement) {
          resourceElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    }
  }, [selectedResource, filteredResources]);

  return (
    <Layout>
      <Head>
        <title>试听资源 - 京剧艺术网</title>
        <meta name="description" content="欣赏经典京剧唱段和表演视频，感受传统京剧艺术的魅力" />
      </Head>

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">京剧试听资源</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          欣赏京剧经典唱段和精彩表演，领略传统艺术的独特魅力。我们精选了多位京剧大师的代表作品，让您足不出户也能感受京剧的精髓。
        </p>
      </div>

      {/* 搜索和筛选 */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-grow">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              搜索资源
            </label>
            <input
              id="search"
              type="text"
              placeholder="输入关键词搜索..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-auto">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 flex">
              <button
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'audio'
                    ? 'bg-white dark:bg-gray-700 shadow text-red-600 dark:text-red-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('audio')}
              >
                音频资源
              </button>
              <button
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'video'
                    ? 'bg-white dark:bg-gray-700 shadow text-red-600 dark:text-red-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('video')}
              >
                视频资源
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 资源列表 */}
      <div className="space-y-8 mb-10">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <div key={resource.id} id={`resource-${resource.id}`}>
              <ResourcePlayer {...resource} />
            </div>
          ))
        ) : (
          <Card className="text-center py-12">
            <CardBody>
              <p className="text-gray-500 dark:text-gray-400 mb-4">没有找到符合条件的资源</p>
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setSelectedResource(null);
              }}>
                重置搜索
              </Button>
            </CardBody>
          </Card>
        )}
      </div>

      {/* 资源提交区 */}
      <Card className="mt-12 bg-gray-50 dark:bg-gray-800/50 border-0">
        <CardHeader>
          <h2 className="text-xl font-bold">拥有珍贵京剧资源？</h2>
        </CardHeader>
        <CardBody>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            如果您拥有珍贵的京剧音频、视频或相关资料，欢迎与我们分享。您提供的资源将帮助更多人了解和欣赏京剧艺术。
          </p>
          <div className="flex justify-start">
            <Button href="/contact">
              联系我们提交资源
            </Button>
          </div>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default ResourcesPage; 