<template>
  <div class="login-container">
    <div class="login-card admin-theme">
      <div class="brand-logo">MK</div>
      
      <h2>ផ្ទាំងចូលគ្រប់គ្រង (Admin)</h2>
      <p class="subtitle">សូមបញ្ចូលព័ត៌មានអត្តសញ្ញាណអ្នកគ្រប់គ្រង</p>

      <form @submit.prevent="handleAdminLogin">
        <div class="input-group">
          <label><i class="fas fa-envelope-open-text"></i> អ៊ីមែល Admin:</label>
          <input 
            v-model="email" 
            type="email" 
            placeholder="បញ្ចូលអ៊ីមែល Admin" 
            required 
          />
        </div>

        <div class="input-group">
          <label><i class="fas fa-lock"></i> លេខសម្ងាត់:</label>
          <input 
            v-model="password" 
            type="password" 
            placeholder="បញ្ចូលលេខសម្ងាត់" 
            required 
          />
        </div>

        <button type="submit" class="btn-admin">ចូលគ្រប់គ្រង</button>
      </form>

      <div class="footer-links">
        <p>មិនមែនជាអ្នកគ្រប់គ្រងមែនទេ?</p>
        <router-link to="/login" class="back-link">ត្រឡប់ទៅ Login ធម្មតា</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const handleAdminLogin = () => {
  const ADMIN_EMAIL = 'barangmartkhadmin@mart.com';
  const ADMIN_PASSWORD = '123456789mart';

  if (email.value === ADMIN_EMAIL && password.value === ADMIN_PASSWORD) {
    localStorage.setItem('isAdmin', 'true');
    localStorage.setItem('userEmail', email.value);
    localStorage.setItem('currentUserEmail', email.value); // សម្រាប់ Sync ជាមួយ Header
    router.push('/').then(() => window.location.reload());
  } else {
    alert('គណនី Admin មិនត្រឹមត្រូវ!');
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  background-color: #f0f2f5; /* ពណ៌ប្រផេះស្រាលដូចក្នុងរូប */
  font-family: 'Khmer OS Battambang', sans-serif;
}

.login-card {
  background: white;
  padding: 50px 40px;
  border-radius: 25px; /* រាងមូលជាងមុន */
  box-shadow: 0 15px 35px rgba(0,0,0,0.08);
  width: 100%;
  max-width: 420px;
  text-align: center;
  border-top: 6px solid #e74c3c; /* ខ្សែបន្ទាត់ពណ៌ក្រហមសម្រាប់ Admin */
}

.brand-logo {
  width: 60px;
  height: 60px;
  background: #2c3e50;
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 24px;
  font-weight: 900;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

h2 {
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 22px;
  font-weight: 700;
}

.subtitle {
  color: #95a5a6;
  font-size: 14px;
  margin-bottom: 35px;
}

.input-group {
  text-align: left;
  margin-bottom: 22px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  color: #34495e;
  font-size: 14px;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 14px 18px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-sizing: border-box;
  font-size: 15px;
  background: #fdfdfd;
  transition: all 0.3s;
}

input:focus {
  border-color: #e74c3c;
  background: white;
  box-shadow: 0 0 0 4px rgba(231, 76, 60, 0.1);
  outline: none;
}

.btn-admin {
  width: 100%;
  padding: 15px;
  background: #2c3e50; /* ពណ៌ Navy ដូច User Login */
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  transition: 0.3s;
}

.btn-admin:hover {
  background: #e74c3c; /* ប្តូរជាពណ៌ក្រហមនៅពេល Hover */
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(231, 76, 60, 0.3);
}

.footer-links {
  margin-top: 25px;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.footer-links p {
  font-size: 13px;
  color: #7f8c8d;
  margin-bottom: 5px;
}

.back-link {
  color: #2ecc71;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  transition: 0.2s;
}

.back-link:hover {
  text-decoration: underline;
  color: #27ae60;
}
</style>