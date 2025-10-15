<template>
  <div class="payment-detail">
    <h2>Payment Details</h2>

    <div v-if="payment">
      <p><strong>ID:</strong> {{ payment.id }}</p>
      <p><strong>User:</strong> {{ getUserName(payment.userId) }}</p>
      <p><strong>Amount:</strong> {{ payment.amount }}</p>
      <p><strong>Type:</strong> {{ payment.type }}</p>
      <p><strong>Status:</strong> {{ payment.status }}</p>
      <p><strong>Date:</strong> {{ payment.paymentDate }}</p>

      <router-link to="/payments" class="back-button">Back to Payments</router-link>
    </div>

    <div v-else>
      <p>Payment not found.</p>
      <router-link to="/payments" class="back-button">Back to Payments</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePaymentStore } from '@/stores/PaymentStore.js'
import { useUserStore } from '@/stores/UserStore.js'

const route = useRoute()
const paymentStore = usePaymentStore()
const userStore = useUserStore()

const payment = ref(null)

// Helper to get user's name from userId
function getUserName(userId) {
  const user = userStore.users.find(u => u.id === userId)
  return user ? user.name : 'Unknown'
}

// On component mount, find payment by ID
onMounted(() => {
  const id = Number(route.params.id)
  payment.value = paymentStore.payments.find(p => p.id === id) || null
})
</script>

<style scoped>
.payment-detail {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

p {
  margin-bottom: 10px;
  font-size: 16px;
}

.back-button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px;
  background-color: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.back-button:hover {
  background-color: #1e4bb8;
}

/* Responsive */
@media (max-width: 600px) {
  .payment-detail {
    padding: 15px;
    margin: 10px;
  }
}
</style>
