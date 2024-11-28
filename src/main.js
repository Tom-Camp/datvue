import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './pages/HomePage.vue'
import CoopPage from './pages/CoopPage.vue'
import CompostPage from './pages/CompostPage.vue'
import 'bulma/css/bulma.min.css'
import '@fortawesome/fontawesome-free/css/all.css';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/coop', component: CoopPage },
    { path: '/compost', component: CompostPage }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')