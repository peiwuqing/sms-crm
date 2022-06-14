import Layout from '@/views/layout/Layout'
export default [
  {
    path: '/auth',
    component: Layout,
    redirect: 'noredirect',
    name:'auth',
    children: [
      {
        path: 'roles',
        component: () => import('@/views/auth/role/index'),
        name: 'roles',
        meta: { title: '角色管理', noCache: false }
      },
      {
        path: 'users',
        component: () => import('@/views/auth/users/index'),
        name: 'users',
        meta: { title: '员工管理', noCache: false }
      },
      {
        path: 'menus',
        component: () => import('@/views/auth/menu/index'),
        name: 'menus',
        meta: { title: '菜单管理', noCache: false }
      },
    ]
  }
]
