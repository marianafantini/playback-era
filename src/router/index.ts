import {
  createRouter,
  createWebHistory,
  type LocationQueryValue,
} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PlayView from '@/views/PlayView.vue';
import SelectPlaylistView from '@/views/SelectPlaylistView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
      props: (
        route,
      ): {
        playlist: LocationQueryValue | LocationQueryValue[] | undefined;
      } => ({
        playlist: route.query.playlist,
      }),
    },
  ],
});

export default router;
