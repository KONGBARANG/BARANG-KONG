<template>
  <div class="mart-kh-app">
    <header class="main-header">
      <div class="header-container header-flex">
        <div class="brand-section">
          <div class="logo-wrapper" @click="router.push('/')">
            <h1 class="logo-text">MART <span>KH</span></h1>
            <div class="logo-dot"></div>
          </div>
          
          <nav v-if="isAdmin === 'true'" class="admin-nav desktop-only">
            <router-link to="/admin" class="nav-item">
              <span class="icon">📋</span> គ្រប់គ្រងទំនិញ
            </router-link>
            <router-link to="/admin" class="nav-item highlight">
              <span class="icon">✨</span> បន្ថែមថ្មី
            </router-link>
          </nav>
        </div>

        <div class="header-actions">
          <div v-if="isLoggedIn && isAdmin !== 'true'" class="promo-badge desktop-only">
            <span class="gift-icon">🎁</span>
            <span class="promo-text">បញ្ចុះតម្លៃ 5% ជូនអ្នកជានិច្ច!</span>
          </div>

          <div v-if="!isLoggedIn" class="auth-group">
            <router-link to="/login" class="btn-minimal">ចូលប្រើ</router-link>
            <router-link to="/admin-login" class="btn-primary-sm">Admin</router-link>
          </div>

          <div v-else class="user-profile">
            <div class="user-info desktop-only">
              <p class="u-email">{{ userEmail }}</p>
              <p class="u-badge" :class="{ 'admin-text': isAdmin === 'true' }">
                {{ isAdmin === 'true' ? 'ADMINISTRATOR' : 'CUSTOMER MEMBER' }}
              </p>
            </div>
            <div class="avatar-circle">
              {{ userEmail.charAt(0).toUpperCase() }}
              <div class="status-indicator"></div>
            </div>
            <button @click="handleLogout" class="btn-logout" title="ចាកចេញ">
              <span class="logout-icon">🚪</span>
            </button>
          </div>
          
          <div v-if="isAdmin !== 'true'" class="cart-box" @click="router.push('/cart')">
            <div class="cart-wrapper">
              <span class="cart-emoji">🛒</span>
              <transition name="pop">
                <span v-if="cartCount > 0" class="badge-count">{{ cartCount }}</span>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="content-area">
      <router-view v-slot="{ Component }">
        <transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="site-footer">
      <div class="footer-top">
        <div class="footer-grid container">
          <div class="footer-brand">
            <h2 class="f-logo">MART <span>KH</span></h2>
            <p class="f-desc">យើងនាំមកជូននូវផលិតផលធម្មជាតិស្រស់ៗ ល្អបំផុតសម្រាប់សុខភាព និងការរស់នៅប្រកបដោយភាពរីករាយ។</p>
            <div class="social-icons">
              <span class="s-icon">🔵</span> <span class="s-icon">🔴</span> <span class="s-icon">🟣</span>
            </div>
          </div>
          
          <div class="footer-links">
            <h3>សេវាកម្ម</h3>
            <ul>
              <li>ដឹកជញ្ជូនរហ័ស</li>
              <li>ធានាគុណភាព</li>
              <li>សមាជិក VIP</li>
              <li>ជំនួយអតិថិជន</li>
            </ul>
          </div>

          <div class="footer-contact">
            <h3>ទំនាក់ទំនង</h3>
            <p>📞 +855 12 345 678</p>
            <p>📧 support@martkh.com</p>
            <p>📍 ភ្នំពេញ, ប្រទេសកម្ពុជា</p>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 MART KH. រក្សាសិទ្ធិគ្រប់យ៉ាងដោយក្តីស្រឡាញ់។</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const isLoggedIn = ref(false);
const userEmail = ref('');
const cartCount = ref(0);
const isAdmin = ref('false');

const checkAuth = () => {
  const email = localStorage.getItem('currentUserEmail');
  const adminStatus = localStorage.getItem('isAdmin');
  
  // ១. បង្កើត Key សម្រាប់រក្សាកន្ត្រកទំនិញតាម Account នីមួយៗ
  const cartKey = email ? `cart_${email}` : 'mart_cart';
  const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
  
  // ២. គណនាចំនួនទំនិញសរុបដែលមានក្នុងអាខោនដែលកំពុង Login
  cartCount.value = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  isAdmin.value = String(adminStatus);

  if (email) {
    isLoggedIn.value = true;
    userEmail.value = email;
  } else {
    isLoggedIn.value = false;
    userEmail.value = '';
    isAdmin.value = 'false';
  }
};

const handleLogout = () => {
  // បិទផ្ទាំង Alert បញ្ជាក់ការចាកចេញ ដើម្បីឱ្យ Logout ភ្លាមៗ
  localStorage.removeItem('currentUserEmail');
  localStorage.removeItem('isAdmin');
  checkAuth();
  router.push('/login');
};

watch(() => route.path, checkAuth);

onMounted(() => {
  checkAuth();
  window.addEventListener('storage', checkAuth);
  window.addEventListener('cart-updated', checkAuth);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;700&display=swap');

.mart-kh-app {
  font-family: 'Kantumruy Pro', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
}

.main-header {
  background: rgba(30, 41, 59, 0.98);
  backdrop-filter: blur(10px);
  color: white;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
}

.header-flex { display: flex; align-items: center; justify-content: space-between; }

.brand-section { display: flex; align-items: center; gap: 2rem; cursor: pointer; }
.logo-text { font-size: 1.6rem; font-weight: 800; color: #2ecc71; margin: 0; }
.logo-text span { color: white; }
.logo-dot { width: 6px; height: 6px; background: #2ecc71; border-radius: 50%; margin-left: 4px; }

.admin-nav { display: flex; gap: 1rem; }
.nav-item { color: #cbd5e1; text-decoration: none; font-size: 0.9rem; padding: 0.5rem 0.8rem; border-radius: 8px; transition: 0.3s; }
.nav-item:hover { background: rgba(255, 255, 255, 0.1); color: white; }
.highlight { color: #f1c40f !important; font-weight: bold; }

.header-actions { display: flex; align-items: center; gap: 1.5rem; }

.promo-badge {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
  animation: float 3s ease-in-out infinite;
}

.user-profile { display: flex; align-items: center; gap: 1.2rem; background: rgba(255, 255, 255, 0.05); padding: 5px 15px; border-radius: 50px; }
.avatar-circle { 
  width: 38px; height: 38px; background: #3498db; 
  border-radius: 50%; display: flex; align-items: center; 
  justify-content: center; font-weight: bold; position: relative;
  border: 2px solid rgba(255,255,255,0.2); 
}

.status-indicator { 
  width: 12px; height: 12px; background: #2ecc71; 
  border-radius: 50%; position: absolute; bottom: -1px; right: -1px; 
  border: 2px solid #1e293b; 
}

.u-email { font-size: 0.75rem; color: #94a3b8; margin: 0; line-height: 1; }
.u-badge { font-size: 0.65rem; font-weight: bold; margin: 0; text-transform: uppercase; }

.admin-text { color: #f1c40f !important; }

.cart-box { 
  background: rgba(255, 255, 255, 0.1); 
  padding: 10px; border-radius: 12px; 
  cursor: pointer; transition: 0.3s; 
  position: relative;
}

.badge-count { 
  position: absolute; top: -8px; right: -8px; 
  background: #ff4757; color: white; font-size: 0.7rem; 
  font-weight: 800; min-width: 20px; height: 20px; 
  border-radius: 50%; display: flex; align-items: center; 
  justify-content: center; border: 2px solid #1e293b;
  box-shadow: 0 3px 6px rgba(0,0,0,0.3);
}

.btn-logout {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 5px;
  display: flex;
  align-items: center;
}

.site-footer { background: #0f172a; color: #f8fafc; padding-top: 4rem; margin-top: auto; }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 4rem; max-width: 1200px; margin: 0 auto; padding: 0 1.5rem 3rem; }
.f-logo { font-size: 1.8rem; font-weight: 900; color: #2ecc71; margin-bottom: 1rem; }
.f-logo span { color: white; }

@media (max-width: 900px) {
  .footer-grid { grid-template-columns: 1fr; text-align: center; gap: 2.5rem; }
  .desktop-only { display: none; }
}
</style>