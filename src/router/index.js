import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/pages/HomePage.vue";
import CoopPage from "@/pages/CoopPage.vue";
import CompostPage from "@/pages/CompostPage.vue";

const routes = [
  { path: '/', component: HomePage },
  { path: '/coop', component: CoopPage },
  { path: '/compost', component: CompostPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router