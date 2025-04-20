import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../../../components/layout/Layout';
import Card, { CardBody } from '../../../../components/ui/Card';
import Button from '../../../../components/ui/Button';

const MeiLanfangPage = () => {
  return (
    <Layout>
      <Head>
        <title>梅兰芳与"梅派"艺术 - 京剧艺术网</title>
        <meta name="description" content="了解京剧大师梅兰芳的艺术成就与梅派艺术特色，探索传统京剧艺术的巅峰代表。" />
      </Head>

      <div className="mb-6">
        <Link 
          href="/knowledge" 
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回知识库
        </Link>
      </div>

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">梅兰芳与"梅派"艺术</h1>
        <div className="text-gray-600 dark:text-gray-300 mb-2">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 mr-2">
            名家
          </span>
          <span>发布时间: 2023年5月8日</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="prose prose-lg dark:prose-invert prose-red max-w-none">
            <div className="relative w-full h-72 md:h-96 mb-8 overflow-hidden rounded-xl">
              <Image 
                src="/media/images/meipai.png" 
                alt="梅兰芳剧照" 
                fill
                className="object-cover"
              />
            </div>
            
            <h2>梅兰芳的生平</h2>
            <p>
              梅兰芳（1894-1961），原名梅澜，字畹华，号兰芳，出生于北京，祖籍江苏泰州，是中国京剧表演艺术大师，京剧旦角表演的集大成者。梅兰芳出身于京剧世家，其祖父梅巧玲、伯父梅雨田均为著名京剧演员。
            </p>
            <p>
              梅兰芳8岁开始学艺，10岁登台，早期受教于著名老旦演员王瑶卿和青衣演员陈德霖。通过勤奋学习和不断探索，梅兰芳逐渐形成了自己独特的表演风格，被誉为"四大名旦"之首（梅兰芳、荀慧生、程砚秋、尚小云）。
            </p>
            
            <h2>"梅派"艺术的形成与特点</h2>
            <p>
              "梅派"是以梅兰芳的艺术风格为基础形成的一个重要京剧表演流派，主要在青衣和刀马旦等旦角行当。梅派艺术具有以下鲜明特点：
            </p>
            <ul>
              <li><strong>唱腔优美流畅</strong>：梅派唱腔清亮圆润，抑扬顿挫，娓娓动听，既有哀婉缠绵之处，又有高亢激昂之时。</li>
              <li><strong>身段优美精准</strong>：梅派表演讲究"形神兼备"，动作优美流畅而不失准确，每个细节都经过精心设计。</li>
              <li><strong>扮相清新典雅</strong>：梅派注重角色外在形象的设计，在妆容、服饰上追求"雅"而不俗。</li>
              <li><strong>表演写意生动</strong>：梅派表演既不完全写实，也不过分程式化，而是追求在程式中注入生活情感。</li>
            </ul>
            <p>
              梅兰芳终生致力于京剧艺术的革新与发展，创造了许多新的表演程式和艺术手法。他将舞蹈、绘画等艺术元素融入京剧表演，丰富了传统京剧的表现手段。
            </p>
            
            <h2>代表剧目与艺术成就</h2>
            <p>
              梅兰芳一生表演了数百个剧目，其中许多成为梅派艺术的代表作：
            </p>
            <ul>
              <li><strong>《贵妃醉酒》</strong>：塑造了杨贵妃醉酒形象，通过细腻的表演展现了从微醺到沉醉的渐变过程。</li>
              <li><strong>《霸王别姬》</strong>：饰演虞姬，与著名老生余叔岩（饰项羽）合作，成为经典。</li>
              <li><strong>《宇宙锋》</strong>：饰演蕊珠公主，展现了刀马旦的飒爽英姿。</li>
              <li><strong>《洛神》</strong>：改编自曹植《洛神赋》，创造了虚幻缥缈的艺术意境。</li>
              <li><strong>《天女散花》</strong>：融入舞蹈元素，创造了空灵飘逸的舞台形象。</li>
              <li><strong>《抗金兵》《宝莲灯》《太真外传》</strong>等：均为梅派代表作品。</li>
            </ul>
            <p>
              梅兰芳不仅是优秀的表演艺术家，还是京剧艺术的理论家和改革家。他创作改编了多部剧目，并著有《舞台生活四十年》等著作，系统总结了自己的艺术经验。
            </p>
            
            <h2>梅兰芳的国际影响</h2>
            <p>
              作为中国传统艺术的杰出代表，梅兰芳曾多次出访国外演出，向世界展示中国戏曲艺术的魅力：
            </p>
            <ul>
              <li>1919年和1924年两次赴日本演出，引起轰动。</li>
              <li>1930年率团访问美国，在纽约、芝加哥、旧金山等地演出，获得极高评价。</li>
              <li>1935年应邀访问苏联，与斯坦尼斯拉夫斯基、梅耶荷德等戏剧大师交流。</li>
            </ul>
            <p>
              梅兰芳的表演艺术吸引了众多国际戏剧大师的关注，如布莱希特受到梅兰芳表演的启发，提出了"间离效果"的戏剧理论。梅兰芳成为中国京剧走向世界的重要使者，为中华文化的国际传播做出了重要贡献。
            </p>
            
            <h2>梅派艺术的传承与发展</h2>
            <p>
              梅兰芳一生培养了众多杰出弟子，如李玉茹、姜妙香、李世芳、梅葆玖（梅兰芳之子）等，他们继承和发展了梅派艺术，使梅派成为京剧旦角表演中最重要的流派之一。
            </p>
            <p>
              在当代，梅派艺术仍然在不断发展，新一代梅派传人在继承传统的同时，也在探索创新，使这一艺术流派保持生命力。梅派艺术已成为中国非物质文化遗产的重要组成部分，得到国家的保护和传承。
            </p>
            
            <h2>梅兰芳的艺术精神与时代意义</h2>
            <p>
              梅兰芳的艺术精神可以概括为"继承、革新、求精、奉献"。他一生致力于传承和发展中国传统戏曲艺术，不懈追求艺术的完美，为观众奉献了无数经典表演。
            </p>
            <p>
              在现代社会，梅兰芳精神和梅派艺术依然具有重要的现实意义。它不仅是中华优秀传统文化的重要组成部分，也是文化自信的重要源泉，对于弘扬民族精神、推动文化传承创新具有重要价值。
            </p>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardBody>
              <h3 className="text-xl font-bold mb-4">相关知识推荐</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-4 border-b dark:border-gray-700">
                  <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                    <Image 
                      src="/media/images/history.png"
                      alt="京剧历史"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">京剧的历史起源</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      了解京剧的起源与发展历程
                    </p>
                    <Link 
                      href="/knowledge/history"
                      className="inline-flex items-center text-sm text-red-600 dark:text-red-400 mt-1"
                    >
                      查看详情
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 pb-4 border-b dark:border-gray-700">
                  <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                    <Image 
                      src="/media/images/生旦净丑.png"
                      alt="生旦净丑"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">生旦净丑 - 京剧角色行当</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      了解京剧四大行当的特点与表演技巧
                    </p>
                    <Link 
                      href="/knowledge/roles"
                      className="inline-flex items-center text-sm text-red-600 dark:text-red-400 mt-1"
                    >
                      查看详情
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
                    <Image 
                      src="/media/images/chengpai.png"
                      alt="程派艺术"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">程派艺术特色</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      探索京剧大师程砚秋的艺术成就与程派特色
                    </p>
                    <Link 
                      href="/knowledge/schools/chengpai"
                      className="inline-flex items-center text-sm text-red-600 dark:text-red-400 mt-1"
                    >
                      查看详情
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t dark:border-gray-700">
                <Button href="/knowledge" variant="outline" className="w-full">
                  返回知识库
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default MeiLanfangPage; 