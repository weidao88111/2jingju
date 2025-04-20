import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/layout/AdminLayout';
import Card, { CardBody, CardHeader } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import AIChat from '../../../components/community/AIChat';

// Define types for our settings
type PasswordPolicy = {
  minLength: number;
  requireUppercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
}

type Settings = {
  general: {
    siteName: string;
    siteDescription: string;
    contactEmail: string;
    supportPhone: string;
  };
  security: {
    passwordPolicy: PasswordPolicy;
    loginAttempts: number;
    sessionTimeout: number;
    twoFactorAuth: boolean;
  };
  logs: {
    retentionDays: number;
    logLevel: string;
    includeUserActivity: boolean;
    includeSystemEvents: boolean;
  };
  ai?: {
    apiEndpoint: string;
    streamingEnabled: boolean;
    maxTokens: number;
  };
}

// 模拟系统设置数据
const MOCK_SETTINGS: Settings = {
  general: {
    siteName: '京剧艺术网',
    siteDescription: '专注于京剧艺术传承与推广的在线平台',
    contactEmail: 'admin@jingju-art.com',
    supportPhone: '010-12345678',
  },
  security: {
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSpecialChars: true
    },
    loginAttempts: 5,
    sessionTimeout: 30, // minutes
    twoFactorAuth: false
  },
  logs: {
    retentionDays: 30,
    logLevel: 'info',
    includeUserActivity: true,
    includeSystemEvents: true
  },
  ai: {
    apiEndpoint: 'https://api.jingju.weidaoo.me',
    streamingEnabled: true,
    maxTokens: 524
  }
};

const SettingsPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<Settings>(MOCK_SETTINGS);
  const [activeTab, setActiveTab] = useState('general');
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
    console.log('保存设置:', settings);
    setSaveSuccess(true);
    
    // 3秒后清除成功消息
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  // 处理设置表单更改
  const handleChange = (section: keyof Settings, field: string, value: any) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [section]: {
        ...prevSettings[section],
        [field]: value
      }
    }));
  };

  // 处理嵌套对象的表单更改
  const handleNestedChange = (
    section: keyof Settings, 
    nestedField: string, 
    field: string, 
    value: any
  ) => {
    setSettings(prevSettings => {
      if (section === 'security' && nestedField === 'passwordPolicy') {
        return {
          ...prevSettings,
          security: {
            ...prevSettings.security,
            passwordPolicy: {
              ...prevSettings.security.passwordPolicy,
              [field]: value
            }
          }
        };
      }
      // Add other nested objects as needed
      return prevSettings;
    });
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
        <title>系统设置 - 京剧艺术网</title>
        <meta name="description" content="管理京剧艺术网的系统设置和配置" />
      </Head>

      {/* 页面标题 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">系统设置</h1>
        <Link href="/admin">
          <Button variant="outline" size="sm">
            返回控制台
          </Button>
        </Link>
      </div>

      {/* 设置导航标签 */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
        <button
          className={`py-3 px-4 font-medium text-sm border-b-2 ${
            activeTab === 'general'
              ? 'border-red-600 text-red-600 dark:border-red-400 dark:text-red-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('general')}
        >
          通用设置
        </button>
        <button
          className={`py-3 px-4 font-medium text-sm border-b-2 ${
            activeTab === 'security'
              ? 'border-red-600 text-red-600 dark:border-red-400 dark:text-red-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('security')}
        >
          安全设置
        </button>
        <button
          className={`py-3 px-4 font-medium text-sm border-b-2 ${
            activeTab === 'logs'
              ? 'border-red-600 text-red-600 dark:border-red-400 dark:text-red-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('logs')}
        >
          系统日志
        </button>
        <button
          className={`py-3 px-4 font-medium text-sm border-b-2 ${
            activeTab === 'ai'
              ? 'border-red-600 text-red-600 dark:border-red-400 dark:text-red-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('ai')}
        >
          AI 助手
        </button>
      </div>

      {/* 设置表单 */}
      <Card>
        <CardBody>
          {saveSuccess && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded-lg">
              设置已成功保存
            </div>
          )}

          {/* 通用设置 */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">通用设置</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    网站名称
                  </label>
                  <input
                    id="siteName"
                    type="text"
                    value={settings.general.siteName}
                    onChange={(e) => handleChange('general', 'siteName', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    网站描述
                  </label>
                  <textarea
                    id="siteDescription"
                    rows={3}
                    value={settings.general.siteDescription}
                    onChange={(e) => handleChange('general', 'siteDescription', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    联系邮箱
                  </label>
                  <input
                    id="contactEmail"
                    type="email"
                    value={settings.general.contactEmail}
                    onChange={(e) => handleChange('general', 'contactEmail', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="supportPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    客服电话
                  </label>
                  <input
                    id="supportPhone"
                    type="text"
                    value={settings.general.supportPhone}
                    onChange={(e) => handleChange('general', 'supportPhone', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 安全设置 */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">安全设置</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-3">密码策略</h3>
                  <div className="space-y-3 ml-2">
                    <div>
                      <label htmlFor="minLength" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        最小密码长度
                      </label>
                      <input
                        id="minLength"
                        type="number"
                        min="6"
                        max="32"
                        value={settings.security.passwordPolicy.minLength}
                        onChange={(e) => handleNestedChange('security', 'passwordPolicy', 'minLength', parseInt(e.target.value))}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="requireUppercase"
                        type="checkbox"
                        checked={settings.security.passwordPolicy.requireUppercase}
                        onChange={(e) => handleNestedChange('security', 'passwordPolicy', 'requireUppercase', e.target.checked)}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <label htmlFor="requireUppercase" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        需要包含大写字母
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="requireNumbers"
                        type="checkbox"
                        checked={settings.security.passwordPolicy.requireNumbers}
                        onChange={(e) => handleNestedChange('security', 'passwordPolicy', 'requireNumbers', e.target.checked)}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <label htmlFor="requireNumbers" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        需要包含数字
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="requireSpecialChars"
                        type="checkbox"
                        checked={settings.security.passwordPolicy.requireSpecialChars}
                        onChange={(e) => handleNestedChange('security', 'passwordPolicy', 'requireSpecialChars', e.target.checked)}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <label htmlFor="requireSpecialChars" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        需要包含特殊字符
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="loginAttempts" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    最大登录尝试次数
                  </label>
                  <input
                    id="loginAttempts"
                    type="number"
                    min="1"
                    max="10"
                    value={settings.security.loginAttempts}
                    onChange={(e) => handleChange('security', 'loginAttempts', parseInt(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">超过此次数将锁定账户</p>
                </div>
                
                <div>
                  <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    会话超时时间（分钟）
                  </label>
                  <input
                    id="sessionTimeout"
                    type="number"
                    min="5"
                    max="240"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => handleChange('security', 'sessionTimeout', parseInt(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    id="twoFactorAuth"
                    type="checkbox"
                    checked={settings.security.twoFactorAuth}
                    onChange={(e) => handleChange('security', 'twoFactorAuth', e.target.checked)}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="twoFactorAuth" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    启用两步验证
                  </label>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg dark:bg-yellow-900/20 dark:border-yellow-800">
                  <h4 className="text-sm font-semibold text-yellow-800 dark:text-yellow-400">安全提示</h4>
                  <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-500">
                    定期更改管理员密码并确保使用强密码可以有效提高系统安全性
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 系统日志设置 */}
          {activeTab === 'logs' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">系统日志</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="retentionDays" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    日志保留天数
                  </label>
                  <input
                    id="retentionDays"
                    type="number"
                    min="7"
                    max="365"
                    value={settings.logs.retentionDays}
                    onChange={(e) => handleChange('logs', 'retentionDays', parseInt(e.target.value))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="logLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    日志记录级别
                  </label>
                  <select
                    id="logLevel"
                    value={settings.logs.logLevel}
                    onChange={(e) => handleChange('logs', 'logLevel', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                  >
                    <option value="error">仅错误</option>
                    <option value="warn">警告及错误</option>
                    <option value="info">信息级别</option>
                    <option value="debug">调试级别</option>
                    <option value="verbose">详细级别</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="includeUserActivity"
                    type="checkbox"
                    checked={settings.logs.includeUserActivity}
                    onChange={(e) => handleChange('logs', 'includeUserActivity', e.target.checked)}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="includeUserActivity" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    记录用户活动
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="includeSystemEvents"
                    type="checkbox"
                    checked={settings.logs.includeSystemEvents}
                    onChange={(e) => handleChange('logs', 'includeSystemEvents', e.target.checked)}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="includeSystemEvents" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    记录系统事件
                  </label>
                </div>
                
                {/* 日志查看器 */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">近期系统日志</h3>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg h-64 overflow-y-auto font-mono text-sm">
                    <div className="text-gray-800 dark:text-gray-300">
                      <div className="border-b border-gray-300 dark:border-gray-700 pb-1 mb-1">
                        <span className="text-red-600 dark:text-red-400">[ERROR]</span> 
                        <span className="text-gray-600 dark:text-gray-400 mx-2">2023-05-15 08:32:14</span>
                        数据库连接失败: Connection timed out
                      </div>
                      <div className="border-b border-gray-300 dark:border-gray-700 pb-1 mb-1">
                        <span className="text-yellow-600 dark:text-yellow-400">[WARN]</span> 
                        <span className="text-gray-600 dark:text-gray-400 mx-2">2023-05-15 08:31:58</span>
                        API请求速率过高，IP: 203.0.113.1
                      </div>
                      <div className="border-b border-gray-300 dark:border-gray-700 pb-1 mb-1">
                        <span className="text-blue-600 dark:text-blue-400">[INFO]</span> 
                        <span className="text-gray-600 dark:text-gray-400 mx-2">2023-05-15 08:30:45</span>
                        用户admin登录成功
                      </div>
                      <div className="border-b border-gray-300 dark:border-gray-700 pb-1 mb-1">
                        <span className="text-blue-600 dark:text-blue-400">[INFO]</span> 
                        <span className="text-gray-600 dark:text-gray-400 mx-2">2023-05-15 08:15:22</span>
                        系统备份已完成
                      </div>
                      <div className="border-b border-gray-300 dark:border-gray-700 pb-1 mb-1">
                        <span className="text-blue-600 dark:text-blue-400">[INFO]</span> 
                        <span className="text-gray-600 dark:text-gray-400 mx-2">2023-05-15 08:00:01</span>
                        定时任务启动: 每日数据统计
                      </div>
                      <div className="border-b border-gray-300 dark:border-gray-700 pb-1 mb-1">
                        <span className="text-green-600 dark:text-green-400">[DEBUG]</span> 
                        <span className="text-gray-600 dark:text-gray-400 mx-2">2023-05-15 07:58:45</span>
                        接收缓存刷新请求: 文章列表
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link href="/admin/settings/logs/view">
                      <Button variant="outline" size="sm">
                        查看完整日志
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="ml-2">
                      导出日志
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI 助手 */}
          {activeTab === 'ai' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">AI 京剧助手</h2>
              
              {/* AI 设置部分 */}
              <Card className="mb-6">
                <CardHeader>
                  <h3 className="text-lg font-medium">AI 助手设置</h3>
                </CardHeader>
                <CardBody className="space-y-4">
                  <div>
                    <label htmlFor="aiApiEndpoint" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      API 端点
                    </label>
                    <input
                      id="aiApiEndpoint"
                      type="text"
                      value={settings.ai?.apiEndpoint || "https://your-worker-url.workers.dev"}
                      onChange={(e) => handleChange('ai', 'apiEndpoint', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                      placeholder="https://your-worker-url.workers.dev"
                    />
                    <p className="mt-1 text-sm text-gray-500">Cloudflare Workers 的 URL 地址</p>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="streamingEnabled"
                      type="checkbox"
                      checked={settings.ai?.streamingEnabled !== false}
                      onChange={(e) => handleChange('ai', 'streamingEnabled', e.target.checked)}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="streamingEnabled" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      启用流式响应
                    </label>
                  </div>
                  
                  <div>
                    <label htmlFor="maxTokens" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      最大输出 Token 数
                    </label>
                    <input
                      id="maxTokens"
                      type="number"
                      min="100"
                      max="2000"
                      value={settings.ai?.maxTokens || 524}
                      onChange={(e) => handleChange('ai', 'maxTokens', parseInt(e.target.value))}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                    />
                  </div>
                  
                  <Button
                    onClick={handleSave}
                    size="sm"
                  >
                    保存 AI 设置
                  </Button>
                </CardBody>
              </Card>
              
              {/* AI 聊天界面 */}
              <div className="h-[500px]">
                <AIChat 
                  apiEndpoint={settings.ai?.apiEndpoint}
                  streamingEnabled={settings.ai?.streamingEnabled !== false}
                  maxTokens={settings.ai?.maxTokens || 524}
                />
              </div>
            </div>
          )}

          {/* 保存按钮 */}
          <div className="mt-8 flex justify-end">
            <Button onClick={handleSave}>
              保存设置
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* 快速导航卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold">备份与还原</h2>
          </CardHeader>
          <CardBody>
            <p className="text-gray-500 dark:text-gray-400 mb-4">备份和还原网站数据，防止数据丢失。</p>
            <Button 
              variant="outline" 
              fullWidth
              onClick={() => {
                // 这里可以打开备份管理的模态框，而不是跳转
                alert('备份功能开发中，即将上线');
              }}
            >
              备份管理
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold">安全设置</h2>
          </CardHeader>
          <CardBody>
            <p className="text-gray-500 dark:text-gray-400 mb-4">配置网站安全选项、密码策略和访问控制。</p>
            <Button 
              variant="outline" 
              fullWidth
              onClick={() => setActiveTab('security')}
            >
              安全配置
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold">系统日志</h2>
          </CardHeader>
          <CardBody>
            <p className="text-gray-500 dark:text-gray-400 mb-4">查看系统运行日志和错误记录，排查问题。</p>
            <Button 
              variant="outline" 
              fullWidth
              onClick={() => setActiveTab('logs')}
            >
              查看日志
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold">AI 助手</h2>
          </CardHeader>
          <CardBody>
            <p className="text-gray-500 dark:text-gray-400 mb-4">使用AI助手查询京剧知识和获取管理建议。</p>
            <Button 
              variant="outline" 
              fullWidth
              onClick={() => setActiveTab('ai')}
            >
              打开助手
            </Button>
          </CardBody>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage; 