import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/layout/AdminLayout';
import Card, { CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

// 活动类型枚举
enum ActivityType {
  Login = 'login',
  Register = 'register',
  ContentCreate = 'content_create',
  ContentEdit = 'content_edit',
  ContentDelete = 'content_delete',
  CommentCreate = 'comment_create',
  CommentModerate = 'comment_moderate',
  ResourceUpload = 'resource_upload',
  SettingChange = 'setting_change',
  UserManage = 'user_manage'
}

// 模拟活动日志数据
const MOCK_ACTIVITIES = [
  { 
    id: 1, 
    user: '管理员',
    userRole: 'admin',
    type: ActivityType.ContentCreate, 
    description: '创建了文章《京剧旦角的表演特点》', 
    ip: '192.168.1.100',
    timestamp: '2023-11-15 14:30:22'
  },
  { 
    id: 2, 
    user: '戏曲新手',
    userRole: 'member',
    type: ActivityType.CommentCreate, 
    description: '在文章《梅兰芳的艺术成就》下发表了评论', 
    ip: '115.34.56.78',
    timestamp: '2023-11-15 13:45:18'
  },
  { 
    id: 3, 
    user: '京剧爱好者',
    userRole: 'editor',
    type: ActivityType.ContentEdit, 
    description: '更新了文章《京剧的起源与发展》', 
    ip: '110.45.67.89',
    timestamp: '2023-11-15 11:20:05'
  },
  { 
    id: 4, 
    user: '管理员',
    userRole: 'admin',
    type: ActivityType.SettingChange, 
    description: '修改了网站SEO设置', 
    ip: '192.168.1.100',
    timestamp: '2023-11-14 16:50:11'
  },
  { 
    id: 5, 
    user: '清音悠扬',
    userRole: 'member',
    type: ActivityType.Login, 
    description: '用户登录成功', 
    ip: '220.181.38.148',
    timestamp: '2023-11-14 15:25:38'
  },
  { 
    id: 6, 
    user: '剧史研究者',
    userRole: 'editor',
    type: ActivityType.ResourceUpload, 
    description: '上传了音频资源《四郎探母》片段', 
    ip: '116.23.45.67',
    timestamp: '2023-11-14 10:10:42'
  },
  { 
    id: 7, 
    user: '京韵悠长',
    userRole: 'member',
    type: ActivityType.Register, 
    description: '新用户注册', 
    ip: '114.114.114.114',
    timestamp: '2023-11-13 09:30:15'
  },
  { 
    id: 8, 
    user: '管理员',
    userRole: 'admin',
    type: ActivityType.UserManage, 
    description: '创建了新角色"社区版主"', 
    ip: '192.168.1.100',
    timestamp: '2023-11-13 08:45:30'
  },
  { 
    id: 9, 
    user: '京剧爱好者',
    userRole: 'editor',
    type: ActivityType.CommentModerate, 
    description: '审核并批准了3条评论', 
    ip: '110.45.67.89',
    timestamp: '2023-11-12 16:20:05'
  },
  { 
    id: 10, 
    user: '管理员',
    userRole: 'admin',
    type: ActivityType.ContentDelete, 
    description: '删除了文章《测试文章》', 
    ip: '192.168.1.100',
    timestamp: '2023-11-12 14:15:22'
  },
];

// 活动类型图标和颜色
const ACTIVITY_STYLES = {
  [ActivityType.Login]: { icon: '🔑', color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' },
  [ActivityType.Register]: { icon: '👤', color: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' },
  [ActivityType.ContentCreate]: { icon: '📝', color: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' },
  [ActivityType.ContentEdit]: { icon: '✏️', color: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400' },
  [ActivityType.ContentDelete]: { icon: '🗑️', color: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400' },
  [ActivityType.CommentCreate]: { icon: '💬', color: 'bg-teal-100 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400' },
  [ActivityType.CommentModerate]: { icon: '👁️', color: 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' },
  [ActivityType.ResourceUpload]: { icon: '🎵', color: 'bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' },
  [ActivityType.SettingChange]: { icon: '⚙️', color: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400' },
  [ActivityType.UserManage]: { icon: '👥', color: 'bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400' },
};

const ActivityLogPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState(MOCK_ACTIVITIES);
  const [userFilter, setUserFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<ActivityType | 'all'>('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

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

  // 用户列表（用于筛选）
  const uniqueUsers = Array.from(new Set(activities.map(a => a.user)));

  // 筛选活动日志
  const filteredActivities = activities.filter(activity => {
    // 按用户筛选
    if (userFilter && activity.user !== userFilter) return false;
    
    // 按活动类型筛选
    if (typeFilter !== 'all' && activity.type !== typeFilter) return false;
    
    // 按日期范围筛选（如果设置了日期范围）
    if (dateRange.start) {
      const activityDate = new Date(activity.timestamp.replace(' ', 'T'));
      const startDate = new Date(dateRange.start);
      if (activityDate < startDate) return false;
    }
    
    if (dateRange.end) {
      const activityDate = new Date(activity.timestamp.replace(' ', 'T'));
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59); // 设置为当天结束时间
      if (activityDate > endDate) return false;
    }
    
    return true;
  });

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
        <title>用户活动日志 - 京剧艺术网</title>
        <meta name="description" content="查看京剧艺术网的用户活动记录" />
      </Head>

      {/* 页面标题 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">活动日志</h1>
        <div className="flex gap-2">
          <Link href="/admin/users">
            <Button variant="outline" size="sm">
              返回用户管理
            </Button>
          </Link>
          <Link href="/admin">
            <Button variant="outline" size="sm">
              返回控制台
            </Button>
          </Link>
        </div>
      </div>

      {/* 筛选工具 */}
      <Card className="mb-6">
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="userFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                用户筛选
              </label>
              <select
                id="userFilter"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
              >
                <option value="">所有用户</option>
                {uniqueUsers.map((user, index) => (
                  <option key={index} value={user}>{user}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="typeFilter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                活动类型
              </label>
              <select
                id="typeFilter"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as ActivityType | 'all')}
              >
                <option value="all">所有类型</option>
                <option value={ActivityType.Login}>登录</option>
                <option value={ActivityType.Register}>注册</option>
                <option value={ActivityType.ContentCreate}>创建内容</option>
                <option value={ActivityType.ContentEdit}>编辑内容</option>
                <option value={ActivityType.ContentDelete}>删除内容</option>
                <option value={ActivityType.CommentCreate}>发表评论</option>
                <option value={ActivityType.CommentModerate}>管理评论</option>
                <option value={ActivityType.ResourceUpload}>上传资源</option>
                <option value={ActivityType.SettingChange}>修改设置</option>
                <option value={ActivityType.UserManage}>用户管理</option>
              </select>
            </div>
            
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  开始日期
                </label>
                <input
                  id="startDate"
                  type="date"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  结束日期
                </label>
                <input
                  id="endDate"
                  type="date"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* 活动日志列表 */}
      <Card>
        <CardBody>
          <div className="space-y-4">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => (
                <div key={activity.id} className="flex items-start pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${ACTIVITY_STYLES[activity.type].color}`}>
                    <span className="text-lg">{ACTIVITY_STYLES[activity.type].icon}</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="font-medium">{activity.description}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{activity.timestamp}</div>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>用户: <span className="font-medium">{activity.user}</span></span>
                      <span>角色: <span className="font-medium">{activity.userRole}</span></span>
                      <span>IP: {activity.ip}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                没有找到匹配的活动记录
              </div>
            )}
          </div>

          {filteredActivities.length > 0 && (
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                共 {filteredActivities.length} 条记录
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  上一页
                </Button>
                <Button variant="outline" size="sm" disabled>
                  下一页
                </Button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </AdminLayout>
  );
};

export default ActivityLogPage; 