// Composables
import {createRouter, createWebHistory, Router} from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: 'CommunityMain',
        name: 'CommunityMain',
        component :()=>import('@/views/Community/CommunityMain.vue')
      },

      {
        path: 'CommunityDetail/:id', // ':id'를 사용하여 라우트 매개변수를 나타냅니다
        name: 'CommunityDetail',
        component: () => import('@/views/Community/CommunityDetail.vue'),
        props: true, // 라우트 매개변수를 자동으로 props로 전달합니다
      },
      {
        path: 'Communitywrite',
        name: 'Communitywrite',
        component:()=>import('@/views/Community/Communitywrite.vue'),
      },
      {
        path: 'Shop',
        name: 'Shop',
        component:()=>import('@/views/Shop.vue'),
      },
      {
      path: 'EventMain',
      name: 'EventMain',
      component:()=>import('@/views/event/EventMain.vue'),
      },
      {
        path: 'EventWrite',
        name: 'EventWrite',
        component:()=>import('@/views/event/EventWrite.vue'),
      },
      {
        path: '/SiteIntroduction', // 이 경로로 이동하면 사이트 소개 페이지로 가게함
        name: 'SiteIntroduction',
        component: () => import('@/views/SiteIntroduction.vue'),
      },
      {
        path: '/Privacypolicy',
        name: 'Privacypolicy',
        component: () => import('@/views/Privacypolicy.vue'),
      },
      {
        path: '/Inquiry',
        name: 'Inquiry',
        component: () => import('@/views/Inquiry.vue'),
      },
      {
        path: '/Notice',
        name: 'Notice',
        component: () => import('@/views/Notice.vue'),
      },
      {
        path: '/NoticeWrite',
        name: 'NoticeWrite',
        component: () => import('@/views/NoticeWrite.vue'),
      },
      {
        path: '/pwdReset',
        name: 'PasswordReset',
        component: () => import('@/views/auth/PasswordReset.vue')
      },
      {
        path: '/myInfo',
        name: 'MyInfo',
        component: () => import('@/views/mypage/myInfo.vue')
      },
      {
        path: '/pwdChange',
        name: 'PassowrdChange',
        component: () => import('@/views/mypage/PasswordChange.vue')
      },
      {
        path: '/weeklyBest',
        name: 'weeklyBest',
        component: () => import('@/views/weeklyBest.vue')
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('@/views/Cart.vue'),
      },
      {
        path: 'payment',
        name: 'payment',
        component: () => import('@/views/payment.vue'),
      },
      {
        path: 'Shoppingdetails',
        name: 'Shoppingdetails',
        component: () => import('@/views/Shopping/Shoppingdetails.vue'),
      },
    ],
  },
  {
    path: '/myPage',
    component: () => import('@/layouts/myPage/Default.vue'),
    children: [
      {
        path: 'myInfo',
        name: 'MyInfo',
        component: () => import('@/views/mypage/myInfo.vue')
      },
      {
        path: 'pwdChange',
        name: 'PasswordChange',
        component: () => import('@/views/mypage/PasswordChange.vue')
      },
      {
        path: 'deliveryChk',
        name: 'DeliveryChk',
        component: () => import('@/views/mypage/DeliveryCheck.vue')
      },
      {
        path: 'favoriteList',
        name: 'FavoriteList',
        component: () => import('@/views/mypage/FavoriteList.vue')
      },
      {
        path: 'boughtList',
        name: 'BoughtList',
        component: () => import('@/views/mypage/BoughtList.vue')
      },
      {
        path: 'myWriting',
        name: 'MyWriting',
        component: () => import('@/views/mypage/MyWriting.vue')
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/layouts/admin/Default.vue'),
    children: [
      {
        path: 'myInfo',
        name: 'AdminInfo',
        component: () => import('@/views/mypage/myInfo.vue')
      },
      {
        path: 'pwdChange',
        name: 'AdminPasswordChange',
        component: () => import('@/views/mypage/PasswordChange.vue')
      },
      {
        path: 'userManage',
        name: 'UserManage',
        component: () => import('@/views/admin/UserManage.vue')
      },
      {
        path: 'shoppingManage',
        name: 'ShoppingManage',
        component: () => import('@/views/admin/ShoppingManage.vue')
      },
      {
        path: 'writingManage',
        name: 'WritingManage',
        component: () => import('@/views/admin/WritingManage.vue')
      },
      {
        path: 'ProductForm',
        name: 'ProductForm',
        component: () => import('@/views/ProductForm.vue'),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// 카카오로그인


export default router
