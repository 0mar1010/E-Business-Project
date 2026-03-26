import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
    }),
    getters: {
        totalItems: (state) => state.items.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice: (state) => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    },
    actions: {
        addToCart(product) {
            const existing = this.items.find((i) => i._id === product._id)
            if (existing) {
                existing.quantity++
            } else {
                this.items.push({ ...product, quantity: 1 })
            }
        },
        removeFromCart(productId) {
            this.items = this.items.filter((i) => i._id !== productId)
        },
        clearCart() {
            this.items = []
        },
    },
})