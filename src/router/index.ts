import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import MainView from '../views/MainView.vue'
import Welcome from '../views/Welcome.vue'
import Student from '../views/Student.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    component: LoginView,
  },
  {
    path: '/main',
    component: MainView,
    children: [
      { path: '/', component: Welcome },
      { path: '/showStudent', component: Student }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
