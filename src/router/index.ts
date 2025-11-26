import { createRouter, createWebHistory, type LocationQueryValue } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlayView from '@/views/PlayView.vue'
import LoginSuccessView from '@/views/LoginSuccessView.vue'
import SelectPlaylistView from '@/views/SelectPlaylistView.vue'
import SettingsView from '@/views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
      path: '/free-test',
      name: 'free-test',
      component: PlayView,
      props: (route): { playlist: LocationQueryValue | LocationQueryValue[] | undefined } => ({
        playlist: route.query.playlist,
      }),
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
  ],
})

export default router
