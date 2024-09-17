import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/components/common/Layout.vue'
import HomeView from '@/views/home/Home.vue'
import AboutView from '@/views/about/About.vue'
import Result404 from '@/views/result/404.vue'

const siteName = 'HDPAN';
const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '',
        component: HomeView,
        meta: {
          navtitle: siteName,
        }
      },
      {
        path: 'about',
        component: AboutView,
        meta: {
          navtitle: 'About US',
        }
      },
    ]
  },
  { path: '/:pathMatch(.*)',
    name: 'Result404',
    component: Result404,
    meta: {
      navtitle: "NotFound",
    },
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  //beforeEach是router的钩子函数，在进入路由前执行
  if(to.meta.navtitle){
    //判断是否有标题
    document.title = String(to.name) == 'home' ? String(to.meta.navtitle) : String(to.meta.navtitle)+' - '+ siteName
  }
  //执行进入路由，如果不写就不会进入目标页
  next()
})

export default router
