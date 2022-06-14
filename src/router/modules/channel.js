import Layout from '@/views/layout/Layout'
export default [
  {
    path: '/channels',
    component: Layout,
    redirect: 'noredirect',
    name:'channels',
    children: [
      {
        path: 'channel',
        component: () => import('@/views/business/channel/index'),
        name: 'channels',
        meta: { title: '通道管理', noCache: false }
      },
      {
        path: 'template',
        component: () => import('@/views/business/template/index'),
        name: 'templates',
        meta: { title: '模板管理', noCache: false }
      },
    ]
  }
]
