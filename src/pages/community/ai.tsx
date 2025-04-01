import React from 'react';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import AIChat from '../../components/community/AIChat';
import Card, { CardBody } from '../../components/ui/Card';

const AIQAPage = () => {
  return (
    <Layout>
      <Head>
        <title>AI京剧知识问答 - 京剧艺术网</title>
        <meta name="description" content="使用AI助手解答您关于京剧的各种问题，快速获取京剧知识" />
      </Head>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">AI京剧知识问答</h1>
          <p className="text-gray-600 dark:text-gray-300">
            通过智能助手，即时解答您关于京剧的各种问题。无论是关于京剧历史、角色行当、流派、剧目，还是著名艺术家的问题，都可以尝试询问。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardBody className="text-center">
              <div className="text-3xl mb-3">🎭</div>
              <h3 className="font-bold mb-2">京剧知识</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                了解京剧历史、流派、行当等基础知识
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center">
              <div className="text-3xl mb-3">👨‍🎤</div>
              <h3 className="font-bold mb-2">名家介绍</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                询问梅兰芳、程砚秋等京剧大师的生平和艺术特点
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-bold mb-2">剧目解析</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                获取经典剧目《霸王别姬》《贵妃醉酒》等内容简介
              </p>
            </CardBody>
          </Card>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-[600px] mb-8">
          <AIChat />
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-8">
          <h3 className="font-bold mb-2">使用提示</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>尽量使用明确、具体的问题获得更精准的回答</li>
            <li>您可以询问京剧历史、流派、角色行当、著名人物等相关知识</li>
            <li>AI会基于现有知识回答，如需更深入了解，请参考知识库专区</li>
            <li>如遇到无法回答或回答不准确的情况，请谅解并通过社区向专业人士咨询</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default AIQAPage;