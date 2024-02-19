import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RankView from '../views/RankView.vue'
import GameView from '../views/GameView.vue'
import ProfileView from '../views/ProfileView.vue'
import NextGameView from '../views/NextGameView.vue'
import GameFormView from '@/views/GameFormView.vue'
import GameFormModifView from '@/views/GameFormModifView.vue'

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
      path: '/gameform',
      name: 'GameForm',
      component: GameFormView
    },
    {
      path: '/gameformmodif',
      name: 'GameFormModif',
      component: GameFormModifView
    }
  ]
})

export default router
