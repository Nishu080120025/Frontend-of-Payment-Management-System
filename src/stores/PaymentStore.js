// src/stores/PaymentStore.js
import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/UserStore.js'

function loadPayments() {
  const raw = (() => {
    try {
      const data = localStorage.getItem('payments')
      return data ? JSON.parse(data) : null
    } catch (e) {
      return null
    }
  })()

  const defaults = [
    { id: 1, userId: 1, user: 'Alice', amount: 500, type: 'Credit', status: 'Pending', paymentDate: '2025-10-14' },
    { id: 2, userId: 2, user: 'Bob', amount: 200, type: 'Debit', status: 'Completed', paymentDate: '2025-10-13' },
  ]

  const arr = raw && Array.isArray(raw) ? raw : defaults


  return arr.map(p => {
    return {
      id: Number(p.id),
      userId: p.userId ?? null,
      user: (p.user ?? p.userName ?? '') || '',
      amount: Number(p.amount ?? 0),
      type: p.type ?? 'Credit',
      status: p.status ?? 'Pending',
      paymentDate: p.paymentDate || p.date || p.createdAt || new Date().toISOString().slice(0,10)
    }
  })
}

export const usePaymentStore = defineStore('paymentStore', {
  state: () => {
    const payments = loadPayments()
    const nextPaymentId = Number(localStorage.getItem('nextPaymentId')) || (payments.length ? Math.max(...payments.map(p => p.id)) + 1 : 1)
    return {
      payments,
      nextPaymentId
    }
  },

  actions: {
    persist() {
      localStorage.setItem('payments', JSON.stringify(this.payments))
      localStorage.setItem('nextPaymentId', String(this.nextPaymentId))
    },

    addPayment(payload) {
    
      const userStore = useUserStore()
      const userId = payload.userId ?? null

      
      let userText = payload.user ?? ''
      if (!userText && userId) {
        const u = userStore.users.find(x => x.id === Number(userId))
        userText = u ? u.name : ''
      }

      const newPayment = {
        id: this.nextPaymentId++,
        userId: userId,
        user: userText || 'Unknown',
        amount: Number(payload.amount) || 0,
        type: payload.type || 'Credit',
        status: payload.status || 'Pending',
        paymentDate: payload.paymentDate || new Date().toISOString().slice(0,10)
      }

      this.payments.push(newPayment)
      this.persist()
    },

    updatePayment(payload) {
      
      const idx = this.payments.findIndex(p => Number(p.id) === Number(payload.id))
      if (idx === -1) return

      const userStore = useUserStore()
      let userText = payload.user ?? this.payments[idx].user
      const userId = payload.userId ?? this.payments[idx].userId

      // if payload has userId and no user text, try to look it up
      if ((!userText || userText === '') && userId) {
        const u = userStore.users.find(x => x.id === Number(userId))
        userText = u ? u.name : userText
      }

      this.payments[idx] = {
        ...this.payments[idx],
        ...payload,
        user: userText || this.payments[idx].user || 'Unknown',
        userId: userId ?? this.payments[idx].userId,
        paymentDate: payload.paymentDate ?? this.payments[idx].paymentDate
      }

      this.persist()
    },

    getPaymentById(id) {
      return this.payments.find(p => Number(p.id) === Number(id)) || null
    }
  }
})
