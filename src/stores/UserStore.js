import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [
      { id: 1, name: 'Alice', email: 'alice@company.com', role: 'Admin', createdAt: '2025-10-14' },
      { id: 2, name: 'Bob', email: 'bob@company.com', role: 'Manager', createdAt: '2025-10-14' },
    ],
    nextUserId: 3 // start counting from 3
  }),
  actions: {
    addUser(user) {
      user.id = this.nextUserId++
      user.createdAt = new Date().toISOString().split('T')[0]
      this.users.push(user)
    },
    updateUser(updatedUser) {
      const index = this.users.findIndex(u => u.id === updatedUser.id)
      if (index !== -1) {
        this.users[index] = { ...this.users[index], ...updatedUser, updatedAt: new Date().toISOString().split('T')[0] }
      }
    }
  }
})
