<template>
  <div class="admin">
    <div class="admin-header">
      <h2>🛠️ Admin Panel</h2>
      <button class="logout-btn" @click="logout">Logout</button>
    </div>

    <div class="stats">
      <div class="stat-card">
        <span class="stat-num">{{ orders.length }}</span>
        <span class="stat-label">Total Orders</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">{{ totalRevenue }} EGP</span>
        <span class="stat-label">Total Revenue</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">{{ pendingOrders }}</span>
        <span class="stat-label">Pending Orders</span>
      </div>
    </div>

    <h3>📋 All Orders</h3>
    <div v-if="loading" class="loading">Loading orders...</div>
    <div v-else-if="orders.length === 0" class="empty">No orders yet.</div>
    <div v-else class="orders-list">
      <div class="order-card" v-for="order in orders" :key="order._id">
        <div class="order-top">
          <div class="order-status-row">
            <span :class="['status-badge', order.status]">{{ order.status }}</span>
            <select :value="order.status" @change="updateStatus(order._id, $event.target.value)" class="status-select">
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <span class="order-date">{{ formatDate(order.createdAt) }}</span>
        </div>
        <div class="order-customer">
          <p>👤 {{ order.customerName }}</p>
          <p>📧 {{ order.customerEmail }}</p>
          <p>📞 {{ order.customerPhone }}</p>
        </div>
        <div class="order-items">
          <div v-for="item in order.items" :key="item.productId" class="order-item">
            {{ item.name }} × {{ item.quantity }} — {{ item.price * item.quantity }} EGP
          </div>
        </div>
        <div class="order-total">Total: {{ order.totalPrice }} EGP</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const orders = ref([])
const loading = ref(true)
const router = useRouter()

const totalRevenue = computed(() =>
  orders.value.reduce((sum, o) => sum + o.totalPrice, 0)
)
const pendingOrders = computed(() =>
  orders.value.filter((o) => o.status === 'pending').length
)

const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', {
  day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
})

const updateStatus = async (orderId, newStatus) => {
  try {
    const token = localStorage.getItem('token')
    await axios.patch(`${import.meta.env.VITE_API_URL}/api/orders/${orderId}/status`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    const order = orders.value.find(o => o._id === orderId)
    if (order) order.status = newStatus
  } catch (err) {
    alert('Failed to update status')
  }
}

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (!token) { router.push('/login'); return }
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    orders.value = res.data
  } catch {
    router.push('/login')
  } finally {
    loading.value = false
  }
})

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  router.push('/login')
}
</script>

<style scoped>
.admin { max-width: 900px; margin: 0 auto; }
.admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.admin-header h2 { color: var(--text); margin: 0; }
.logout-btn { background: transparent; border: 1px solid var(--accent); color: var(--accent); padding: 8px 16px; border-radius: 8px; cursor: pointer; }
.logout-btn:hover { background: var(--accent); color: white; }
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem; }
.stat-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
.stat-num { font-size: 1.8rem; font-weight: bold; color: var(--accent); }
.stat-label { color: var(--text2); font-size: 0.9rem; }
h3 { color: var(--text); margin-bottom: 1rem; }
.loading, .empty { color: var(--text2); text-align: center; padding: 2rem; }
.orders-list { display: flex; flex-direction: column; gap: 1rem; }
.order-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 1.25rem; }
.order-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
.order-status-row { display: flex; align-items: center; gap: 0.75rem; }
.status-badge { padding: 3px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; text-transform: capitalize; }
.status-badge.pending { background: #fff3cd; color: #856404; }
.status-badge.confirmed { background: #d1e7dd; color: #0a3622; }
.status-badge.cancelled { background: #f8d7da; color: #842029; }
.status-select { background: var(--bg2); color: var(--text); border: 1px solid var(--border); padding: 4px 8px; border-radius: 6px; cursor: pointer; font-size: 0.85rem; }
.order-date { color: var(--text2); font-size: 0.85rem; }
.order-customer p { color: var(--text2); margin: 2px 0; font-size: 0.9rem; }
.order-items { margin: 0.75rem 0; border-top: 1px solid var(--border); padding-top: 0.75rem; }
.order-item { color: var(--text2); font-size: 0.9rem; margin: 2px 0; }
.order-total { color: var(--accent); font-weight: bold; text-align: right; }
</style>