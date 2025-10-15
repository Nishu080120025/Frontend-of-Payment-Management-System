import { setActivePinia, createPinia } from 'pinia'
import { usePaymentStore } from '@/stores/PaymentStore.js'

describe('PaymentStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('adds a payment', () => {
    const store = usePaymentStore()
    const payment = {
      userId: 1,
      amount: 1000,
      type: 'Credit',
      status: 'Pending',
      paymentDate: '2025-10-15'
    }
    store.addPayment(payment)
    expect(store.payments.length).toBe(3)
    expect(store.payments[2].amount).toBe(1000)
  })

  it('updates a payment', () => {
    const store = usePaymentStore()
    const payment = { ...store.payments[0], status: 'Completed' }
    store.updatePayment(payment)
    expect(store.payments[0].status).toBe('Completed')
  })
})