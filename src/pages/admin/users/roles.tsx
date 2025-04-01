import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout/Layout';
import Card, { CardBody } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

// 模拟角色数据
const MOCK_ROLES = [
  { 
    id: 1, 
    name: '管理员', 
    slug: 'admin', 
    usersCount: 1, 
    description: '具有所有权限，可以进行所有操作',
    permissions: ['all']
  },
  { 
    id: 2, 
    name: '编辑', 
    slug: 'editor', 
    usersCount: 2, 
    description: '具有内容管理权限，可以创建、编辑和发布内容',
    permissions: ['content.create', 'content.edit', 'content.publish', 'content.delete']
  },
  { 
    id: 3, 
    name: '会员', 
    slug: 'member', 
    usersCount: 7, 
    description: '普通会员，可以浏览所有内容，发表评论',
    permissions: ['content.view', 'comment.create']
  },
  { 
    id: 4, 
    name: '游客', 
    slug: 'guest', 
    usersCount: 0, 
    description: '未登录用户，只能浏览公开内容',
    permissions: ['content.view.public']
  },
];

// 可用权限列表
const AVAILABLE_PERMISSIONS = [
  { id: 'all', name: '所有权限', description: '包括所有系统权限' },
  { id: 'content.create', name: '创建内容', description: '创建新文章和页面' },
  { id: 'content.edit', name: '编辑内容', description: '编辑现有文章和页面' },
  { id: 'content.publish', name: '发布内容', description: '发布和取消发布内容' },
  { id: 'content.delete', name: '删除内容', description: '删除文章和页面' },
  { id: 'content.view', name: '查看所有内容', description: '查看所有内容，包括草稿' },
  { id: 'content.view.public', name: '查看公开内容', description: '只能查看已发布的公开内容' },
  { id: 'user.manage', name: '管理用户', description: '创建、编辑和删除用户' },
  { id: 'role.manage', name: '管理角色', description: '创建、编辑和删除角色' },
  { id: 'comment.create', name: '发表评论', description: '在文章下发表评论' },
  { id: 'comment.moderate', name: '管理评论', description: '审核、编辑和删除评论' },
  { id: 'setting.edit', name: '编辑设置', description: '修改系统设置' },
];

const RolesPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [roles, setRoles] = useState(MOCK_ROLES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', slug: '', description: '', permissions: [] as string[] });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: '', slug: '', description: '', permissions: [] as string[] });

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

  // 添加新角色
  const handleAddRole = () => {
    if (!newRole.name || !newRole.slug) return;
    
    // 生成新的ID (实际应用中由后端生成)
    const newId = Math.max(...roles.map(r => r.id)) + 1;
    
    setRoles([
      ...roles,
      {
        id: newId,
        name: newRole.name,
        slug: newRole.slug,
        description: newRole.description,
        permissions: newRole.permissions,
        usersCount: 0 // 新角色用户数为0
      }
    ]);
    
    // 重置表单
    setNewRole({ name: '', slug: '', description: '', permissions: [] });
    setShowAddForm(false);
  };

  // 开始编辑角色
  const handleStartEdit = (role: typeof MOCK_ROLES[0]) => {
    setEditingId(role.id);
    setEditForm({
      name: role.name,
      slug: role.slug,
      description: role.description,
      permissions: [...role.permissions]
    });
  };

  // 保存编辑后的角色
  const handleSaveEdit = () => {
    if (!editingId || !editForm.name || !editForm.slug) return;
    
    setRoles(prevRoles => 
      prevRoles.map(role => 
        role.id === editingId 
          ? { ...role, name: editForm.name, slug: editForm.slug, description: editForm.description, permissions: editForm.permissions } 
          : role
      )
    );
    
    // 重置编辑状态
    setEditingId(null);
  };

  // 删除角色
  const handleDelete = (id: number) => {
    const role = roles.find(r => r.id === id);
    if (!role) return;
    
    // 不允许删除有用户的角色
    if (role.usersCount > 0) {
      alert(`无法删除角色"${role.name}"，该角色下还有 ${role.usersCount} 个用户。请先将这些用户转移到其他角色。`);
      return;
    }
    
    if (window.confirm(`确定要删除角色"${role.name}"吗？`)) {
      setRoles(prevRoles => prevRoles.filter(role => role.id !== id));
    }
  };

  // 处理权限复选框变更
  const handlePermissionChange = (form: 'new' | 'edit', permissionId: string, checked: boolean) => {
    if (form === 'new') {
      setNewRole(prev => {
        if (permissionId === 'all') {
          // 如果选择了"所有权限"，则清空其他所有权限
          return { ...prev, permissions: checked ? ['all'] : [] };
        } else {
          // 如果选择了具体权限，则移除"所有权限"选项
          let newPermissions = [...prev.permissions];
          if (checked) {
            newPermissions.push(permissionId);
            // 移除"所有权限"选项
            newPermissions = newPermissions.filter(p => p !== 'all');
          } else {
            newPermissions = newPermissions.filter(p => p !== permissionId);
          }
          return { ...prev, permissions: newPermissions };
        }
      });
    } else {
      setEditForm(prev => {
        if (permissionId === 'all') {
          // 如果选择了"所有权限"，则清空其他所有权限
          return { ...prev, permissions: checked ? ['all'] : [] };
        } else {
          // 如果选择了具体权限，则移除"所有权限"选项
          let newPermissions = [...prev.permissions];
          if (checked) {
            newPermissions.push(permissionId);
            // 移除"所有权限"选项
            newPermissions = newPermissions.filter(p => p !== 'all');
          } else {
            newPermissions = newPermissions.filter(p => p !== permissionId);
          }
          return { ...prev, permissions: newPermissions };
        }
      });
    }
  };

  // 生成角色别名
  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/[\s，。：；''""《》？！【】（）、]/g, '-') // 将中文标点和空格替换为连字符
      .replace(/-+/g, '-') // 将多个连字符替换为单个
      .replace(/^-|-$/g, ''); // 移除开头和结尾的连字符
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
        <title>角色管理 - 京剧艺术网</title>
        <meta name="description" content="管理京剧艺术网的用户角色和权限" />
      </Head>

      {/* 页面标题 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">角色管理</h1>
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

      {/* 操作栏 */}
      <Card className="mb-6">
        <CardBody>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              角色用于定义用户的权限级别，决定用户可以执行哪些操作。
            </div>
            <Button onClick={() => setShowAddForm(true)}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              添加角色
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* 添加角色表单 */}
      {showAddForm && (
        <Card className="mb-6">
          <CardBody>
            <h2 className="text-xl font-semibold mb-4">添加新角色</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="roleName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  角色名称 <span className="text-red-500">*</span>
                </label>
                <input
                  id="roleName"
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                  value={newRole.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setNewRole({
                      ...newRole,
                      name,
                      slug: generateSlug(name)
                    });
                  }}
                  required
                />
              </div>
              <div>
                <label htmlFor="roleSlug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  角色标识 <span className="text-red-500">*</span>
                </label>
                <input
                  id="roleSlug"
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                  value={newRole.slug}
                  onChange={(e) => setNewRole({ ...newRole, slug: e.target.value })}
                  required
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  用于内部标识，只能包含字母、数字和连字符
                </p>
              </div>
              <div>
                <label htmlFor="roleDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  角色描述
                </label>
                <textarea
                  id="roleDescription"
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  权限设置
                </label>
                <div className="space-y-2 max-h-80 overflow-y-auto p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                  {AVAILABLE_PERMISSIONS.map(permission => (
                    <div key={permission.id} className="flex items-start">
                      <input
                        id={`new-permission-${permission.id}`}
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                        checked={newRole.permissions.includes(permission.id)}
                        onChange={(e) => handlePermissionChange('new', permission.id, e.target.checked)}
                      />
                      <label htmlFor={`new-permission-${permission.id}`} className="ml-2 block">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{permission.name}</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{permission.description}</p>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  取消
                </Button>
                <Button onClick={handleAddRole}>
                  添加角色
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* 角色列表 */}
      <div className="space-y-6">
        {roles.map(role => (
          <Card key={role.id}>
            <CardBody>
              {editingId === role.id ? (
                // 编辑模式
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      角色名称
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                      value={editForm.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        setEditForm({
                          ...editForm,
                          name,
                          ...(editForm.slug === role.slug ? { slug: generateSlug(name) } : {})
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      角色标识
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                      value={editForm.slug}
                      onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      角色描述
                    </label>
                    <textarea
                      rows={2}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-white"
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      权限设置
                    </label>
                    <div className="space-y-2 max-h-80 overflow-y-auto p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                      {AVAILABLE_PERMISSIONS.map(permission => (
                        <div key={permission.id} className="flex items-start">
                          <input
                            id={`edit-permission-${permission.id}-${role.id}`}
                            type="checkbox"
                            className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                            checked={editForm.permissions.includes(permission.id)}
                            onChange={(e) => handlePermissionChange('edit', permission.id, e.target.checked)}
                          />
                          <label htmlFor={`edit-permission-${permission.id}-${role.id}`} className="ml-2 block">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{permission.name}</span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{permission.description}</p>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setEditingId(null)}>
                      取消
                    </Button>
                    <Button onClick={handleSaveEdit}>
                      保存
                    </Button>
                  </div>
                </div>
              ) : (
                // 查看模式
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold">{role.name}</h2>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-500 dark:text-gray-400">角色标识: {role.slug}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                        <Link 
                          href={`/admin/users?role=${role.slug}`} 
                          className="text-sm text-red-600 dark:text-red-400 hover:underline"
                        >
                          {role.usersCount} 个用户
                        </Link>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">{role.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleStartEdit(role)}>
                        编辑
                      </Button>
                      {role.usersCount === 0 && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-600 dark:text-red-400 border-red-600 dark:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                          onClick={() => handleDelete(role.id)}
                        >
                          删除
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">权限列表</h3>
                    {role.permissions.includes('all') ? (
                      <p className="text-gray-600 dark:text-gray-300">此角色拥有所有系统权限</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.map(permId => {
                          const permission = AVAILABLE_PERMISSIONS.find(p => p.id === permId);
                          return permission ? (
                            <span 
                              key={permId}
                              className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                              title={permission.description}
                            >
                              {permission.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default RolesPage; 