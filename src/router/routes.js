export const constantRoute = [
    {
    path: '/',
    component: () => import('@/view/login/index.vue'),
    name: 'login',
        meta: {
            title: "",
            hidden: true,
            icon: "",
        },
    },
    {
        path: '/register',
        component: () => import('@/view/register/index.vue'),
        name: 'register',
        meta: {
            title: "",
            hidden: true,
            icon: "",
        },
    },
    {
        path: '/layout',
        component: () => import('@/layout/index.vue'),
        name: 'layout',
        meta: {
            title: "",
            hidden: false,
            icon: "",
        },
        redirect: "/home",
        children: [
            {
                path: "/home",
                component: () => import("@/view/home/index.vue"),
                meta: {
                    title: "首页",
                    hidden: false,
                    icon: "HomeFilled",
                },
            },
        ]
    },
    {
    path: '/poetry',
    component: () => import('@/layout/index.vue'),
    name: 'poetry',
    redirect: "/poetry/poem",
    meta: {
        title: "诗阁",
        hidden: false,
        icon: "MoreFilled",
    },
    children: [
        {
            path: '/poetry/poem',
            component: () => import('@/view/poetry/poem/index.vue'),
            name: 'poem',
            meta: {
                title: "诗词",
                icon: "Management",
                hidden: false,
            },
        },
        {
            path: '/poetry/poet',
            component: () => import('@/view/poetry/poet/index.vue'),
            name: 'poet',
            meta: {
                title: "诗人",
                icon: "Avatar",
                hidden: false,
            },
        },
        {
            path: '/poetry/sentence',
            component: () => import('@/view/poetry/sentence/index.vue'),
            name: 'sentence',
            meta: {
                title: "名句",
                icon: "Comment",
                hidden: false,
            },
        }
    ]
    },
    {
        path: '/useradmin',
        component: () => import('@/layout/index.vue'),
        name: 'useradmin',
        meta: {
            title: "",
            icon: "",
            hidden: false,
        },
        redirect: "/useradmin/view",
        children: [
            {
                path: "/useradminn/view",
                component: () => import("@/view/useradmin/index.vue"),
                meta: {
                    title: "用户管理",
                    icon: "UserFilled",
                    hidden: false,
                },
            },
        ]
    },
    {
        path: '/talksquare',
        component: () => import('@/layout/index.vue'),
        name: 'talksquare',
        meta: {
            title: "",
            icon: "",
            hidden: false,
        },
        redirect: "/talksquare/view",
        children: [
            {
                path: "/talksquare/view",
                component: () => import("@/view/talkSquare/index.vue"),
                meta: {
                    title: "论坛管理",
                    icon: "Platform",
                    hidden: false,
                },
            },
        ]
    },
    {
        path: '/notice',
        component: () => import('@/layout/index.vue'),
        name: 'notice',
        meta: {
            title: "",
            icon: "",
            hidden: false,
        },
        redirect: "/notice/view",
        children: [
            {
                path: "/notice/view",
                component: () => import("@/view/notice/index.vue"),
                meta: {
                    title: "公告管理",
                    icon: "BellFilled",
                    hidden: false,
                },
            },
        ]
    },
    {
        path: '/notebook.js',
        component: () => import('@/layout/index.vue'),
        name: 'notebook',
        meta: {
            title: "",
            icon: "List",
            hidden: false,
        },
        redirect: "/notebook.js/view",
        children: [
            {
                path: "/notebook.js/view",
                component: () => import("@/view/notebook/index.vue"),
                meta: {
                    title: "管理员日志",
                    icon: "List",
                    hidden: false,
                },
            },
        ]
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