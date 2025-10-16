
import { defineStore } from 'pinia'

function loadUsers() {
  try {
    const raw = localStorage.getItem('users')
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        return parsed.map(u => ({
          id: Number(u.id),
          name: u.name ?? '',
          email: u.email ?? '',
          role: u.role ?? 'Staff',
          createdAt: u.createdAt ?? new Date().toISOString().slice(0,10),
          updatedAt: u.updatedAt ?? null
        }))
      }
    }
  } catch (e) {
    
    console.error('loadUsers parse error', e)
  }

  return [
    { id: 1, name: 'Alice', email: 'alice@company.com', role: 'Admin', createdAt: '2025-10-14', updatedAt: null },
    { id: 2, name: 'Bob',   email: 'bob@company.com',   role: 'Manager', createdAt: '2025-10-14', updatedAt: null }
  ]
}

function persistUsers(users, nextUserId) {
  try {
    localStorage.setItem('users', JSON.stringify(users))
    if (typeof nextUserId !== 'undefined') {
      localStorage.setItem('nextUserId', String(nextUserId))
    }
  } catch (e) {
    console.error('persistUsers error', e)
  }
}

export const useUserStore = defineStore('userStore', {
  state: () => {
    const users = loadUsers()
    const nextUserId = Number(localStorage.getItem('nextUserId')) || (users.length ? Math.max(...users.map(u => u.id)) + 1 : 1)
    return {
      users,
      nextUserId
    }
  },

  actions: {
    addUser(user) {
      const newUser = {
        id: this.nextUserId++,
        name: user.name ?? '',
        email: user.email ?? '',
        role: user.role ?? 'Staff',
        createdAt: new Date().toISOString().slice(0,10),
        updatedAt: null
      }
      this.users.push(newUser)
      persistUsers(this.users, this.nextUserId)
      return newUser
    },

    updateUser(updatedUser) {
      const index = this.users.findIndex(u => Number(u.id) === Number(updatedUser.id))
      if (index !== -1) {
        this.users[index] = {
          ...this.users[index],
          ...updatedUser,
          updatedAt: new Date().toISOString().slice(0,10)
        }
        persistUsers(this.users, this.nextUserId)
        return true
      }
      return false
    },
    deleteUser(id) {
      this.users = this.users.filter(u => u.id !== id)
      this.persist()
    },
    
    persist() {
      persistUsers(this.users, this.nextUserId)
    }
  }
})
