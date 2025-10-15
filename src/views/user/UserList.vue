<template>
  <div class="user-list">
    <h2>Users</h2>

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
        <tr v-for="user in users" :key="user.id">
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

    <!-- Button to add new user -->
    <router-link to="/users/new" class="add-button">Add New User</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/UserStore.js'

const userStore = useUserStore()

// Get all users from store
const users = computed(() => userStore.users)
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

  th {
    display: none;
  }

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
