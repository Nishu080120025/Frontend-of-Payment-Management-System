<template>
  <div class="payment-list">
    <h2>Payments</h2>

    <!-- Filters -->
    <div class="filters">
      <label>
        Status:
        <select v-model="filterStatus">
          <option value="">All</option>
          <option>Pending</option>
          <option>Completed</option>
          <option>Failed</option>
        </select>
      </label>

      <label>
        Type:
        <select v-model="filterType">
          <option value="">All</option>
          <option>Salary</option>
          <option>Subscriptions</option>
          <option>Vendor Payments</option>
          <option>Client Payments</option>
        </select>
      </label>

      <label>
        Min Amount:
        <input type="number" v-model.number="filterAmount" placeholder="0" />
      </label>

      <label>
        Date From:
        <input type="date" v-model="filterDate" />
      </label>
    </div>

    <!-- Table of payments -->
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

// Filters
const filterStatus = ref('')
const filterType = ref('')
const filterAmount = ref('')
const filterDate = ref('')


function getUserName(userId) {
  const user = userStore.users.find(u => u.id === userId)
  return user ? user.name : ''
}

// Filtered payments
const filteredPayments = computed(() => {
  return paymentStore.payments.filter(p => {
    const matchStatus = !filterStatus.value || p.status === filterStatus.value
    const matchType = !filterType.value || p.type === filterType.value
    const matchAmount = !filterAmount.value || p.amount >= filterAmount.value
    const matchDate = !filterDate.value || p.paymentDate >= filterDate.value
    return matchStatus && matchType && matchAmount && matchDate
  })
})
</script>

<!-- <style scoped>
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

/* Filters */
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 15px;
}

.filters label {
  display: flex;
  flex-direction: column;
  font-weight: bold;
  font-size: 14px;
}

.filters input,
.filters select {
  padding: 6px 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
}

/* Table styles */
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
</style> -->
<style scoped>
.table-container {
  background: #ffffff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  max-width: 1100px;
  margin: 20px auto;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #1e3a8a;
  font-weight: 700;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
}

label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  color: #374151;
  font-size: 14px;
}

input, select {
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  outline: none;
  transition: all 0.2s;
}

input:focus, select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 4px rgba(59,130,246,0.3);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  font-size: 14px;
}

th, td {
  padding: 12px 10px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

th {
  background-color: #f3f4f6;
  color: #111827;
  font-weight: 600;
}

tr:hover {
  background-color: #f9fafb;
  transition: background 0.2s;
}

.add-button {
  display: inline-block;
  padding: 10px 16px;
  background-color: #3b82f6;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}

.add-button:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
}

/* Responsive table */
@media (max-width: 640px) {
  table, thead, tbody, th, td, tr {
    display: block;
  }

  th { display: none; }

  td {
    position: relative;
    padding-left: 50%;
    margin-bottom: 12px;
  }

  td::before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 45%;
    font-weight: 600;
    padding-left: 8px;
    color: #374151;
  }
}
</style>
