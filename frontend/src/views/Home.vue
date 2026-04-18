<template>
  <div>
    <section class="hero">
      <div class="hero-content">
        <h1>🎓 Beroo Nursery & Kids Care</h1>
        <p>A wonderful journey of education and fun — English, German & French for your child</p>
        <router-link to="/cart" class="hero-btn">Enroll Now →</router-link>
      </div>
    </section>

    <section class="filters">
      <button
        v-for="cat in categoryNames"
        :key="cat"
        :class="{ active: selected === cat }"
        @click="selected = cat"
      >
        {{ cat }}
      </button>
    </section>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-else class="grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product._id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import ProductCard from '../components/ProductCard.vue'

const products = ref([])
const loading = ref(true)
const selected = ref('All')
const categoryNames = ['All', 'enrollment', 'languages', 'activities', 'supplies']

const filteredProducts = computed(() =>
  selected.value === 'All'
    ? products.value
    : products.value.filter((p) => p.category === selected.value)
)

onMounted(async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`)
  products.value = res.data
  loading.value = false
})
</script>

<style scoped>
.hero {
  border-radius: 24px;
  margin-bottom: 2rem;
  padding: 5rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, #f4a020, #e84393, #3ab4f2, #4cbb6e);
  background-size: 300% 300%;
  animation: gradientShift 6s ease infinite;
  position: relative;
  overflow: hidden;
}
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.hero h1 { font-size: 2.8rem; color: white; margin-bottom: 1rem; text-shadow: 0 2px 8px rgba(0,0,0,0.2); }
.hero p { color: rgba(255,255,255,0.92); font-size: 1.15rem; margin-bottom: 2rem; }
.hero-btn {
  background: white;
  color: #f4a020;
  padding: 14px 36px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  display: inline-block;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
}
.hero-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.2); }
.filters { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
.filters button {
  background: var(--bg2);
  color: var(--text2);
  border: 2px solid var(--border);
  padding: 8px 20px;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}
.filters button.active { background: var(--accent); color: white; border-color: var(--accent); }
.filters button:hover { border-color: var(--accent); color: var(--accent); }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 1.5rem; }
.loading { text-align: center; color: var(--text2); padding: 3rem; }
</style>