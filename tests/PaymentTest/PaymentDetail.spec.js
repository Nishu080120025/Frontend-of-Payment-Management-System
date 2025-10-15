import { mount } from '@vue/test-utils'
import PaymentDetail from '@/views/Payments/PaymentDetail.vue'
import { createTestingPinia } from '@pinia/testing'

// Mock vue-router composables
vi.mock('vue-router', () => ({
  useRoute: () => ({ params: { id: 1 } }),
}))

describe('PaymentDetail.vue', () => {
  it('renders payment details when payment exists', () => {
    const wrapper = mount(PaymentDetail, {
      global: {
        plugins: [createTestingPinia({
          stubActions: false,
          initialState: {
            paymentStore: {
              payments: [
                { id: 1, amount: 500, type: 'Credit', status: 'Pending', userId: 1, paymentDate: '2025-10-14' }
              ]
            },
            userStore: {
              users: [
                { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin', createdAt: '2025-10-14' }
              ]
            }
          }
        })]
      }
    })
    expect(wrapper.find('h2').text()).toBe('Payment Details')
    expect(wrapper.text()).toContain('ID: 1')
    expect(wrapper.text()).toContain('User: Alice')
    expect(wrapper.text()).toContain('Amount: 500')
    expect(wrapper.text()).toContain('Type: Credit')
    expect(wrapper.text()).toContain('Status: Pending')
    expect(wrapper.text()).toContain('Date: 2025-10-14')
  })

  it('shows not found message when payment does not exist', () => {
    vi.mocked(require('vue-router').useRoute).mockReturnValue({ params: { id: 99 } })
    const wrapper = mount(PaymentDetail, {
      global: {
        plugins: [createTestingPinia({
          stubActions: false,
          initialState: {
            paymentStore: { payments: [] },
            userStore: { users: [] }
          }
        })]
      }
    })
    expect(wrapper.text()).toContain('Payment not found.')
  })
})