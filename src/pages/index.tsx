import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/layout/Layout';
import Card, { CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import KnowledgeCard from '../components/knowledge/KnowledgeCard';

// Mock data
const featuredKnowledge = [
  {
    id: '1',
    title: '京剧的历史起源',
    description: '京剧形成于清朝乾隆年间，起源于安徽徽班进京，逐渐融合了汉调、昆曲等多种艺术形式...',
    imageUrl: '/images/history.jpg',
    category: '历史',
    readMoreUrl: '/knowledge/history',
  },
  {
    id: '2',
    title: '生旦净丑 - 京剧角色行当',
    description: '京剧角色可分为生、旦、净、丑四大行当，每个行当又有多种细分...',
    imageUrl: '/media/images/生旦净丑.png',
    category: '行当',
    readMoreUrl: '/knowledge/roles',
  },
  {
    id: '3',
    title: '梅兰芳与"梅派"艺术',
    description: '梅兰芳（1894-1961）是中国京剧表演艺术大师，创立了独具特色的"梅派"表演风格...',
    imageUrl: '/media/images/梅兰芳.png',
    category: '名家',
    readMoreUrl: '/knowledge/masters/meilanfang',
  },
];

const featuresData = [
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.25 5.75C19.25 5.19772 18.8023 4.75 18.25 4.75H14C12.8954 4.75 12 5.64543 12 6.75V19.25L12.8284 18.4216C13.5786 17.6714 14.596 17.25 15.6569 17.25H18.25C18.8023 17.25 19.25 16.8023 19.25 16.25V5.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M4.75 5.75C4.75 5.19772 5.19772 4.75 5.75 4.75H10C11.1046 4.75 12 5.64543 12 6.75V19.25L11.1716 18.4216C10.4214 17.6714 9.40401 17.25 8.34315 17.25H5.75C5.19772 17.25 4.75 16.8023 4.75 16.25V5.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    ),
    title: '知识库',
    description: '探索京剧丰富的历史文化、流派、角色行当以及经典剧目',
    link: '/knowledge',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.75 13.25L10.25 15.25L13.75 11.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M12 22C16.9706 22 21 17.9706 21 13C21 8.02944 16.9706 4 12 4C7.02944 4 3 8.02944 3 13C3 17.9706 7.02944 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M10.5 2.75L9.25 4.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M13.5 2.75L14.75 4.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M12 2V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    ),
    title: '试听资源',
    description: '欣赏经典唱段音频和表演视频，感受京剧艺术的独特魅力',
    link: '/resources',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M8 10.5H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M8 14H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    ),
    title: '问答社区',
    description: '加入交流讨论，分享学习心得，共同探讨京剧艺术',
    link: '/community',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.75 19.25L9 18.25L18.2929 8.95711C18.6834 8.56658 18.6834 7.93342 18.2929 7.54289L16.4571 5.70711C16.0666 5.31658 15.4334 5.31658 15.0429 5.70711L5.75 15L4.75 19.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M19.25 19.25H13.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    ),
    title: 'AI问答',
    description: '使用智能助手即时解答您关于京剧的各种问题',
    link: '/community/ai',
  },
];

const eventsData = [
  {
    title: '京剧艺术线上讲座',
    date: '2023年5月15日',
    location: '线上活动',
    link: '/events/1',
  },
  {
    title: '名家演出 - 《霸王别姬》',
    date: '2023年6月1日',
    location: '国家大剧院',
    link: '/events/2',
  },
];

// 最新媒体资源
const latestMediaResources = [
  {
    id: 'media-4',
    title: '戏子多秋，戏梦天涯',
    type: 'video',
    description: '这段视频记录了京剧艺术家的心路历程和对京剧艺术的理解，是难得的京剧文化纪录片段。',
    imageUrl: '/media/images/生旦净丑.png',
    link: '/resources?media=戏子多秋',
  },
  {
    id: 'media-2',
    title: '花旦和青衣的区别',
    type: 'video',
    description: '通过实际表演展示花旦和青衣的区别，对京剧角色行当有直观的理解。',
    imageUrl: '/media/images/生旦净丑.png',
    link: '/resources?media=花旦',
  },
  {
    id: 'media-3',
    title: '跟着老师学戏腔',
    type: 'audio',
    description: '京剧戏腔教学，循序渐进地教授京剧唱腔的基本技巧。',
    imageUrl: '/media/images/梅兰芳.png',
    link: '/resources?media=戏腔',
  },
];

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>京剧艺术网 - 传统京剧文化推广与学习平台</title>
        <meta name="description" content="京剧艺术网是一个致力于传播和推广中国传统京剧文化的平台，提供丰富的京剧知识、音视频资源和互动社区" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-800 to-red-900 text-white py-24 -mx-4 px-4 mb-20 rounded-b-3xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-15 mix-blend-overlay"></div>
        
        {/* 装饰元素 - 左侧 */}
        <div className="absolute left-0 top-0 h-full w-16 md:w-32 opacity-20 pointer-events-none">
          <Image 
            src="/images/ornament-left.svg" 
            alt="装饰" 
            width={100} 
            height={600} 
            className="h-full w-full object-contain object-left opacity-50"
          />
        </div>
        
        {/* 装饰元素 - 右侧 */}
        <div className="absolute right-0 top-0 h-full w-16 md:w-32 opacity-20 pointer-events-none">
          <Image 
            src="/images/ornament-right.svg" 
            alt="装饰" 
            width={100} 
            height={600} 
            className="h-full w-full object-contain object-right opacity-50"
          />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6">
            <div className="flex items-center justify-center mb-2">
              <div className="w-12 h-0.5 bg-red-300/60"></div>
              <div className="mx-4">
                <Image 
                  src="/images/opera-mask.svg" 
                  alt="京剧脸谱" 
                  width={48} 
                  height={48} 
                  className="opacity-90"
                />
              </div>
              <div className="w-12 h-0.5 bg-red-300/60"></div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fadeIn">
            探索中国传统<br className="md:hidden" />京剧艺术的魅力
          </h1>
          <p className="text-xl mb-10 text-red-100 max-w-2xl mx-auto">
            传承国粹文化，领略戏曲之美
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              href="/knowledge"
              className="px-8 rounded-full shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition-all"
            >
              开始探索
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              href="/knowledge" 
              className="px-8 rounded-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-700 transition-all"
            >
              了解更多
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-0.5 bg-red-200 dark:bg-red-800"></div>
            <h2 className="text-3xl md:text-4xl font-bold mx-6">探索我们的功能</h2>
            <div className="w-12 h-0.5 bg-red-200 dark:bg-red-800"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            多样化的功能帮助您全方位了解和学习京剧艺术
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <Card key={index} hoverable className="text-center h-full border-t-4 border-red-600 dark:border-red-500 group" onClick={() => router.push(feature.link)}>
              <CardBody>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{feature.description}</p>
                <Link href={feature.link} className="inline-flex items-center text-red-600 dark:text-red-400 font-medium group">
                  <span>了解更多</span>
                  <svg 
                    className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Knowledge Section */}
      <section className="mb-24">
        <div className="flex justify-between items-center mb-12">
          <div>
            <div className="flex items-center mb-3">
              <h2 className="text-3xl md:text-4xl font-bold">精选知识</h2>
              <div className="ml-4 w-12 h-0.5 bg-red-200 dark:bg-red-800"></div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              探索京剧的历史、角色行当、著名艺术家等知识内容
            </p>
          </div>
          <Link href="/knowledge" className="hidden md:inline-flex items-center text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 group">
            <span>查看全部</span>
            <svg 
              className="w-5 h-5 ml-1 transform transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
          {featuredKnowledge.map((item) => (
            <KnowledgeCard key={item.id} {...item} />
          ))}
        </div>
        <div className="md:hidden text-center">
          <Button variant="outline" href="/knowledge">
            查看更多知识
          </Button>
        </div>
      </section>

      {/* Events Section */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-0.5 bg-red-200 dark:bg-red-800"></div>
            <h2 className="text-3xl md:text-4xl font-bold mx-6">近期活动</h2>
            <div className="w-12 h-0.5 bg-red-200 dark:bg-red-800"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            参与线上线下京剧相关活动，近距离感受京剧魅力
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {eventsData.map((event, index) => (
            <Card key={index} hoverable className="group overflow-hidden">
              <CardBody className="flex flex-col md:flex-row gap-6">
                <div className="md:w-24 flex-shrink-0 bg-red-100 dark:bg-red-900/20 rounded-lg flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-red-600 dark:text-red-400 text-sm font-semibold">
                    {event.date.split('年')[1].split('月')[0]}月
                  </span>
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {event.date.split('月')[1].split('日')[0]}
                  </span>
                  <span className="text-red-600 dark:text-red-400 text-sm font-semibold">
                    {event.date.split('年')[0]}
                  </span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{event.title}</h3>
                  <div className="text-gray-600 dark:text-gray-400 space-y-1 mb-4">
                    <p className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </p>
                  </div>
                  <Link href={event.link} className="inline-flex items-center text-red-600 dark:text-red-400 font-medium group">
                    <span>查看详情</span>
                    <svg 
                      className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      {/* 最新资源 Section */}
      <section className="mb-24">
        <div className="flex justify-between items-center mb-12">
          <div>
            <div className="flex items-center mb-3">
              <h2 className="text-3xl md:text-4xl font-bold">最新资源</h2>
              <div className="ml-4 w-12 h-0.5 bg-red-200 dark:bg-red-800"></div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              探索我们最新添加的京剧音频和视频资源
            </p>
          </div>
          <Link href="/resources" className="hidden md:inline-flex items-center text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 group">
            <span>查看全部</span>
            <svg 
              className="w-5 h-5 ml-1 transform transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
          {latestMediaResources.map((resource) => (
            <Card key={resource.id} hoverable className="h-full overflow-hidden group" onClick={() => router.push(resource.link)}>
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={resource.imageUrl}
                  alt={resource.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/70"></div>
                <div className="absolute top-3 right-3">
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-red-100/90 text-red-800 dark:bg-red-900/90 dark:text-red-200 backdrop-blur-sm">
                    {resource.type === 'video' ? '视频' : '音频'}
                  </span>
                </div>
              </div>
              <CardBody>
                <h3 className="text-xl font-bold mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">{resource.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{resource.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>
        <div className="md:hidden text-center">
          <Button variant="outline" href="/resources">
            查看更多资源
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl transform -rotate-1 scale-105"></div>
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10 mix-blend-overlay rounded-2xl"></div>
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl p-10 md:p-16 text-center z-10 border border-red-100 dark:border-red-900/30">
          <div className="flex items-center justify-center mb-6">
            <div className="w-8 h-0.5 bg-red-200 dark:bg-red-800"></div>
            <div className="mx-4">
              <Image 
                src="/images/opera-mask.svg" 
                alt="京剧脸谱" 
                width={36} 
                height={36} 
                className="opacity-70"
              />
            </div>
            <div className="w-8 h-0.5 bg-red-200 dark:bg-red-800"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">加入我们的京剧爱好者社区</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            参与讨论，分享您的心得体会，与其他京剧爱好者一起交流学习
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              href="/user/register"
              className="px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              注册账号
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              href="/community"
              className="px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              浏览社区
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
