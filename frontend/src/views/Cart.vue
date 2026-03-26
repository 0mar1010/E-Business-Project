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
        <button class="checkout-btn" @click="checkout">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
const cart = useCartStore()
const checkout = () => {
  alert('Order placed successfully! We will contact you soon.')
  cart.clearCart()
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
  padding: 1.5rem;
  text-align: right;
  border: 1px solid #333;
}
.summary h3 { color: #fff; margin: 0 0 1rem; }
.checkout-btn {
  background: #e63946;
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}
.checkout-btn:hover { background: #c1121f; }
</style>