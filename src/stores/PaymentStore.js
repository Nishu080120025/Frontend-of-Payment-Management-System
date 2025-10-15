import { defineStore } from 'pinia'

// Load users from localStorage or use default
function loadUsers() {
  const data = localStorage.getItem('users')
  return data ? JSON.parse(data) : [
    { id: 1, name: 'Alice', email: 'alice@company.com', role: 'Admin', createdAt: '2025-10-14' },
    { id: 2, name: 'Bob', email: 'bob@company.com', role: 'Manager', createdAt: '2025-10-14' },
  ]
}

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: loadUsers(),
    nextUserId: Number(localStorage.getItem('nextUserId')) || 3
  }),
  actions: {
    addUser(user) {
      user.id = this.nextUserId++
      user.createdAt = new Date().toISOString().split('T')[0]
      this.users.push(user)
      localStorage.setItem('users', JSON.stringify(this.users))
      localStorage.setItem('nextUserId', this.nextUserId)
    },
    updateUser(updatedUser) {
      const index = this.users.findIndex(u => u.id === updatedUser.id)
      if (index !== -1) {
        this.users[index] = { 
          ...this.users[index], 
          ...updatedUser, 
          updatedAt: new Date().toISOString().split('T')[0] 
        }
        localStorage.setItem('users', JSON.stringify(this.users))
      }
    }
  }
})
