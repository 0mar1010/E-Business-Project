<template>
  <div>
    <nav>
      <router-link to="/" class="brand">
  <img :src="berooLogo" alt="Beroo Nursery" class="nav-logo" />
  Beroo Nursery
</router-link>
      <div class="nav-links">
        <router-link to="/cart" class="cart-link">
          🛒 Cart
          <span v-if="cart.totalItems > 0" class="badge">{{ cart.totalItems }}</span>
        </router-link>
        <router-link v-if="isAdmin" to="/admin" class="admin-link">🛠️ Admin</router-link>
        <router-link v-if="!isLoggedIn" to="/login" class="login-link">Login</router-link>
        <router-link v-if="!isLoggedIn" to="/signup" class="nav-link">Sign Up</router-link>
        <button v-if="isLoggedIn" @click="logout" class="logout-btn">Logout</button>
        <div class="theme-toggle">
          <button v-for="t in themes" :key="t" :class="['theme-btn', { active: theme === t }]" @click="setTheme(t)">{{ t }}</button>
        </div>
      </div>
    </nav>
    <main>
      <RouterView />
    </main>
    <footer>
      <div class="footer-content">
        <div class="footer-section">
          <h4>🎓 Beroo Nursery & Kids Care</h4>
          <p>A wonderful journey of education and fun, based on modern, creative and playful methods.</p>
        </div>
        <div class="footer-section">
          <h4>Quick Links</h4>
          <router-link to="/">Home</router-link>
          <router-link to="/cart">Enrollment</router-link>
          <router-link to="/login">Admin Login</router-link>
        </div>
        <div class="footer-section">
          <h4>Contact Us</h4>
          <p>📧 beroo.nursery.edu@gmail.com</p>
          <p>📞 03 5555519</p>
          <p>📱 +20 15 51202093</p>
          <p>📍 9 Ahmed Abd Elatif, Miami, Alexandria</p>
          <p>📍 Louran Branch, Alexandria</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 Beroo Nursery & Kids Care. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import berooLogo from './assets/beroo-logo.jpg'
import { ref, onMounted } from 'vue'
import { useCartStore } from './stores/cart'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()

const isLoggedIn = ref(!!localStorage.getItem('token'))
const isAdmin = ref(localStorage.getItem('role') === 'admin')

const themes = ['gray', 'dark', 'light']
const theme = ref('dark')

const setTheme = (t) => {
  theme.value = t
  document.body.className = t
  localStorage.setItem('theme', t)
}

onMounted(() => {
  const saved = localStorage.getItem('theme') || 'dark'
  setTheme(saved)
})

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  isLoggedIn.value = false
  isAdmin.value = false
  router.push('/')
}
</script>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: var(--bg); color: var(--text); font-family: 'Segoe UI', sans-serif; transition: background 0.3s, color 0.3s; }
body.dark {
  --bg: #1a1025; --bg2: #2a1f35; --bg3: #3a2d4a;
  --text: #fff; --text2: #ccc; --border: #4a3d5a;
  --accent: #f4a020; --accent-hover: #e08800;
  --accent2: #3ab4f2; --accent3: #e84393;
}
body.light {
  --bg: #fdf6ec; --bg2: #fff8f0; --bg3: #fdebd0;
  --text: #2d1f0e; --text2: #7a5c3a; --border: #f0c080;
  --accent: #f4a020; --accent-hover: #e08800;
  --accent2: #3ab4f2; --accent3: #e84393;
}
body.gray {
  --bg: #3a3a3a; --bg2: #484848; --bg3: #555;
  --text: #f0f0f0; --text2: #bbb; --border: #666;
  --accent: #f4a020; --accent-hover: #e08800;
  --accent2: #3ab4f2; --accent3: #e84393;
}
nav { display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background: var(--bg2); border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; }
.brand { color: var(--accent); font-size: 1.3rem; font-weight: bold; text-decoration: none; }
.nav-links { display: flex; align-items: center; gap: 1rem; }
.cart-link { color: var(--text); text-decoration: none; position: relative; font-size: 1rem; }
.cart-link .badge { background: var(--accent); color: white; border-radius: 50%; padding: 2px 7px; font-size: 0.75rem; margin-left: 4px; }
.admin-link, .login-link { color: var(--text); text-decoration: none; }
.logout-btn { background: transparent; border: 1px solid var(--accent); color: var(--accent); padding: 6px 14px; border-radius: 8px; cursor: pointer; }
.logout-btn:hover { background: var(--accent); color: white; }
.theme-toggle { display: flex; gap: 4px; }
.theme-btn { background: var(--bg3); color: var(--text2); border: 1px solid var(--border); padding: 4px 10px; border-radius: 6px; cursor: pointer; font-size: 0.8rem; text-transform: capitalize; }
.theme-btn.active { background: var(--accent); color: white; border-color: var(--accent); }
main { max-width: 1200px; margin: 0 auto; padding: 2rem; }
footer { background: var(--bg2); border-top: 1px solid var(--border); margin-top: 4rem; padding: 2rem; }
.footer-content { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; max-width: 1200px; margin: 0 auto 1.5rem; }
.footer-section h4 { color: var(--accent); margin-bottom: 0.75rem; }
.footer-section p { color: var(--text2); margin: 4px 0; font-size: 0.9rem; }
.footer-section a { display: block; color: var(--text2); text-decoration: none; margin: 4px 0; font-size: 0.9rem; }
.footer-section a:hover { color: var(--accent); }
.footer-bottom { text-align: center; color: var(--text2); font-size: 0.85rem; border-top: 1px solid var(--border); padding-top: 1rem; }
.nav-logo { height: 40px; border-radius: 8px; margin-right: 8px; vertical-align: middle; }
</style>