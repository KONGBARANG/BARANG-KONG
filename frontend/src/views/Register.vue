<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// State សម្រាប់ទិន្នន័យ Form
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const errorMsg = ref('');
const router = useRouter();

const handleRegister = () => {
  errorMsg.value = '';
  
  // ១. លក្ខខណ្ឌត្រួតពិនិត្យ (Validation)
  if (password.value !== confirmPassword.value) {
    errorMsg.value = "❌ លេខសម្ងាត់មិនស៊ីគ្នាទេ! សូមពិនិត្យឡើងវិញ។";
    return;
  }

  if (password.value.length < 6) {
    errorMsg.value = "⚠️ លេខសម្ងាត់ត្រូវមានយ៉ាងតិច ៦ ខ្ង់។";
    return;
  }

  loading.value = true;

  // បន្ថែមការ Delay បន្តិចដើម្បីភាពរលូន (UX)
  setTimeout(() => {
    // ២. ទាញយកបញ្ជី User ទាំងអស់ពី localStorage (ប្រើ Key 'all_users' ជា Array)
    // នេះជាគន្លឹះដើម្បីឱ្យ Account នៅជាប់រហូត 
    const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
    
    // ៣. ពិនិត្យមើលថា តើអ៊ីមែលនេះមានអ្នកប្រើរួចហើយឬនៅ?
    const isExist = allUsers.some(u => u.email.toLowerCase() === email.value.toLowerCase().trim());
    if (isExist) {
      errorMsg.value = "⚠️ អ៊ីមែលនេះមានក្នុងប្រព័ន្ធរួចហើយ! សូមប្រើអ៊ីមែលផ្សេង។";
      loading.value = false;
      return;
    }

    // ៤. បង្កើត Object User ថ្មី និងរក្សាទុកចូលក្នុង Array
    const newUser = {
      id: Date.now(),
      email: email.value.toLowerCase().trim(),
      password: password.value,
      isAdmin: false,
      createdAt: new Date().toISOString()
    };

    allUsers.push(newUser);
    localStorage.setItem('all_users', JSON.stringify(allUsers));

    loading.value = false;
    
    // ៥. បង្ហាញសារជោគជ័យ និងបញ្ជូនទៅទំព័រ Login
    alert("✅ ចុះឈ្មោះជោគជ័យ! លោកអ្នកអាចប្រើប្រាស់គណនីនេះបានរហូត។");
    router.push('/login');
  }, 1000);
};
</script>

<template>
  <div class="register-wrapper">
    <div class="glass-container">
      <div class="brand-section">
        <div class="overlay"></div>
        <div class="brand-content">
          <h1>MART KH</h1>
          <p>ប្រភពបន្លែ ផ្លែឈើធម្មជាតិ ស្រស់ៗជារៀងរាល់ថ្ងៃ សម្រាប់សុខភាពគ្រួសារលោកអ្នក។</p>
          <div class="feature-tag">បញ្ចុះតម្លៃ ៥% សម្រាប់ការទិញលើកដំបូង</div>
        </div>
      </div>

      <div class="form-section">
        <div class="form-card">
          <div class="form-header">
            <h2>បង្កើតគណនីថ្មី</h2>
            <p>សូមបំពេញព័ត៌មានឱ្យបានត្រឹមត្រូវ</p>
          </div>

          <form @submit.prevent="handleRegister" class="auth-form">
            <Transition name="fade">
              <div v-if="errorMsg" class="error-alert">
                {{ errorMsg }}
              </div>
            </Transition>

            <div class="input-group">
              <label><i class="fas fa-envelope"></i> អ៊ីមែល</label>
              <input 
                v-model="email" 
                type="email" 
                placeholder="ឧទាហរណ៍: user@gmail.com" 
                required 
              />
            </div>

            <div class="input-grid">
              <div class="input-group">
                <label><i class="fas fa-lock"></i> លេខសម្ងាត់</label>
                <input 
                  v-model="password" 
                  type="password" 
                  placeholder="យ៉ាងតិច ៦ ខ្ទង់" 
                  required 
                />
              </div>
              <div class="input-group">
                <label><i class="fas fa-check-circle"></i> បញ្ជាក់លេខសម្ងាត់</label>
                <input 
                  v-model="confirmPassword" 
                  type="password" 
                  placeholder="វាយម្តងទៀត" 
                  required 
                />
              </div>
            </div>

            <button type="submit" class="submit-btn" :disabled="loading">
              <span v-if="!loading">យល់ព្រមចុះឈ្មោះ</span>
              <div v-else class="spinner"></div>
            </button>
          </form>

          <div class="switch-mode">
            <span>មានគណនីរួចហើយ? </span>
            <router-link to="/login">ចូលប្រើប្រាស់វិញ</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* --- រចនាបទរួម (Layout) --- */
.register-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f7f6;
  padding: 20px;
  font-family: 'Kantumruy Pro', sans-serif;
}

.glass-container {
  display: flex;
  width: 100%;
  max-width: 1000px;
  min-height: 600px;
  background: #ffffff;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
}

/* --- ផ្នែក Banner --- */
.brand-section {
  flex: 1;
  position: relative;
  background-image: url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  padding: 40px;
  color: white;
}

.overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(135deg, rgba(46, 204, 113, 0.9) 0%, rgba(27, 94, 32, 0.8) 100%);
}

.brand-content { position: relative; z-index: 2; }
.brand-content h1 { font-size: 3.5rem; font-weight: 900; margin-bottom: 20px; letter-spacing: 2px; }
.brand-content p { font-size: 1.1rem; line-height: 1.6; opacity: 0.9; margin-bottom: 30px; }
.feature-tag { display: inline-block; padding: 8px 20px; background: rgba(255,255,255,0.2); border-radius: 50px; border: 1px solid rgba(255,255,255,0.4); font-weight: bold; }

/* --- ផ្នែក Form --- */
.form-section {
  flex: 1.2;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 40px;
}

.form-card { width: 100%; max-width: 450px; }
.form-header { margin-bottom: 35px; }
.form-header h2 { font-size: 2rem; color: #1a1a1a; font-weight: 800; margin-bottom: 8px; }
.form-header p { color: #7f8c8d; font-size: 0.95rem; }

/* --- Input Styles --- */
.input-group { margin-bottom: 20px; }
.input-group label { display: block; margin-bottom: 8px; font-weight: 700; color: #34495e; font-size: 0.9rem; }
.input-group input {
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #f1f3f5;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.input-group input:focus {
  border-color: #2ecc71;
  outline: none;
  background: #fff;
  box-shadow: 0 8px 20px rgba(46, 204, 113, 0.1);
  transform: translateY(-2px);
}

.input-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

/* --- Button & Loader --- */
.submit-btn {
  width: 100%;
  height: 55px;
  background: #1a1a1a;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}

.submit-btn:hover:not(:disabled) { background: #2ecc71; transform: translateY(-3px); box-shadow: 0 10px 20px rgba(46, 204, 113, 0.2); }
.submit-btn:disabled { background: #bdc3c7; cursor: not-allowed; }

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* --- Alert & Links --- */
.error-alert { padding: 12px; background: #fff5f5; color: #e53e3e; border-radius: 10px; margin-bottom: 20px; font-size: 0.9rem; border: 1px solid #fed7d7; text-align: center; }
.switch-mode { margin-top: 30px; text-align: center; color: #7f8c8d; font-size: 0.95rem; }
.switch-mode a { color: #2ecc71; text-decoration: none; font-weight: 800; margin-left: 5px; }

/* --- Responsive (ទូរសព្ទ) --- */
@media (max-width: 900px) {
  .brand-section { display: none; }
  .glass-container { max-width: 500px; border-radius: 20px; }
  .form-section { padding: 30px; }
}

@media (max-width: 480px) {
  .input-grid { grid-template-columns: 1fr; gap: 0; }
  .form-header h2 { font-size: 1.6rem; }
}
</style>