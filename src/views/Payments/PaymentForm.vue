<template>
  <div class="payment-form">
    <h2>{{ isEditMode ? 'Edit Payment' : 'Add New Payment' }}</h2>

    <form @submit.prevent="savePayment">
      <!-- User (free text) -->
      <div class="form-group">
        <label for="user">User</label>
        <input type="text" id="user" v-model="payment.user" placeholder="Enter user name" required />
      </div>

      <!-- Amount -->
      <div class="form-group">
        <label for="amount">Amount</label>
        <input type="number" id="amount" v-model.number="payment.amount" placeholder="Enter amount" required />
      </div>

      <!-- Type -->
      <div class="form-group">
        <label for="type">Type</label>
        <select id="type" v-model="payment.type" required>
          <option value="">Select Type</option>
          <option value="Salary">Salary</option>
          <option value="Subscriptions">Subscriptions</option>
          <option value="Vendor Payments">Vendor Payments</option>
          <option value="Client Payments">Client Payments</option>
        </select>
      </div>

      <!-- Status -->
      <div class="form-group">
        <label for="status">Status</label>
        <select id="status" v-model="payment.status" required>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      <!-- Date -->
      <div class="form-group">
        <label for="date">Date</label>
        <input type="date" id="date" v-model="payment.paymentDate" required />
      </div>

      <!-- Submit -->
      <button type="submit" class="save-button">
        {{ isEditMode ? 'Update Payment' : 'Save Payment' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePaymentStore } from '@/stores/PaymentStore.js'

const paymentStore = usePaymentStore()
const route = useRoute()
const router = useRouter()

const isEditMode = ref(false)
const payment = ref({
  id: null,
  user: '',
  amount: '',
  type: 'Salary',
  status: 'Pending',
  paymentDate: new Date().toISOString().slice(0,10)
})

onMounted(() => {
  const id = route.params.id
  if (id) {
    const existing = paymentStore.getPaymentById(id)
    if (existing) {
      
      payment.value = {
        id: existing.id,
        user: existing.user ?? '',
        userId: existing.userId ?? null,
        amount: existing.amount,
        type: existing.type,
        status: existing.status,
        paymentDate: existing.paymentDate
      }
      isEditMode.value = true
    }
  }
})

function savePayment() {
 
  if (isEditMode.value) {
    paymentStore.updatePayment(payment.value)
  } else {
    paymentStore.addPayment(payment.value)
  }
  router.push('/payments')
}
</script>
<style scoped>
.payment-form {
  max-width: 500px;
  margin: 0 auto;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.payment-form h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.save-button {
  display: block;
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #45a049;
}
</style>
