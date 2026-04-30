<template>
  <div class="cart">
    <h2>🛒 Your Cart</h2>

    <div v-if="cart.items.length === 0" class="empty">
      Your cart is empty. <router-link to="/">Shop now</router-link>
    </div>

    <div v-else>
      <div class="cart-item" v-for="item in cart.items" :key="item._id">
        <img :src="item.image" :alt="item.name" />
        <div class="item-info">
          <h3>{{ item.name }}</h3>
          <p>{{ item.price }} EGP × {{ item.quantity }}</p>
        </div>
        <div class="item-total">
          <span>{{ item.price * item.quantity }} EGP</span>
          <button @click="cart.removeFromCart(item._id)">Remove</button>
        </div>
      </div>

      <div class="summary">
        <h3>Total: {{ cart.totalPrice }} EGP</h3>
      </div>

      <div class="checkout-form">
        <h3>📦 Delivery Details</h3>

        <div class="form-row">
          <input v-model="form.customerName" type="text" placeholder="Full Name" />
          <input v-model="form.customerEmail" type="email" placeholder="Email Address" />
        </div>

        <input v-model="form.customerPhone" type="tel" placeholder="Phone Number" />
        <input v-model="form.street" type="text" placeholder="Street Address" />

        <div class="form-row">
          <input v-model="form.city" type="text" placeholder="City" />
          <select v-model="form.governorate">
            <option value="" disabled>Select Governorate</option>
            <option v-for="gov in governorates" :key="gov" :value="gov">{{ gov }}</option>
          </select>
        </div>

        <button
          class="checkout-btn"
          @click="placeOrder"
          :disabled="loading"
        >
          {{ loading ? 'Placing Order...' : '✅ Place Order' }}
        </button>

        <p v-if="successMsg" class="success">{{ successMsg }}</p>
        <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useCartStore } from '../stores/cart'

const cart = useCartStore()
const loading = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

const governorates = [
  'Alexandria', 'Cairo', 'Giza', 'Aswan', 'Asyut', 'Beheira',
  'Beni Suef', 'Dakahlia', 'Damietta', 'Faiyum', 'Gharbia',
  'Ismailia', 'Kafr El Sheikh', 'Luxor', 'Matruh', 'Minya',
  'Monufia', 'New Valley', 'North Sinai', 'Port Said', 'Qalyubia',
  'Qena', 'Red Sea', 'Sharqia', 'Sohag', 'South Sinai', 'Suez'
]

const form = ref({
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  street: '',
  city: '',
  governorate: '',
})

const placeOrder = async () => {
  const { customerName, customerEmail, customerPhone, street, city, governorate } = form.value

  if (!customerName || !customerEmail || !customerPhone || !street || !city || !governorate) {
    errorMsg.value = 'Please fill in all fields.'
    return
  }

  loading.value = true
  errorMsg.value = ''

  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`, {
      customerName,
      customerEmail,
      customerPhone,
      address: { street, city, governorate },
      items: cart.items.map((i) => ({
        productId: i._id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      totalPrice: cart.totalPrice,
    })

    successMsg.value = `✅ Order placed successfully! We will deliver to ${street}, ${city}, ${governorate}. We will contact you at ${customerPhone}.`
    cart.clearCart()
    form.value = { customerName: '', customerEmail: '', customerPhone: '', street: '', city: '', governorate: '' }
  } catch (err) {
    errorMsg.value = 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.cart { max-width: 800px; margin: 0 auto; }
h2 { color: var(--text); margin-bottom: 1.5rem; }
.empty { color: var(--text2); text-align: center; padding: 3rem; }
.empty a { color: var(--accent); }
.cart-item {
  display: flex;
  gap: 1rem;
  align-items: center;
  background: var(--bg2);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid var(--border);
}
.cart-item img { width: 80px; height: 80px; object-fit: cover; border-radius: 8px; }
.item-info { flex: 1; }
.item-info h3 { margin: 0; color: var(--text); }
.item-info p { color: var(--text2); margin: 4px 0 0; }
.item-total { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
.item-total span { color: var(--accent); font-weight: bold; }
.item-total button {
  background: transparent;
  color: var(--accent);
  border: 1px solid var(--accent);
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
}
.summary {
  background: var(--bg2);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  border: 1px solid var(--border);
  margin-bottom: 1.5rem;
}
.summary h3 { color: var(--text); margin: 0; }
.checkout-form {
  background: var(--bg2);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.checkout-form h3 { color: var(--text); margin: 0; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.checkout-form input,
.checkout-form select {
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  width: 100%;
}
.checkout-form input:focus,
.checkout-form select:focus { border-color: var(--accent); }
.checkout-btn {
  background: var(--accent);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}
.checkout-btn:disabled { background: #555; cursor: not-allowed; }
.checkout-btn:hover:not(:disabled) { background: var(--accent-hover); }
.success { color: #4caf50; font-weight: bold; }
.error { color: var(--accent); }
</style>