<template>
  <div>
    <nav>
      <router-link to="/" class="brand">💪 Gym Store</router-link>
      <router-link to="/cart" class="cart-link">
        🛒 Cart
        <span v-if="cart.totalItems > 0" class="badge">{{ cart.totalItems }}</span>
      </router-link>
    </nav>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { useCartStore } from './stores/cart'
const cart = useCartStore()
</script>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #111; color: #fff; font-family: 'Segoe UI', sans-serif; }
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #1a1a1a;
  border-bottom: 1px solid #333;
  position: sticky;
  top: 0;
  z-index: 100;
}
.brand { color: #e63946; font-size: 1.3rem; font-weight: bold; text-decoration: none; }
.cart-link {
  color: #fff;
  text-decoration: none;
  position: relative;
  font-size: 1rem;
}
.cart-link .badge {
  background: #e63946;
  color: white;
  border-radius: 50%;
  padding: 2px 7px;
  font-size: 0.75rem;
  margin-left: 4px;
}
main { max-width: 1200px; margin: 0 auto; padding: 2rem; }
</style>