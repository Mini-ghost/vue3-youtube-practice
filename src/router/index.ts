import { createRouter, createWebHashHistory, RouteRecordRaw, RouterScrollBehavior } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(
      /* webpackChunkName: "home" */
      '../views/Home.vue'
    )
  },
  {
    path: '/favorite',
    name: 'Favorite',
    component: () => import(
      /* webpackChunkName: "favorite" */
      '../views/Favorite.vue'
    ),
  },
  {
    path: '/video/:id?',
    name: 'Video',
    component: () => import(
      /* webpackChunkName: "video" */
      '../views/Video.vue'
    ),
  }
]

const scrollBehavior: RouterScrollBehavior = (_to, _from, savedPosition) => {
  return savedPosition
    ? savedPosition
    : {
      top: 0,
      left: 0
    }
}

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior
});

export default router
