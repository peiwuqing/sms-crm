import Layout from '@/views/layout/Layout'
export default [
  {
    path: '/customers',
    component: Layout,
    redirect: 'noredirect',
    name:'customer',
    children: [
      {
        path: 'customer',
        component: () => import('@/views/business/customer/index'),
        name: 'customers',
        meta: { title: '客户管理', noCache: false }
      }
    ]
  }
]
