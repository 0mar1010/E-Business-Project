<template>
  <div class="login-wrapper">
    <div class="login-box">
      <h2>🏋️ Create Account</h2>
      <input v-model="email" type="email" placeholder="Email Address" />
      <input v-model="password" type="password" placeholder="Password (min 6 characters)" />
      <input v-model="confirmPassword" type="password" placeholder="Confirm Password" />
      <button @click="signup" :disabled="loading">
        {{ loading ? 'Creating account...' : 'Sign Up' }}
      </button>
      <p class="switch">Already have an account? <router-link to="/login">Login</router-link></p>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)
const router = useRouter()

const signup = async () => {
  error.value = ''
  success.value = ''

  if (!email.value || !password.value || !confirmPassword.value) {
    error.value = 'Please fill in all fields.'
    return
  }
  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters.'
    return
  }
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }

  loading.value = true
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
      email: email.value,
      password: password.value,
      role: 'customer',
    })
    success.value = 'Account created! Redirecting to login...'
    setTimeout(() => router.push('/login'), 1500)
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed. Try again.'
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
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
h2 { color: var(--text); text-align: center; margin: 0; }
input {
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
}
input:focus { border-color: var(--accent); }
button {
  background: var(--accent);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}
button:hover:not(:disabled) { background: var(--accent-hover); }
button:disabled { background: #555; cursor: not-allowed; }
.switch { color: var(--text2); text-align: center; font-size: 0.9rem; }
.switch a { color: var(--accent); }
.error { color: var(--accent); text-align: center; margin: 0; }
.success { color: #4caf50; text-align: center; margin: 0; }
</style>