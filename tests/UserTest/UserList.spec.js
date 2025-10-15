import { mount } from '@vue/test-utils'
import UserList from '@/views/user/UserList.vue'
import { createTestingPinia } from '@pinia/testing'

describe('UserList.vue', () => {
  it('renders users table', () => {
    const wrapper = mount(UserList, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })]
      }
    })
    expect(wrapper.find('h2').text()).toBe('Users')
    expect(wrapper.findAll('tbody tr').length).toBeGreaterThan(0)
  })
})