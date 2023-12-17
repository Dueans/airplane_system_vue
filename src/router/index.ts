import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainView from '../views/MainView.vue'
import PredictView from '../views/PredictView.vue'
import RecordView from '../views/RecordView.vue'
import DetailView from '../views/DetailView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: MainView
  },
  {
    path: '/predict',
    name: 'predict',
    component: PredictView
  },
  {
    path: '/record',
    name: 'record',
    component: RecordView
  },
  {
    path: '/detail',
    name: 'detail',
    component: DetailView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
