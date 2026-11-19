import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView, meta: { element: 'fire', title: 'Phoenix Healing Practice · Chelmsford, Essex' } },
  {
    path: '/myofascial-release',
    name: 'mfr',
    component: () => import('./views/MfrView.vue'),
    meta: { element: 'earth', title: 'Myofascial Release · Phoenix Healing Practice' },
  },
  {
    path: '/shamanic-healing',
    name: 'shamanic',
    component: () => import('./views/ShamanicView.vue'),
    meta: { element: 'air', title: 'Shamanic Healing · Phoenix Healing Practice' },
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) {
      // when arriving from another page, wait for the home view to mount first
      const delay = to.path === from.path ? 0 : 420
      return new Promise((resolve) =>
        setTimeout(() => resolve({ el: to.hash, top: 84, behavior: delay ? 'auto' : 'smooth' }), delay),
      )
    }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Phoenix Healing Practice'
  document.documentElement.dataset.element = to.meta.element || 'fire'
})
