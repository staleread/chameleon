import { createRouter, createWebHistory } from 'vue-router'
import AppCatalog from '../views/AppCatalog.vue'
import AppNotFound from '../views/AppNotFound.vue'
import AppCart from "@/views/AppCart.vue";

const routes = [
  { path: '/', component: AppCatalog },
  { path: '/cart', component: AppCart },
  { path: '/:pathMatch(.*)*', component: AppNotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
