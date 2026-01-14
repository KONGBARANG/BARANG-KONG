<template>
  <div class="mart-kh-app">
    <header class="main-header">
      <div class="container header-flex">
        <div class="brand-section">
          <h1 class="logo-text" @click="router.push('/')">MART <span class="text-white">KH</span></h1>
          <nav class="sub-nav">
            <router-link to="/" class="nav-item" active-class="active">ទំព័រដើម</router-link>
            <router-link to="/about" class="nav-item" active-class="active">អំពីយើង</router-link>
            <router-link v-if="isAdmin === 'true'" to="/admin" class="nav-item admin-link" active-class="active">គ្រប់គ្រង</router-link>
          </nav>
        </div>

        <div class="search-section">
          <div class="search-pill">
            <input type="text" placeholder="ស្វែងរកទំនិញ..." />
            <span class="search-icon">🔍</span>
          </div>
        </div>

        <div class="auth-section">
          <template v-if="isLoggedIn">
            <div class="user-profile">
              <span class="email-tag">{{ userEmail }}</span>
              <div class="avatar shadow-sm">{{ userEmail.charAt(0).toUpperCase() }}</div>
              <button @click="handleLogout" class="btn-logout">ចាកចេញ</button>
            </div>
          </template>

          <div v-else class="login-group">
            <router-link to="/login" class="link-login">Login</router-link>
            <router-link to="/admin-login" class="btn-admin-login">Admin Login</router-link>
          </div>
          
          <div class="cart-icon-btn">
            <span class="emoji">🛒</span>
          </div>
        </div>
      </div>
    </header>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="main-footer">
      <div class="container footer-grid">
        <div class="footer-about">
          <h3>MART KH</h3>
          <p>យើងផ្គត់ផ្គង់បន្លែ និងផ្លែឈើធម្មជាតិដ៏ស្រស់បំព្រងសម្រាប់គ្រួសារអ្នក។</p>
        </div>
        <div class="footer-links">
          <h4>ព័ត៌មាន</h4>
          <ul>
            <li><a href="#">សេវាកម្មដឹកជញ្ជូន</a></li>
            <li><a href="#">គោលការណ៍ឯកជនភាព</a></li>
          </ul>
        </div>
        <div class="footer-contact">
          <h4>ទំនាក់ទំនង</h4>
          <p>📞 +855 12 345 678</p>
          <p>📧 support@martkh.com</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 MART KH. រក្សាសិទ្ធិគ្រប់យ៉ាង។</p>
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
const isAdmin = ref('false'); // បន្ថែមសម្រាប់ឆែកមើលសិទ្ធិក្នុង Template
const userEmail = ref('');

const checkAuth = () => {
  const email = localStorage.getItem('currentUserEmail');
  const adminStatus = localStorage.getItem('isAdmin');
  
  if (email) {
    isLoggedIn.value = true;
    userEmail.value = email;
    isAdmin.value = adminStatus;
  } else {
    isLoggedIn.value = false;
    isAdmin.value = 'false';
  }
};

const handleLogout = () => {
  if (confirm('តើអ្នកចង់ចាកចេញមែនទេ?')) {
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('isAdmin');
    checkAuth();
    router.push('/login');
  }
};

watch(() => route.path, checkAuth);
onMounted(checkAuth);
</script>

<style scoped>
/* រក្សារចនាប័ទ្មដដែល គ្រាន់តែបន្ថែមស្ទីលសម្រាប់ Link Admin តិចតួច */
.admin-link {
  color: #f1c40f !important; /* ពណ៌លឿងមាសសម្រាប់ Admin */
  font-weight: bold;
}

/* ... រក្សា Style ផ្សេងៗរបស់អ្នកទាំងអស់ ... */
.main-header { 
  background: #2c3e50; 
  padding: 12px 0; 
  color: white; 
  position: sticky; 
  top: 0; 
  z-index: 1000; 
  box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
}
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
.header-flex { display: flex; align-items: center; justify-content: space-between; }
.brand-section { display: flex; align-items: center; gap: 20px; }
.logo-text { color: #2ecc71; font-weight: 900; cursor: pointer; margin: 0; }
.text-white { color: white; }
.sub-nav { display: flex; gap: 15px; }
.nav-item { color: #bdc3c7; text-decoration: none; font-size: 0.85rem; }
.nav-item.active { color: #2ecc71; font-weight: bold; }
.search-pill { background: rgba(255,255,255,0.1); border-radius: 20px; padding: 5px 15px; display: flex; align-items: center; width: 300px; }
.search-pill input { background: transparent; border: none; color: white; outline: none; width: 100%; }
.login-group { display: flex; align-items: center; gap: 15px; }
.link-login { color: white; text-decoration: none; font-size: 0.9rem; }
.btn-admin-login { background: #e67e22; color: white; padding: 6px 15px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 0.85rem; }
.user-profile { display: flex; align-items: center; gap: 10px; background: rgba(0,0,0,0.2); padding: 4px 12px; border-radius: 20px; }
.email-tag { background: white; color: #333; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; }
.avatar { width: 30px; height: 30px; background: #3498db; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; }
.btn-logout { background: transparent; border: 1px solid #ff7675; color: #ff7675; border-radius: 4px; padding: 2px 8px; cursor: pointer; font-size: 0.7rem; }
.main-footer { background: #1a252f; color: #bdc3c7; padding: 60px 0 20px; margin-top: 40px; }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; }
.footer-about h3 { color: #2ecc71; margin-bottom: 20px; }
.footer-links h4, .footer-contact h4 { color: white; margin-bottom: 20px; }
.footer-links ul { list-style: none; padding: 0; }
.footer-links a { color: #bdc3c7; text-decoration: none; line-height: 2; font-size: 0.9rem; }
.footer-bottom { text-align: center; border-top: 1px solid rgba(255,255,255,0.05); margin-top: 40px; padding-top: 20px; font-size: 0.8rem; }
</style>