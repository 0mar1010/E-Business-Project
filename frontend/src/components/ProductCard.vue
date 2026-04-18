<template>
  <div class="card">
    <div class="img-wrapper">
      <img :src="product.image" :alt="product.name" />
      <span class="category-tag">{{ product.category }}</span>
    </div>
    <div class="card-body">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <div class="card-footer">
        <span class="price">{{ product.price }} EGP</span>
        <button @click="addToCart">Enroll →</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
const props = defineProps(['product'])
const cart = useCartStore()
const addToCart = () => cart.addToCart(props.product)
</script>

<style scoped>
.card {
  background: var(--bg2);
  border-radius: 20px;
  overflow: hidden;
  border: 2px solid var(--border);
  transition: transform 0.2s, box-shadow 0.2s;
}
.card:hover { transform: translateY(-6px); box-shadow: 0 12px 30px rgba(244,160,32,0.15); }
.img-wrapper { position: relative; }
.card img { width: 100%; height: 190px; object-fit: cover; }
.category-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #f4a020;
  color: white;
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: capitalize;
}
.card-body { padding: 1.2rem; }
h3 { margin: 0 0 0.5rem; color: var(--text); font-size: 1.05rem; }
p { color: var(--text2); font-size: 0.9rem; line-height: 1.5; }
.card-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; }
.price { color: var(--accent); font-weight: bold; font-size: 1.1rem; }
button {
  background: linear-gradient(135deg, #f4a020, #e84393);
  color: white;
  border: none;
  padding: 9px 20px;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  transition: transform 0.15s;
}
button:hover { transform: scale(1.05); }
</style>