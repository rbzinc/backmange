export const constantRoute = [{
  path: '/',
  component: () => import('@/view/login/index.vue'),
  name: 'login',
},{
  path: '/layout',
  component: () => import('@/layout/index.vue'),
  name: 'layout',
}
]


export const anyRoute = {
  //任意路由
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'Any',
  meta: {
      title: '任意路由',
      hidden: true,
      icon: 'DataLine',
  },
}