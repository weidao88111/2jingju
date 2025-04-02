import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../../../components/layout/Layout';
import Card, { CardBody, CardFooter } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

// 模拟问题数据
const questionDetails = {
  id: 'q2',
  title: '如何区分京剧中的西皮和二黄两种板式？',
  content: `我最近开始学习欣赏京剧，但对于剧中的"西皮"和"二黄"两种主要板式感到困惑。它们在音调、节奏等方面有什么区别？什么情况下使用西皮，什么情况下使用二黄？初学者如何从听觉上辨别它们？

希望能有专业人士给予解答，谢谢！`,
  author: '京剧小白',
  authorAvatar: '/media/images/default-avatar.png',
  date: '2023-12-12',
  views: 287,
  category: '表演技巧',
  solved: true,
};

// 模拟回答数据
const answersList = [
  {
    id: 'a1',
    content: `西皮和二黄是京剧中最基本的两种板式，它们的区别主要体现在以下几个方面：

1. 音调不同：西皮多用林调式，音调较高，明快活泼；二黄多用中调式，音调较低，深沉委婉。

2. 伴奏乐器不同：西皮以京胡为主，配以大筒、月琴、三弦等；二黄则以二胡为主，亦配以大筒、月琴、三弦等。

3. 板式节奏不同：西皮节奏较快，活泼明快；二黄节奏较慢，深沉舒缓。

4. 使用场合不同：西皮一般用于表现欢快、明朗的情绪；二黄则常用于表现沉重、忧伤的情感。

初学者可以从音色上辨别：西皮高亢明亮，二黄低沉含蓄。听多了自然能分辨出来。`,
    author: '老生常谈',
    authorAvatar: '/media/images/default-avatar.png',
    date: '2023-12-12',
    isAccepted: true,
    likes: 42,
  },
  {
    id: 'a2',
    content: `补充一点，西皮和二黄在"引子"上也有不同：

西皮的引子叫"导板"，一般用"啊......"来引；
二黄的引子叫"二黄导板"，一般用"哎......"来引。

此外，从演员表演上也能观察到区别：唱西皮时，演员的身段动作往往更为活泼；唱二黄时，则相对舒缓。

建议初学者可以先从经典唱段入手，比如《贵妃醉酒》中的"海岛冰轮初转腾"是西皮，而《霸王别姬》中的"力拔山兮气盖世"是二黄。多听这些经典唱段，对比感受，很快就能辨别了。`,
    author: '旦角迷',
    authorAvatar: '/media/images/default-avatar.png',
    date: '2023-12-13',
    isAccepted: false,
    likes: 28,
  },
];

// 问题详情页面组件
const QuestionDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [answerContent, setAnswerContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllAnswers, setShowAllAnswers] = useState(true);

  // 提交回答
  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!answerContent.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // 这里是模拟提交，实际项目中应替换为真实API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 成功后清空输入并显示提交成功消息
      setAnswerContent('');
      alert('回答提交成功！');
    } catch (err) {
      console.error('提交回答出错:', err);
      alert('提交回答时出错，请稍后再试');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 点赞回答
  const handleLikeAnswer = (answerId: string) => {
    console.log(`给回答 ${answerId} 点赞`);
    // 实际项目中这里应该调用API增加点赞数
  };

  // 采纳回答
  const handleAcceptAnswer = (answerId: string) => {
    console.log(`采纳回答 ${answerId}`);
    // 实际项目中这里应该调用API设置采纳状态
  };

  return (
    <Layout>
      <Head>
        <title>{questionDetails.title} - 京剧艺术网</title>
        <meta name="description" content={`${questionDetails.title} - 京剧社区问题详情与回答`} />
      </Head>

      <div className="mb-6">
        <Link
          href="/community"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回社区
        </Link>
      </div>

      {/* 问题详情 */}
      <Card className="mb-8">
        <CardBody>
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              {questionDetails.category}
            </span>
            {questionDetails.solved && (
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                已解决
              </span>
            )}
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{questionDetails.title}</h1>
          
          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm mb-6">
            <div className="flex items-center gap-2">
              <span>提问者：{questionDetails.author}</span>
            </div>
            <span>提问时间：{questionDetails.date}</span>
            <span>浏览：{questionDetails.views}</span>
          </div>
          
          <div className="prose prose-red max-w-none dark:prose-invert mb-6">
            <p className="whitespace-pre-line">{questionDetails.content}</p>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                分享
              </button>
              <button className="inline-flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                收藏
              </button>
              <button className="inline-flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                举报
              </button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* 回答过滤和排序 */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{answersList.length} 个回答</h2>
        <div className="flex gap-4">
          <button
            className={`text-sm font-medium ${showAllAnswers ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`}
            onClick={() => setShowAllAnswers(true)}
          >
            全部回答
          </button>
          <button
            className={`text-sm font-medium ${!showAllAnswers ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`}
            onClick={() => setShowAllAnswers(false)}
          >
            只看采纳
          </button>
        </div>
      </div>

      {/* 回答列表 */}
      <div className="space-y-6 mb-8">
        {answersList
          .filter(answer => showAllAnswers || answer.isAccepted)
          .map((answer) => (
            <Card key={answer.id} className={`${answer.isAccepted ? 'border-2 border-green-500 dark:border-green-600' : ''}`}>
              <CardBody>
                {answer.isAccepted && (
                  <div className="mb-4 px-3 py-1.5 inline-block bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      已采纳回答
                    </div>
                  </div>
                )}
                
                <div className="prose prose-red max-w-none dark:prose-invert mb-6">
                  <p className="whitespace-pre-line">{answer.content}</p>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      回答者：{answer.author} · {answer.date}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      className="inline-flex items-center text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                      onClick={() => handleLikeAnswer(answer.id)}
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      <span>{answer.likes}</span>
                    </button>
                    
                    {!questionDetails.solved && (
                      <button 
                        className="inline-flex items-center text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
                        onClick={() => handleAcceptAnswer(answer.id)}
                      >
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        采纳
                      </button>
                    )}
                    
                    <button className="inline-flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      分享
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
      </div>

      {/* 提交回答表单 */}
      <Card className="mb-8">
        <CardBody>
          <h3 className="text-xl font-bold mb-4">发表你的回答</h3>
          <form onSubmit={handleSubmitAnswer}>
            <div className="mb-4">
              <textarea
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[200px] dark:text-white"
                placeholder="写下你的回答..."
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isSubmitting || !answerContent.trim()}
              >
                {isSubmitting ? '提交中...' : '提交回答'}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {/* 相关问题 */}
      <Card>
        <CardBody>
          <h3 className="text-xl font-bold mb-4">相关问题</h3>
          <ul className="space-y-3">
            <li>
              <Link 
                href="/community/question/q1" 
                className="block text-gray-800 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400"
              >
                初学者如何选择适合自己的京剧剧目进行学习？
              </Link>
            </li>
            <li>
              <Link 
                href="/community/question/q3" 
                className="block text-gray-800 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400"
              >
                梅兰芳和程砚秋的唱腔有什么明显区别？
              </Link>
            </li>
            <li>
              <Link 
                href="/community/question/q5" 
                className="block text-gray-800 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400"
              >
                练习京剧身段基本功的正确方法是什么？
              </Link>
            </li>
          </ul>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default QuestionDetailPage; 