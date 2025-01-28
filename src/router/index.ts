import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DomainPageView from '@/views/DomainPageView.vue'
import DomainEditPageView from '@/views/DomainEditPageView.vue'
import NotFoundView from '@/views/NotFoundView.vue';
import PageLayout from "@/components/layouts/PageLayout.vue";
import LoginPageView from "@/views/LoginPageView.vue";
import { useAuthStore } from '@/stores/authStore';
import { jwtDecode } from 'jwt-decode';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: PageLayout,
      children: [
        { path: '', name: 'Home', component: HomeView },
        { path: '/domain-tables/:id/', name: 'domain', component: DomainPageView },
        { path: '/domain-tables/:id/edit', name: 'DomainEditPage', component: DomainEditPageView },
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPageView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const token = authStore.jwt;

  if (authRequired) {
    if (!token) {
      return next('/login');
    }

      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.iat < currentTime) {
        authStore.logout();
        return next('/login');
      }
  }


  if (to.path === '/login' && token) {
    return next('/');
  }

  next();
});


export default router
