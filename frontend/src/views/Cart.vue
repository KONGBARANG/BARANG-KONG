<template>
  <div class="cart-page container">
    <div class="cart-grid">
      <div class="cart-items-section">
        <h2 class="section-title">🛒 កន្ត្រកទំនិញរបស់អ្នក</h2>
        
        <div v-if="cart.length === 0" class="empty-cart">
          <div class="empty-icon">🛍️</div>
          <p>មិនទាន់មានទំនិញក្នុងកន្ត្រកនៅឡើយទេ</p>
          <button @click="router.push('/')" class="btn-shop">ទៅទិញឥឡូវនេះ</button>
        </div>

        <div v-else class="items-list">
          <div v-for="item in cart" :key="item.id" class="cart-item">
            <img :src="item.image" :alt="item.name" class="item-img" />
            <div class="item-details">
              <h4>{{ item.name }}</h4>
              <p class="item-price">${{ item.price }}</p>
            </div>
            <div class="quantity-control">
              <button @click="updateQty(item.id, -1)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="updateQty(item.id, 1)">+</button>
            </div>
            <button @click="removeItem(item.id)" class="btn-remove">🗑️</button>
          </div>
        </div>
      </div>

      <div class="checkout-section">
        <div class="checkout-card">
          <h3 class="card-title">ព័ត៌មានបង់ប្រាក់</h3>
          
          <div class="summary-box">
            <div class="summary-line">
              <span>សរុបថ្លៃទំនិញ:</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="summary-line discount">
              <span>បញ្ចុះតម្លៃ (5%):</span>
              <span>-${{ discount.toFixed(2) }}</span>
            </div>
            <hr />
            <div class="summary-line total">
              <span>ទឹកប្រាក់សរុប:</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>
          </div>

          <div class="payment-form">
            <div class="input-group">
              <label>លេខទូរស័ព្ទសម្រាប់ទាក់ទង</label>
              <input type="text" v-model="form.phone" placeholder="012 345 678" required />
            </div>

            <div class="input-group">
              <label>វិធីសាស្ត្របង់ប្រាក់</label>
              <div class="payment-methods">
                <label class="method-option" :class="{ active: form.method === 'cod' }">
                  <input type="radio" v-model="form.method" value="cod" />
                  <span>💵 បង់ពេលទំនិញមកដល់</span>
                </label>
                <label class="method-option" :class="{ active: form.method === 'aba' }">
                  <input type="radio" v-model="form.method" value="aba" />
                  <span>🏦 ABA Bank</span>
                </label>
                <label class="method-option" :class="{ active: form.method === 'acleda' }">
                  <input type="radio" v-model="form.method" value="acleda" />
                  <span>🏦 ACLEDA Bank</span>
                </label>
              </div>
            </div>

            <transition name="fade">
              <div v-if="form.method === 'aba' || form.method === 'acleda'" class="qr-container">
                <p class="qr-hint">សូមស្កែនដើម្បីបង់ប្រាក់ចំនួន <strong>${{ total.toFixed(2) }}</strong></p>
                <div class="qr-frame" :class="form.method">
                  <img v-if="form.method === 'aba'" src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ABA_PAYMENT_SAMPLE" alt="ABA QR" />
                  <img v-if="form.method === 'acleda'" src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ACLEDA_PAYMENT_SAMPLE" alt="ACLEDA QR" />
                  <div class="qr-label">{{ form.method.toUpperCase() }} PAY</div>
                </div>
                <p class="qr-note">* បន្ទាប់ពីបង់រួច សូមចុចប៊ូតុងបញ្ជាក់ខាងក្រោម</p>
              </div>
            </transition>
            
            <button @click="handleCheckout" class="btn-checkout" :disabled="cart.length === 0 || !form.phone">
              {{ form.method === 'cod' ? 'បញ្ជាក់ការបញ្ជាទិញ' : 'ខ្ញុំបានបង់ប្រាក់រួចរាល់' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const cart = ref([]);
const userEmail = ref(localStorage.getItem('currentUserEmail'));
const form = ref({
  phone: '012 345 678',
  method: 'cod'
});

// ១. កែសម្រួលការ Load ទិន្នន័យឱ្យទាញតាម Account
const loadCart = () => {
  const cartKey = userEmail.value ? `cart_${userEmail.value}` : 'mart_cart';
  cart.value = JSON.parse(localStorage.getItem(cartKey) || '[]');
};

const subtotal = computed(() => cart.value.reduce((s, i) => s + i.price * i.quantity, 0));
const discount = computed(() => subtotal.value * 0.05); // បញ្ចុះតម្លៃ 5%
const total = computed(() => subtotal.value - discount.value);

const updateQty = (id, change) => {
  const item = cart.value.find(i => i.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) removeItem(id);
    else saveCart();
  }
};

const removeItem = (id) => {
  cart.value = cart.value.filter(i => i.id !== id);
  saveCart();
};

// ២. រក្សាទុកទិន្នន័យចូលក្នុង Key របស់ Account នោះវិញ
const saveCart = () => {
  const cartKey = userEmail.value ? `cart_${userEmail.value}` : 'mart_cart';
  localStorage.setItem(cartKey, JSON.stringify(cart.value));
  window.dispatchEvent(new Event('cart-updated')); // ប្រាប់ App.vue ឱ្យ Update លេខកន្ត្រក
};

const handleCheckout = () => {
  const msg = form.value.method === 'cod' 
    ? 'ការបញ្ជាទិញទទួលបានជោគជ័យ! យើងនឹងដឹកជូនអ្នកភ្លាមៗ។' 
    : 'អរគុណសម្រាប់ការបង់ប្រាក់! យើងនឹងពិនិត្យមើលប្រតិបត្តិការរបស់អ្នក។';
    
  alert(msg);
  
  // ៣. សម្អាតកន្ត្រកទំនិញតែក្នុងអាខោនដែលកំពុងប្រើ
  const cartKey = userEmail.value ? `cart_${userEmail.value}` : 'mart_cart';
  localStorage.removeItem(cartKey);
  
  window.dispatchEvent(new Event('cart-updated'));
  router.push('/');
};

onMounted(loadCart);
</script>

<style scoped>
/* Style រក្សាតាមទម្រង់ដើមរបស់អ្នក និងបន្ថែមភាពស្រស់ស្អាតខ្លះៗ */
.cart-page { padding: 40px 15px; min-height: 80vh; background: #fdfdfd; font-family: 'Kantumruy Pro', sans-serif; }
.cart-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 40px; max-width: 1100px; margin: 0 auto; }

.section-title { font-size: 1.5rem; margin-bottom: 25px; color: #2c3e50; }

.empty-cart { text-align: center; padding: 60px; background: white; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
.empty-icon { font-size: 4rem; margin-bottom: 10px; }
.btn-shop { background: #2ecc71; color: white; border: none; padding: 10px 25px; border-radius: 10px; cursor: pointer; font-weight: bold; }

.cart-item {
  display: flex; align-items: center; background: white; padding: 15px;
  border-radius: 16px; margin-bottom: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  transition: 0.3s;
}
.item-img { width: 80px; height: 80px; object-fit: cover; border-radius: 12px; }
.item-details { flex: 1; margin-left: 15px; }
.item-details h4 { margin: 0; font-size: 1.1rem; color: #34495e; }
.item-price { color: #2ecc71; font-weight: 700; margin-top: 5px; }

.quantity-control { display: flex; align-items: center; gap: 12px; background: #f8fafc; padding: 5px 12px; border-radius: 50px; }
.quantity-control button { width: 25px; height: 25px; border: none; background: white; border-radius: 50%; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }

.btn-remove { background: none; border: none; font-size: 1.2rem; cursor: pointer; margin-left: 10px; opacity: 0.6; }
.btn-remove:hover { opacity: 1; }

.checkout-card { background: white; padding: 30px; border-radius: 24px; box-shadow: 0 15px 40px rgba(0,0,0,0.08); position: sticky; top: 100px; }
.summary-box { background: #f9fbfd; padding: 20px; border-radius: 15px; margin-bottom: 20px; }
.summary-line { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.95rem; }
.discount { color: #e74c3c; font-weight: 600; }
.total { font-size: 1.4rem; font-weight: 800; color: #2c3e50; border-top: 2px dashed #eee; padding-top: 15px; }

.payment-methods { display: flex; flex-direction: column; gap: 10px; margin-top: 10px; }
.method-option {
  padding: 12px 15px; border: 2px solid #f1f5f9; border-radius: 12px; cursor: pointer;
  transition: 0.3s; display: flex; align-items: center; gap: 10px;
}
.method-option input { display: none; }
.method-option.active { border-color: #2ecc71; background: #f0fff4; }

.qr-container { text-align: center; margin: 20px 0; padding: 20px; background: #fff; border: 1px solid #eee; border-radius: 15px; }
.qr-frame { display: inline-block; padding: 15px; border-radius: 15px; background: white; box-shadow: 0 5px 20px rgba(0,0,0,0.1); margin-bottom: 10px; }
.qr-frame.aba { border: 4px solid #005d7d; }
.qr-frame.acleda { border: 4px solid #f1c40f; }

.btn-checkout {
  width: 100%; background: #2ecc71; color: white; border: none; padding: 16px;
  border-radius: 12px; font-weight: 700; font-size: 1rem; cursor: pointer; transition: 0.3s;
}
.btn-checkout:disabled { background: #cbd5e1; cursor: not-allowed; }

@media (max-width: 900px) { .cart-grid { grid-template-columns: 1fr; } }
</style>