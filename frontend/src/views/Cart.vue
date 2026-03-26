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

      <!-- Checkout Form -->
      <div class="checkout-form">
        <h3>📦 Delivery Details</h3>
        <input v-model="form.customerName" type="text" placeholder="Full Name" />
        <input v-model="form.customerEmail" type="email" placeholder="Email Address" />
        <input v-model="form.customerPhone" type="tel" placeholder="Phone Number" />

        <button
          class="checkout-btn"
          @click="placeOrder"
          :disabled="loading"
        >
          {{ loading ? 'Placing Order...' : 'Place Order' }}
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

const form = ref({
  customerName: '',
  customerEmail: '',
  customerPhone: '',
})

const placeOrder = async () => {
  if (!form.value.customerName || !form.value.customerEmail || !form.value.customerPhone) {
    errorMsg.value = 'Please fill in all fields.'
    return
  }

  loading.value = true
  errorMsg.value = ''

  try {
    await axios.post('http://localhost:5000/api/orders', {
      ...form.value,
      items: cart.items.map((i) => ({
        productId: i._id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      totalPrice: cart.totalPrice,
    })

    successMsg.value = '✅ Order placed successfully! We will contact you soon.'
    cart.clearCart()
    form.value = { customerName: '', customerEmail: '', customerPhone: '' }
  } catch (err) {
    errorMsg.value = 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.cart { max-width: 800px; margin: 0 auto; }
h2 { color: #fff; margin-bottom: 1.5rem; }
.empty { color: #aaa; text-align: center; padding: 3rem; }
.empty a { color: #e63946; }
.cart-item {
  display: flex;
  gap: 1rem;
  align-items: center;
  background: #1a1a1a;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #333;
}
.cart-item img { width: 80px; height: 80px; object-fit: cover; border-radius: 8px; }
.item-info { flex: 1; }
.item-info h3 { margin: 0; color: #fff; }
.item-info p { color: #aaa; margin: 4px 0 0; }
.item-total { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
.item-total span { color: #e63946; font-weight: bold; }
.item-total button {
  background: transparent;
  color: #e63946;
  border: 1px solid #e63946;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
}
.summary {
  background: #1a1a1a;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  border: 1px solid #333;
  margin-bottom: 1.5rem;
}
.summary h3 { color: #fff; margin: 0; }
.checkout-form {
  background: #1a1a1a;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #333;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.checkout-form h3 { color: #fff; margin: 0; }
.checkout-form input {
  background: #111;
  border: 1px solid #333;
  color: #fff;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
}
.checkout-form input:focus { border-color: #e63946; }
.checkout-btn {
  background: #e63946;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}
.checkout-btn:disabled { background: #555; cursor: not-allowed; }
.checkout-btn:hover:not(:disabled) { background: #c1121f; }
.success { color: #4caf50; font-weight: bold; }
.error { color: #e63946; }
</style>