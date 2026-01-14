<template>
  <div class="admin-dashboard container">
    <div class="admin-header">
      <h2>ផ្ទាំងគ្រប់គ្រងទំនិញ (Admin Dashboard)</h2>
      <button class="btn-add" @click="showAddForm = !showAddForm">
        {{ showAddForm ? 'បិទ Form' : '+ បន្ថែមទំនិញថ្មី' }}
      </button>
    </div>

    <div v-if="showAddForm" class="product-form card">
      <h3>{{ isEditing ? 'កែសម្រួលទំនិញ' : 'បន្ថែមទំនិញថ្មី' }}</h3>
      <div class="form-grid">
        <input v-model="form.name" type="text" placeholder="ឈ្មោះទំនិញ" />
        <input v-model.number="form.price" type="number" placeholder="តម្លៃ ($)" />
        <input v-model.number="form.stock" type="number" placeholder="ចំនួនក្នុងស្តុក" />
        <input v-model="form.image" type="text" placeholder="Link រូបភាព (URL)" />
      </div>
      <div class="form-actions">
        <button class="btn-save" @click="saveProduct">{{ isEditing ? 'ធ្វើបច្ចុប្បន្នភាព' : 'រក្សាទុកទំនិញ' }}</button>
        <button class="btn-cancel" @click="resetForm">បោះបង់</button>
      </div>
    </div>

    <div class="table-responsive card">
      <table>
        <thead>
          <tr>
            <th>រូបភាព</th>
            <th>ឈ្មោះទំនិញ</th>
            <th>តម្លៃ</th>
            <th>ស្តុក</th>
            <th>សកម្មភាព</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in products" :key="p.id">
            <td><img :src="p.image || 'https://via.placeholder.com/50'" class="table-img" /></td>
            <td>{{ p.name }}</td>
            <td>${{ p.price.toFixed(2) }}</td>
            <td>{{ p.stock }}</td>
            <td>
              <button class="btn-edit" @click="editProduct(p)">កែ</button>
              <button class="btn-delete" @click="deleteProduct(p.id)">លុប</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const products = ref([]);
const showAddForm = ref(false);
const isEditing = ref(false);
const form = ref({ id: null, name: '', price: 0, stock: 0, image: '' });

const loadProducts = () => {
  const saved = localStorage.getItem('mart_products');
  products.value = saved ? JSON.parse(saved) : [];
};

const saveProduct = () => {
  if (!form.value.name || form.value.price <= 0) return alert('សូមបំពេញព័ត៌មានឱ្យបានត្រឹមត្រូវ!');

  if (isEditing.value) {
    const index = products.value.findIndex(p => p.id === form.value.id);
    products.value[index] = { ...form.value };
  } else {
    const newProduct = { ...form.value, id: Date.now() };
    products.value.push(newProduct);
  }

  localStorage.setItem('mart_products', JSON.stringify(products.value));
  resetForm();
  loadProducts();
};

const editProduct = (product) => {
  form.value = { ...product };
  isEditing.value = true;
  showAddForm.value = true;
};

const deleteProduct = (id) => {
  if (confirm('តើអ្នកចង់លុបទំនិញនេះមែនទេ?')) {
    products.value = products.value.filter(p => p.id !== id);
    localStorage.setItem('mart_products', JSON.stringify(products.value));
  }
};

const resetForm = () => {
  form.value = { id: null, name: '', price: 0, stock: 0, image: '' };
  showAddForm.value = false;
  isEditing.value = false;
};

onMounted(loadProducts);
</script>

<style scoped>
.container { max-width: 1100px; margin: 30px auto; padding: 0 20px; font-family: 'Khmer OS Battambang'; }
.admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 20px; }

.btn-add { background: #2ecc71; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: bold; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px; }
.form-grid input { padding: 12px; border: 1px solid #ddd; border-radius: 8px; outline: none; }

table { width: 100%; border-collapse: collapse; }
th { background: #f8f9fa; padding: 15px; text-align: left; color: #2c3e50; }
td { padding: 15px; border-top: 1px solid #eee; }
.table-img { width: 45px; height: 45px; object-fit: cover; border-radius: 5px; }

.btn-edit { background: #3498db; color: white; border: none; padding: 5px 12px; border-radius: 5px; margin-right: 5px; cursor: pointer; }
.btn-delete { background: #e74c3c; color: white; border: none; padding: 5px 12px; border-radius: 5px; cursor: pointer; }
.btn-save { background: #2c3e50; color: white; border: none; padding: 10px 25px; border-radius: 8px; cursor: pointer; margin-right: 10px; }
</style>