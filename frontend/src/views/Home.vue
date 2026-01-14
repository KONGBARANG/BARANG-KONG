<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const isAdmin = computed(() => localStorage.getItem('isAdmin') === 'true');
const currentUser = ref(localStorage.getItem('currentUserEmail'));
const products = ref([]);
const searchQuery = ref('');
const showEditModal = ref(false);
const editingItem = ref({});

const loadProducts = () => {
  const saved = localStorage.getItem('mart_products');
  if (saved) {
    products.value = JSON.parse(saved);
  }
};

// បន្ថែមមុខងារ Check User ពេលមានការផ្លាស់ប្តូរ (Login/Logout)
const checkUser = () => {
  currentUser.value = localStorage.getItem('currentUserEmail');
};

onMounted(() => {
  loadProducts();
  window.addEventListener('storage', () => {
    loadProducts();
    checkUser();
  });
});

onUnmounted(() => {
  window.removeEventListener('storage', loadProducts);
});

const filteredProducts = computed(() => {
  return products.value.filter(p => 
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const addToCart = (product) => {
  if (!currentUser.value) {
    alert('សូមចូលប្រើប្រាស់គណនីជាមុនសិន!');
    return;
  }

  // កែប្រែទីនេះ៖ ប្រើ Key តាម Email អាខោននីមួយៗ
  const cartKey = `cart_${currentUser.value}`;
  let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
  
  const index = cart.findIndex(i => i.id === product.id);
  if (index !== -1) {
    cart[index].quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  
  // បាញ់ Signal ទៅ App.vue ឱ្យ Update ចំនួនក្នុងកន្ត្រក
  window.dispatchEvent(new Event('cart-updated'));
  
  // បិទ Alert រំខានត្រង់នេះតាមការចង់បានរបស់អ្នក
  // alert(`✅ បន្ថែម ${product.name} រួចរាល់!`);
};

// Admin Functions
const openEditModal = (item) => {
  editingItem.value = { ...item };
  showEditModal.value = true;
};

const saveChanges = () => {
  const idx = products.value.findIndex(p => p.id === editingItem.value.id);
  if (idx !== -1) {
    products.value[idx] = { ...editingItem.value };
    localStorage.setItem('mart_products', JSON.stringify(products.value));
    showEditModal.value = false;
  }
};

const deleteProduct = (id) => {
  if (confirm('តើអ្នកពិតជាចង់លុបទំនិញនេះមែនទេ?')) {
    products.value = products.value.filter(p => p.id !== id);
    localStorage.setItem('mart_products', JSON.stringify(products.value));
  }
};
</script>

<template>
  <div class="home-page">
    <section class="container">
      <div class="hero-card">
        <div class="hero-text">
          <h1>{{ isAdmin ? 'Welcome Admin' : 'MART KH - ធម្មជាតិស្រស់ៗ' }}</h1>
          <p>យើងផ្តល់ជូននូវបន្លែ និងផ្លែឈើដែលល្អបំផុតសម្រាប់សុខភាពលោកអ្នក។</p>
          <button v-if="!isAdmin" class="btn-main">ទិញឥឡូវនេះ</button>
        </div>
        <div class="hero-icon">🌿</div>
      </div>
    </section>

    <section class="container search-area">
      <div class="search-box">
        <i class="icon-search">🔍</i>
        <input v-model="searchQuery" type="text" placeholder="ស្វែងរកទំនិញ..." />
      </div>
    </section>

    <section class="container content-section">
      <div class="section-title">
        <h3>ទំនិញថ្មីៗក្នុងថ្ងៃនេះ</h3>
        <div class="line"></div>
      </div>

      <div class="product-grid">
        <div v-for="item in filteredProducts" :key="item.id" class="item-card">
          <div class="item-img">
            <img :src="item.image || 'https://via.placeholder.com/200'" :alt="item.name" />
            <div class="tag">ថ្មី</div>
            
            <div v-if="isAdmin" class="admin-tools">
              <button class="btn-tool edit" @click="openEditModal(item)">✎</button>
              <button class="btn-tool del" @click="deleteProduct(item.id)">✕</button>
            </div>
          </div>

          <div class="item-info">
            <h4 class="name">{{ item.name }}</h4>
            <p class="stock">នៅសល់ក្នុងស្តុក: {{ item.stock }}</p>
            <div class="price-row">
              <span class="price">${{ item.price.toFixed(2) }}</span>
              <button v-if="!isAdmin" class="btn-add" @click="addToCart(item)">+</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div v-if="showEditModal" class="modal-overlay" @click.self="showEditModal = false">
      <div class="modal-box">
        <h3>កែសម្រួលទំនិញ</h3>
        <input v-model="editingItem.name" type="text" placeholder="ឈ្មោះ" />
        <input v-model.number="editingItem.price" type="number" placeholder="តម្លៃ" />
        <input v-model.number="editingItem.stock" type="number" placeholder="ស្តុក" />
        <div class="modal-actions">
          <button class="btn-save" @click="saveChanges">រក្សាទុក</button>
          <button class="btn-close" @click="showEditModal = false">បិទ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container { max-width: 1000px; margin: 0 auto; padding: 0 20px; }

.hero-card {
  background: #2ecc71;
  border-radius: 25px;
  padding: 40px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  box-shadow: 0 10px 30px rgba(46, 204, 113, 0.2);
}
.hero-text h1 { font-size: 2rem; margin-bottom: 10px; }
.hero-icon { font-size: 4rem; opacity: 0.3; }
.btn-main { background: white; color: #2ecc71; border: none; padding: 10px 20px; border-radius: 10px; font-weight: bold; cursor: pointer; }

.search-area { margin-top: 25px; }
.search-box { position: relative; max-width: 400px; }
.search-box input { width: 100%; padding: 12px 15px 12px 40px; border-radius: 12px; border: 1px solid #ddd; outline: none; }
.icon-search { position: absolute; left: 15px; top: 12px; }

.section-title { margin: 30px 0 20px; }
.section-title h3 { font-size: 1.2rem; margin-bottom: 5px; }
.line { width: 40px; height: 3px; background: #2ecc71; }

.product-grid { 
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); 
  gap: 20px; 
}

.item-card { 
  background: white; 
  border-radius: 15px; 
  overflow: hidden; 
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  transition: 0.3s;
}
.item-card:hover { transform: translateY(-5px); }

.item-img { height: 180px; position: relative; background: #f9f9f9; }
.item-img img { width: 100%; height: 100%; object-fit: cover; }
.tag { position: absolute; top: 10px; left: 10px; background: #e74c3c; color: white; padding: 2px 8px; border-radius: 5px; font-size: 0.7rem; }

.item-info { padding: 15px; }
.name { font-size: 1rem; color: #333; margin-bottom: 5px; }
.stock { font-size: 0.8rem; color: #888; margin-bottom: 10px; }
.price-row { display: flex; justify-content: space-between; align-items: center; }
.price { font-weight: bold; color: #2ecc71; font-size: 1.1rem; }

.btn-add { background: #2ecc71; color: white; border: none; width: 30px; height: 30px; border-radius: 8px; cursor: pointer; }

.admin-tools { position: absolute; top: 0; right: 0; padding: 10px; display: flex; gap: 5px; opacity: 0; transition: 0.3s; }
.item-card:hover .admin-tools { opacity: 1; }
.btn-tool { width: 25px; height: 25px; border-radius: 5px; border: none; color: white; cursor: pointer; font-size: 0.8rem; }
.edit { background: #3498db; }
.del { background: #e74c3c; }

.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 100; }
.modal-box { background: white; padding: 20px; border-radius: 15px; width: 300px; display: flex; flex-direction: column; gap: 10px; }
.modal-box input { padding: 10px; border: 1px solid #ddd; border-radius: 8px; }
.btn-save { background: #2ecc71; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; }
.btn-close { background: #eee; border: none; padding: 10px; border-radius: 8px; cursor: pointer; }

@media (max-width: 600px) {
  .hero-card { padding: 20px; flex-direction: column; text-align: center; }
  .hero-icon { display: none; }
  .product-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
}
</style>