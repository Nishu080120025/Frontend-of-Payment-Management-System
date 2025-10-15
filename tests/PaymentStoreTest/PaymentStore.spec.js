import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePaymentStore } from '@/stores/PaymentStore.js'

describe('PaymentStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds a payment', () => {
    const store = usePaymentStore()
    
    const initialLength = store.payments.length
    
    const payment = {
      userId: 1,
      amount: 1000,
      type: 'Credit',
      status: 'Pending',
      paymentDate: '2025-10-15'
    }
    
    store.addPayment(payment)
    
    expect(store.payments.length).toBe(initialLength + 1)
    expect(store.payments[store.payments.length - 1].amount).toBe(1000)
    expect(store.payments[store.payments.length - 1].type).toBe('Credit')
  })

  it('updates a payment', () => {
    const store = usePaymentStore()
    
    // Ensure there's at least one payment to update
    if (store.payments.length === 0) {
      store.addPayment({
        userId: 1,
        amount: 500,
        type: 'Debit',
        status: 'Pending',
        paymentDate: '2025-10-14'
      })
    }
    
    const originalStatus = store.payments[0].status
    const payment = { ...store.payments[0], status: 'Completed' }
    
    store.updatePayment(payment)
    
    expect(store.payments[0].status).toBe('Completed')
    expect(store.payments[0].status).not.toBe(originalStatus)
  })
})