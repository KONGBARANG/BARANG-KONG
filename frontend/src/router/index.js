import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Admin from '../views/Admin.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import UserAccount from '../views/UserAccount.vue';
import AdminLogin from '../views/AdminLogin.vue'; 

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/admin-login', name: 'AdminLogin', component: AdminLogin },

  { 
    path: '/user-account', 
    name: 'UserAccount', 
    component: UserAccount,
    beforeEnter: (to, from, next) => {
      // ប្រើ 'currentUserEmail' ឱ្យដូចគ្នាទៅនឹង App.vue និង Login.vue
      const userEmail = localStorage.getItem('currentUserEmail');
      if (userEmail) {
        next();
      } else {
        next('/login');
      }
    }
  },
  { 
    path: '/admin', 
    name: 'Admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      const isAdmin = localStorage.getItem('isAdmin');
      const userEmail = localStorage.getItem('currentUserEmail');
      const ADMIN_EMAIL = 'barangmartkhadmin@mart.com'; 

      // ឆែកមើលសិទ្ធិ Admin
      if (isAdmin === 'true' && userEmail === ADMIN_EMAIL) {
        next();
      } else {
        alert("អ្នកមិនមានសិទ្ធិចូលកាន់ទំព័រ Admin ទេ!");
        next('/admin-login'); 
      }
    }
  },
  // បើវាយ URL ខុស ឱ្យត្រឡប់ទៅ Home
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;