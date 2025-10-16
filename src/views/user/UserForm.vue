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

      <!-- Updated At  -->
      <div v-if="user.updatedAt" class="form-group">
        <label>Updated At</label>
        <input type="text" :value="user.updatedAt" disabled />
      </div>

      <!-- Buttons -->
      <div class="button-group">
        <button type="submit">{{ isEdit ? 'Update User' : 'Add User' }}</button>
        <button
          v-if="isEdit"
          type="button"
          class="delete-button"
          @click="deleteUser"
        >
          Delete User
        </button>
      </div>
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
const user = ref({
  name: '',
  email: '',
  role: '',
  createdAt: '',
  updatedAt: ''
})

// Load existing user if editing
onMounted(() => {
  const id = route.params.id
  if (id) {
    const existing = userStore.users.find(u => Number(u.id) === Number(id))
    if (existing) {
      user.value = { ...existing }
      isEdit.value = true
    }
  } else {
    user.value.createdAt = new Date().toISOString().split('T')[0]
  }
})

// Submit form
function submitForm() {
  if (isEdit.value) {
    user.value.updatedAt = new Date().toISOString().split('T')[0]
    userStore.updateUser(user.value)
  } else {
    userStore.addUser(user.value)
  }
  router.push('/users')
}

// Delete user
function deleteUser() {
  if (confirm('Are you sure you want to delete this user?')) {
    userStore.deleteUser(user.value.id)
    router.push('/users')
  }
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

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

button {
  flex: 1;
  padding: 10px;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  color: white;
}

button[type="submit"] {
  background-color: #4caf50;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

.delete-button {
  background-color: #f44336;
}

.delete-button:hover {
  background-color: #e53935;
}

/* Responsive */
@media (max-width: 600px) {
  .user-form {
    padding: 15px;
    margin: 10px;
  }
}
</style>
