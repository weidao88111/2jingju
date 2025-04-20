import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/layout/AdminLayout';
import Card, { CardBody, CardHeader } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

// 模拟用户数据
const MOCK_USERS = [
  { id: 1, username: '京剧爱好者', name: '张三', email: 'zhangsan@example.com', role: 'admin', status: 'active', registered: '2023-01-15', lastLogin: '2023-12-02 15:30' },
  { id: 2, username: '戏迷小王', name: '王小明', email: 'wang@example.com', role: 'editor', status: 'active', registered: '2023-03-22', lastLogin: '2023-12-01 09:45' },
  { id: 3, username: '清音悠扬', name: '李清', email: 'liqing@example.com', role: 'member', status: 'active', registered: '2023-05-10', lastLogin: '2023-11-30 14:20' },
  { id: 4, username: '京韵悠长', name: '赵悦', email: 'zhaoyue@example.com', role: 'member', status: 'active', registered: '2023-06-18', lastLogin: '2023-11-28 10:15' },
  { id: 5, username: '梨园知音', name: '钱文', email: 'qianwen@example.com', role: 'member', status: 'inactive', registered: '2023-07-24', lastLogin: '2023-10-15 16:40' },
  { id: 6, username: '青衣爱好者', name: '孙艺', email: 'sunyi@example.com', role: 'member', status: 'active', registered: '2023-08-30', lastLogin: '2023-11-29 18:25' },
  { id: 7, username: '花旦迷', name: '周丽', email: 'zhouli@example.com', role: 'member', status: 'suspended', registered: '2023-09-12', lastLogin: '2023-11-01 11:50' },
  { id: 8, username: '老生粉', name: '吴刚', email: 'wugang@example.com', role: 'editor', status: 'active', registered: '2023-10-05', lastLogin: '2023-11-25 20:10' },
  { id: 9, username: '武生控', name: '郑武', email: 'zhengwu@example.com', role: 'member', status: 'active', registered: '2023-11-11', lastLogin: '2023-12-02 12:35' },
  { id: 10, username: '丑角迷', name: '冯乐', email: 'fengle@example.com', role: 'member', status: 'pending', registered: '2023-11-28', lastLogin: '2023-11-28 09:00' },
];

// 用户角色配置
const USER_ROLES = {
  admin: { label: '管理员', color: 'red' },
  editor: { label: '编辑', color: 'blue' },
  member: { label: '会员', color: 'green' },
};

// 用户状态配置
const USER_STATUS = {
  active: { label: '正常', color: 'green' },
  inactive: { label: '未激活', color: 'gray' },
  suspended: { label: '已暂停', color: 'red' },
  pending: { label: '待审核', color: 'amber' },
};

const UsersPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  // 筛选用户
  const filteredUsers = users.filter(user => {
    // 搜索匹配
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 角色和状态筛选
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // 计算分页
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // 处理用户状态变更
  const handleStatusChange = (id: number, newStatus: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === id ? { ...user, status: newStatus } : user
      )
    );
  };

  // 获取用户状态标签
  const getUserStatusLabel = (status: string) => {
    const statusConfig = USER_STATUS[status as keyof typeof USER_STATUS];
    
    const colorClasses = {
      green: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      red: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400',
      gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    };
    
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses[statusConfig.color as keyof typeof colorClasses]}`}>
        {statusConfig.label}
      </span>
    );
  };

  // 获取用户角色标签
  const getUserRoleLabel = (role: string) => {
    const roleConfig = USER_ROLES[role as keyof typeof USER_ROLES];
    
    const colorClasses = {
      red: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      green: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    };
    
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses[roleConfig.color as keyof typeof colorClasses]}`}>
        {roleConfig.label}
      </span>
    );
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
        <title>用户管理 - 京剧艺术网</title>
        <meta name="description" content="管理京剧艺术网的用户账户" />
      </Head>

      {/* 页面标题 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">用户管理</h1>
        <Link href="/admin">
          <Button variant="outline" size="sm">
            返回控制台
          </Button>
        </Link>
      </div>

      {/* 用户统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">{users.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">总用户数</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {users.filter(user => user.status === 'active').length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">活跃用户</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              {users.filter(user => user.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">待审核用户</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {users.filter(user => user.role !== 'member').length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">管理员和编辑</div>
          </CardBody>
        </Card>
      </div>

      {/* 筛选和操作栏 */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4">
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="搜索用户..."
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
              <select
                className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">所有角色</option>
                <option value="admin">管理员</option>
                <option value="editor">编辑</option>
                <option value="member">会员</option>
              </select>
              <select
                className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">所有状态</option>
                <option value="active">正常</option>
                <option value="inactive">未激活</option>
                <option value="suspended">已暂停</option>
                <option value="pending">待审核</option>
              </select>
            </div>
            <div className="w-full md:w-auto">
              <Link href="/admin/users/new">
                <Button>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  添加用户
                </Button>
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* 用户列表 */}
      <Card>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    用户
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    角色
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    状态
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    注册日期
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    最近登录
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {currentItems.length > 0 ? (
                  currentItems.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                            {user.username.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900 dark:text-white">{user.username}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getUserRoleLabel(user.role)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getUserStatusLabel(user.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {user.registered}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {user.lastLogin}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/users/${user.id}`}>
                            <Button variant="ghost" size="sm">
                              查看
                            </Button>
                          </Link>
                          <Link href={`/admin/users/${user.id}/edit`}>
                            <Button variant="outline" size="sm">
                              编辑
                            </Button>
                          </Link>
                          {user.status === 'active' ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-600 dark:text-red-400 border-red-600 dark:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                              onClick={() => handleStatusChange(user.id, 'suspended')}
                            >
                              停用
                            </Button>
                          ) : user.status === 'suspended' ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-green-600 dark:text-green-400 border-green-600 dark:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                              onClick={() => handleStatusChange(user.id, 'active')}
                            >
                              启用
                            </Button>
                          ) : user.status === 'pending' ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-green-600 dark:text-green-400 border-green-600 dark:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                              onClick={() => handleStatusChange(user.id, 'active')}
                            >
                              批准
                            </Button>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-amber-600 dark:text-amber-400 border-amber-600 dark:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                              onClick={() => handleStatusChange(user.id, 'active')}
                            >
                              激活
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                      没有找到匹配的用户
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 分页控制 */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                显示 {filteredUsers.length} 条中的 {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredUsers.length)} 条
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                >
                  上一页
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  下一页
                </Button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* 快速链接 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold">角色与权限</h2>
          </CardHeader>
          <CardBody>
            <p className="text-gray-500 dark:text-gray-400 mb-4">管理用户角色和权限，设置访问级别。</p>
            <Link href="/admin/users/roles">
              <Button variant="outline" fullWidth>
                管理角色
              </Button>
            </Link>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold">用户活动</h2>
          </CardHeader>
          <CardBody>
            <p className="text-gray-500 dark:text-gray-400 mb-4">查看用户活动日志，跟踪操作记录。</p>
            <Link href="/admin/users/activity">
              <Button variant="outline" fullWidth>
                查看活动
              </Button>
            </Link>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold">用户导入/导出</h2>
          </CardHeader>
          <CardBody>
            <p className="text-gray-500 dark:text-gray-400 mb-4">批量导入或导出用户数据。</p>
            <Link href="/admin/users/import-export">
              <Button variant="outline" fullWidth>
                导入/导出
              </Button>
            </Link>
          </CardBody>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default UsersPage; 