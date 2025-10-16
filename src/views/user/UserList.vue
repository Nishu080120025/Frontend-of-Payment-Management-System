<template>
  <div class="user-list">
    <h2>Users</h2>

    <!-- Filters -->
    <div class="filters">
      <label>
        Created From:
        <input type="date" v-model="filterFromDate" />
      </label>

      <label>
        Role:
        <select v-model="filterRole">
          <option value="">All Roles</option>
          <option v-for="role in uniqueRoles" :key="role" :value="role">{{ role }}</option>
        </select>
      </label>
    </div>

    <!-- Table of users -->
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.createdAt }}</td>
          <td>{{ user.updatedAt || '-' }}</td>
          <td>
            <router-link :to="`/users/edit/${user.id}`">Edit</router-link>
          </td>
        </tr>
      </tbody>
    </table>

  
    <router-link to="/users/new" class="add-button">Add New User</router-link>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/UserStore.js'

const userStore = useUserStore()

// Filters
const filterFromDate = ref('')
const filterRole = ref('')


const uniqueRoles = computed(() => {
  const roles = userStore.users.map(u => u.role)
  return [...new Set(roles)]
})

// Filtered users
const filteredUsers = computed(() => {
  return userStore.users.filter(u => {
    const matchDate = !filterFromDate.value || u.createdAt >= filterFromDate.value
    const matchRole = !filterRole.value || u.role === filterRole.value
    return matchDate && matchRole
  })
})
</script>

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
