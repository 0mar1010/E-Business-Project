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
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}
.card:hover { 
  transform: translateY(-8px); 
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  border-color: var(--accent);
}
.card.out-of-stock { opacity: 0.6; filter: grayscale(50%); }
.img-wrapper { 
  position: relative; 
  overflow: hidden;
}
.card img { 
  width: 100%; 
  height: 220px; 
  object-fit: cover; 
  transition: transform 0.5s ease;
}
.card:hover img {
  transform: scale(1.08);
}
.sold-out-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #111;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}
.card-body { 
  padding: 1.5rem; 
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.badge {
  background: var(--accent);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  align-self: flex-start;
  letter-spacing: 0.5px;
}
h3 { margin: 0.75rem 0 0.5rem; color: var(--text); font-size: 1.2rem; }
p { color: var(--text2); font-size: 0.9rem; line-height: 1.4; flex-grow: 1; }
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}
.price { color: var(--accent); font-weight: 900; font-size: 1.2rem; }
button {
  background: var(--bg);
  color: var(--text);
  border: 1px solid var(--border);
  padding: 8px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease;
}
button:hover:not(:disabled) { 
  background: var(--accent); 
  color: white;
  border-color: var(--accent);
}
button:disabled { background: var(--bg3); color: var(--text2); cursor: not-allowed; border-color: transparent; }
</style>