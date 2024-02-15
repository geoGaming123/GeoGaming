import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RankView from '../views/RankView.vue'
import GameView from '../views/GameView.vue'
import ProfileView from '../views/ProfileView.vue'
import NextGameView from '../views/NextGameView.vue'
import Helpview from '../views/Helpview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/rank',
      name: 'Rank',
      component: RankView
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileView
    },
    {
      path: '/game',
      name: 'Game',
      component: GameView
    },
    {
      path: '/nextgame',
      name: 'NextGame',
      component: NextGameView
    },
    {
      path: '/help',
      name: 'Help',
      component: Helpview
    }
  ]
})

export default router
