<template>
  <div class="payment-list">
    <h2>Payments</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>User</th>
          <th>Amount</th>
          <th>Type</th>
          <th>Status</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="payment in filteredPayments" :key="payment.id">
          <td data-label="ID">{{ payment.id }}</td>
          <td data-label="User">{{ payment.user || getUserName(payment.userId) }}</td>
          <td data-label="Amount">{{ payment.amount }}</td>
          <td data-label="Type">{{ payment.type }}</td>
          <td data-label="Status">{{ payment.status }}</td>
          <td data-label="Date">{{ payment.paymentDate }}</td>
          <td data-label="Actions">
            <router-link :to="`/payments/${payment.id}`">View</router-link>
            |
            <router-link :to="`/payments/edit/${payment.id}`">Edit</router-link>
          </td>
        </tr>
      </tbody>
    </table>

    <router-link to="/payments/new" class="add-button">Add New Payment</router-link>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePaymentStore } from '@/stores/PaymentStore.js'
import { useUserStore } from '@/stores/UserStore.js'

const paymentStore = usePaymentStore()
const userStore = useUserStore()

const filterStatus = ref('')
const filterType = ref('')
const filterDate = ref('')
const filterAmount = ref('')

function getUserName(userId) {
  const user = userStore.users.find(u => u.id === userId)
  return user ? user.name : ''
}

const filteredPayments = computed(() => {
  return paymentStore.payments.filter(p => {
    return (
      (filterStatus.value === '' || p.status === filterStatus.value) &&
      (filterType.value === '' || p.type === filterType.value) &&
      (filterDate.value === '' || p.paymentDate === filterDate.value) &&
      (filterAmount.value === '' || p.amount >= filterAmount.value)
    )
  })
})
</script>

<style scoped>
.payment-list {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
  max-width: 1000px;
  margin: 20px auto;
}

h2 {
  margin-bottom: 20px;
  text-align: center;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 15px;
}

label {
  display: flex;
  flex-direction: column;
  font-weight: bold;
}

select, input {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f3f3f3;
}

.add-button {
  display: inline-block;
  padding: 8px 12px;
  background-color: #2563eb;
  color: white;
  border-radius: 5px;
  text-decoration: none;
}

.add-button:hover {
  background-color: #1e4bb8;
}

/* Responsive table */
@media (max-width: 600px) {
  table, thead, tbody, th, td, tr {
    display: block;
  }

  th { display: none; }

  td {
    position: relative;
    padding-left: 50%;
    margin-bottom: 10px;
  }

  td::before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 50%;
    font-weight: bold;
    padding-left: 8px;
  }
}
</style>
