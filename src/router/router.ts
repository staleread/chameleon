import AppCart from '@/views/AppCart.vue'
import AppCatalog from '@/views/AppCatalog.vue'
import AppItemPage from '@/views/AppItemPage.vue'
import AppNotFound from '@/views/AppNotFound.vue'
import AppWishList from '@/views/AppWishList.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: AppCatalog },
  { path: '/cart', component: AppCart },
  { path: '/item/:id', component: AppItemPage },
  { path: '/wish-list', component: AppWishList },
  { path: '/:pathMatch(.*)*', component: AppNotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
