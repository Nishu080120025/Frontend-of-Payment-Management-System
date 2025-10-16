<template>
  <div class="payment-detail">
    <h2>Payment Details</h2>

    <div v-if="payment">
      <p><strong>ID:</strong> {{ payment.id }}</p>
     <p><strong>User:</strong> {{ payment.user || getUserName(payment.userId) }}</p>
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
  margin: 25px auto;
  padding: 30px 25px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  transition: all 0.2s;
}

.payment-detail:hover {
  transform: translateY(-2px);
}

h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #1e3a8a;
  font-weight: 700;
}

p {
  margin-bottom: 15px;
  font-size: 16px;
  line-height: 1.5;
  color: #374151;
}

p strong {
  color: #111827;
}

.back-button {
  display: inline-block;
  margin-top: 25px;
  padding: 12px 18px;
  background-color: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.2s;
}

.back-button:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 600px) {
  .payment-detail {
    padding: 20px;
    margin: 15px;
  }

  p {
    font-size: 15px;
  }
}
</style>
