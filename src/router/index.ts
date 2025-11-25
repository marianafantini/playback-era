import { createRouter, createWebHistory, type LocationQueryValue } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlayView from '@/views/PlayView.vue'
import HowToPlayView from '@/views/HowToPlayView.vue'
import LoginSuccessView from '@/views/LoginSuccessView.vue'
import LoginView from '@/views/LoginView.vue'
import SelectPlaylistView from '@/views/SelectPlaylistView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/login-success',
      name: 'loginSuccess',
      component: LoginSuccessView,
      props: (route): { code: LocationQueryValue | LocationQueryValue[] | undefined } => ({
        code: route.query.code,
      }),
    },
    {
      path: '/select-playlist',
      name: 'select-playlist',
      component: SelectPlaylistView,
    },
    {
      path: '/play',
      name: 'play',
      component: PlayView,
      props: (route): { playlist: LocationQueryValue | LocationQueryValue[] | undefined } => ({
        playlist: route.query.playlist,
      }),
    },
    {
      path: '/how-to-play',
      name: 'how-to-play',
      component: HowToPlayView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
