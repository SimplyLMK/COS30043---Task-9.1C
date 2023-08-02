import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import { projectAuth } from '@/firebase/config'


const route_guard = (to, from, next) =>
{
  let user = projectAuth.currentUser
  if(!user)
  {
    next({name: 'Login'});
  }
  else
  {
    next();
  }
}

const routes = [
  
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    props:true,
    beforeEnter: route_guard

  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
