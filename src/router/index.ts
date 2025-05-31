import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue';
import PageLayout from "@/components/layouts/PageLayout.vue";
import LoginPageView from "@/views/LoginPageView.vue";
import RegisterView from "@/views/RegisterView.vue";
import { useAuthStore } from '@/stores/authStore';
import BooksView from '@/views/BooksView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: PageLayout,
      children: [
        { path: '', name: 'Home', component: HomeView },
        { path: '/books', name: 'Books', component: BooksView },
        { path: '/profile', name: 'Profile', component: ProfileView },
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPageView,
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
    }
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const token = authStore.jwt;

  if (authRequired) {
    if (!token) {
      return next('/login');
    }

      // const decodedToken: any = jwtDecode(token);
      // const currentTime = Math.floor(Date.now() / 1000);

      // if (decodedToken.iat < currentTime) {
      //   authStore.logout();
      //   return next('/login');
      // }
  }


  if (to.path === '/login' && token) {
    return next('/');
  }

  next();
});


export default router
