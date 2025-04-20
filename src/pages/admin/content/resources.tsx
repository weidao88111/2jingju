import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/layout/AdminLayout';
import Card, { CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

// 模拟资源数据
const MOCK_RESOURCES = [
  { id: 6, title: '戏子多秋，戏梦天涯 - 视频', type: 'video', fileUrl: '/media/videos/戏子多秋，戏梦天涯.mp4', size: '3.4 MB', uploadDate: '2023-11-05', category: '纪录片' },
  { id: 7, title: '花旦和青衣的区别 - 视频教学', type: 'video', fileUrl: '/media/videos/花旦和青衣的区别 看看花旦如何表现.mp4', size: '3.8 MB', uploadDate: '2023-10-18', category: '教学资料' },
  { id: 8, title: '跟着老师学戏腔 - 视频教程', type: 'video', fileUrl: '/media/videos/跟着老师学戏腔 跟着老师学戏腔.mp4', size: '3.6 MB', uploadDate: '2023-10-15', category: '教学资料' },
  { id: 5, title: '《玉堂春》视频演出', type: 'video', fileUrl: '/media/videos/玉堂春.mp4', size: '16 MB', uploadDate: '2023-11-12', category: '经典剧目' },
  { id: 2, title: '戏子多秋，戏梦天涯', type: 'audio', fileUrl: '/media/audio/戏子多秋，戏梦天涯.mp3', size: '410 KB', uploadDate: '2023-11-10', category: '名段欣赏' },
  { id: 3, title: '花旦和青衣的区别', type: 'audio', fileUrl: '/media/audio/花旦和青衣的区别 看看花旦如何表现.mp3', size: '473 KB', uploadDate: '2023-10-25', category: '教学资料' },
  { id: 4, title: '跟着老师学戏腔', type: 'audio', fileUrl: '/media/audio/跟着老师学戏腔 跟着老师学戏腔.mp3', size: '474 KB', uploadDate: '2023-10-20', category: '教学资料' },
  { id: 1, title: '《玉堂春》演唱片段', type: 'audio', fileUrl: '/media/audio/玉堂春.mp3', size: '1.0 MB', uploadDate: '2023-11-15', category: '名段欣赏' },
  { id: 10, title: '《霸王别姬》现场视频', type: 'video', fileUrl: '/resources/video/bawang.mp4', size: '108 MB', uploadDate: '2023-09-22', category: '经典剧目' },
  { id: 9, title: '《贵妃醉酒》演唱片段', type: 'audio', fileUrl: '/resources/audio/guifei.mp3', size: '5.2 MB', uploadDate: '2023-09-15', category: '名段欣赏' },
  { id: 11, title: '梅兰芳大师生平照片集', type: 'image', fileUrl: '/resources/images/mei-album.zip', size: '24.6 MB', uploadDate: '2023-08-10', category: '名家图集' },
  { id: 12, title: '京剧脸谱设计图集', type: 'image', fileUrl: '/resources/images/masks.zip', size: '18.3 MB', uploadDate: '2023-11-05', category: '教学资料' },
  { id: 13, title: '《四郎探母》音频', type: 'audio', fileUrl: '/resources/audio/silang.mp3', size: '6.8 MB', uploadDate: '2023-08-28', category: '名段欣赏' },
  { id: 14, title: '京剧锣鼓经典节奏', type: 'audio', fileUrl: '/resources/audio/luogu.mp3', size: '4.1 MB', uploadDate: '2023-07-15', category: '教学资料' },
  { id: 15, title: '青衣表演技巧教学', type: 'video', fileUrl: '/resources/video/qingyi-teaching.mp4', size: '86.5 MB', uploadDate: '2023-08-30', category: '教学资料' }
];

// 资源类型图标
const TYPE_ICONS = {
  audio: '🎵',
  video: '🎬',
  image: '🖼️',
  document: '📄'
};

const ResourcesPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [resources, setResources] = useState(MOCK_RESOURCES);
  const [resourceType, setResourceType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newResource, setNewResource] = useState({ title: '', type: 'audio', file: null, category: '' });

  // 检查用户是否已经登录
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        router.push('/admin/login');
      } else {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);

  // 筛选资源
  const filteredResources = resources.filter(resource => {
    // 按类型筛选
    if (resourceType !== 'all' && resource.type !== resourceType) return false;
    
    // 按搜索词筛选
    if (searchTerm && !resource.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    return true;
  });

  // 删除资源
  const handleDelete = (id: number) => {
    if (window.confirm('确定要删除这个资源吗？此操作不可撤销。')) {
      setResources(prevResources => prevResources.filter(resource => resource.id !== id));
    }
  };

  // 添加资源（模拟上传）
  const handleUpload = () => {
    if (!newResource.title) return;
    
    // 生成新的ID (实际应用中由后端生成)
    const newId = Math.max(...resources.map(r => r.id)) + 1;
    
    // 模拟文件上传
    const mockFileSize = Math.floor(Math.random() * 100) + 1 + ' MB';
    const today = new Date().toISOString().split('T')[0];
    
    // 创建新资源对象
    const uploadedResource = {
      id: newId,
      title: newResource.title,
      type: newResource.type,
      fileUrl: `/resources/${newResource.type}/${newId}-${newResource.title.toLowerCase().replace(/\s+/g, '-')}.${newResource.type === 'audio' ? 'mp3' : newResource.type === 'video' ? 'mp4' : 'zip'}`,
      size: mockFileSize,
      uploadDate: today,
      category: newResource.category
    };
    
    // 添加到资源列表
    setResources([uploadedResource, ...resources]);
    
    // 重置表单
    setNewResource({ title: '', type: 'audio', file: null, category: '' });
    setShowUploadForm(false);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-gray-500 dark:text-gray-400">加载中...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Head>
        <title>资源管理 - 京剧艺术网</title>
        <meta name="description" content="管理京剧艺术网的音频、视频和图片资源" />
      </Head>

      {/* 页面标题 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">资源管理</h1>
        <div className="flex gap-2">
          <Link href="/admin/content">
            <Button variant="outline" size="sm">
              返回内容管理
            </Button>
          </Link>
          <Link href="/admin">
            <Button variant="outline" size="sm">
              返回控制台
            </Button>
          </Link>
        </div>
      </div>

      {/* 操作栏 */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-48">
                <select
                  value={resourceType}
                  onChange={(e) => setResourceType(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                >
                  <option value="all">所有类型</option>
                  <option value="audio">音频资源</option>
                  <option value="video">视频资源</option>
                  <option value="image">图片资源</option>
                  <option value="document">文档资源</option>
                </select>
              </div>
              <div className="w-full md:w-64 relative">
                <input
                  type="text"
                  placeholder="搜索资源..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <Button onClick={() => setShowUploadForm(true)}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              上传资源
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* 上传资源表单 */}
      {showUploadForm && (
        <Card className="mb-6">
          <CardBody>
            <h2 className="text-xl font-semibold mb-4">上传新资源</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="resourceTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  资源标题 <span className="text-red-500">*</span>
                </label>
                <input
                  id="resourceTitle"
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                  value={newResource.title}
                  onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="resourceType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  资源类型 <span className="text-red-500">*</span>
                </label>
                <select
                  id="resourceType"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                  value={newResource.type}
                  onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                  required
                >
                  <option value="audio">音频资源</option>
                  <option value="video">视频资源</option>
                  <option value="image">图片资源</option>
                  <option value="document">文档资源</option>
                </select>
              </div>
              <div>
                <label htmlFor="resourceCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  资源分类
                </label>
                <input
                  id="resourceCategory"
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                  value={newResource.category}
                  onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
                  placeholder="如：教学资料、名段欣赏等"
                />
              </div>
              <div>
                <label htmlFor="resourceFile" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  上传文件 <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 focus-within:outline-none">
                        <span>选择文件</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">或拖拽文件到此处</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      支持格式：MP3, MP4, JPG, PNG, PDF, ZIP
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowUploadForm(false)}>
                  取消
                </Button>
                <Button onClick={handleUpload}>
                  上传资源
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* 资源列表 */}
      <Card>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    资源名称
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    类型
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    分类
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    大小
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    上传日期
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {filteredResources.length > 0 ? (
                  filteredResources.map((resource) => (
                    <tr key={resource.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="text-xl mr-2">{TYPE_ICONS[resource.type as keyof typeof TYPE_ICONS]}</span>
                          <div className="font-medium text-gray-900 dark:text-white">{resource.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          {resource.type === 'audio' ? '音频' : 
                           resource.type === 'video' ? '视频' : 
                           resource.type === 'image' ? '图片' : '文档'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-500 dark:text-gray-400">{resource.category || '-'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-500 dark:text-gray-400">{resource.size}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-500 dark:text-gray-400">{resource.uploadDate}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <a 
                            href={resource.fileUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                          >
                            预览
                          </a>
                          <button 
                            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                            onClick={() => handleDelete(resource.id)}
                          >
                            删除
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                      没有找到匹配的资源
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </AdminLayout>
  );
};

export default ResourcesPage; 