import { mount } from '@vue/test-utils'
import UserForm from '@/views/user/UserForm.vue'
import { createTestingPinia } from '@pinia/testing'

// Mock vue-router composables
vi.mock('vue-router', () => ({
  useRoute: () => ({ params: {} }),
  useRouter: () => ({ push: () => {} })
}))

describe('UserForm.vue', () => {
  it('renders add user form', () => {
    const wrapper = mount(UserForm, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })]
      }
    })
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Add User')
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
  })

  it('renders edit user form when route param id is present', () => {
    vi.mocked(require('vue-router').useRoute).mockReturnValue({ params: { id: 1 } })
    const wrapper = mount(UserForm, {
      global: {
        plugins: [createTestingPinia({
          stubActions: false,
          initialState: {
            userStore: {
              users: [
                { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin', createdAt: '2025-10-14', updatedAt: '2025-10-15' }
              ]
            }
          }
        })]
      }
    })
    expect(wrapper.find('button').text()).toBe('Update User')
    expect(wrapper.find('input[type="text"]').element.value).toBe('Alice')
  })
})