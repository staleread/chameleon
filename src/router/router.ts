import { createRouter, createWebHistory } from 'vue-router'
import AppCatalog from '../views/AppCatalog.vue'
import AppItemPage from '../views/AppItemPage.vue'
import AppNotFound from '../views/AppNotFound.vue'
import AppWishList from '../views/AppWishList.vue'

const routes = [
  { path: '/', component: AppCatalog },
  { path: '/:pathMatch(.*)*', component: AppNotFound },
  { path: '/item/:id', component: AppItemPage },
  { path: '/wish-list', component: AppWishList },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
