import { createRouter, createWebHistory } from 'vue-router'
import AppCatalog from '../views/AppCatalog.vue'
import AppNotFound from '../views/AppNotFound.vue'

const routes = [
  { path: '/', component: AppCatalog },
  { path: '/:pathMatch(.*)*', component: AppNotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
