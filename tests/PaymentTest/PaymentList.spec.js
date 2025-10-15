import { mount } from '@vue/test-utils'
import PaymentList from '@/views/Payments/PaymentList.vue'
import { createTestingPinia } from '@pinia/testing'

describe('PaymentList.vue', () => {
  it('renders payments table', () => {
    const wrapper = mount(PaymentList, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })]
      }
    })
    expect(wrapper.find('h2').text()).toBe('Payments')
    expect(wrapper.findAll('tbody tr').length).toBeGreaterThan(0)
  })
})