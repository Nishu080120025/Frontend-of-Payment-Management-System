<template>
  <div class="user-form">
    <h2>{{ isEdit ? 'Edit User' : 'Add New User' }}</h2>

    <form @submit.prevent="submitForm">
      <!-- Name -->
      <div class="form-group">
        <label>Name</label>
        <input v-model="user.name" type="text" placeholder="Enter name" required />
      </div>

      <!-- Email -->
      <div class="form-group">
        <label>Email</label>
        <input v-model="user.email" type="email" placeholder="Enter email" required />
      </div>

      <!-- Role -->
      <div class="form-group">
        <label>Role</label>
        <select v-model="user.role" required>
          <option value="" disabled>Select role</option>
          <option>Admin</option>
          <option>Manager</option>
          <option>Staff</option>
        </select>
      </div>

      <!-- Created At (readonly) -->
      <div class="form-group">
        <label>Created At</label>
        <input type="text" :value="user.createdAt" disabled />
      </div>

      <!-- Updated At (readonly) -->
      <div v-if="user.updatedAt" class="form-group">
        <label>Updated At</label>
        <input type="text" :value="user.updatedAt" disabled />
      </div>

      <!-- Submit button -->
      <button type="submit">{{ isEdit ? 'Update User' : 'Add User' }}</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/UserStore.js'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const isEdit = ref(false)

// Default empty user
const user = ref({
  name: '',
  email: '',
  role: '',
  createdAt: '',
  updatedAt: ''
})

// Check if editing an existing user
onMounted(() => {
  const id = route.params.id
  if (id) {
    const existing = userStore.users.find(u => u.id == id)
    if (existing) {
      user.value = { ...existing }
      isEdit.value = true
    }
  } else {
    // New user → set createdAt to today
    user.value.createdAt = new Date().toISOString().split('T')[0]
  }
})

// Handle form submission
function submitForm() {
  if (isEdit.value) {
    user.value.updatedAt = new Date().toISOString().split('T')[0]
    userStore.updateUser(user.value)
  } else {
    userStore.addUser(user.value)
  }

  // Navigate back to user list
  router.push('/users')
}
</script>

<style scoped>
.user-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
  max-width: 500px;
  margin: 20px auto;
}

h2 {
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #2563eb;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #1e4bb8;
}

/* Responsive */
@media (max-width: 600px) {
  .user-form {
    padding: 15px;
    margin: 10px;
  }
}
</style>
