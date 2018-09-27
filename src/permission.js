import router from './router'
// import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
// import { getToken } from '@/utils/auth' // 验权
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '') {
    next({ path: '/' })
    NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
  } else {
    next()
  }

  NProgress.done()
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
