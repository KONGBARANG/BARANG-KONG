import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Admin from '../views/Admin.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import UserAccount from '../views/UserAccount.vue';
import AdminLogin from '../views/AdminLogin.vue'; 
import Cart from '../views/Cart.vue'; // ១. Import ទំព័រ Cart ថ្មី

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/admin-login', name: 'AdminLogin', component: AdminLogin },
  
  // ២. បន្ថែម Route សម្រាប់ទំព័រកន្ត្រកទំនិញ និងការបង់ប្រាក់
  { 
    path: '/cart', 
    name: 'Cart', 
    component: Cart 
  },

  { 
    path: '/user-account', 
    name: 'UserAccount', 
    component: UserAccount,
    beforeEnter: (to, from, next) => {
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
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;