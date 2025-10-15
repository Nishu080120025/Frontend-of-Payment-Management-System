import { defineStore } from 'pinia'

export const usePaymentStore = defineStore('paymentStore', {
  state: () => ({
    payments: [
      { id: 1, amount: 500, type: 'Credit', status: 'Pending', userId: 1, paymentDate: '2025-10-14' },
      { id: 2, amount: 200, type: 'Debit', status: 'Completed', userId: 2, paymentDate: '2025-10-13' },
    ],
    nextPaymentId: 3 // start counting from 3
  }),
  actions: {
    addPayment(payment) {
      payment.id = this.nextPaymentId++
      payment.paymentDate = new Date().toISOString().split('T')[0]
      this.payments.push(payment)
    },
    updatePayment(updatedPayment) {
      const index = this.payments.findIndex(p => p.id === updatedPayment.id)
      if (index !== -1) {
        this.payments[index] = { ...this.payments[index], ...updatedPayment }
      }
    }
  }
})
