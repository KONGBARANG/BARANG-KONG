<template>
  <div class="account-container">
    <transition name="fade-up" appear>
      <div class="account-card shadow-lg">
        <div class="profile-section">
          <div class="avatar-circle">
            {{ userInitial }}
          </div>
          <h2 class="title-kh">គណនីរបស់ខ្ញុំ</h2>
          <div class="badge-wrapper">
            <span class="status-badge" :class="{ 'admin-tag': isAdmin }">
              {{ isAdmin ? '🛡️ អ្នកគ្រប់គ្រង (Admin)' : '👤 សមាជិកទូទៅ' }}
            </span>
          </div>
        </div>

        <div class="info-list">
          <div class="info-item">
            <label class="label-kh">📧 អ៊ីមែលបច្ចុប្បន្ន</label>
            <div class="value-box">
              <span class="text-truncate">{{ displayEmail }}</span>
              <span class="verified-icon">✔️</span>
            </div>
          </div>
          
          <div class="info-item">
            <label class="label-kh">🛡️ ស្ថានភាពសុវត្ថិភាព</label>
            <div class="value-box">គណនីបានផ្ទៀងផ្ទាត់រួចរាល់</div>
          </div>

          <div class="info-item" v-if="!isAdmin">
            <label class="label-kh">🎁 អត្ថប្រយោជន៍សមាជិក</label>
            <div class="value-box discount-text">
              ✨ បញ្ចុះតម្លៃ 5% លើរាល់ទំនិញទាំងអស់
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <button @click="router.push('/')" class="btn-home">🏠 ត្រឡប់ទៅទំព័រដើម</button>
          <button @click="handleLogout" class="btn-logout">🚪 ចាកចេញពីគណនី</button>
        </div>

        <p class="footer-note">Mart KH - រក្សាសិទ្ធិគ្រប់យ៉ាង ២០២៦</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const displayEmail = ref('ភ្ញៀវ');
const isAdmin = ref(false);

onMounted(() => {
  const currentEmail = localStorage.getItem('currentUserEmail');
  const adminStatus = localStorage.getItem('isAdmin');

  if (currentEmail) {
    displayEmail.value = currentEmail;
    isAdmin.value = adminStatus === 'true';
  } else {
    router.push('/login');
  }
});

const userInitial = computed(() => {
  return displayEmail.value.charAt(0).toUpperCase();
});

const handleLogout = () => {
  if (confirm('តើអ្នកពិតជាចង់ចាកចេញមែនទេ?')) {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('currentUserEmail');
    // ប្រើការ redirect ធម្មតាដើម្បី clear state ក្នុង App.vue
    window.location.href = '/login';
  }
};
</script>

<style scoped>
.account-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f4f7f6; /* ពណ៌ background ស្រទន់ជាងមុន */
  font-family: 'Kantumruy Pro', 'Khmer OS Battambang', sans-serif;
  padding: 20px;
}

.account-card {
  background: white;
  width: 100%;
  max-width: 420px;
  padding: 35px;
  border-radius: 30px;
  text-align: center;
}

.title-kh {
  margin: 10px 0;
  color: #2c3e50;
  font-weight: 700;
}

.avatar-circle {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  font-size: 2.8rem;
  font-weight: 800;
  box-shadow: 0 10px 25px rgba(46, 204, 113, 0.3);
  border: 4px solid #fff;
}

.label-kh {
  display: block;
  text-align: left;
  font-size: 0.85rem;
  color: #7f8c8d;
  margin-bottom: 8px;
  margin-left: 5px;
}

.info-list {
  margin-bottom: 30px;
}

.info-item {
  margin-bottom: 20px;
}

.value-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  background: #f8fafc;
  border: 1px solid #edf2f7;
  border-radius: 16px;
  color: #2c3e50;
  font-weight: 600;
  font-size: 0.95rem;
}

.discount-text {
  color: #27ae60;
  background: #f0fff4;
  border-color: #c6f6d5;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-home {
  padding: 14px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s;
}

.btn-home:hover {
  background: #27ae60;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(46, 204, 113, 0.3);
}

.btn-logout {
  padding: 14px;
  background: #fff;
  color: #e74c3c;
  border: 2px solid #fff5f5;
  border-radius: 16px;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s;
}

.btn-logout:hover {
  background: #fff5f5;
  border-color: #feb2b2;
}

/* Animation */
.fade-up-enter-active { transition: all 0.6s ease-out; }
.fade-up-enter-from { opacity: 0; transform: translateY(40px); }

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>