<template>
  <div class="dashboard">
    <h1 class="dashboard-title">Dashboard Overview</h1>

    <!-- Summary Cards -->
    <div class="stats-grid">
      <div class="stat-card total-users">
        <h2>Total Users</h2>
        <p>{{ totalUsers }}</p>
      </div>

      <div class="stat-card total-payments">
        <h2>Total Payments</h2>
        <p>{{ totalPayments }}</p>
      </div>

      <div class="stat-card completed">
        <h2>Completed</h2>
        <p>{{ completedPayments }}</p>
      </div>

      <div class="stat-card pending">
        <h2>Pending</h2>
        <p>{{ pendingPayments }}</p>
      </div>

      <div class="stat-card failed">
        <h2>Failed</h2>
        <p>{{ failedPayments }}</p>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons">
      <router-link to="/users" class="action-btn users-btn">View Users</router-link>
      <router-link to="/payments" class="action-btn payments-btn">View Payments</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/UserStore.js'
import { usePaymentStore } from '@/stores/PaymentStore.js'

const userStore = useUserStore()
const paymentStore = usePaymentStore()

const totalUsers = computed(() => userStore.users.length)
const totalPayments = computed(() => paymentStore.payments.length)
const completedPayments = computed(() => paymentStore.payments.filter(p => p.status === 'Completed').length)
const pendingPayments = computed(() => paymentStore.payments.filter(p => p.status === 'Pending').length)
const failedPayments = computed(() => paymentStore.payments.filter(p => p.status === 'Failed').length)
</script>

<style scoped>
.dashboard {
  padding: 40px 20px;
  color: #fff;
  text-align: center;
}

.dashboard-title {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 30px;
  letter-spacing: 1px;
}

/* Summary Cards */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: #1f2937;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.45);
}

.stat-card h2 {
  color: #9ca3af;
  margin-bottom: 10px;
  text-transform: uppercase;
  font-size: 1rem;
}

.stat-card p {
  font-size: 2rem;
  font-weight: 700;
}

.total-users { border-top: 5px solid #facc15; }
.total-payments { border-top: 5px solid #38bdf8; }
.completed { border-top: 5px solid #22c55e; }
.pending { border-top: 5px solid #f97316; }
.failed { border-top: 5px solid #ef4444; }


.action-buttons {
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-top: 30px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 18px 35px;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.3s ease;
  color: #fff;
}

.users-btn {
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
}

.users-btn:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
}

.payments-btn {
  background: linear-gradient(90deg, #22c55e, #16a34a);
}

.payments-btn:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 6px 20px rgba(34, 197, 94, 0.5);
}

/* Responsive */
@media (max-width: 600px) {
  .dashboard { padding: 20px 10px; }
  .dashboard-title { font-size: 2rem; }
  .action-btn { font-size: 1rem; padding: 14px 28px; }
}
</style>
