<template>
  <div class="home-page">
    <section class="hero-section container">
      <div class="green-banner">
        <div class="banner-content">
          <h2 class="welcome-text">{{ isAdmin === 'true' ? 'Welcome Admin' : 'MART KH - ធម្មជាតិស្រស់ៗ' }}</h2>
          <p>យើងផ្តល់ជូននូវបន្លែ និងផ្លែឈើដែលល្អបំផុតសម្រាប់សុខភាពលោកអ្នក។</p>
          <button class="shop-now-btn">ទិញឥឡូវនេះ</button>
        </div>
        <div class="banner-icon">🌿</div>
      </div>
    </section>

    <section class="products container">
      <div class="section-header">
        <h3>ទំនិញថ្មីៗក្នុងថ្ងៃនេះ</h3>
        <div class="green-line"></div>
      </div>

      <div v-if="filteredProducts.length === 0" class="no-products">
        <p>មិនមានទំនិញឡើយ។</p>
      </div>

      <div class="product-grid">
        <div v-for="item in filteredProducts" :key="item.id" class="p-card">
          <div class="image-box">
            <img v-if="item.image" :src="item.image" :alt="item.name" />
            <div v-else class="img-placeholder">🥦</div>
            <div class="badge-new">ថ្មី</div>
            
            <div v-if="isAdmin === 'true'" class="admin-overlay">
              <button class="action-btn edit" @click="openEditModal(item)">✎ កែ</button>
              <button class="action-btn delete" @click="deleteProduct(item.id)">✕ លុប</button>
            </div>
          </div>
          
          <div class="info-box">
            <h4 class="p-name">{{ item.name }}</h4>
            <p class="p-stock">នៅសល់ក្នុងស្តុក: {{ item.stock || 0 }}</p>
            <div class="p-footer">
              <span class="p-price">${{ item.price.toFixed(2) }}</span>
              <button v-if="isAdmin !== 'true'" class="add-btn" @click="addToCart(item)">+</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div v-if="showEditModal" class="modal-backdrop">
      <div class="edit-modal">
        <h3>កែសម្រួលព័ត៌មានទំនិញ</h3>
        <div class="input-field">
          <label>ឈ្មោះទំនិញ</label>
          <input v-model="editingItem.name" type="text" />
        </div>
        <div class="input-field">
          <label>តម្លៃ ($)</label>
          <input v-model.number="editingItem.price" type="number" step="0.01" />
        </div>
        <div class="input-field">
          <label>ចំនួនក្នុងស្តុក</label>
          <input v-model.number="editingItem.stock" type="number" />
        </div>
        <div class="modal-btns">
          <button class="btn-cancel" @click="showEditModal = false">បោះបង់</button>
          <button class="btn-save" @click="saveChanges">រក្សាទុក</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const isAdmin = ref(localStorage.getItem('isAdmin'));
const products = ref([]);
const searchQuery = ref('');
const showEditModal = ref(false);
const editingItem = ref({});

onMounted(() => {
  const saved = localStorage.getItem('mart_products');
  if (saved) {
    products.value = JSON.parse(saved);
  } else {
    products.value = [
      { id: 1, name: 'បន្លែស្រស់ចម្រុះ', price: 2.50, stock: 15, image: null },
      { id: 2, name: 'ផ្លែប៉ោមក្រហម', price: 3.00, stock: 10, image: null },
      { id: 3, name: 'ការ៉ុតធម្មជាតិ', price: 1.20, stock: 20, image: null },
      { id: 4, name: 'កាហ្វេឡាតេ', price: 10.00, stock: 0, image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=1000' }
    ];
    localStorage.setItem('mart_products', JSON.stringify(products.value));
  }
});

const filteredProducts = computed(() => {
  return products.value.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

// Admin Functions
const openEditModal = (item) => {
  editingItem.value = { ...item };
  showEditModal.value = true;
};

const saveChanges = () => {
  const idx = products.value.findIndex(p => p.id === editingItem.value.id);
  if (idx !== -1) {
    products.value[idx] = editingItem.value;
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

const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem('mart_cart') || '[]');
  const index = cart.findIndex(i => i.id === product.id);
  index !== -1 ? cart[index].quantity++ : cart.push({ ...product, quantity: 1 });
  localStorage.setItem('mart_cart', JSON.stringify(cart));
  alert(`បានបញ្ចូល ${product.name} ទៅក្នុងកន្ត្រក!`);
  window.location.reload();
};
</script>

<style scoped>
.container { max-width: 1250px; margin: 0 auto; padding: 20px; }

/* Banner */
.green-banner { 
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%); 
  border-radius: 24px; padding: 60px; color: white; 
  display: flex; justify-content: space-between; align-items: center;
  box-shadow: 0 10px 30px rgba(46,204,113,0.3);
}
.welcome-text { font-size: 2.2rem; font-weight: 800; }
.shop-now-btn { background: white; color: #27ae60; border: none; padding: 12px 25px; border-radius: 12px; font-weight: bold; cursor: pointer; margin-top: 20px; }

/* Product Grid & Card */
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 25px; }
.p-card { background: white; border-radius: 18px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.05); transition: 0.3s; border: 1px solid #f0f0f0; position: relative; }
.p-card:hover { transform: translateY(-8px); }

.image-box { height: 200px; background: #f8f9fa; display: flex; align-items: center; justify-content: center; position: relative; }
.image-box img { width: 100%; height: 100%; object-fit: cover; }
.admin-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.4); display: flex; gap: 10px; align-items: center; justify-content: center; opacity: 0; transition: 0.3s; }
.p-card:hover .admin-overlay { opacity: 1; }

.action-btn { border: none; padding: 8px 15px; border-radius: 8px; cursor: pointer; font-weight: bold; }
.action-btn.edit { background: #3498db; color: white; }
.action-btn.delete { background: #e74c3c; color: white; }

.info-box { padding: 15px; }
.p-name { font-size: 1.1rem; color: #2c3e50; font-weight: 700; margin-bottom: 5px; }
.p-price { color: #2ecc71; font-weight: 800; font-size: 1.2rem; }
.add-btn { background: #2ecc71; color: white; border: none; width: 35px; height: 35px; border-radius: 10px; cursor: pointer; font-size: 1.2rem; }

/* Modal */
.modal-backdrop { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 2000; }
.edit-modal { background: white; padding: 30px; border-radius: 20px; width: 400px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
.input-field { margin-bottom: 15px; }
.input-field label { display: block; margin-bottom: 5px; font-weight: bold; color: #34495e; }
.input-field input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 10px; box-sizing: border-box; }
.modal-btns { display: flex; gap: 10px; margin-top: 20px; }
.btn-save { flex: 1; background: #2ecc71; color: white; border: none; padding: 12px; border-radius: 10px; cursor: pointer; font-weight: bold; }
.btn-cancel { flex: 1; background: #ecf0f1; color: #7f8c8d; border: none; padding: 12px; border-radius: 10px; cursor: pointer; }
</style>