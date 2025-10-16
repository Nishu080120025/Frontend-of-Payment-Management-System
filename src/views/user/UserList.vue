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
          <td>
            <span :class="['role-badge', user.role.toLowerCase()]">{{ user.role }}</span>
          </td>
          <td>{{ user.createdAt }}</td>
          <td>{{ user.updatedAt || '-' }}</td>
          <td>
            <router-link :to="`/users/edit/${user.id}`" class="edit-btn">Edit</router-link>
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

// Filters for filtering users based on the following 
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
.user-list {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
}

.user-list h2 {
  margin-bottom: 15px;
  text-align: center;
}


.filters {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 15px;
  align-items: center;
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


.edit-btn {
  display: inline-block;
  padding: 5px 12px;
  background-color: #ef4444; /* red */
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.edit-btn:hover {
  background-color: #b91c1c;
}


.role-badge {
  padding: 4px 8px;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  font-size: 0.85rem;
  text-transform: uppercase;
}


.role-badge.admin { background-color: #2563eb; }   
.role-badge.manager { background-color: #f59e0b; }  
.role-badge.staff { background-color: #10b981; }    
.role-badge.supervisor { background-color: #8b5cf6; } 
.role-badge.default { background-color: #6b7280; } 


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
