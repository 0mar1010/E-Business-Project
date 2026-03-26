<template>
  <div>
    <section class="hero">
      <h1>💪 Gym Store Egypt</h1>
      <p>Premium supplements, equipment & apparel</p>
    </section>

    <section class="filters">
      <button
        v-for="cat in categories"
        :key="cat"
        :class="{ active: selected === cat }"
        @click="selected = cat"
      >
        {{ cat }}
      </button>
    </section>

    <div v-if="loading" class="loading">Loading products...</div>
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
const categories = ['All', 'supplements', 'equipment', 'apparel', 'accessories']

const filteredProducts = computed(() =>
  selected.value === 'All'
    ? products.value
    : products.value.filter((p) => p.category === selected.value)
)

onMounted(async () => {
  const res = await axios.get('http://localhost:5000/api/products')
  products.value = res.data
  loading.value = false
})
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
  border-radius: 12px;
  margin-bottom: 2rem;
}
.hero h1 { font-size: 2.5rem; color: #e63946; margin: 0; }
.hero p { color: #aaa; margin-top: 0.5rem; }
.filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}
.filters button {
  background: #1a1a1a;
  color: #aaa;
  border: 1px solid #333;
  padding: 6px 16px;
  border-radius: 20px;
  cursor: pointer;
}
.filters button.active {
  background: #e63946;
  color: white;
  border-color: #e63946;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}
.loading { text-align: center; color: #aaa; padding: 3rem; }
</style>