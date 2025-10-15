import { mount } from '@vue/test-utils'
import PaymentForm from '@/views/Payments/PaymentForm.vue'
import { createTestingPinia } from '@pinia/testing'


vi.mock('vue-router', () => ({
  useRoute: () => ({ params: {} }),
  useRouter: () => ({ push: () => {} })
}))

describe('PaymentForm.vue', () => {
  it('renders form', () => {
    const wrapper = mount(PaymentForm, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })]
      }
    })
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('button').text()).toMatch(/Save|Update/)
  })
})