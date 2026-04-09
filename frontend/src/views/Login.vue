<template>
  <div class="login-wrapper">
    <div class="login-box">
      <h2>🔐 Admin Login</h2>
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="login" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

const login = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email: email.value,
      password: password.value,
    })
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('role', res.data.role)
    if (res.data.role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/')
    }
  } catch (err) {
    error.value = 'Invalid email or password'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}
.login-box {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
h2 { color: #fff; text-align: center; margin: 0; }
input {
  background: #111;
  border: 1px solid #333;
  color: #fff;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
}
input:focus { border-color: #e63946; }
button {
  background: #e63946;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}
button:hover:not(:disabled) { background: #c1121f; }
button:disabled { background: #555; cursor: not-allowed; }
.error { color: #e63946; text-align: center; margin: 0; }
</style>