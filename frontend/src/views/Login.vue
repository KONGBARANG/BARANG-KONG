<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMsg = ref('');
const router = useRouter();

const handleLogin = () => {
  errorMsg.value = '';
  loading.value = true;
  
  // ១. ព័ត៌មាន Admin ផ្តាច់មុខ
  const ADMIN_EMAIL = 'barangmartkhadmin@mart.com';
  const ADMIN_PASSWORD = '123456789mart';

  // ២. ទាញបញ្ជី User ទាំងអស់ពី Array ដើម្បីឱ្យ Account នៅជាប់រហូត
  const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');

  setTimeout(() => {
    const inputEmail = email.value.toLowerCase().trim();

    // ករណីទី១៖ ពិនិត្យថាជា Admin ឬអត់?
    if (inputEmail === ADMIN_EMAIL && password.value === ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('currentUserEmail', inputEmail);
      router.push('/admin').then(() => window.location.reload());
    } 
    
    // ករណីទី២៖ ស្វែងរកក្នុងបញ្ជី all_users (សម្រាប់សមាជិកធម្មតា)
    else {
      const foundUser = allUsers.find(u => 
        u.email.toLowerCase() === inputEmail && 
        u.password === password.value
      );

      if (foundUser) {
        localStorage.setItem('isAdmin', 'false');
        localStorage.setItem('currentUserEmail', foundUser.email);
        router.push('/').then(() => window.location.reload());
      } 
      // ករណីទី៣៖ បញ្ចូលខុស
      else {
        errorMsg.value = '❌ អ៊ីមែល ឬលេខសម្ងាត់មិនត្រឹមត្រូវ!';
      }
    }
    loading.value = false;
  }, 1000);
};
</script>

<template>
  <div class="login-wrapper">
    <div class="login-card animated-fade-in">
      <div class="login-header">
        <div class="logo-box">
          <div class="logo-circle">MK</div>
        </div>
        <h2>ស្វាគមន៍មកកាន់ MART KH</h2>
        <p class="subtitle">សូមបញ្ចូលព័ត៌មានដើម្បីចូលប្រើប្រាស់</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div v-if="errorMsg" class="alert-error">{{ errorMsg }}</div>

        <div class="input-field">
          <label>អ៊ីមែល</label>
          <div class="input-container">
            <span class="icon">📧</span>
            <input 
              v-model="email" 
              type="email" 
              placeholder="example@gmail.com" 
              required 
            />
          </div>
        </div>
        
        <div class="input-field">
          <label>លេខសម្ងាត់</label>
          <div class="input-container">
            <span class="icon">🔒</span>
            <input 
              v-model="password" 
              type="password" 
              placeholder="••••••••" 
              required 
            />
          </div>
        </div>

        <button type="submit" class="btn-submit" :disabled="loading">
          <span v-if="!loading">ចូលប្រើប្រាស់</span>
          <div v-else class="loader-white"></div>
        </button>
      </form>
      
      <div class="footer-action">
        <p>មិនទាន់មានគណនីមែនទេ?</p>
        <router-link to="/register" class="reg-link">បង្កើតគណនីឥឡូវនេះ</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* --- Layout រួម --- */
.login-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8fafc;
  font-family: 'Kantumruy Pro', sans-serif;
  padding: 20px;
}

/* --- Card Design --- */
.login-card {
  background: white;
  padding: 3rem 2.5rem;
  border-radius: 30px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.05);
  width: 100%;
  max-width: 420px;
  text-align: center;
  border: 1px solid #f1f5f9;
}

/* --- Logo --- */
.logo-box { display: flex; justify-content: center; margin-bottom: 1.5rem; }
.logo-circle {
  width: 70px; height: 70px;
  background: #2ecc71; /* ពណ៌បៃតងលក្ខណៈ Mart */
  color: white;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 900; font-size: 1.8rem;
  box-shadow: 0 10px 20px rgba(46, 204, 113, 0.2);
}

h2 { color: #1e293b; margin-bottom: 8px; font-weight: 800; font-size: 1.5rem; }
.subtitle { color: #64748b; font-size: 0.9rem; margin-bottom: 2.5rem; }

/* --- Inputs --- */
.input-field { text-align: left; margin-bottom: 1.5rem; }
.input-field label { display: block; margin-bottom: 8px; font-weight: 700; color: #475569; font-size: 0.85rem; }

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.icon { position: absolute; left: 15px; font-size: 1.1rem; }

input {
  width: 100%;
  padding: 14px 18px 14px 45px;
  border: 2px solid #f1f5f9;
  border-radius: 14px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8fafc;
}

input:focus {
  outline: none;
  border-color: #2ecc71;
  background: white;
  box-shadow: 0 0 0 4px rgba(46, 204, 113, 0.1);
}

/* --- Button & Loader --- */
.btn-submit {
  width: 100%;
  padding: 16px;
  background: #1e293b;
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex; justify-content: center; align-items: center;
  margin-top: 10px;
}

.btn-submit:hover:not(:disabled) {
  background: #2ecc71;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(46, 204, 113, 0.2);
}

.loader-white {
  width: 20px; height: 20px;
  border: 3px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* --- Alert & Footer --- */
.alert-error {
  background: #fff1f2; color: #e11d48;
  padding: 12px; border-radius: 12px;
  margin-bottom: 20px; font-size: 0.9rem;
  border: 1px solid #ffe4e6;
}

.footer-action { margin-top: 2rem; border-top: 1px solid #f1f5f9; padding-top: 1.5rem; }
.footer-action p { color: #94a3b8; font-size: 0.9rem; margin-bottom: 8px; }
.reg-link { color: #2ecc71; text-decoration: none; font-weight: 800; font-size: 0.95rem; }

/* --- Responsive --- */
@media (max-width: 480px) {
  .login-card { padding: 2rem 1.5rem; box-shadow: none; background: transparent; }
  .login-wrapper { background: white; }
}
</style>