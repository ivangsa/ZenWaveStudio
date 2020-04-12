import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Settings from '@/views/settings/Settings.vue';
import About from '@/views/about/About.vue';
import { routes as ProjectRoutes } from './ProjectRoutes';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  ...ProjectRoutes,
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
];

const router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
