import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout/Layout';
import Card, { CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

// 模拟外观设置数据
const MOCK_APPEARANCE = {
  theme: 'light',
  primaryColor: '#C53030', // red-700
  logoUrl: '/images/logo.png',
  faviconUrl: '/favicon.ico',
  heroImage: '/images/hero-background.jpg',
  footerLogo: '/images/footer-logo.png',
  customCSS: '',
  fonts: {
    headings: 'Noto Serif SC',
    body: 'Noto Sans SC'
  }
};

// 定义类型
type AppearanceSettings = typeof MOCK_APPEARANCE;
type FontSettings = typeof MOCK_APPEARANCE.fonts;

// 主题颜色选项
const COLOR_OPTIONS = [
  { label: '红色', value: '#C53030', class: 'bg-red-700' },
  { label: '金色', value: '#D97706', class: 'bg-amber-600' },
  { label: '绿色', value: '#059669', class: 'bg-emerald-600' },
  { label: '蓝色', value: '#2563EB', class: 'bg-blue-600' },
  { label: '紫色', value: '#7C3AED', class: 'bg-violet-600' },
];

// 可用字体选项
const FONT_OPTIONS = [
  { label: '思源宋体', value: 'Noto Serif SC' },
  { label: '思源黑体', value: 'Noto Sans SC' },
  { label: '方正书宋', value: 'FZShuSong' },
  { label: '方正黑体', value: 'FZHei' },
  { label: '华文楷体', value: 'STKaiti' },
];

const AppearancePage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [appearance, setAppearance] = useState(MOCK_APPEARANCE);
  const [saveSuccess, setSaveSuccess] = useState(false);

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

  // 处理设置保存
  const handleSave = () => {
    // 这里在实际应用中会向API发送保存请求
    console.log('保存外观设置:', appearance);
    setSaveSuccess(true);
    
    // 3秒后清除成功消息
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  // 处理设置表单更改
  const handleChange = (field: string, value: any) => {
    setAppearance(prevSettings => ({
      ...prevSettings,
      [field]: value
    }));
  };

  // 处理嵌套设置字段更改
  const handleNestedChange = (parent: 'fonts', field: keyof FontSettings, value: any) => {
    setAppearance(prevSettings => ({
      ...prevSettings,
      [parent]: {
        ...prevSettings[parent],
        [field]: value
      }
    }));
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-gray-500 dark:text-gray-400">加载中...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>外观设置 - 京剧艺术网</title>
        <meta name="description" content="管理京剧艺术网的外观和主题" />
      </Head>

      {/* 页面标题 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">外观设置</h1>
        <div className="flex gap-2">
          <Link href="/admin/settings">
            <Button variant="outline" size="sm">
              返回设置
            </Button>
          </Link>
          <Link href="/admin">
            <Button variant="outline" size="sm">
              返回控制台
            </Button>
          </Link>
        </div>
      </div>

      {/* 设置表单 */}
      <Card>
        <CardBody>
          {saveSuccess && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-lg">
              外观设置已成功保存
            </div>
          )}

          <div className="space-y-8">
            {/* 主题设置 */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">主题设置</h2>
              
              <div>
                <label htmlFor="theme" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  网站主题
                </label>
                <select
                  id="theme"
                  value={appearance.theme}
                  onChange={(e) => handleChange('theme', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                >
                  <option value="light">浅色</option>
                  <option value="dark">深色</option>
                  <option value="auto">跟随系统</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  主色调
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {COLOR_OPTIONS.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => handleChange('primaryColor', color.value)}
                      className={`w-full h-10 rounded-lg ${color.class} ${
                        appearance.primaryColor === color.value ? 'ring-2 ring-offset-2 ring-gray-500 dark:ring-gray-300' : ''
                      }`}
                      aria-label={`选择${color.label}主题`}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 字体设置 */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">字体设置</h2>
              
              <div>
                <label htmlFor="headingFont" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  标题字体
                </label>
                <select
                  id="headingFont"
                  value={appearance.fonts.headings}
                  onChange={(e) => handleNestedChange('fonts', 'headings', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                >
                  {FONT_OPTIONS.map((font) => (
                    <option key={font.value} value={font.value}>{font.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="bodyFont" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  正文字体
                </label>
                <select
                  id="bodyFont"
                  value={appearance.fonts.body}
                  onChange={(e) => handleNestedChange('fonts', 'body', e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                >
                  {FONT_OPTIONS.map((font) => (
                    <option key={font.value} value={font.value}>{font.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 图片设置 */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">图片设置</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    网站Logo
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      id="logoUrl"
                      type="text"
                      value={appearance.logoUrl}
                      onChange={(e) => handleChange('logoUrl', e.target.value)}
                      className="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                    />
                    <Button variant="outline" size="sm">
                      选择
                    </Button>
                  </div>
                  <div className="mt-2 p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">Logo预览</div>
                    <div className="flex justify-center p-2">
                      <img src={appearance.logoUrl} alt="Logo预览" className="h-12 object-contain" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="faviconUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    网站图标
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      id="faviconUrl"
                      type="text"
                      value={appearance.faviconUrl}
                      onChange={(e) => handleChange('faviconUrl', e.target.value)}
                      className="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                    />
                    <Button variant="outline" size="sm">
                      选择
                    </Button>
                  </div>
                  <div className="mt-2 p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">图标预览</div>
                    <div className="flex justify-center p-2">
                      <img src={appearance.faviconUrl} alt="图标预览" className="h-8 w-8 object-contain" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="heroImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  首页横幅图片
                </label>
                <div className="flex items-center gap-4">
                  <input
                    id="heroImage"
                    type="text"
                    value={appearance.heroImage}
                    onChange={(e) => handleChange('heroImage', e.target.value)}
                    className="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                  />
                  <Button variant="outline" size="sm">
                    选择
                  </Button>
                </div>
                <div className="mt-2 p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="text-center text-sm text-gray-500 dark:text-gray-400">横幅预览</div>
                  <div className="flex justify-center p-2">
                    <img src={appearance.heroImage} alt="横幅预览" className="w-full h-32 object-cover rounded-lg" />
                  </div>
                </div>
              </div>
            </div>

            {/* 自定义CSS */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">高级设置</h2>
              
              <div>
                <label htmlFor="customCSS" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  自定义CSS
                </label>
                <textarea
                  id="customCSS"
                  rows={6}
                  value={appearance.customCSS}
                  onChange={(e) => handleChange('customCSS', e.target.value)}
                  placeholder="/* 在这里添加自定义CSS样式 */"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white font-mono text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleSave}>
                保存设置
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default AppearancePage; 