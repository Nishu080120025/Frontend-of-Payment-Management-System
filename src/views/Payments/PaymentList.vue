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

          <!-- Status with color -->
          <td 
            data-label="Status"
            :class="['status', payment.status.toLowerCase()]"
          >
            {{ payment.status }}
          </td>

          <td data-label="Date">{{ payment.paymentDate }}</td>

          <!-- Action buttons -->
          <td data-label="Actions">
            <router-link
              :to="`/payments/${payment.id}`"
              class="view-btn"
            >
              View
            </router-link>
            <router-link
              :to="`/payments/edit/${payment.id}`"
              class="edit-btn"
            >
              Edit
            </router-link>
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

<style scoped>
.payment-list {
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

/* Filters */
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

/* Table styles */
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

/* Status color badges */
.status {
  font-weight: 600;
  text-transform: capitalize;
  padding: 6px 10px;
  border-radius: 6px;
  display: inline-block;
  text-align: center;
}

.status.pending {
  background-color: #fef3c7; /* light yellow */
  color: #92400e;
  border: 1px solid #fcd34d;
}

.status.completed {
  background-color: #dcfce7; /* light green */
  color: #166534;
  border: 1px solid #86efac;
}

.status.failed {
  background-color: #fee2e2; /* light red */
  color: #991b1b;
  border: 1px solid #fca5a5;
}

/* Action buttons */
.view-btn,
.edit-btn {
  padding: 6px 12px;
  margin-right: 5px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 13px;
  color: white;
  transition: all 0.2s;
}

.view-btn {
  background-color: #2563eb;
}

.view-btn:hover {
  background-color: #1d4ed8;
}

.edit-btn {
  background-color: #10b981;
}

.edit-btn:hover {
  background-color: #059669;
}

/* Add button */
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
