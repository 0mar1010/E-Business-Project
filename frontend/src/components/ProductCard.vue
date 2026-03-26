<template>
  <div class="card">
    <img :src="product.image" :alt="product.name" />
    <div class="card-body">
      <span class="badge">{{ product.category }}</span>
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <div class="card-footer">
        <span class="price">{{ product.price }} EGP</span>
        <button @click="addToCart">Add to Cart</button>
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
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #333;
  transition: transform 0.2s;
}
.card:hover { transform: translateY(-4px); }
.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.card-body { padding: 1rem; }
.badge {
  background: #e63946;
  color: white;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  text-transform: uppercase;
}
h3 { margin: 0.5rem 0; color: #fff; }
p { color: #aaa; font-size: 0.9rem; }
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}
.price { color: #e63946; font-weight: bold; font-size: 1.1rem; }
button {
  background: #e63946;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}
button:hover { background: #c1121f; }
</style>